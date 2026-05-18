import type { Recordable } from '@vben/types';

import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { InfraCodegenApi } from '#/api/infra/codegen';
import type { SystemMenuApi } from '#/api/system/menu';

import { h } from 'vue';

import { DICT_TYPE } from '@vben/constants';
import { getDictOptions } from '@vben/hooks';
import { IconifyIcon } from '@vben/icons';
import { handleTree } from '@vben/utils';

import { getDataSourceConfigList } from '#/api/infra/data-source-config';
import { getMenuList } from '#/api/system/menu';
import { $t } from '#/locales';
import { getRangePickerDefaultProps } from '#/utils';

/** 导入数据库表的表单 */
export function useImportTableFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'dataSourceConfigId',
      label: $t('infra.codegen.fields.dataSource'),
      component: 'ApiSelect',
      componentProps: {
        api: getDataSourceConfigList,
        labelField: 'name',
        valueField: 'id',
        autoSelect: 'first',
        placeholder: $t('infra.codegen.placeholder.dataSource'),
      },
      rules: 'selectRequired',
    },
    {
      fieldName: 'name',
      label: $t('infra.codegen.fields.tableName'),
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: $t('infra.codegen.placeholder.tableName'),
      },
    },
    {
      fieldName: 'comment',
      label: $t('infra.codegen.fields.tableComment'),
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: $t('infra.codegen.placeholder.tableComment'),
      },
    },
  ];
}

/** 导入数据库表表格列定义 */
export function useImportTableColumns(): VxeTableGridOptions['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    {
      field: 'name',
      title: $t('infra.codegen.fields.tableName'),
      minWidth: 200,
    },
    {
      field: 'comment',
      title: $t('infra.codegen.fields.tableComment'),
      minWidth: 200,
    },
  ];
}

/** 基本信息表单的 schema */
export function useBasicInfoFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'tableName',
      label: $t('infra.codegen.fields.tableName'),
      component: 'Input',
      componentProps: {
        placeholder: $t('infra.codegen.placeholder.tableName'),
      },
      rules: 'required',
    },
    {
      fieldName: 'tableComment',
      label: $t('infra.codegen.fields.tableComment'),
      component: 'Input',
      componentProps: {
        placeholder: $t('infra.codegen.placeholder.tableComment'),
      },
      rules: 'required',
    },
    {
      fieldName: 'className',
      label: $t('infra.codegen.fields.className'),
      component: 'Input',
      componentProps: {
        placeholder: $t('infra.codegen.placeholder.className'),
      },
      rules: 'required',
      help: $t('infra.codegen.helps.className'),
    },
    {
      fieldName: 'author',
      label: $t('infra.codegen.fields.author'),
      component: 'Input',
      componentProps: {
        placeholder: $t('infra.codegen.placeholder.author'),
      },
      rules: 'required',
    },
    {
      fieldName: 'remark',
      label: $t('infra.codegen.fields.remark'),
      component: 'Textarea',
      componentProps: {
        rows: 3,
        placeholder: $t('infra.codegen.placeholder.remark'),
      },
      formItemClass: 'md:col-span-2',
    },
  ];
}

/** 生成信息表单基础 schema */
export function useGenerationInfoBaseFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Select',
      fieldName: 'templateType',
      label: $t('infra.codegen.fields.templateType'),
      componentProps: {
        options: getDictOptions(
          DICT_TYPE.INFRA_CODEGEN_TEMPLATE_TYPE,
          'number',
        ),
        class: 'w-full',
      },
      rules: 'selectRequired',
    },
    {
      component: 'Select',
      fieldName: 'frontType',
      label: $t('infra.codegen.fields.frontType'),
      componentProps: {
        options: getDictOptions(DICT_TYPE.INFRA_CODEGEN_FRONT_TYPE, 'number'),
        class: 'w-full',
      },
      rules: 'selectRequired',
    },
    {
      component: 'Select',
      fieldName: 'scene',
      label: $t('infra.codegen.fields.scene'),
      componentProps: {
        options: getDictOptions(DICT_TYPE.INFRA_CODEGEN_SCENE, 'number'),
        class: 'w-full',
      },
      rules: 'selectRequired',
    },
    {
      fieldName: 'parentMenuId',
      label: $t('infra.codegen.fields.parentMenuId'),
      help: $t('infra.codegen.helps.parentMenuId'),
      component: 'ApiTreeSelect',
      componentProps: {
        allowClear: true,
        api: async () => {
          const data = await getMenuList();
          data.unshift({
            id: 0,
            name: $t('infra.codegen.topMenu'),
          } as SystemMenuApi.Menu);
          return handleTree(data);
        },
        class: 'w-full',
        labelField: 'name',
        valueField: 'id',
        childrenField: 'children',
        placeholder: $t('infra.codegen.placeholder.parentMenuId'),
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
      component: 'Input',
      fieldName: 'moduleName',
      label: $t('infra.codegen.fields.moduleName'),
      help: $t('infra.codegen.helps.moduleName'),
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'businessName',
      label: $t('infra.codegen.fields.businessName'),
      help: $t('infra.codegen.helps.businessName'),
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'className',
      label: $t('infra.codegen.fields.className'),
      help: $t('infra.codegen.helps.classNameHelp'),
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'classComment',
      label: $t('infra.codegen.fields.classComment'),
      help: $t('infra.codegen.helps.classComment'),
      rules: 'required',
    },
  ];
}

