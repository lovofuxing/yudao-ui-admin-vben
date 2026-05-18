import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { CommonStatusEnum, DICT_TYPE } from '@vben/constants';
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
      fieldName: 'clientId',
      label: $t('system.oauth2.client.fields.clientId'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.oauth2.client.fields.clientIdPlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'secret',
      label: $t('system.oauth2.client.fields.secret'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.oauth2.client.fields.secretPlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'name',
      label: $t('system.oauth2.client.fields.name'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.oauth2.client.fields.namePlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'logo',
      label: $t('system.oauth2.client.fields.logo'),
      component: 'ImageUpload',
      rules: 'required',
    },
    {
      fieldName: 'description',
      label: $t('system.oauth2.client.fields.description'),
      component: 'Textarea',
      componentProps: {
        placeholder: $t('system.oauth2.client.fields.descriptionPlaceholder'),
      },
    },
    {
      fieldName: 'status',
      label: $t('system.oauth2.client.fields.status'),
      component: 'RadioGroup',
      componentProps: {
        options: getDictOptions(DICT_TYPE.COMMON_STATUS, 'number'),
        buttonStyle: 'solid',
        optionType: 'button',
      },
      rules: z.number().default(CommonStatusEnum.ENABLE),
    },
    {
      fieldName: 'accessTokenValiditySeconds',
      label: $t('system.oauth2.client.fields.accessTokenValiditySeconds'),
      component: 'InputNumber',
      componentProps: {
        placeholder: $t(
          'system.oauth2.client.fields.accessTokenValiditySecondsPlaceholder',
        ),
        min: 0,
      },
      rules: 'required',
    },
    {
      fieldName: 'refreshTokenValiditySeconds',
      label: $t('system.oauth2.client.fields.refreshTokenValiditySeconds'),
      component: 'InputNumber',
      componentProps: {
        placeholder: $t(
          'system.oauth2.client.fields.refreshTokenValiditySecondsPlaceholder',
        ),
        min: 0,
      },
      rules: 'required',
    },
    {
      fieldName: 'authorizedGrantTypes',
      label: $t('system.oauth2.client.fields.authorizedGrantTypes'),
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.SYSTEM_OAUTH2_GRANT_TYPE),
        mode: 'multiple',
        placeholder: $t(
          'system.oauth2.client.fields.authorizedGrantTypesPlaceholder',
        ),
      },
      rules: 'required',
    },
    {
      fieldName: 'scopes',
      label: $t('system.oauth2.client.fields.scopes'),
      component: 'Select',
      componentProps: {
        placeholder: $t('system.oauth2.client.fields.scopesPlaceholder'),
        mode: 'tags',
        allowClear: true,
      },
    },
    {
      fieldName: 'autoApproveScopes',
      label: $t('system.oauth2.client.fields.autoApproveScopes'),
      component: 'Select',
      componentProps: {
        placeholder: $t(
          'system.oauth2.client.fields.autoApproveScopesPlaceholder',
        ),
        mode: 'multiple',
      },
      dependencies: {
        triggerFields: ['scopes'],
        componentProps: (values) => ({
          options: values.scopes
            ? values.scopes.map((scope: string) => ({
                label: scope,
                value: scope,
              }))
            : [],
        }),
      },
    },
    {
      fieldName: 'redirectUris',
      label: $t('system.oauth2.client.fields.redirectUris'),
      component: 'Select',
      componentProps: {
        placeholder: $t('system.oauth2.client.fields.redirectUrisPlaceholder'),
        mode: 'tags',
      },
      rules: 'required',
    },
    {
      fieldName: 'authorities',
      label: $t('system.oauth2.client.fields.authorities'),
      component: 'Select',
      componentProps: {
        placeholder: $t('system.oauth2.client.fields.authoritiesPlaceholder'),
        mode: 'tags',
      },
    },
    {
      fieldName: 'resourceIds',
      label: $t('system.oauth2.client.fields.resourceIds'),
      component: 'Select',
      componentProps: {
        mode: 'tags',
        placeholder: $t('system.oauth2.client.fields.resourceIdsPlaceholder'),
      },
    },
    {
      fieldName: 'additionalInformation',
      label: $t('system.oauth2.client.fields.additionalInformation'),
      component: 'Textarea',
      componentProps: {
        placeholder: $t(
          'system.oauth2.client.fields.additionalInformationPlaceholder',
        ),
      },
    },
  ];
}

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'name',
      label: $t('system.oauth2.client.fields.name'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.oauth2.client.fields.namePlaceholder'),
        allowClear: true,
      },
    },
    {
      fieldName: 'status',
      label: $t('system.oauth2.client.fields.status'),
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.COMMON_STATUS, 'number'),
        allowClear: true,
        placeholder: $t('system.oauth2.client.fields.statusPlaceholder'),
      },
    },
  ];
}

/** 列表的字段 */
export function useGridColumns(): VxeTableGridOptions['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    {
      field: 'clientId',
      title: $t('system.oauth2.client.fields.clientId'),
      minWidth: 120,
    },
    {
      field: 'secret',
      title: $t('system.oauth2.client.fields.secret'),
      minWidth: 120,
    },
    {
      field: 'name',
      title: $t('system.oauth2.client.fields.name'),
      minWidth: 120,
    },
    {
      field: 'logo',
      title: $t('system.oauth2.client.fields.logo'),
      minWidth: 100,
      cellRender: {
        name: 'CellImage',
      },
    },
    {
      field: 'status',
      title: $t('system.oauth2.client.fields.status'),
      minWidth: 80,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.COMMON_STATUS },
      },
    },
    {
      field: 'accessTokenValiditySeconds',
      title: $t('system.oauth2.client.fields.accessTokenValiditySeconds'),
      minWidth: 150,
      formatter: ({ cellValue }) =>
        `${cellValue} ${$t('system.common.seconds')}`,
    },
    {
      field: 'refreshTokenValiditySeconds',
      title: $t('system.oauth2.client.fields.refreshTokenValiditySeconds'),
      minWidth: 150,
      formatter: ({ cellValue }) =>
        `${cellValue} ${$t('system.common.seconds')}`,
    },
    {
      field: 'authorizedGrantTypes',
      title: $t('system.oauth2.client.fields.authorizedGrantTypes'),
      minWidth: 100,
    },
    {
      field: 'createTime',
      title: $t('system.common.createTime'),
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      title: $t('system.common.actions'),
      width: 130,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}
