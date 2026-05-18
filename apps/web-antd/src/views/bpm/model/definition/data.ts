import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { DICT_TYPE } from '@vben/constants';
import { $t } from '#/locales';

/** 列表的字段 */
export function useGridColumns(): VxeTableGridOptions['columns'] {
  return [
    {
      field: 'id',
      title: $t('bpm.model.definition.fields.id'),
      minWidth: 250,
    },
    {
      field: 'name',
      title: $t('bpm.model.definition.fields.name'),
      minWidth: 150,
    },
    {
      field: 'icon',
      title: $t('bpm.model.definition.fields.icon'),
      minWidth: 100,
      cellRender: {
        name: 'CellImage',
        props: {
          width: 24,
          height: 24,
        },
      },
    },
    {
      field: 'startUsers',
      title: $t('bpm.model.definition.fields.visibleRange'),
      minWidth: 100,
      slots: { default: 'startUsers' },
    },
    {
      field: 'modelType',
      title: $t('bpm.model.definition.fields.type'),
      minWidth: 120,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.BPM_MODEL_TYPE },
      },
    },
    {
      field: 'formType',
      title: $t('bpm.model.definition.fields.formInfo'),
      minWidth: 150,
      slots: { default: 'formInfo' },
    },
    {
      field: 'version',
      title: $t('bpm.model.definition.fields.version'),
      minWidth: 80,
      cellRender: {
        name: 'CellTag',
      },
    },
    {
      field: 'deploymentTime',
      title: $t('bpm.model.definition.fields.deploymentTime'),
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      title: $t('bpm.common.action'),
      width: 120,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}
