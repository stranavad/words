import { useEffect, useState } from "react";
import { Stack, Button, Typography } from "@mui/material";
import axios from "axios";
import WordForm from "./WordForm";
import { PATH } from "../config";

const AddWord = ({ units, loadData, alert }) => {
	const [word, setWord] = useState({ cz: "", en: "", unit: units[0] });
	const [showCreate, setShowCreate] = useState(false);

	useEffect(() => {
		if (units.length > 0) {
			setWord((w) => ({ ...w, unit: units[0] }));
		}
	}, [units]);

	const clear = () => {
		setWord({ cz: "", en: "", unit: {} });
		setShowCreate(false);
	};

	const addWord = () => {
		axios
			.post(`${PATH}words`, {
				unit: word.unit,
				cz: word.cz.replace('"', "'"),
				en: word.en.replace('"', "'"),
			})
			.then(() => {
				alert("Vytvoreno nove slovo", "success");
				loadData();
			});
	};

	return (
		<Stack
			sx={{ width: "100%" }}
			component="form"
			onSubmit={(e) => {
				e.preventDefault();
				showCreate && addWord();
				showCreate && clear();
			}}
		>
			<Typography variant="h5" sx={{ mb: 2 }}>
				Add Word
			</Typography>
			{units.length > 0 && (
				<>
					<WordForm
						word={word}
						setWord={setWord}
						units={units}
						setShowAdd={setShowCreate}
						originalWord={{
							cz: "",
							en: "",
							unit: units[0]?.id ? units[0].id : 1,
						}}
					/>
					{showCreate && (
						<Button
							type="submit"
							variant="contained"
							color="primary"
						>
							Pridat
						</Button>
					)}
				</>
			)}
		</Stack>
	);
};

export default AddWord;
