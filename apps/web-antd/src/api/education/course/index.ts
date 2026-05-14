import type { EducationFakePageParam } from '../_internal/fake-crud';

import { createEducationFakeCrud } from '../_internal/fake-crud';

export namespace EducationCourseApi {
  /** 课程管理列表行，覆盖收费、授课模式和扣课设置。 */
  export interface Course {
    /** 课程主键。 */
    id: number;
    /** 课程名称。 */
    courseName: string;
    /** 科目分类。 */
    subject: string;
    /** 授课模式，例如一对多或一对一。 */
    teachMode: string;
    /** 收费方式，例如按课时、按期。 */
    chargeType: string;
    /** 单次默认扣课课时。 */
    deductHours: number;
    /** 收费单价。 */
    price: number;
    /** 报读赠送积分。 */
    giftPoints: number;
    /** 课程状态。 */
    status: string;
  }
}

const courseStore = createEducationFakeCrud<EducationCourseApi.Course>([
  {
    id: 1,
    courseName: '少儿英语基础课',
    subject: '英语',
    teachMode: '一对多',
    chargeType: '按课时',
    deductHours: 1,
    price: 168,
    giftPoints: 20,
    status: '启用',
  },
  {
    id: 2,
    courseName: '数学思维进阶课',
    subject: '数学',
    teachMode: '一对多',
    chargeType: '按期',
    deductHours: 1,
    price: 198,
    giftPoints: 30,
    status: '启用',
  },
  {
    id: 3,
    courseName: '硬笔书法一对一',
    subject: '书法',
    teachMode: '一对一',
    chargeType: '按课时',
    deductHours: 1,
    price: 220,
    giftPoints: 10,
    status: '启用',
  },
  {
    id: 4,
    courseName: '科学实验体验课',
    subject: '科学',
    teachMode: '一对多',
    chargeType: '按天',
    deductHours: 2,
    price: 260,
    giftPoints: 40,
    status: '停用',
  },
]);

/** 查询课程分页，后续替换为 GET /education/course/page。 */
export function getEducationCoursePage(
  params: EducationFakePageParam<EducationCourseApi.Course>,
) {
  return courseStore.getPage(params);
}

/** 查询课程详情。 */
export function getEducationCourse(id: number) {
  return courseStore.get(id);
}

/** 新增课程。 */
export function createEducationCourse(data: Partial<EducationCourseApi.Course>) {
  return courseStore.create(data);
}

/** 修改课程。 */
export function updateEducationCourse(
  data: Partial<EducationCourseApi.Course> & { id: number },
) {
  return courseStore.update(data);
}

/** 删除课程。 */
export function deleteEducationCourse(id: number) {
  return courseStore.delete(id);
}

/** 批量删除课程。 */
export function deleteEducationCourseList(ids: number[]) {
  return courseStore.deleteList(ids);
}

/** 导出课程列表，迁移期返回 JSON Blob。 */
export function exportEducationCourse(
  params: EducationFakePageParam<EducationCourseApi.Course>,
) {
  return courseStore.exportData(params);
}
