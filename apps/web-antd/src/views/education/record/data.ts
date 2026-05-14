import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { $t } from '#/locales';

import { getEducationStatusOptions } from '../_utils/status';

const attendanceStatusOptions = () =>
  getEducationStatusOptions(['到课', '请假', '迟到', '缺勤']);

/** 上课记录表单字段，正式联调后会拆分撤销点名和补课动作。 */
export function useFormSchema(): VbenFormSchema[] {
  return [
    { component: 'Input', fieldName: 'id', dependencies: { triggerFields: [''], show: () => false } },
    { component: 'Input', fieldName: 'lessonDate', label: $t('education.lessonRecord.fields.lessonDate'), componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.lessonRecord.fields.lessonDate')]) }, rules: 'required' },
    { component: 'Input', fieldName: 'className', label: $t('education.lessonRecord.fields.className'), componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.lessonRecord.fields.className')]) }, rules: 'required' },
    { component: 'Input', fieldName: 'courseName', label: $t('education.lessonRecord.fields.courseName'), componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.lessonRecord.fields.courseName')]) } },
    { component: 'Input', fieldName: 'teacher', label: $t('education.lessonRecord.fields.teacher'), componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.lessonRecord.fields.teacher')]) } },
    { component: 'Input', fieldName: 'studentName', label: $t('education.lessonRecord.fields.studentName'), componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.lessonRecord.fields.studentName')]) } },
    { component: 'Select', fieldName: 'status', label: $t('education.lessonRecord.fields.status'), componentProps: { allowClear: true, options: attendanceStatusOptions() }, rules: 'required' },
    { component: 'InputNumber', fieldName: 'deductHours', label: $t('education.lessonRecord.fields.deductHours'), componentProps: { class: 'w-full', min: 0 } },
    { component: 'Input', fieldName: 'operator', label: $t('education.lessonRecord.fields.operator'), componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.lessonRecord.fields.operator')]) } },
  ];
}

/** 上课记录搜索字段，覆盖班级、课程、老师、点名状态和日期。 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    { component: 'Input', fieldName: 'className', label: $t('education.lessonRecord.fields.className'), componentProps: { allowClear: true, placeholder: $t('education.common.inputPlaceholder', [$t('education.lessonRecord.fields.className')]) } },
    { component: 'Input', fieldName: 'courseName', label: $t('education.lessonRecord.fields.courseName'), componentProps: { allowClear: true, placeholder: $t('education.common.inputPlaceholder', [$t('education.lessonRecord.fields.courseName')]) } },
    { component: 'Input', fieldName: 'teacher', label: $t('education.lessonRecord.fields.teacher'), componentProps: { allowClear: true, placeholder: $t('education.common.inputPlaceholder', [$t('education.lessonRecord.fields.teacher')]) } },
    { component: 'Select', fieldName: 'status', label: $t('education.lessonRecord.fields.status'), componentProps: { allowClear: true, options: attendanceStatusOptions(), placeholder: $t('education.common.selectPlaceholder', [$t('education.lessonRecord.fields.status')]) } },
    { component: 'Input', fieldName: 'lessonDate', label: $t('education.lessonRecord.fields.lessonDate'), componentProps: { allowClear: true, placeholder: $t('education.common.inputPlaceholder', [$t('education.lessonRecord.fields.lessonDate')]) } },
  ];
}

/** 上课记录列表字段，操作列用于后续接撤销点名和详情。 */
export function useGridColumns(): VxeTableGridOptions['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    { field: 'lessonDate', title: $t('education.lessonRecord.fields.lessonDate'), minWidth: 130 },
    { field: 'className', title: $t('education.lessonRecord.fields.className'), minWidth: 150 },
    { field: 'courseName', title: $t('education.lessonRecord.fields.courseName'), minWidth: 150 },
    { field: 'teacher', title: $t('education.lessonRecord.fields.teacher'), minWidth: 120 },
    { field: 'studentName', title: $t('education.lessonRecord.fields.studentName'), minWidth: 120 },
    { field: 'status', title: $t('education.lessonRecord.fields.status'), minWidth: 110, slots: { default: 'status' } },
    { field: 'deductHours', title: $t('education.lessonRecord.fields.deductHours'), minWidth: 110 },
    { field: 'operator', title: $t('education.lessonRecord.fields.operator'), minWidth: 110 },
    { title: $t('education.common.action'), width: 170, fixed: 'right', slots: { default: 'actions' } },
  ];
}
