import type { EducationFakePageParam } from '../_internal/fake-crud';

import { createEducationFakeCrud } from '../_internal/fake-crud';

export namespace EducationFaceCheckinApi {
  /** 签到管理列表行，覆盖待签到、签到记录和统计入口基础字段。 */
  export interface FaceCheckin {
    /** 签到记录主键。 */
    id: number;
    /** 学员姓名。 */
    studentName: string;
    /** 联系方式。 */
    phone: string;
    /** 所在班级。 */
    className: string;
    /** 签到日期。 */
    checkinDate: string;
    /** 签到时间。 */
    checkinTime: string;
    /** 签退时间。 */
    checkoutTime: string;
    /** 签到来源。 */
    source: string;
    /** 关联扣减课时。 */
    deductHours: number;
    /** 签到状态。 */
    status: string;
  }
}

const faceCheckinStore =
  createEducationFakeCrud<EducationFaceCheckinApi.FaceCheckin>([
    {
      id: 1,
      studentName: '林小满',
      phone: '13800001001',
      className: '春季启航班',
      checkinDate: '2026-05-14',
      checkinTime: '08:55',
      checkoutTime: '10:32',
      source: '刷脸设备',
      deductHours: 1,
      status: '已签到',
    },
    {
      id: 2,
      studentName: '周明轩',
      phone: '13800001002',
      className: '周末提高班',
      checkinDate: '2026-05-14',
      checkinTime: '13:50',
      checkoutTime: '15:31',
      source: '前台手动',
      deductHours: 1,
      status: '已签退',
    },
    {
      id: 3,
      studentName: '陈一一',
      phone: '13800001003',
      className: '一对一精品课',
      checkinDate: '2026-05-14',
      checkinTime: '',
      checkoutTime: '',
      source: '小程序',
      deductHours: 0,
      status: '待签到',
    },
    {
      id: 4,
      studentName: '王可欣',
      phone: '13800001004',
      className: '科学实验营',
      checkinDate: '2026-05-14',
      checkinTime: '18:58',
      checkoutTime: '',
      source: '刷脸设备',
      deductHours: 2,
      status: '异常',
    },
  ]);

/** 查询签到分页，后续替换为 GET /education/checkin/page。 */
export function getEducationFaceCheckinPage(
  params: EducationFakePageParam<EducationFaceCheckinApi.FaceCheckin>,
) {
  return faceCheckinStore.getPage(params);
}

/** 查询签到详情。 */
export function getEducationFaceCheckin(id: number) {
  return faceCheckinStore.get(id);
}

/** 新增签到记录。 */
export function createEducationFaceCheckin(
  data: Partial<EducationFaceCheckinApi.FaceCheckin>,
) {
  return faceCheckinStore.create(data);
}

/** 修改签到记录。 */
export function updateEducationFaceCheckin(
  data: Partial<EducationFaceCheckinApi.FaceCheckin> & { id: number },
) {
  return faceCheckinStore.update(data);
}

/** 删除签到记录。 */
export function deleteEducationFaceCheckin(id: number) {
  return faceCheckinStore.delete(id);
}

/** 批量删除签到记录。 */
export function deleteEducationFaceCheckinList(ids: number[]) {
  return faceCheckinStore.deleteList(ids);
}

/** 导出签到记录，迁移期返回 JSON Blob。 */
export function exportEducationFaceCheckin(
  params: EducationFakePageParam<EducationFaceCheckinApi.FaceCheckin>,
) {
  return faceCheckinStore.exportData(params);
}
