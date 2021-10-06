import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { useLocation } from "./useLocation";
import Location from "expo-location";
import axios from "axios";
import { SERVER_BASE_URL } from "@env";
import type { Place } from "@googlemaps/google-maps-services-js";
import { Button } from "../Button";
import { TEXT_COLOR } from "../../util/colors";

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
		<View>
			<View>
				<Button
					onPress={stopStrolling}
					accessibilityLabel="Stop this stroll"
					style={{
						color: TEXT_COLOR,
						backgroundColor: "PRIMARY_COLOR",
						fontWeight: "bold",
					}}
				>
					<Text>Stop This Stroll</Text>
				</Button>
			</View>
			{nearbyPlaces && nearbyPlaces.length > 0 ? (
				<Text>
					You are walking by{" "}
					{nearbyPlaces
						.map(place => place.name)
						.slice(0, 3)
						.join(", ")}
				</Text>
			) : (
				<Text>Loading...</Text>
			)}
		</View>
	);
};
