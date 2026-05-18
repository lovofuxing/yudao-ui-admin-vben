import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import {
  CommonStatusEnum,
  DICT_TYPE,
  SystemUserSocialTypeEnum,
} from '@vben/constants';
import { getDictOptions } from '@vben/hooks';

import { z } from '#/adapter/form';
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
      label: $t('system.social.client.fields.name'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.social.client.fields.namePlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'socialType',
      label: $t('system.social.client.fields.socialType'),
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.SYSTEM_SOCIAL_TYPE, 'number'),
        placeholder: $t('system.social.client.fields.socialTypePlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'userType',
      label: $t('system.social.client.fields.userType'),
      component: 'RadioGroup',
      componentProps: {
        options: getDictOptions(DICT_TYPE.USER_TYPE, 'number'),
        buttonStyle: 'solid',
        optionType: 'button',
      },
      rules: 'required',
    },
    {
      fieldName: 'clientId',
      label: $t('system.social.client.fields.clientId'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.social.client.fields.clientIdPlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'clientSecret',
      label: $t('system.social.client.fields.clientSecret'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.social.client.fields.clientSecretPlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'agentId',
      label: $t('system.social.client.fields.agentId'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.social.client.fields.agentIdPlaceholder'),
      },
      dependencies: {
        triggerFields: ['socialType'],
        show: (values) =>
          values.socialType === SystemUserSocialTypeEnum.WECHAT_ENTERPRISE.type,
      },
    },
    {
      fieldName: 'publicKey',
      label: $t('system.social.client.fields.publicKey'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.social.client.fields.publicKeyPlaceholder'),
      },
      dependencies: {
        triggerFields: ['socialType'],
        show: (values) => values.socialType === 40,
      },
    },
    {
      fieldName: 'status',
      label: $t('system.social.client.fields.status'),
      component: 'RadioGroup',
      componentProps: {
        options: getDictOptions(DICT_TYPE.COMMON_STATUS, 'number'),
        buttonStyle: 'solid',
        optionType: 'button',
      },
      rules: z.number().default(CommonStatusEnum.ENABLE),
    },
  ];
}

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'name',
      label: $t('system.social.client.fields.name'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.social.client.fields.namePlaceholder'),
        allowClear: true,
      },
    },
    {
      fieldName: 'socialType',
      label: $t('system.social.client.fields.socialType'),
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.SYSTEM_SOCIAL_TYPE, 'number'),
        placeholder: $t('system.social.client.fields.socialTypePlaceholder'),
        allowClear: true,
      },
    },
    {
      fieldName: 'userType',
      label: $t('system.social.client.fields.userType'),
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.USER_TYPE, 'number'),
        placeholder: $t('system.social.client.fields.userTypePlaceholder'),
        allowClear: true,
      },
    },
    {
      fieldName: 'clientId',
      label: $t('system.social.client.fields.clientId'),
      component: 'Input',
      componentProps: {
        placeholder: $t(
          'system.social.client.fields.clientIdSearchPlaceholder',
        ),
        allowClear: true,
      },
    },
    {
      fieldName: 'status',
      label: $t('system.social.client.fields.status'),
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.COMMON_STATUS, 'number'),
        placeholder: $t('system.social.client.fields.statusPlaceholder'),
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
      field: 'id',
      title: $t('system.common.id'),
      minWidth: 100,
    },
    {
      field: 'name',
      title: $t('system.social.client.fields.name'),
      minWidth: 120,
    },
    {
      field: 'socialType',
      title: $t('system.social.client.fields.socialType'),
      minWidth: 100,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.SYSTEM_SOCIAL_TYPE },
      },
    },
    {
      field: 'userType',
      title: $t('system.social.client.fields.userType'),
      minWidth: 100,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.USER_TYPE },
      },
    },
    {
      field: 'clientId',
      title: $t('system.social.client.fields.clientId'),
      minWidth: 180,
    },
    {
      field: 'status',
      title: $t('system.social.client.fields.status'),
      minWidth: 100,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.COMMON_STATUS },
      },
    },
    {
      field: 'createTime',
      title: $t('system.common.createTime'),
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      title: $t('system.common.actions'),
      width: 220,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}
