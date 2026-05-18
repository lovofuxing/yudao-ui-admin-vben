import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { CommonStatusEnum, DICT_TYPE } from '@vben/constants';
import { getDictOptions } from '@vben/hooks';

import { z } from '#/adapter/form';
import { getSimpleMailAccountList } from '#/api/system/mail/account';
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
      fieldName: 'name',
      label: $t('system.mail.template.fields.name'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.mail.template.fields.namePlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'code',
      label: $t('system.mail.template.fields.code'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.mail.template.fields.codePlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'accountId',
      label: $t('system.mail.template.fields.accountId'),
      component: 'ApiSelect',
      componentProps: {
        api: getSimpleMailAccountList,
        labelField: 'mail',
        valueField: 'id',
        placeholder: $t('system.mail.template.fields.accountIdPlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'nickname',
      label: $t('system.mail.template.fields.nickname'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.mail.template.fields.nicknamePlaceholder'),
      },
    },
    {
      fieldName: 'title',
      label: $t('system.mail.template.fields.title'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.mail.template.fields.titlePlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'content',
      label: $t('system.mail.template.fields.content'),
      component: 'RichTextarea',
      rules: 'required',
    },
    {
      fieldName: 'status',
      label: $t('system.mail.template.fields.status'),
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

/** 发送邮件表单 */
export function useSendMailFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'templateParams',
      label: $t('system.mail.template.fields.templateParams'),
      component: 'Input',
      dependencies: {
        triggerFields: [''],
        show: () => false,
      },
    },
    {
      fieldName: 'content',
      label: $t('system.mail.template.fields.content'),
      component: 'RichTextarea',
      componentProps: {
        options: {
          readonly: true,
        },
      },
    },
    {
      fieldName: 'toMails',
      label: $t('system.mail.template.fields.toMails'),
      component: 'Select',
      componentProps: {
        mode: 'tags',
        allowClear: true,
        placeholder: $t('system.mail.template.fields.toMailsPlaceholder'),
      },
    },
    {
      fieldName: 'ccMails',
      label: $t('system.mail.template.fields.ccMails'),
      component: 'Select',
      componentProps: {
        mode: 'tags',
        allowClear: true,
        placeholder: $t('system.mail.template.fields.ccMailsPlaceholder'),
      },
    },
    {
      fieldName: 'bccMails',
      label: $t('system.mail.template.fields.bccMails'),
      component: 'Select',
      componentProps: {
        mode: 'tags',
        allowClear: true,
        placeholder: $t('system.mail.template.fields.bccMailsPlaceholder'),
      },
    },
  ];
}

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'status',
      label: $t('system.mail.template.fields.status'),
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.COMMON_STATUS, 'number'),
        allowClear: true,
        placeholder: $t('system.mail.template.fields.statusPlaceholder'),
      },
    },
    {
      fieldName: 'code',
      label: $t('system.mail.template.fields.code'),
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: $t('system.mail.template.fields.codePlaceholder'),
      },
    },
    {
      fieldName: 'name',
      label: $t('system.mail.template.fields.name'),
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: $t('system.mail.template.fields.namePlaceholder'),
      },
    },
    {
      fieldName: 'accountId',
      label: $t('system.mail.template.fields.accountId'),
      component: 'ApiSelect',
      componentProps: {
        api: getSimpleMailAccountList,
        labelField: 'mail',
        valueField: 'id',
        allowClear: true,
        placeholder: $t('system.mail.template.fields.accountIdPlaceholder'),
      },
    },
    {
      fieldName: 'createTime',
      label: $t('system.mail.template.fields.gridCreateTime'),
      component: 'RangePicker',
      componentProps: {
        ...getRangePickerDefaultProps(),
        allowClear: true,
      },
    },
  ];
}

/** 列表的字段 */
export function useGridColumns(
  getAccountMail?: (accountId: number) => string | undefined,
): VxeTableGridOptions['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    {
      field: 'id',
      title: $t('system.mail.template.fields.gridId'),
      minWidth: 100,
    },
    {
      field: 'code',
      title: $t('system.mail.template.fields.gridCode'),
      minWidth: 120,
    },
    {
      field: 'name',
      title: $t('system.mail.template.fields.gridName'),
      minWidth: 120,
    },
    {
      field: 'title',
      title: $t('system.mail.template.fields.gridTitle'),
      minWidth: 120,
    },
    {
      field: 'accountId',
      title: $t('system.mail.template.fields.gridAccountId'),
      minWidth: 120,
      formatter: ({ cellValue }) => getAccountMail?.(cellValue) || '-',
    },
    {
      field: 'nickname',
      title: $t('system.mail.template.fields.gridNickname'),
      minWidth: 120,
    },
    {
      field: 'status',
      title: $t('system.mail.template.fields.gridStatus'),
      minWidth: 100,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.COMMON_STATUS },
      },
    },
    {
      field: 'createTime',
      title: $t('system.mail.template.fields.gridCreateTime'),
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      title: $t('system.mail.template.fields.gridActions'),
      width: 220,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}
