import {QueryModel, UserModel} from "@/ts/type/global";

export interface StudentEvaluationItem {
	//日期
	date: string;
	//日期数字格式
	dateDigit: string;
	//日期数字分开
	dateDigitSeparator: string;
	//日
	day: string;
	//机构ID
	"jgh_id": string;
	//机构名称
	jgmc: string;
	//
	jgpxzd: string;
	//教学班ID
	"jxb_id": string;
	//教学班名称
	jxbmc: string;
	//教学地点
	jxdd: string;
	//教职工名称
	jzgmc: string;
	//课程号ID
	"kch_id": string;
	//课程名称
	kcmc: string;
	//列表导航
	listnav: string;
	//本地化键
	localeKey: string;
	//月份？
	month: string;
	//总页数
	pageTotal: number;
	//是否可翻页
	pageable: boolean;
	//评价？？名称表ID
	"pjmbmcb_id": string;
	//评价状态
	pjzt: string;
	queryModel: QueryModel;
	//？
	rangeable: boolean;
	//列ID
	"row_id": string;
	//是否成绩录入结束
	sfcjlrjs: string;
	//上课时间
	sksj: string;
	//提交状态
	tjzt: string;
	//提交状态名称
	tjztmc: string;
	//总结果
	totalResult: string;
	//
	userModel: UserModel;
	//学年名
	xnm: string;
	//学期名
	xqm: string;
	//？？代号
	xsdm: string;
	//？？名称（系统里应该有对应字眼，我忘了而已）
	xsmc: string;
	//年份
	year: string;
	//职称名称
	zcmc: string;
}
