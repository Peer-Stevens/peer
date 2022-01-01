import React, { Dispatch, SetStateAction } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "../components/Button";

type SubmitRatingScreenProps = {
	placeID: string | undefined;
	setPlaceID: Dispatch<SetStateAction<string | undefined>>;
	goToDetails: () => void;
};

const SubmitRatingScreen: React.FC<SubmitRatingScreenProps> = ({
	setPlaceID,
	placeID,
	goToDetails,
}) => {
	const setPageAndDetails = () => {
		goToDetails();
		if (placeID) {
			setPlaceID(placeID);
		}
	};

	//Will need to remain ugly right now; TODO in https://github.com/Peer-Stevens/peer/issues/171
	return (
		<View>
			<Button
				style={styles.button}
				text="Back to previous page"
				onPress={() => setPageAndDetails()}
				accessibilityLabel="Click to go back to previous page"
			/>
		</View>
	);
};

export default SubmitRatingScreen;

const styles = StyleSheet.create({
	button: {
		marginTop: 30,
	},
});
