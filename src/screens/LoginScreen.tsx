import React, { Dispatch, SetStateAction, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Button } from "../components/Button";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Screens } from "./MainScreen";
import sha256 from "crypto-js/sha256";

type LogInScreenProps = {
	placeID: string | undefined;
	setPage: (screen: Screens) => void;
	setPlaceID: Dispatch<SetStateAction<string | undefined>>;
	goToSubmitRating: () => void;
};

const LogInScreen: React.FC<LogInScreenProps> = ({
	setPage,
	placeID,
	setPlaceID,
	goToSubmitRating,
}) => {
	const [errorMsg, setErrorMsg] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const setPageAndSubmitRating = () => {
		goToSubmitRating();
		if (placeID) {
			setPlaceID(placeID);
		}
	};

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

		const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

		if (reg.test(email) === false) {
			setErrorMsg("Please provide a valid email");
			return;
		} else {
			setErrorMsg("");
			setEmail(email.toLowerCase()); // making email lowercase will ensure that email isn't case sensitive
			return;
		}
	};

	/**
	 * Hashes the password the user provies
	 * @param passowrd
	 * @returns
	 */
	const hashPassword = (password: string) => {
		setErrorMsg("");

		if (!password) {
			setPassword("");
			return;
		}
		const hash: CryptoJS.lib.WordArray = sha256(password);

		if (hash !== undefined) {
			setPassword(hash.toString());
			return;
		} else {
			setPassword("");
			setErrorMsg("Something went wrong, please try again");
			return;
		}
	};

	const logInUser = async () => {
		setErrorMsg("");

		if (!email || !password) {
			setErrorMsg("Please enter an email and password to log in");
			return;
		}

		try {
			const { data } = await axios.post<{ error?: string; token?: string }>(
				"https://peer-server-stevens.herokuapp.com/login",
				{
					email: email,
					hash: password,
				},
				{
					validateStatus: (status: number): boolean => {
						return status < 500;
					},
				}
			);

			if (data.token) {
				await AsyncStorage.setItem("@auth_token", data.token);
				await AsyncStorage.setItem("@email", email);
				setPageAndSubmitRating();
			} else if (data.error) {
				setErrorMsg(data.error);
			} else {
				throw new Error(
					"Something has gone catastrophically wrong. (Response contains neither error nor token)"
				);
			}
		} catch (e) {
			if (e instanceof Error) {
				setErrorMsg("Something has gone wrong, please try again");
			}
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
				autoCapitalize="none"
				accessibilityLabel="Type in your email here"
				onChangeText={input => validateEmail(input)}
			/>
			<Text style={styles.label}>Password</Text>
			<TextInput
				style={styles.input}
				textContentType="password"
				autoCapitalize="none"
				accessibilityLabel="Type in your password here"
				onChangeText={input => hashPassword(input)}
			/>
			<Button
				style={styles.button}
				text="Log In"
				onPress={() => logInUser()}
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
		fontSize: 30,
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
