import { useState, useEffect } from "react";
import axios from "axios";
import { PATH } from "../../config";
// UI
import Answers from "./Answers";
import ProgressBar from "./ProgressBar";
import ExamResult from "./ExamResult";
import {
	Stack,
	Typography,
	Divider,
	Fade,
	Slide,
	CircularProgress,
} from "@mui/material";
import { Check, Clear } from "@mui/icons-material";

const Exam = ({ activeUnit, wordsCount, exit, language }) => {
	// Utils
	const [answered, setAnswered] = useState([]);
	const [newWord, setNewWord] = useState({});
	const [answers, setAnswers] = useState([]);
	// UI
	const [showQuestion, setShowQuestion] = useState(false);
	const [overlay, setOverlay] = useState(<CircularProgress />);

	// get new word
	useEffect(() => {
		axios
			.post(`${PATH}learning`, {
				units: activeUnit,
				words: answered.map((aw) => aw.id),
				language,
			})
			.then((res) => {
				if (res.data?.message === "word") {
					!showQuestion && setShowQuestion(true); // after start
					setAnswers(res.data.guessWords);
					setNewWord(res.data.word);
				} else {
					endExam();
				}
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [answered]);

	// send request with answer, show overlay
	const selectAnswer = (answer) => {
		setAnswered((ans) => [...ans, { id: newWord.id, answer }]);
	};

	// check answers and end exam
	const endExam = () => {
		setOverlay(<CircularProgress />);
		setShowQuestion(false);
		axios
			.post(`${PATH}learning/exam`, {
				language,
				answers: answered,
			})
			.then((res) => {
				setOverlay(
					<ExamResult
						answers={res.data.answers}
						percentage={res.data.percentage}
						playAgain={playAgain}
						exit={exit}
					/>
				);
			});
	};

	const playAgain = () => {
		setAnswered([]);
		setNewWord({});
		setShowQuestion(false);
		setOverlay(<CircularProgress />);
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
			<Slide in={!showQuestion} direction="up">
				<Stack alignItems="center">{overlay}</Stack>
			</Slide>
		</>
	);
};
export default Exam;
