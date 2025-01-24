export enum BaseColor {
    "black" = "#000000",
    "silver" = "#c0c0c0",
    "gray" = "#808080",
    "white" = "#ffffff",
    "maroon" = "#800000",
    "red" = "#ff0000",
    "purple" = "#800080",
    "fuchsia" = "#ff00ff",
    "green" = "#008000",
    "lime" = "#00ff00",
    "olive" = "#808000",
    "yellow" = "#ffff00",
    "navy" = "#000080",
    "blue" = "#0000ff",
    "teal" = "#008080",
    "aqua" = "#00ffff",
    "aliceblue" = "#f0f8ff",
    "antiquewhite" = "#faebd7",
    "aquamarine" = "#7fffd4",
    "azure" = "#f0ffff",
    "beige" = "#f5f5dc",
    "bisque" = "#ffe4c4",
    "blanchedalmond" = "#ffebcd",
    "blueviolet" = "#8a2be2",
    "brown" = "#a52a2a",
    "burlywood" = "#deb887",
    "cadetblue" = "#5f9ea0",
    "chartreuse" = "#7fff00",
    "chocolate" = "#d2691e",
    "coral" = "#ff7f50",
    "cornflowerblue" = "#6495ed",
    "cornsilk" = "#fff8dc",
    "crimson" = "#dc143c",
    "darkblue" = "#00008b",
    "darkcyan" = "#008b8b",
    "darkgoldenrod" = "#b8860b",
    "darkgray" = "#a9a9a9",
    "darkgreen" = "#006400",
    "darkgrey" = "#a9a9a9",
    "darkkhaki" = "#bdb76b",
    "darkmagenta" = "#8b008b",
    "darkolivegreen" = "#556b2f",
    "darkorange" = "#ff8c00",
    "darkorchid" = "#9932cc",
    "darkred" = "#8b0000",
    "darksalmon" = "#e9967a",
    "darkseagreen" = "#8fbc8f",
    "darkslateblue" = "#483d8b",
    "darkslategray" = "#2f4f4f",
    "darkslategrey" = "#2f4f4f",
    "darkturquoise" = "#00ced1",
    "darkviolet" = "#9400d3",
    "deeppink" = "#ff1493",
    "deepskyblue" = "#00bfff",
    "dimgray" = "#696969",
    "dimgrey" = "#696969",
    "dodgerblue" = "#1e90ff",
    "firebrick" = "#b22222",
    "floralwhite" = "#fffaf0",
    "forestgreen" = "#228b22",
    "gainsboro" = "#dcdcdc",
    "ghostwhite" = "#f8f8ff",
    "gold" = "#ffd700",
    "goldenrod" = "#daa520",
    "greenyellow" = "#adff2f",
    "honeydew" = "#f0fff0",
    "hotpink" = "#ff69b4",
    "indianred" = "#cd5c5c",
    "indigo" = "#4b0082",
    "ivory" = "#fffff0",
    "khaki" = "#f0e68c",
    "lavender" = "#e6e6fa",
    "lavenderblush" = "#fff0f5",
    "lawngreen" = "#7cfc00",
    "lemonchiffon" = "#fffacd",
    "lightblue" = "#add8e6",
    "lightcoral" = "#f08080",
    "lightcyan" = "#e0ffff",
    "lightgoldenrodyellow" = "#fafad2",
    "lightgray" = "#d3d3d3",
    "lightgreen" = "#90ee90",
    "lightgrey" = "#d3d3d3",
    "lightpink" = "#ffb6c1",
    "lightsalmon" = "#ffa07a",
    "lightseagreen" = "#20b2aa",
    "lightskyblue" = "#87cefa",
    "lightslategray" = "#778899",
    "lightslategrey" = "#778899",
    "lightsteelblue" = "#b0c4de",
    "lightyellow" = "#ffffe0",
    "limegreen" = "#32cd32",
    "linen" = "#faf0e6",
    "mediumaquamarine" = "#66cdaa",
    "mediumblue" = "#0000cd",
    "mediumorchid" = "#ba55d3",
    "mediumpurple" = "#9370db",
    "mediumseagreen" = "#3cb371",
    "mediumslateblue" = "#7b68ee",
    "mediumspringgreen" = "#00fa9a",
    "mediumturquoise" = "#48d1cc",
    "mediumvioletred" = "#c71585",
    "midnightblue" = "#191970",
    "mintcream" = "#f5fffa",
    "mistyrose" = "#ffe4e1",
    "moccasin" = "#ffe4b5",
    "navajowhite" = "#ffdead",
    "oldlace" = "#fdf5e6",
    "olivedrab" = "#6b8e23",
    "orange" = "#ffa500",
    "orangered" = "#ff4500",
    "orchid" = "#da70d6",
    "palegoldenrod" = "#eee8aa",
    "palegreen" = "#98fb98",
    "paleturquoise" = "#afeeee",
    "palevioletred" = "#db7093",
    "papayawhip" = "#ffefd5",
    "peachpuff" = "#ffdab9",
    "peru" = "#cd853f",
    "pink" = "#ffc0cb",
    "plum" = "#dda0dd",
    "powderblue" = "#b0e0e6",
    "rebeccapurple" = "#663399",
    "rosybrown" = "#bc8f8f",
    "royalblue" = "#4169e1",
    "saddlebrown" = "#8b4513",
    "salmon" = "#fa8072",
    "sandybrown" = "#f4a460",
    "seagreen" = "#2e8b57",
    "seashell" = "#fff5ee",
    "sienna" = "#a0522d",
    "skyblue" = "#87ceeb",
    "slateblue" = "#6a5acd",
    "slategray" = "#708090",
    "slategrey" = "#708090",
    "snow" = "#fffafa",
    "springgreen" = "#00ff7f",
    "steelblue" = "#4682b4",
    "tan" = "#d2b48c",
    "thistle" = "#d8bfd8",
    "tomato" = "#ff6347",
    "transparent" = "rgba(0, 0, 0, 0)",
    "turquoise" = "#40e0d0",
    "violet" = "#ee82ee",
    "wheat" = "#f5deb3",
    "whitesmoke" = "#f5f5f5",
    "yellowgreen" = "#9acd32"
}

