<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { DocAlert, Page, useVbenModal } from '@vben/common-ui';

import { ACTION_ICON, TableAction, useVbenVxeGrid } from '#/adapter/vxe-table';
import { getAreaTree } from '#/api/system/area';
import { $t } from '#/locales';

import { useGridColumns } from './data';
import Form from './modules/form.vue';

const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: Form,
  destroyOnClose: true,
});

/** 刷新表格 */
function handleRefresh() {
  gridApi.query();
}

/** 查询 IP */
function handleQueryIp() {
  formModalApi.setData(null).open();
}

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions: {
    columns: useGridColumns(),
    height: 'auto',
    keepSource: true,
    pagerConfig: {
      enabled: false,
    },
    proxyConfig: {
      ajax: {
        query: async () => {
          return await getAreaTree();
        },
      },
    },
    rowConfig: {
      keyField: 'id',
      isHover: true,
    },
    toolbarConfig: {
      refresh: true,
    },
    treeConfig: {
      rowField: 'id',
      reserve: true,
    },
  } as VxeTableGridOptions,
});
</script>

<template>
  <Page auto-content-height>
    <template #doc>
      <DocAlert
        :title="$t('system.area.docTitle')"
        url="https://doc.iocoder.cn/area-and-ip/"
      />
    </template>

    <FormModal @success="handleRefresh" />
    <Grid :table-title="$t('system.area.tableTitle')">
      <template #toolbar-tools>
        <TableAction
          :actions="[
            {
              label: $t('system.area.ipQuery'),
              type: 'primary',
              icon: ACTION_ICON.SEARCH,
              onClick: handleQueryIp,
            },
          ]"
        />
      </template>
    </Grid>
  </Page>
</template>
