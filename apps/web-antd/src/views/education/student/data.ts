import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { $t } from '#/locales';

import { getEducationStatusOptions } from '../_utils/status';

const studentStatusOptions = () =>
  getEducationStatusOptions(['在读', '待续费', '停课']);

/** 学员表单字段，覆盖旧系统新增/编辑首屏必填信息。 */
export function useFormSchema(): VbenFormSchema[] {
  return [
    { component: 'Input', fieldName: 'id', dependencies: { triggerFields: [''], show: () => false } },
    {
      component: 'Input',
      fieldName: 'studentName',
      label: $t('education.student.fields.studentName'),
      componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.student.fields.studentName')]) },
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'phone',
      label: $t('education.student.fields.phone'),
      componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.student.fields.phone')]) },
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'className',
      label: $t('education.student.fields.className'),
      componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.student.fields.className')]) },
    },
    {
      component: 'Input',
      fieldName: 'courseName',
      label: $t('education.student.fields.courseName'),
      componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.student.fields.courseName')]) },
    },
    {
      component: 'Input',
      fieldName: 'advisor',
      label: $t('education.student.fields.advisor'),
      componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.student.fields.advisor')]) },
    },
    {
      component: 'InputNumber',
      fieldName: 'remainingHours',
      label: $t('education.student.fields.remainingHours'),
      componentProps: { class: 'w-full', min: 0 },
    },
    {
      component: 'Select',
      fieldName: 'status',
      label: $t('education.student.fields.status'),
      componentProps: { allowClear: true, options: studentStatusOptions() },
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'enrollTime',
      label: $t('education.student.fields.enrollTime'),
      componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.student.fields.enrollTime')]) },
    },
  ];
}

/** 学员列表搜索字段，保持姓名、班级、课程和状态的高频筛选。 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'studentName',
      label: $t('education.student.fields.studentName'),
      componentProps: { allowClear: true, placeholder: $t('education.common.inputPlaceholder', [$t('education.student.fields.studentName')]) },
    },
    {
      component: 'Input',
      fieldName: 'className',
      label: $t('education.student.fields.className'),
      componentProps: { allowClear: true, placeholder: $t('education.common.inputPlaceholder', [$t('education.student.fields.className')]) },
    },
    {
      component: 'Input',
      fieldName: 'courseName',
      label: $t('education.student.fields.courseName'),
      componentProps: { allowClear: true, placeholder: $t('education.common.inputPlaceholder', [$t('education.student.fields.courseName')]) },
    },
    {
      component: 'Select',
      fieldName: 'status',
      label: $t('education.student.fields.status'),
      componentProps: { allowClear: true, options: studentStatusOptions(), placeholder: $t('education.common.selectPlaceholder', [$t('education.student.fields.status')]) },
    },
  ];
}

/** 学员列表字段，操作列固定右侧以适配窄屏横向滚动。 */
export function useGridColumns(): VxeTableGridOptions['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    { field: 'studentName', title: $t('education.student.fields.studentName'), minWidth: 130 },
    { field: 'phone', title: $t('education.student.fields.phone'), minWidth: 130 },
    { field: 'className', title: $t('education.student.fields.className'), minWidth: 150 },
    { field: 'courseName', title: $t('education.student.fields.courseName'), minWidth: 150 },
    { field: 'advisor', title: $t('education.student.fields.advisor'), minWidth: 120 },
    { field: 'remainingHours', title: $t('education.student.fields.remainingHours'), minWidth: 110 },
    { field: 'status', title: $t('education.student.fields.status'), minWidth: 110, slots: { default: 'status' } },
    { field: 'enrollTime', title: $t('education.student.fields.enrollTime'), minWidth: 170 },
    { title: $t('education.common.action'), width: 170, fixed: 'right', slots: { default: 'actions' } },
  ];
}
