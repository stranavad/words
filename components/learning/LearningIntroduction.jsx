import { useState, useEffect } from "react";
import axios from "axios";
import { PATH } from "../../config";
// UI
import UnitSelect from "../UnitSelect";
import ButtonHome from "../ButtonHome";
import TogglePrimary from "../TogglePrimary";
import { Typography, Divider, Button } from "@mui/material";

const LearningIntroduction = ({ startGame, units }) => {
	const [activeUnit, setActiveUnit] = useState([]);
	const [wordCount, setWordCount] = useState(0);
	const [language, setLanguage] = useState("en");

	useEffect(() => {
		// get words count
		axios
			.post(`${PATH}learning/count`, {
				units: activeUnit.map((au) => au.id),
			})
			.then((res) => setWordCount(res.data.count));
	}, [activeUnit]);

	const start = () => {
		startGame(activeUnit, wordCount, language);
	};

	return (
		<>
			<ButtonHome />
			{activeUnit.length === 0 && (
				<Typography variant="caption">
					You have to first select Unit
				</Typography>
			)}
			<UnitSelect
				units={units}
				activeUnit={activeUnit}
				setActiveUnit={setActiveUnit}
				fullWidth={true}
			/>
			<Divider sx={{ mb: 2, mt: 2 }} />
			<Typography variant="h4">
				{activeUnit.length > 0 ? wordCount : 0}
			</Typography>
			<Typography sx={{ mb: 4 }}>words</Typography>
			<Typography variant='caption'>Language you want to practice</Typography>
			<TogglePrimary primary={language} setPrimary={setLanguage} />
			{activeUnit.length > 0 && (
				<Button variant="contained" onClick={start} sx={{mt: 4}}>
					Start learning!
				</Button>
			)}
		</>
	);
};

export default LearningIntroduction;
