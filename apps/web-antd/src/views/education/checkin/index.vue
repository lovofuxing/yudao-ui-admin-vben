<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { EducationFaceCheckinApi } from '#/api/education/checkin';

import { ref } from 'vue';

import { confirm, Page, useVbenModal } from '@vben/common-ui';
import { downloadFileFromBlobPart } from '@vben/utils';

import { message, Tag } from 'ant-design-vue';

import { ACTION_ICON, TableAction, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  deleteEducationFaceCheckin,
  deleteEducationFaceCheckinList,
  exportEducationFaceCheckin,
  getEducationFaceCheckinPage,
} from '#/api/education/checkin';
import { $t } from '#/locales';

import {
  getEducationStatusColor,
  getEducationStatusText,
} from '../_utils/status';
import { useGridColumns, useGridFormSchema } from './data';
import Form from './modules/form.vue';

const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: Form,
  destroyOnClose: true,
});

const checkedIds = ref<number[]>([]);

function getRowTitle(row: EducationFaceCheckinApi.FaceCheckin) {
  return `${row.studentName} ${row.checkinDate}`;
}

/** 签到管理刷新用于核对待签到、已签到和异常状态。 */
function handleRefresh() {
  gridApi.query();
}

async function handleExport() {
  const data = await exportEducationFaceCheckin(
    await gridApi.formApi.getValues(),
  );
  downloadFileFromBlobPart({
    fileName: `${$t('education.faceCheckin.title')}-${$t('education.common.exportFileSuffix')}.json`,
    source: data,
  });
}

function handleCreate() {
  formModalApi.setData(null).open();
}

function handleEdit(row: EducationFaceCheckinApi.FaceCheckin) {
  formModalApi.setData(row).open();
}

async function handleDelete(row: EducationFaceCheckinApi.FaceCheckin) {
  const hideLoading = message.loading({
    content: $t('education.common.deleteLoading', [getRowTitle(row)]),
    duration: 0,
  });
  try {
    await deleteEducationFaceCheckin(row.id);
    message.success($t('ui.actionMessage.deleteSuccess', [getRowTitle(row)]));
    handleRefresh();
  } finally {
    hideLoading();
  }
}

/** 签到记录可能关联课时扣减，批量删除也必须确认。 */
async function handleDeleteBatch() {
  await confirm($t('education.common.batchDeleteConfirm'));
  const hideLoading = message.loading({
    content: $t('education.common.deleteBatchLoading'),
    duration: 0,
  });
  try {
    await deleteEducationFaceCheckinList(checkedIds.value);
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
  records: EducationFaceCheckinApi.FaceCheckin[];
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
          return await getEducationFaceCheckinPage({
            pageNo: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
          });
        },
      },
    },
    rowConfig: { isHover: true, keyField: 'id' },
    toolbarConfig: { refresh: true, search: true },
  } as VxeTableGridOptions<EducationFaceCheckinApi.FaceCheckin>,
  gridEvents: {
    checkboxAll: handleRowCheckboxChange,
    checkboxChange: handleRowCheckboxChange,
  },
});
</script>

<template>
  <Page auto-content-height>
    <FormModal @success="handleRefresh" />
    <Grid :table-title="$t('education.faceCheckin.tableTitle')">
      <template #toolbar-tools>
        <TableAction
          :actions="[
            {
              label: $t('ui.actionTitle.create', [$t('education.faceCheckin.title')]),
              type: 'primary',
              icon: ACTION_ICON.ADD,
              auth: ['education:checkin:create'],
              onClick: handleCreate,
            },
            {
              label: $t('ui.actionTitle.export'),
              type: 'primary',
              icon: ACTION_ICON.DOWNLOAD,
              auth: ['education:checkin:export'],
              onClick: handleExport,
            },
            {
              label: $t('ui.actionTitle.deleteBatch'),
              type: 'primary',
              danger: true,
              icon: ACTION_ICON.DELETE,
              disabled: checkedIds.length === 0,
              auth: ['education:checkin:delete'],
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
              auth: ['education:checkin:update'],
              onClick: handleEdit.bind(null, row),
            },
            {
              label: $t('common.delete'),
              type: 'link',
              danger: true,
              icon: ACTION_ICON.DELETE,
              auth: ['education:checkin:delete'],
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
