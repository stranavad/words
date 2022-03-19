import { useState, useEffect } from "react";
import { Chip, Stack } from "@mui/material";
import { CirclePicker } from "react-color";
import { pickContrastColor } from "../utils/pickContrastColor.ts";

const PickColor = ({ color, setColor}) => {
	const [open, setOpen] = useState(false);
	const [textColor, setTextColor] = useState("white");

	useEffect(
		() => setTextColor(pickContrastColor(color) ? "black" : "white"),
		[color]
	);
	return (
		<Stack sx={{mb: 2}} alignItems="center">
			<Chip
				sx={{ backgroundColor: color, color: textColor, mb: 2, mt: 2 }}
				onClick={() => setOpen((o) => !o)}
				label="Klikni pro vyber barvy"
			/>
			{open && (
				<CirclePicker
					color={color}
                    onChange={({ hex }) => setColor(hex)}
				/>
			)}
		</Stack>
	);
};

export default PickColor;
