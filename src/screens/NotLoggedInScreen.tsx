import React, { Dispatch, SetStateAction } from "react";
import { Button } from "../components/Button";
import { View, Text, StyleSheet } from "react-native";
import Screen from "../util/screens";

type NotLoggedInScreenProps = {
	placeID: string | undefined;
	setPage: (screen: Screen) => void;
	setPlaceID: Dispatch<SetStateAction<string | undefined>>;
	goToDetails: () => void;
};

const NotLoggedInScreen: React.FC<NotLoggedInScreenProps> = ({
	setPage,
	placeID,
	setPlaceID,
	goToDetails,
}) => {
	const setPageAndDetails = () => {
		goToDetails();
		if (placeID) {
			setPlaceID(placeID);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.text} accessibilityLabel="Please log in to leave a rating">
				Please log in to leave a rating
			</Text>
			<Button
				style={styles.button}
				text="Log in"
				onPress={() => setPage(Screen.Login)}
				accessibilityLabel="Click to log in"
			/>
			<Button
				style={styles.button}
				text="Create Account"
				onPress={() => setPage(Screen.CreateAccount)}
				accessibilityLabel="Click to create account"
			/>
			<Button
				style={styles.button}
				text="Back to previous page"
				onPress={() => setPageAndDetails()}
				accessibilityLabel="Click to go back to previous page"
			/>
		</View>
	);
};

export default NotLoggedInScreen;

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
});
