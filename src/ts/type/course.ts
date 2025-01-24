export interface Course {
	//？
	bklxdjmc: string;
    //场地ID
	"cd_id": string;
	//场地-班号
	cdbh: string;
	//场地类别名称
	cdlbmc: string;
	//场地名称
	cdmc: string;
	//重修班级？
	cxbj: string;
	//重修班级名称
	cxbjmc: string;
	//中文查询日期
	date: string;
	//数字查询日期
	dateDigit: string;
	//分隔符数字查询日期
	dateDigitSeparator: string;
	//（年月）日
	day: string;
	//节次
	jc: string;
	//节次（其它）
	jcor: string;
	//节次数
	jcs: string;
	//机构号ID
	"jgh_id": string;
	//机构排选制度
	jgpxzd: string;
	//教学班ID
	"jxb_id": string;
	//教学班名称
	jxbmc: string;
	//教学班是否可（退课）标记
	jxbsftkbj: string;
	//教学班组成
	jxbzc: string;
	//课程标记
	kcbj: string;
	//课程号
	kch: string;
	//课程号ID
	"kch_id": string;
	//课程类别
	kclb: string;
	//课程名称
	kcmc: string;
	//课程学时组成
	kcxszc: string;
	//课程选择
	kcxz: string;
	//课程总学时
	kczxs: string;
	//考核方式名称
	khfsmc: string;
	//开课状态
	kkzt: string;
	//楼号
	lh: string;
	//列表导航
	listnav: string;
	//本地化键
	localeKey: string;
	//月份
	month: string;
	//旧节次
	oldjc: string;
	//旧周次
	oldzc: string;
	//总页数
	pageTotal: number;
	//是否可翻页
	pageable: boolean;
	//排课班级
	pkbj: string;
	//排序？
	px: string;
	//QQ群号
	qqqh: string;
	//查询模型
	queryModel: IQueryModel;
	//可否范围内选择
	rangeable: boolean;
	//
	rk: string;
	//
	rsdzjs: number;
	//
	sfjf: string;
	//授课方式名称
	skfsmc: string;
	//？？标记
	sxbj: string;
	//总结果
	totalResult: string;
	userModel: IUserModel;
	//学分
	xf: string;
	//选课备注
	xkbz: string;
	//姓名
	xm: string;
	//学年名
	xnm: string;
	//学期？？
	xqdm: string;
	//学期号
	xqh1: string;
	//学期号ID
	"xqh_id": string;
	//星期几
	xqj: string;
	//星期几名称
	xqjmc: string;
	//学期名
	xqm: string;
	//学期名称
	xqmc: string;
	//学生代码
	xsdm: string;
	//学生类型标记
	xslxbj: string;
	year: string;
	//周？？
	zcd: string;
	//职称名称
	zcmc: string;
	//
	zfjmc: string;
	//周h学时
	zhxs: string;
	//总学时
	zxs: string;
	//
	zxxx: string;
	//专业方向名称
	zyfxmc: string;
	//专业核心课程标记
	zyhxkcbj: string;
	//政治面貌
	zzmm: string;
	//
	zzrl: string;
}


/* 自动生成的 Interface */

interface IUserModel {
	monitor: boolean;
	roleCount: number;
	roleKeys: string;
	roleValues: string;
	status: number;
	usable: boolean;
}


interface IQueryModel {
	currentPage: number;
	currentResult: number;
	entityOrField: boolean;
	limit: number;
	offset: number;
	pageNo: number;
	pageSize: number;
	showCount: number;
	sorts: void /* undefined */[];
	totalCount: number;
	totalPage: number;
	totalResult: number;
}