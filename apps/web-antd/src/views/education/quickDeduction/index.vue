<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { EducationQuickDeductionApi } from '#/api/education/quickDeduction';

import { ref } from 'vue';

import { confirm, Page, useVbenModal } from '@vben/common-ui';
import { downloadFileFromBlobPart } from '@vben/utils';

import { Tabs } from 'ant-design-vue';
import { message, Tag } from 'ant-design-vue';

import { ACTION_ICON, TableAction, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  deleteEducationQuickDeduction,
  deleteEducationQuickDeductionList,
  exportEducationQuickDeduction,
  getEducationQuickDeductionPage,
} from '#/api/education/quickDeduction';
import { $t } from '#/locales';

import {
  getEducationStatusColor,
  getEducationStatusText,
} from '../_utils/status';
import { useGridColumns, useGridFormSchema } from './data';
import Form from './modules/form.vue';

const activeTab = ref('student');

const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: Form,
  destroyOnClose: true,
});
const checkedIds = ref<number[]>([]);

function getRowTitle(row: EducationQuickDeductionApi.QuickDeduction) {
  return `${row.studentName} ${row.deductionTime}`;
}
function handleRefresh() {
  gridApi.query();
}

async function handleExport() {
  const data = await exportEducationQuickDeduction(
    await gridApi.formApi.getValues(),
  );
  downloadFileFromBlobPart({
    fileName: `${$t('education.quickDeduction.title')}-${$t('education.common.exportFileSuffix')}.json`,
    source: data,
  });
}

function handleCreate() {
  formModalApi.setData(null).open();
}
function handleEdit(row: EducationQuickDeductionApi.QuickDeduction) {
  formModalApi.setData(row).open();
}

async function handleDelete(row: EducationQuickDeductionApi.QuickDeduction) {
  const hideLoading = message.loading({
    content: $t('education.common.deleteLoading', [getRowTitle(row)]),
    duration: 0,
  });
  try {
    await deleteEducationQuickDeduction(row.id);
    message.success($t('ui.actionMessage.deleteSuccess', [getRowTitle(row)]));
    handleRefresh();
  } finally {
    hideLoading();
  }
}

async function handleDeleteBatch() {
  await confirm($t('education.common.batchDeleteConfirm'));
  const hideLoading = message.loading({
    content: $t('education.common.deleteBatchLoading'),
    duration: 0,
  });
  try {
    await deleteEducationQuickDeductionList(checkedIds.value);
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
  records: EducationQuickDeductionApi.QuickDeduction[];
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
        query: async ({ page }, formValues) =>
          await getEducationQuickDeductionPage({
            pageNo: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
          }),
      },
    },
    rowConfig: { isHover: true, keyField: 'id' },
    toolbarConfig: { refresh: true, search: true },
  } as VxeTableGridOptions<EducationQuickDeductionApi.QuickDeduction>,
  gridEvents: {
    checkboxAll: handleRowCheckboxChange,
    checkboxChange: handleRowCheckboxChange,
  },
});
</script>

<template>
  <Page auto-content-height>
    <Tabs v-model:activeKey="activeTab">
      <Tabs.TabPane
        key="student"
        :tab="$t('education.quickDeduction.tab.student')"
      >
        <FormModal @success="handleRefresh" />
        <Grid :table-title="$t('education.quickDeduction.tableTitle')">
          <template #toolbar-tools>
            <TableAction
              :actions="[
                {
                  label: $t('ui.actionTitle.create', [
                    $t('education.quickDeduction.title'),
                  ]),
                  type: 'primary',
                  icon: ACTION_ICON.ADD,
                  auth: ['education:quickDeduction:create'],
                  onClick: handleCreate,
                },
                {
                  label: $t('ui.actionTitle.export'),
                  type: 'primary',
                  icon: ACTION_ICON.DOWNLOAD,
                  auth: ['education:quickDeduction:export'],
                  onClick: handleExport,
                },
                {
                  label: $t('ui.actionTitle.deleteBatch'),
                  type: 'primary',
                  danger: true,
                  icon: ACTION_ICON.DELETE,
                  disabled: checkedIds.length === 0,
                  auth: ['education:quickDeduction:delete'],
                  onClick: handleDeleteBatch,
                },
              ]"
            />
          </template>
          <template #status="{ row }"
            ><Tag :color="getEducationStatusColor(row.status)">{{
              getEducationStatusText(row.status)
            }}</Tag></template
          >
          <template #actions="{ row }"
            ><TableAction
              :actions="[
                {
                  label: $t('common.edit'),
                  type: 'link',
                  icon: ACTION_ICON.EDIT,
                  auth: ['education:quickDeduction:update'],
                  onClick: handleEdit.bind(null, row),
                },
                {
                  label: $t('common.delete'),
                  type: 'link',
                  danger: true,
                  icon: ACTION_ICON.DELETE,
                  auth: ['education:quickDeduction:delete'],
                  popConfirm: {
                    title: $t('ui.actionMessage.deleteConfirm', [
                      getRowTitle(row),
                    ]),
                    confirm: handleDelete.bind(null, row),
                  },
                },
              ]"
          /></template>
        </Grid>
      </Tabs.TabPane>
      <Tabs.TabPane
        key="course"
        :tab="$t('education.quickDeduction.tab.course')"
      >
        <FormModal @success="handleRefresh" /><Grid
          :table-title="$t('education.quickDeduction.tableTitle')"
        />
      </Tabs.TabPane>
      <Tabs.TabPane
        key="records"
        :tab="$t('education.quickDeduction.tab.records')"
      >
        <FormModal @success="handleRefresh" /><Grid
          :table-title="$t('education.quickDeduction.tableTitle')"
        />
      </Tabs.TabPane>
    </Tabs>
  </Page>
</template>
