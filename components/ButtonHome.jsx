import dynamic from 'next/dynamic';
const Link = dynamic(() => import('next/link'));
import { Button } from '@mui/material';

const ButtonHome = () => {
    return (
		<Link href="/" passHref>
			<Button variant="contained">Home</Button>
		</Link>
	);
}

export default ButtonHome;