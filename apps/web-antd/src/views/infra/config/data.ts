import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { $t } from '#/locales';

import { DICT_TYPE } from '@vben/constants';
import { getDictOptions } from '@vben/hooks';

import { getRangePickerDefaultProps } from '#/utils';

/** 新增/修改的表单 */
export function useFormSchema(): VbenFormSchema[] {
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
      fieldName: 'category',
      label: $t('infra.config.fields.category'),
      component: 'Input',
      componentProps: {
        placeholder: $t('infra.config.placeholder.category'),
      },
      rules: 'required',
    },
    {
      fieldName: 'name',
      label: $t('infra.config.fields.name'),
      component: 'Input',
      componentProps: {
        placeholder: $t('infra.config.placeholder.name'),
      },
      rules: 'required',
    },
    {
      fieldName: 'key',
      label: $t('infra.config.fields.key'),
      component: 'Input',
      componentProps: {
        placeholder: $t('infra.config.placeholder.key'),
      },
      rules: 'required',
    },
    {
      fieldName: 'value',
      label: $t('infra.config.fields.value'),
      component: 'Input',
      componentProps: {
        placeholder: $t('infra.config.placeholder.value'),
      },
      rules: 'required',
    },
    {
      fieldName: 'visible',
      label: $t('infra.config.fields.visible'),
      component: 'RadioGroup',
      componentProps: {
        options: getDictOptions(DICT_TYPE.INFRA_BOOLEAN_STRING, 'boolean'),
        buttonStyle: 'solid',
        optionType: 'button',
      },
      defaultValue: true,
      rules: 'required',
    },
    {
      fieldName: 'remark',
      label: $t('infra.config.fields.remark'),
      component: 'Textarea',
      componentProps: {
        placeholder: $t('infra.config.placeholder.remark'),
      },
    },
  ];
}

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'name',
      label: $t('infra.config.fields.name'),
      component: 'Input',
      componentProps: {
        placeholder: $t('infra.config.placeholder.name'),
        allowClear: true,
      },
    },
    {
      fieldName: 'key',
      label: $t('infra.config.fields.key'),
      component: 'Input',
      componentProps: {
        placeholder: $t('infra.config.placeholder.key'),
        allowClear: true,
      },
    },
    {
      fieldName: 'type',
      label: $t('infra.config.fields.type'),
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.INFRA_CONFIG_TYPE, 'number'),
        placeholder: $t('infra.config.placeholder.type'),
        allowClear: true,
      },
    },
    {
      fieldName: 'createTime',
      label: $t('infra.config.fields.createTime'),
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
      title: $t('infra.config.fields.id'),
      minWidth: 100,
    },
    {
      field: 'category',
      title: $t('infra.config.fields.category'),
      minWidth: 120,
    },
    {
      field: 'name',
      title: $t('infra.config.fields.name'),
      minWidth: 200,
    },
    {
      field: 'key',
      title: $t('infra.config.fields.key'),
      minWidth: 200,
    },
    {
      field: 'value',
      title: $t('infra.config.fields.value'),
      minWidth: 150,
    },
    {
      field: 'visible',
      title: $t('infra.config.fields.visible'),
      minWidth: 100,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.INFRA_BOOLEAN_STRING },
      },
    },
    {
      field: 'type',
      title: $t('infra.config.fields.type'),
      minWidth: 100,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.INFRA_CONFIG_TYPE },
      },
    },
    {
      field: 'remark',
      title: $t('infra.config.fields.remark'),
      minWidth: 150,
    },
    {
      field: 'createTime',
      title: $t('infra.config.fields.createTime'),
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      title: $t('infra.common.action'),
      width: 160,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}