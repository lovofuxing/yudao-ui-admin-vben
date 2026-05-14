import type { EducationFakePageParam } from '../_internal/fake-crud';

import { createEducationFakeCrud } from '../_internal/fake-crud';

export namespace EducationReservationApi {
  /** 约课记录列表行，页面归属教育 / 班级 / 约课记录菜单。 */
  export interface Reservation {
    /** 约课记录主键。 */
    id: number;
    /** 学员姓名。 */
    studentName: string;
    /** 联系方式。 */
    phone: string;
    /** 课程名称。 */
    courseName: string;
    /** 班级名称。 */
    className: string;
    /** 教师姓名。 */
    teacher: string;
    /** 约课提交时间。 */
    bookingTime: string;
    /** 实际上课时间。 */
    lessonTime: string;
    /** 约课状态。 */
    status: string;
  }
}

const reservationStore =
  createEducationFakeCrud<EducationReservationApi.Reservation>([
    {
      id: 1,
      studentName: '林小满',
      phone: '13800001001',
      courseName: '少儿英语',
      className: '春季启航班',
      teacher: '林老师',
      bookingTime: '2026-05-12 09:30',
      lessonTime: '2026-05-16 09:00',
      status: '待确认',
    },
    {
      id: 2,
      studentName: '周明轩',
      phone: '13800001002',
      courseName: '数学思维',
      className: '周末提高班',
      teacher: '周老师',
      bookingTime: '2026-05-13 10:20',
      lessonTime: '2026-05-17 14:00',
      status: '已确认',
    },
    {
      id: 3,
      studentName: '陈一一',
      phone: '13800001003',
      courseName: '硬笔书法',
      className: '一对一精品课',
      teacher: '陈老师',
      bookingTime: '2026-05-14 11:00',
      lessonTime: '2026-05-18 18:30',
      status: '已取消',
    },
    {
      id: 4,
      studentName: '王可欣',
      phone: '13800001004',
      courseName: '科学实验',
      className: '科学实验营',
      teacher: '王老师',
      bookingTime: '2026-05-14 13:40',
      lessonTime: '2026-05-19 19:00',
      status: '已完成',
    },
  ]);

/** 查询约课记录分页，后续替换为 GET /education/reservation/page。 */
export function getEducationReservationPage(
  params: EducationFakePageParam<EducationReservationApi.Reservation>,
) {
  return reservationStore.getPage(params);
}

/** 查询约课记录详情。 */
export function getEducationReservation(id: number) {
  return reservationStore.get(id);
}

/** 新增约课记录。 */
export function createEducationReservation(
  data: Partial<EducationReservationApi.Reservation>,
) {
  return reservationStore.create(data);
}

/** 修改约课记录。 */
export function updateEducationReservation(
  data: Partial<EducationReservationApi.Reservation> & { id: number },
) {
  return reservationStore.update(data);
}

/** 删除约课记录。 */
export function deleteEducationReservation(id: number) {
  return reservationStore.delete(id);
}

/** 批量删除约课记录。 */
export function deleteEducationReservationList(ids: number[]) {
  return reservationStore.deleteList(ids);
}

/** 导出约课记录，迁移期返回 JSON Blob。 */
export function exportEducationReservation(
  params: EducationFakePageParam<EducationReservationApi.Reservation>,
) {
  return reservationStore.exportData(params);
}
