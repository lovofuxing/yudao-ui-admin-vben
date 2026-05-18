import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { DescriptionItemSchema } from '#/components/description';

import { h } from 'vue';

import { DICT_TYPE } from '@vben/constants';
import { getDictOptions } from '@vben/hooks';
import { formatDateTime } from '@vben/utils';

import { DictTag } from '#/components/dict-tag';
import { $t } from '#/locales';
import { getRangePickerDefaultProps } from '#/utils';

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'readStatus',
      label: $t('system.notify.my.fields.readStatus'),
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.INFRA_BOOLEAN_STRING, 'boolean'),
        allowClear: true,
        placeholder: $t('system.notify.my.fields.readStatusPlaceholder'),
      },
    },
    {
      fieldName: 'createTime',
      label: $t('system.notify.my.fields.sendTime'),
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
    {
      title: '',
      width: 40,
      type: 'checkbox',
    },
    {
      field: 'templateNickname',
      title: $t('system.notify.my.fields.gridNickname'),
      minWidth: 180,
    },
    {
      field: 'createTime',
      title: $t('system.notify.my.fields.gridSendTime'),
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      field: 'templateType',
      title: $t('system.notify.my.fields.gridType'),
      minWidth: 120,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.SYSTEM_NOTIFY_TEMPLATE_TYPE },
      },
    },
    {
      field: 'templateContent',
      title: $t('system.notify.my.fields.gridContent'),
      minWidth: 300,
    },
    {
      field: 'readStatus',
      title: $t('system.notify.my.fields.gridReadStatus'),
      minWidth: 100,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.INFRA_BOOLEAN_STRING },
      },
    },
    {
      field: 'readTime',
      title: $t('system.notify.my.fields.gridReadTime'),
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      title: $t('system.notify.my.fields.gridActions'),
      width: 130,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}

export function useDetailSchema(): DescriptionItemSchema[] {
  return [
    {
      field: 'templateNickname',
      label: $t('system.notify.my.fields.gridNickname'),
    },
    {
      field: 'createTime',
      label: $t('system.notify.my.fields.gridSendTime'),
      render: (val) => formatDateTime(val) as string,
    },
    {
      field: 'templateType',
      label: $t('system.notify.my.fields.gridType'),
      render: (val) => {
        return h(DictTag, {
          type: DICT_TYPE.SYSTEM_NOTIFY_TEMPLATE_TYPE,
          value: val,
        });
      },
    },
    {
      field: 'readStatus',
      label: $t('system.notify.my.fields.gridReadStatus'),
      render: (val) => {
        return h(DictTag, {
          type: DICT_TYPE.INFRA_BOOLEAN_STRING,
          value: val,
        });
      },
    },
    {
      field: 'readTime',
      label: $t('system.notify.my.fields.gridReadTime'),
      render: (val) => formatDateTime(val) as string,
    },
    {
      field: 'templateContent',
      label: $t('system.notify.my.fields.gridContent'),
    },
  ];
}
