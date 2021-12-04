//This is where we will be displaying the information of each single place
import React, { useState, useEffect, useMemo } from "react";
import { StyleSheet, Dimensions, View, Text, ActivityIndicator } from "react-native";
import axios from "axios";
import { computeDistanceMi } from "../util/distance";
import { SERVER_BASE_URL } from "../util/env";
import { useLocation } from "../hooks/useLocation";
import { PlaceDetailsResponseData } from "@googlemaps/google-maps-services-js";
import { Button } from "../components/Button";
import { TEXT_COLOR } from "../util/colors";

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

	const { location } = useLocation();
	const userCoords = {
		latitude: location?.coords.latitude,
		longitude: location?.coords.longitude,
	};

	const placeCoord = {
		latitude: placeDetails?.placeDetails.result.geometry?.location.lat,
		longitude: placeDetails?.placeDetails.result.geometry?.location.lng,
	};
	const placeCoords = { latitude: placeCoord.latitude, longitude: placeCoord.longitude };

	const distanceInMi = useMemo<string | undefined>(
		() => computeDistanceMi(userCoords, placeCoords)?.toPrecision(2),
		[userCoords, placeCoords]
	);

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

	if (placeDetails) {
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
				<Button
					style={styles.homeBtn}
					onPress={setPage}
					accessibilityLabel="Return to Home Page"
					text="Go Home"
				/>
			</View>
		);
	} else {
		return (
			<View
				style={{
					height: Dimensions.get("window").height,
					display: "flex",
					justifyContent: "center",
				}}
			>
				<ActivityIndicator size="large" color="#000000" />
			</View>
		);
	}
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
	homeBtn: {
		borderWidth: 3,
		borderColor: TEXT_COLOR,
		width: Dimensions.get("window").width * 0.9,
		alignSelf: "center",
	},
});

export default PlaceDetailed;
