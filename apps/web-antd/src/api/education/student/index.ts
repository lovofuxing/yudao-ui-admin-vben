import type { EducationFakePageParam } from '../_internal/fake-crud';

import { createEducationFakeCrud } from '../_internal/fake-crud';

export namespace EducationStudentApi {
  /** 学员管理列表行，字段对齐旧系统学员列表和课程明细首屏信息。 */
  export interface Student {
    /** 学员主键。 */
    id: number;
    /** 学员姓名。 */
    studentName: string;
    /** 主联系人手机号。 */
    phone: string;
    /** 当前所在班级。 */
    className: string;
    /** 当前报读课程。 */
    courseName: string;
    /** 所属顾问或跟进老师。 */
    advisor: string;
    /** 剩余可用课时。 */
    remainingHours: number;
    /** 学员状态，后续对接后端字典。 */
    status: string;
    /** 入学时间。 */
    enrollTime: string;
    /** 停复课或迁移补充说明。 */
    remark?: string;
  }
}

const studentStore = createEducationFakeCrud<EducationStudentApi.Student>([
  {
    id: 1,
    studentName: '林小满',
    phone: '13800001001',
    className: '春季启航班',
    courseName: '少儿英语',
    advisor: '林老师',
    remainingHours: 32,
    status: '在读',
    enrollTime: '2026-05-01 10:00:00',
    remark: '老项目迁移假数据',
  },
  {
    id: 2,
    studentName: '周明轩',
    phone: '13800001002',
    className: '周末提高班',
    courseName: '数学思维',
    advisor: '周老师',
    remainingHours: 18,
    status: '待续费',
    enrollTime: '2026-05-03 14:20:00',
  },
  {
    id: 3,
    studentName: '陈一一',
    phone: '13800001003',
    className: '一对一精品课',
    courseName: '硬笔书法',
    advisor: '陈老师',
    remainingHours: 45,
    status: '在读',
    enrollTime: '2026-05-06 09:30:00',
  },
  {
    id: 4,
    studentName: '王可欣',
    phone: '13800001004',
    className: '科学实验营',
    courseName: '科学实验',
    advisor: '王老师',
    remainingHours: 8,
    status: '停课',
    enrollTime: '2026-05-09 16:00:00',
  },
]);

/** 查询学员分页，后续替换为 GET /education/student/page。 */
export function getEducationStudentPage(
  params: EducationFakePageParam<EducationStudentApi.Student>,
) {
  return studentStore.getPage(params);
}

/** 查询学员详情，编辑弹窗打开时按 id 重新加载。 */
export function getEducationStudent(id: number) {
  return studentStore.get(id);
}

/** 新增学员，迁移期写入内存假数据。 */
export function createEducationStudent(
  data: Partial<EducationStudentApi.Student>,
) {
  return studentStore.create(data);
}

/** 修改学员，迁移期写入内存假数据。 */
export function updateEducationStudent(
  data: Partial<EducationStudentApi.Student> & { id: number },
) {
  return studentStore.update(data);
}

/** 删除学员。 */
export function deleteEducationStudent(id: number) {
  return studentStore.delete(id);
}

/** 批量删除学员。 */
export function deleteEducationStudentList(ids: number[]) {
  return studentStore.deleteList(ids);
}

/** 导出学员列表，迁移期返回 JSON Blob。 */
export function exportEducationStudent(
  params: EducationFakePageParam<EducationStudentApi.Student>,
) {
  return studentStore.exportData(params);
}
