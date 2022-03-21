/* eslint-disable @next/next/link-passhref */
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
// MUI
import { Stack, Button, Tab, Tabs, Box } from "@mui/material";
// Custom components
import AddWord from "../components/AddWord";
import AddUnit from "../components/AddUnit";
import TabPanel from "../components/TabPanel";
const Link = dynamic(() => import("next/link"), {
	loading: () => <div />,
});
import { PATH } from "../config";
// Modules
import axios from "axios";

const Add = ({ alert }) => {
	const [words, setWords] = useState([]);
	const [units, setUnits] = useState([]);
	const [tab, setTab] = useState(0);

	// get initial data
	useEffect(() => loadData(), []);
	const loadData = () => {
		axios.get(`${PATH}utils/initial`).then(({ data: { words, units } }) => {
			setWords(words);
			setUnits(units);
		});
	};

	const addWord = (word) => {
		axios
			.post(`${PATH}words`, {
				...word,
				cz: word.cz.replace('"', "'"),
				en: word.en.replace('"', "'"),
			})
			.then(() => {
				alert("Vytvoreno nove slovo", "success");
				loadData();
			});
	};

	const addUnit = (unit) => {
		console.log("adding unit");
		axios
			.post(`${PATH}units`, {
				unit,
			})
			.then(() => {
				alert("New unit created", "success");
				loadData();
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
					<AddWord words={words} addWord={addWord} units={units} />
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
