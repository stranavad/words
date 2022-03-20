import { useState, useEffect } from "react";
import {
	ListItem,
	ListItemText,
	IconButton,
	Container,
	Popover,
	Button,
	Stack,
	TextField,
	Divider,
} from "@mui/material";
import {
	Edit,
	VolumeUp,
	MoreVert,
	Delete,
	Check,
	Close,
} from "@mui/icons-material";


const Word = ({ word, deleteWord, showGlobal, speak, primary, updateWord }) => {
	const [show, setShow] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const [showEdit, setShowEdit] = useState(false);
	const [updatedWord, setUpdatedWord] = useState({});

	useEffect(() => setUpdatedWord(word), [word]);

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;
	const hashedWord = word.secondary?.split("").map(() => "*");
	useEffect(() => setShow(showGlobal), [showGlobal]);
	return !showEdit ? (
		<>
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
							<Stack sx={{ p: 1 }} spacing={2}>
								<Button
									variant="container"
									endIcon={<Edit color="secondary" />}
									onClick={() => {
										setShowEdit(true);
										handleClose();
									}}
								>
									Edit
								</Button>
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
					onClick={() => setShow((old) => !old)}
					primary={word.primary}
					secondary={show ? word.secondary : hashedWord}
					// primaryTypographyProps={{color: 'green'}}
					sx={{ cursor: "pointer" }}
				/>
			</ListItem>
			<Divider />
		</>
	) : (
		<>
			<ListItem
				key={word.id}
				secondaryAction={
					<Container disableGutters={true}>
						{updatedWord.cz !== "" && updatedWord.en !== "" && (
							<IconButton
								color="success"
								onClick={() => {
									updateWord(updatedWord);
									setShowEdit(false);
								}}
							>
								<Check />
							</IconButton>
						)}
						<IconButton
							color="error"
							onClick={() => {
								setShowEdit(false);
								setUpdatedWord(word);
							}}
						>
							<Close />
						</IconButton>
					</Container>
				}
				sx={{ width: "100%" }}
			>
				<Stack>
					<TextField
						variant="outlined"
						label="Cz"
						value={updatedWord.cz}
						onChange={(e) =>
							setUpdatedWord((w) => ({
								...w,
								cz: e.target.value,
							}))
						}
						sx={{ mb: 2 }}
					/>
					<TextField
						variant="outlined"
						label="En"
						value={updatedWord.en}
						onChange={(e) =>
							setUpdatedWord((w) => ({
								...w,
								en: e.target.value,
							}))
						}
						sx={{ mb: 2 }}
					/>
				</Stack>
			</ListItem>
			<Divider />
		</>
	);
};

export default Word;
