import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { useLocation } from "./useLocation";
import Location from "expo-location";
import axios from "axios";
import { SERVER_BASE_URL } from "@env";
import type { Place } from "@googlemaps/google-maps-services-js";

export const NearbyPlaces = ({ onStopStrolling }: { onStopStrolling: () => void }): JSX.Element => {
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

	if (nearbyPlaces && nearbyPlaces.length > 0) {
		return (
			<View>
				<Text>
					You are walking by{" "}
					{nearbyPlaces
						.map(place => place.name)
						.slice(0, 3)
						.join(", ")}
				</Text>
			</View>
		);
	} else return <Text>Loading...</Text>;
};
