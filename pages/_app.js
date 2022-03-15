import AlertBar from "../components/AlertBar";
import { useState } from "react";
import { Stack } from "@mui/material";
import Head from 'next/head';
import '../styles.css';

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
	);
};

export default App;
