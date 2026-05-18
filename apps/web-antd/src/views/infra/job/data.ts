import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { DescriptionItemSchema } from '#/components/description';

import { h, markRaw } from 'vue';

import { DICT_TYPE } from '@vben/constants';
import { getDictOptions } from '@vben/hooks';
import { formatDateTime } from '@vben/utils';

import { Timeline } from 'ant-design-vue';

import { CronTab } from '#/components/cron-tab';
import { DictTag } from '#/components/dict-tag';
import { $t } from '#/locales';

/** 新增/修改的表单 */
export function useFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'id',
      component: 'Input',
      dependencies: {
        triggerFields: [''],
        show: () => false,
      },
    },
    {
      fieldName: 'name',
      label: $t('infra.job.fields.name'),
      component: 'Input',
      componentProps: {
        placeholder: $t('infra.job.placeholder.name'),
      },
      rules: 'required',
    },
    {
      fieldName: 'handlerName',
      label: $t('infra.job.fields.handlerName'),
      component: 'Input',
      componentProps: {
        placeholder: $t('infra.job.placeholder.handlerName'),
      },
      dependencies: {
        triggerFields: ['id'],
        disabled: (values) => !!values.id,
      },
      rules: 'required',
    },
    {
      fieldName: 'handlerParam',
      label: $t('infra.job.fields.handlerParam'),
      component: 'Input',
      componentProps: {
        placeholder: $t('infra.job.placeholder.handlerParam'),
      },
    },
    {
      fieldName: 'cronExpression',
      label: $t('infra.job.fields.cronExpression'),
      component: markRaw(CronTab),
      componentProps: {
        placeholder: $t('infra.job.placeholder.cronExpression'),
      },
      rules: 'required',
    },
    {
      fieldName: 'retryCount',
      label: $t('infra.job.fields.retryCount'),
      component: 'InputNumber',
      componentProps: {
        placeholder: $t('infra.job.placeholder.retryCount'),
        min: 0,
      },
      rules: 'required',
    },
    {
      fieldName: 'retryInterval',
      label: $t('infra.job.fields.retryInterval'),
      component: 'InputNumber',
      componentProps: {
        placeholder: $t('infra.job.placeholder.retryInterval'),
        min: 0,
      },
      rules: 'required',
    },
    {
      fieldName: 'monitorTimeout',
      label: $t('infra.job.fields.monitorTimeout'),
      component: 'InputNumber',
      componentProps: {
        placeholder: $t('infra.job.placeholder.monitorTimeout'),
        min: 0,
      },
    },
  ];
}

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'name',
      label: $t('infra.job.fields.name'),
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: $t('infra.job.placeholder.name'),
      },
    },
    {
      fieldName: 'status',
      label: $t('infra.job.fields.status'),
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.INFRA_JOB_STATUS, 'number'),
        allowClear: true,
        placeholder: $t('infra.job.placeholder.status'),
      },
    },
    {
      fieldName: 'handlerName',
      label: $t('infra.job.fields.handlerName'),
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: $t('infra.job.placeholder.handlerName'),
      },
    },
  ];
}

/** 表格列配置 */
export function useGridColumns(): VxeTableGridOptions['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    {
      field: 'id',
      title: $t('infra.job.fields.id'),
      minWidth: 80,
    },
    {
      field: 'name',
      title: $t('infra.job.fields.name'),
      minWidth: 120,
    },
    {
      field: 'status',
      title: $t('infra.job.fields.status'),
      minWidth: 100,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.INFRA_JOB_STATUS },
      },
    },
    {
      field: 'handlerName',
      title: $t('infra.job.fields.handlerName'),
      minWidth: 180,
    },
    {
      field: 'handlerParam',
      title: $t('infra.job.fields.handlerParam'),
      minWidth: 140,
    },
    {
      field: 'cronExpression',
      title: $t('infra.job.fields.cronExpression'),
      minWidth: 120,
    },
    {
      title: $t('infra.common.action'),
      width: 240,
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
      label: $t('infra.job.fields.id'),
    },
    {
      field: 'name',
      label: $t('infra.job.fields.name'),
    },
    {
      field: 'status',
      label: $t('infra.job.fields.status'),
      render: (val) => {
        return h(DictTag, {
          type: DICT_TYPE.INFRA_JOB_STATUS,
          value: val,
        });
      },
    },
    {
      field: 'handlerName',
      label: $t('infra.job.fields.handlerName'),
    },
    {
      field: 'handlerParam',
      label: $t('infra.job.fields.handlerParam'),
    },
    {
      field: 'cronExpression',
      label: $t('infra.job.fields.cronExpressionLabel'),
    },
    {
      field: 'retryCount',
      label: $t('infra.job.fields.retryCount'),
    },
    {
      label: $t('infra.job.fields.retryInterval'),
      field: 'retryInterval',
      render: (val) => {
        return val
          ? `${val} ${$t('infra.common.milliseconds')}`
          : $t('infra.common.noInterval');
      },
    },
    {
      label: $t('infra.job.fields.monitorTimeout'),
      field: 'monitorTimeout',
      render: (val) => {
        return val && val > 0
          ? `${val} ${$t('infra.common.milliseconds')}`
          : $t('infra.common.notEnabled');
      },
    },
    {
      field: 'nextTimes',
      label: $t('infra.job.fields.nextTimes'),
      render: (val) => {
        if (!val || val.length === 0) {
          return $t('infra.common.noNextTimes');
        }
        return h(Timeline, {}, () =>
          val?.map((time: Date) =>
            h(Timeline.Item, {}, () => formatDateTime(time)),
          ),
        );
      },
    },
  ];
}
