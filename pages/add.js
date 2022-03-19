/* eslint-disable @next/next/link-passhref */
import { useEffect, useState } from "react";
import Link from "next/link";
// MUI
import { Stack, Button, Tab, Tabs, Box, Typography } from "@mui/material";
// Custom components
import AddWord from "../components/AddWord";
import AddUnit from "../components/AddUnit";
import TabPanel from "../components/TabPanel";
import { PATH } from "../config";
// Modules
import axios from "axios";

const Add = ({ alert, wordsProp, unitsProp }) => {
	const [words, setWords] = useState(wordsProp);
	const [units, setUnits] = useState(unitsProp);
	const [tab, setTab] = useState(0);

	// get initial data
	const loadWords = async () => {
		const res = await fetch(`${PATH}words`);
		const { words } = await res.json();
		setWords(words);
	};
	const loadUnits = async () => {
		const res = await fetch(`${PATH}units`);
		const { units } = await res.json();
		setUnits(units);
	};

	const addWord = (word) => {
		axios
			.post(`${PATH}words`, {
				...word,
				cz: word.cz.replace('"', "'"),
				en: word.en.replace('"', "'"),
			})
			.then(async () => {
				alert("Vytvoreno nove slovo", "success");
				loadWords();
				await fetch("/api/revalidate");
			});
	};

	const addUnit = (unit) => {
		console.log("adding unit");
		axios
			.post(`${PATH}units`, {
				unit,
			})
			.then(async () => {
				alert("New unit created", "success");
				loadUnits();
				await fetch("/api/revalidate");
			});
	};

	// generating props for tabs
	const a11yProps = (index) => ({
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	});

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
						<Button variant="contained">Home</Button>
					</Link>
				</Stack>
				<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
					<Tabs
						value={tab}
						onChange={(_, newValue) => setTab(newValue)}
						aria-label="basic tabs example"
					>
						<Tab label="Word" {...a11yProps(0)} />
						<Tab label="Unit" {...a11yProps(1)} />
					</Tabs>
				</Box>
				<TabPanel value={tab} index={0}>
					<AddWord
						words={words}
						addWord={addWord}
						units={units.map((u) => u.name)}
					/>
				</TabPanel>
				<TabPanel value={tab} index={1}>
					<AddUnit
						units={units.map((u) => u.name)}
						addUnit={addUnit}
					/>
				</TabPanel>
			</Stack>
		</>
	);
};

export default Add;

export async function getStaticProps() {
	const res = await fetch(`${PATH}utils/initial`);
	const { units, words } = await res.json();
	return { props: { unitsProp: units, wordsProp: words }, revalidate: 10 };
}
