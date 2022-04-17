import { useState, useEffect } from "react";
import axios from "axios";
import { PATH } from "../../config";
// UI
import UnitSelect from "../UnitSelect";
import ButtonHome from '../ButtonHome';
import {
	Typography,
	Divider,
	Button,
} from "@mui/material";

const LearningIntroduction = ({ startGame, units }) => {
	const [activeUnit, setActiveUnit] = useState([]);
	const [wordCount, setWordCount] = useState(0);

	useEffect(() => {
		// get words count
		axios
			.post(`${PATH}learning/count`, {
				units: activeUnit.map((au) => au.id),
			})
			.then((res) => setWordCount(res.data.count));
    }, [activeUnit]);
    
	return (
		<>
			<ButtonHome/>
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
			{activeUnit.length > 0 && (
				<Button
					variant="contained"
					onClick={() => startGame(activeUnit, wordCount)}
				>
					Start learning!
				</Button>
			)}
		</>
	);
};

export default LearningIntroduction;
