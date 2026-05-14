import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { $t } from '#/locales';

import { getEducationStatusOptions } from '../_utils/status';

const checkinStatusOptions = () =>
  getEducationStatusOptions(['已签到', '已签退', '待签到', '异常']);

/** 签到表单字段，迁移期先覆盖手动打卡和签到记录维护。 */
export function useFormSchema(): VbenFormSchema[] {
  return [
    { component: 'Input', fieldName: 'id', dependencies: { triggerFields: [''], show: () => false } },
    { component: 'Input', fieldName: 'studentName', label: $t('education.faceCheckin.fields.studentName'), componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.faceCheckin.fields.studentName')]) }, rules: 'required' },
    { component: 'Input', fieldName: 'phone', label: $t('education.faceCheckin.fields.phone'), componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.faceCheckin.fields.phone')]) } },
    { component: 'Input', fieldName: 'className', label: $t('education.faceCheckin.fields.className'), componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.faceCheckin.fields.className')]) } },
    { component: 'Input', fieldName: 'checkinDate', label: $t('education.faceCheckin.fields.checkinDate'), componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.faceCheckin.fields.checkinDate')]) }, rules: 'required' },
    { component: 'Input', fieldName: 'checkinTime', label: $t('education.faceCheckin.fields.checkinTime'), componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.faceCheckin.fields.checkinTime')]) } },
    { component: 'Input', fieldName: 'checkoutTime', label: $t('education.faceCheckin.fields.checkoutTime'), componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.faceCheckin.fields.checkoutTime')]) } },
    { component: 'Input', fieldName: 'source', label: $t('education.faceCheckin.fields.source'), componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.faceCheckin.fields.source')]) } },
    { component: 'InputNumber', fieldName: 'deductHours', label: $t('education.faceCheckin.fields.deductHours'), componentProps: { class: 'w-full', min: 0 } },
    { component: 'Select', fieldName: 'status', label: $t('education.faceCheckin.fields.status'), componentProps: { allowClear: true, options: checkinStatusOptions() }, rules: 'required' },
  ];
}

/** 签到搜索字段，覆盖日期、学员、班级和签到状态。 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    { component: 'Input', fieldName: 'checkinDate', label: $t('education.faceCheckin.fields.checkinDate'), componentProps: { allowClear: true, placeholder: $t('education.common.inputPlaceholder', [$t('education.faceCheckin.fields.checkinDate')]) } },
    { component: 'Input', fieldName: 'studentName', label: $t('education.faceCheckin.fields.studentName'), componentProps: { allowClear: true, placeholder: $t('education.common.inputPlaceholder', [$t('education.faceCheckin.fields.studentName')]) } },
    { component: 'Input', fieldName: 'className', label: $t('education.faceCheckin.fields.className'), componentProps: { allowClear: true, placeholder: $t('education.common.inputPlaceholder', [$t('education.faceCheckin.fields.className')]) } },
    { component: 'Select', fieldName: 'status', label: $t('education.faceCheckin.fields.status'), componentProps: { allowClear: true, options: checkinStatusOptions(), placeholder: $t('education.common.selectPlaceholder', [$t('education.faceCheckin.fields.status')]) } },
  ];
}

/** 签到列表字段，后续统计页会在当前资源下继续拆分。 */
export function useGridColumns(): VxeTableGridOptions['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    { field: 'studentName', title: $t('education.faceCheckin.fields.studentName'), minWidth: 130 },
    { field: 'phone', title: $t('education.faceCheckin.fields.phone'), minWidth: 130 },
    { field: 'className', title: $t('education.faceCheckin.fields.className'), minWidth: 150 },
    { field: 'checkinDate', title: $t('education.faceCheckin.fields.checkinDate'), minWidth: 130 },
    { field: 'checkinTime', title: $t('education.faceCheckin.fields.checkinTime'), minWidth: 120 },
    { field: 'checkoutTime', title: $t('education.faceCheckin.fields.checkoutTime'), minWidth: 120 },
    { field: 'source', title: $t('education.faceCheckin.fields.source'), minWidth: 120 },
    { field: 'deductHours', title: $t('education.faceCheckin.fields.deductHours'), minWidth: 110 },
    { field: 'status', title: $t('education.faceCheckin.fields.status'), minWidth: 120, slots: { default: 'status' } },
    { title: $t('education.common.action'), width: 170, fixed: 'right', slots: { default: 'actions' } },
  ];
}
