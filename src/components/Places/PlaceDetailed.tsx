//This is where we will be displaying the information of each single place
import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, View, Text, Button } from "react-native";
import axios from "axios";
import { SERVER_BASE_URL } from "../../util/env";
import { PlaceDetailsResponseData } from "@googlemaps/google-maps-services-js";

export interface PlaceProps {
	place?: string;
	avg?: number;
	address?: string;
	photoref?: string;
	placeID?: string;
	setPage: () => void;
}

// const [placeDetails, setPlaceDetails] = useState<{ placeDetails: PlaceDetailsResponseData }>();

// //useffect to make an axios request to the server
// const getPlaceDetails = async (placeID: string) => {
// 	const result = await axios.get<{ placeDetails: PlaceDetailsResponseData }>(
// 		`${SERVER_BASE_URL}/getPlaceDetails/${placeID}`
// 	);
// 	setPlaceDetails(result.data)
// }

// useEffect(() => {
// 	// `void` here means "we don't need `await` because everything is handled in the function"
// 	if (placeID) {
// 		getPlaceDetails(placeID)
// 	}
// }, [location]);

const PlaceDetailed: React.FC<PlaceProps> = ({ setPage, placeID }: PlaceProps) => {
	const [placeDetails, setPlaceDetails] = useState<{ placeDetails: PlaceDetailsResponseData }>();

	//useffect to make an axios request to the server
	const getPlaceDetails = async (placeID: string) => {
		const result = await axios.get<{ placeDetails: PlaceDetailsResponseData }>(
			`${SERVER_BASE_URL}/getPlaceDetails/${placeID}`
		);
		setPlaceDetails(result.data);
	};

	useEffect(() => {
		(async () => {
			if (placeID) {
				await getPlaceDetails(placeID);
			}
		})();
	}, [placeDetails]);

	return (
		<View style={styles.border}>
			<Text>Detailed view of any specific location</Text>
			<Text>{placeID}</Text>
			<Text>{placeDetails}</Text>
			<Button onPress={setPage} title="Home" />
		</View>
	);
};

const styles = StyleSheet.create({
	border: {
		width: Dimensions.get("window").width * 0.9,
		height: Dimensions.get("window").height * 0.9,
		borderWidth: 3,
		borderColor: "black",
		justifyContent: "center",
	},
	text: {
		textAlign: "center",
	},
});

export default PlaceDetailed;
