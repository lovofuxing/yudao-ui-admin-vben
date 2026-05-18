import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { CommonStatusEnum, DICT_TYPE } from '@vben/constants';
import { getDictOptions } from '@vben/hooks';

import { z } from '#/adapter/form';
import { $t } from '#/locales';
import { getRangePickerDefaultProps } from '#/utils';

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
      fieldName: 'signature',
      label: $t('system.sms.channel.fields.signature'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.sms.channel.fields.signaturePlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'code',
      label: $t('system.sms.channel.fields.code'),
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.SYSTEM_SMS_CHANNEL_CODE, 'string'),
        placeholder: $t('system.sms.channel.fields.codePlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'status',
      label: $t('system.sms.channel.fields.status'),
      component: 'RadioGroup',
      componentProps: {
        options: getDictOptions(DICT_TYPE.COMMON_STATUS, 'number'),
        buttonStyle: 'solid',
        optionType: 'button',
      },
      rules: z.number().default(CommonStatusEnum.ENABLE),
    },
    {
      fieldName: 'remark',
      label: $t('system.sms.channel.fields.remark'),
      component: 'Textarea',
      componentProps: {
        placeholder: $t('system.sms.channel.fields.remarkPlaceholder'),
      },
    },
    {
      fieldName: 'apiKey',
      label: $t('system.sms.channel.fields.apiKey'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.sms.channel.fields.apiKeyPlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'apiSecret',
      label: $t('system.sms.channel.fields.apiSecret'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.sms.channel.fields.apiSecretPlaceholder'),
      },
    },
    {
      fieldName: 'callbackUrl',
      label: $t('system.sms.channel.fields.callbackUrl'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.sms.channel.fields.callbackUrlPlaceholder'),
      },
    },
  ];
}

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'signature',
      label: $t('system.sms.channel.fields.signature'),
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: $t('system.sms.channel.fields.signaturePlaceholder'),
      },
    },
    {
      fieldName: 'code',
      label: $t('system.sms.channel.fields.code'),
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: getDictOptions(DICT_TYPE.SYSTEM_SMS_CHANNEL_CODE, 'string'),
        placeholder: $t('system.sms.channel.fields.codePlaceholder'),
      },
    },
    {
      fieldName: 'status',
      label: $t('system.sms.channel.fields.status'),
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: getDictOptions(DICT_TYPE.COMMON_STATUS, 'number'),
      },
    },
    {
      fieldName: 'createTime',
      label: $t('system.common.createTime'),
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
    { type: 'checkbox', width: 40 },
    {
      field: 'id',
      title: $t('system.common.id'),
      minWidth: 100,
    },
    {
      field: 'signature',
      title: $t('system.sms.channel.fields.signature'),
      minWidth: 120,
    },
    {
      field: 'code',
      title: $t('system.sms.channel.fields.code'),
      minWidth: 120,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.SYSTEM_SMS_CHANNEL_CODE },
      },
    },
    {
      field: 'status',
      title: $t('system.sms.channel.fields.status'),
      minWidth: 100,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.COMMON_STATUS },
      },
    },
    {
      field: 'apiKey',
      title: $t('system.sms.channel.fields.apiKey'),
      minWidth: 180,
    },
    {
      field: 'apiSecret',
      title: $t('system.sms.channel.fields.apiSecret'),
      minWidth: 180,
    },
    {
      field: 'callbackUrl',
      title: $t('system.sms.channel.fields.callbackUrl'),
      minWidth: 180,
    },
    {
      field: 'createTime',
      title: $t('system.common.createTime'),
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      field: 'remark',
      title: $t('system.sms.channel.fields.remark'),
      minWidth: 120,
    },
    {
      title: $t('system.common.actions'),
      width: 220,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}
