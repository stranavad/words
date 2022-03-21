import { Alert, Box, Slide } from "@mui/material";

const AlertBar = ({ show, setShow, text, severity }) => {
	return (
		<Box
			sx={{
				position: "fixed",
				left: "auto",
				top: "15px",
				right: "auto",
				maxWidth: "400px",
				width: "100%",
			}}
		>
			<Slide direction="down" in={show}>
				<Alert
					severity={severity}
					onClose={() => setShow(false)}
					variant="filled"
					sx={{ mb: 2, opacity: 1 }}
				>
					{text}
				</Alert>
			</Slide>
		</Box>
	);
};

export default AlertBar;
