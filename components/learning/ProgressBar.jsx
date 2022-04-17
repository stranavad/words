import { Box } from "@mui/material";

const ProgressBar = ({ answered, totalCount }) => {
	return (
		<Box
			sx={{
				width: 400,
				m: 0,
				p: 0,
				height: 5,
				backgroundColor: "#c4181577",
				mt: 4,
			}}
		>
			<Box
				sx={{
					width: `${(answered / totalCount) * 100}%`,
					backgroundColor: "green",
					height: 5,
				}}
			></Box>
		</Box>
	);
};

export default ProgressBar;
