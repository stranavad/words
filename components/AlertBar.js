import { Alert, Box, Slide } from "@mui/material";

const AlertBar = ({ show, setShow, text, severity }) => {
	return (
		<Box
			sx={{
				position: "fixed",
				left: "auto",
				right: "auto",
				maxWidth: "400px",
				width: "100%",
			}}
		>
			{show && (
				<Slide direction="down" in={show}>
					<Alert
						severity={severity}
						onClose={() => setShow(false)}
						sx={{ mb: 2}}
					>
						{text}
					</Alert>
				</Slide>
			)}
		</Box>
	);
};

export default AlertBar;
