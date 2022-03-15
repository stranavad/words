/* eslint-disable @next/next/link-passhref */
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import UnitSelect from "../components/UnitSelect";
import WordsList from "../components/Words";
import TogglePrimary from "../components/TogglePrimary";
import AdvancedMenu from "../components/AdvancedMenu";
import { Stack, Fab, Box } from "@mui/material";
import { Add } from "@mui/icons-material";
import fileDownload from "js-file-download";
import { PATH } from "../config";

export default function Index() {
	const [words, setWords] = useState([]);
	const [originalWords, setOriginalWords] = useState([]);
	const [units, setUnits] = useState([]);
	const [activeUnit, setActiveUnit] = useState([]);
	const [primary, setPrimary] = useState("en");
	const [showGlobal, setShowGlobal] = useState(false);

	const deleteWord = (id) => {
		axios
			.delete(`${PATH}words`, { params: { id } })
			.then((res) => console.log(res));
		axios.get(`${PATH}words`).then(({ data: { words: data } }) => {
			setOriginalWords(
				data.map((word) => ({
					...word,
					show: true,
					primary: word.en,
					secondary: word.cz,
				}))
			);
			setWords(
				data.map((word) => ({
					...word,
					show: true,
					primary: word.en,
					secondary: word.cz,
				}))
			);
		});
	};

	const exportWords = () => {
		axios
			.post(`${PATH}words/export`, { units: activeUnit })
			.then(({ data }) => fileDownload(data, "words.txt"));
	};

	// get initial data
	useEffect(() => {
		axios.get(`${PATH}words`).then(({ data: { words: data } }) => {
			setOriginalWords(
				data.map((word) => ({
					...word,
					show: true,
					primary: word.en,
					secondary: word.cz,
				}))
			);
			setWords(
				data.map((word) => ({
					...word,
					show: true,
					primary: word.en,
					secondary: word.cz,
				}))
			);
		});
		axios
			.get(`${PATH}units`)
			.then(({ data: { units: data } }) => setUnits(data));
	}, []);

	// change Primary language
	useEffect(() => {
		setWords((words) =>
			words.map((word) => ({
				...word,
				primary: primary === "en" ? word.en : word.cz,
				secondary: primary === "en" ? word.cz : word.en,
			}))
		);
	}, [primary]);

	// change active units filter
	useEffect(() => {
		if (activeUnit.length > 0) {
			setWords(
				originalWords.filter((word) => activeUnit.includes(word.unit))
			);
		} else {
			setWords(originalWords);
		}
	}, [activeUnit, originalWords]);

	return (
		<Stack alignItems="center">
			<Stack
				direction="row"
				alignItems="center"
				sx={{ maxWidth: 400, width: "100%" }}
			>
				<UnitSelect
					units={units.map((unit) => unit.name)}
					activeUnit={activeUnit}
					setActiveUnit={setActiveUnit}
				/>
				<TogglePrimary primary={primary} setPrimary={setPrimary} />
			</Stack>
			<AdvancedMenu
				showGlobal={showGlobal}
				setShowGlobal={setShowGlobal}
				exportWords={exportWords}
			/>
			<WordsList
				words={words}
				deleteWord={deleteWord}
				showGlobal={showGlobal}
			/>
			<Box sx={{ position: "fixed", bottom: 30, right: 30 }}>
				<Link href="/add" passHref>
					<Fab color="primary">
						<Add />
					</Fab>
				</Link>
			</Box>
		</Stack>
	);
}