export class Color {
    public hex: string;
    public rgba: number[];

    constructor(...args) {
        if (args.length === 1 && BaseColor[args[0]]) {
            // 转换基础色名称
            args[0] = BaseColor[args[0]];
        }
        if (args.length === 1 && typeof args[0] === 'string') {
            // 转换 hex 颜色
            if (!args[0].startsWith('#')) args[0] = '#' + args[0];
            this.hex = args[0];
            if (this.hex.length === 7) {
                // #RRGGBB
                const r = parseInt(this.hex.slice(1, 3), 16);
                const g = parseInt(this.hex.slice(3, 5), 16);
                const b = parseInt(this.hex.slice(5, 7), 16);
                this.rgba = [r, g, b, 1];
            }
            if (this.hex.length === 9) {
                // #RRGGBBAA
                this.rgba[3] = parseInt(this.hex.slice(7, 9), 16) / 255;
            }
        } else if (args.length === 3
            && typeof args[0] === 'number'
            && typeof args[1] === 'number'
            && typeof args[2] === 'number') {
            // 转换 RGB 颜色
            this.hex = '#' + args.map(v => Math.round(v).toString(16).padStart(2, '0')).join('');
            this.rgba = [args[0], args[1], args[2], 1];
        } else if (args.length === 4
            && typeof args[0] === 'number'
            && typeof args[1] === 'number'
            && typeof args[2] === 'number'
            && typeof args[3] === 'number') {
            // 转换 RGBA 颜色
            this.hex = '#' + args.map(v => Math.round(v).toString(16).padStart(2, '0')).join('');
            this.rgba = [args[0], args[1], args[2], args[3]];
        } else {
            throw new Error('Invalid arguments');
        }
    }

    public setAlpha(alpha: number): Color {
        this.rgba[3] = alpha;
        return this;
    }

    public hexString(alpha = false): string {
        if (alpha) {
            return this.hex + Math.round(this.rgba[3] * 255).toString(16).padStart(2, '0');
        } else return this.hex;
    }

    public get rgbString(): string {
        return `rgb(${this.rgba.slice(0, 3).join(', ')})`;
    }

    public get rgbaArray(): number[] {
        return this.rgba;
    }

    public get rgbaString(): string {
        return `rgba(${this.rgba.join(', ')})`;
    }

    public get hslaArray(): number[] {
        const [r, g, b, a] = this.rgba;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const l = (max + min) / 2;
        let h = 0;
        let s = 0;
        if (max === min) {
            h = s = 0; // achromatic
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        return [h, s, l, a];
    }

    public get hslaString(): string {
        const [h, s, l, a] = this.hslaArray;
        return `hsla(${h * 360}, ${s * 100}%, ${l * 100}%, ${a})`;
    }

    public get luminance(): number {
        return this.hslaArray[2];
    }
}

function mix(color1: Color, color2: Color, ratio: number) {
    const r = (1 - ratio) * color1.rgba[0] + ratio * color2.rgba[0];
    const g = (1 - ratio) * color1.rgba[1] + ratio * color2.rgba[1];
    const b = (1 - ratio) * color1.rgba[2] + ratio * color2.rgba[2];
    const a = (1 - ratio) * color1.rgba[3] + ratio * color2.rgba[3];
    return new Color(r, g, b, a);
}

export const color = {
    mix
};
