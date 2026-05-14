import type { EducationFakePageParam } from '../_internal/fake-crud';

import { createEducationFakeCrud } from '../_internal/fake-crud';

export namespace EducationScheduleApi {
  /** 课表管理列表行，独立于班级详情子课表。 */
  export interface Schedule {
    /** 课表主键。 */
    id: number;
    /** 上课日期。 */
    lessonDate: string;
    /** 上课时间段。 */
    timeRange: string;
    /** 班级名称。 */
    className: string;
    /** 课程名称。 */
    courseName: string;
    /** 授课老师。 */
    teacher: string;
    /** 助教。 */
    assistant: string;
    /** 教室。 */
    classroom: string;
    /** 排课状态。 */
    status: string;
  }
}

const scheduleStore = createEducationFakeCrud<EducationScheduleApi.Schedule>([
  {
    id: 1,
    lessonDate: '2026-05-16',
    timeRange: '09:00-10:30',
    className: '春季启航班',
    courseName: '少儿英语',
    teacher: '林老师',
    assistant: '李助教',
    classroom: 'A101',
    status: '待上课',
  },
  {
    id: 2,
    lessonDate: '2026-05-17',
    timeRange: '14:00-15:30',
    className: '周末提高班',
    courseName: '数学思维',
    teacher: '周老师',
    assistant: '黄助教',
    classroom: 'B203',
    status: '待确认',
  },
  {
    id: 3,
    lessonDate: '2026-05-18',
    timeRange: '18:30-20:00',
    className: '一对一精品课',
    courseName: '硬笔书法',
    teacher: '陈老师',
    assistant: '无',
    classroom: 'C305',
    status: '已完成',
  },
  {
    id: 4,
    lessonDate: '2026-05-19',
    timeRange: '19:00-20:30',
    className: '科学实验营',
    courseName: '科学实验',
    teacher: '王老师',
    assistant: '李助教',
    classroom: 'D401',
    status: '资源冲突',
  },
]);

/** 查询课表分页，后续替换为 GET /education/schedule/page。 */
export function getEducationSchedulePage(
  params: EducationFakePageParam<EducationScheduleApi.Schedule>,
) {
  return scheduleStore.getPage(params);
}

/** 查询课表详情。 */
export function getEducationSchedule(id: number) {
  return scheduleStore.get(id);
}

/** 新增课表。 */
export function createEducationSchedule(
  data: Partial<EducationScheduleApi.Schedule>,
) {
  return scheduleStore.create(data);
}

/** 修改课表。 */
export function updateEducationSchedule(
  data: Partial<EducationScheduleApi.Schedule> & { id: number },
) {
  return scheduleStore.update(data);
}

/** 删除课表。 */
export function deleteEducationSchedule(id: number) {
  return scheduleStore.delete(id);
}

/** 批量删除课表。 */
export function deleteEducationScheduleList(ids: number[]) {
  return scheduleStore.deleteList(ids);
}

/** 导出课表列表，迁移期返回 JSON Blob。 */
export function exportEducationSchedule(
  params: EducationFakePageParam<EducationScheduleApi.Schedule>,
) {
  return scheduleStore.exportData(params);
}
