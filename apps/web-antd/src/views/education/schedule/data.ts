import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { $t } from '#/locales';

import { getEducationStatusOptions } from '../_utils/status';

const scheduleStatusOptions = () =>
  getEducationStatusOptions(['待上课', '待确认', '已完成', '资源冲突']);

/** 课表表单字段，独立菜单资源使用 schedule 而不是旧 classSchedule 命名。 */
export function useFormSchema(): VbenFormSchema[] {
  return [
    { component: 'Input', fieldName: 'id', dependencies: { triggerFields: [''], show: () => false } },
    { component: 'Input', fieldName: 'lessonDate', label: $t('education.schedule.fields.lessonDate'), componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.schedule.fields.lessonDate')]) }, rules: 'required' },
    { component: 'Input', fieldName: 'timeRange', label: $t('education.schedule.fields.timeRange'), componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.schedule.fields.timeRange')]) }, rules: 'required' },
    { component: 'Input', fieldName: 'className', label: $t('education.schedule.fields.className'), componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.schedule.fields.className')]) }, rules: 'required' },
    { component: 'Input', fieldName: 'courseName', label: $t('education.schedule.fields.courseName'), componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.schedule.fields.courseName')]) } },
    { component: 'Input', fieldName: 'teacher', label: $t('education.schedule.fields.teacher'), componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.schedule.fields.teacher')]) } },
    { component: 'Input', fieldName: 'assistant', label: $t('education.schedule.fields.assistant'), componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.schedule.fields.assistant')]) } },
    { component: 'Input', fieldName: 'classroom', label: $t('education.schedule.fields.classroom'), componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.schedule.fields.classroom')]) } },
    { component: 'Select', fieldName: 'status', label: $t('education.schedule.fields.status'), componentProps: { allowClear: true, options: scheduleStatusOptions() }, rules: 'required' },
  ];
}

/** 课表搜索字段，覆盖班级、老师、教室、课程和排课状态。 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    { component: 'Input', fieldName: 'className', label: $t('education.schedule.fields.className'), componentProps: { allowClear: true, placeholder: $t('education.common.inputPlaceholder', [$t('education.schedule.fields.className')]) } },
    { component: 'Input', fieldName: 'teacher', label: $t('education.schedule.fields.teacher'), componentProps: { allowClear: true, placeholder: $t('education.common.inputPlaceholder', [$t('education.schedule.fields.teacher')]) } },
    { component: 'Input', fieldName: 'classroom', label: $t('education.schedule.fields.classroom'), componentProps: { allowClear: true, placeholder: $t('education.common.inputPlaceholder', [$t('education.schedule.fields.classroom')]) } },
    { component: 'Input', fieldName: 'courseName', label: $t('education.schedule.fields.courseName'), componentProps: { allowClear: true, placeholder: $t('education.common.inputPlaceholder', [$t('education.schedule.fields.courseName')]) } },
    { component: 'Select', fieldName: 'status', label: $t('education.schedule.fields.status'), componentProps: { allowClear: true, options: scheduleStatusOptions(), placeholder: $t('education.common.selectPlaceholder', [$t('education.schedule.fields.status')]) } },
  ];
}

/** 课表列表字段，保留老师、教室和状态用于资源冲突排查。 */
export function useGridColumns(): VxeTableGridOptions['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    { field: 'lessonDate', title: $t('education.schedule.fields.lessonDate'), minWidth: 130 },
    { field: 'timeRange', title: $t('education.schedule.fields.timeRange'), minWidth: 130 },
    { field: 'className', title: $t('education.schedule.fields.className'), minWidth: 150 },
    { field: 'courseName', title: $t('education.schedule.fields.courseName'), minWidth: 150 },
    { field: 'teacher', title: $t('education.schedule.fields.teacher'), minWidth: 120 },
    { field: 'assistant', title: $t('education.schedule.fields.assistant'), minWidth: 120 },
    { field: 'classroom', title: $t('education.schedule.fields.classroom'), minWidth: 110 },
    { field: 'status', title: $t('education.schedule.fields.status'), minWidth: 110, slots: { default: 'status' } },
    { title: $t('education.common.action'), width: 170, fixed: 'right', slots: { default: 'actions' } },
  ];
}
