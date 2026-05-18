import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { SystemUserApi } from '#/api/system/user';

import { CommonStatusEnum, DICT_TYPE } from '@vben/constants';
import { getDictOptions } from '@vben/hooks';
import { $t } from '@vben/locales';
import { handleTree } from '@vben/utils';

import { z } from '#/adapter/form';
import { getDeptList } from '#/api/system/dept';
import { getSimplePostList } from '#/api/system/post';
import { getSimpleRoleList } from '#/api/system/role';
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
      fieldName: 'username',
      label: $t('system.user.fields.username'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.user.fields.usernamePlaceholder'),
      },
      rules: 'required',
    },
    {
      label: $t('system.user.fields.password'),
      fieldName: 'password',
      component: 'InputPassword',
      rules: 'required',
      dependencies: {
        triggerFields: ['id'],
        show: (values) => !values.id,
      },
    },
    {
      fieldName: 'nickname',
      label: $t('system.user.fields.nickname'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.user.fields.nicknamePlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'deptId',
      label: $t('system.user.fields.deptId'),
      component: 'ApiTreeSelect',
      componentProps: {
        api: async () => {
          const data = await getDeptList();
          return handleTree(data);
        },
        labelField: 'name',
        valueField: 'id',
        childrenField: 'children',
        placeholder: $t('system.user.fields.deptPlaceholder'),
        treeDefaultExpandAll: true,
      },
    },
    {
      fieldName: 'postIds',
      label: $t('system.user.fields.postIds'),
      component: 'ApiSelect',
      componentProps: {
        api: getSimplePostList,
        labelField: 'name',
        valueField: 'id',
        mode: 'multiple',
        placeholder: $t('system.user.fields.postPlaceholder'),
      },
    },
    {
      fieldName: 'email',
      label: $t('system.user.fields.email'),
      component: 'Input',
      rules: z.string().email($t('system.user.fields.emailInvalid')).or(z.literal('')).optional(),
      componentProps: {
        placeholder: $t('system.user.fields.emailPlaceholder'),
      },
    },
    {
      fieldName: 'mobile',
      label: $t('system.user.fields.mobile'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.user.fields.mobilePlaceholder'),
      },
    },
    {
      fieldName: 'sex',
      label: $t('system.user.fields.sex'),
      component: 'RadioGroup',
      componentProps: {
        options: getDictOptions(DICT_TYPE.SYSTEM_USER_SEX, 'number'),
        buttonStyle: 'solid',
        optionType: 'button',
      },
      rules: z.number().default(1),
    },
    {
      fieldName: 'status',
      label: $t('system.user.fields.status'),
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
      label: $t('system.user.fields.remark'),
      component: 'Textarea',
      componentProps: {
        placeholder: $t('system.user.fields.remarkPlaceholder'),
      },
    },
  ];
}

/** 重置密码的表单 */
export function useResetPasswordFormSchema(): VbenFormSchema[] {
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
      component: 'VbenInputPassword',
      componentProps: {
        passwordStrength: true,
        placeholder: $t('system.user.fields.newPasswordPlaceholder'),
      },
      dependencies: {
        rules(values) {
          return z
            .string({ message: $t('system.user.fields.newPasswordRequired') })
            .min(5, $t('system.user.fields.passwordMinLength'))
            .max(20, $t('system.user.fields.passwordMaxLength'))
            .refine(
              (value) => value !== values.oldPassword,
              $t('system.user.fields.passwordSameAsOld'),
            );
        },
        triggerFields: ['newPassword', 'oldPassword'],
      },
      fieldName: 'newPassword',
      label: $t('system.user.fields.newPassword'),
      rules: 'required',
    },
    {
      component: 'VbenInputPassword',
      componentProps: {
        passwordStrength: true,
        placeholder: $t('authentication.confirmPassword'),
      },
      dependencies: {
        rules(values) {
          return z
            .string({ message: $t('system.user.fields.confirmPasswordRequired') })
            .min(5, $t('system.user.fields.passwordMinLength'))
            .max(20, $t('system.user.fields.passwordMaxLength'))
            .refine(
              (value) => value === values.newPassword,
              $t('system.user.fields.passwordMismatch'),
            );
        },
        triggerFields: ['newPassword', 'confirmPassword'],
      },
      fieldName: 'confirmPassword',
      label: $t('system.user.fields.confirmPassword'),
      rules: 'required',
    },
  ];
}

/** 分配角色的表单 */
export function useAssignRoleFormSchema(): VbenFormSchema[] {
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
      fieldName: 'username',
      label: $t('system.user.fields.username'),
      component: 'Input',
      componentProps: {
        disabled: true,
      },
    },
    {
      fieldName: 'nickname',
      label: $t('system.user.fields.nickname'),
      component: 'Input',
      componentProps: {
        disabled: true,
      },
    },
    {
      fieldName: 'roleIds',
      label: $t('system.user.fields.roleIds'),
      component: 'ApiSelect',
      componentProps: {
        api: getSimpleRoleList,
        labelField: 'name',
        valueField: 'id',
        mode: 'multiple',
        placeholder: $t('system.user.fields.rolePlaceholder'),
      },
    },
  ];
}

/** 用户导入的表单 */
export function useImportFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'file',
      label: $t('system.user.import.file'),
      component: 'Upload',
      rules: 'required',
      help: $t('system.user.import.fileHelp'),
    },
    {
      fieldName: 'updateSupport',
      label: $t('system.user.import.updateSupport'),
      component: 'Switch',
      componentProps: {
        checkedChildren: $t('system.user.import.yes'),
        unCheckedChildren: $t('system.user.import.no'),
      },
      rules: z.boolean().default(false),
      help: $t('system.user.import.updateSupportHelp'),
    },
  ];
}

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'username',
      label: $t('system.user.fields.username'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.user.fields.usernamePlaceholder'),
        allowClear: true,
      },
    },
    {
      fieldName: 'mobile',
      label: $t('system.user.fields.mobile'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.user.fields.mobilePlaceholder'),
        allowClear: true,
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
export function useGridColumns(
  onStatusChange?: (
    newStatus: number,
    row: SystemUserApi.User,
  ) => PromiseLike<boolean | undefined>,
): VxeTableGridOptions['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    {
      field: 'id',
      title: $t('system.user.fields.gridId'),
      minWidth: 100,
    },
    {
      field: 'username',
      title: $t('system.user.fields.gridUsername'),
      minWidth: 120,
    },
    {
      field: 'nickname',
      title: $t('system.user.fields.gridNickname'),
      minWidth: 120,
    },
    {
      field: 'deptName',
      title: $t('system.user.fields.deptName'),
      minWidth: 120,
    },
    {
      field: 'mobile',
      title: $t('system.user.fields.gridMobile'),
      minWidth: 120,
    },
    {
      field: 'status',
      title: $t('system.user.fields.gridStatus'),
      minWidth: 100,
      align: 'center',
      cellRender: {
        attrs: { beforeChange: onStatusChange },
        name: 'CellSwitch',
        props: {
          checkedValue: CommonStatusEnum.ENABLE,
          unCheckedValue: CommonStatusEnum.DISABLE,
        },
      },
    },
    {
      field: 'createTime',
      title: $t('system.user.fields.gridCreateTime'),
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      title: $t('system.user.fields.gridActions'),
      width: 180,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}
