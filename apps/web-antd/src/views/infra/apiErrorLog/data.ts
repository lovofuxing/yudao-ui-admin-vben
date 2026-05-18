import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { DescriptionItemSchema } from '#/components/description';

import { h } from 'vue';

import { JsonViewer } from '@vben/common-ui';
import { DICT_TYPE, InfraApiErrorLogProcessStatusEnum } from '@vben/constants';
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
      label: $t('infra.apiErrorLog.fields.userId'),
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: $t('infra.apiErrorLog.placeholder.userId'),
      },
    },
    {
      fieldName: 'userType',
      label: $t('infra.apiErrorLog.fields.userType'),
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.USER_TYPE, 'number'),
        allowClear: true,
        placeholder: $t('infra.apiErrorLog.placeholder.userType'),
      },
    },
    {
      fieldName: 'applicationName',
      label: $t('infra.apiErrorLog.fields.applicationName'),
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: $t('infra.apiErrorLog.placeholder.applicationName'),
      },
    },
    {
      fieldName: 'exceptionTime',
      label: $t('infra.apiErrorLog.fields.exceptionTime'),
      component: 'RangePicker',
      componentProps: {
        ...getRangePickerDefaultProps(),
        allowClear: true,
      },
    },
    {
      fieldName: 'processStatus',
      label: $t('infra.apiErrorLog.fields.processStatus'),
      component: 'Select',
      componentProps: {
        options: getDictOptions(
          DICT_TYPE.INFRA_API_ERROR_LOG_PROCESS_STATUS,
          'number',
        ),
        allowClear: true,
        placeholder: $t('infra.apiErrorLog.placeholder.processStatus'),
      },
      defaultValue: InfraApiErrorLogProcessStatusEnum.INIT,
    },
  ];
}

/** 列表的字段 */
export function useGridColumns(): VxeTableGridOptions['columns'] {
  return [
    {
      field: 'id',
      title: $t('infra.apiErrorLog.fields.id'),
      minWidth: 100,
    },
    {
      field: 'userId',
      title: $t('infra.apiErrorLog.fields.userId'),
      minWidth: 100,
    },
    {
      field: 'userType',
      title: $t('infra.apiErrorLog.fields.userType'),
      minWidth: 120,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.USER_TYPE },
      },
    },
    {
      field: 'applicationName',
      title: $t('infra.apiErrorLog.fields.applicationName'),
      minWidth: 150,
    },
    {
      field: 'requestMethod',
      title: $t('infra.apiErrorLog.fields.requestMethod'),
      minWidth: 80,
    },
    {
      field: 'requestUrl',
      title: $t('infra.apiErrorLog.fields.requestUrl'),
      minWidth: 200,
    },
    {
      field: 'exceptionTime',
      title: $t('infra.apiErrorLog.fields.exceptionTime'),
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      field: 'exceptionName',
      title: $t('infra.apiErrorLog.fields.exceptionName'),
      minWidth: 180,
    },
    {
      field: 'processStatus',
      title: $t('infra.apiErrorLog.fields.processStatus'),
      minWidth: 120,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.INFRA_API_ERROR_LOG_PROCESS_STATUS },
      },
    },
    {
      title: $t('infra.common.action'),
      minWidth: 220,
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
      label: $t('infra.apiErrorLog.fields.id'),
    },
    {
      field: 'traceId',
      label: $t('infra.apiErrorLog.detail.traceId'),
    },
    {
      field: 'applicationName',
      label: $t('infra.apiErrorLog.fields.applicationName'),
    },
    {
      field: 'userId',
      label: $t('infra.apiErrorLog.fields.userId'),
    },
    {
      field: 'userType',
      label: $t('infra.apiErrorLog.fields.userType'),
      render: (val) => {
        return h(DictTag, {
          type: DICT_TYPE.USER_TYPE,
          value: val,
        });
      },
    },
    {
      field: 'userIp',
      label: $t('infra.apiErrorLog.detail.userIp'),
    },
    {
      field: 'userAgent',
      label: $t('infra.apiErrorLog.detail.userAgent'),
    },
    {
      field: 'requestMethod',
      label: $t('infra.apiErrorLog.detail.requestInfo'),
      render: (val, data) => {
        if (val && data?.requestUrl) {
          return `${val} ${data.requestUrl}`;
        }
        return '';
      },
    },
    {
      field: 'requestParams',
      label: $t('infra.apiErrorLog.detail.requestParams'),
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
      field: 'exceptionTime',
      label: $t('infra.apiErrorLog.fields.exceptionTime'),
      render: (val) => {
        return formatDateTime(val) as string;
      },
    },
    {
      field: 'exceptionName',
      label: $t('infra.apiErrorLog.fields.exceptionName'),
    },
    {
      field: 'exceptionStackTrace',
      label: $t('infra.apiErrorLog.detail.exceptionStack'),
      show: (val) => !val,
      render: (val) => {
        if (val) {
          return h('textarea', {
            value: val,
            style:
              'width: 100%; min-height: 200px; max-height: 400px; resize: vertical;',
            readonly: true,
          });
        }
        return '';
      },
    },
    {
      field: 'processStatus',
      label: $t('infra.apiErrorLog.fields.processStatus'),
      render: (val) => {
        return h(DictTag, {
          type: DICT_TYPE.INFRA_API_ERROR_LOG_PROCESS_STATUS,
          value: val,
        });
      },
    },
    {
      field: 'processUserId',
      label: $t('infra.apiErrorLog.detail.processUserId'),
      show: (val) => !val,
    },
    {
      field: 'processTime',
      label: $t('infra.apiErrorLog.detail.processTime'),
      show: (val) => !val,
      render: (val) => {
        return formatDateTime(val) as string;
      },
    },
  ];
}
