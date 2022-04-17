import { Typography, Button } from "@mui/material";
import { Check } from "@mui/icons-material";

const Results = ({ playAgain, exit }) => {
	return (
		<>
			<Typography variant="h5">Well done, now let&apos;s write that exam!</Typography>
            <Check color="success" sx={{ fontSize: 60, mb: 4 }} />
            <Button variant="contained" onClick={playAgain} sx={{mb: 2}}>Play Again</Button>
            <Button variant="outlined" onClick={exit}>Exit</Button>
		</>
	);
};

export default Results;