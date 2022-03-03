import React, { useEffect } from "react";
import { useLocation } from "./useLocation";
import { LocationObject } from "expo-location";
import axios from "axios";
import { SERVER_BASE_URL } from "../util/env";
import type { PlaceWithA11yData } from "peer-types";

export enum BusinessStatus {
	OPERATIONAL = "OPERATIONAL",
	CLOSED_TEMPORARILY = "CLOSED_TEMPORARILY",
	CLOSED_PERMANENTLY = "CLOSED_PERMANENTLY",
}

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

export const useNearbyPlaces = (placeType?: string): { nearbyPlaces?: PlaceWithA11yData[] } => {
	const { location } = useLocation();
	const lastLocationRef = React.useRef<LocationObject | undefined>(undefined);
	const placeTypeRef = React.useRef<string | undefined>(undefined);
	const [nearbyPlaces, setNearbyPlaces] = React.useState<PlaceWithA11yData[]>();

	const getNearbyPlaces = async (location: LocationObject) => {
		if (
			hasSameCoordinates(location, lastLocationRef.current) &&
			(placeType === placeTypeRef.current || placeType === undefined) // empty string is falsy, have to explicitly compare to undefined
		) {
			return;
		}
		setNearbyPlaces(undefined);
		const result = await axios.get<{ places: PlaceWithA11yData[] }>(
			`${SERVER_BASE_URL}/getNearbyPlaces?latitude=${location.coords.latitude}&longitude=${
				location.coords.longitude
			}&includeRatings=true${placeType ? `&type=${placeType}` : ""}`
		);
		lastLocationRef.current = location;
		placeTypeRef.current = placeType;
		const active_places = result.data.places.filter(
			place => place.business_status === BusinessStatus.OPERATIONAL
		);
		setNearbyPlaces(active_places);
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
	}, [location, placeType]);

	return { nearbyPlaces };
};
