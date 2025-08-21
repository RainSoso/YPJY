/**
 * ECharts工具函数
 * 用于处理ECharts图表的适配和通用配置
 */

/**
 * 根据当前屏幕宽度动态计算字体大小
 * @param rem - 基准rem值
 * @returns 计算后的像素值
 * 
 * 示例：
 * setFontSize(0.75) -> 在1920px宽度的屏幕上返回12px
 * setFontSize(1) -> 在1920px宽度的屏幕上返回16px
 */
export const setFontSize = (rem: number): number => {
    const clientWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;

    if (!clientWidth) return 16 * rem; // 提供默认值防止返回undefined

    // 基于1920px作为标准屏幕宽度计算字体大小
    const fontSize = 16 * (clientWidth / 1920);
    return rem * fontSize;
};

