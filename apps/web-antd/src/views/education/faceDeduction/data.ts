import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { $t } from '#/locales';

import { getEducationStatusOptions } from '../_utils/status';

const faceDeductionStatusOptions = () =>
  getEducationStatusOptions(['识别成功', '待确认', '识别失败']);

/** 刷脸扣课表单字段，摄像头接入前先维护识别和扣课确认记录。 */
export function useFormSchema(): VbenFormSchema[] {
  return [
    { component: 'Input', fieldName: 'id', dependencies: { triggerFields: [''], show: () => false } },
    { component: 'Input', fieldName: 'studentName', label: $t('education.faceDeduction.fields.studentName'), componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.faceDeduction.fields.studentName')]) }, rules: 'required' },
    { component: 'Input', fieldName: 'phone', label: $t('education.faceDeduction.fields.phone'), componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.faceDeduction.fields.phone')]) } },
    { component: 'Input', fieldName: 'courseName', label: $t('education.faceDeduction.fields.courseName'), componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.faceDeduction.fields.courseName')]) }, rules: 'required' },
    { component: 'Input', fieldName: 'teacher', label: $t('education.faceDeduction.fields.teacher'), componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.faceDeduction.fields.teacher')]) } },
    { component: 'InputNumber', fieldName: 'deductHours', label: $t('education.faceDeduction.fields.deductHours'), componentProps: { class: 'w-full', min: 0 }, rules: 'required' },
    { component: 'Input', fieldName: 'matchScore', label: $t('education.faceDeduction.fields.matchScore'), componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.faceDeduction.fields.matchScore')]) } },
    { component: 'Select', fieldName: 'status', label: $t('education.faceDeduction.fields.status'), componentProps: { allowClear: true, options: faceDeductionStatusOptions() }, rules: 'required' },
  ];
}

/** 刷脸扣课搜索字段，覆盖学员、课程、老师和识别状态。 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    { component: 'Input', fieldName: 'studentName', label: $t('education.faceDeduction.fields.studentName'), componentProps: { allowClear: true, placeholder: $t('education.common.inputPlaceholder', [$t('education.faceDeduction.fields.studentName')]) } },
    { component: 'Input', fieldName: 'courseName', label: $t('education.faceDeduction.fields.courseName'), componentProps: { allowClear: true, placeholder: $t('education.common.inputPlaceholder', [$t('education.faceDeduction.fields.courseName')]) } },
    { component: 'Input', fieldName: 'teacher', label: $t('education.faceDeduction.fields.teacher'), componentProps: { allowClear: true, placeholder: $t('education.common.inputPlaceholder', [$t('education.faceDeduction.fields.teacher')]) } },
    { component: 'Select', fieldName: 'status', label: $t('education.faceDeduction.fields.status'), componentProps: { allowClear: true, options: faceDeductionStatusOptions(), placeholder: $t('education.common.selectPlaceholder', [$t('education.faceDeduction.fields.status')]) } },
  ];
}

/** 刷脸扣课列表字段，匹配度保留为硬件服务接入后的关键验收字段。 */
export function useGridColumns(): VxeTableGridOptions['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    { field: 'studentName', title: $t('education.faceDeduction.fields.studentName'), minWidth: 130 },
    { field: 'phone', title: $t('education.faceDeduction.fields.phone'), minWidth: 130 },
    { field: 'courseName', title: $t('education.faceDeduction.fields.courseName'), minWidth: 150 },
    { field: 'teacher', title: $t('education.faceDeduction.fields.teacher'), minWidth: 120 },
    { field: 'deductHours', title: $t('education.faceDeduction.fields.deductHours'), minWidth: 110 },
    { field: 'matchScore', title: $t('education.faceDeduction.fields.matchScore'), minWidth: 110 },
    { field: 'status', title: $t('education.faceDeduction.fields.status'), minWidth: 120, slots: { default: 'status' } },
    { title: $t('education.common.action'), width: 170, fixed: 'right', slots: { default: 'actions' } },
  ];
}
