import { useState, useEffect } from "react";
import { ListItem, ListItemText, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Word = ({ word, deleteWord, showGlobal }) => {
	const [show, setShow] = useState(false);
	const hashedWord = word.secondary?.split("").map(() => "*");
	useEffect(() => setShow(showGlobal), [showGlobal]);
	return (
		<ListItem
			key={word.id}
			secondaryAction={
				<IconButton
					onClick={() => setShow((old) => !old)}
					color="primary"
				>
					{show ? <VisibilityOff /> : <Visibility />}
				</IconButton>
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
