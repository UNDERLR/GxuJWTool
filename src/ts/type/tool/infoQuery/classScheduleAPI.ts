import {QueryResRoot} from "@/ts/type/global";
import {Course, OtherCourse} from "@/ts/type/tool/infoQuery/course";

export interface ClassScheduleQueryRes extends QueryResRoot {
    // 课程标记对应表
    xsbjList: Array<any>;
    // 其他课程，不显示在课表上的
    sjkList: OtherCourse[];
    // 课表上的所有课程
    kbList: Course[];
}
