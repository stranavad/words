import { Alert, Box, Slide } from '@mui/material';

const AlertBar = ({ show, setShow, text, severity }) => {
    return (
        <Box sx={{ position: 'fixed', bottom: 1, left: 'auto', right: 'auto', maxWidth: '400px', width: '100%'}}>
			<Slide direction='up' in={show}>
				<Alert
                    severity={severity}
                    onClose={() => setShow(false)}
					sx={{ mb: 2, width: '100%' }}
				>
					{text}
				</Alert>
			</Slide>
		</Box>
	);
}

export default AlertBar;