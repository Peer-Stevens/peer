import { PlaceType1 } from "@googlemaps/google-maps-services-js";

/**
 * Turns a snake case string into one that has the
 * first word capitalized and all underscores replaced with
 * spaces.
 *
 * Example:
 * snakeCaseToFirstWordCap("foo_bar") === "Foo bar"
 * @param str a string
 * @returns the reformatted string
 */
 const snakeCaseToFirstWordCap = (str: string) => {
	let new_string = str;
	new_string = new_string[0].toLocaleUpperCase() + new_string.slice(1);
	new_string = new_string.replace(/_/g, () => " ");
	return new_string;
};

/**
 * All of the place types in Google Place's "Place type 1".
 * See: https://developers.google.com/maps/documentation/places/web-service/supported_types#table1
 */
const placeTypes: Array<string> = [];

for (const place in PlaceType1) {
	placeTypes.push(snakeCaseToFirstWordCap(place));
}

export default placeTypes;
