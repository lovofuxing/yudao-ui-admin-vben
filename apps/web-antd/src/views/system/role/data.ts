import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import {
  CommonStatusEnum,
  DICT_TYPE,
  SystemDataScopeEnum,
} from '@vben/constants';
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
      label: $t('system.role.fields.name'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.role.fields.namePlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'code',
      label: $t('system.role.fields.code'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.role.fields.codePlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'sort',
      label: $t('system.role.fields.sort'),
      component: 'InputNumber',
      componentProps: {
        min: 0,
        placeholder: $t('system.role.fields.sortPlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'status',
      label: $t('system.role.fields.status'),
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
      label: $t('system.role.fields.remark'),
      component: 'Textarea',
      componentProps: {
        placeholder: $t('system.role.fields.remarkPlaceholder'),
      },
    },
  ];
}

/** 分配数据权限的表单 */
export function useAssignDataPermissionFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'id',
      dependencies: {
        triggerFields: [''],
        show: () => false,
      },
    },
    {
      fieldName: 'name',
      label: $t('system.role.fields.name'),
      component: 'Input',
      componentProps: {
        disabled: true,
      },
    },
    {
      component: 'Input',
      fieldName: 'code',
      label: $t('system.role.fields.code'),
      componentProps: {
        disabled: true,
      },
    },
    {
      component: 'Select',
      fieldName: 'dataScope',
      label: $t('system.role.fields.dataScope'),
      componentProps: {
        options: getDictOptions(DICT_TYPE.SYSTEM_DATA_SCOPE, 'number'),
      },
    },
    {
      fieldName: 'dataScopeDeptIds',
      label: $t('system.role.fields.dataScopeDeptIds'),
      component: 'Input',
      formItemClass: 'items-start',
      dependencies: {
        triggerFields: ['dataScope'],
        show: (values) => {
          return values.dataScope === SystemDataScopeEnum.DEPT_CUSTOM;
        },
      },
    },
  ];
}

/** 分配菜单的表单 */
export function useAssignMenuFormSchema(): VbenFormSchema[] {
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
      label: $t('system.role.fields.name'),
      component: 'Input',
      componentProps: {
        disabled: true,
      },
    },
    {
      fieldName: 'code',
      label: $t('system.role.fields.code'),
      component: 'Input',
      componentProps: {
        disabled: true,
      },
    },
    {
      fieldName: 'menuIds',
      label: $t('system.role.fields.menuIds'),
      component: 'Input',
      formItemClass: 'items-start',
    },
  ];
}

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'name',
      label: $t('system.role.fields.name'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.role.fields.namePlaceholder'),
        allowClear: true,
      },
    },
    {
      fieldName: 'code',
      label: $t('system.role.fields.code'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.role.fields.codePlaceholder'),
        allowClear: true,
      },
    },
    {
      fieldName: 'status',
      label: $t('system.role.fields.status'),
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.COMMON_STATUS, 'number'),
        placeholder: $t('system.role.fields.statusPlaceholder'),
        allowClear: true,
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
      title: $t('system.role.fields.id'),
      minWidth: 100,
    },
    {
      field: 'name',
      title: $t('system.role.fields.name'),
      minWidth: 200,
    },
    {
      field: 'type',
      title: $t('system.role.fields.type'),
      minWidth: 100,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.SYSTEM_ROLE_TYPE },
      },
    },
    {
      field: 'code',
      title: $t('system.role.fields.code'),
      minWidth: 200,
    },
    {
      field: 'sort',
      title: $t('system.role.fields.sort'),
      minWidth: 100,
    },
    {
      field: 'remark',
      title: $t('system.role.fields.remark'),
      minWidth: 100,
    },
    {
      field: 'status',
      title: $t('system.role.fields.status'),
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
      width: 240,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}
