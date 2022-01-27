import React, { Dispatch, SetStateAction } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Button } from "../components/Button";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthentication } from "../hooks/useAuthentication";
import Screen from "../util/screens";

type LogInScreenProps = {
	placeID: string | undefined;
	setPage: (screen: Screen) => void;
	setPlaceID: Dispatch<SetStateAction<string | undefined>>;
	goToSubmitRating: () => void;
	setLoggedIn: Dispatch<React.SetStateAction<boolean>>;
};

const LogInScreen: React.FC<LogInScreenProps> = ({
	setPage,
	placeID,
	setPlaceID,
	goToSubmitRating,
	setLoggedIn,
}) => {
	const { validateEmail, hashPassword, email, errorMsg, setErrorMsg, password } =
		useAuthentication();

	const setPageAndSubmitRating = () => {
		setLoggedIn(true);
		goToSubmitRating();
		if (placeID) {
			setPlaceID(placeID);
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
				onPress={() => setPage(Screen.NotLoggedIn)}
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
