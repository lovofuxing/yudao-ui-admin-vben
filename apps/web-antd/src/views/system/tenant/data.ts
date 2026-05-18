import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { SystemTenantPackageApi } from '#/api/system/tenant-package';

import { CommonStatusEnum, DICT_TYPE } from '@vben/constants';
import { getDictOptions } from '@vben/hooks';

import { z } from '#/adapter/form';
import { getTenantPackageList } from '#/api/system/tenant-package';
import { $t } from '#/locales';
import { getRangePickerDefaultProps } from '#/utils';

/** 关联数据 */
let tenantPackageList: SystemTenantPackageApi.TenantPackage[] = [];
getTenantPackageList().then((data) => (tenantPackageList = data));

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
      label: $t('system.tenant.fields.name'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.tenant.fields.namePlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'packageId',
      label: $t('system.tenant.fields.packageId'),
      component: 'ApiSelect',
      componentProps: {
        api: getTenantPackageList,
        labelField: 'name',
        valueField: 'id',
        placeholder: $t('system.tenant.fields.packageIdPlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'contactName',
      label: $t('system.tenant.fields.contactName'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.tenant.fields.contactNamePlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'contactMobile',
      label: $t('system.tenant.fields.contactMobile'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.tenant.fields.contactMobilePlaceholder'),
      },
      rules: 'mobile',
    },
    {
      label: $t('system.tenant.fields.username'),
      fieldName: 'username',
      component: 'Input',
      componentProps: {
        placeholder: $t('system.tenant.fields.usernamePlaceholder'),
      },
      rules: 'required',
      dependencies: {
        triggerFields: ['id'],
        show: (values) => !values.id,
      },
    },
    {
      label: $t('system.tenant.fields.password'),
      fieldName: 'password',
      component: 'InputPassword',
      rules: 'required',
      dependencies: {
        triggerFields: ['id'],
        show: (values) => !values.id,
      },
    },
    {
      label: $t('system.tenant.fields.accountCount'),
      fieldName: 'accountCount',
      component: 'InputNumber',
      componentProps: {
        placeholder: $t('system.tenant.fields.accountCountPlaceholder'),
      },
      rules: 'required',
    },
    {
      label: $t('system.tenant.fields.expireTime'),
      fieldName: 'expireTime',
      component: 'DatePicker',
      componentProps: {
        format: 'YYYY-MM-DD',
        valueFormat: 'x',
        placeholder: $t('system.tenant.fields.expireTimePlaceholder'),
      },
      rules: 'required',
    },
    {
      label: $t('system.tenant.fields.websites'),
      fieldName: 'websites',
      component: 'Select',
      componentProps: {
        placeholder: $t('system.tenant.fields.websitesPlaceholder'),
        mode: 'tags',
        allowClear: true,
      },
    },
    {
      fieldName: 'status',
      label: $t('system.tenant.fields.status'),
      component: 'RadioGroup',
      componentProps: {
        options: getDictOptions(DICT_TYPE.COMMON_STATUS, 'number'),
        buttonStyle: 'solid',
        optionType: 'button',
      },
      rules: z.number().default(CommonStatusEnum.ENABLE),
    },
  ];
}

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'name',
      label: $t('system.tenant.fields.name'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.tenant.fields.nameSearchPlaceholder'),
        allowClear: true,
      },
    },
    {
      fieldName: 'contactName',
      label: $t('system.tenant.fields.contactName'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.tenant.fields.contactNamePlaceholder'),
        allowClear: true,
      },
    },
    {
      fieldName: 'contactMobile',
      label: $t('system.tenant.fields.contactMobile'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.tenant.fields.contactMobilePlaceholder'),
        allowClear: true,
      },
    },
    {
      fieldName: 'status',
      label: $t('system.tenant.fields.status'),
      component: 'Select',
      componentProps: {
        placeholder: $t('system.tenant.fields.statusPlaceholder'),
        allowClear: true,
        options: getDictOptions(DICT_TYPE.COMMON_STATUS, 'number'),
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
      title: $t('system.tenant.fields.id'),
      minWidth: 100,
    },
    {
      field: 'name',
      title: $t('system.tenant.fields.name'),
      minWidth: 180,
    },
    {
      field: 'packageId',
      title: $t('system.tenant.fields.packageId'),
      minWidth: 180,
      formatter: ({ cellValue }) => {
        return cellValue === 0
          ? $t('system.tenant.systemTenant')
          : tenantPackageList.find((pkg) => pkg.id === cellValue)?.name || '-';
      },
    },
    {
      field: 'contactName',
      title: $t('system.tenant.fields.contactName'),
      minWidth: 100,
    },
    {
      field: 'contactMobile',
      title: $t('system.tenant.fields.contactMobile'),
      minWidth: 180,
    },
    {
      field: 'accountCount',
      title: $t('system.tenant.fields.accountCount'),
      minWidth: 100,
    },
    {
      field: 'expireTime',
      title: $t('system.tenant.fields.expireTime'),
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      field: 'websites',
      title: $t('system.tenant.fields.websites'),
      minWidth: 180,
    },
    {
      field: 'status',
      title: $t('system.tenant.fields.status'),
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
