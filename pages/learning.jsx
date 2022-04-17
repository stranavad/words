import { useState, useEffect } from "react";
import axios from "axios";
import { PATH } from "../config";
// UI
import { Stack } from "@mui/material";
import LearningIntroduction from "../components/learning/LearningIntroduction";
import Learning from "../components/learning/Learning";

const Index = () => {
	// utils
	const [units, setUnits] = useState([]);
	const [activeUnit, setActiveUnit] = useState([]);
	const [wordsCount, setWordsCount] = useState(0);
	const [learning, setLearning] = useState(false);

	useEffect(() => {
		// get updated units for unitSelect
		axios.get(`${PATH}units`).then((res) => {
			setUnits(res.data.units);
		});
	}, []);

	const exit = () => {
		setActiveUnit([]);
		setWordsCount(0);
		setLearning(false);
	};

	// start game - from LearningIntroduction
	const startGame = (selectedUnits, count) => {
		setActiveUnit(selectedUnits);
		setWordsCount(count);
		setLearning(true);
	};

	return (
		<Stack sx={{ maxWidth: 400, width: "100%" }}>
			{!learning ? (
				<Stack alignItems="center">
					<LearningIntroduction startGame={startGame} units={units} />
				</Stack>
			) : (
				<Learning
					activeUnit={activeUnit.map((au) => au.id)}
					wordsCount={wordsCount}
					exit={exit}
				/>
			)}
		</Stack>
	);
};

export default Index;
