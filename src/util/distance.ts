export type CoordinatePair = {
	latitude?: number;
	longitude?: number;
};

const feetPerDegree = 362751.84;
const feetPerMi = 5279.9869;

/**
 * Computes the distance in feet between two coordinate pairs.
 * Returns undefined if any argument is undefined.
 * Inaccurate for distances beyond the scale of 1 mile.
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
	const distanceInFeet = Math.round(degreeDistance * feetPerDegree);

	return distanceInFeet;
};

/**
 * Computes the distance in miles between two coordinate pairs.
 * Returns undefined if any argument is undefined.
 * Inaccurate for use beyond the scale of 1000 feet.
 * @param pair1 the first coordinate pair
 * @param pair2 the second coordinate pair
 * @returns distance in miles
 */
export const computeDistanceMi = (
	pair1: CoordinatePair,
	pair2: CoordinatePair
): number | undefined => {
	const distanceInFeet = computeDistanceFeet(pair1, pair2);
	return distanceInFeet ? distanceInFeet / feetPerMi : undefined;
};