/** 树表信息 schema */
export function useGenerationInfoTreeFormSchema(
  columns: InfraCodegenApi.CodegenColumn[] = [],
): VbenFormSchema[] {
  return [
    {
      component: 'Divider',
      fieldName: 'treeDivider',
      label: '',
      renderComponentContent: () => {
        return {
          default: () => [$t('infra.codegen.treeInfo')],
        };
      },
      formItemClass: 'md:col-span-2',
    },
    {
      component: 'Select',
      fieldName: 'treeParentColumnId',
      label: $t('infra.codegen.fields.treeParentColumnId'),
      help: $t('infra.codegen.helps.treeParentColumnId'),
      componentProps: {
        class: 'w-full',
        allowClear: true,
        placeholder: $t('infra.codegen.placeholder.select'),
        options: columns.map((column) => ({
          label: column.columnName,
          value: column.id,
        })),
      },
      rules: 'selectRequired',
    },
    {
      component: 'Select',
      fieldName: 'treeNameColumnId',
      label: $t('infra.codegen.fields.treeNameColumnId'),
      help: $t('infra.codegen.helps.treeNameColumnId'),
      componentProps: {
        class: 'w-full',
        allowClear: true,
        placeholder: $t('infra.codegen.placeholder.treeNameColumnId'),
        options: columns.map((column) => ({
          label: column.columnName,
          value: column.id,
        })),
      },
      rules: 'selectRequired',
    },
  ];
}

