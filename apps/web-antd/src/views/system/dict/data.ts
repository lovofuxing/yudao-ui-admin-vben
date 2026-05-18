import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { CommonStatusEnum, DICT_TYPE } from '@vben/constants';
import { getDictOptions } from '@vben/hooks';

import { z } from '#/adapter/form';
import { getSimpleDictTypeList } from '#/api/system/dict/type';
import { $t } from '#/locales';

// ============================== 字典类型 ==============================

/** 类型新增/修改的表单 */
export function useTypeFormSchema(): VbenFormSchema[] {
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
      label: $t('system.dict.type.fields.name'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.dict.type.fields.namePlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'type',
      label: $t('system.dict.type.fields.type'),
      component: 'Input',
      componentProps: (values) => {
        return {
          placeholder: $t('system.dict.type.fields.typePlaceholder'),
          disabled: !!values.id,
        };
      },
      rules: 'required',
      dependencies: {
        triggerFields: [''],
      },
    },
    {
      fieldName: 'status',
      label: $t('system.dict.type.fields.status'),
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
      label: $t('system.dict.type.fields.remark'),
      component: 'Textarea',
      componentProps: {
        placeholder: $t('system.dict.type.fields.remarkPlaceholder'),
      },
    },
  ];
}

/** 类型列表的搜索表单 */
export function useTypeGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'name',
      label: $t('system.dict.type.fields.name'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.dict.type.fields.namePlaceholder'),
        allowClear: true,
      },
    },
    {
      fieldName: 'type',
      label: $t('system.dict.type.fields.type'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.dict.type.fields.typePlaceholder'),
        allowClear: true,
      },
    },
    {
      fieldName: 'status',
      label: $t('system.dict.type.fields.status'),
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.COMMON_STATUS, 'number'),
        placeholder: $t('system.dict.type.fields.statusPlaceholder'),
        allowClear: true,
      },
    },
  ];
}

/** 类型列表的字段 */
export function useTypeGridColumns(): VxeTableGridOptions['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    {
      field: 'id',
      title: $t('system.dict.type.fields.id'),
      minWidth: 100,
    },
    {
      field: 'name',
      title: $t('system.dict.type.fields.name'),
      minWidth: 200,
    },
    {
      field: 'type',
      title: $t('system.dict.type.fields.type'),
      minWidth: 220,
    },
    {
      field: 'status',
      title: $t('system.dict.type.fields.status'),
      minWidth: 120,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.COMMON_STATUS },
      },
    },
    {
      field: 'remark',
      title: $t('system.dict.type.fields.remark'),
      minWidth: 180,
    },
    {
      field: 'createTime',
      title: $t('system.dict.type.fields.createTime'),
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      title: $t('system.dict.type.fields.actions'),
      minWidth: 120,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}

// ============================== 字典数据 ==============================

// TODO @芋艿：后续针对 antd，增加
/**
 * 颜色选项
 */
const colorOptions = [
  { value: '', label: $t('system.dict.data.colorType.none') },
  { value: 'processing', label: $t('system.dict.data.colorType.primary') },
  { value: 'success', label: $t('system.dict.data.colorType.success') },
  { value: 'default', label: $t('system.dict.data.colorType.default') },
  { value: 'warning', label: $t('system.dict.data.colorType.warning') },
  { value: 'error', label: $t('system.dict.data.colorType.danger') },
  { value: 'pink', label: $t('system.dict.data.colorType.pink') },
  { value: 'red', label: $t('system.dict.data.colorType.red') },
  { value: 'orange', label: $t('system.dict.data.colorType.orange') },
  { value: 'green', label: $t('system.dict.data.colorType.green') },
  { value: 'cyan', label: $t('system.dict.data.colorType.cyan') },
  { value: 'blue', label: $t('system.dict.data.colorType.blue') },
  { value: 'purple', label: $t('system.dict.data.colorType.purple') },
];

/** 数据新增/修改的表单 */
export function useDataFormSchema(): VbenFormSchema[] {
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
      fieldName: 'dictType',
      label: $t('system.dict.data.fields.dictType'),
      component: 'ApiSelect',
      componentProps: (values) => {
        return {
          api: getSimpleDictTypeList,
          placeholder: $t('system.dict.data.fields.dictTypePlaceholder'),
          labelField: 'name',
          valueField: 'type',
          disabled: !!values.id,
        };
      },
      rules: 'required',
      dependencies: {
        triggerFields: [''],
      },
    },
    {
      fieldName: 'label',
      label: $t('system.dict.data.fields.label'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.dict.data.fields.labelPlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'value',
      label: $t('system.dict.data.fields.value'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.dict.data.fields.valuePlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'sort',
      label: $t('system.dict.data.fields.sort'),
      component: 'InputNumber',
      componentProps: {
        placeholder: $t('system.dict.data.fields.sortPlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'status',
      label: $t('system.dict.data.fields.status'),
      component: 'RadioGroup',
      componentProps: {
        options: getDictOptions(DICT_TYPE.COMMON_STATUS, 'number'),
        placeholder: $t('system.dict.data.fields.statusPlaceholder'),
        buttonStyle: 'solid',
        optionType: 'button',
      },
      rules: z.number().default(CommonStatusEnum.ENABLE),
    },
    {
      fieldName: 'colorType',
      label: $t('system.dict.data.fields.colorType'),
      component: 'Select',
      componentProps: {
        options: colorOptions,
        placeholder: $t('system.dict.data.fields.colorTypePlaceholder'),
      },
    },
    {
      fieldName: 'cssClass',
      label: $t('system.dict.data.fields.cssClass'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.dict.data.fields.cssClassPlaceholder'),
      },
      help: $t('system.dict.data.fields.cssClassHelp'),
    },
    {
      fieldName: 'remark',
      label: $t('system.dict.data.fields.remark'),
      component: 'Textarea',
      componentProps: {
        placeholder: $t('system.dict.data.fields.remarkPlaceholder'),
      },
    },
  ];
}

/** 字典数据列表搜索表单 */
export function useDataGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'label',
      label: $t('system.dict.data.fields.label'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.dict.data.fields.labelPlaceholder'),
        allowClear: true,
      },
    },
    {
      fieldName: 'status',
      label: $t('system.dict.data.fields.status'),
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.COMMON_STATUS, 'number'),
        placeholder: $t('system.dict.data.fields.statusPlaceholder'),
        allowClear: true,
      },
    },
  ];
}

/** 字典数据表格列 */
export function useDataGridColumns(): VxeTableGridOptions['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    {
      field: 'id',
      title: $t('system.dict.data.fields.id'),
      minWidth: 100,
    },
    {
      field: 'label',
      title: $t('system.dict.data.fields.label'),
      minWidth: 180,
    },
    {
      field: 'value',
      title: $t('system.dict.data.fields.value'),
      minWidth: 100,
    },
    {
      field: 'sort',
      title: $t('system.dict.data.fields.sort'),
      minWidth: 100,
    },
    {
      field: 'status',
      title: $t('system.dict.data.fields.status'),
      minWidth: 100,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.COMMON_STATUS },
      },
    },
    {
      field: 'colorType',
      title: $t('system.dict.data.fields.colorType'),
      minWidth: 120,
      slots: { default: 'colorType' },
    },
    {
      field: 'cssClass',
      title: $t('system.dict.data.fields.cssClass'),
      minWidth: 120,
      slots: { default: 'cssClass' },
    },
    {
      title: $t('system.dict.data.fields.createTime'),
      field: 'createTime',
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      title: $t('system.dict.data.fields.actions'),
      minWidth: 120,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}
