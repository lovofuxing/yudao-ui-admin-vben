import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { DescriptionItemSchema } from '#/components/description';

import { h } from 'vue';

import { DICT_TYPE } from '@vben/constants';
import { formatDateTime } from '@vben/utils';

import { getSimpleUserList } from '#/api/system/user';
import { DictTag } from '#/components/dict-tag';
import { $t } from '#/locales';
import { getRangePickerDefaultProps } from '#/utils';

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'userId',
      label: $t('system.operatelog.fields.userId'),
      component: 'ApiSelect',
      componentProps: {
        api: getSimpleUserList,
        labelField: 'nickname',
        valueField: 'id',
        allowClear: true,
        placeholder: $t('system.operatelog.fields.userIdPlaceholder'),
      },
    },
    {
      fieldName: 'type',
      label: $t('system.operatelog.fields.type'),
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: $t('system.operatelog.fields.typePlaceholder'),
      },
    },
    {
      fieldName: 'subType',
      label: $t('system.operatelog.fields.subType'),
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: $t('system.operatelog.fields.subTypePlaceholder'),
      },
    },
    {
      fieldName: 'action',
      label: $t('system.operatelog.fields.action'),
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: $t('system.operatelog.fields.actionPlaceholder'),
      },
    },
    {
      fieldName: 'createTime',
      label: $t('system.operatelog.fields.createTime'),
      component: 'RangePicker',
      componentProps: {
        ...getRangePickerDefaultProps(),
        allowClear: true,
      },
    },
    {
      fieldName: 'bizId',
      label: $t('system.operatelog.fields.bizId'),
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: $t('system.operatelog.fields.bizIdPlaceholder'),
      },
    },
  ];
}

/** 列表的字段 */
export function useGridColumns(): VxeTableGridOptions['columns'] {
  return [
    {
      field: 'id',
      title: $t('system.operatelog.fields.id'),
      minWidth: 100,
    },
    {
      field: 'userName',
      title: $t('system.operatelog.fields.userId'),
      minWidth: 120,
    },
    {
      field: 'type',
      title: $t('system.operatelog.fields.type'),
      minWidth: 120,
    },
    {
      field: 'subType',
      title: $t('system.operatelog.fields.subType'),
      minWidth: 160,
    },
    {
      field: 'action',
      title: $t('system.operatelog.fields.action'),
      minWidth: 200,
    },
    {
      field: 'createTime',
      title: $t('system.operatelog.fields.createTime'),
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      field: 'bizId',
      title: $t('system.operatelog.fields.bizId'),
      minWidth: 120,
    },
    {
      field: 'userIp',
      title: $t('system.operatelog.fields.userIp'),
      minWidth: 120,
    },
    {
      title: $t('system.common.actions'),
      width: 80,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}

/** 详情页的字段 */
export function useDetailSchema(): DescriptionItemSchema[] {
  return [
    {
      field: 'id',
      label: $t('system.operatelog.fields.id'),
    },
    {
      field: 'traceId',
      label: $t('system.operatelog.fields.traceId'),
      show: (data) => !data?.traceId,
    },
    {
      field: 'userId',
      label: $t('system.operatelog.fields.userId'),
    },
    {
      field: 'userType',
      label: $t('system.operatelog.fields.userType'),
      render: (val) => h(DictTag, { type: DICT_TYPE.USER_TYPE, value: val }),
    },
    {
      field: 'userName',
      label: $t('system.operatelog.fields.userName'),
    },
    {
      field: 'userIp',
      label: $t('system.operatelog.fields.userIp'),
    },
    {
      field: 'userAgent',
      label: $t('system.operatelog.fields.userAgent'),
    },
    {
      field: 'type',
      label: $t('system.operatelog.fields.type'),
    },
    {
      field: 'subType',
      label: $t('system.operatelog.fields.subType'),
    },
    {
      field: 'action',
      label: $t('system.operatelog.fields.action'),
    },
    {
      field: 'extra',
      label: $t('system.operatelog.fields.extra'),
      show: (val) => !val,
    },
    {
      field: 'requestUrl',
      label: $t('system.operatelog.fields.requestUrl'),
      render: (val, data) => {
        if (data?.requestMethod && val) {
          return `${data.requestMethod} ${val}`;
        }
        return '';
      },
    },
    {
      field: 'createTime',
      label: $t('system.operatelog.fields.createTime'),
      render: (val) => formatDateTime(val) as string,
    },
    {
      field: 'bizId',
      label: $t('system.operatelog.fields.bizId'),
    },
  ];
}
