import { useState, useEffect } from "react";
import {
	Stack,
	TextField,
	Button,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Typography,
} from "@mui/material";
import axios from "axios";
import { PATH } from '../config';

const AddWord = ({ addWord, units }) => {
	const [cz, setCz] = useState("");
	const [en, setEn] = useState("");
	const [unit, setUnit] = useState({});
	// utils
	const [showCreate, setShowCreate] = useState(false);
	// errors
	const [czExists, setCzExists] = useState(false);
	const [enExists, setEnExists] = useState(false);

	const clear = () => {
		setCz("");
		setEn("");
		setUnit({});
		setCzExists(false);
		setEnExists(false);
		setShowCreate(false);
	};

	// check if word is in unit
	useEffect(() => {
		if (unit) {
			axios
				.get(`${PATH}units/words`, {
					params: { cz, en, unit: unit.id },
				})
				.then(({ data: { czExists: czRes, enExists: enRes } }) => {
					setCzExists(czRes);
					setEnExists(enRes);
				});
		}
	}, [unit, cz, en]);

	// set show submit button
	useEffect(() => {
		if (czExists || enExists || cz.trim() === "" || en.trim() === "" || unit === {} ) {
			setShowCreate(false);
		} else {
			setShowCreate(true);
		}
	}, [czExists, enExists, cz, en, unit]);

	return (
		<Stack
			sx={{ width: "100%" }}
			component="form"
			onSubmit={(e) => {
				e.preventDefault();
				showCreate && addWord({ cz, en, unit: unit.id });
				showCreate && clear();
			}}
		>
			<Typography variant="h5" sx={{ mb: 2 }}>
				Add Word
			</Typography>
			<TextField
				variant="outlined"
				label="Cz"
				value={cz}
				onChange={(e) => setCz(e.target.value)}
				sx={{ mb: 2 }}
				error={czExists}
				helperText={czExists ? "Jiz existuje v teto lekci" : null}
			/>
			<TextField
				variant="outlined"
				label="En"
				value={en}
				onChange={(e) => setEn(e.target.value)}
				sx={{ mb: 2 }}
				error={enExists}
				helperText={enExists ? "Jiz existuje v teto lekci" : null}
			/>
			<FormControl fullWidth sx={{ mb: 2 }}>
				<InputLabel id="demo-simple-select-label">Unit</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={unit}
					label="Age"
					onChange={(e) => setUnit(e.target.value)}
				>
					{units.map((unit) => (
						<MenuItem key={unit.id} value={unit}>
							{unit.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			{showCreate && (
				<Button type="submit" variant="contained" color="primary">
					Pridat
				</Button>
			)}
		</Stack>
	);
};

export default AddWord;
