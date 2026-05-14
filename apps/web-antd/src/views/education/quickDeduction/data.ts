import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { $t } from '#/locales';

import { getEducationStatusOptions } from '../_utils/status';

const deductionStatusOptions = () =>
  getEducationStatusOptions(['已扣课', '待确认', '已撤销']);

/** 快速扣课表单字段，迁移期先覆盖扣课记录维护。 */
export function useFormSchema(): VbenFormSchema[] {
  return [
    { component: 'Input', fieldName: 'id', dependencies: { triggerFields: [''], show: () => false } },
    { component: 'Input', fieldName: 'studentName', label: $t('education.quickDeduction.fields.studentName'), componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.quickDeduction.fields.studentName')]) }, rules: 'required' },
    { component: 'Input', fieldName: 'courseName', label: $t('education.quickDeduction.fields.courseName'), componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.quickDeduction.fields.courseName')]) }, rules: 'required' },
    { component: 'Input', fieldName: 'className', label: $t('education.quickDeduction.fields.className'), componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.quickDeduction.fields.className')]) } },
    { component: 'InputNumber', fieldName: 'remainingHours', label: $t('education.quickDeduction.fields.remainingHours'), componentProps: { class: 'w-full', min: 0 } },
    { component: 'InputNumber', fieldName: 'deductHours', label: $t('education.quickDeduction.fields.deductHours'), componentProps: { class: 'w-full', min: 0 }, rules: 'required' },
    { component: 'Input', fieldName: 'teacher', label: $t('education.quickDeduction.fields.teacher'), componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.quickDeduction.fields.teacher')]) } },
    { component: 'Input', fieldName: 'deductionTime', label: $t('education.quickDeduction.fields.deductionTime'), componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.quickDeduction.fields.deductionTime')]) } },
    { component: 'Select', fieldName: 'status', label: $t('education.quickDeduction.fields.status'), componentProps: { allowClear: true, options: deductionStatusOptions() }, rules: 'required' },
  ];
}

/** 快速扣课搜索字段，覆盖学员、课程、班级、老师和扣课状态。 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    { component: 'Input', fieldName: 'studentName', label: $t('education.quickDeduction.fields.studentName'), componentProps: { allowClear: true, placeholder: $t('education.common.inputPlaceholder', [$t('education.quickDeduction.fields.studentName')]) } },
    { component: 'Input', fieldName: 'courseName', label: $t('education.quickDeduction.fields.courseName'), componentProps: { allowClear: true, placeholder: $t('education.common.inputPlaceholder', [$t('education.quickDeduction.fields.courseName')]) } },
    { component: 'Input', fieldName: 'className', label: $t('education.quickDeduction.fields.className'), componentProps: { allowClear: true, placeholder: $t('education.common.inputPlaceholder', [$t('education.quickDeduction.fields.className')]) } },
    { component: 'Input', fieldName: 'teacher', label: $t('education.quickDeduction.fields.teacher'), componentProps: { allowClear: true, placeholder: $t('education.common.inputPlaceholder', [$t('education.quickDeduction.fields.teacher')]) } },
    { component: 'Select', fieldName: 'status', label: $t('education.quickDeduction.fields.status'), componentProps: { allowClear: true, options: deductionStatusOptions(), placeholder: $t('education.common.selectPlaceholder', [$t('education.quickDeduction.fields.status')]) } },
  ];
}

/** 快速扣课列表字段，后续可在同资源下扩展撤销扣课弹窗。 */
export function useGridColumns(): VxeTableGridOptions['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    { field: 'studentName', title: $t('education.quickDeduction.fields.studentName'), minWidth: 130 },
    { field: 'courseName', title: $t('education.quickDeduction.fields.courseName'), minWidth: 150 },
    { field: 'className', title: $t('education.quickDeduction.fields.className'), minWidth: 150 },
    { field: 'remainingHours', title: $t('education.quickDeduction.fields.remainingHours'), minWidth: 120 },
    { field: 'deductHours', title: $t('education.quickDeduction.fields.deductHours'), minWidth: 110 },
    { field: 'teacher', title: $t('education.quickDeduction.fields.teacher'), minWidth: 120 },
    { field: 'deductionTime', title: $t('education.quickDeduction.fields.deductionTime'), minWidth: 150 },
    { field: 'status', title: $t('education.quickDeduction.fields.status'), minWidth: 110, slots: { default: 'status' } },
    { title: $t('education.common.action'), width: 170, fixed: 'right', slots: { default: 'actions' } },
  ];
}
