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
      fieldName: 'name',
      label: $t('system.tenantPackage.fields.name'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.tenantPackage.fields.namePlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'menuIds',
      label: $t('system.tenantPackage.fields.name'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.tenantPackage.fields.namePlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'status',
      label: $t('system.tenantPackage.fields.status'),
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
      label: $t('system.tenantPackage.fields.remark'),
      component: 'Textarea',
      componentProps: {
        placeholder: $t('system.tenantPackage.fields.remarkPlaceholder'),
      },
    },
  ];
}

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'name',
      label: $t('system.tenantPackage.fields.name'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.tenantPackage.fields.namePlaceholder'),
        allowClear: true,
      },
    },
    {
      fieldName: 'status',
      label: $t('system.tenantPackage.fields.status'),
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.COMMON_STATUS, 'number'),
        allowClear: true,
        placeholder: $t('system.tenantPackage.fields.statusPlaceholder'),
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
      title: $t('system.tenantPackage.fields.gridId'),
      minWidth: 100,
    },
    {
      field: 'name',
      title: $t('system.tenantPackage.fields.gridName'),
      minWidth: 180,
    },
    {
      field: 'status',
      title: $t('system.tenantPackage.fields.gridStatus'),
      minWidth: 100,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.COMMON_STATUS },
      },
    },
    {
      field: 'remark',
      title: $t('system.tenantPackage.fields.gridRemark'),
      minWidth: 200,
    },
    {
      field: 'createTime',
      title: $t('system.tenantPackage.fields.gridCreateTime'),
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      title: $t('system.tenantPackage.fields.gridActions'),
      width: 220,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}
