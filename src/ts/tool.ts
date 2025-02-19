import {ElMessage} from "element-plus";

/**
 * 复制文本到剪贴板
 * @param {string} text 要复制的文本
 */
function copy(text: string) {
   navigator.clipboard.writeText(text).then(() => {
       ElMessage.success({
           message: "复制成功"
       });
   });
}

/**
 * 判断值是否在指定范围内，包含最小值和最大值
 * @param value 要判断的值
 * @param min 最小值
 * @param max 最大值
 * @returns {boolean} 值是否在指定范围内
 */
function inRange(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
}

export const Tool = {
    copy,
    inRange
}
