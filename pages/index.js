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

	const updateWord = (word) => {
		axios
			.put(`${PATH}words`, {
				id: word.id,
				cz: word.cz.replace('"', "'"),
				en: word.en.replace('"', "'"),
			})
			.then((res) => {
				if (res.data.message === "updated") {
					alert("Slovo upraveno", "success");
					loadData();
				}
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

	const shareLink = () => {
		if (typeof window !== "undefined") {
			let query = new URLSearchParams();
			activeUnit.forEach((u) => {
				query.append("activeUnit", u.id);
			});
			navigator.clipboard.writeText(
				window.location.href + "?" + query.toString()
			);
			alert("Odkaz zkopirovan do clipboard", "success");
		}
	};

	// speaking
	const { speak, speaking, cancel } = useSpeechSynthesis();
	const speakWord = (text) => {
		speaking && cancel();
		speak({ text });
	};

	// dataLoaded
	useEffect(() => {
		setDataLoaded(wordsLoaded && unitsLoaded);
	}, [wordsLoaded, unitsLoaded]);

	// get initial data
	useEffect(() => loadData(), []);

	const loadData = () => {
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
	};

	// watch for query change
	useEffect(() => {
		if (query?.activeUnit && unitsLoaded) {
			console.log("there is query");
			let active = Array.isArray(query.activeUnit)
				? query.activeUnit
				: [query.activeUnit];
			active = active.map((a) => parseInt(a, 10));
			setActiveUnit(units.filter((u) => active.includes(u.id))); // removing duplicated
			replace("/", undefined, { shallow: true }); // removing query
		}
	}, [query?.activeUnit, replace, dataLoaded, units, unitsLoaded]);

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
				originalWords.filter((word) =>
					activeUnit.map((au) => au.id).includes(word.unit)
				)
			);
		} else {
			setWords(originalWords);
		}
	}, [activeUnit, originalWords]);

	return (
		<>
			<Stack
				direction="row"
				alignItems="center"
				sx={{ maxWidth: 400, width: "100%" }}
			>
				<UnitSelect
					units={units}
					activeUnit={activeUnit}
					setActiveUnit={setActiveUnit}
				/>
				<TogglePrimary primary={primary} setPrimary={setPrimary} />
			</Stack>
			<AdvancedMenu
				showGlobal={showGlobal}
				setShowGlobal={setShowGlobal}
				copyToClipboard={copyToClipboard}
				shareLink={shareLink}
				exportWords={exportWords}
			/>
			{dataLoaded ? (
				<List sx={{ maxWidth: "400px", width: "100%" }}>
					{words.map((word) => (
						<Word
							key={word.id}
							word={word}
							deleteWord={deleteWord}
							showGlobal={showGlobal}
							speak={speakWord}
							primary={primary}
							triggerReload={loadData}
							updateWord={updateWord}
						/>
					))}
				</List>
			) : (
				<CircularProgress />
			)}
			<Box sx={{ position: "fixed", bottom: 30, right: 30 }}>
				<Link href="/add" passHref>
					<Fab color="primary">
						<Add />
					</Fab>
				</Link>
			</Box>
		</>
	);
}
