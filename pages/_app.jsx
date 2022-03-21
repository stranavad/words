import { useState } from "react";
import Head from "next/head";
import dynamic from 'next/dynamic';
import "../styles.css";
// Custom components
const Menu = dynamic(() => import('../components/Menu'));
//import Menu from "../components/Menu";
const AlertBar = dynamic(() => import('../components/AlertBar'), {loading: () => <div/>})
//import AlertBar from "../components/AlertBar";
// MUI
//import Stack from '@mui/material/Stack';
const Stack = dynamic(() => import('@mui/material/Stack'));
//import { Stack } from "@mui/material";

const App = ({ Component, pageProps }) => {
	const [alertText, setAlertText] = useState(false);
	const [alertSeverity, setAlertSeverity] = useState("success");
	const [alertShow, setAlertShow] = useState(false);

	const alert = (text, severity) => {
		setAlertText(text);
		setAlertSeverity(severity);
		setAlertShow(true);
	};

	return (
		<>
			<Menu />
			<Stack alignItems="center">
				<Head>
					<meta
						name="viewport"
						content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi"
					/>
				</Head>
				<Component {...pageProps} alert={alert} />
				<AlertBar
					text={alertText}
					severity={alertSeverity}
					show={alertShow}
					setShow={setAlertShow}
				/>
			</Stack>
		</>
	);
};

export default App;
