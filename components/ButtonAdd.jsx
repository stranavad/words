import dynamic from "next/dynamic";
const Link = dynamic(() => import("next/link"));
import { Box, Fab } from "@mui/material";
import { Add } from "@mui/icons-material";

const ButtonAdd = () => {
	return (
		<Box sx={{ position: "fixed", bottom: 30, right: 30 }}>
			<Link href="/add" passHref>
				<Fab color="primary">
					<Add />
				</Fab>
			</Link>
		</Box>
	);
};
export default ButtonAdd;
