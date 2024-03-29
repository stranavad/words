import { useEffect, useState } from "react";
// MUI
import { Stack, Tab, Tabs, Box } from "@mui/material";
// Custom components
import AddWord from "../components/AddWord";
import AddUnit from "../components/AddUnit";
import TabPanel from "../components/TabPanel";
import ButtonHome from "../components/ButtonHome";
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
					<ButtonHome />
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
						units={units}
						loadData={loadData}
						alert={alert}
					/>
				</TabPanel>
				<TabPanel value={tab} index={1}>
					<AddUnit
						units={units.map((u) => u.name)}
						alert={alert}
						loadData={loadData}
					/>
				</TabPanel>
			</Stack>
		</>
	);
};

export default Add;
