import React, { Dispatch, SetStateAction } from "react";
import { Button } from "../components/Button";
import { View, Text, StyleSheet } from "react-native";
import { Screens } from "./MainScreen";

type NotLoggedInScreenProps = {
	placeID: string | undefined;
	setPage: (screen: Screens) => void;
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
				onPress={() => setPage(Screens.Login)}
				accessibilityLabel="Click to log in"
			/>
			<Button
				style={styles.button}
				text="Create Account"
				onPress={() => setPage(Screens.CreateAccount)}
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
	// text2: {
	// 	color: "black",
	// 	margin: 20,
	// 	marginLeft: 0,
	// 	fontSize: 30,
	// 	textAlign: "center",
	// },
});
