import { $t } from '#/locales';

const statusI18nMap: Record<string, string> = {
  在读: 'education.status.studying',
  待续费: 'education.status.renewalPending',
  停课: 'education.status.paused',
  启用: 'education.status.enabled',
  停用: 'education.status.disabled',
  开班中: 'education.status.opening',
  待排课: 'education.status.schedulePending',
  已满班: 'education.status.full',
  待上课: 'education.status.lessonPending',
  待确认: 'education.status.pending',
  已完成: 'education.status.done',
  资源冲突: 'education.status.conflict',
  到课: 'education.status.attended',
  请假: 'education.status.leave',
  迟到: 'education.status.late',
  缺勤: 'education.status.absent',
  已确认: 'education.status.confirmed',
  已取消: 'education.status.canceled',
  已扣课: 'education.status.deducted',
  已撤销: 'education.status.revoked',
  识别成功: 'education.status.recognized',
  识别失败: 'education.status.recognizeFailed',
  已签到: 'education.status.checkedIn',
  已签退: 'education.status.checkedOut',
  待签到: 'education.status.checkinPending',
  异常: 'education.status.abnormal',
};

/** 迁移假数据仍保留中文状态值，这里统一转换为当前语言下的展示文案。 */
export function getEducationStatusText(value: unknown) {
  const rawValue = String(value ?? '-');
  const i18nKey = statusI18nMap[rawValue];
  return i18nKey ? $t(i18nKey) : rawValue;
}

/** 表格状态色只用于快速区分风险、完成和待处理状态，不承载业务权限。 */
export function getEducationStatusColor(value: unknown) {
  const rawValue = String(value ?? '');
  if (
    ['在读', '启用', '开班中', '已完成', '到课', '已确认', '已扣课', '识别成功', '已签到', '已签退'].includes(
      rawValue,
    )
  ) {
    return 'green';
  }
  if (
    ['停课', '停用', '资源冲突', '缺勤', '已取消', '已撤销', '识别失败', '异常'].includes(
      rawValue,
    )
  ) {
    return 'red';
  }
  return 'blue';
}

/** 搜索和表单 Select 复用的状态选项，value 保持后端字段原值，label 走 i18n。 */
export function getEducationStatusOptions(values: string[]) {
  return values.map((value) => ({
    label: getEducationStatusText(value),
    value,
  }));
}
