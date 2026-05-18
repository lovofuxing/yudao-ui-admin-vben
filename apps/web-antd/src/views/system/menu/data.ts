import type { Recordable } from '@vben/types';

import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { SystemMenuApi } from '#/api/system/menu';

import { h } from 'vue';

import {
  CommonStatusEnum,
  DICT_TYPE,
  SystemMenuTypeEnum,
} from '@vben/constants';
import { getDictOptions } from '@vben/hooks';
import { IconifyIcon } from '@vben/icons';
import { handleTree, isHttpUrl } from '@vben/utils';

import { z } from '#/adapter/form';
import { getMenuList } from '#/api/system/menu';
import { $t } from '#/locales';
import { componentKeys } from '#/router/routes';

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
      fieldName: 'parentId',
      label: $t('system.menu.fields.parentId'),
      component: 'ApiTreeSelect',
      componentProps: {
        allowClear: true,
        api: async () => {
          const data = await getMenuList();
          data.unshift({
            id: 0,
            name: $t('system.menu.fields.rootMenu'),
          } as SystemMenuApi.Menu);
          return handleTree(data);
        },
        labelField: 'name',
        valueField: 'id',
        childrenField: 'children',
        placeholder: $t('system.menu.fields.parentIdPlaceholder'),
        filterTreeNode(input: string, node: Recordable<any>) {
          if (!input || input.length === 0) {
            return true;
          }
          const name: string = node.label ?? '';
          if (!name) return false;
          return name.includes(input) || $t(name).includes(input);
        },
        showSearch: true,
        treeDefaultExpandedKeys: [0],
      },
      rules: 'selectRequired',
      renderComponentContent() {
        return {
          title({ label, icon }: { icon: string; label: string }) {
            const components = [];
            if (!label) return '';
            if (icon) {
              components.push(h(IconifyIcon, { class: 'size-4', icon }));
            }
            components.push(h('span', { class: '' }, $t(label || '')));
            return h('div', { class: 'flex items-center gap-1' }, components);
          },
        };
      },
    },
    {
      fieldName: 'name',
      label: $t('system.menu.fields.name'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.menu.fields.namePlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'type',
      label: $t('system.menu.fields.type'),
      component: 'RadioGroup',
      componentProps: {
        options: getDictOptions(DICT_TYPE.SYSTEM_MENU_TYPE, 'number'),
        buttonStyle: 'solid',
        optionType: 'button',
      },
      rules: z.number().default(SystemMenuTypeEnum.DIR),
    },
    {
      fieldName: 'icon',
      label: $t('system.menu.fields.icon'),
      component: 'IconPicker',
      componentProps: {
        placeholder: $t('system.menu.fields.iconPlaceholder'),
        prefix: 'carbon',
      },
      rules: 'required',
      dependencies: {
        triggerFields: ['type'],
        show: (values) => {
          return [SystemMenuTypeEnum.DIR, SystemMenuTypeEnum.MENU].includes(
            values.type,
          );
        },
      },
    },
    {
      fieldName: 'path',
      label: $t('system.menu.fields.path'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.menu.fields.pathPlaceholder'),
      },
      rules: z.string(),
      help: $t('system.menu.fields.pathHelp'),
      dependencies: {
        triggerFields: ['type', 'parentId'],
        show: (values) => {
          return [SystemMenuTypeEnum.DIR, SystemMenuTypeEnum.MENU].includes(
            values.type,
          );
        },
        rules: (values) => {
          const schema = z
            .string()
            .min(1, $t('system.menu.fields.pathRequired'));
          if (isHttpUrl(values.path)) {
            return schema;
          }
          if (values.parentId === 0) {
            return schema.refine(
              (path) => path.charAt(0) === '/',
              $t('system.menu.fields.pathStartWithSlash'),
            );
          }
          return schema.refine(
            (path) => path.charAt(0) !== '/',
            $t('system.menu.fields.pathNotStartWithSlash'),
          );
        },
      },
    },
    {
      fieldName: 'component',
      label: $t('system.menu.fields.component'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.menu.fields.componentPlaceholder'),
      },
      dependencies: {
        triggerFields: ['type'],
        show: (values) => {
          return [SystemMenuTypeEnum.MENU].includes(values.type);
        },
      },
    },
    {
      fieldName: 'componentName',
      label: $t('system.menu.fields.componentName'),
      component: 'AutoComplete',
      componentProps: {
        allowClear: true,
        filterOption(input: string, option: { value: string }) {
          return option.value.toLowerCase().includes(input.toLowerCase());
        },
        placeholder: $t('system.menu.fields.componentNamePlaceholder'),
        options: componentKeys.map((v) => ({ value: v })),
      },
      dependencies: {
        triggerFields: ['type'],
        show: (values) => {
          return [SystemMenuTypeEnum.MENU].includes(values.type);
        },
      },
    },
    {
      fieldName: 'permission',
      label: $t('system.menu.fields.permission'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.menu.fields.permissionPlaceholder'),
      },
      dependencies: {
        show: (values) => {
          return [SystemMenuTypeEnum.BUTTON, SystemMenuTypeEnum.MENU].includes(
            values.type,
          );
        },
        triggerFields: ['type'],
      },
    },
    {
      fieldName: 'sort',
      label: $t('system.menu.fields.sort'),
      component: 'InputNumber',
      componentProps: {
        min: 0,
        placeholder: $t('system.menu.fields.sortPlaceholder'),
      },
      rules: 'required',
    },
    {
      fieldName: 'status',
      label: $t('system.menu.fields.status'),
      component: 'RadioGroup',
      componentProps: {
        options: getDictOptions(DICT_TYPE.COMMON_STATUS, 'number'),
        buttonStyle: 'solid',
        optionType: 'button',
      },
      rules: z.number().default(CommonStatusEnum.ENABLE),
    },
    {
      fieldName: 'visible',
      label: $t('system.menu.fields.visible'),
      component: 'RadioGroup',
      componentProps: {
        options: [
          { label: $t('system.menu.fields.visibleOption'), value: true },
          { label: $t('system.menu.fields.hiddenOption'), value: false },
        ],
        buttonStyle: 'solid',
        optionType: 'button',
      },
      rules: 'required',
      defaultValue: true,
      help: $t('system.menu.fields.visibleHelp'),
      dependencies: {
        triggerFields: ['type'],
        show: (values) => {
          return [SystemMenuTypeEnum.DIR, SystemMenuTypeEnum.MENU].includes(
            values.type,
          );
        },
      },
    },
    {
      fieldName: 'alwaysShow',
      label: $t('system.menu.fields.alwaysShow'),
      component: 'RadioGroup',
      componentProps: {
        options: [
          { label: $t('system.menu.fields.alwaysOption'), value: true },
          { label: $t('system.menu.fields.notAlwaysOption'), value: false },
        ],
        buttonStyle: 'solid',
        optionType: 'button',
      },
      rules: 'required',
      defaultValue: true,
      help: $t('system.menu.fields.alwaysShowHelp'),
      dependencies: {
        triggerFields: ['type'],
        show: (values) => {
          return [SystemMenuTypeEnum.MENU].includes(values.type);
        },
      },
    },
    {
      fieldName: 'keepAlive',
      label: $t('system.menu.fields.keepAlive'),
      component: 'RadioGroup',
      componentProps: {
        options: [
          { label: $t('system.menu.fields.cacheOption'), value: true },
          { label: $t('system.menu.fields.noCacheOption'), value: false },
        ],
        buttonStyle: 'solid',
        optionType: 'button',
      },
      rules: 'required',
      defaultValue: true,
      help: $t('system.menu.fields.keepAliveHelp'),
      dependencies: {
        triggerFields: ['type'],
        show: (values) => {
          return [SystemMenuTypeEnum.MENU].includes(values.type);
        },
      },
    },
  ];
}

/** 列表的字段 */
export function useGridColumns(): VxeTableGridOptions<SystemMenuApi.Menu>['columns'] {
  return [
    {
      field: 'name',
      title: $t('system.menu.fields.name'),
      minWidth: 250,
      align: 'left',
      fixed: 'left',
      slots: { default: 'name' },
      treeNode: true,
    },
    {
      field: 'type',
      title: $t('system.menu.fields.type'),
      minWidth: 100,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.SYSTEM_MENU_TYPE },
      },
    },
    {
      field: 'sort',
      title: $t('system.menu.fields.gridSort'),
      minWidth: 100,
    },
    {
      field: 'permission',
      title: $t('system.menu.fields.permission'),
      minWidth: 200,
    },
    {
      field: 'path',
      title: $t('system.menu.fields.gridPath'),
      minWidth: 200,
    },
    {
      field: 'componentName',
      title: $t('system.menu.fields.componentName'),
      minWidth: 200,
    },
    {
      field: 'status',
      title: $t('system.menu.fields.gridStatus'),
      minWidth: 100,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.COMMON_STATUS },
      },
    },
    {
      title: $t('system.common.actions'),
      width: 220,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}
