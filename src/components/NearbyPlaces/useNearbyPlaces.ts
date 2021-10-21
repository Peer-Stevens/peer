import React, { useEffect } from "react";
import { useLocation } from "./useLocation";
import Location from "expo-location";
import axios from "axios";
import { SERVER_BASE_URL } from "@env";
import type { Place } from "@googlemaps/google-maps-services-js";

export const useNearbyPlaces = (): { nearbyPlaces?: Place[] } => {
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
		if (location) {
			void getNearbyPlaces(location);
		}

		const fetchPlacesInterval = setInterval(() => {
			if (location) void getNearbyPlaces(location);
		}, 10000);

		return () => clearInterval(fetchPlacesInterval);
	}, []);

	return { nearbyPlaces };
};
