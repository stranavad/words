/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import {
	ListItem,
	ListItemText,
	IconButton,
	Container,
	Popover,
	Button,
	Stack,
	Divider,
	Box,
} from "@mui/material";
import {
	Edit,
	VolumeUp,
	MoreVert,
	Delete,
	Check,
	Close,
} from "@mui/icons-material";
import WordForm from "./WordForm";
import axios from "axios";
2;
import { PATH } from "../config";

const Word = ({ word, showGlobal, speak, primary, units, loadData, alert }) => {
	const [show, setShow] = useState(true);
	const [anchorEl, setAnchorEl] = useState(null);
	const [showEdit, setShowEdit] = useState(false);
	const [updatedWord, setUpdatedWord] = useState({});
	const [showUpdate, setShowUpdate] = useState(false);

	const updateWord = (word) => {
		fetch(`${PATH}words`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: word.id,
				cz: word.cz.replace('"', "'"),
				en: word.en.replace('"', "'"),
				unit: word.unit.id,
			}),
		}).then(async (res) => {
			loadData();
			const data = await res.json();
			if (data.message === "updated") {
				alert("Slovo upraveno", "success");
			}
		});
	};

	const deleteWord = () =>
		axios
			.delete(`${PATH}words`, { params: { id: word.id } })
			.then(loadData);

	useEffect(
		() =>
			setUpdatedWord({
				...word,
				unit: units.find((u) => u.id === word.unit),
			}),
		[word]
	);

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
									onClick={deleteWord}
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
					sx={{
						cursor: "pointer",
						borderLeftWidth: "2px",
						borderLeftColor: units.find((u) => u.id === word.unit)
							.color,
						borderLeftStyle: "solid",
						paddingLeft: "5px",
					}}
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
						<IconButton
							color="success"
							onClick={() => {
								setShowEdit(false);
								updateWord(updatedWord);
							}}
							disabled={!showUpdate}
						>
							<Check />
						</IconButton>
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
				<WordForm
					word={updatedWord}
					setWord={setUpdatedWord}
					units={units}
					setShowAdd={setShowUpdate}
					originalWord={word}
				/>
			</ListItem>
			<Divider />
		</>
	);
};

export default Word;
