import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { DescriptionItemSchema } from '#/components/description';

import { h } from 'vue';

import { DICT_TYPE } from '@vben/constants';
import { getDictOptions } from '@vben/hooks';

import { Image } from 'ant-design-vue';

import { DictTag } from '#/components/dict-tag';
import { $t } from '#/locales';
import { getRangePickerDefaultProps } from '#/utils';

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'type',
      label: $t('system.social.user.fields.type'),
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.SYSTEM_SOCIAL_TYPE, 'number'),
        placeholder: $t('system.social.user.fields.typePlaceholder'),
        allowClear: true,
      },
    },
    {
      fieldName: 'nickname',
      label: $t('system.social.user.fields.nickname'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.social.user.fields.nicknamePlaceholder'),
        allowClear: true,
      },
    },
    {
      fieldName: 'openid',
      label: $t('system.social.user.fields.openid'),
      component: 'Input',
      componentProps: {
        placeholder: $t('system.social.user.fields.openidPlaceholder'),
        allowClear: true,
      },
    },
    {
      fieldName: 'createTime',
      label: $t('system.common.createTime'),
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
      field: 'type',
      title: $t('system.social.user.fields.type'),
      minWidth: 100,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.SYSTEM_SOCIAL_TYPE },
      },
    },
    {
      field: 'openid',
      title: $t('system.social.user.fields.openid'),
      minWidth: 180,
    },
    {
      field: 'nickname',
      title: $t('system.social.user.fields.nickname'),
      minWidth: 120,
    },
    {
      field: 'avatar',
      title: $t('system.social.user.fields.avatar'),
      minWidth: 100,
      cellRender: {
        name: 'CellImage',
      },
    },
    {
      field: 'createTime',
      title: $t('system.common.createTime'),
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      field: 'updateTime',
      title: $t('system.common.updateTime'),
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    {
      title: $t('system.common.actions'),
      width: 120,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}

/** 详情页的字段 */
export function useDetailSchema(): DescriptionItemSchema[] {
  return [
    {
      field: 'type',
      label: $t('system.social.user.fields.type'),
      render: (val) => {
        return h(DictTag, {
          type: DICT_TYPE.SYSTEM_SOCIAL_TYPE,
          value: val,
        });
      },
    },
    {
      field: 'nickname',
      label: $t('system.social.user.fields.nickname'),
    },
    {
      field: 'avatar',
      label: $t('system.social.user.fields.avatar'),
      render: (val) => (val ? h(Image, { src: val }) : $t('system.social.user.fields.noAvatar')),
    },
    {
      field: 'token',
      label: $t('system.social.user.fields.token'),
    },
    {
      field: 'rawTokenInfo',
      label: $t('system.social.user.fields.rawTokenInfo'),
    },
    {
      field: 'rawUserInfo',
      label: $t('system.social.user.fields.rawUserInfo'),
    },
    {
      field: 'code',
      label: $t('system.social.user.fields.code'),
    },
    {
      field: 'state',
      label: $t('system.social.user.fields.state'),
    },
  ];
}
