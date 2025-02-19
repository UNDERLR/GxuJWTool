import {QueryResRoot} from "@/ts/type/global";
import {StudentEvaluationItem} from "@/ts/type/tool/eduEvaluation/studentEvaluation";

export interface StudentEvaluationQueryListAPIRes extends QueryResRoot{
    items: StudentEvaluationItem[];
}
