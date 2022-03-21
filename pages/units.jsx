import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const Link = dynamic(() => import("next/link"), { loading: () => <div /> });
// MUI
import { List, Stack, Button, Box, Fab, CircularProgress } from "@mui/material";
import { Add } from "@mui/icons-material";
// custom components
const Unit = dynamic(() => import('../components/Unit'));
// import Unit from "../components/Unit";
// modules
import axios from "axios";
import { PATH } from "../config";

const Units = ({ alert, unitsProp }) => {
	const [units, setUnits] = useState(unitsProp);
	const [dataLoading, setDataLoading] = useState(true);

	// get initial data
	useEffect(() => loadData(), []);
	const loadData = () => {
		axios.get(`${PATH}units/detailed`).then(({ data: { units } }) => {
			setUnits(units);
			setDataLoading(false);
		});
	};

	// delete unit
	const deleteUnit = (id) => {
		axios.delete(`${PATH}units`, { params: { id } }).then(() => {
			alert("Vymazano adios", "success");
			loadData();
		});
	};

	// publis update unit
	const updateUnit = (unit) => {
		axios
			.put(`${PATH}units`, {
				name: unit.name.replace('"', "'"),
				id: unit.id,
				color: unit.color,
			})
			.then((res) => {
				loadData();
				if (res.data.message === "updated") {
					alert("Unit was successfully updated", "success");
				} else {
					alert("There was some error", "error");
				}
			});
	};

	return (
		<>
			<Stack
				sx={{
					mb: 2,
					width: "100%",
					maxWidth: "400px",
					display: "flex",
					justifyContent: "left",
					flexDirection: "row",
				}}
			>
				<Link href="/" passHref>
					<Button variant="contained">Zpet</Button>
				</Link>
			</Stack>
			{!dataLoading ? (
				<List sx={{ maxWidth: "400px", width: "100%" }}>
					{units.map((unit) => (
						<Unit
							key={unit.id}
							unit={unit}
							units={units}
							deleteUnit={deleteUnit}
							updateUnit={updateUnit}
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
};

export default Units;
