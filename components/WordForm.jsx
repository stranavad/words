/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import {
	Stack,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@mui/material";
import axios from "axios";
import { PATH } from "../config";

const WordForm = ({ word, setWord, units, setShowAdd, originalWord }) => {
	const [czExists, setCzExists] = useState(false);
	const [enExists, setEnExists] = useState(false);

	useEffect(() => {
		axios
			.get(`${PATH}units/id`, { params: { id: originalWord.unit } })
			.then((res) =>
				setWord((w) => ({
					...w,
					unit: units.find((u) => u.id === res.data.id),
				}))
			);
	}, []);

	useEffect(() => {
		if (
			word.unit &&
			word.cz.trim() !== "" &&
			word.en.trim() !== "" &&
			word.unit !== {}
		) {
			axios
				.get(`${PATH}units/words`, {
					params: { cz: word.cz, en: word.en, unit: word.unit.id },
				})
				.then(
					({
						data: { czExists: czRes, enExists: enRes, wordId },
					}) => {
						if (wordId === originalWord.id) {
							setShowAdd(true);
							setCzExists(false);
							setEnExists(false);
						} else {
							setShowAdd(!(czRes || enRes));
							setCzExists(czRes);
							setEnExists(enRes);
						}
					}
				);
		} else {
			setShowAdd(false);
		}
	}, [word]);

	return (
		<Stack>
			<TextField
				variant="outlined"
				label="Cz"
				value={word.cz}
				onChange={(e) => setWord((w) => ({ ...w, cz: e.target.value }))}
				sx={{ mb: 2 }}
				error={czExists}
				helperText={czExists ? "Jiz existuje v teto lekci" : null}
			/>
			<TextField
				variant="outlined"
				label="En"
				value={word.en}
				onChange={(e) => setWord((w) => ({ ...w, en: e.target.value }))}
				sx={{ mb: 2 }}
				error={enExists}
				helperText={enExists ? "Jiz existuje v teto lekci" : null}
			/>
			<FormControl fullWidth sx={{ mb: 2 }}>
				<InputLabel id="demo-simple-select-label">Unit</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={word.unit ? word.unit : units[0]}
					label="Age"
					onChange={(e) =>
						setWord((w) => ({ ...w, unit: e.target.value }))
					}
				>
					{units.map((unit) => (
						<MenuItem key={unit.id} value={unit}>
							{unit.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Stack>
	);
};

export default WordForm;
