import { Typography, Button } from "@mui/material";

const ExamResult = ({ answers, percentage, playAgain, exit }) => {
	return (
		<>
			<Typography variant="h5">Well done</Typography>
			<Typography>
				Your success rate is{" "}
				{percentage}%
			</Typography>
			<Button variant="contained" onClick={playAgain} sx={{ mb: 2 }}>
				Play Again
			</Button>
			<Button variant="outlined" onClick={exit}>
				Exit
            </Button>
		</>
	);
};

export default ExamResult;
