import type { EducationFakePageParam } from '../_internal/fake-crud';

import { createEducationFakeCrud } from '../_internal/fake-crud';

export namespace EducationClassApi {
  /** 班级管理列表行，覆盖班级容量、班主任和排课摘要。 */
  export interface ClassInfo {
    /** 班级主键。 */
    id: number;
    /** 班级名称。 */
    className: string;
    /** 关联课程名称。 */
    courseName: string;
    /** 班主任。 */
    headTeacher: string;
    /** 当前班级人数。 */
    studentCount: number;
    /** 满班人数。 */
    capacity: number;
    /** 上课时间摘要。 */
    scheduleText: string;
    /** 上课教室。 */
    classroom: string;
    /** 班级状态。 */
    status: string;
  }
}

const classStore = createEducationFakeCrud<EducationClassApi.ClassInfo>([
  {
    id: 1,
    className: '春季启航班',
    courseName: '少儿英语',
    headTeacher: '林老师',
    studentCount: 18,
    capacity: 24,
    scheduleText: '周六 09:00-10:30',
    classroom: 'A101',
    status: '开班中',
  },
  {
    id: 2,
    className: '周末提高班',
    courseName: '数学思维',
    headTeacher: '周老师',
    studentCount: 15,
    capacity: 20,
    scheduleText: '周日 14:00-15:30',
    classroom: 'B203',
    status: '待排课',
  },
  {
    id: 3,
    className: '一对一精品课',
    courseName: '硬笔书法',
    headTeacher: '陈老师',
    studentCount: 1,
    capacity: 1,
    scheduleText: '周三 18:30-20:00',
    classroom: 'C305',
    status: '开班中',
  },
  {
    id: 4,
    className: '科学实验营',
    courseName: '科学实验',
    headTeacher: '王老师',
    studentCount: 22,
    capacity: 24,
    scheduleText: '周五 19:00-20:30',
    classroom: 'D401',
    status: '已满班',
  },
]);

/** 查询班级分页，后续替换为 GET /education/class/page。 */
export function getEducationClassPage(
  params: EducationFakePageParam<EducationClassApi.ClassInfo>,
) {
  return classStore.getPage(params);
}

/** 查询班级详情。 */
export function getEducationClass(id: number) {
  return classStore.get(id);
}

/** 新增班级。 */
export function createEducationClass(data: Partial<EducationClassApi.ClassInfo>) {
  return classStore.create(data);
}

/** 修改班级。 */
export function updateEducationClass(
  data: Partial<EducationClassApi.ClassInfo> & { id: number },
) {
  return classStore.update(data);
}

/** 删除班级。 */
export function deleteEducationClass(id: number) {
  return classStore.delete(id);
}

/** 批量删除班级。 */
export function deleteEducationClassList(ids: number[]) {
  return classStore.deleteList(ids);
}

/** 导出班级列表，迁移期返回 JSON Blob。 */
export function exportEducationClass(
  params: EducationFakePageParam<EducationClassApi.ClassInfo>,
) {
  return classStore.exportData(params);
}
