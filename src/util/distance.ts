import * as Location from "expo-location";
import { Place } from "@googlemaps/google-maps-services-js";

export type UserPlaceComparisonInput = {
	userLocation: Location.LocationObject;
	place: Place;
};

export const computeDistance = ({
	userLocation,
	place,
}: UserPlaceComparisonInput): number | undefined => {
	if (!userLocation || !place || !place.geometry) return undefined;

	const { latitude, longitude } = userLocation.coords;
	const { lat: placeLat, lng: placeLng } = place.geometry.location;

	const adjacent = placeLat - latitude;
	const opposite = placeLng - longitude;

	const degreeDistance = Math.sqrt(adjacent ** 2 + opposite ** 2);
	const distanceInFeet = Math.round(degreeDistance * 362751.84);

	return distanceInFeet;
};
