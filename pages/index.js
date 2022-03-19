/* eslint-disable @next/next/link-passhref */
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// MUI
import { Stack, Fab, Box, List } from "@mui/material";
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

export default function Index({ alert, wordsProp, unitsProp }) {
	const [words, setWords] = useState(wordsProp);
	const [originalWords, setOriginalWords] = useState(wordsProp);
	const [units, setUnits] = useState(unitsProp);
	const [activeUnit, setActiveUnit] = useState([]);
	const [primary, setPrimary] = useState("en");
	const [showGlobal, setShowGlobal] = useState(false);

	const { query, replace } = useRouter();
	const deleteWord = (id) => {
		axios.delete(`${PATH}words`, { params: { id } }).then(async () => {
			loadData();
			await fetch("/api/revalidate");
		});
	};


	const updateWord = (word) => {
		axios
			.put(`${PATH}words`, {
				id: word.id,
				cz: word.cz.replace('"', "'"),
				en: word.en.replace('"', "'"),
			})
			.then(async (res) => {
				if (res.data.message === "updated") {
					alert("Slovo upraveno", "success");
					loadData();
					await fetch("/api/revalidate");
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

	const loadData = async () => {
		const res = await fetch(`${PATH}utils/initial`);
		const { words, units } = await res.json();
		setOriginalWords(words);
		setUnits(units);
	};

	// watch for query change
	useEffect(() => {
		if (query?.activeUnit) {
			let active = Array.isArray(query.activeUnit)
				? query.activeUnit
				: [query.activeUnit];
			active = active.map((a) => parseInt(a, 10));
			setActiveUnit(units.filter((u) => active.includes(u.id))); // removing duplicated
			replace("/", undefined, { shallow: true }); // removing query
		}
	}, [query?.activeUnit, replace, units]);

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
		setFilteredWords();
	}, [activeUnit, originalWords]);

	const setFilteredWords = () => {
		if (activeUnit.length > 0) {
			setWords(
				originalWords.filter((word) =>
					activeUnit.map((au) => au.id).includes(word.unit)
				)
			);
		} else {
			setWords(originalWords);
		}
	}

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

export async function getStaticProps() {
	const res = await fetch(`${PATH}utils/initial`);
	const { words: wordsProp, units: unitsProp } = await res.json();
	return {
		props: {
			wordsProp,
			unitsProp,
		},
	};
}
