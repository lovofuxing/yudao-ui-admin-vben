import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { $t } from '#/locales';

import { getEducationStatusOptions } from '../_utils/status';

const courseStatusOptions = () => getEducationStatusOptions(['启用', '停用']);

/** 课程表单字段，迁移旧系统课程基础信息和收费设置。 */
export function useFormSchema(): VbenFormSchema[] {
  return [
    { component: 'Input', fieldName: 'id', dependencies: { triggerFields: [''], show: () => false } },
    { component: 'Input', fieldName: 'courseName', label: $t('education.course.fields.courseName'), componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.course.fields.courseName')]) }, rules: 'required' },
    { component: 'Input', fieldName: 'subject', label: $t('education.course.fields.subject'), componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.course.fields.subject')]) }, rules: 'required' },
    { component: 'Input', fieldName: 'teachMode', label: $t('education.course.fields.teachMode'), componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.course.fields.teachMode')]) } },
    { component: 'Input', fieldName: 'chargeType', label: $t('education.course.fields.chargeType'), componentProps: { placeholder: $t('education.common.inputPlaceholder', [$t('education.course.fields.chargeType')]) } },
    { component: 'InputNumber', fieldName: 'deductHours', label: $t('education.course.fields.deductHours'), componentProps: { class: 'w-full', min: 0 } },
    { component: 'InputNumber', fieldName: 'price', label: $t('education.course.fields.price'), componentProps: { class: 'w-full', min: 0 } },
    { component: 'InputNumber', fieldName: 'giftPoints', label: $t('education.course.fields.giftPoints'), componentProps: { class: 'w-full', min: 0 } },
    { component: 'Select', fieldName: 'status', label: $t('education.course.fields.status'), componentProps: { allowClear: true, options: courseStatusOptions() }, rules: 'required' },
  ];
}

/** 课程搜索字段，对齐旧系统授课模式、科目、收费方式和状态筛选。 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    { component: 'Input', fieldName: 'courseName', label: $t('education.course.fields.courseName'), componentProps: { allowClear: true, placeholder: $t('education.common.inputPlaceholder', [$t('education.course.fields.courseName')]) } },
    { component: 'Input', fieldName: 'subject', label: $t('education.course.fields.subject'), componentProps: { allowClear: true, placeholder: $t('education.common.inputPlaceholder', [$t('education.course.fields.subject')]) } },
    { component: 'Input', fieldName: 'teachMode', label: $t('education.course.fields.teachMode'), componentProps: { allowClear: true, placeholder: $t('education.common.inputPlaceholder', [$t('education.course.fields.teachMode')]) } },
    { component: 'Select', fieldName: 'status', label: $t('education.course.fields.status'), componentProps: { allowClear: true, options: courseStatusOptions(), placeholder: $t('education.common.selectPlaceholder', [$t('education.course.fields.status')]) } },
  ];
}

/** 课程列表字段，保留价格和扣课课时用于迁移验收。 */
export function useGridColumns(): VxeTableGridOptions['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    { field: 'courseName', title: $t('education.course.fields.courseName'), minWidth: 170 },
    { field: 'subject', title: $t('education.course.fields.subject'), minWidth: 110 },
    { field: 'teachMode', title: $t('education.course.fields.teachMode'), minWidth: 120 },
    { field: 'chargeType', title: $t('education.course.fields.chargeType'), minWidth: 120 },
    { field: 'deductHours', title: $t('education.course.fields.deductHours'), minWidth: 110 },
    { field: 'price', title: $t('education.course.fields.price'), minWidth: 110 },
    { field: 'giftPoints', title: $t('education.course.fields.giftPoints'), minWidth: 110 },
    { field: 'status', title: $t('education.course.fields.status'), minWidth: 110, slots: { default: 'status' } },
    { title: $t('education.common.action'), width: 170, fixed: 'right', slots: { default: 'actions' } },
  ];
}
