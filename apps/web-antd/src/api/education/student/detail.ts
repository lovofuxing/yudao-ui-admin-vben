import { createEducationFakeCrud } from '../_internal/fake-crud';

/**
 * 学员详情子页面假数据。
 * 每个 Tab 使用独立的内存分页存储，通过 studentId 过滤。
 */

export interface StudentDetail {
  id: number;
  studentName: string;
  phone: string;
  className: string;
  courseName: string;
  advisor: string;
  remainingHours: number;
  status: string;
  enrollTime: string;
  gender: string;
  birthday: string;
  school: string;
  grade: string;
  address: string;
  remark: string;
}

/** 跟进记录 */
export interface StudentFollowRecord {
  id: number;
  studentId: number;
  followTime: string;
  followType: string;
  content: string;
  operator: string;
  nextFollowTime: string;
}

/** 试听记录 */
export interface StudentTrialRecord {
  id: number;
  studentId: number;
  trialDate: string;
  courseName: string;
  teacher: string;
  classroom: string;
  feedback: string;
  status: string;
}

/** 报读课程 */
export interface StudentCourseRecord {
  id: number;
  studentId: number;
  courseName: string;
  chargeType: string;
  totalHours: number;
  remainingHours: number;
  price: number;
  enrollDate: string;
  status: string;
}

/** 上课记录（学员维度） */
export interface StudentClassRecord {
  id: number;
  studentId: number;
  lessonDate: string;
  className: string;
  courseName: string;
  teacher: string;
  status: string;
  deductHours: number;
}

/** 扣课记录 */
export interface StudentDeductionRecord {
  id: number;
  studentId: number;
  deductionTime: string;
  courseName: string;
  deductHours: number;
  type: string;
  operator: string;
}

/** 排课信息 */
export interface StudentScheduleInfo {
  id: number;
  studentId: number;
  className: string;
  courseName: string;
  teacher: string;
  weekday: string;
  timeRange: string;
  classroom: string;
  startDate: string;
  endDate: string;
}

/** 沟通记录 */
export interface StudentCommunicationRecord {
  id: number;
  studentId: number;
  communicateTime: string;
  type: string;
  content: string;
  operator: string;
}

/** 成长记录 */
export interface StudentGrowthRecord {
  id: number;
  studentId: number;
  recordDate: string;
  type: string;
  content: string;
  attachments: string;
}

/** 请假记录 */
export interface StudentLeaveRecord {
  id: number;
  studentId: number;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
  approver: string;
}

/** 积分优惠券 */
export interface StudentPointsRecord {
  id: number;
  studentId: number;
  couponName: string;
  type: string;
  threshold: string;
  faceValue: string;
  acquireTime: string;
  expireTime: string;
  usedTime: string;
  status: string;
}

// ========== 假数据种子 ==========

const seedFollow: StudentFollowRecord[] = [
  { id: 1, studentId: 1, followTime: '2026-05-10 10:00', followType: '电话跟进', content: '家长咨询春季班课程安排', operator: '林老师', nextFollowTime: '2026-05-15' },
  { id: 2, studentId: 1, followTime: '2026-05-08 14:30', followType: '到店咨询', content: '体验课效果良好，有意向报名', operator: '林老师', nextFollowTime: '2026-05-10' },
  { id: 3, studentId: 1, followTime: '2026-05-03 09:00', followType: '微信沟通', content: '发送课程介绍资料', operator: '林老师', nextFollowTime: '2026-05-08' },
];

const seedTrial: StudentTrialRecord[] = [
  { id: 1, studentId: 1, trialDate: '2026-05-07 09:00', courseName: '少儿英语体验课', teacher: '陈老师', classroom: 'A101', feedback: '学生参与积极，口语表达流畅', status: '已完成' },
  { id: 2, studentId: 1, trialDate: '2026-04-25 15:00', courseName: '数学思维体验课', teacher: '周老师', classroom: 'B202', feedback: '逻辑能力较好，建议提高班', status: '已完成' },
];

const seedCourses: StudentCourseRecord[] = [
  { id: 1, studentId: 1, courseName: '少儿英语春季班', chargeType: '按期收费', totalHours: 48, remainingHours: 32, price: 4800, enrollDate: '2026-05-01', status: '在读' },
  { id: 2, studentId: 1, courseName: '硬笔书法基础班', chargeType: '按次收费', totalHours: 24, remainingHours: 18, price: 2400, enrollDate: '2026-04-15', status: '在读' },
];

const seedClassRecords: StudentClassRecord[] = [
  { id: 1, studentId: 1, lessonDate: '2026-05-13', className: '春季启航班', courseName: '少儿英语', teacher: '陈老师', status: '到课', deductHours: 2 },
  { id: 2, studentId: 1, lessonDate: '2026-05-11', className: '春季启航班', courseName: '少儿英语', teacher: '陈老师', status: '请假', deductHours: 0 },
  { id: 3, studentId: 1, lessonDate: '2026-05-09', className: '春季启航班', courseName: '少儿英语', teacher: '陈老师', status: '到课', deductHours: 2 },
  { id: 4, studentId: 1, lessonDate: '2026-05-06', className: '春季启航班', courseName: '少儿英语', teacher: '陈老师', status: '迟到', deductHours: 2 },
];

