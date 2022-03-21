import { useState } from "react";
import { Stack, TextField, Button, Typography } from "@mui/material";
import PickColor from "./PickColor";

const AddUnit = ({ addUnit, units }) => {
	const [unit, setUnit] = useState({ color: "#1976d2", name: "" });

	return (
		<Stack
			sx={{ width: "100%", mt: 3 }}
			component="form"
			onSubmit={(e) => {
				e.preventDefault();
				addUnit({
					name: unit.name.trim().replace('"', "'"),
					color: unit.color,
				});
				setUnit({ color: "#1976d2", name: "" });
			}}
		>
			<Typography variant="h5" sx={{ mb: 2 }}>
				Add Unit
			</Typography>
			<TextField
				variant="outlined"
				label="Unit"
				value={unit.name}
				onChange={(e) =>
					setUnit((u) => ({ ...u, name: e.target.value }))
				}
				sx={{ mb: 2 }}
				error={units.includes(unit.name)}
				helperText={
					units.includes(unit.name) ? "Tato lekce jiz existuje" : null
				}
			/>
			<PickColor
				color={unit.color}
				setColor={(c) => setUnit((u) => ({ ...u, color: c }))}
			/>
			{!units.includes(unit.name) && unit?.name?.trim() !== "" && (
				<Button type="submit" variant="contained" color="primary">
					Pridat
				</Button>
			)}
		</Stack>
	);
};

export default AddUnit;
