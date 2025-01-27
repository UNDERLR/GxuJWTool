export interface Xsxx {
	//班级名称
	bJMC: string;
	//学年名称
	xNMC: string;
	//
	kXKXXQ: string;
	//
	xKKGXQ: string;
	//
	xKKG: string;
	//专业号ID
	zYH_ID: string;
	//学号ID
	xH_ID: string;
	//学号
	xH: string;
	//学期名名称
	xQMMC: string;
	//缴费状态
	jFZT: number;
	//姓名
	xM: string;
	//星期名
	xQM: string;
	//学年名
	xNM: string;
	//年级代码ID
	nJDM_ID: string;
	//课程？数
	kCMS: number;
	//专业名称
	zYMC: string;
}

export interface QueryModel {
	//当前页码
	currentPage: number;
	//总记录数
	currentResult: number;
	//实体还是字段
	entityOrField: boolean;
	//最大记录数
	limit: number;
	//从第几个开始检索
	offset: number;
	//当前页码
	pageNo: number;
	//每页记录数
	pageSize: number;
	//显示的记录数
	showCount: number;
	//
	sorts: any[];
	//总数
	totalCount: number;
	//总页数
	totalPage: number;
	//总记录数
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
//实践课
export interface SjkList {
	//重修班级
	cxbj: string;
	//日期
	date: string;
	//
	dateDigit: string;
	//
	dateDigitSeparator: string;
	//
	day: string;
	//
	jgpxzd: string;
	//教师姓名
	jsxm: string;
	//教学班组合
	jxbzh: string;
	//课程类别
	kclb: string;
	//课程名称
	kcmc: string;
	//
	listnav: string;
	//
	localeKey: string;
	//月
	month: string;
	//总页数
	pageTotal: number;
	//能否翻页
	pageable: boolean;
	//起始结束周
	qsjsz: string;
	//全套课程格式
	qtkcgs: string;
	queryModel: QueryModel;
	rangeable: boolean;
	//
	rsdzjs: number;
	//是否实践课
	sfsjk: string;
	//实践课程格式
	sjkcgs: string;
	totalResult: string;
	userModel: UserModel;
	//学分
	xf: string;
	//选课时间
	xksj: string;
	//学年名称
	xnmc: string;
	//星期名称
	xqmc: string;
	//学期名称
	xqmmc: string;
	//年
	year: string;
}
//星期名称对应
export interface XqjmcMap {
	//月曜日
	1: string;
	//火曜日
	2: string;
	//水曜日
	3: string;
	//木曜日
	4: string;
	//金曜日
	5: string;
	//土曜日
	6: string;
	//日曜日
	7: string;
}

export interface KbList {
	bklxdjmc: string;
	cd_id: string;
	cdbh: string;
	cdlbmc: string;
	cdmc: string;
	cxbj: string;
	cxbjmc: string;
	date: string;
	dateDigit: string;
	dateDigitSeparator: string;
	day: string;
	jc: string;
	jcor: string;
	jcs: string;
	jgh_id: string;
	jgpxzd: string;
	jxb_id: string;
	jxbmc: string;
	jxbsftkbj: string;
	jxbzc: string;
	kcbj: string;
	kch: string;
	kch_id: string;
	kclb: string;
	kcmc: string;
	kcxszc: string;
	kcxz: string;
	kczxs: string;
	khfsmc: string;
	kkzt: string;
	lh: string;
	listnav: string;
	localeKey: string;
	month: string;
	oldjc: string;
	oldzc: string;
	pageTotal: number;
	pageable: boolean;
	pkbj: string;
	px: string;
	qqqh: string;
	queryModel: QueryModel;
	rangeable: boolean;
	rk: string;
	rsdzjs: number;
	sfjf: string;
	skfsmc: string;
	sxbj: string;
	totalResult: string;
	userModel: UserModel;
	xf: string;
	xkbz: string;
	xm: string;
	xnm: string;
	xqdm: string;
	xqh1: string;
	xqh_id: string;
	xqj: string;
	xqjmc: string;
	xqm: string;
	xqmc: string;
	xsdm: string;
	xslxbj: string;
	year: string;
	zcd: string;
	zcmc: string;
	zfjmc: string;
	zhxs: string;
	zxs: string;
	zxxx: string;
	zyfxmc: string;
	zyhxkcbj: string;
	zzmm: string;
	zzrl: string;
}

export interface XsbjList {
	ywxsmc: string;
	xslxbj: string;
	xsmc: string;
	xsdm: string;
}

export interface RootObject {
	qsxqj: string;
	xsxx: Xsxx;
	sjkList: SjkList[];
	xqjmcMap: XqjmcMap;
	xskbsfxstkzt: string;
	rqazcList: any[];
	kbList: KbList[];
	xsbjList: XsbjList[];
	zckbsfxssj: string;
	djdzList: any[];
	kblx: number;
	sfxsd: string;
	jfckbkg: boolean;
	xqbzxxszList: any[];
	xkkg: boolean;
	sxgykbbz: string;
	jxhjkcList: any[];
	xnxqsfkz: string;
}