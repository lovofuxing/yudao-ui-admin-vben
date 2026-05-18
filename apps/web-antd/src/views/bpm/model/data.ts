import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { BpmModelApi } from '#/api/bpm/model';

import { DICT_TYPE } from '@vben/constants';

import { $t } from '#/locales';

/** 列表的字段 */
export function useGridColumns(): VxeTableGridOptions<BpmModelApi.Model>['columns'] {
  return [
    {
      field: 'name',
      title: $t('bpm.model.fields.name'),
      minWidth: 200,
      slots: { default: 'name' },
    },
    {
      field: 'startUserIds',
      title: $t('bpm.model.fields.visibleRange'),
      minWidth: 150,
      slots: { default: 'startUserIds' },
    },
    {
      field: 'type',
      title: $t('bpm.model.fields.type'),
      minWidth: 120,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.BPM_MODEL_TYPE },
      },
    },
    {
      field: 'formType',
      title: $t('bpm.model.fields.formInfo'),
      minWidth: 150,
      slots: { default: 'formInfo' },
    },
    {
      field: 'deploymentTime',
      title: $t('bpm.model.fields.lastDeploy'),
      minWidth: 280,
      slots: { default: 'deploymentTime' },
    },
    {
      title: $t('bpm.common.action'),
      width: 150,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}
