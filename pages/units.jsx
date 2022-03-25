import { useState, useEffect } from "react";
// MUI
import { List, Stack } from "@mui/material";
// custom components
import Unit from "../components/Unit";
import ButtonHome from "../components/ButtonHome";
import ButtonAdd from "../components/ButtonAdd";
// import Unit from "../components/Unit";
// modules
import axios from "axios";
import { PATH } from "../config";

const Units = ({ alert, unitsProp }) => {
	const [units, setUnits] = useState(unitsProp);

	// get initial data
	useEffect(() => loadData(), []);
	const loadData = () => {
		axios.get(`${PATH}units/detailed`).then(({ data: { units } }) => {
			setUnits(units);
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
				<ButtonHome />
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

			<ButtonAdd />
		</>
	);
};

export default Units;

export async function getStaticProps() {
	const res = await axios.get(`${PATH}units/detailed`);
	const { units } = await res.data;
	return {
		props: {
			unitsProp: units,
		},
		revalidate: 30,
	};
}
