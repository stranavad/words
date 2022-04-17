/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Link from "next/link";
import {
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	OutlinedInput,
	Chip,
	Box,
	Button,
} from "@mui/material";
import { pickContrastColor } from "../utils/pickContrastColor.js";

const UnitSelect = ({ units, activeUnit, setActiveUnit, fullWidth }) => {
	const [open, setOpen] = useState(false);

	return (
		<FormControl sx={{ m: 1, width: fullWidth ? '100%' : '70%' }}>
			<InputLabel id="chip">Unit</InputLabel>
			<Select
				labelId="chip"
				open={open}
				multiple
				value={activeUnit}
				onChange={({ target: { value } }) => setActiveUnit(value)}
				onClick={() => setOpen((op) => !op)}
				input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
				renderValue={(selected) => (
					<Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
						{selected.map((value) => (
							<Chip
								key={value.id}
								label={value.name}
								sx={{
									backgroundColor: value.color,
									color: pickContrastColor(value.color)
										? "black"
										: "white",
								}}
							/>
						))}
					</Box>
				)}
			>
				{units.map((unit) => (
					<MenuItem key={unit.id} value={unit}>
						{unit.name}
					</MenuItem>
				))}
				<Link href="/units" passHref>
					<Button>Units</Button>
				</Link>
			</Select>
		</FormControl>
	);
};

export default UnitSelect;
