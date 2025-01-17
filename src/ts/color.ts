export class Color {
    public hex: string;
    public rgba: number[];

    constructor(...args) {
        if (args.length === 1 && typeof args[0] === 'string') {
            if (!args[0].startsWith('#')) args[0] = '#' + args[0];
            this.hex = args[0];
            if (this.hex.length === 7) {
                const r = parseInt(this.hex.slice(1, 3), 16);
                const g = parseInt(this.hex.slice(3, 5), 16);
                const b = parseInt(this.hex.slice(5, 7), 16);
                this.rgba = [r, g, b, 1];
            }
            if (this.hex.length === 9) {
                this.rgba[3] = parseInt(this.hex.slice(7, 9), 16) / 255;
            }
        } else if (args.length === 3
            && typeof args[0] === 'number'
            && typeof args[1] === 'number'
            && typeof args[2] === 'number') {
            this.hex = '#' + args.map(v => Math.round(v).toString(16).padStart(2, '0')).join('');
            this.rgba = [args[0], args[1], args[2], 1];
        } else if (args.length === 4
            && typeof args[0] === 'number'
            && typeof args[1] === 'number'
            && typeof args[2] === 'number'
            && typeof args[3] === 'number') {
            this.hex = '#' + args.map(v => Math.round(v).toString(16).padStart(2, '0')).join('');
            this.rgba = [args[0], args[1], args[2], args[3]];
        } else {
            throw new Error('Invalid arguments');
        }
    }

    public get hexString(): string {
        return this.hex;
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
            s = l > 0.5? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
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
