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
      fieldName: 'id',
      component: 'Input',
      dependencies: {
        triggerFields: [''],
        show: () => false,
      },
    },
    {
      fieldName: 'title',
      label: $t('system.notice.fields.title'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.notice.fields.titlePlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'type',
      label: $t('system.notice.fields.type'),
      component: 'RadioGroup',
      componentProps: {
        options: getDictOptions(DICT_TYPE.SYSTEM_NOTICE_TYPE, 'number'),
        buttonStyle: 'solid',
        optionType: 'button',
      },
      rules: 'required',
    },
    {
      fieldName: 'content',
      label: $t('system.notice.fields.content'),
      component: 'RichTextarea',
      rules: 'required',
    },
    {
      fieldName: 'status',
      label: $t('system.notice.fields.status'),
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
      label: $t('system.notice.fields.remark'),
      component: 'Textarea',
      componentProps: {
        placeholder: $t('system.notice.fields.remarkPlaceholder'),
      },
    },
  ];
}

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'title',
      label: $t('system.notice.fields.title'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.notice.fields.titlePlaceholder'),
        allowClear: true,
      },
    },
    {
      fieldName: 'status',
      label: $t('system.notice.fields.status'),
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.COMMON_STATUS, 'number'),
        placeholder: $t('system.notice.fields.statusPlaceholder'),
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
      title: $t('system.notice.fields.gridId'),
      minWidth: 100,
    },
    {
      field: 'title',
      title: $t('system.notice.fields.gridTitle'),
      minWidth: 200,
    },
    {
      field: 'type',
      title: $t('system.notice.fields.gridType'),
      minWidth: 100,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.SYSTEM_NOTICE_TYPE },
      },
    },
    {
      field: 'status',
      title: $t('system.notice.fields.gridStatus'),
      minWidth: 100,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.COMMON_STATUS },
      },
    },
    {
      field: 'createTime',
      title: $t('system.notice.fields.gridCreateTime'),
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      title: $t('system.notice.fields.gridActions'),
      width: 220,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}
