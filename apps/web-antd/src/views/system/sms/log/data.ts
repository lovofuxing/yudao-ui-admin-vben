import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { DescriptionItemSchema } from '#/components/description';

import { h } from 'vue';

import { DICT_TYPE } from '@vben/constants';
import { getDictOptions } from '@vben/hooks';
import { formatDateTime } from '@vben/utils';

import { getSimpleSmsChannelList } from '#/api/system/sms/channel';
import { DictTag } from '#/components/dict-tag';
import { $t } from '#/locales';
import { getRangePickerDefaultProps } from '#/utils';

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'mobile',
      label: $t('system.sms.log.fields.mobile'),
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: $t('system.sms.log.fields.mobilePlaceholder'),
      },
    },
    {
      fieldName: 'channelId',
      label: $t('system.sms.log.fields.channelCode'),
      component: 'ApiSelect',
      componentProps: {
        api: getSimpleSmsChannelList,
        labelField: 'signature',
        valueField: 'id',
        allowClear: true,
        placeholder: $t('system.sms.log.fields.channelPlaceholder'),
      },
    },
    {
      fieldName: 'templateId',
      label: $t('system.sms.log.fields.templateId'),
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: $t('system.sms.log.fields.templateIdPlaceholder'),
      },
    },
    {
      fieldName: 'sendStatus',
      label: $t('system.sms.log.fields.sendStatus'),
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.SYSTEM_SMS_SEND_STATUS, 'number'),
        allowClear: true,
        placeholder: $t('system.sms.log.fields.sendStatusPlaceholder'),
      },
    },
    {
      fieldName: 'sendTime',
      label: $t('system.sms.log.fields.sendTime'),
      component: 'RangePicker',
      componentProps: {
        ...getRangePickerDefaultProps(),
        allowClear: true,
      },
    },
    {
      fieldName: 'receiveStatus',
      label: $t('system.sms.log.fields.receiveStatus'),
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.SYSTEM_SMS_RECEIVE_STATUS, 'number'),
        allowClear: true,
        placeholder: $t('system.sms.log.fields.receiveStatusPlaceholder'),
      },
    },
    {
      fieldName: 'receiveTime',
      label: $t('system.sms.log.fields.receiveTime'),
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
      title: $t('system.common.id'),
      minWidth: 100,
    },
    {
      field: 'mobile',
      title: $t('system.sms.log.fields.mobile'),
      minWidth: 120,
    },
    {
      field: 'templateContent',
      title: $t('system.sms.log.fields.templateContent'),
      minWidth: 300,
    },
    {
      field: 'sendStatus',
      title: $t('system.sms.log.fields.sendStatus'),
      minWidth: 120,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.SYSTEM_SMS_SEND_STATUS },
      },
    },
    {
      field: 'sendTime',
      title: $t('system.sms.log.fields.sendTime'),
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      field: 'receiveStatus',
      title: $t('system.sms.log.fields.receiveStatus'),
      minWidth: 120,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.SYSTEM_SMS_RECEIVE_STATUS },
      },
    },
    {
      field: 'receiveTime',
      title: $t('system.sms.log.fields.receiveTime'),
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      field: 'channelCode',
      title: $t('system.sms.log.fields.channelCode'),
      minWidth: 120,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.SYSTEM_SMS_CHANNEL_CODE },
      },
    },
    {
      field: 'templateId',
      title: $t('system.sms.log.fields.templateId'),
      minWidth: 100,
    },
    {
      field: 'templateType',
      title: $t('system.sms.log.fields.templateType'),
      minWidth: 100,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.SYSTEM_SMS_TEMPLATE_TYPE },
      },
    },
    {
      field: 'createTime',
      title: $t('system.common.createTime'),
      minWidth: 180,
      formatter: 'formatDateTime',
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
      field: 'createTime',
      label: $t('system.common.createTime'),
      render: (val) => formatDateTime(val) as string,
    },
    {
      field: 'mobile',
      label: $t('system.sms.log.fields.mobile'),
    },
    {
      field: 'channelCode',
      label: $t('system.sms.log.fields.channelCode'),
    },
    {
      field: 'templateId',
      label: $t('system.sms.log.fields.templateId'),
    },
    {
      field: 'templateType',
      label: $t('system.sms.log.fields.templateType'),
      render: (val) => {
        return h(DictTag, {
          type: DICT_TYPE.SYSTEM_SMS_TEMPLATE_TYPE,
          value: val,
        });
      },
    },
    {
      field: 'templateContent',
      label: $t('system.sms.log.fields.templateContent'),
    },
    {
      field: 'sendStatus',
      label: $t('system.sms.log.fields.sendStatus'),
      render: (val) => {
        return h(DictTag, {
          type: DICT_TYPE.SYSTEM_SMS_SEND_STATUS,
          value: val,
        });
      },
    },
    {
      field: 'sendTime',
      label: $t('system.sms.log.fields.sendTime'),
      render: (val) => formatDateTime(val) as string,
    },
    {
      field: 'apiSendCode',
      label: $t('system.sms.log.fields.apiSendCode'),
    },
    {
      field: 'apiSendMsg',
      label: $t('system.sms.log.fields.apiSendMsg'),
    },
    {
      field: 'receiveStatus',
      label: $t('system.sms.log.fields.receiveStatus'),
      render: (val) => {
        return h(DictTag, {
          type: DICT_TYPE.SYSTEM_SMS_RECEIVE_STATUS,
          value: val,
        });
      },
    },
    {
      field: 'receiveTime',
      label: $t('system.sms.log.fields.receiveTime'),
      render: (val) => formatDateTime(val) as string,
    },
    {
      field: 'apiReceiveCode',
      label: $t('system.sms.log.fields.apiReceiveCode'),
    },
    {
      field: 'apiReceiveMsg',
      label: $t('system.sms.log.fields.apiReceiveMsg'),
      span: 2,
    },
    {
      field: 'apiRequestId',
      label: $t('system.sms.log.fields.apiRequestId'),
    },
    {
      field: 'apiSerialNo',
      label: $t('system.sms.log.fields.apiSerialNo'),
    },
  ];
}
