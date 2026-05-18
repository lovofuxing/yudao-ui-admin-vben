import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { DescriptionItemSchema } from '#/components/description';

import { h } from 'vue';

import { DICT_TYPE } from '@vben/constants';
import { getDictOptions } from '@vben/hooks';
import { formatDateTime } from '@vben/utils';

import dayjs from 'dayjs';

import { DictTag } from '#/components/dict-tag';
import { $t } from '#/locales';

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'handlerName',
      label: $t('infra.job.log.handlerName'),
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: $t('infra.job.placeholder.handlerName'),
      },
    },
    {
      fieldName: 'beginTime',
      label: $t('infra.job.log.beginTime'),
      component: 'DatePicker',
      componentProps: {
        allowClear: true,
        placeholder: $t('infra.job.log.beginTimePlaceholder'),
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        showTime: {
          format: 'HH:mm:ss',
          defaultValue: dayjs('00:00:00', 'HH:mm:ss'),
        },
      },
    },
    {
      fieldName: 'endTime',
      label: $t('infra.job.log.endTime'),
      component: 'DatePicker',
      componentProps: {
        allowClear: true,
        placeholder: $t('infra.job.log.endTimePlaceholder'),
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        showTime: {
          format: 'HH:mm:ss',
          defaultValue: dayjs('23:59:59', 'HH:mm:ss'),
        },
      },
    },
    {
      fieldName: 'status',
      label: $t('infra.job.log.status'),
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.INFRA_JOB_LOG_STATUS, 'number'),
        allowClear: true,
        placeholder: $t('infra.job.placeholder.status'),
      },
    },
  ];
}

/** 表格列配置 */
export function useGridColumns(): VxeTableGridOptions['columns'] {
  return [
    {
      field: 'id',
      title: $t('infra.job.log.id'),
      minWidth: 80,
    },
    {
      field: 'jobId',
      title: $t('infra.job.fields.jobId'),
      minWidth: 80,
    },
    {
      field: 'handlerName',
      title: $t('infra.job.log.handlerName'),
      minWidth: 180,
    },
    {
      field: 'handlerParam',
      title: $t('infra.job.log.handlerParam'),
      minWidth: 140,
    },
    {
      field: 'executeIndex',
      title: $t('infra.job.fields.executeIndex'),
      minWidth: 100,
    },
    {
      field: 'beginTime',
      title: $t('infra.job.fields.beginTime'),
      minWidth: 280,
      formatter: ({ row }) => {
        return `${formatDateTime(row.beginTime)} ~ ${formatDateTime(row.endTime)}`;
      },
    },
    {
      field: 'duration',
      title: $t('infra.job.fields.duration'),
      minWidth: 120,
      formatter: ({ row }) => {
        return `${row.duration} ${$t('infra.common.milliseconds')}`;
      },
    },
    {
      field: 'status',
      title: $t('infra.job.fields.status'),
      minWidth: 100,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.INFRA_JOB_LOG_STATUS },
      },
    },
    {
      title: $t('infra.common.action'),
      width: 80,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}

/** 详情页的字段 */
export function useDetailSchema(): DescriptionItemSchema[] {
  return [
    {
      field: 'id',
      label: $t('infra.job.log.id'),
    },
    {
      field: 'jobId',
      label: $t('infra.job.fields.jobId'),
    },
    {
      field: 'handlerName',
      label: $t('infra.job.log.handlerName'),
    },
    {
      field: 'handlerParam',
      label: $t('infra.job.log.handlerParam'),
    },
    {
      field: 'executeIndex',
      label: $t('infra.job.fields.executeIndex'),
    },
    {
      field: 'beginTime',
      label: $t('infra.job.fields.beginTime'),
      render: (val, data) => {
        if (val && data?.endTime) {
          return `${formatDateTime(val)} ~ ${formatDateTime(data.endTime)}`;
        }
        return '';
      },
    },
    {
      field: 'duration',
      label: $t('infra.job.fields.duration'),
      render: (val) => {
        return val ? `${val} ${$t('infra.common.milliseconds')}` : '';
      },
    },
    {
      field: 'status',
      label: $t('infra.job.fields.status'),
      render: (val) => {
        return h(DictTag, {
          type: DICT_TYPE.INFRA_JOB_LOG_STATUS,
          value: val,
        });
      },
    },
    {
      field: 'result',
      label: $t('infra.job.fields.result'),
    },
  ];
}
