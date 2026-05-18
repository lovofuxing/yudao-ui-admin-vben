import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { DescriptionItemSchema } from '#/components/description';

import { h } from 'vue';

import { DICT_TYPE } from '@vben/constants';
import { formatDateTime } from '@vben/utils';

import { DictTag } from '#/components/dict-tag';
import { $t } from '#/locales';
import { getRangePickerDefaultProps } from '#/utils';

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'username',
      label: $t('system.loginlog.fields.username'),
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: $t('system.loginlog.fields.usernamePlaceholder'),
      },
    },
    {
      fieldName: 'userIp',
      label: $t('system.loginlog.fields.userIp'),
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: $t('system.loginlog.fields.userIpPlaceholder'),
      },
    },
    {
      fieldName: 'createTime',
      label: $t('system.loginlog.fields.createTime'),
      component: 'RangePicker',
      componentProps: {
        ...getRangePickerDefaultProps(),
        allowClear: true,
      },
    },
  ];
}

/** 列表的字段 */
export function useGridColumns(): VxeTableGridOptions['columns'] {
  return [
    {
      field: 'id',
      title: $t('system.loginlog.fields.id'),
      minWidth: 100,
    },
    {
      field: 'logType',
      title: $t('system.loginlog.fields.logType'),
      minWidth: 120,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.SYSTEM_LOGIN_TYPE },
      },
    },
    {
      field: 'username',
      title: $t('system.loginlog.fields.username'),
      minWidth: 180,
    },
    {
      field: 'userIp',
      title: $t('system.loginlog.fields.userIp'),
      minWidth: 180,
    },
    {
      field: 'userAgent',
      title: $t('system.loginlog.fields.userAgent'),
      minWidth: 200,
    },
    {
      field: 'result',
      title: $t('system.loginlog.fields.result'),
      minWidth: 120,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.SYSTEM_LOGIN_RESULT },
      },
    },
    {
      field: 'createTime',
      title: $t('system.loginlog.fields.createTime'),
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      title: $t('system.loginlog.fields.actions'),
      width: 120,
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
      label: $t('system.loginlog.fields.id'),
    },
    {
      field: 'logType',
      label: $t('system.loginlog.fields.logType'),
      render: (val) => {
        return h(DictTag, {
          type: DICT_TYPE.SYSTEM_LOGIN_TYPE,
          value: val,
        });
      },
    },
    {
      field: 'username',
      label: $t('system.loginlog.fields.username'),
    },
    {
      field: 'userIp',
      label: $t('system.loginlog.fields.userIp'),
    },
    {
      field: 'userAgent',
      label: $t('system.loginlog.fields.userAgent'),
    },
    {
      field: 'result',
      label: $t('system.loginlog.fields.result'),
      render: (val) => {
        return h(DictTag, {
          type: DICT_TYPE.SYSTEM_LOGIN_RESULT,
          value: val,
        });
      },
    },
    {
      field: 'createTime',
      label: $t('system.loginlog.fields.createTime'),
      render: (val) => formatDateTime(val) as string,
    },
  ];
}
