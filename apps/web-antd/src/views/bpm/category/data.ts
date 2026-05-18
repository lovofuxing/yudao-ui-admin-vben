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
      label: $t('bpm.category.fields.name'),
      component: 'Input',
      componentProps: {
        placeholder: $t('bpm.category.placeholder.name'),
      },
      rules: 'required',
    },
    {
      label: $t('bpm.category.fields.code'),
      fieldName: 'code',
      component: 'Input',
      componentProps: {
        placeholder: $t('bpm.category.placeholder.code'),
      },
      rules: 'required',
    },
    {
      fieldName: 'description',
      label: $t('bpm.category.fields.description'),
      component: 'Textarea',
      componentProps: {
        placeholder: $t('bpm.category.placeholder.description'),
      },
    },
    {
      fieldName: 'status',
      label: $t('bpm.category.fields.status'),
      component: 'RadioGroup',
      componentProps: {
        options: getDictOptions(DICT_TYPE.COMMON_STATUS, 'number'),
        buttonStyle: 'solid',
        optionType: 'button',
      },
      rules: z.number().default(CommonStatusEnum.ENABLE),
    },
    {
      fieldName: 'sort',
      label: $t('bpm.category.fields.sort'),
      component: 'InputNumber',
      componentProps: {
        min: 0,
        placeholder: $t('bpm.category.placeholder.sort'),
      },
    },
  ];
}

/** 重命名的表单 */
export function useRenameFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'name',
      label: $t('bpm.category.fields.name'),
      component: 'Input',
      componentProps: {
        placeholder: $t('bpm.category.placeholder.name'),
      },
      rules: 'required',
    },
  ];
}

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'name',
      label: $t('bpm.category.fields.name'),
      component: 'Input',
      componentProps: {
        placeholder: $t('bpm.category.placeholder.name'),
        allowClear: true,
      },
    },
    {
      fieldName: 'code',
      label: $t('bpm.category.fields.code'),
      component: 'Input',
      componentProps: {
        placeholder: $t('bpm.category.placeholder.code'),
        allowClear: true,
      },
    },
    {
      fieldName: 'status',
      label: $t('bpm.category.fields.status'),
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.COMMON_STATUS, 'number'),
        placeholder: $t('bpm.category.placeholder.status'),
        allowClear: true,
      },
    },
    {
      fieldName: 'createTime',
      label: $t('bpm.category.fields.createTime'),
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
    {
      field: 'id',
      title: $t('bpm.category.fields.id'),
      minWidth: 100,
    },
    {
      field: 'name',
      title: $t('bpm.category.fields.name'),
      minWidth: 200,
    },
    {
      field: 'code',
      title: $t('bpm.category.fields.code'),
      minWidth: 200,
    },
    {
      field: 'description',
      title: $t('bpm.category.fields.description'),
      minWidth: 200,
    },
    {
      field: 'status',
      title: $t('bpm.category.fields.status'),
      minWidth: 100,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.COMMON_STATUS },
      },
    },
    {
      field: 'sort',
      title: $t('bpm.category.fields.sort'),
      minWidth: 100,
    },
    {
      field: 'createTime',
      title: $t('bpm.category.fields.createTime'),
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      title: $t('bpm.common.action'),
      width: 180,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}
