import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { DICT_TYPE } from '@vben/constants';
import { getDictOptions } from '@vben/hooks';

import { $t } from '#/locales';

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'userId',
      label: $t('system.oauth2.token.fields.userId'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.oauth2.token.fields.userIdPlaceholder'),
        allowClear: true,
      },
    },
    {
      fieldName: 'userType',
      label: $t('system.oauth2.token.fields.userType'),
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.USER_TYPE, 'number'),
        placeholder: $t('system.oauth2.token.fields.userTypePlaceholder'),
        allowClear: true,
      },
    },
    {
      fieldName: 'clientId',
      label: $t('system.oauth2.token.fields.clientId'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.oauth2.token.fields.clientIdPlaceholder'),
        allowClear: true,
      },
    },
  ];
}

/** 列表的字段 */
export function useGridColumns(): VxeTableGridOptions['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    {
      field: 'accessToken',
      title: $t('system.oauth2.token.fields.accessToken'),
      minWidth: 300,
    },
    {
      field: 'refreshToken',
      title: $t('system.oauth2.token.fields.refreshToken'),
      minWidth: 300,
    },
    {
      field: 'userId',
      title: $t('system.oauth2.token.fields.userId'),
      minWidth: 100,
    },
    {
      field: 'userType',
      title: $t('system.oauth2.token.fields.userType'),
      minWidth: 100,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.USER_TYPE },
      },
    },
    {
      field: 'clientId',
      title: $t('system.oauth2.token.fields.clientId'),
      minWidth: 120,
    },
    {
      field: 'expiresTime',
      title: $t('system.oauth2.token.fields.expiresTime'),
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      field: 'createTime',
      title: $t('system.common.createTime'),
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      title: $t('system.common.actions'),
      width: 80,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}
