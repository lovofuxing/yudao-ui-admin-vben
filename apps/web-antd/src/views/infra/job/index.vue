<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { InfraJobApi } from '#/api/infra/job';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { confirm, DocAlert, Page, useVbenModal } from '@vben/common-ui';
import { InfraJobStatusEnum } from '@vben/constants';
import { downloadFileFromBlobPart, isEmpty } from '@vben/utils';

import { message } from 'ant-design-vue';

import { ACTION_ICON, TableAction, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  deleteJob,
  deleteJobList,
  exportJob,
  getJobPage,
  runJob,
  updateJobStatus,
} from '#/api/infra/job';
import { $t } from '#/locales';

import { useGridColumns, useGridFormSchema } from './data';
import Detail from './modules/detail.vue';
import Form from './modules/form.vue';

const { push } = useRouter();

const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: Form,
  destroyOnClose: true,
});

const [DetailModal, detailModalApi] = useVbenModal({
  connectedComponent: Detail,
  destroyOnClose: true,
});

/** 刷新表格 */
function handleRefresh() {
  gridApi.query();
}

/** 导出表格 */
async function handleExport() {
  const data = await exportJob(await gridApi.formApi.getValues());
  downloadFileFromBlobPart({ fileName: '定时任务.xls', source: data });
}

/** 创建任务 */
function handleCreate() {
  formModalApi.setData(null).open();
}

/** 编辑任务 */
function handleEdit(row: InfraJobApi.Job) {
  formModalApi.setData(row).open();
}

/** 查看任务详情 */
function handleDetail(row: InfraJobApi.Job) {
  detailModalApi.setData({ id: row.id }).open();
}

/** 更新任务状态 */
async function handleUpdateStatus(row: InfraJobApi.Job) {
  const status =
    row.status === InfraJobStatusEnum.STOP
      ? InfraJobStatusEnum.NORMAL
      : InfraJobStatusEnum.STOP;
  const statusText = status === InfraJobStatusEnum.NORMAL ? $t('infra.job.actions.enable') : $t('infra.job.actions.disable');

  await confirm($t('infra.job.actions.statusConfirm', [statusText, row.name]));
  const hideLoading = message.loading({
    content: status === InfraJobStatusEnum.NORMAL ? $t('infra.job.actions.enabling') : $t('infra.job.actions.disabling'),
    duration: 0,
  });
  try {
    await updateJobStatus(row.id!, status);
    message.success($t('ui.actionMessage.operationSuccess'));
    handleRefresh();
  } finally {
    hideLoading();
  }
}

/** 执行一次任务 */
async function handleTrigger(row: InfraJobApi.Job) {
  await confirm($t('infra.job.actions.triggerConfirm', [row.name]));
  const hideLoading = message.loading({
    content: $t('infra.job.actions.executing'),
    duration: 0,
  });
  try {
    await runJob(row.id!);
    message.success($t('ui.actionMessage.operationSuccess'));
  } finally {
    hideLoading();
  }
}

/** 跳转到任务日志 */
function handleLog(row?: InfraJobApi.Job) {
  push({
    name: 'InfraJobLog',
    query: row?.id ? { id: row.id } : {},
  });
}

/** 删除任务 */
async function handleDelete(row: InfraJobApi.Job) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.name]),
    duration: 0,
  });
  try {
    await deleteJob(row.id!);
    message.success($t('ui.actionMessage.deleteSuccess', [row.name]));
    handleRefresh();
  } finally {
    hideLoading();
  }
}

/** 批量删除任务 */
async function handleDeleteBatch() {
  await confirm($t('ui.actionMessage.deleteBatchConfirm'));
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deletingBatch'),
    duration: 0,
  });
  try {
    await deleteJobList(checkedIds.value);
    checkedIds.value = [];
    message.success($t('ui.actionMessage.deleteSuccess'));
    handleRefresh();
  } finally {
    hideLoading();
  }
}

const checkedIds = ref<number[]>([]);
function handleRowCheckboxChange({ records }: { records: InfraJobApi.Job[] }) {
  checkedIds.value = records.map((item) => item.id!);
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
          return await getJobPage({
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
  } as VxeTableGridOptions<InfraJobApi.Job>,
  gridEvents: {
    checkboxAll: handleRowCheckboxChange,
    checkboxChange: handleRowCheckboxChange,
  },
});
</script>

<template>
  <Page auto-content-height>
    <template #doc>
      <DocAlert :title="$t('infra.job.title')" url="https://doc.iocoder.cn/job/" />
      <DocAlert title="异步任务" url="https://doc.iocoder.cn/async-task/" />
      <DocAlert title="消息队列" url="https://doc.iocoder.cn/message-queue/" />
    </template>

    <FormModal @success="handleRefresh" />
    <DetailModal />
    <Grid :table-title="$t('infra.job.tableTitle')">
      <template #toolbar-tools>
        <TableAction
          :actions="[
            {
              label: $t('ui.actionTitle.create', [$t('infra.job.title')]),
              type: 'primary',
              icon: ACTION_ICON.ADD,
              auth: ['infra:job:create'],
              onClick: handleCreate,
            },
            {
              label: $t('ui.actionTitle.export'),
              type: 'primary',
              icon: ACTION_ICON.DOWNLOAD,
              auth: ['infra:job:export'],
              onClick: handleExport,
            },
            {
              label: $t('infra.job.actions.execLog'),
              type: 'primary',
              icon: 'lucide:history',
              auth: ['infra:job:query'],
              onClick: () => handleLog(undefined),
            },
            {
              label: $t('ui.actionTitle.deleteBatch'),
              type: 'primary',
              danger: true,
              icon: ACTION_ICON.DELETE,
              disabled: isEmpty(checkedIds),
              auth: ['infra:job:delete'],
              onClick: handleDeleteBatch,
            },
          ]"
        />
      </template>
      <template #actions="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('common.edit'),
              type: 'link',
              icon: ACTION_ICON.EDIT,
              auth: ['infra:job:update'],
              onClick: handleEdit.bind(null, row),
            },
            {
              label: $t('infra.job.actions.open'),
              type: 'link',
              icon: 'lucide:circle-play',
              auth: ['infra:job:update'],
              ifShow: () => row.status === InfraJobStatusEnum.STOP,
              onClick: handleUpdateStatus.bind(null, row),
            },
            {
              label: $t('infra.job.actions.pause'),
              type: 'link',
              icon: 'lucide:circle-pause',
              auth: ['infra:job:update'],
              ifShow: () => row.status === InfraJobStatusEnum.NORMAL,
              onClick: handleUpdateStatus.bind(null, row),
            },
            {
              label: $t('infra.job.actions.execute'),
              type: 'link',
              icon: 'lucide:clock-plus',
              auth: ['infra:job:trigger'],
              onClick: handleTrigger.bind(null, row),
            },
          ]"
          :drop-down-actions="[
            {
              label: $t('common.detail'),
              type: 'link',
              auth: ['infra:job:query'],
              onClick: handleDetail.bind(null, row),
            },
            {
              label: $t('infra.job.actions.log'),
              type: 'link',
              auth: ['infra:job:query'],
              onClick: handleLog.bind(null, row),
            },
            {
              label: $t('common.delete'),
              type: 'link',
              danger: true,
              auth: ['infra:job:delete'],
              popConfirm: {
                title: $t('ui.actionMessage.deleteConfirm', [row.name]),
                confirm: handleDelete.bind(null, row),
              },
            },
          ]"
        />
      </template>
    </Grid>
  </Page>
</template>
