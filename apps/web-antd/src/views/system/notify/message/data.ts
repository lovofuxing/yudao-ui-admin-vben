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
      fieldName: 'userId',
      label: $t('system.notify.message.fields.userId'),
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: $t('system.notify.message.fields.userIdPlaceholder'),
      },
    },
    {
      fieldName: 'userType',
      label: $t('system.notify.message.fields.userType'),
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: getDictOptions(DICT_TYPE.USER_TYPE, 'number'),
        placeholder: $t('system.notify.message.fields.userTypePlaceholder'),
      },
    },
    {
      fieldName: 'templateCode',
      label: $t('system.notify.message.fields.templateCode'),
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: $t('system.notify.message.fields.templateCodePlaceholder'),
      },
    },
    {
      fieldName: 'templateType',
      label: $t('system.notify.message.fields.templateType'),
      component: 'Select',
      componentProps: {
        options: getDictOptions(
          DICT_TYPE.SYSTEM_NOTIFY_TEMPLATE_TYPE,
          'number',
        ),
        allowClear: true,
        placeholder: $t('system.notify.message.fields.templateTypePlaceholder'),
      },
    },
    {
      fieldName: 'createTime',
      label: $t('system.notify.message.fields.createTime'),
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
      field: 'id',
      title: $t('system.notify.message.fields.gridId'),
      minWidth: 100,
    },
    {
      field: 'userType',
      title: $t('system.notify.message.fields.gridUserType'),
      minWidth: 120,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.USER_TYPE },
      },
    },
    {
      field: 'userId',
      title: $t('system.notify.message.fields.gridUserId'),
      minWidth: 100,
    },
    {
      field: 'templateCode',
      title: $t('system.notify.message.fields.gridTemplateCode'),
      minWidth: 120,
    },
    {
      field: 'templateNickname',
      title: $t('system.notify.message.fields.gridTemplateNickname'),
      minWidth: 180,
    },
    {
      field: 'templateContent',
      title: $t('system.notify.message.fields.gridTemplateContent'),
      minWidth: 200,
    },
    {
      field: 'templateParams',
      title: $t('system.notify.message.fields.templateParams'),
      minWidth: 180,
      formatter: ({ cellValue }) => {
        try {
          return JSON.stringify(cellValue);
        } catch {
          return '';
        }
      },
    },
    {
      field: 'templateType',
      title: $t('system.notify.message.fields.gridTemplateType'),
      minWidth: 120,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.SYSTEM_NOTIFY_TEMPLATE_TYPE },
      },
    },
    {
      field: 'readStatus',
      title: $t('system.notify.message.fields.gridReadStatus'),
      minWidth: 100,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.INFRA_BOOLEAN_STRING },
      },
    },
    {
      field: 'readTime',
      title: $t('system.notify.message.fields.gridReadTime'),
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      field: 'createTime',
      title: $t('system.notify.message.fields.gridCreateTime'),
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      title: $t('system.notify.message.fields.gridActions'),
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
      label: $t('system.notify.message.fields.gridId'),
    },
    {
      field: 'userType',
      label: $t('system.notify.message.fields.gridUserType'),
      render: (val) => {
        return h(DictTag, {
          type: DICT_TYPE.USER_TYPE,
          value: val,
        });
      },
    },
    {
      field: 'userId',
      label: $t('system.notify.message.fields.gridUserId'),
    },
    {
      field: 'templateId',
      label: $t('system.notify.message.fields.templateId'),
    },
    {
      field: 'templateCode',
      label: $t('system.notify.message.fields.gridTemplateCode'),
    },
    {
      field: 'templateNickname',
      label: $t('system.notify.message.fields.gridTemplateNickname'),
    },
    {
      field: 'templateContent',
      label: $t('system.notify.message.fields.gridTemplateContent'),
    },
    {
      field: 'templateParams',
      label: $t('system.notify.message.fields.templateParams'),
      render: (val) => {
        try {
          return JSON.stringify(val);
        } catch {
          return '';
        }
      },
    },
    {
      field: 'templateType',
      label: $t('system.notify.message.fields.gridTemplateType'),
      render: (val) => {
        return h(DictTag, {
          type: DICT_TYPE.SYSTEM_NOTIFY_TEMPLATE_TYPE,
          value: val,
        });
      },
    },
    {
      field: 'readStatus',
      label: $t('system.notify.message.fields.gridReadStatus'),
      render: (val) => {
        return h(DictTag, {
          type: DICT_TYPE.INFRA_BOOLEAN_STRING,
          value: val,
        });
      },
    },
    {
      field: 'readTime',
      label: $t('system.notify.message.fields.gridReadTime'),
      render: (val) => formatDateTime(val) as string,
    },
    {
      field: 'createTime',
      label: $t('system.notify.message.fields.gridCreateTime'),
      render: (val) => formatDateTime(val) as string,
    },
  ];
}
