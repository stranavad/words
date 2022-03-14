import { useState, useMemo } from "react";
import { ListItem, ListItemText, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Word = ({ word, deleteWord }) => {
	const [show, setShow] = useState(true);
	const hashedWord = word.secondary?.split("").map(() => "*");
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
