import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { SystemDeptApi } from '#/api/system/dept';
import type { SystemUserApi } from '#/api/system/user';

import { CommonStatusEnum, DICT_TYPE } from '@vben/constants';
import { getDictOptions } from '@vben/hooks';
import { handleTree } from '@vben/utils';

import { z } from '#/adapter/form';
import { getDeptList } from '#/api/system/dept';
import { getSimpleUserList } from '#/api/system/user';
import { $t } from '#/locales';

/** 关联数据 */
let userList: SystemUserApi.User[] = [];
getSimpleUserList().then((data) => (userList = data));

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
      fieldName: 'parentId',
      label: $t('system.dept.fields.parentId'),
      component: 'ApiTreeSelect',
      componentProps: {
        allowClear: true,
        api: async () => {
          const data = await getDeptList();
          data.unshift({
            id: 0,
            name: $t('system.dept.fields.topLevelDept'),
          });
          return handleTree(data);
        },
        labelField: 'name',
        valueField: 'id',
        childrenField: 'children',
        placeholder: $t('system.dept.fields.parentIdPlaceholder'),
        treeDefaultExpandAll: true,
      },
      rules: 'selectRequired',
    },
    {
      fieldName: 'name',
      label: $t('system.dept.fields.name'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.dept.fields.namePlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'sort',
      label: $t('system.dept.fields.sort'),
      component: 'InputNumber',
      componentProps: {
        min: 0,
        placeholder: $t('system.dept.fields.sortPlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'leaderUserId',
      label: $t('system.dept.fields.leaderUserId'),
      component: 'ApiSelect',
      componentProps: {
        api: getSimpleUserList,
        labelField: 'nickname',
        valueField: 'id',
        placeholder: $t('system.dept.fields.leaderUserIdPlaceholder'),
        allowClear: true,
      },
      rules: z.number().optional(),
    },
    {
      fieldName: 'phone',
      label: $t('system.dept.fields.phone'),
      component: 'Input',
      componentProps: {
        maxLength: 11,
        placeholder: $t('system.dept.fields.phonePlaceholder'),
      },
      rules: 'mobileRequired',
    },
    {
      fieldName: 'email',
      label: $t('system.dept.fields.email'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.dept.fields.emailPlaceholder'),
      },
      rules: z.string().email($t('system.dept.fields.emailValidationMessage')).or(z.literal('')).optional(),
    },
    {
      fieldName: 'status',
      label: $t('system.dept.fields.status'),
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

/** 列表的字段 */
export function useGridColumns(): VxeTableGridOptions<SystemDeptApi.Dept>['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    {
      field: 'name',
      title: $t('system.dept.fields.name'),
      minWidth: 150,
      align: 'left',
      fixed: 'left',
      treeNode: true,
    },
    {
      field: 'leaderUserId',
      title: $t('system.dept.fields.leaderUserId'),
      minWidth: 150,
      formatter: ({ cellValue }) =>
        userList.find((user) => user.id === cellValue)?.nickname || '-',
    },
    {
      field: 'sort',
      title: $t('system.dept.fields.sort'),
      minWidth: 100,
    },
    {
      field: 'status',
      title: $t('system.dept.fields.status'),
      minWidth: 100,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.COMMON_STATUS },
      },
    },
    {
      field: 'createTime',
      title: $t('system.dept.fields.createTime'),
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      title: $t('system.dept.fields.actions'),
      width: 220,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}
