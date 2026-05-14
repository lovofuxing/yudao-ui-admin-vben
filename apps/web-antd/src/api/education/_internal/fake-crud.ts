import type { PageParam, PageResult } from '@vben/request';

/** 教务迁移期页面统一使用的主键类型。 */
export interface EducationFakeEntity {
  /** 业务主键，后续对接后端时对应各资源 RespVO.id。 */
  id: number;
}

/** 允许列表页在分页参数外携带各资源自己的搜索字段。 */
export type EducationFakePageParam<T extends EducationFakeEntity> = PageParam &
  Partial<Record<keyof T, unknown>> &
  Record<string, unknown>;

function cloneRecord<T extends EducationFakeEntity>(record: T): T {
  return { ...record };
}

function normalizeSearchValue(value: unknown) {
  return String(value ?? '').trim();
}

function matchesSearchValue(
  record: Record<string, unknown>,
  field: string,
  value: unknown,
) {
  if (value === undefined || value === null || value === '') {
    return true;
  }
  if (Array.isArray(value)) {
    return true;
  }

  const normalized = normalizeSearchValue(value);
  if (!normalized) {
    return true;
  }

  // keyword 是旧系统常用的组合搜索入口，迁移期先覆盖当前行的所有展示字段。
  if (field === 'keyword') {
    return Object.values(record).some((item) =>
      normalizeSearchValue(item).includes(normalized),
    );
  }

  return normalizeSearchValue(record[field]).includes(normalized);
}

/**
 * 创建迁移期内存 CRUD 适配器。
 * 这是用户指定的假数据阶段实现；正式联调时只替换各资源 index.ts 内部调用为 requestClient。
 */
export function createEducationFakeCrud<T extends EducationFakeEntity>(seed: T[]) {
  const records = seed.map(cloneRecord);

  return {
    /** 按 Vben 表格传入的 pageNo/pageSize 返回 PageResult。 */
    async getPage(params: EducationFakePageParam<T>): Promise<PageResult<T>> {
      const { pageNo = 1, pageSize = 10, ...filters } = params;
      const currentPage = Number(pageNo) || 1;
      const currentPageSize = Number(pageSize) || 10;
      const list = records.filter((record) =>
        Object.entries(filters).every(([field, value]) =>
          matchesSearchValue(record as Record<string, unknown>, field, value),
        ),
      );
      const start = (currentPage - 1) * currentPageSize;

      return {
        list: list.slice(start, start + currentPageSize).map(cloneRecord),
        total: list.length,
      };
    },

    /** 详情必须按 id 重新取数，避免编辑弹窗直接信任表格行快照。 */
    async get(id: number): Promise<T> {
      const record = records.find((item) => item.id === id);
      if (!record) {
        throw new Error('教育业务记录不存在');
      }
      return cloneRecord(record);
    },

    /** 新增时复制首条结构作为默认值，避免假数据阶段字段缺失导致页面空洞。 */
    async create(data: Partial<T>): Promise<number> {
      const id = Math.max(0, ...records.map((item) => item.id)) + 1;
      const record = {
        ...(records[0] ?? {}),
        ...data,
        id,
      } as T;
      records.unshift(record);
      return id;
    },

    /** 修改只合并当前资源字段，正式联调后由后端保存规则兜底。 */
    async update(data: Partial<T> & { id: number }): Promise<boolean> {
      const index = records.findIndex((item) => item.id === data.id);
      if (index < 0) {
        throw new Error('教育业务记录不存在');
      }
      records[index] = {
        ...records[index],
        ...data,
      } as T;
      return true;
    },

    /** 删除单条记录，供列表行危险操作使用。 */
    async delete(id: number): Promise<boolean> {
      const index = records.findIndex((item) => item.id === id);
      if (index < 0) {
        throw new Error('教育业务记录不存在');
      }
      records.splice(index, 1);
      return true;
    },

    /** 批量删除复用单条删除逻辑，保持假数据阶段行为一致。 */
    async deleteList(ids: number[]): Promise<boolean> {
      for (const id of ids) {
        const index = records.findIndex((item) => item.id === id);
        if (index >= 0) {
          records.splice(index, 1);
        }
      }
      return true;
    },

    /** 导出先用 JSON Blob 占位，正式接口接入后改为 requestClient.download。 */
    async exportData(params: EducationFakePageParam<T>): Promise<Blob> {
      const page = await this.getPage({
        ...params,
        pageNo: 1,
        pageSize: 1000,
      });
      return new Blob([JSON.stringify(page.list, null, 2)], {
        type: 'application/json;charset=utf-8',
      });
    },
  };
}
