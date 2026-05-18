import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { CommonStatusEnum, DICT_TYPE } from '@vben/constants';
import { getDictOptions } from '@vben/hooks';

import { z } from '#/adapter/form';
import { getSimpleSmsChannelList } from '#/api/system/sms/channel';
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
      fieldName: 'type',
      label: $t('system.sms.template.fields.type'),
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.SYSTEM_SMS_TEMPLATE_TYPE, 'number'),
        placeholder: $t('system.sms.template.fields.typePlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'name',
      label: $t('system.sms.template.fields.name'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.sms.template.fields.namePlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'code',
      label: $t('system.sms.template.fields.code'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.sms.template.fields.codePlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'channelId',
      label: $t('system.sms.template.fields.channelCode'),
      component: 'ApiSelect',
      componentProps: {
        api: getSimpleSmsChannelList,
        labelField: 'signature',
        valueField: 'id',
        placeholder: $t('system.sms.template.fields.channelPlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'status',
      label: $t('system.sms.template.fields.status'),
      component: 'RadioGroup',
      componentProps: {
        options: getDictOptions(DICT_TYPE.COMMON_STATUS, 'number'),
        buttonStyle: 'solid',
        optionType: 'button',
      },
      rules: z.number().default(CommonStatusEnum.ENABLE),
    },
    {
      fieldName: 'content',
      label: $t('system.sms.template.fields.content'),
      component: 'Textarea',
      componentProps: {
        placeholder: $t('system.sms.template.fields.contentPlaceholder'),
        rows: 4,
      },
      rules: 'required',
    },
    {
      fieldName: 'apiTemplateId',
      label: $t('system.sms.template.fields.apiTemplateId'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.sms.template.fields.apiTemplateIdPlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'remark',
      label: $t('system.sms.template.fields.remark'),
      component: 'Textarea',
      componentProps: {
        placeholder: $t('system.sms.template.fields.remarkPlaceholder'),
      },
    },
  ];
}

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'type',
      label: $t('system.sms.template.fields.type'),
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.SYSTEM_SMS_TEMPLATE_TYPE, 'number'),
        allowClear: true,
        placeholder: $t('system.sms.template.fields.typePlaceholder'),
      },
    },
    {
      fieldName: 'status',
      label: $t('system.sms.template.fields.status'),
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.COMMON_STATUS, 'number'),
        allowClear: true,
        placeholder: $t('system.sms.template.fields.statusPlaceholder'),
      },
    },
    {
      fieldName: 'code',
      label: $t('system.sms.template.fields.code'),
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: $t('system.sms.template.fields.codePlaceholder'),
      },
    },
    {
      fieldName: 'name',
      label: $t('system.sms.template.fields.name'),
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: $t('system.sms.template.fields.namePlaceholder'),
      },
    },
    {
      fieldName: 'channelId',
      label: $t('system.sms.template.fields.channelCode'),
      component: 'ApiSelect',
      componentProps: {
        api: getSimpleSmsChannelList,
        labelField: 'signature',
        valueField: 'id',
        allowClear: true,
        placeholder: $t('system.sms.template.fields.channelPlaceholder'),
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

/** 发送短信表单 */
export function useSendSmsFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'content',
      label: $t('system.sms.template.fields.content'),
      component: 'Textarea',
      componentProps: {
        disabled: true,
      },
    },
    {
      fieldName: 'mobile',
      label: $t('system.sms.template.fields.sendMobile'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.sms.template.fields.sendMobilePlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'templateParams',
      label: $t('system.sms.template.fields.templateParams'),
      component: 'Input',
      dependencies: {
        triggerFields: [''],
        show: () => false,
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
      field: 'type',
      title: $t('system.sms.template.fields.type'),
      minWidth: 120,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.SYSTEM_SMS_TEMPLATE_TYPE },
      },
    },
    {
      field: 'name',
      title: $t('system.sms.template.fields.name'),
      minWidth: 120,
    },
    {
      field: 'code',
      title: $t('system.sms.template.fields.code'),
      minWidth: 120,
    },
    {
      field: 'content',
      title: $t('system.sms.template.fields.content'),
      minWidth: 200,
    },
    {
      field: 'status',
      title: $t('system.sms.template.fields.status'),
      minWidth: 100,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.COMMON_STATUS },
      },
    },
    {
      field: 'apiTemplateId',
      title: $t('system.sms.template.fields.apiTemplateId'),
      minWidth: 180,
    },
    {
      field: 'channelCode',
      title: $t('system.sms.template.fields.channelCode'),
      minWidth: 100,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.SYSTEM_SMS_CHANNEL_CODE },
      },
    },
    {
      field: 'createTime',
      title: $t('system.common.createTime'),
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      field: 'remark',
      title: $t('system.sms.template.fields.remark'),
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
