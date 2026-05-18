import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { DICT_TYPE } from '@vben/constants';
import { getDictOptions } from '@vben/hooks';

import { $t } from '#/locales';
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
      fieldName: 'name',
      label: $t('infra.fileConfig.fields.name'),
      component: 'Input',
      componentProps: {
        placeholder: $t('infra.fileConfig.placeholder.name'),
      },
      rules: 'required',
    },
    {
      fieldName: 'storage',
      label: $t('infra.fileConfig.fields.storage'),
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.INFRA_FILE_STORAGE, 'number'),
        placeholder: $t('infra.fileConfig.placeholder.storage'),
      },
      rules: 'required',
      dependencies: {
        triggerFields: ['id'],
        disabled: (formValues) => formValues.id,
      },
    },
    {
      fieldName: 'remark',
      label: $t('infra.fileConfig.fields.remark'),
      component: 'Textarea',
      componentProps: {
        placeholder: $t('infra.fileConfig.placeholder.remark'),
      },
    },
    // DB / Local / FTP / SFTP
    {
      fieldName: 'config.basePath',
      label: $t('infra.fileConfig.fields.basePath'),
      component: 'Input',
      componentProps: {
        placeholder: $t('infra.fileConfig.placeholder.basePath'),
      },
      rules: 'required',
      dependencies: {
        triggerFields: ['storage'],
        show: (formValues) =>
          formValues.storage >= 10 && formValues.storage <= 12,
      },
    },
    {
      fieldName: 'config.host',
      label: $t('infra.fileConfig.fields.host'),
      component: 'Input',
      componentProps: {
        placeholder: $t('infra.fileConfig.placeholder.host'),
      },
      rules: 'required',
      dependencies: {
        triggerFields: ['storage'],
        show: (formValues) =>
          formValues.storage >= 11 && formValues.storage <= 12,
      },
    },
    {
      fieldName: 'config.port',
      label: $t('infra.fileConfig.fields.port'),
      component: 'InputNumber',
      componentProps: {
        min: 0,
        placeholder: $t('infra.fileConfig.placeholder.port'),
      },
      rules: 'required',
      dependencies: {
        triggerFields: ['storage'],
        show: (formValues) =>
          formValues.storage >= 11 && formValues.storage <= 12,
      },
    },
    {
      fieldName: 'config.username',
      label: $t('infra.fileConfig.fields.username'),
      component: 'Input',
      componentProps: {
        placeholder: $t('infra.fileConfig.placeholder.username'),
      },
      rules: 'required',
      dependencies: {
        triggerFields: ['storage'],
        show: (formValues) =>
          formValues.storage >= 11 && formValues.storage <= 12,
      },
    },
    {
      fieldName: 'config.password',
      label: $t('infra.fileConfig.fields.password'),
      component: 'Input',
      componentProps: {
        placeholder: $t('infra.fileConfig.placeholder.password'),
      },
      rules: 'required',
      dependencies: {
        triggerFields: ['storage'],
        show: (formValues) =>
          formValues.storage >= 11 && formValues.storage <= 12,
      },
    },
    {
      fieldName: 'config.mode',
      label: $t('infra.fileConfig.fields.mode'),
      component: 'RadioGroup',
      componentProps: {
        options: [
          { label: $t('infra.fileConfig.modeOptions.active'), value: 'Active' },
          { label: $t('infra.fileConfig.modeOptions.passive'), value: 'Passive' },
        ],
        buttonStyle: 'solid',
        optionType: 'button',
      },
      rules: 'required',
      dependencies: {
        triggerFields: ['storage'],
        show: (formValues) => formValues.storage === 11,
      },
    },
    // S3
    {
      fieldName: 'config.endpoint',
      label: $t('infra.fileConfig.fields.endpoint'),
      component: 'Input',
      componentProps: {
        placeholder: $t('infra.fileConfig.placeholder.endpoint'),
      },
      rules: 'required',
      dependencies: {
        triggerFields: ['storage'],
        show: (formValues) => formValues.storage === 20,
      },
    },
    {
      fieldName: 'config.bucket',
      label: $t('infra.fileConfig.fields.bucket'),
      component: 'Input',
      componentProps: {
        placeholder: $t('infra.fileConfig.placeholder.bucket'),
      },
      rules: 'required',
      dependencies: {
        triggerFields: ['storage'],
        show: (formValues) => formValues.storage === 20,
      },
    },
    {
      fieldName: 'config.accessKey',
      label: $t('infra.fileConfig.fields.accessKey'),
      component: 'Input',
      componentProps: {
        placeholder: $t('infra.fileConfig.placeholder.accessKey'),
      },
      rules: 'required',
      dependencies: {
        triggerFields: ['storage'],
        show: (formValues) => formValues.storage === 20,
      },
    },
    {
      fieldName: 'config.accessSecret',
      label: $t('infra.fileConfig.fields.accessSecret'),
      component: 'Input',
      componentProps: {
        placeholder: $t('infra.fileConfig.placeholder.accessSecret'),
      },
      rules: 'required',
      dependencies: {
        triggerFields: ['storage'],
        show: (formValues) => formValues.storage === 20,
      },
    },
    {
      fieldName: 'config.enablePathStyleAccess',
      label: $t('infra.fileConfig.fields.pathStyle'),
      component: 'RadioGroup',
      componentProps: {
        options: [
          { label: $t('infra.fileConfig.pathStyleOptions.enabled'), value: true },
          { label: $t('infra.fileConfig.pathStyleOptions.disabled'), value: false },
        ],
        buttonStyle: 'solid',
        optionType: 'button',
      },
      rules: 'required',
      dependencies: {
        triggerFields: ['storage'],
        show: (formValues) => formValues.storage === 20,
      },
      defaultValue: false,
    },
    {
      fieldName: 'config.enablePublicAccess',
      label: $t('infra.fileConfig.fields.publicAccess'),
      component: 'RadioGroup',
      componentProps: {
        options: [
          { label: $t('infra.fileConfig.publicAccessOptions.public'), value: true },
          { label: $t('infra.fileConfig.publicAccessOptions.private'), value: false },
        ],
        buttonStyle: 'solid',
        optionType: 'button',
      },
      rules: 'required',
      dependencies: {
        triggerFields: ['storage'],
        show: (formValues) => formValues.storage === 20,
      },
      defaultValue: false,
    },
    {
      fieldName: 'config.region',
      label: $t('infra.fileConfig.fields.region'),
      component: 'Input',
      componentProps: {
        placeholder: $t('infra.fileConfig.placeholder.region'),
      },
      dependencies: {
        triggerFields: ['storage'],
        show: (formValues) => formValues.storage === 20,
      },
    },
    // 通用
    {
      fieldName: 'config.domain',
      label: $t('infra.fileConfig.fields.domain'),
      component: 'Input',
      componentProps: {
        placeholder: $t('infra.fileConfig.placeholder.domain'),
      },
      rules: 'required',
      dependencies: {
        triggerFields: ['storage'],
        show: (formValues) => !!formValues.storage,
      },
    },
  ];
}

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'name',
      label: $t('infra.fileConfig.fields.name'),
      component: 'Input',
      componentProps: {
        placeholder: $t('infra.fileConfig.placeholder.name'),
        allowClear: true,
      },
    },
    {
      fieldName: 'storage',
      label: $t('infra.fileConfig.fields.storage'),
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.INFRA_FILE_STORAGE, 'number'),
        placeholder: $t('infra.fileConfig.placeholder.storage'),
        allowClear: true,
      },
    },
    {
      fieldName: 'createTime',
      label: $t('infra.common.createTime'),
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
      title: $t('infra.fileConfig.fields.id'),
      minWidth: 100,
    },
    {
      field: 'name',
      title: $t('infra.fileConfig.fields.name'),
      minWidth: 120,
    },
    {
      field: 'storage',
      title: $t('infra.fileConfig.fields.storage'),
      minWidth: 100,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.INFRA_FILE_STORAGE },
      },
    },
    {
      field: 'remark',
      title: $t('infra.fileConfig.fields.remark'),
      minWidth: 150,
    },
    {
      field: 'master',
      title: $t('infra.fileConfig.fields.master'),
      minWidth: 100,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.INFRA_BOOLEAN_STRING },
      },
    },
    {
      field: 'createTime',
      title: $t('infra.common.createTime'),
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      title: $t('infra.common.action'),
      width: 240,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}
