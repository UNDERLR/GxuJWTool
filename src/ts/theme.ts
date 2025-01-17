import {color, Color} from "@/ts/color";
import {css} from "@/ts/css";
import {useDark, useToggle} from "@vueuse/core";

export enum ThemeOption {
    primaryColor = "primaryColor",
    darkMode = "darkMode",
    appBackgroundColor = "appBackgroundColor",
    fontFamily = "fontFamily",
}

function setThemeOption(option: ThemeOption, value: any) {
    const options = JSON.parse(localStorage.getItem("theme") || "{}");
    options[option] = value;
    localStorage.setItem("theme", JSON.stringify(options));
}

function getThemeOption(option: string, defaultValue: any="") {
    const options = JSON.parse(localStorage.getItem("theme") || "{}");
    return options[option] || defaultValue;
}

function setPrimaryColor(v: Color) {
    const isLight = v.luminance / 255 > 0.5;
    const baseColor = getThemeOption("darkMode", false) ?
        new Color(getThemeOption(ThemeOption.appBackgroundColor, "#202020")) :
        new Color("#ffffff");
    css.setVar("color-scheme", isLight ? "light": "dark");

    for (let i = 1; i < 10; i++) {
        const index = i > 1 ? `-${i}` : "";
        const value = color.mix(v, baseColor, i * 0.1);
        css.setVar("--el-color-primary" + index, value.rgbaString);
        css.setVar("--el-color-primary-light" + index, value.rgbaString);
    }

    css.setVar("--el-color-primary-dark-2", color.mix(v, baseColor,  0.6).rgbaString);

    const headerColor = color.mix(v, new Color("#ffffff"), 0.45);
    css.setVar("--header-color", headerColor.rgbaString);
}

function setAppBackgroundColor(v: Color) {
    css.setVar("--app-background-color", v.hex);
    setThemeOption(ThemeOption.appBackgroundColor, v.hex);
}

function setDarkMode(v: boolean ) {
    const isDark = useDark()
    const toggleDark = useToggle(isDark);
    toggleDark(v);

    setAppBackgroundColor( v ? new Color("#202020"): new Color("#fff"));

    setThemeOption(ThemeOption.darkMode, v);
    setPrimaryColor(new Color(getThemeOption(ThemeOption.primaryColor, "#409eff")))
}

function setFontFamily(v: string) {
    css.setVar("--font-family", v);
    css.setVar("--el-font-family", v);
    setThemeOption(ThemeOption.fontFamily, v);
}

function initTheme() {
    const primaryColor = getThemeOption(ThemeOption.primaryColor, "#409eff");
    setPrimaryColor(new Color(primaryColor));

    const darkMode = getThemeOption("darkMode", window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDarkMode(darkMode);

    const defaultFontFamily = '"Helvetica Neue", Helvetica, Arial, sans-serif';
    setFontFamily(getThemeOption(ThemeOption.fontFamily, defaultFontFamily));
}

export const theme = {
    setThemeOption,
    getThemeOption,
    setPrimaryColor,
    setDarkMode,
    setFontFamily,
    initTheme
};
