import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { $t } from '#/locales';

import { getEducationStatusOptions } from '../_utils/status';

const reservationStatusOptions = () =>
  getEducationStatusOptions(['待确认', '已确认', '已取消', '已完成']);

/** 约课记录表单字段，归属教育 / 班级 / 约课记录菜单页。 */
export function useFormSchema(): VbenFormSchema[] {
  return [
    { component: 'Input', fieldName: 'id', dependencies: { triggerFields: [''], show: () => false } },
    { component: 'Input', fieldName: 'studentName', label: $t('education.reservation.fields.studentName'), componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.reservation.fields.studentName')]) }, rules: 'required' },
    { component: 'Input', fieldName: 'phone', label: $t('education.reservation.fields.phone'), componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.reservation.fields.phone')]) } },
    { component: 'Input', fieldName: 'courseName', label: $t('education.reservation.fields.courseName'), componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.reservation.fields.courseName')]) } },
    { component: 'Input', fieldName: 'className', label: $t('education.reservation.fields.className'), componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.reservation.fields.className')]) } },
    { component: 'Input', fieldName: 'teacher', label: $t('education.reservation.fields.teacher'), componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.reservation.fields.teacher')]) } },
    { component: 'Input', fieldName: 'bookingTime', label: $t('education.reservation.fields.bookingTime'), componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.reservation.fields.bookingTime')]) } },
    { component: 'Input', fieldName: 'lessonTime', label: $t('education.reservation.fields.lessonTime'), componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.reservation.fields.lessonTime')]) } },
    { component: 'Select', fieldName: 'status', label: $t('education.reservation.fields.status'), componentProps: { allowClear: true, options: reservationStatusOptions() }, rules: 'required' },
  ];
}

/** 约课搜索字段，覆盖学员、课程、班级、状态和上课时间。 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    { component: 'Input', fieldName: 'studentName', label: $t('education.reservation.fields.studentName'), componentProps: { allowClear: true, placeholder: $t('education.common.inputPlaceholder', [$t('education.reservation.fields.studentName')]) } },
    { component: 'Input', fieldName: 'courseName', label: $t('education.reservation.fields.courseName'), componentProps: { allowClear: true, placeholder: $t('education.common.inputPlaceholder', [$t('education.reservation.fields.courseName')]) } },
    { component: 'Input', fieldName: 'className', label: $t('education.reservation.fields.className'), componentProps: { allowClear: true, placeholder: $t('education.common.inputPlaceholder', [$t('education.reservation.fields.className')]) } },
    { component: 'Select', fieldName: 'status', label: $t('education.reservation.fields.status'), componentProps: { allowClear: true, options: reservationStatusOptions(), placeholder: $t('education.common.selectPlaceholder', [$t('education.reservation.fields.status')]) } },
    { component: 'Input', fieldName: 'lessonTime', label: $t('education.reservation.fields.lessonTime'), componentProps: { allowClear: true, placeholder: $t('education.common.inputPlaceholder', [$t('education.reservation.fields.lessonTime')]) } },
  ];
}

/** 约课列表字段，状态列用于区分待确认和已取消记录。 */
export function useGridColumns(): VxeTableGridOptions['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    { field: 'studentName', title: $t('education.reservation.fields.studentName'), minWidth: 130 },
    { field: 'phone', title: $t('education.reservation.fields.phone'), minWidth: 130 },
    { field: 'courseName', title: $t('education.reservation.fields.courseName'), minWidth: 150 },
    { field: 'className', title: $t('education.reservation.fields.className'), minWidth: 150 },
    { field: 'teacher', title: $t('education.reservation.fields.teacher'), minWidth: 120 },
    { field: 'bookingTime', title: $t('education.reservation.fields.bookingTime'), minWidth: 150 },
    { field: 'lessonTime', title: $t('education.reservation.fields.lessonTime'), minWidth: 150 },
    { field: 'status', title: $t('education.reservation.fields.status'), minWidth: 110, slots: { default: 'status' } },
    { title: $t('education.common.action'), width: 170, fixed: 'right', slots: { default: 'actions' } },
  ];
}
