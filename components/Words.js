import { List } from "@mui/material";
import Word from "./Word";

import { useSpeechSynthesis } from "react-speech-kit";

const WordsList = ({ words, deleteWord, showGlobal, primary }) => {
	const { speak, speaking, cancel } = useSpeechSynthesis();

	const speakWord = (text) => {
		speaking && cancel();
		speak({ text });
	};
	return (
		<List sx={{ maxWidth: "400px", width: "100%" }}>
			{words.map((word) => (
				<Word
					key={word.id}
					word={word}
					deleteWord={deleteWord}
					showGlobal={showGlobal}
					speak={speakWord}
					primary={primary}
				/>
			))}
		</List>
	);
};

export default WordsList;
