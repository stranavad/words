import { useState, useEffect } from "react";
import Link from "next/link";
// MUI
import {
	List,
	ListItem,
	ListItemText,
	IconButton,
	Divider,
	Container,
	Stack,
	Button,
	TextField,
} from "@mui/material";
import { Delete, Edit, Check, ResetTvRounded } from "@mui/icons-material";
// modules
import axios from "axios";
import { PATH } from "../config";

const Units = ({ alert }) => {
	const [units, setUnits] = useState([]);

	// get initial data
	useEffect(() => {
		axios
			.get(`${PATH}units/detailed`)
			.then(({ data: { data } }) =>
				setUnits(data.map((u) => ({ ...u, showEdit: false })))
			);
	}, []);

	// delete unit
	const deleteUnit = (id) => {
		axios.delete(`${PATH}units`, { params: { id } }).then(() => {
			alert("Vymazano adios", "success");
			axios
				.get(`${PATH}units`)
				.then(({ data: { units: data } }) => setUnits(data));
		});
	};

	// show edit form on unit
	const showEditUnit = (id) =>
		setUnits((uns) =>
			uns.map((u) => ({
				...u,
				showEdit: u.id === id ? !u.showEdit : u.showEdit,
			}))
		);

	// update unit instant
	const updateUnitName = (name, id) => {
		setUnits((uns) =>
			uns.map((u) => {
				if (u.id === id) {
					return { ...u, name };
				}
				return u;
			})
		);
	};

	// publis update unit
	const updateUnit = (id) => {
		const unitToUpdate = units.find((u) => u.id === id);
		axios
			.put(`${PATH}units`, { name: unitToUpdate.name, id })
			.then((res) => {
				showEditUnit(id);
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
			<List sx={{ maxWidth: "400px", width: "100%" }}>
				{units.map((unit) => (
					<div key={unit.id}>
						{!unit.showEdit ? (
							<ListItem
								key={unit.id}
								secondaryAction={
									<Container disableGutters={true}>
										<IconButton
											color="secondary"
											onClick={() => showEditUnit(unit.id)}
										>
											<Edit />
										</IconButton>
										<IconButton
											color="error"
											onClick={() => deleteUnit(unit.id)}
										>
											<Delete />
										</IconButton>
									</Container>
								}
							>
								<Link
									href={{
										pathname: "/",
										query: { activeUnit: unit.name },
									}}
									passHref
								>
									<ListItemText
										sx={{ cursor: "pointer" }}
										primary={unit.name}
										secondary={`Word count: ${unit.wordCount}`}
									/>
								</Link>
							</ListItem>
						) : (
							<ListItem
								key={unit.id}
								secondaryAction={
									<IconButton
										color="success"
										onClick={() => updateUnit(unit.id)}
									>
										<Check />
									</IconButton>
								}
							>
								<TextField
									value={unit.name}
									onChange={(e) =>
										updateUnitName(e.target.value, unit.id)
									}
									autoFocus={true}
								/>
							</ListItem>
						)}

						<Divider />
					</div>
				))}
			</List>
		</>
	);
};

export default Units;
