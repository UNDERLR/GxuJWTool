import {QueryResRoot} from "@/ts/type/global";

// TODO: 待抽象出基类
// 考试信息数据结构
export interface ExamInfo {
    // 学号ID，实际上就是学号
    xh_id: string;
    // 班级
    bj: string;
    // 场地编号，看上去好像不带楼的名称，例`综合511`
    cdbh: string;
    // 考场座位号
    zwh: string;
    // 考试名称
    ksmc: string;
    // 考试时间
    kssj: string;
    // 课程号
    kch: string;
    // 开课学院
    kkxy: string;
    // 学期，具体值对应查看`global.ts`
    xqm: string;
    // 考察方式
    khfs: string;
    // 场地名称，带有楼的名称？似乎是一般使用的属性，例`西综合511`
    cdmc: string;
    // 场地校庆名称？
    cdxqmc: string;
    // 上课时间
    sksj: string;
    // 课程名称
    kcmc: string;
    // 培养层次
    pycc: string;
    // 似乎是对应根响应结构的查询结果数
    totalresult: number;
    // 年级（名称），接口请求使用的学年值，组件显示使用`xnmc`，对应关系查看`global.ts`
    njmc: string;
    // 学院（名称）
    jgmc: string;
    // 教学班名称
    jxbmc: string;
    // 试卷编号
    sjbh: string;
    // 性别
    xb: string;
    // 专业（名称）
    zymc: string;
    // 学分
    xf: string;
    // 学号
    xh: string;
    // 教学班组成
    jxbzc: string;
    // 学年名称，选择组件显示的学年名称，接口请求使用`njmc`，对应关系查看`global.ts`
    xnmc: string;
    // 场地简称
    cdjc: string;
    // 姓名
    xm: string;
    // 似乎也是学年值
    xnm: string;
    // 校区名称
    xqmc: string;
    // 教师信息，前面的数字疑似入职年份和序号。
    jsxx: string;
    // 学期（名名称？），学期组件显示的值，接口请求使用`xqm`，对应关系查看`global.ts`
    xqmmc: string;
    // 行id，值似乎就是在表格中的行号
    row_id: number;
    // 教学地点
    jxdd: string;
}

// 考试名称数据接口
export interface ExamName {
    //
    KSXS: string;
    //
    PKSJSFYXYXSSKCT: string;
    // 可能是考试ID，用在查询详情的请求参数
    KSMCDMB_ID: string;
    // 考试名称
    KSMC: string;
    //
    SFKCFPKC: string;
    //
    SFBKBJ: string;
}

// 考试信息查询返回结果数据类型
export interface ExamInfoQueryRes extends QueryResRoot {
    // 考试信息列表
    items: ExamInfo[]
}
