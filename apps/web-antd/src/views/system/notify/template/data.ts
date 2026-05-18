import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { CommonStatusEnum, DICT_TYPE, UserTypeEnum } from '@vben/constants';
import { getDictOptions } from '@vben/hooks';

import { z } from '#/adapter/form';
import { getSimpleUserList } from '#/api/system/user';
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
      label: $t('system.notify.template.fields.name'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.notify.template.fields.namePlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'code',
      label: $t('system.notify.template.fields.code'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.notify.template.fields.codePlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'nickname',
      label: $t('system.notify.template.fields.nickname'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.notify.template.fields.nicknamePlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'content',
      label: $t('system.notify.template.fields.content'),
      component: 'Textarea',
      componentProps: {
        placeholder: $t('system.notify.template.fields.contentPlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'type',
      label: $t('system.notify.template.fields.type'),
      component: 'Select',
      componentProps: {
        options: getDictOptions(
          DICT_TYPE.SYSTEM_NOTIFY_TEMPLATE_TYPE,
          'number',
        ),
        placeholder: $t('system.notify.template.fields.typePlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'status',
      label: $t('system.notify.template.fields.status'),
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
      label: $t('system.notify.template.fields.remark'),
      component: 'Textarea',
      componentProps: {
        placeholder: $t('system.notify.template.fields.remarkPlaceholder'),
      },
    },
  ];
}

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'name',
      label: $t('system.notify.template.fields.name'),
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: $t('system.notify.template.fields.namePlaceholder'),
      },
    },
    {
      fieldName: 'code',
      label: $t('system.notify.template.fields.code'),
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: $t('system.notify.template.fields.codePlaceholder'),
      },
    },
    {
      fieldName: 'status',
      label: $t('system.notify.template.fields.status'),
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.COMMON_STATUS, 'number'),
        allowClear: true,
        placeholder: $t('system.notify.template.fields.statusPlaceholder'),
      },
    },
    {
      fieldName: 'type',
      label: $t('system.notify.template.fields.type'),
      component: 'Select',
      componentProps: {
        options: getDictOptions(
          DICT_TYPE.SYSTEM_NOTIFY_TEMPLATE_TYPE,
          'number',
        ),
        allowClear: true,
        placeholder: $t('system.notify.template.fields.typePlaceholder'),
      },
    },
    {
      fieldName: 'createTime',
      label: $t('system.notify.template.fields.createTime'),
      component: 'RangePicker',
      componentProps: {
        ...getRangePickerDefaultProps(),
        allowClear: true,
      },
    },
  ];
}

/** 发送站内信表单 */
export function useSendNotifyFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'content',
      label: $t('system.notify.template.fields.content'),
      component: 'Textarea',
      componentProps: {
        disabled: true,
      },
    },
    {
      fieldName: 'templateCode',
      label: $t('system.notify.template.fields.code'),
      component: 'Input',
      dependencies: {
        triggerFields: [''],
        show: () => false,
      },
    },
    {
      fieldName: 'userType',
      label: $t('system.notify.template.fields.userType'),
      component: 'RadioGroup',
      componentProps: {
        options: getDictOptions(DICT_TYPE.USER_TYPE, 'number'),
      },
      rules: z.number().default(UserTypeEnum.MEMBER),
    },
    {
      fieldName: 'userId',
      label: $t('system.notify.template.fields.userId'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.notify.template.fields.userIdPlaceholder'),
      },
      dependencies: {
        show(values) {
          return values.userType === UserTypeEnum.MEMBER;
        },
        triggerFields: ['userType'],
      },
      rules: 'required',
    },
    {
      fieldName: 'userId',
      label: $t('system.notify.template.fields.userNickname'),
      component: 'ApiSelect',
      componentProps: {
        api: getSimpleUserList,
        labelField: 'nickname',
        valueField: 'id',
        placeholder: $t(
          'system.notify.template.fields.userNicknamePlaceholder',
        ),
      },
      dependencies: {
        show(values) {
          return values.userType === UserTypeEnum.ADMIN;
        },
        triggerFields: ['userType'],
      },
      rules: 'required',
    },
    {
      fieldName: 'templateParams',
      label: $t('system.notify.template.fields.templateParams'),
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
      title: $t('system.notify.template.fields.gridId'),
      minWidth: 100,
    },
    {
      field: 'name',
      title: $t('system.notify.template.fields.gridName'),
      minWidth: 120,
    },
    {
      field: 'code',
      title: $t('system.notify.template.fields.gridCode'),
      minWidth: 120,
    },
    {
      field: 'nickname',
      title: $t('system.notify.template.fields.gridNickname'),
      minWidth: 120,
    },
    {
      field: 'content',
      title: $t('system.notify.template.fields.gridContent'),
      minWidth: 200,
    },
    {
      field: 'type',
      title: $t('system.notify.template.fields.gridType'),
      minWidth: 120,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.SYSTEM_NOTIFY_TEMPLATE_TYPE },
      },
    },
    {
      field: 'status',
      title: $t('system.notify.template.fields.gridStatus'),
      minWidth: 100,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.COMMON_STATUS },
      },
    },
    {
      field: 'remark',
      title: $t('system.notify.template.fields.gridRemark'),
      minWidth: 120,
    },
    {
      field: 'createTime',
      title: $t('system.notify.template.fields.gridCreateTime'),
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      title: $t('system.notify.template.fields.gridActions'),
      width: 220,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}
