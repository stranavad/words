import { useState } from "react";
import Link from "next/link";
// MUI
import { List, Stack, Button, Box, Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
// custom components
import Unit from "../components/Unit";
// modules
import axios from "axios";
import { PATH } from "../config";

const Units = ({ alert, unitsProp }) => {
	const [units, setUnits] = useState(unitsProp);

	const loadData = async () => {
		const res = await fetch(`${PATH}units/detailed`);
		const { units } = await res.json();
		setUnits(units);
	};

	// delete unit
	const deleteUnit = (id) => {
		axios.delete(`${PATH}units`, { params: { id } }).then(async () => {
			alert("Vymazano adios", "success");
			loadData();
			await fetch("/api/revalidate");
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
			.then(async (res) => {
				loadData();
				if (res.data.message === "updated") {
					alert("Unit was successfully updated", "success");
				} else {
					alert("There was some error", "error");
				}
				await fetch("/api/revalidate");
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

export async function getStaticProps() {
	const res = await fetch(`${PATH}units`);
	const { units } = await res.json();
	return { props: { unitsProp: units }, revalidate: 10 };
}
