import { useState } from "react";
import { Stack, TextField, Button, Typography } from "@mui/material";

const AddUnit = ({ addUnit, units }) => {
	const [unit, setUnit] = useState("");

	return (
		<Stack
			sx={{ width: "100%", mt: 3 }}
			component="form"
			onSubmit={(e) => {
				e.preventDefault();
				addUnit(unit.trim());
				setUnit("");
			}}
		>
			<Typography variant="h5" sx={{ mb: 2 }}>
				Pridat Lekci
			</Typography>
			<TextField
				variant="outlined"
				label="Unit"
				value={unit}
				onChange={(e) => setUnit(e.target.value)}
				sx={{ mb: 2 }}
				error={units.includes(unit)}
				helperText={
					units.includes(unit) ? "Tato lekce jiz existuje" : null
				}
			/>
			{!units.includes(unit) && unit.trim() !== "" && (
				<Button type="submit" variant="contained" color="primary">
					Pridat
				</Button>
			)}
		</Stack>
	);
};

export default AddUnit;
