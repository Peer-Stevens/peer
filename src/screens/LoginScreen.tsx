import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Button } from "../components/Button";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Screens } from "./MainScreen";

type CreateAccountScreenProps = { setPage: (screen: Screens) => void };

const LogInScreen: React.FC<CreateAccountScreenProps> = ({ setPage }) => {
	const [errorMsg, setErrorMsg] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	/**
	 * Validates that the email the user provided has a valid email format
	 * This validation in the client is faster than sending an invalid email over to the server only to recieve an error message.
	 * @param email
	 * @returns
	 */
	const validateEmail = (email: string) => {
		setErrorMsg("");

		if (!email) {
			setEmail("");
			return;
		}

		const reg: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

		if (reg.test(email) === false) {
			setErrorMsg("Please provide a valid email");
			return;
		} else {
			setErrorMsg("");
			setEmail(email);
			return;
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Log In</Text>
			<Text
				style={{
					color: "white",
					fontWeight: "bold",
					margin: 20,
					marginLeft: 0,
					fontSize: 30,
					textAlign: "center",
				}}
			>
				{errorMsg ? <Text style={{ color: "black" }}>{errorMsg}</Text> : null}
			</Text>
			<Text style={styles.label}>Email</Text>
			<TextInput
				style={styles.input}
				textContentType="emailAddress"
				onChangeText={input => validateEmail(input)}
			/>
			<Text style={styles.label}>Password</Text>
			<TextInput style={styles.input} />
			<Button
				style={styles.button}
				text="Log In"
				onPress={() => {
					//TODO
				}}
				accessibilityLabel="Click to log in"
			/>
			<Button
				style={styles.button}
				text="Back to previous page"
				onPress={() => setPage(Screens.NotLoggedIn)}
				accessibilityLabel="Click to go back to previous page"
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	label: {
		color: "black",
		margin: 20,
		marginLeft: 0,
		fontSize: 35,
	},
	button: {
		marginTop: 30,
	},
	container: {
		flex: 1,
		justifyContent: "center",
		padding: 8,
		backgroundColor: "white",
	},
	input: {
		backgroundColor: "white",
		borderStyle: "solid",
		borderWidth: 3,
		borderColor: "black",
		height: 60,
		padding: 10,
		borderRadius: 4,
		fontSize: 35,
	},
	text: {
		color: "black",
		margin: 20,
		marginLeft: 0,
		fontSize: 40,
		textAlign: "center",
		paddingBottom: 10,
	},
});

export default LogInScreen;
