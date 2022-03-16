import { useState } from "react";
import Link from 'next/link';
import {
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	OutlinedInput,
	Chip,
	Box,
	Button
} from "@mui/material";

const UnitSelect = ({ units, activeUnit, setActiveUnit }) => {
	const [open, setOpen] = useState(false);
	return (
		<FormControl sx={{ m: 1, width: "70%" }}>
			<InputLabel id="chip">Unit</InputLabel>
			<Select
				labelId="chip"
				open={open}
				multiple
				value={activeUnit}
				onChange={({ target: { value } }) =>
					setActiveUnit(
						typeof value === "string" ? value.split(",") : value
					)
				}
				onClick={() => setOpen((op) => !op)}
				input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
				renderValue={(selected) => (
					<Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
						{selected.map((value) => (
							<Chip key={value} label={value} color="primary" />
						))}
					</Box>
				)}
				// MenuProps={MenuProps}
			>
				{/* <> */}
					{units.map((name) => (
						<MenuItem key={name} value={name}>
							{name}
						</MenuItem>
					))}
					{/* <Link href='/units' passHref>
						<Button>Units</Button>
					</Link> */}
				{/* </> */}
			</Select>
		</FormControl>
	);
};

export default UnitSelect;
