import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { DescriptionItemSchema } from '#/components/description';

import { h } from 'vue';

import { JsonViewer } from '@vben/common-ui';
import { DICT_TYPE } from '@vben/constants';
import { getDictOptions } from '@vben/hooks';
import { formatDateTime } from '@vben/utils';

import { DictTag } from '#/components/dict-tag';
import { $t } from '#/locales';
import { getRangePickerDefaultProps } from '#/utils';

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'userId',
      label: $t('infra.apiAccessLog.fields.userId'),
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: $t('infra.apiAccessLog.placeholder.userId'),
      },
    },
    {
      fieldName: 'userType',
      label: $t('infra.apiAccessLog.fields.userType'),
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.USER_TYPE, 'number'),
        allowClear: true,
        placeholder: $t('infra.apiAccessLog.placeholder.userType'),
      },
    },
    {
      fieldName: 'applicationName',
      label: $t('infra.apiAccessLog.fields.applicationName'),
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: $t('infra.apiAccessLog.placeholder.applicationName'),
      },
    },
    {
      fieldName: 'beginTime',
      label: $t('infra.apiAccessLog.fields.beginTime'),
      component: 'RangePicker',
      componentProps: {
        ...getRangePickerDefaultProps(),
        allowClear: true,
      },
    },
    {
      fieldName: 'duration',
      label: $t('infra.apiAccessLog.fields.duration'),
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: $t('infra.apiAccessLog.placeholder.duration'),
      },
    },
    {
      fieldName: 'resultCode',
      label: $t('infra.apiAccessLog.fields.resultCode'),
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: $t('infra.apiAccessLog.placeholder.resultCode'),
      },
    },
  ];
}

/** 列表的字段 */
export function useGridColumns(): VxeTableGridOptions['columns'] {
  return [
    {
      field: 'id',
      title: $t('infra.apiAccessLog.fields.id'),
      minWidth: 100,
    },
    {
      field: 'userId',
      title: $t('infra.apiAccessLog.fields.userId'),
      minWidth: 100,
    },
    {
      field: 'userType',
      title: $t('infra.apiAccessLog.fields.userType'),
      minWidth: 120,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.USER_TYPE },
      },
    },
    {
      field: 'applicationName',
      title: $t('infra.apiAccessLog.fields.applicationName'),
      minWidth: 150,
    },
    {
      field: 'requestMethod',
      title: $t('infra.apiAccessLog.fields.requestMethod'),
      minWidth: 80,
    },
    {
      field: 'requestUrl',
      title: $t('infra.apiAccessLog.fields.requestUrl'),
      minWidth: 300,
    },
    {
      field: 'beginTime',
      title: $t('infra.apiAccessLog.fields.beginTime'),
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      field: 'duration',
      title: $t('infra.apiAccessLog.fields.duration'),
      minWidth: 120,
      formatter: ({ cellValue }) => `${cellValue} ${$t('infra.common.ms')}`,
    },
    {
      field: 'resultCode',
      title: $t('infra.apiAccessLog.fields.resultCode'),
      minWidth: 150,
      formatter: ({ row }) => {
        return row.resultCode === 0 ? $t('infra.apiAccessLog.success') : `${$t('infra.apiAccessLog.failure')}(${row.resultMsg})`;
      },
    },
    {
      field: 'operateModule',
      title: $t('infra.apiAccessLog.fields.operateModule'),
      minWidth: 150,
    },
    {
      field: 'operateName',
      title: $t('infra.apiAccessLog.fields.operateName'),
      minWidth: 220,
    },
    {
      field: 'operateType',
      title: $t('infra.apiAccessLog.fields.operateType'),
      minWidth: 120,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.INFRA_OPERATE_TYPE },
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
      label: $t('infra.apiAccessLog.fields.id'),
    },
    {
      field: 'traceId',
      label: $t('infra.apiAccessLog.detail.traceId'),
    },
    {
      field: 'applicationName',
      label: $t('infra.apiAccessLog.fields.applicationName'),
    },
    {
      field: 'userId',
      label: $t('infra.apiAccessLog.fields.userId'),
    },
    {
      field: 'userType',
      label: $t('infra.apiAccessLog.fields.userType'),
      render: (val) => {
        return h(DictTag, {
          type: DICT_TYPE.USER_TYPE,
          value: val,
        });
      },
    },
    {
      field: 'userIp',
      label: $t('infra.apiAccessLog.detail.userIp'),
    },
    {
      field: 'userAgent',
      label: $t('infra.apiAccessLog.detail.userAgent'),
    },
    {
      field: 'requestMethod',
      label: $t('infra.apiAccessLog.detail.requestInfo'),
      render: (val, data) => {
        if (val && data?.requestUrl) {
          return `${val} ${data.requestUrl}`;
        }
        return '';
      },
    },
    {
      field: 'requestParams',
      label: $t('infra.apiAccessLog.detail.requestParams'),
      render: (val) => {
        if (val) {
          return h(JsonViewer, {
            value: JSON.parse(val),
            previewMode: true,
          });
        }
        return '';
      },
    },
    {
      field: 'responseBody',
      label: $t('infra.apiAccessLog.detail.requestResult'),
    },
    {
      label: $t('infra.apiAccessLog.detail.requestTime'),
      field: 'beginTime',
      render: (val, data) => {
        if (val && data?.endTime) {
          return `${formatDateTime(val)} ~ ${formatDateTime(data.endTime)}`;
        }
        return '';
      },
    },
    {
      label: $t('infra.apiAccessLog.detail.requestDuration'),
      field: 'duration',
      render: (val) => {
        return val ? `${val} ${$t('infra.common.ms')}` : '';
      },
    },
    {
      label: $t('infra.apiAccessLog.detail.operateResult'),
      field: 'resultCode',
      render: (val, data) => {
        if (val === 0) {
          return $t('infra.common.success');
        } else if (val > 0 && data?.resultMsg) {
          return `${$t('infra.apiAccessLog.failure')} | ${val} | ${data.resultMsg}`;
        }
        return '';
      },
    },
    {
      field: 'operateModule',
      label: $t('infra.apiAccessLog.fields.operateModule'),
    },
    {
      field: 'operateName',
      label: $t('infra.apiAccessLog.fields.operateName'),
    },
    {
      field: 'operateType',
      label: $t('infra.apiAccessLog.fields.operateType'),
      render: (val) => {
        return h(DictTag, {
          type: DICT_TYPE.INFRA_OPERATE_TYPE,
          value: val,
        });
      },
    },
  ];
}
