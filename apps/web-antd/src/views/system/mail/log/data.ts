import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { DescriptionItemSchema } from '#/components/description';

import { h } from 'vue';

import { DICT_TYPE } from '@vben/constants';
import { getDictOptions } from '@vben/hooks';
import { formatDateTime } from '@vben/utils';

import { getSimpleMailAccountList } from '#/api/system/mail/account';
import { DictTag } from '#/components/dict-tag';
import { $t } from '#/locales';
import { getRangePickerDefaultProps } from '#/utils';

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'sendTime',
      label: $t('system.mail.log.fields.sendTime'),
      component: 'RangePicker',
      componentProps: {
        ...getRangePickerDefaultProps(),
        allowClear: true,
      },
    },
    {
      fieldName: 'userId',
      label: $t('system.mail.log.fields.userId'),
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: $t('system.mail.log.fields.userIdPlaceholder'),
      },
    },
    {
      fieldName: 'userType',
      label: $t('system.mail.log.fields.userType'),
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.USER_TYPE, 'number'),
        allowClear: true,
        placeholder: $t('system.mail.log.fields.userTypePlaceholder'),
      },
    },
    {
      fieldName: 'sendStatus',
      label: $t('system.mail.log.fields.sendStatus'),
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.SYSTEM_MAIL_SEND_STATUS, 'number'),
        allowClear: true,
        placeholder: $t('system.mail.log.fields.sendStatusPlaceholder'),
      },
    },
    {
      fieldName: 'accountId',
      label: $t('system.mail.log.fields.accountId'),
      component: 'ApiSelect',
      componentProps: {
        api: getSimpleMailAccountList,
        labelField: 'mail',
        valueField: 'id',
        allowClear: true,
        placeholder: $t('system.mail.log.fields.accountIdPlaceholder'),
      },
    },
    {
      fieldName: 'templateId',
      label: $t('system.mail.log.fields.templateId'),
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: $t('system.mail.log.fields.templateIdPlaceholder'),
      },
    },
  ];
}

/** 列表的字段 */
export function useGridColumns(): VxeTableGridOptions['columns'] {
  return [
    {
      field: 'id',
      title: $t('system.mail.log.fields.gridId'),
      minWidth: 100,
    },
    {
      field: 'sendTime',
      title: $t('system.mail.log.fields.gridSendTime'),
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      field: 'userType',
      title: $t('system.mail.log.fields.receiveUser'),
      minWidth: 150,
      slots: { default: 'userInfo' },
    },
    {
      field: 'toMails',
      title: $t('system.mail.log.fields.receiveInfo'),
      minWidth: 300,
      formatter: ({ row }) => {
        const lines: string[] = [];
        if (row.toMails && row.toMails.length > 0) {
          lines.push(
            `${$t('system.mail.log.fields.receiveTo')}${row.toMails.join('、')}`,
          );
        }
        if (row.ccMails && row.ccMails.length > 0) {
          lines.push(
            `${$t('system.mail.log.fields.receiveCc')}${row.ccMails.join('、')}`,
          );
        }
        if (row.bccMails && row.bccMails.length > 0) {
          lines.push(
            `${$t('system.mail.log.fields.receiveBcc')}${row.bccMails.join('、')}`,
          );
        }
        return lines.join('\n');
      },
    },
    {
      field: 'templateTitle',
      title: $t('system.mail.log.fields.gridTemplateTitle'),
      minWidth: 120,
    },
    {
      field: 'templateContent',
      title: $t('system.mail.log.fields.gridTemplateContent'),
      minWidth: 300,
    },
    {
      field: 'fromMail',
      title: $t('system.mail.log.fields.fromMail'),
      minWidth: 120,
    },
    {
      field: 'sendStatus',
      title: $t('system.mail.log.fields.gridSendStatus'),
      minWidth: 120,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.SYSTEM_MAIL_SEND_STATUS },
      },
    },
    {
      field: 'templateCode',
      title: $t('system.mail.log.fields.templateCode'),
      minWidth: 120,
    },
    {
      title: $t('system.mail.log.fields.gridActions'),
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
      label: $t('system.mail.log.fields.gridId'),
    },
    {
      field: 'createTime',
      label: $t('system.mail.log.fields.gridCreateTime'),
      render: (val) => {
        return formatDateTime(val) as string;
      },
    },
    {
      field: 'fromMail',
      label: $t('system.mail.log.fields.fromMail'),
    },
    {
      field: 'userId',
      label: $t('system.mail.log.fields.receiveUser'),
      render: (val, data) => {
        if (data?.userType && val) {
          return h('div', [
            h(DictTag, {
              type: DICT_TYPE.USER_TYPE,
              value: data.userType,
            }),
            ` (${val})`,
          ]);
        }
        return $t('system.mail.log.fields.noUser');
      },
    },
    {
      field: 'toMails',
      label: $t('system.mail.log.fields.receiveInfo'),
      render: (val, data) => {
        const lines: string[] = [];
        if (val && val.length > 0) {
          lines.push(
            `${$t('system.mail.log.fields.receiveTo')}${val.join('、')}`,
          );
        }
        if (data?.ccMails && data.ccMails.length > 0) {
          lines.push(
            `${$t('system.mail.log.fields.receiveCc')}${data.ccMails.join('、')}`,
          );
        }
        if (data?.bccMails && data.bccMails.length > 0) {
          lines.push(
            `${$t('system.mail.log.fields.receiveBcc')}${data.bccMails.join('、')}`,
          );
        }
        return h(
          'div',
          {
            style: { whiteSpace: 'pre-line' },
          },
          lines.join('\n'),
        );
      },
    },
    {
      field: 'templateId',
      label: $t('system.mail.log.fields.templateId'),
    },
    {
      field: 'templateCode',
      label: $t('system.mail.log.fields.templateCode'),
    },
    {
      field: 'templateTitle',
      label: $t('system.mail.log.fields.templateTitle'),
    },
    {
      field: 'templateContent',
      label: $t('system.mail.log.fields.templateContent'),
      span: 2,
      render: (val) => {
        return h('div', {
          innerHTML: val || '',
        });
      },
    },
    {
      field: 'sendStatus',
      label: $t('system.mail.log.fields.sendStatus'),
      render: (val) => {
        return h(DictTag, {
          type: DICT_TYPE.SYSTEM_MAIL_SEND_STATUS,
          value: val,
        });
      },
    },
    {
      field: 'sendTime',
      label: $t('system.mail.log.fields.sendTime'),
      render: (val) => formatDateTime(val) as string,
    },
    {
      field: 'sendMessageId',
      label: $t('system.mail.log.fields.sendMessageId'),
    },
    {
      field: 'sendException',
      label: $t('system.mail.log.fields.sendException'),
    },
  ];
}
