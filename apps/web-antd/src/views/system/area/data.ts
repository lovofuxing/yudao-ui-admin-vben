import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { SystemAreaApi } from '#/api/system/area';

import { z } from '#/adapter/form';
import { $t } from '#/locales';

/** 查询 IP 的表单 */
export function useFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'ip',
      label: $t('system.area.fields.ip'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.area.fields.ipPlaceholder'),
      },
      rules: z
        .string()
        .ip({ message: $t('system.area.fields.ipValidationMessage') }),
    },
    {
      fieldName: 'result',
      label: $t('system.area.fields.result'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.area.fields.resultPlaceholder'),
        readonly: true,
      },
    },
  ];
}

/** 列表的字段 */
export function useGridColumns(): VxeTableGridOptions<SystemAreaApi.Area>['columns'] {
  return [
    {
      field: 'id',
      title: $t('system.area.fields.id'),
      minWidth: 120,
      align: 'left',
      fixed: 'left',
      treeNode: true,
    },
    {
      field: 'name',
      title: $t('system.area.fields.name'),
      minWidth: 200,
    },
  ];
}
