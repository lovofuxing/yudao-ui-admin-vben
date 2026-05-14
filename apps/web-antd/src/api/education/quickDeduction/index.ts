import type { EducationFakePageParam } from '../_internal/fake-crud';

import { createEducationFakeCrud } from '../_internal/fake-crud';

export namespace EducationQuickDeductionApi {
  /** 快速扣课列表行，覆盖按学员、按课程和扣课记录。 */
  export interface QuickDeduction {
    /** 扣课记录主键。 */
    id: number;
    /** 学员姓名。 */
    studentName: string;
    /** 课程名称。 */
    courseName: string;
    /** 班级名称。 */
    className: string;
    /** 扣课前剩余课时。 */
    remainingHours: number;
    /** 本次扣课课时。 */
    deductHours: number;
    /** 授课老师。 */
    teacher: string;
    /** 扣课时间。 */
    deductionTime: string;
    /** 扣课状态。 */
    status: string;
  }
}

const quickDeductionStore =
  createEducationFakeCrud<EducationQuickDeductionApi.QuickDeduction>([
    {
      id: 1,
      studentName: '林小满',
      courseName: '少儿英语',
      className: '春季启航班',
      remainingHours: 32,
      deductHours: 1,
      teacher: '林老师',
      deductionTime: '2026-05-14 09:30',
      status: '已扣课',
    },
    {
      id: 2,
      studentName: '周明轩',
      courseName: '数学思维',
      className: '周末提高班',
      remainingHours: 18,
      deductHours: 1,
      teacher: '周老师',
      deductionTime: '2026-05-14 10:00',
      status: '待确认',
    },
    {
      id: 3,
      studentName: '陈一一',
      courseName: '硬笔书法',
      className: '一对一精品课',
      remainingHours: 45,
      deductHours: 1,
      teacher: '陈老师',
      deductionTime: '2026-05-14 11:20',
      status: '已撤销',
    },
    {
      id: 4,
      studentName: '王可欣',
      courseName: '科学实验',
      className: '科学实验营',
      remainingHours: 8,
      deductHours: 2,
      teacher: '王老师',
      deductionTime: '2026-05-14 14:10',
      status: '已扣课',
    },
  ]);

/** 查询快速扣课分页，后续替换为 GET /education/quickDeduction/page。 */
export function getEducationQuickDeductionPage(
  params: EducationFakePageParam<EducationQuickDeductionApi.QuickDeduction>,
) {
  return quickDeductionStore.getPage(params);
}

/** 查询快速扣课详情。 */
export function getEducationQuickDeduction(id: number) {
  return quickDeductionStore.get(id);
}

/** 新增快速扣课记录。 */
export function createEducationQuickDeduction(
  data: Partial<EducationQuickDeductionApi.QuickDeduction>,
) {
  return quickDeductionStore.create(data);
}

/** 修改快速扣课记录。 */
export function updateEducationQuickDeduction(
  data: Partial<EducationQuickDeductionApi.QuickDeduction> & { id: number },
) {
  return quickDeductionStore.update(data);
}

/** 删除快速扣课记录。 */
export function deleteEducationQuickDeduction(id: number) {
  return quickDeductionStore.delete(id);
}

/** 批量删除快速扣课记录。 */
export function deleteEducationQuickDeductionList(ids: number[]) {
  return quickDeductionStore.deleteList(ids);
}

/** 导出快速扣课记录，迁移期返回 JSON Blob。 */
export function exportEducationQuickDeduction(
  params: EducationFakePageParam<EducationQuickDeductionApi.QuickDeduction>,
) {
  return quickDeductionStore.exportData(params);
}