/** 主子表信息 schema */
export function useGenerationInfoSubTableFormSchema(
  columns: InfraCodegenApi.CodegenColumn[] = [],
  tables: InfraCodegenApi.CodegenTable[] = [],
): VbenFormSchema[] {
  return [
    {
      component: 'Divider',
      fieldName: 'subDivider',
      label: '',
      renderComponentContent: () => {
        return {
          default: () => [$t('infra.codegen.subTableInfo')],
        };
      },
      formItemClass: 'md:col-span-2',
    },
    {
      component: 'Select',
      fieldName: 'masterTableId',
      label: $t('infra.codegen.fields.masterTableId'),
      help: $t('infra.codegen.helps.masterTableId'),
      componentProps: {
        class: 'w-full',
        allowClear: true,
        placeholder: $t('infra.codegen.placeholder.select'),
        options: tables.map((table) => ({
          label: `${table.tableName}：${table.tableComment}`,
          value: table.id,
        })),
      },
      rules: 'selectRequired',
    },
    {
      component: 'Select',
      fieldName: 'subJoinColumnId',
      label: $t('infra.codegen.fields.subJoinColumnId'),
      help: $t('infra.codegen.helps.subJoinColumnId'),
      componentProps: {
        class: 'w-full',
        allowClear: true,
        placeholder: $t('infra.codegen.placeholder.select'),
        options: columns.map((column) => ({
          label: `${column.columnName}:${column.columnComment}`,
          value: column.id,
        })),
      },
      rules: 'selectRequired',
    },
    {
      component: 'RadioGroup',
      fieldName: 'subJoinMany',
      label: $t('infra.codegen.fields.subJoinMany'),
      help: $t('infra.codegen.helps.subJoinMany'),
      componentProps: {
        class: 'w-full',
        allowClear: true,
        placeholder: $t('infra.codegen.placeholder.select'),
        options: [
          {
            label: $t('infra.codegen.relationOptions.oneToMany'),
            value: true,
          },
          {
            label: $t('infra.codegen.relationOptions.oneToOne'),
            value: false,
          },
        ],
      },
      rules: 'required',
    },
  ];
}

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'tableName',
      label: $t('infra.codegen.fields.tableName'),
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: $t('infra.codegen.placeholder.tableName'),
      },
    },
    {
      fieldName: 'tableComment',
      label: $t('infra.codegen.fields.tableComment'),
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: $t('infra.codegen.placeholder.tableComment'),
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
export function useGridColumns(
  getDataSourceConfigName?: (dataSourceConfigId: number) => string | undefined,
): VxeTableGridOptions['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    {
      field: 'dataSourceConfigId',
      title: $t('infra.codegen.fields.dataSource'),
      minWidth: 120,
      formatter: ({ cellValue }) => getDataSourceConfigName?.(cellValue) || '-',
    },
    {
      field: 'tableName',
      title: $t('infra.codegen.fields.tableName'),
      minWidth: 200,
    },
    {
      field: 'tableComment',
      title: $t('infra.codegen.fields.tableComment'),
      minWidth: 200,
    },
    {
      field: 'className',
      title: $t('infra.codegen.fields.className'),
      minWidth: 200,
    },
    {
      field: 'createTime',
      title: $t('infra.common.createTime'),
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      field: 'updateTime',
      title: $t('infra.codegen.fields.updateTime'),
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      title: $t('infra.common.action'),
      width: 280,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}

/** 代码生成表格列定义 */
export function useCodegenColumnTableColumns(): VxeTableGridOptions['columns'] {
  return [
    {
      field: 'columnName',
      title: $t('infra.codegen.fields.columnName'),
      minWidth: 130,
    },
    {
      field: 'columnComment',
      title: $t('infra.codegen.fields.columnComment'),
      minWidth: 100,
      slots: { default: 'columnComment' },
    },
    {
      field: 'dataType',
      title: $t('infra.codegen.fields.dataType'),
      minWidth: 100,
    },
    {
      field: 'javaType',
      title: $t('infra.codegen.fields.javaType'),
      minWidth: 130,
      slots: { default: 'javaType' },
      params: {
        options: [
          { label: 'Long', value: 'Long' },
          { label: 'String', value: 'String' },
          { label: 'Integer', value: 'Integer' },
          { label: 'Double', value: 'Double' },
          { label: 'BigDecimal', value: 'BigDecimal' },
          { label: 'LocalDateTime', value: 'LocalDateTime' },
          { label: 'Boolean', value: 'Boolean' },
        ],
      },
    },
    {
      field: 'javaField',
      title: $t('infra.codegen.fields.javaField'),
      minWidth: 100,
      slots: { default: 'javaField' },
    },
    {
      field: 'createOperation',
      title: $t('infra.codegen.fields.createOperation'),
      width: 40,
      slots: { default: 'createOperation' },
    },
    {
      field: 'updateOperation',
      title: $t('infra.codegen.fields.updateOperation'),
      width: 40,
      slots: { default: 'updateOperation' },
    },
    {
      field: 'listOperationResult',
      title: $t('infra.codegen.fields.listOperationResult'),
      width: 40,
      slots: { default: 'listOperationResult' },
    },
    {
      field: 'listOperation',
      title: $t('infra.codegen.fields.listOperation'),
      width: 40,
      slots: { default: 'listOperation' },
    },
    {
      field: 'listOperationCondition',
      title: $t('infra.codegen.fields.listOperationCondition'),
      minWidth: 100,
      slots: { default: 'listOperationCondition' },
      params: {
        options: [
          { label: '=', value: '=' },
          { label: '!=', value: '!=' },
          { label: '>', value: '>' },
          { label: '>=', value: '>=' },
          { label: '<', value: '<' },
          { label: '<=', value: '<=' },
          { label: 'LIKE', value: 'LIKE' },
          { label: 'BETWEEN', value: 'BETWEEN' },
        ],
      },
    },
    {
      field: 'nullable',
      title: $t('infra.codegen.fields.nullable'),
      width: 60,
      slots: { default: 'nullable' },
    },
    {
      field: 'htmlType',
      title: $t('infra.codegen.fields.htmlType'),
      width: 130,
      slots: { default: 'htmlType' },
      params: {
        options: [
          { label: $t('infra.codegen.htmlTypeOptions.input'), value: 'input' },
          {
            label: $t('infra.codegen.htmlTypeOptions.textarea'),
            value: 'textarea',
          },
          {
            label: $t('infra.codegen.htmlTypeOptions.select'),
            value: 'select',
          },
          { label: $t('infra.codegen.htmlTypeOptions.radio'), value: 'radio' },
          {
            label: $t('infra.codegen.htmlTypeOptions.checkbox'),
            value: 'checkbox',
          },
          {
            label: $t('infra.codegen.htmlTypeOptions.datetime'),
            value: 'datetime',
          },
          {
            label: $t('infra.codegen.htmlTypeOptions.imageUpload'),
            value: 'imageUpload',
          },
          {
            label: $t('infra.codegen.htmlTypeOptions.fileUpload'),
            value: 'fileUpload',
          },
          {
            label: $t('infra.codegen.htmlTypeOptions.editor'),
            value: 'editor',
          },
        ],
      },
    },
    {
      field: 'dictType',
      title: $t('infra.codegen.fields.dictType'),
      width: 120,
      slots: { default: 'dictType' },
    },
    {
      field: 'example',
      title: $t('infra.codegen.fields.example'),
      minWidth: 100,
      slots: { default: 'example' },
    },
  ];
}
