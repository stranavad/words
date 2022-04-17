/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
// MUI
import { Stack, List } from "@mui/material";
import { PATH } from "../config";
// custom components
import UnitSelect from "../components/UnitSelect";
import TogglePrimary from "../components/TogglePrimary";
import AdvancedMenu from "../components/AdvancedMenu";
import ButtonAdd from "../components/ButtonAdd";
//import Word from "../components/Word";
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
	const [showGlobal, setShowGlobal] = useState(true);

	const { query, replace } = useRouter();

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
	const { speak, speaking, cancel, voices } = useSpeechSynthesis();
	const speakWord = (text) => {
		speaking && cancel();
		const voice = voices.find((vc) => vc.lang === "en-GB") || voices.find((vc) => vc.lang === "en_GB");
		speak({ text, voice: voice || voices[0] });
	};

	// initial data
	useEffect(() => loadData(), []);

	const loadData = () => {
		axios.get(`${PATH}utils/initial`).then(({ data: { words, units } }) => {
			setOriginalWords(words);
			setUnits(units);
			setActiveUnit(
				units.filter((u) =>
					activeUnit.map((au) => au.id).includes(u.id)
				)
			);
		});
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
	}, [query?.activeUnit, units]);

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
			<List sx={{ maxWidth: "400px", width: "100%" }}>
				{words.map((word) => (
					<Word
						alert={alert}
						key={word.id}
						word={word}
						showGlobal={showGlobal}
						speak={speakWord}
						primary={primary}
						loadData={loadData}
						units={units}
					/>
				))}
			</List>
			<ButtonAdd />
		</>
	);
}

export async function getStaticProps() {
	const res = await axios.get(`${PATH}utils/initial`);
	const { data } = await res;
	return {
		props: {
			wordsProp: data.words,
			unitsProp: data.units,
		},
		revalidate: 60,
	};
}
