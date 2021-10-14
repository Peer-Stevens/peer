import { PlaceType1 } from "@googlemaps/google-maps-services-js";

/**
 * All of the place types in Google Place's "Place type 1".
 * See: https://developers.google.com/maps/documentation/places/web-service/supported_types#table1
 */
const placeTypes : Array<string> = [];

for (const place in PlaceType1) {
    placeTypes.push(place)
}

export default placeTypes;