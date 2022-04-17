import dynamic from "next/dynamic";
const Link = dynamic(() => import("next/link"));
import { Button, Container } from "@mui/material";

const ButtonHome = () => {
	return (
		<Container sx={{ width: "100%", mb: 2 }} disableGutters>
			<Link href="/" passHref>
				<Button variant="contained">Home</Button>
			</Link>
		</Container>
	);
};

export default ButtonHome;
