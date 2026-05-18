import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { $t } from '#/locales';
import { getRangePickerDefaultProps } from '#/utils';

/** 表单的字段 */
export function useFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'file',
      label: $t('infra.file.fields.file'),
      component: 'Upload',
      componentProps: {
        placeholder: $t('infra.file.placeholder.file'),
      },
      rules: 'required',
    },
  ];
}

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'path',
      label: $t('infra.file.fields.path'),
      component: 'Input',
      componentProps: {
        placeholder: $t('infra.file.placeholder.path'),
        clearable: true,
      },
    },
    {
      fieldName: 'type',
      label: $t('infra.file.fields.type'),
      component: 'Input',
      componentProps: {
        placeholder: $t('infra.file.placeholder.type'),
        clearable: true,
      },
    },
    {
      fieldName: 'createTime',
      label: $t('infra.file.fields.createTime'),
      component: 'RangePicker',
      componentProps: {
        ...getRangePickerDefaultProps(),
        clearable: true,
      },
    },
  ];
}

/** 列表的字段 */
export function useGridColumns(): VxeTableGridOptions['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    {
      field: 'name',
      title: $t('infra.file.fields.name'),
      minWidth: 150,
    },
    {
      field: 'path',
      title: $t('infra.file.fields.path'),
      minWidth: 200,
      showOverflow: true,
    },
    {
      field: 'url',
      title: $t('infra.file.fields.url'),
      minWidth: 200,
      showOverflow: true,
    },
    {
      field: 'size',
      title: $t('infra.file.fields.size'),
      minWidth: 80,
      formatter: 'formatFileSize',
    },
    {
      field: 'type',
      title: $t('infra.file.fields.type'),
      minWidth: 120,
    },
    {
      field: 'file-content',
      title: $t('infra.file.fields.fileContent'),
      minWidth: 120,
      slots: {
        default: 'file-content',
      },
    },
    {
      field: 'createTime',
      title: $t('infra.file.fields.createTime'),
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
