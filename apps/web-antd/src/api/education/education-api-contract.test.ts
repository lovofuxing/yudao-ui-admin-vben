import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import {
  getEducationClassPage,
  updateEducationClass,
} from './class';
import { getEducationCoursePage } from './course';
import { getEducationFaceCheckinPage } from './checkin';
import { getEducationFaceDeductionPage } from './faceDeduction';
import { getEducationLessonRecordPage } from './record';
import { getEducationQuickDeductionPage } from './quickDeduction';
import { getEducationReservationPage } from './reservation';
import { getEducationSchedulePage } from './schedule';
import {
  deleteEducationStudent,
  getEducationStudent,
  getEducationStudentPage,
  updateEducationStudent,
} from './student';

describe('education resource api contract', () => {
  it('keeps deduction menu permissions aligned with camelCase menu paths', () => {
    // 扣课菜单权限必须和已确认的菜单资源段一致，避免短横线权限和后端菜单权限对不上。
    const permissionCases = [
      {
        filePath:
          'apps/web-antd/src/views/education/quickDeduction/index.vue',
        invalidResource: 'quick-deduction',
        resource: 'quickDeduction',
      },
      {
        filePath: 'apps/web-antd/src/views/education/faceDeduction/index.vue',
        invalidResource: 'face-deduction',
        resource: 'faceDeduction',
      },
    ];

    for (const item of permissionCases) {
      const source = readFileSync(resolve(process.cwd(), item.filePath), 'utf8');

      expect(source).toContain(`education:${item.resource}:create`);
      expect(source).toContain(`education:${item.resource}:update`);
      expect(source).toContain(`education:${item.resource}:delete`);
      expect(source).toContain(`education:${item.resource}:export`);
      expect(source).not.toContain(`education:${item.invalidResource}:`);
    }
  });

  it('returns paged data from every education resource api', async () => {
    // 覆盖本次迁移的独立资源目录，避免回退成单个 education/mock.ts。
    const pages = await Promise.all([
      getEducationStudentPage({ pageNo: 1, pageSize: 2 }),
      getEducationCoursePage({ pageNo: 1, pageSize: 2 }),
      getEducationClassPage({ pageNo: 1, pageSize: 2 }),
      getEducationSchedulePage({ pageNo: 1, pageSize: 2 }),
      getEducationLessonRecordPage({ pageNo: 1, pageSize: 2 }),
      getEducationReservationPage({ pageNo: 1, pageSize: 2 }),
      getEducationQuickDeductionPage({ pageNo: 1, pageSize: 2 }),
      getEducationFaceDeductionPage({ pageNo: 1, pageSize: 2 }),
      getEducationFaceCheckinPage({ pageNo: 1, pageSize: 2 }),
    ]);

    expect(pages.every((page) => page.list.length > 0)).toBe(true);
    expect(pages.every((page) => page.total >= page.list.length)).toBe(true);
  });

  it('filters, updates and deletes student records through the student api', async () => {
    // 学员是教务中心最高频入口，单独覆盖查询、详情、编辑和删除链路。
    const filtered = await getEducationStudentPage({
      pageNo: 1,
      pageSize: 10,
      studentName: '林小满',
    });

    expect(filtered.total).toBeGreaterThan(0);

    const first = filtered.list[0]!;
    await updateEducationStudent({
      id: first.id,
      studentName: '林小满-测试',
    });

    const updated = await getEducationStudent(first.id);
    expect(updated.studentName).toBe('林小满-测试');

    await deleteEducationStudent(first.id);
    const afterDelete = await getEducationStudentPage({
      pageNo: 1,
      pageSize: 10,
      studentName: '林小满-测试',
    });
    expect(afterDelete.total).toBe(0);
  });

  it('keeps edit detail loading available for class records', async () => {
    // 班级页面编辑必须按规范重新取详情，不能直接信任表格行。
    const page = await getEducationClassPage({ pageNo: 1, pageSize: 1 });
    const row = page.list[0]!;

    await updateEducationClass({
      id: row.id,
      className: '春季启航班-测试',
    });

    const updatedPage = await getEducationClassPage({
      className: '春季启航班-测试',
      pageNo: 1,
      pageSize: 10,
    });

    expect(updatedPage.total).toBe(1);
  });

  it('provides student detail tab pagination for all 10 tabs', async () => {
    const { getStudentFollowPage, getStudentTrialPage, getStudentCoursePage, getStudentClassRecordPage, getStudentDeductionPage, getStudentSchedulePage, getStudentCommunicationPage, getStudentGrowthPage, getStudentLeavePage, getStudentPointsPage } = await import('./student/detail');

    const pages = await Promise.all([
      getStudentFollowPage({ studentId: 1, pageNo: 1, pageSize: 5 }),
      getStudentTrialPage({ studentId: 1, pageNo: 1, pageSize: 5 }),
      getStudentCoursePage({ studentId: 1, pageNo: 1, pageSize: 5 }),
      getStudentClassRecordPage({ studentId: 1, pageNo: 1, pageSize: 5 }),
      getStudentDeductionPage({ studentId: 1, pageNo: 1, pageSize: 5 }),
      getStudentSchedulePage({ studentId: 1, pageNo: 1, pageSize: 5 }),
      getStudentCommunicationPage({ studentId: 1, pageNo: 1, pageSize: 5 }),
      getStudentGrowthPage({ studentId: 1, pageNo: 1, pageSize: 5 }),
      getStudentLeavePage({ studentId: 1, pageNo: 1, pageSize: 5 }),
      getStudentPointsPage({ studentId: 1, pageNo: 1, pageSize: 5 }),
    ]);

    expect(pages.every((page) => page.list.length >= 0)).toBe(true);
    expect(pages.every((page) => typeof page.total === 'number')).toBe(true);
  });

  it('provides class detail tab pagination for all 5 tabs', async () => {
    const { getClassStudentPage, getClassSchedulePage, getClassRecordPage, getClassScheduleConfigPage, getClassOrderPage } = await import('./class/detail');

    const pages = await Promise.all([
      getClassStudentPage({ classId: 1, pageNo: 1, pageSize: 5 }),
      getClassSchedulePage({ classId: 1, pageNo: 1, pageSize: 5 }),
      getClassRecordPage({ classId: 1, pageNo: 1, pageSize: 5 }),
      getClassScheduleConfigPage({ classId: 1, pageNo: 1, pageSize: 5 }),
      getClassOrderPage({ classId: 1, pageNo: 1, pageSize: 5 }),
    ]);

    expect(pages.every((page) => page.list.length >= 0)).toBe(true);
    expect(pages.every((page) => typeof page.total === 'number')).toBe(true);
  });
});
