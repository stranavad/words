import { Box, AppBar, Typography, Toolbar } from "@mui/material";

const Menu = () => {
	return (
		<Box sx={{ flexGrow: 1, mb: 4}}>
			<AppBar position="static">
				<Toolbar>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1 }}
					>
						Okackovana
					</Typography>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
export default Menu;