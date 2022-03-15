import { Box, IconButton, Button, Container } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { CopyToClipboard } from "react-copy-to-clipboard";

const AdvancedMenu = ({ showGlobal, setShowGlobal, copyToClipboard }) => {
	return (
		<Box sx={{ width: "100%", maxWidth: 400 }}>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					paddingRight: "16px",
					paddingLeft: "8px",
				}}
			>
				<Container disableGutters={true}>
					<Button>Export</Button>
					<Button onClick={copyToClipboard}>Copy</Button>
				</Container>
				<IconButton onClick={() => setShowGlobal((s) => !s)}>
					{showGlobal ? (
						<VisibilityOff color="primary" />
					) : (
						<Visibility color="primary" />
					)}
				</IconButton>
			</Box>
		</Box>
	);
};

export default AdvancedMenu;