const seedDeductions: StudentDeductionRecord[] = [
  { id: 1, studentId: 1, deductionTime: '2026-05-13 10:30', courseName: '少儿英语', deductHours: 2, type: '上课扣课', operator: '系统' },
  { id: 2, studentId: 1, deductionTime: '2026-05-09 10:30', courseName: '少儿英语', deductHours: 2, type: '上课扣课', operator: '系统' },
  { id: 3, studentId: 1, deductionTime: '2026-05-06 10:30', courseName: '少儿英语', deductHours: 2, type: '上课扣课', operator: '系统' },
];

const seedSchedules: StudentScheduleInfo[] = [
  { id: 1, studentId: 1, className: '春季启航班', courseName: '少儿英语', teacher: '陈老师', weekday: '周一、周四', timeRange: '10:00-11:30', classroom: 'A101', startDate: '2026-05-01', endDate: '2026-08-31' },
  { id: 2, studentId: 1, className: '硬笔书法班', courseName: '硬笔书法基础班', teacher: '林老师', weekday: '周六', timeRange: '15:00-16:30', classroom: 'B203', startDate: '2026-04-15', endDate: '2026-07-15' },
];

const seedCommunications: StudentCommunicationRecord[] = [
  { id: 1, studentId: 1, communicateTime: '2026-05-13 11:00', type: '课后反馈', content: '今天课堂表现良好，积极发言。建议课后复习 Unit 3 单词。', operator: '陈老师' },
  { id: 2, studentId: 1, communicateTime: '2026-05-11 16:00', type: '请假确认', content: '家长来电确认 5/11 请假，已安排补课。', operator: '林老师' },
  { id: 3, studentId: 1, communicateTime: '2026-05-06 12:00', type: '入学沟通', content: '确认课程安排和教材清单。', operator: '林老师' },
];

const seedGrowth: StudentGrowthRecord[] = [
  { id: 1, studentId: 1, recordDate: '2026-05-13', type: '课堂评价', content: '口语表达进步明显，词汇量增加。', attachments: '' },
  { id: 2, studentId: 1, recordDate: '2026-05-06', type: '阶段测试', content: '期中测试成绩：听力 92，口语 88，笔试 85。', attachments: '' },
  { id: 3, studentId: 1, recordDate: '2026-04-20', type: '月度总结', content: '本月出勤率 95%，作业完成率 100%。', attachments: '' },
];

const seedLeaves: StudentLeaveRecord[] = [
  { id: 1, studentId: 1, startDate: '2026-05-11', endDate: '2026-05-11', reason: '身体不适', status: '已批准', approver: '林老师' },
  { id: 2, studentId: 1, startDate: '2026-04-28', endDate: '2026-04-28', reason: '家庭活动', status: '已批准', approver: '林老师' },
];

const seedPoints: StudentPointsRecord[] = [
  { id: 1, studentId: 1, couponName: '新生优惠券', type: '满减券', threshold: '满2000元可用', faceValue: '200元', acquireTime: '2026-05-01', expireTime: '2026-08-01', usedTime: '2026-05-01', status: '已使用' },
  { id: 2, studentId: 1, couponName: '续费优惠券', type: '折扣券', threshold: '无门槛', faceValue: '9折', acquireTime: '2026-04-15', expireTime: '2026-07-15', usedTime: '', status: '未使用' },
];

// ========== 创建分页适配器 ==========

const followStore = createEducationFakeCrud(seedFollow);
const trialStore = createEducationFakeCrud(seedTrial);
const coursesStore = createEducationFakeCrud(seedCourses);
const classRecordStore = createEducationFakeCrud(seedClassRecords);
const deductionStore = createEducationFakeCrud(seedDeductions);
const scheduleStore = createEducationFakeCrud(seedSchedules);
const communicationStore = createEducationFakeCrud(seedCommunications);
const growthStore = createEducationFakeCrud(seedGrowth);
const leaveStore = createEducationFakeCrud(seedLeaves);
const pointsStore = createEducationFakeCrud(seedPoints);

// ========== 导出页查询方法 ==========

export function getStudentFollowPage(params: any) {
  return followStore.getPage({ ...params, studentId: params.studentId });
}

export function getStudentTrialPage(params: any) {
  return trialStore.getPage({ ...params, studentId: params.studentId });
}

export function getStudentCoursePage(params: any) {
  return coursesStore.getPage({ ...params, studentId: params.studentId });
}

export function getStudentClassRecordPage(params: any) {
  return classRecordStore.getPage({ ...params, studentId: params.studentId });
}

export function getStudentDeductionPage(params: any) {
  return deductionStore.getPage({ ...params, studentId: params.studentId });
}

export function getStudentSchedulePage(params: any) {
  return scheduleStore.getPage({ ...params, studentId: params.studentId });
}

export function getStudentCommunicationPage(params: any) {
  return communicationStore.getPage({ ...params, studentId: params.studentId });
}

export function getStudentGrowthPage(params: any) {
  return growthStore.getPage({ ...params, studentId: params.studentId });
}

export function getStudentLeavePage(params: any) {
  return leaveStore.getPage({ ...params, studentId: params.studentId });
}

export function getStudentPointsPage(params: any) {
  return pointsStore.getPage({ ...params, studentId: params.studentId });
}
