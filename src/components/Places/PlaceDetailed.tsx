//This is where we will be displaying the information of each single place
import React, { useState, useEffect, useMemo } from "react";
import { StyleSheet, Dimensions, View, Text, Button } from "react-native";
import axios from "axios";
import { computeDistanceMi } from "../../util/distance";
import { SERVER_BASE_URL } from "../../util/env";
import { useLocation } from "../../hooks/useLocation";
import { PlaceDetailsResponseData } from "@googlemaps/google-maps-services-js";

export interface PlaceProps {
	place?: string;
	avg?: number;
	address?: string;
	photoref?: string;
	placeID?: string;
	setPage: () => void;
}

const PlaceDetailed: React.FC<PlaceProps> = ({ setPage, placeID }: PlaceProps) => {
	const [placeDetails, setPlaceDetails] = useState<{ placeDetails: PlaceDetailsResponseData }>();

	//get user location for future reference
	const { location } = useLocation();
	const userCoords = {
		latitude: location?.coords.latitude,
		longitude: location?.coords.longitude,
	};

	//get place coordinates for future reference
	const placeCoord = {
		latitude: placeDetails?.placeDetails.result.geometry?.location.lat,
		longitude: placeDetails?.placeDetails.result.geometry?.location.lng,
	};
	const placeCoords = { latitude: placeCoord.latitude, longitude: placeCoord.longitude };

	//calculate distance between user and place
	const distanceInMi = useMemo<string | undefined>(
		() => computeDistanceMi(userCoords, placeCoords)?.toPrecision(2),
		[userCoords, placeCoords]
	);

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
	}, [placeID]);

	return (
		<View style={styles.border}>
			<Text ellipsizeMode="tail" numberOfLines={2} style={styles.title}>
				{placeDetails?.placeDetails.result.name}
			</Text>
			<Text ellipsizeMode="tail" numberOfLines={2} style={styles.text}>
				{placeDetails?.placeDetails.result.formatted_address}
			</Text>
			<Text
				accessibilityLabel={distanceInMi ? `${distanceInMi} miles away` : ""}
				style={styles.text}
			>
				{distanceInMi ? `${distanceInMi} mi away` : ""}
			</Text>
			<Button onPress={setPage} title="Home" />
		</View>
	);
};

const styles = StyleSheet.create({
	border: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
		borderWidth: 3,
		borderColor: "black",
		justifyContent: "space-evenly",
		alignSelf: "center",
	},
	title: {
		fontSize: 35,
		textAlign: "center",
		fontWeight: "bold",
	},
	text: {
		textAlign: "center",
		fontSize: 30,
	},
});

export default PlaceDetailed;
