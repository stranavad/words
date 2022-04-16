import { useState, useEffect } from "react";
import axios from "axios";
import { PATH } from "../config";
// UI
import UnitSelect from "../components/UnitSelect";
import Answers from "../components/learning/Answers";
import {
	Stack,
	Typography,
	Divider,
	Button,
	Fade,
	Slide,
	CircularProgress,
} from "@mui/material";
import { Check, Clear } from "@mui/icons-material";

export const AllAnswered = ({playAgain}) => <>
    <Typography>You've successfully passed the unpassable</Typography>
    <Check color="success" sx={{ fontSize: 60 }} />
    <Button variant="contained" onClick={playAgain}>Play again</Button>
</>

const Learning = ({ alert, unitsProp }) => {
	const [units, setUnits] = useState(unitsProp);
	const [answered, setAnswered] = useState([]);
	const [activeUnit, setActiveUnit] = useState([]);
	const [newWord, setNewWord] = useState({});
	const [answers, setAnswers] = useState([]);
	const [showQuestion, setShowQuestion] = useState(false);
	const [showOverlay, setShowOverlay] = useState(true);
    const [overlay, setOverlay] = useState(<CircularProgress color="primary" />);
    
    // initial word
    useEffect(() => {
        // get updated units for unitSelect
        axios.get(`${PATH}units`).then((res) => {
            setUnits(res.data.units);
        });
        getNewWord();
    }, []);

    //
    const playAgain = () => {
        setAnswered(() => []);
        setOverlay(<CircularProgress color="primary" />)
        setTimeout(() => getNewWord(), 100);
    }

	// get new word
	const getNewWord = () => {
		axios
			.post(`${PATH}learning`, {
				units: activeUnit.map((u) => u.id),
				words: [...answered, newWord.id || 0],
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
                    setOverlay(<AllAnswered playAgain={playAgain}/>);
                }
				
			});
	};

	const selectAnswer = (answer) => {
        setOverlay(<CircularProgress color="primary"/>);
        setShowQuestion(false);
        setShowOverlay(true);
		axios
			.post(`${PATH}learning/correct`, { id: newWord.id, answer })
			.then((res) => {
				setOverlay(
					res.data.correct ? (
						<Check color="success" sx={{ fontSize: 60 }} />
					) : (
						<Clear color="error" sx={{ fontSize: 60 }} />
					)
                );
                // user is correct
                if (res.data.correct) {
                    setAnswered((a) => [...a, newWord.id]);
                    getNewWord();
                } else {
                    // user is not correct
                    setTimeout(() => {
						setShowOverlay(false);
						setShowQuestion(true);
					}, 700);
                }
            });
	};
	return (
		<Stack sx={{ maxWidth: 400, width: "100%" }}>
			<UnitSelect
				units={units}
				activeUnit={activeUnit}
				setActiveUnit={setActiveUnit}
			/>
			<Button onClick={getNewWord}>get new word</Button>
			<Fade in={showQuestion}>
				<Stack>
					<Typography
						variant="h6"
						sx={{ fontWeight: "medium" }}
						align="center"
					>
						{newWord.cz}
					</Typography>
					<Divider sx={{ mb: 2, mt: 2 }} />
					<Answers words={answers} selectAnswer={selectAnswer} />
				</Stack>
			</Fade>
            <Slide in={showOverlay} direction="up">
                <Stack alignItems="center">
                    {overlay}
                </Stack>
			</Slide>
		</Stack>
	);
};

export default Learning;

export async function getStaticProps() {
	const res = await axios.get(`${PATH}units`);
	const { data } = await res;
	return {
		props: {
			unitsProp: data.units,
		},
		revalidate: 60,
	};
}
