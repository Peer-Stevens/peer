import React, { useEffect } from "react";
import { Text } from "react-native";
import { useLocation } from "./useLocation";
import Location from "expo-location";
import axios from "axios";

export const NearbyPlaces = () => {
	const { location } = useLocation()
	const [nearbyPlaces, setNearbyPlaces] = React.useState<any>();

	const getNearbyPlaces = async (location: Location.LocationObject) => {
		const result = await axios.get(
			process.env.SERVER_BASE_URL! +
				`/getNearbyPlaces?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`
		);
		setNearbyPlaces(result);
	};

	useEffect(() => {
		// `void` here means "we don't need `await` because everything is handled in the function"
		if (location && !nearbyPlaces) {
			void getNearbyPlaces(location);
		}
	}, [location]);

	return <Text>{JSON.stringify(nearbyPlaces)}</Text>;
};
