import { useState, useEffect } from "react";
import { ListItem, ListItemText, IconButton, Container } from "@mui/material";
import { Visibility, VisibilityOff, VolumeUp } from "@mui/icons-material";

const Word = ({ word, deleteWord, showGlobal, speak }) => {
	const [show, setShow] = useState(false);
	const hashedWord = word.secondary?.split("").map(() => "*");
	useEffect(() => setShow(showGlobal), [showGlobal]);
	return (
		<ListItem
			key={word.id}
			secondaryAction={
				<Container disableGutters={true}>
					<IconButton
						onClick={() => setShow((old) => !old)}
						color="primary"
					>
						{show ? <VisibilityOff /> : <Visibility />}
					</IconButton>
					<IconButton
						onClick={() => speak(word.en)}
						color="primary"
					>
						<VolumeUp/>
					</IconButton>
				</Container>
			}
			sx={{ width: "100%" }}
			onDoubleClick={() => deleteWord(word.id)}
		>
			<ListItemText
				primary={word.primary}
				secondary={show ? word.secondary : hashedWord}
			/>
		</ListItem>
	);
};

export default Word;
