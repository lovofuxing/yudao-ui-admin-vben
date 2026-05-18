<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { EducationLessonRecordApi } from '#/api/education/record';

import { ref } from 'vue';

import { confirm, Page, useVbenModal } from '@vben/common-ui';
import { downloadFileFromBlobPart } from '@vben/utils';

import { Tabs } from 'ant-design-vue';
import { message, Tag } from 'ant-design-vue';

import { ACTION_ICON, TableAction, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  deleteEducationLessonRecord,
  deleteEducationLessonRecordList,
  exportEducationLessonRecord,
  getEducationLessonRecordPage,
} from '#/api/education/record';
import { $t } from '#/locales';

import {
  getEducationStatusColor,
  getEducationStatusText,
} from '../_utils/status';
import { useGridColumns, useGridFormSchema } from './data';
import Form from './modules/form.vue';

const activeTab = ref('records');

const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: Form,
  destroyOnClose: true,
});

const checkedIds = ref<number[]>([]);

function getRowTitle(row: EducationLessonRecordApi.LessonRecord) {
  return `${row.studentName} ${row.lessonDate}`;
}

function handleRefresh() {
  gridApi.query();
}

async function handleExport() {
  const data = await exportEducationLessonRecord(
    await gridApi.formApi.getValues(),
  );
  downloadFileFromBlobPart({
    fileName: `${$t('education.lessonRecord.title')}-${$t('education.common.exportFileSuffix')}.json`,
    source: data,
  });
}

function handleCreate() {
  formModalApi.setData(null).open();
}
function handleEdit(row: EducationLessonRecordApi.LessonRecord) {
  formModalApi.setData(row).open();
}

async function handleDelete(row: EducationLessonRecordApi.LessonRecord) {
  const hideLoading = message.loading({
    content: $t('education.common.deleteLoading', [getRowTitle(row)]),
    duration: 0,
  });
  try {
    await deleteEducationLessonRecord(row.id);
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
    await deleteEducationLessonRecordList(checkedIds.value);
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
  records: EducationLessonRecordApi.LessonRecord[];
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
          await getEducationLessonRecordPage({
            pageNo: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
          }),
      },
    },
    rowConfig: { isHover: true, keyField: 'id' },
    toolbarConfig: { refresh: true, search: true },
  } as VxeTableGridOptions<EducationLessonRecordApi.LessonRecord>,
  gridEvents: {
    checkboxAll: handleRowCheckboxChange,
    checkboxChange: handleRowCheckboxChange,
  },
});
</script>

<template>
  <Page auto-content-height>
    <Tabs v-model:activeKey="activeTab">
      <Tabs.TabPane key="records" :tab="$t('education.record.tab.records')">
        <FormModal @success="handleRefresh" />
        <Grid :table-title="$t('education.lessonRecord.tableTitle')">
          <template #toolbar-tools>
            <TableAction
              :actions="[
                {
                  label: $t('ui.actionTitle.create', [
                    $t('education.lessonRecord.title'),
                  ]),
                  type: 'primary',
                  icon: ACTION_ICON.ADD,
                  auth: ['education:record:create'],
                  onClick: handleCreate,
                },
                {
                  label: $t('ui.actionTitle.export'),
                  type: 'primary',
                  icon: ACTION_ICON.DOWNLOAD,
                  auth: ['education:record:export'],
                  onClick: handleExport,
                },
                {
                  label: $t('ui.actionTitle.deleteBatch'),
                  type: 'primary',
                  danger: true,
                  icon: ACTION_ICON.DELETE,
                  disabled: checkedIds.length === 0,
                  auth: ['education:record:delete'],
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
                  auth: ['education:record:update'],
                  onClick: handleEdit.bind(null, row),
                },
                {
                  label: $t('common.delete'),
                  type: 'link',
                  danger: true,
                  icon: ACTION_ICON.DELETE,
                  auth: ['education:record:delete'],
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
        key="student"
        :tab="$t('education.record.tab.studentRecords')"
      >
        <FormModal @success="handleRefresh" /><Grid
          :table-title="$t('education.lessonRecord.tableTitle')"
        />
      </Tabs.TabPane>
      <Tabs.TabPane
        key="checkin-edit"
        :tab="$t('education.record.tab.checkinEdit')"
      >
        <FormModal @success="handleRefresh" /><Grid
          :table-title="$t('education.lessonRecord.tableTitle')"
        />
      </Tabs.TabPane>
      <Tabs.TabPane key="makeup" :tab="$t('education.record.tab.makeup')">
        <FormModal @success="handleRefresh" /><Grid
          :table-title="$t('education.lessonRecord.tableTitle')"
        />
      </Tabs.TabPane>
    </Tabs>
  </Page>
</template>
