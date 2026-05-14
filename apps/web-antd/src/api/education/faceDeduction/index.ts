import type { EducationFakePageParam } from '../_internal/fake-crud';

import { createEducationFakeCrud } from '../_internal/fake-crud';

export namespace EducationFaceDeductionApi {
  /** 刷脸扣课识别记录，摄像头真实能力后续由硬件服务接入。 */
  export interface FaceDeduction {
    /** 识别记录主键。 */
    id: number;
    /** 学员姓名。 */
    studentName: string;
    /** 联系方式。 */
    phone: string;
    /** 扣课课程。 */
    courseName: string;
    /** 授课老师。 */
    teacher: string;
    /** 扣课课时。 */
    deductHours: number;
    /** 人脸匹配度。 */
    matchScore: string;
    /** 识别状态。 */
    status: string;
  }
}

const faceDeductionStore =
  createEducationFakeCrud<EducationFaceDeductionApi.FaceDeduction>([
    {
      id: 1,
      studentName: '林小满',
      phone: '13800001001',
      courseName: '少儿英语',
      teacher: '林老师',
      deductHours: 1,
      matchScore: '98%',
      status: '识别成功',
    },
    {
      id: 2,
      studentName: '周明轩',
      phone: '13800001002',
      courseName: '数学思维',
      teacher: '周老师',
      deductHours: 1,
      matchScore: '95%',
      status: '待确认',
    },
    {
      id: 3,
      studentName: '陈一一',
      phone: '13800001003',
      courseName: '硬笔书法',
      teacher: '陈老师',
      deductHours: 1,
      matchScore: '91%',
      status: '识别失败',
    },
    {
      id: 4,
      studentName: '王可欣',
      phone: '13800001004',
      courseName: '科学实验',
      teacher: '王老师',
      deductHours: 2,
      matchScore: '97%',
      status: '识别成功',
    },
  ]);

/** 查询刷脸扣课分页，后续替换为 GET /education/faceDeduction/page。 */
export function getEducationFaceDeductionPage(
  params: EducationFakePageParam<EducationFaceDeductionApi.FaceDeduction>,
) {
  return faceDeductionStore.getPage(params);
}

/** 查询刷脸扣课详情。 */
export function getEducationFaceDeduction(id: number) {
  return faceDeductionStore.get(id);
}

/** 新增刷脸扣课记录。 */
export function createEducationFaceDeduction(
  data: Partial<EducationFaceDeductionApi.FaceDeduction>,
) {
  return faceDeductionStore.create(data);
}

/** 修改刷脸扣课记录。 */
export function updateEducationFaceDeduction(
  data: Partial<EducationFaceDeductionApi.FaceDeduction> & { id: number },
) {
  return faceDeductionStore.update(data);
}

/** 删除刷脸扣课记录。 */
export function deleteEducationFaceDeduction(id: number) {
  return faceDeductionStore.delete(id);
}

/** 批量删除刷脸扣课记录。 */
export function deleteEducationFaceDeductionList(ids: number[]) {
  return faceDeductionStore.deleteList(ids);
}

/** 导出刷脸扣课记录，迁移期返回 JSON Blob。 */
export function exportEducationFaceDeduction(
  params: EducationFakePageParam<EducationFaceDeductionApi.FaceDeduction>,
) {
  return faceDeductionStore.exportData(params);
}
