import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const Link = dynamic(() => import("next/link"), { loading: () => <div /> });
// mui
import {
	ListItem,
	Container,
	IconButton,
	ListItemText,
	TextField,
	Divider,
	Stack,
} from "@mui/material";
import { Delete, Close, Edit, Check } from "@mui/icons-material";
const PickColor = dynamic(() => import('./PickColor'));
//import PickColor from "./PickColor";

const Unit = ({ unit, deleteUnit, updateUnit, units }) => {
	const [updatedUnit, setUpdatedUnit] = useState({});
	const [showEdit, setShowEdit] = useState(false);

	useEffect(() => {
		setUpdatedUnit(unit);
	}, [unit]);

	return !showEdit ? (
		<>
			<ListItem
				key={unit.id}
				secondaryAction={
					<Container disableGutters={true}>
						<IconButton
							color="secondary"
							onClick={() => setShowEdit(true)}
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
			<Divider />
		</>
	) : (
		<>
			<ListItem
				key={unit.id}
				secondaryAction={
					<Container disableGutters={true}>
						{updatedUnit.name !== "" &&
							!units
								.map((u) => u.name)
								.includes(updateUnit.name) && (
								<IconButton
									color="success"
									onClick={() => {
										updateUnit(updatedUnit);
										setShowEdit(false);
									}}
								>
									<Check />
								</IconButton>
							)}

						<IconButton
							color="error"
							onClick={() => setShowEdit(false)}
						>
							<Close />
						</IconButton>
					</Container>
				}
			>
				<Stack>
					<TextField
						value={updatedUnit.name}
						onChange={(e) =>
							setUpdatedUnit((u) => ({
								...u,
								name: e.target.value,
							}))
						}
						autoFocus={true}
					/>
					<PickColor
						color={updatedUnit.color}
						setColor={(c) =>
							setUpdatedUnit((u) => ({ ...u, color: c }))
						}
					/>
				</Stack>
			</ListItem>
			<Divider />
		</>
	);
};

export default Unit;
