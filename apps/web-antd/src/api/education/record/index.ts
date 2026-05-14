import type { EducationFakePageParam } from '../_internal/fake-crud';

import { createEducationFakeCrud } from '../_internal/fake-crud';

export namespace EducationLessonRecordApi {
  /** 上课记录列表行，覆盖点名、课消和补课管理入口信息。 */
  export interface LessonRecord {
    /** 上课记录主键。 */
    id: number;
    /** 上课日期。 */
    lessonDate: string;
    /** 上课班级。 */
    className: string;
    /** 授课课程。 */
    courseName: string;
    /** 授课老师。 */
    teacher: string;
    /** 学员姓名。 */
    studentName: string;
    /** 点名状态。 */
    status: string;
    /** 本次消耗课时。 */
    deductHours: number;
    /** 操作人。 */
    operator: string;
  }
}

const lessonRecordStore =
  createEducationFakeCrud<EducationLessonRecordApi.LessonRecord>([
    {
      id: 1,
      lessonDate: '2026-05-10',
      className: '春季启航班',
      courseName: '少儿英语',
      teacher: '林老师',
      studentName: '林小满',
      status: '到课',
      deductHours: 1,
      operator: '教务A',
    },
    {
      id: 2,
      lessonDate: '2026-05-11',
      className: '周末提高班',
      courseName: '数学思维',
      teacher: '周老师',
      studentName: '周明轩',
      status: '请假',
      deductHours: 0,
      operator: '教务B',
    },
    {
      id: 3,
      lessonDate: '2026-05-12',
      className: '一对一精品课',
      courseName: '硬笔书法',
      teacher: '陈老师',
      studentName: '陈一一',
      status: '迟到',
      deductHours: 1,
      operator: '系统',
    },
    {
      id: 4,
      lessonDate: '2026-05-13',
      className: '科学实验营',
      courseName: '科学实验',
      teacher: '王老师',
      studentName: '王可欣',
      status: '缺勤',
      deductHours: 1,
      operator: '教务A',
    },
  ]);

/** 查询上课记录分页，后续替换为 GET /education/record/page。 */
export function getEducationLessonRecordPage(
  params: EducationFakePageParam<EducationLessonRecordApi.LessonRecord>,
) {
  return lessonRecordStore.getPage(params);
}

/** 查询上课记录详情。 */
export function getEducationLessonRecord(id: number) {
  return lessonRecordStore.get(id);
}

/** 新增上课记录。 */
export function createEducationLessonRecord(
  data: Partial<EducationLessonRecordApi.LessonRecord>,
) {
  return lessonRecordStore.create(data);
}

/** 修改上课记录。 */
export function updateEducationLessonRecord(
  data: Partial<EducationLessonRecordApi.LessonRecord> & { id: number },
) {
  return lessonRecordStore.update(data);
}

/** 删除上课记录。 */
export function deleteEducationLessonRecord(id: number) {
  return lessonRecordStore.delete(id);
}

/** 批量删除上课记录。 */
export function deleteEducationLessonRecordList(ids: number[]) {
  return lessonRecordStore.deleteList(ids);
}

/** 导出上课记录，迁移期返回 JSON Blob。 */
export function exportEducationLessonRecord(
  params: EducationFakePageParam<EducationLessonRecordApi.LessonRecord>,
) {
  return lessonRecordStore.exportData(params);
}
