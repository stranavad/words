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
} from "@mui/material";
import { Delete } from "@mui/icons-material";
// modules
import axios from "axios";
import { PATH } from "../config";

const Units = ({ alert }) => {
	const [units, setUnits] = useState([]);

	// get initial data
	useEffect(() => {
		axios
			.get(`${PATH}units`)
			.then(({ data: { units: data } }) => setUnits(data));
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

	return (
		<>
			<Stack
				sx={{
					mb: 2,
                    width: "100%",
                    maxWidth: '400px',
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
						<ListItem
							key={unit.id}
							secondaryAction={
								<Container disableGutters={true}>
									<IconButton
										color="error"
										onClick={() => deleteUnit(unit.id)}
									>
										<Delete />
									</IconButton>
								</Container>
							}
						>
							<ListItemText>{unit.name}</ListItemText>
						</ListItem>
						<Divider />
					</div>
				))}
			</List>
		</>
	);
};

export default Units;
