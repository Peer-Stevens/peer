import React, { useState } from "react";
import { Button } from "../components/Button";
import { View, Text, TextInput } from "react-native";
// import { NavigationScreenProp } from "react-navigation";
import { useNavigation } from "../hooks/useNavigation";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen: React.FC = () => {
	const navigation = useNavigation();
	const [errorMsg, setErrorMsg] = useState("");

	const logInUser = async () => {
		setErrorMsg("");

		const token: string | null = await AsyncStorage.getItem("@auth_token");

		if (token) {
			navigation.navigate("Home");
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
			navigation.navigate("Home");
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
				onPress={() => navigation.navigate("CreateAccount")}
				accessibilityLabel="Click to create account"
			/>
			<Text style={{ fontSize: 30 }}>{errorMsg ? <Text>{errorMsg}</Text> : null}</Text>
		</View>
	);
};

export default LoginScreen;
