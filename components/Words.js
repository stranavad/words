import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import Word from './Word';
 
const WordsList = ({ words, deleteWord }) => {
	return (
		<List sx={{maxWidth: '400px', width: '100%'}}>
			{words.map((word) => (
                <Word key={word.id} word={word} deleteWord={deleteWord}/>
			))}
		</List>
	);
};

export default WordsList;
