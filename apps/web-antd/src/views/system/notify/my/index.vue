<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { SystemNotifyMessageApi } from '#/api/system/notify/message';

import { ref } from 'vue';

import { DocAlert, Page, useVbenModal } from '@vben/common-ui';
import { isEmpty } from '@vben/utils';

import { message } from 'ant-design-vue';

import { ACTION_ICON, TableAction, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  getMyNotifyMessagePage,
  updateAllNotifyMessageRead,
  updateNotifyMessageRead,
} from '#/api/system/notify/message';
import { $t } from '#/locales';

import { useGridColumns, useGridFormSchema } from './data';
import Detail from './modules/detail.vue';

const [DetailModal, detailModalApi] = useVbenModal({
  connectedComponent: Detail,
  destroyOnClose: true,
});

/** 刷新表格 */
function handleRefresh() {
  gridApi.query();
}

/** 查看站内信详情 */
function handleDetail(row: SystemNotifyMessageApi.NotifyMessage) {
  detailModalApi.setData(row).open();
}

/** 标记一条站内信已读 */
async function handleRead(row: SystemNotifyMessageApi.NotifyMessage) {
  const hideLoading = message.loading({
    content: $t('system.notify.my.message.markingRead'),
    duration: 0,
  });
  try {
    await updateNotifyMessageRead([row.id]);
    message.success($t('system.notify.my.message.markReadSuccess'));
    handleRefresh();
    // 打开详情
    handleDetail(row);
  } finally {
    hideLoading();
  }
}

/** 标记选中的站内信为已读 */
async function handleMarkRead() {
  const rows = gridApi.grid.getCheckboxRecords();
  if (!rows || rows.length === 0) {
    message.warning($t('system.notify.my.message.selectRequired'));
    return;
  }

  const ids = rows.map((row: SystemNotifyMessageApi.NotifyMessage) => row.id);
  const hideLoading = message.loading({
    content: $t('system.notify.my.message.markingRead'),
    duration: 0,
  });
  try {
    await updateNotifyMessageRead(ids);
    checkedIds.value = [];
    message.success($t('system.notify.my.message.markReadSuccess'));
    await gridApi.grid.setAllCheckboxRow(false);
    handleRefresh();
  } finally {
    hideLoading();
  }
}

const checkedIds = ref<number[]>([]);
function handleRowCheckboxChange({
  records,
}: {
  records: SystemNotifyMessageApi.NotifyMessage[];
}) {
  checkedIds.value = records.map((item) => item.id);
}

/** 标记所有站内信为已读 */
async function handleMarkAllRead() {
  const hideLoading = message.loading({
    content: $t('system.notify.my.message.markingAllRead'),
    duration: 0,
  });
  try {
    await updateAllNotifyMessageRead();
    message.success($t('system.notify.my.message.markAllReadSuccess'));
    checkedIds.value = [];
    await gridApi.grid.setAllCheckboxRow(false);
    handleRefresh();
  } finally {
    hideLoading();
  }
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
          return await getMyNotifyMessagePage({
            pageNo: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
          });
        },
      },
    },
    rowConfig: {
      keyField: 'id',
      isHover: true,
    },
    toolbarConfig: {
      refresh: true,
      search: true,
    },
    checkboxConfig: {
      checkMethod: (params: { row: SystemNotifyMessageApi.NotifyMessage }) =>
        !params.row.readStatus,
      highlight: true,
    },
  } as VxeTableGridOptions<SystemNotifyMessageApi.NotifyMessage>,
  gridEvents: {
    checkboxAll: handleRowCheckboxChange,
    checkboxChange: handleRowCheckboxChange,
  },
});
</script>
<template>
  <Page auto-content-height>
    <template #doc>
      <DocAlert :title="$t('system.notify.docTitle')" url="https://doc.iocoder.cn/notify/" />
    </template>

    <DetailModal @success="handleRefresh" />
    <Grid :table-title="$t('system.notify.my.tableTitle')">
      <template #toolbar-tools>
        <TableAction
          :actions="[
            {
              label: $t('system.notify.my.action.markRead'),
              type: 'primary',
              icon: ACTION_ICON.ADD,
              disabled: isEmpty(checkedIds),
              onClick: handleMarkRead,
            },
            {
              label: $t('system.notify.my.action.markAllRead'),
              type: 'primary',
              icon: ACTION_ICON.ADD,
              onClick: handleMarkAllRead,
            },
          ]"
        />
      </template>
      <template #actions="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('system.notify.my.action.view'),
              type: 'link',
              ifShow: row.readStatus,
              icon: ACTION_ICON.VIEW,
              onClick: handleDetail.bind(null, row),
            },
            {
              label: $t('system.notify.my.action.read'),
              type: 'link',
              ifShow: !row.readStatus,
              icon: ACTION_ICON.ADD,
              onClick: handleRead.bind(null, row),
            },
          ]"
        />
      </template>
    </Grid>
  </Page>
</template>
