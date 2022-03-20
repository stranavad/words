import { ToggleButtonGroup, ToggleButton } from "@mui/material";

const TogglePrimary = ({ primary, setPrimary }) => {
	return (
		<ToggleButtonGroup
			value={primary}
			exclusive
			onChange={(e) => setPrimary(e.target.value)}
			aria-label="text alignment"
			color='primary'
		>
			<ToggleButton value="en" aria-label="english primary">
				EN
			</ToggleButton>
			<ToggleButton value="cz" aria-label="czech primary">
				CZ
			</ToggleButton>
		</ToggleButtonGroup>
	);
};

export default TogglePrimary;
