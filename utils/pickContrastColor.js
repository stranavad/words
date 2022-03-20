export const pickContrastColor = (bgColor) => {
	// returns - true is dark text, false is light text
	let colors;
	if (bgColor.includes("rgb")) {
		colors = rgbFormatter(bgColor);
	} else if (bgColor.includes("#")) {
		colors = hexFormatter(bgColor);
	} else if (bgColor.includes("hsl")) {
		colors = hslFormatter(bgColor);
	} else {
		return false;
	}

	colors = colors.map((c, i) => {
		if (i < 3) {
			if (c <= 0.03928) {
				return c / 12.92;
			}
			return Math.pow((c + 0.055) / 1.055, 2.4);
		}
		return c;
	});

	const luminance =
		0.2126 * colors[0] + 0.7152 * colors[1] + 0.0722 * colors[2];

	if (colors[3] < 0.5 || luminance > 0.45) {
		// alpha is low or the color is light
		return true;
	}
	return false;
};

const rgbFormatter = (rgbOld)=> {
	// Alpha is 0.0 - 1.0
	const rgbArray = rgbOld
		.split("(")[1]
		.split(")")[0]
		.split(",")
		.map((c, i) => (i < 3 ? parseInt(c, 10) / 255 : parseFloat(c)));
	return rgbArray.length === 4 ? rgbArray : [...rgbArray, 1];
};

const hexFormatter = (hex) => {
	// Alpha is 00 - ff
	const hexWithoutTag = hex.substring(1, 9);
	const hexArray = hexWithoutTag.split(/(..)/g).filter((s) => s);
	hexArray.length === 3 && hexArray.push("FF");
	return hexArray.map((c) => parseInt(c, 16) / 255);
};

const hslFormatter = (hsl) => {
	// expecting hsl(0-1,0-1,0-1,*0-1) | hsl(0-360,0-100,0-100,*0-1)
	hsl.replace("%", "");
	const hslArray = hsl
		.split("(")[1]
		.split(")")[0]
		.split(",")
		.map((c) => parseFloat(c));
	hslArray.length === 3 && hslArray.push(1);
	const a = hslArray[3];

	// second expected option check
	const h = hslArray[0] > 1 ? hslArray[0] / 360 : hslArray[0];
	const s = hslArray[1] > 1 ? hslArray[1] / 100 : hslArray[1];
	const l = hslArray[2] > 1 ? hslArray[2] / 100 : hslArray[2];

	if (s === 0) {
		return [l, l, l, a]; // achromatic
	}
	const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
	const p = 2 * l - q;
	const r = hueToRgb(p, q, h + 1 / 3);
	const g = hueToRgb(p, q, h);
	const b = hueToRgb(p, q, h - 1 / 3);

	return [r, g, b, a];
};

const hueToRgb = (p, q, t) => {
	t += t < 0 ? 1 : 0;
	t -= t > 1 ? 1 : 0;
	if (t < 1 / 6) {
		return p + (q - p) * 6 * t;
	}
	if (t < 1 / 2) {
		return q;
	}
	if (t < 2 / 3) {
		return p + (q - p) * (2 / 3 - t) * 6;
	}
	return p;
};
