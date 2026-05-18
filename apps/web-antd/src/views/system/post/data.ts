import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { CommonStatusEnum, DICT_TYPE } from '@vben/constants';
import { getDictOptions } from '@vben/hooks';

import { z } from '#/adapter/form';
import { $t } from '#/locales';

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
      component: 'Input',
      fieldName: 'name',
      label: $t('system.post.fields.name'),
      componentProps: {
        placeholder: $t('system.post.fields.namePlaceholder'),
      },
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'code',
      label: $t('system.post.fields.code'),
      componentProps: {
        placeholder: $t('system.post.fields.codePlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'sort',
      label: $t('system.post.fields.sort'),
      component: 'InputNumber',
      componentProps: {
        min: 0,
        placeholder: $t('system.post.fields.sortPlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'status',
      label: $t('system.post.fields.status'),
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
      label: $t('system.post.fields.remark'),
      component: 'Textarea',
      componentProps: {
        placeholder: $t('system.post.fields.remarkPlaceholder'),
      },
    },
  ];
}

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'name',
      label: $t('system.post.fields.name'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.post.fields.namePlaceholder'),
        allowClear: true,
      },
    },
    {
      fieldName: 'code',
      label: $t('system.post.fields.code'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.post.fields.codePlaceholder'),
        allowClear: true,
      },
    },
    {
      fieldName: 'status',
      label: $t('system.post.fields.status'),
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.COMMON_STATUS, 'number'),
        placeholder: $t('system.post.fields.statusPlaceholder'),
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
      title: $t('system.post.fields.id'),
      minWidth: 200,
    },
    {
      field: 'name',
      title: $t('system.post.fields.name'),
      minWidth: 200,
    },
    {
      field: 'code',
      title: $t('system.post.fields.code'),
      minWidth: 200,
    },
    {
      field: 'sort',
      title: $t('system.post.fields.sort'),
      minWidth: 100,
    },
    {
      field: 'remark',
      title: $t('system.post.fields.remark'),
      minWidth: 200,
    },
    {
      field: 'status',
      title: $t('system.post.fields.status'),
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
      width: 130,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}
