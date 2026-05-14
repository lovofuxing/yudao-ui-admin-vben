import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { $t } from '#/locales';

import { getEducationStatusOptions } from '../_utils/status';

const classStatusOptions = () =>
  getEducationStatusOptions(['开班中', '待排课', '已满班']);

/** 班级表单字段，覆盖创建班级所需的课程、老师、容量和教室信息。 */
export function useFormSchema(): VbenFormSchema[] {
  return [
    { component: 'Input', fieldName: 'id', dependencies: { triggerFields: [''], show: () => false } },
    { component: 'Input', fieldName: 'className', label: $t('education.class.fields.className'), componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.class.fields.className')]) }, rules: 'required' },
    { component: 'Input', fieldName: 'courseName', label: $t('education.class.fields.courseName'), componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.class.fields.courseName')]) }, rules: 'required' },
    { component: 'Input', fieldName: 'headTeacher', label: $t('education.class.fields.headTeacher'), componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.class.fields.headTeacher')]) } },
    { component: 'InputNumber', fieldName: 'studentCount', label: $t('education.class.fields.studentCount'), componentProps: { class: 'w-full', min: 0 } },
    { component: 'InputNumber', fieldName: 'capacity', label: $t('education.class.fields.capacity'), componentProps: { class: 'w-full', min: 1 } },
    { component: 'Input', fieldName: 'scheduleText', label: $t('education.class.fields.scheduleText'), componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.class.fields.scheduleText')]) } },
    { component: 'Input', fieldName: 'classroom', label: $t('education.class.fields.classroom'), componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.class.fields.classroom')]) } },
    { component: 'Select', fieldName: 'status', label: $t('education.class.fields.status'), componentProps: { allowClear: true, options: classStatusOptions() }, rules: 'required' },
  ];
}

/** 班级搜索字段，优先覆盖旧系统班级名称、课程、班主任和状态。 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    { component: 'Input', fieldName: 'className', label: $t('education.class.fields.className'), componentProps: { allowClear: true, placeholder: $t('education.common.inputPlaceholder', [$t('education.class.fields.className')]) } },
    { component: 'Input', fieldName: 'courseName', label: $t('education.class.fields.courseName'), componentProps: { allowClear: true, placeholder: $t('education.common.inputPlaceholder', [$t('education.class.fields.courseName')]) } },
    { component: 'Input', fieldName: 'headTeacher', label: $t('education.class.fields.headTeacher'), componentProps: { allowClear: true, placeholder: $t('education.common.inputPlaceholder', [$t('education.class.fields.headTeacher')]) } },
    { component: 'Select', fieldName: 'status', label: $t('education.class.fields.status'), componentProps: { allowClear: true, options: classStatusOptions(), placeholder: $t('education.common.selectPlaceholder', [$t('education.class.fields.status')]) } },
  ];
}

/** 班级列表字段，后续班级详情子资源再扩展 Tab。 */
export function useGridColumns(): VxeTableGridOptions['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    { field: 'className', title: $t('education.class.fields.className'), minWidth: 160 },
    { field: 'courseName', title: $t('education.class.fields.courseName'), minWidth: 150 },
    { field: 'headTeacher', title: $t('education.class.fields.headTeacher'), minWidth: 120 },
    { field: 'studentCount', title: $t('education.class.fields.studentCount'), minWidth: 110 },
    { field: 'capacity', title: $t('education.class.fields.capacity'), minWidth: 110 },
    { field: 'scheduleText', title: $t('education.class.fields.scheduleText'), minWidth: 170 },
    { field: 'classroom', title: $t('education.class.fields.classroom'), minWidth: 120 },
    { field: 'status', title: $t('education.class.fields.status'), minWidth: 110, slots: { default: 'status' } },
    { title: $t('education.common.action'), width: 170, fixed: 'right', slots: { default: 'actions' } },
  ];
}
