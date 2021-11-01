export type CoordinatePair = {
	latitude?: number;
	longitude?: number;
};

/**
 * Computes the distance in feet between two coordinate pairs.
 * Returns undefined if any argument is undefined.
 * @param pair1 the first coordinate pair
 * @param pair2 the second coordinate pair
 * @returns distance in feet
 */
export const computeDistanceFeet = (
	pair1: CoordinatePair,
	pair2: CoordinatePair
): number | undefined => {
	if (!pair1.latitude || !pair1.longitude || !pair2.latitude || !pair2.longitude)
		return undefined;

	const adjacent = pair2.latitude - pair1.latitude;
	const opposite = pair2.longitude - pair1.longitude;

	const degreeDistance = Math.sqrt(adjacent ** 2 + opposite ** 2);
	const distanceInFeet = Math.round(degreeDistance * 362751.84);

	return distanceInFeet;
};

/**
 * Computes the distance in miles between two coordinate pairs.
 * Returns undefined if any argument is undefined.
 * @param pair1 the first coordinate pair
 * @param pair2 the second coordinate pair
 * @returns distance in miles
 */
export const computeDistanceMi = (
	pair1: CoordinatePair,
	pair2: CoordinatePair
): number | undefined => {
	const distanceInFeet = computeDistanceFeet(pair1, pair2);
	return distanceInFeet ? distanceInFeet / 5279.9869 : undefined;
};
