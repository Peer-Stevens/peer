import React, { useState } from "react";
import { Button } from "../components/Button";
import { View, Text } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Screens } from "./MainScreen";

type LoginScreenProps = { setPage: (screen: Screens) => void };

const LoginScreen: React.FC<LoginScreenProps> = ({ setPage }) => {
	const [errorMsg, setErrorMsg] = useState("");

	const logInUser = async () => {
		setErrorMsg("");

		const token: string | null = await AsyncStorage.getItem("@auth_token");

		if (token) {
			setPage(Screens.Home);
			return;
		}

		try {
			const { data } = await axios.post("https://peer-server-stevens.herokuapp.com/login", {
				// this needs to be passed in dynamically; this was here for testing
				email: "julioisfred@onedrive.com",
				hash: "bd160cd097a48e6601402411225cefca8a15ec9ab4f817adf985bee5708a1bdc",
			});
			await AsyncStorage.setItem("@auth_token", data);
			// need to store the hashed password as well
			setPage(Screens.Home);
		} catch (e) {
			// TODO could not figure out how to pass e.error to setErrorMsg without getting yelled out (couldn't figure out how to make the types behave)
			console.log(e);
			setErrorMsg("Something went wrong");
		}
	};

	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Button text="Log in" onPress={logInUser} accessibilityLabel="Click to log in" />
			<Button
				text="Create Account"
				onPress={() => setPage(Screens.Home)}
				accessibilityLabel="Click to create account"
			/>
			<Text style={{ fontSize: 30 }}>{errorMsg ? <Text>{errorMsg}</Text> : null}</Text>
		</View>
	);
};

export default LoginScreen;
