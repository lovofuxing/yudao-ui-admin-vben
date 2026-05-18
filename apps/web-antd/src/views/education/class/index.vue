<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { EducationClassApi } from '#/api/education/class';

import { ref, shallowRef } from 'vue';

import { confirm, Page, useVbenModal } from '@vben/common-ui';
import { downloadFileFromBlobPart } from '@vben/utils';

import { message, Tag } from 'ant-design-vue';

import { ACTION_ICON, TableAction, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  deleteEducationClass,
  deleteEducationClassList,
  exportEducationClass,
  getEducationClassPage,
} from '#/api/education/class';
import { $t } from '#/locales';

import {
  getEducationStatusColor,
  getEducationStatusText,
} from '../_utils/status';
import { useGridColumns, useGridFormSchema } from './data';
import Form from './modules/form.vue';
import ClassDetail from './detail/index.vue';

const detailClassId = shallowRef<number>();

function handleRowClick(row: EducationClassApi.Class) {
  detailClassId.value = row.id;
}

const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: Form,
  destroyOnClose: true,
});

const checkedIds = ref<number[]>([]);

function getRowTitle(row: EducationClassApi.ClassInfo) {
  return row.className;
}

/** 班级列表刷新保留筛选条件，便于从编辑弹窗返回后继续核对同一批班级。 */
function handleRefresh() {
  gridApi.query();
}

async function handleExport() {
  const data = await exportEducationClass(await gridApi.formApi.getValues());
  downloadFileFromBlobPart({
    fileName: `${$t('education.class.title')}-${$t('education.common.exportFileSuffix')}.json`,
    source: data,
  });
}

function handleCreate() {
  formModalApi.setData(null).open();
}

function handleEdit(row: EducationClassApi.ClassInfo) {
  formModalApi.setData(row).open();
}

async function handleDelete(row: EducationClassApi.ClassInfo) {
  const hideLoading = message.loading({
    content: $t('education.common.deleteLoading', [getRowTitle(row)]),
    duration: 0,
  });
  try {
    await deleteEducationClass(row.id);
    message.success($t('ui.actionMessage.deleteSuccess', [getRowTitle(row)]));
    handleRefresh();
  } finally {
    hideLoading();
  }
}

/** 班级删除影响学员和排课，正式后端接入前仍保留二次确认。 */
async function handleDeleteBatch() {
  await confirm($t('education.common.batchDeleteConfirm'));
  const hideLoading = message.loading({
    content: $t('education.common.deleteBatchLoading'),
    duration: 0,
  });
  try {
    await deleteEducationClassList(checkedIds.value);
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
  records: EducationClassApi.ClassInfo[];
}) {
  checkedIds.value = records.map((item) => item.id);
}

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: { schema: useGridFormSchema() },
  gridOptions: {
    columns: useGridColumns(),
    height: 'auto',
    keepSource: true,
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await getEducationClassPage({
            pageNo: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
          });
        },
      },
    },
    rowConfig: { isHover: true, keyField: 'id' },
    toolbarConfig: { refresh: true, search: true },
  } as VxeTableGridOptions<EducationClassApi.ClassInfo>,
  gridEvents: {
    checkboxAll: handleRowCheckboxChange,
    checkboxChange: handleRowCheckboxChange,
    cellDblclick: ({ row }: { row: EducationClassApi.Class }) =>
      handleRowClick(row),
  },
});
</script>

<template>
  <Page auto-content-height>
    <FormModal @success="handleRefresh" />
    <ClassDetail :class-id="detailClassId" @close="detailClassId = undefined" />
    <Grid :table-title="$t('education.class.tableTitle')">
      <template #toolbar-tools>
        <TableAction
          :actions="[
            {
              label: $t('ui.actionTitle.create', [$t('education.class.title')]),
              type: 'primary',
              icon: ACTION_ICON.ADD,
              auth: ['education:class:create'],
              onClick: handleCreate,
            },
            {
              label: $t('ui.actionTitle.export'),
              type: 'primary',
              icon: ACTION_ICON.DOWNLOAD,
              auth: ['education:class:export'],
              onClick: handleExport,
            },
            {
              label: $t('ui.actionTitle.deleteBatch'),
              type: 'primary',
              danger: true,
              icon: ACTION_ICON.DELETE,
              disabled: checkedIds.length === 0,
              auth: ['education:class:delete'],
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
              auth: ['education:class:update'],
              onClick: handleEdit.bind(null, row),
            },
            {
              label: $t('common.delete'),
              type: 'link',
              danger: true,
              icon: ACTION_ICON.DELETE,
              auth: ['education:class:delete'],
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
