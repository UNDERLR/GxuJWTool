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
	//板块类型等级名称
	bklxdjmc: string;
	//场地ID
	cd_id: string;
	//场地编号
	cdbh: string;
	//场地类别名称
	cdlbmc: string;
	//场地名称
	cdmc: string;
	//重修标记
	cxbj: string;
	//重修标记名称
	cxbjmc: string;
	//日期
	date: string;
	//数字格式日期
	dateDigit: string;
	//带分隔符的日期
	dateDigitSeparator: string;
	//具体日期
	day: string;
	//节次
	jc: string;
	//节次？
	jcor: string;
	//节次数
	jcs: string;
	//教工号ID
	jgh_id: string;
	//教工排序字段
	jgpxzd: string;
	//教学班ID
	jxb_id: string;
	//教学班名称
	jxbmc: string;
	//教学班是否停开标记
	jxbsftkbj: string;
	//教学班组成
	jxbzc: string;
	//课程标记
	kcbj: string;
	//课程号
	kch: string;
	//课程号ID
	kch_id: string;
	//课程列表
	kclb: string;
	//课程名称
	kcmc: string;
	//课程学生组成
	kcxszc: string;
	//课程性质
	kcxz: string;
	//课程总学时
	kczxs: string;
	//考核方式名称
	khfsmc: string;
	//开课状态
	kkzt: string;
	//楼号
	lh: string;
	//
	listnav: string;
	//
	localeKey: string;
	//月份
	month: string;
	//旧节次
	oldjc: string;
	//旧组成
	oldzc: string;
	pageTotal: number;
	pageable: boolean;
	//排课班级
	pkbj: string;
	//排序？
	px: string;
	//QQ群号
	qqqh: string;
	queryModel: QueryModel;
	rangeable: boolean;
	//
	rk: string;
	//人数定制教师
	rsdzjs: number;
	//是否缴费
	sfjf: string;
	//授课方式名称
	skfsmc: string;
	//生效标记
	sxbj: string;
	totalResult: string;
	userModel: UserModel;
	//学分
	xf: string;
	//
	xkbz: string;
	//姓名
	xm: string;
	//学年名
	xnm: string;
	//学期代码
	xqdm: string;
	//学期号
	xqh1: string;
	xqh_id: string;
	//
	xqj: string;
	xqjmc: string;
	//学期名
	xqm: string;
	//学期名称
	xqmc: string;
	//
	xsdm: string;
	//学生类型标记
	xslxbj: string;
	//年份
	year: string;
	//周次
	zcd: string;
	//周次名称
	zcmc: string;
	//
	zfjmc: string;
	//周（zhou）学时
	zhxs: string;
	//总（zong）学时
	zxs: string;
	zxxx: string;
	//
	zyfxmc: string;
	//专业核心课程标记
	zyhxkcbj: string;
	//政治面貌
	zzmm: string;
	//总容量
	zzrl: string;
}

export interface XsbjList {
	ywxsmc: string;
	xslxbj: string;
	xsmc: string;
	xsdm: string;
}

export interface ResRoot {
	qsxqj: string;
	xsxx: Xsxx;
	sjkList: SjkList[];
	xqjmcMap: XqjmcMap;
	xskbsfxstkzt: string;
	rqazcList: any[];
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
