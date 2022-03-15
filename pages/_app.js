import AlertBar from "../components/AlertBar";
import { useState } from "react";
import { Stack } from "@mui/material";
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
