import { useState, useEffect } from "react";
import {
	ListItem,
	ListItemText,
	IconButton,
	Container,
	Popover,
	Button,
	Stack,
	Box
} from "@mui/material";
import {
	Visibility,
	VisibilityOff,
	VolumeUp,
	MoreVert,
	Delete,
} from "@mui/icons-material";

const Word = ({ word, deleteWord, showGlobal, speak, primary }) => {
	const [show, setShow] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;
	const hashedWord = word.secondary?.split("").map(() => "*");
	useEffect(() => setShow(showGlobal), [showGlobal]);
	return (
		<ListItem
			key={word.id}
			secondaryAction={
				<Container disableGutters={true}>
					{primary === "en" && (
						<IconButton
							onClick={() => speak(word.en)}
							color="secondary"
						>
							<VolumeUp />
						</IconButton>
					)}
					<IconButton
						aria-describedby={id}
						onClick={(e) => setAnchorEl(e.currentTarget)}
						color="primary"
					>
						<MoreVert />
					</IconButton>
					<Popover
						id={id}
						open={open}
						anchorEl={anchorEl}
						onClose={handleClose}
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "right",
						}}
						transformOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
					>
						<Stack sx={{ p: 1 }}>
							<Button
								variant="container"
								endIcon={<Delete color="error" />}
								onClick={() => deleteWord(word.id)}
							>
								Delete
							</Button>
						</Stack>
					</Popover>
				</Container>
			}
			sx={{ width: "100%" }}
		>
			<ListItemText
				onClick={() => setShow(old => !old)}
				primary={word.primary}
				secondary={show ? word.secondary : hashedWord}
				sx={{cursor: 'pointer'}}
			/>
		</ListItem>
	);

};

export default Word;
