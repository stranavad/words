import dynamic from 'next/dynamic';
const Link = dynamic(() => import('next/link'));
import { Box, AppBar, Typography, Toolbar, Button } from "@mui/material";

const Menu = () => {
	return (
		<Box sx={{ flexGrow: 1, mb: 4 }}>
			<AppBar position="static">
				<Toolbar>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1 }}
					>
						Legenda Jezek
					</Typography>
					<Link href="/learning" passHref>
						<Button>
							<Typography variant="button" color="white">
								Learning
							</Typography>
						</Button>
					</Link>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
export default Menu;
