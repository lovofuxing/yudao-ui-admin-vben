import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

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
      fieldName: 'name',
      label: $t('infra.dataSourceConfig.fields.name'),
      component: 'Input',
      componentProps: {
        placeholder: $t('infra.dataSourceConfig.placeholder.name'),
      },
      rules: 'required',
    },
    {
      fieldName: 'url',
      label: $t('infra.dataSourceConfig.fields.url'),
      component: 'Input',
      componentProps: {
        placeholder: $t('infra.dataSourceConfig.placeholder.url'),
      },
      rules: 'required',
    },
    {
      fieldName: 'username',
      label: $t('infra.dataSourceConfig.fields.username'),
      component: 'Input',
      componentProps: {
        placeholder: $t('infra.dataSourceConfig.placeholder.username'),
      },
      rules: 'required',
    },
    {
      fieldName: 'password',
      label: $t('infra.dataSourceConfig.fields.password'),
      component: 'Input',
      componentProps: {
        placeholder: $t('infra.dataSourceConfig.placeholder.password'),
        type: 'password',
      },
      rules: 'required',
    },
  ];
}

/** 列表的字段 */
export function useGridColumns(): VxeTableGridOptions['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    {
      field: 'id',
      title: $t('infra.dataSourceConfig.fields.id'),
      minWidth: 100,
    },
    {
      field: 'name',
      title: $t('infra.dataSourceConfig.fields.name'),
      minWidth: 150,
    },
    {
      field: 'url',
      title: $t('infra.dataSourceConfig.fields.url'),
      minWidth: 300,
    },
    {
      field: 'username',
      title: $t('infra.dataSourceConfig.fields.username'),
      minWidth: 120,
    },
    {
      field: 'createTime',
      title: $t('infra.dataSourceConfig.fields.createTime'),
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