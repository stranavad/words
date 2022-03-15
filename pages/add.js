/* eslint-disable @next/next/link-passhref */
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Stack, Button } from "@mui/material";
import AddWord from "../components/AddWord";
import AddUnit from "../components/AddUnit";
import { PATH } from "../config";

const Add = ({ alert }) => {
	const [words, setWords] = useState([]);
	const [units, setUnits] = useState([]);

	// get initial data
	useEffect(() => {
		axios
			.get(`${PATH}words`)
			.then(({ data: { words: data } }) => setWords(data));
		axios
			.get(`${PATH}units`)
			.then(({ data: { units: data } }) => setUnits(data));
	}, []);

	const addWord = (word) => {
		axios.post(`${PATH}words`, word).then(() => {
			alert("Vytvoreno nove slovo", "success");
			axios
				.get(`${PATH}words`)
				.then(({ data: { words: data } }) => setWords(data));
		});
	};
	const addUnit = (unit) => {
		console.log("adding unit");
		axios.post(`${PATH}units`, { unit }).then(() => {
			 alert("Vytvorena nova lekce", "success");
			axios
				.get(`${PATH}units`)
				.then(({ data: { units: data } }) => setUnits(data));
		});
	};

	return (
		<>
			<Stack sx={{ maxWidth: 400, width: "100%" }}>
				<Stack
					sx={{
						mb: 2,
						width: "100%",
						display: "flex",
						justifyContent: "left",
						flexDirection: "row",
					}}
				>
					<Link href="/" passHref>
						<Button variant="contained">Zpet</Button>
					</Link>
				</Stack>
				<AddWord
					words={words}
					addWord={addWord}
					units={units.map((u) => u.name)}
				/>
				<AddUnit units={units.map((u) => u.name)} addUnit={addUnit} />
			</Stack>
		</>
	);
};

export default Add;
