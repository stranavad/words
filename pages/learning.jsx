import { useState, useEffect } from "react";
import axios from "axios";
import { PATH } from "../config";
// UI
import { Stack } from "@mui/material";
import LearningIntroduction from "../components/learning/LearningIntroduction";
import Learning from "../components/learning/Learning";
import Exam from '../components/learning/Exam';

const Index = () => {
	// utils
	const [units, setUnits] = useState([]);
	const [activeUnit, setActiveUnit] = useState([]);
	const [wordsCount, setWordsCount] = useState(0);
	const [learning, setLearning] = useState(false);
	const [exam, setExam] = useState(false);
	const [language, setLanguage] = useState("en"); // language of answers

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
		setExam(false);
	};

	// start game - from LearningIntroduction
	const startGame = (selectedUnits, count, lang, mode) => {
		setActiveUnit(selectedUnits);
		setWordsCount(count);
		setLanguage(lang);
		mode === "learning" ? setLearning(true) : setExam(true);
	};

	return (
		<Stack sx={{ maxWidth: 400, width: "100%" }}>
			{!(learning || exam) ? (
				<Stack alignItems="center">
					<LearningIntroduction startGame={startGame} units={units} />
				</Stack>
			) : (
				<>
					{learning ? (
						<Learning
							activeUnit={activeUnit.map((au) => au.id)}
							wordsCount={wordsCount}
							language={language}
							exit={exit}
						/>
					) : (
						<Exam
							activeUnit={activeUnit.map((au) => au.id)}
							wordsCount={wordsCount}
							language={language}
							exit={exit}
						/>
					)}
				</>
			)}
		</Stack>
	);
};

export default Index;
