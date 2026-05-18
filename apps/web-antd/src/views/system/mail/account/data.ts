import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { DICT_TYPE } from '@vben/constants';
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
      fieldName: 'mail',
      label: $t('system.mail.account.fields.mail'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.mail.account.fields.mailPlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'username',
      label: $t('system.mail.account.fields.username'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.mail.account.fields.usernamePlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'password',
      label: $t('system.mail.account.fields.password'),
      component: 'InputPassword',
      componentProps: {
        placeholder: $t('system.mail.account.fields.passwordPlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'host',
      label: $t('system.mail.account.fields.host'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.mail.account.fields.hostPlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'port',
      label: $t('system.mail.account.fields.port'),
      component: 'InputNumber',
      componentProps: {
        placeholder: $t('system.mail.account.fields.portPlaceholder'),
        min: 0,
        max: 65_535,
      },
      rules: 'required',
    },
    {
      fieldName: 'sslEnable',
      label: $t('system.mail.account.fields.sslEnable'),
      component: 'RadioGroup',
      componentProps: {
        options: getDictOptions(DICT_TYPE.INFRA_BOOLEAN_STRING, 'boolean'),
        buttonStyle: 'solid',
        optionType: 'button',
      },
      rules: z.boolean().default(true),
    },
    {
      fieldName: 'starttlsEnable',
      label: $t('system.mail.account.fields.starttlsEnable'),
      component: 'RadioGroup',
      componentProps: {
        options: getDictOptions(DICT_TYPE.INFRA_BOOLEAN_STRING, 'boolean'),
        buttonStyle: 'solid',
        optionType: 'button',
      },
      rules: z.boolean().default(false),
    },
    {
      fieldName: 'remark',
      label: $t('system.mail.account.fields.remark'),
      component: 'Textarea',
      componentProps: {
        placeholder: $t('system.mail.account.fields.remarkPlaceholder'),
      },
    },
  ];
}

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'mail',
      label: $t('system.mail.account.fields.mail'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.mail.account.fields.mailPlaceholder'),
        allowClear: true,
      },
    },
    {
      fieldName: 'username',
      label: $t('system.mail.account.fields.username'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.mail.account.fields.usernamePlaceholder'),
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
      title: $t('system.mail.account.fields.gridId'),
      minWidth: 100,
    },
    {
      field: 'mail',
      title: $t('system.mail.account.fields.gridMail'),
      minWidth: 160,
    },
    {
      field: 'username',
      title: $t('system.mail.account.fields.gridUsername'),
      minWidth: 160,
    },
    {
      field: 'host',
      title: $t('system.mail.account.fields.gridHost'),
      minWidth: 150,
    },
    {
      field: 'port',
      title: $t('system.mail.account.fields.gridPort'),
      minWidth: 130,
    },
    {
      field: 'sslEnable',
      title: $t('system.mail.account.fields.gridSslEnable'),
      minWidth: 120,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.INFRA_BOOLEAN_STRING },
      },
    },
    {
      field: 'starttlsEnable',
      title: $t('system.mail.account.fields.gridStarttlsEnable'),
      minWidth: 145,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.INFRA_BOOLEAN_STRING },
      },
    },
    {
      field: 'createTime',
      title: $t('system.mail.account.fields.gridCreateTime'),
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      title: $t('system.mail.account.fields.gridActions'),
      width: 130,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}
