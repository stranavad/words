import { useState, useEffect } from "react";
import axios from "axios";
import { PATH } from "../../config";
// UI
import Answers from "./Answers";
import Results from "./Results";
import ProgressBar from './ProgressBar';
import {
	Stack,
	Typography,
	Divider,
	Fade,
	Slide,
	CircularProgress,
} from "@mui/material";
import { Check, Clear } from "@mui/icons-material";

const Learning = ({ activeUnit, wordsCount, exit, language }) => {
	// Utils
	const [answered, setAnswered] = useState([]);
	const [newWord, setNewWord] = useState({});
	const [answers, setAnswers] = useState([]);
	// UI
	const [showQuestion, setShowQuestion] = useState(false);
	const [showOverlay, setShowOverlay] = useState(true);
	const [overlay, setOverlay] = useState(<CircularProgress />);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => getNewWord(), [answered]);

	// get new word and set it, end if no words left
	const getNewWord = () => {
		axios
			.post(`${PATH}learning`, {
				units: activeUnit,
				words: answered,
				language
			})
			.then((res) => {
				if (res.data?.message === "word") {
					setAnswers(res.data.guessWords);
					setNewWord(res.data.word);
					setTimeout(() => {
						setShowOverlay(false);
						setShowQuestion(true);
					}, 500);
				} else {
					setOverlay(<Results playAgain={playAgain} exit={exit} />);
				}
			});
	};

	// send request with answer, show overlay
	const selectAnswer = (answer) => {
		setOverlay(<CircularProgress />);
		setShowQuestion(false);
		setShowOverlay(true);
		axios
			.post(`${PATH}learning/correct`, { id: newWord.id, answer, language })
			.then((res) => {
				// user is correct
				if (res.data.correct) {
					setOverlay(<Check color="success" sx={{ fontSize: 60 }} />);
					setAnswered((a) => [...a, newWord.id]);
				} else {
					// user is not correct
					setOverlay(<Clear color="error" sx={{ fontSize: 60 }} />);
					setTimeout(() => {
						setShowOverlay(false);
						setShowQuestion(true);
					}, 700);
				}
			});
	};

	const playAgain = () => {
		setAnswered([]);
		setNewWord({});
		setOverlay(<CircularProgress color="primary" />);
	};

	return (
		<>
			<Fade in={showQuestion}>
				<Stack>
					<Typography
						variant="h6"
						sx={{ fontWeight: "medium" }}
						align="center"
					>
						{newWord.word}
					</Typography>
					<Divider sx={{ mb: 2, mt: 2 }} />
					<Answers words={answers} selectAnswer={selectAnswer} />
					<ProgressBar
						answered={answered.length}
						totalCount={wordsCount}
					/>
				</Stack>
			</Fade>
			<Slide in={showOverlay} direction="up">
				<Stack alignItems="center">{overlay}</Stack>
			</Slide>
		</>
	);
};

export default Learning;
