export interface QueryModel {
    currentPage: number;
    currentResult: number;
    entityOrField: boolean;
    limit: number;
    offset: number;
    pageNo: number;
    pageSize: number;
    showCount: number;
    sorts: any[];
    totalCount: number;
    totalPage: number;
    totalResult: number;
}

export interface UserModel {
    monitor: boolean;
    roleCount: number;
    roleKeys: string;
    roleValues: string;
    status: number;
    usable: boolean;
}
