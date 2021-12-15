import React from "react";
import { Button } from "../components/Button";
import { View, Text, StyleSheet } from "react-native";
import { Screens } from "./MainScreen";

type LoginScreenProps = { setPage: (screen: Screens) => void };

const NotLoggedIn: React.FC<LoginScreenProps> = ({ setPage }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.text} accessibilityLabel="Welcome to Peer!">
				Welcome to Peer!
			</Text>
			<Text style={styles.text2} accessibilityLabel="Please log in to continue">
				Please log in to continue
			</Text>
			<Button
				style={styles.button}
				text="Log in"
				onPress={() => setPage(Screens.Login)}
				accessibilityLabel="Click to log in"
			/>
			<Button
				style={styles.button}
				text="Create Account"
				onPress={() => setPage(Screens.CreateAccount)}
				accessibilityLabel="Click to create account"
			/>
		</View>
	);
};

export default NotLoggedIn;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		padding: 8,
		backgroundColor: "white",
	},
	button: {
		marginTop: 30,
	},
	text: {
		color: "black",
		margin: 20,
		marginLeft: 0,
		fontSize: 40,
		textAlign: "center",
	},
	text2: {
		color: "black",
		margin: 20,
		marginLeft: 0,
		fontSize: 30,
		textAlign: "center",
	},
});
