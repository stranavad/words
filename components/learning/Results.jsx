import { Typography, Button } from "@mui/material";
import { Check } from "@mui/icons-material";

const Results = ({ playAgain, exit, answered }) => {
	const mistakesValue = 0;
	answered
		.filter((w) => w.mistakes > 0)
		.map((word) => {
			mistakesValue += 1 - 0.5 / Math.pow(2, word.mistakes - 1);
		});
	return (
		<>
			<Typography variant="h5">
				Well done, now let&apos;s write that exam!
			</Typography>
			<Check color="success" sx={{ fontSize: 60, mb: 4 }} />
			<Typography>
				Your success rate is{" "}
				{((answered.length - mistakesValue) / answered.length) * 100}%
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

export default Results;
