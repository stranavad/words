/* eslint-disable @next/next/link-passhref */
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// MUI
import {
	Stack,
	Fab,
	Box,
	CircularProgress,
	List,
	Divider,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { PATH } from "../config";
// custom components
import UnitSelect from "../components/UnitSelect";
import TogglePrimary from "../components/TogglePrimary";
import AdvancedMenu from "../components/AdvancedMenu";
import Word from "../components/Word";
// modules
import axios from "axios";
import { useSpeechSynthesis } from "react-speech-kit";
import fileDownload from "js-file-download";

export default function Index({ alert }) {
	const [words, setWords] = useState([]);
	const [originalWords, setOriginalWords] = useState([]);
	const [units, setUnits] = useState([]);
	const [activeUnit, setActiveUnit] = useState([]);
	const [primary, setPrimary] = useState("en");
	const [showGlobal, setShowGlobal] = useState(false);
	const [dataLoaded, setDataLoaded] = useState(false);
	// sub
	const [wordsLoaded, setWordsLoaded] = useState(false);
	const [unitsLoaded, setUnitsLoaded] = useState(false);

	const { query, replace } = useRouter();

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

	const copyToClipboard = () => {
		axios
			.post(`${PATH}words/export`, { units: activeUnit })
			.then(({ data }) => {
				navigator.clipboard.writeText(data);
				alert("Zkopirovano do clipboard", "success");
			});
	};

	const exportWords = () => {
		axios
			.post(`${PATH}words/export`, { units: activeUnit })
			.then(({ data }) => fileDownload(data, "words.txt"));
	};

	// speaking
	const { speak, speaking, cancel } = useSpeechSynthesis();
	const speakWord = (text) => {
		speaking && cancel();
		speak({ text });
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
			setWordsLoaded(true);
		});
		axios.get(`${PATH}units`).then(({ data: { units: data } }) => {
			setUnits(data);
			setUnitsLoaded(true);
		});
	}, []);

	useEffect(() => {
		if (wordsLoaded && unitsLoaded) {
			setDataLoaded(true);
		}
	}, [wordsLoaded, unitsLoaded]);

	// watch for query change
	useEffect(() => {
		if (query?.activeUnit) {
			let active = Array.isArray(query.activeUnit)
				? query.activeUnit
				: [query.activeUnit];
			active = active.filter((unit) =>
				units.map((u) => u.name).includes(unit)
			);
			setActiveUnit(Array.from(new Set(active))); // removing duplicated
			replace("/", undefined, { shallow: true });
		}
	}, [query?.activeUnit, replace, dataLoaded, units]);

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

	return dataLoaded ? (
		<>
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
				copyToClipboard={copyToClipboard}
				exportWords={exportWords}
			/>
			<List sx={{ maxWidth: "400px", width: "100%" }}>
				{words.map((word) => (
					<>
						<Word
							key={word.id}
							word={word}
							deleteWord={deleteWord}
							showGlobal={showGlobal}
							speak={speakWord}
							primary={primary}
						/>
						<Divider />
					</>
				))}
			</List>
			<Box sx={{ position: "fixed", bottom: 30, right: 30 }}>
				<Link href="/add" passHref>
					<Fab color="primary">
						<Add />
					</Fab>
				</Link>
			</Box>
		</>
	) : (
		<CircularProgress />
	);
}
