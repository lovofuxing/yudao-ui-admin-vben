import { createEducationFakeCrud } from '../_internal/fake-crud';

/**
 * 班级详情子页面假数据。
 */

export interface ClassDetail {
  id: number;
  className: string;
  courseName: string;
  headTeacher: string;
  capacity: number;
  studentCount: number;
  scheduleText: string;
  classroom: string;
  status: string;
  startDate: string;
  endDate: string;
  teachMode: string;
  remark: string;
}

/** 班级学员 */
export interface ClassStudent {
  id: number;
  classId: number;
  studentName: string;
  phone: string;
  enrollDate: string;
  status: string;
}

/** 班级课表 */
export interface ClassSchedule {
  id: number;
  classId: number;
  lessonDate: string;
  timeRange: string;
  courseName: string;
  teacher: string;
  assistant: string;
  classroom: string;
  status: string;
}

/** 上课记录（班级维度） */
export interface ClassRecord {
  id: number;
  classId: number;
  lessonDate: string;
  studentName: string;
  courseName: string;
  teacher: string;
  status: string;
  deductHours: number;
}

/** 排课信息 */
export interface ClassScheduleConfig {
  id: number;
  classId: number;
  scheduleType: string;
  weekday: string;
  timeRange: string;
  teacher: string;
  classroom: string;
  startDate: string;
  endDate: string;
}

/** 收费订单 */
export interface ClassOrder {
  id: number;
  classId: number;
  orderNo: string;
  studentName: string;
  amount: number;
  chargeType: string;
  status: string;
  createTime: string;
}

// ========== 假数据种子 ==========

const seedStudents: ClassStudent[] = [
  {
    id: 1,
    classId: 1,
    studentName: '林小满',
    phone: '13800001001',
    enrollDate: '2026-05-01',
    status: '在读',
  },
  {
    id: 2,
    classId: 1,
    studentName: '周明轩',
    phone: '13800001002',
    enrollDate: '2026-05-03',
    status: '在读',
  },
  {
    id: 3,
    classId: 1,
    studentName: '陈一一',
    phone: '13800001003',
    enrollDate: '2026-05-06',
    status: '在读',
  },
];

const seedSchedules: ClassSchedule[] = [
  {
    id: 1,
    classId: 1,
    lessonDate: '2026-05-13',
    timeRange: '10:00-11:30',
    courseName: '少儿英语',
    teacher: '陈老师',
    assistant: '林老师',
    classroom: 'A101',
    status: '已上课',
  },
  {
    id: 2,
    classId: 1,
    lessonDate: '2026-05-11',
    timeRange: '10:00-11:30',
    courseName: '少儿英语',
    teacher: '陈老师',
    assistant: '林老师',
    classroom: 'A101',
    status: '已上课',
  },
  {
    id: 3,
    classId: 1,
    lessonDate: '2026-05-16',
    timeRange: '10:00-11:30',
    courseName: '少儿英语',
    teacher: '陈老师',
    assistant: '林老师',
    classroom: 'A101',
    status: '待上课',
  },
];

const seedRecords: ClassRecord[] = [
  {
    id: 1,
    classId: 1,
    lessonDate: '2026-05-13',
    studentName: '林小满',
    courseName: '少儿英语',
    teacher: '陈老师',
    status: '到课',
    deductHours: 2,
  },
  {
    id: 2,
    classId: 1,
    lessonDate: '2026-05-13',
    studentName: '周明轩',
    courseName: '少儿英语',
    teacher: '陈老师',
    status: '到课',
    deductHours: 2,
  },
  {
    id: 3,
    classId: 1,
    lessonDate: '2026-05-11',
    studentName: '林小满',
    courseName: '少儿英语',
    teacher: '陈老师',
    status: '请假',
    deductHours: 0,
  },
  {
    id: 4,
    classId: 1,
    lessonDate: '2026-05-11',
    studentName: '周明轩',
    courseName: '少儿英语',
    teacher: '陈老师',
    status: '到课',
    deductHours: 2,
  },
];

const seedConfigs: ClassScheduleConfig[] = [
  {
    id: 1,
    classId: 1,
    scheduleType: '固定排课',
    weekday: '周一、周四',
    timeRange: '10:00-11:30',
    teacher: '陈老师',
    classroom: 'A101',
    startDate: '2026-05-01',
    endDate: '2026-08-31',
  },
];

const seedOrders: ClassOrder[] = [
  {
    id: 1,
    classId: 1,
    orderNo: 'OD20260501001',
    studentName: '林小满',
    amount: 4800,
    chargeType: '按期收费',
    status: '已支付',
    createTime: '2026-05-01 10:00',
  },
  {
    id: 2,
    classId: 1,
    orderNo: 'OD20260503001',
    studentName: '周明轩',
    amount: 4800,
    chargeType: '按期收费',
    status: '已支付',
    createTime: '2026-05-03 14:30',
  },
  {
    id: 3,
    classId: 1,
    orderNo: 'OD20260506001',
    studentName: '陈一一',
    amount: 4800,
    chargeType: '按期收费',
    status: '待支付',
    createTime: '2026-05-06 09:30',
  },
];

const studentStore = createEducationFakeCrud(seedStudents);
const scheduleStore = createEducationFakeCrud(seedSchedules);
const recordStore = createEducationFakeCrud(seedRecords);
const configStore = createEducationFakeCrud(seedConfigs);
const orderStore = createEducationFakeCrud(seedOrders);

export function getClassStudentPage(params: any) {
  return studentStore.getPage({ ...params, classId: params.classId });
}
export function getClassSchedulePage(params: any) {
  return scheduleStore.getPage({ ...params, classId: params.classId });
}
export function getClassRecordPage(params: any) {
  return recordStore.getPage({ ...params, classId: params.classId });
}
export function getClassScheduleConfigPage(params: any) {
  return configStore.getPage({ ...params, classId: params.classId });
}
export function getClassOrderPage(params: any) {
  return orderStore.getPage({ ...params, classId: params.classId });
}
