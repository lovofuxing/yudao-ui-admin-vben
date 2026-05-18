import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { DICT_TYPE } from '@vben/constants';
import { $t } from '#/locales';

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'name',
      label: $t('bpm.form.fields.name'),
      component: 'Input',
      componentProps: {
        placeholder: $t('bpm.form.placeholder.name'),
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
      title: $t('bpm.form.fields.id'),
      minWidth: 100,
    },
    {
      field: 'name',
      title: $t('bpm.form.fields.name'),
      minWidth: 200,
    },
    {
      field: 'status',
      title: $t('bpm.form.fields.status'),
      minWidth: 200,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.COMMON_STATUS },
      },
    },
    {
      field: 'remark',
      title: $t('bpm.form.fields.remark'),
      minWidth: 200,
    },
    {
      field: 'createTime',
      title: $t('bpm.form.fields.createTime'),
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      title: $t('bpm.common.action'),
      width: 240,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}
