import { Box, IconButton, Button } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from 'axios';

const AdvancedMenu = ({ showGlobal, setShowGlobal, exportWords }) => {
	return (
		<Box sx={{ width: "100%", maxWidth: 400 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingRight: '16px', paddingLeft: '8px'}}>
				<Button onClick={exportWords}>Export</Button>
                <IconButton onClick={() => setShowGlobal(s => !s)}>
                    {showGlobal ? <VisibilityOff color='primary'/> : <Visibility color='primary'/>}
				</IconButton>
            </Box>
		</Box>
	);
};

export default AdvancedMenu;