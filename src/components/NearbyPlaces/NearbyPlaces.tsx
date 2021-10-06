import React, { useEffect } from "react";
import { Dimensions, Text, View } from "react-native";
import { useLocation } from "./useLocation";
import Location from "expo-location";
import axios from "axios";
import { SERVER_BASE_URL } from "@env";
import type { Place } from "@googlemaps/google-maps-services-js";
import { Button } from "../Button";
// import { TEXT_COLOR } from "../../util/colors";

export const NearbyPlaces: React.FC<{ stopStrolling: () => void }> = ({ stopStrolling }) => {
	const { location } = useLocation();
	const [nearbyPlaces, setNearbyPlaces] = React.useState<Place[]>();

	const getNearbyPlaces = async (location: Location.LocationObject) => {
		const result = await axios.get<{ places: Place[] }>(
			`${SERVER_BASE_URL}/getNearbyPlaces?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`
		);
		setNearbyPlaces(result.data.places);
	};

	useEffect(() => {
		// `void` here means "we don't need `await` because everything is handled in the function"
		if (location && !nearbyPlaces) {
			void getNearbyPlaces(location);
		}
	}, [location]);

	return (
		<View style={{ width: "90%" }}>
			{nearbyPlaces && nearbyPlaces.length > 0 ? (
				<>
					<Text style={{ fontSize: 25 }}>You are walking by </Text>
					{nearbyPlaces.slice(0, 3).map(place => (
						<Text
							key={place.name}
							style={{ fontSize: 25, fontWeight: "bold", lineHeight: 45 }}
						>
							{"\u2022"} {place.name}
						</Text>
					))}
				</>
			) : (
				<Text>Loading...</Text>
			)}
			<View style={{ marginBottom: 15 }}>
				<Button
					onPress={stopStrolling}
					accessibilityLabel="Stop this stroll"
					text="Stop this stroll"
				/>
			</View>
		</View>
	);
};
