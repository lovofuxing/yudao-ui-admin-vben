<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { EducationStudentApi } from '#/api/education/student';

import { ref, shallowRef } from 'vue';

import { confirm, Page, useVbenModal } from '@vben/common-ui';
import { downloadFileFromBlobPart } from '@vben/utils';

import { message, Tag } from 'ant-design-vue';

import { ACTION_ICON, TableAction, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  deleteEducationStudent,
  deleteEducationStudentList,
  exportEducationStudent,
  getEducationStudentPage,
} from '#/api/education/student';
import { $t } from '#/locales';

import {
  getEducationStatusColor,
  getEducationStatusText,
} from '../_utils/status';
import { useGridColumns, useGridFormSchema } from './data';
import Form from './modules/form.vue';
import StudentDetail from './detail/index.vue';

const detailOpen = ref(false);
const detailStudentId = shallowRef<number>();

function handleRowClick(row: EducationStudentApi.Student) {
  detailStudentId.value = row.id;
  detailOpen.value = true;
}

const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: Form,
  destroyOnClose: true,
});

const checkedIds = ref<number[]>([]);

function getRowTitle(row: EducationStudentApi.Student) {
  return row.studentName;
}

/** 表格刷新统一走 gridApi.query，确保新增、编辑、删除后分页状态一致。 */
function handleRefresh() {
  gridApi.query();
}

/** 迁移期导出 JSON Blob，正式后端接入后 API 内部会替换为下载接口。 */
async function handleExport() {
  const data = await exportEducationStudent(await gridApi.formApi.getValues());
  downloadFileFromBlobPart({
    fileName: `${$t('education.student.title')}-${$t('education.common.exportFileSuffix')}.json`,
    source: data,
  });
}

function handleCreate() {
  formModalApi.setData(null).open();
}

function handleEdit(row: EducationStudentApi.Student) {
  formModalApi.setData(row).open();
}

async function handleDelete(row: EducationStudentApi.Student) {
  const hideLoading = message.loading({
    content: $t('education.common.deleteLoading', [getRowTitle(row)]),
    duration: 0,
  });
  try {
    await deleteEducationStudent(row.id);
    message.success($t('ui.actionMessage.deleteSuccess', [getRowTitle(row)]));
    handleRefresh();
  } finally {
    hideLoading();
  }
}

/** 批量删除先确认再执行，避免误删迁移校验数据。 */
async function handleDeleteBatch() {
  await confirm($t('education.common.batchDeleteConfirm'));
  const hideLoading = message.loading({
    content: $t('education.common.deleteBatchLoading'),
    duration: 0,
  });
  try {
    await deleteEducationStudentList(checkedIds.value);
    checkedIds.value = [];
    message.success($t('ui.actionMessage.deleteSuccess'));
    handleRefresh();
  } finally {
    hideLoading();
  }
}

function handleRowCheckboxChange({
  records,
}: {
  records: EducationStudentApi.Student[];
}) {
  checkedIds.value = records.map((item) => item.id);
}

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: {
    schema: useGridFormSchema(),
  },
  gridOptions: {
    columns: useGridColumns(),
    height: 'auto',
    keepSource: true,
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await getEducationStudentPage({
            pageNo: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
          });
        },
      },
    },
    rowConfig: {
      isHover: true,
      keyField: 'id',
    },
    toolbarConfig: {
      refresh: true,
      search: true,
    },
  } as VxeTableGridOptions<EducationStudentApi.Student>,
  gridEvents: {
    checkboxAll: handleRowCheckboxChange,
    checkboxChange: handleRowCheckboxChange,
    cellDblclick: ({ row }: { row: EducationStudentApi.Student }) =>
      handleRowClick(row),
  },
});
</script>

<template>
  <Page auto-content-height>
    <FormModal @success="handleRefresh" />
    <StudentDetail :student-id="detailStudentId" @close="detailOpen = false" />
    <Grid :table-title="$t('education.student.tableTitle')">
      <template #toolbar-tools>
        <TableAction
          :actions="[
            {
              label: $t('ui.actionTitle.create', [
                $t('education.student.title'),
              ]),
              type: 'primary',
              icon: ACTION_ICON.ADD,
              auth: ['education:student:create'],
              onClick: handleCreate,
            },
            {
              label: $t('ui.actionTitle.export'),
              type: 'primary',
              icon: ACTION_ICON.DOWNLOAD,
              auth: ['education:student:export'],
              onClick: handleExport,
            },
            {
              label: $t('ui.actionTitle.deleteBatch'),
              type: 'primary',
              danger: true,
              icon: ACTION_ICON.DELETE,
              disabled: checkedIds.length === 0,
              auth: ['education:student:delete'],
              onClick: handleDeleteBatch,
            },
          ]"
        />
      </template>
      <template #status="{ row }">
        <Tag :color="getEducationStatusColor(row.status)">
          {{ getEducationStatusText(row.status) }}
        </Tag>
      </template>
      <template #actions="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('common.edit'),
              type: 'link',
              icon: ACTION_ICON.EDIT,
              auth: ['education:student:update'],
              onClick: handleEdit.bind(null, row),
            },
            {
              label: $t('common.delete'),
              type: 'link',
              danger: true,
              icon: ACTION_ICON.DELETE,
              auth: ['education:student:delete'],
              popConfirm: {
                title: $t('ui.actionMessage.deleteConfirm', [getRowTitle(row)]),
                confirm: handleDelete.bind(null, row),
              },
            },
          ]"
        />
      </template>
    </Grid>
  </Page>
</template>
