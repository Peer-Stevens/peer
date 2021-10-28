import React, { useEffect } from "react";
import { useLocation } from "./useLocation";
import { LocationObject } from "expo-location";
import axios from "axios";
import type { Place } from "@googlemaps/google-maps-services-js";
import { SERVER_BASE_URL } from "../../util/env";

/**
 * Returns true if the two locations have the same latitude and longitude. Returns false
 * if one of the locations is undefined.
 * @param a a location or undefined
 * @param b a location or undefined
 * @returns whether or not they are the same place
 */
const hasSameCoordinates = (a?: LocationObject, b?: LocationObject): boolean => {
	if (!a || !b) return false;
	const isApprox = (a: number, b: number, eps: number): boolean => {
		return Math.abs(a - b) < eps;
	};

	const eps = Math.pow(10, -9);
	return (
		isApprox(a.coords.latitude, b.coords.latitude, eps) &&
		isApprox(a.coords.longitude, b.coords.longitude, eps)
	);
};

export const useNearbyPlaces = (): { nearbyPlaces?: Place[] } => {
	const { location } = useLocation();
	const lastLocationRef = React.useRef<LocationObject | undefined>(location);
	const [nearbyPlaces, setNearbyPlaces] = React.useState<Place[]>();

	const getNearbyPlaces = async (location: LocationObject) => {
		if (hasSameCoordinates(location, lastLocationRef.current)) return;
		const result = await axios.get<{ places: Place[] }>(
			`${SERVER_BASE_URL}/getNearbyPlaces?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`
		);
		lastLocationRef.current = location;
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
