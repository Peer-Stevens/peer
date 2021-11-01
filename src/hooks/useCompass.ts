import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { UserPlaceComparisonInput } from "../util/distance";

export type RelativeDirectionOutput = {
	absoluteAngle: number;
	headingToPlaceAngle: number;
	dirString: string;
	distanceInFeet: number;
};

export const useCompass = (): {
	heading: number | undefined;
	getRelativeDirection: (arg: UserPlaceComparisonInput) => RelativeDirectionOutput | undefined;
} => {
	const [heading, setHeading] = useState<number>();

	useEffect(() => {
		let headingSubscription:
			| {
					remove(): void;
			  }
			| undefined;

		(async () => {
			headingSubscription = await Location.watchHeadingAsync(compassReading =>
				setHeading(compassReading.trueHeading)
			);
		})();

		return () => {
			if (headingSubscription) {
				void headingSubscription.remove();
			}
		};
	}, []);

	const getRelativeDirection = ({
		userLocation,
		place,
	}: UserPlaceComparisonInput): RelativeDirectionOutput | undefined => {
		if (!heading || !userLocation || !place || !place.geometry) return undefined;

		const { latitude, longitude } = userLocation.coords;
		const { lat: placeLat, lng: placeLng } = place.geometry.location;

		const adjacent = placeLat - latitude;
		const opposite = placeLng - longitude;

		const degreeDistance = Math.sqrt(adjacent ** 2 + opposite ** 2);
		const distanceInFeet = Math.round(degreeDistance * 362751.84);

		// find the angle from the positive x axis to the place
		const absoluteAngle = Math.atan2(adjacent, opposite) * (180 / Math.PI);

		// make the -181 to 180 range into 0 to 360 to match the heading range
		const positiveAbsAngle = absoluteAngle < 0 ? absoluteAngle + 360 : absoluteAngle;

		// adjust the 0-degree mark from the positive-x axis (east) to the positive-y axis (north) to match the heading 0-degree mark
		const angleFromNorth = positiveAbsAngle - 90;

		// convert the angle to clockwise to match the heading direction
		const cwAngle = 360 - angleFromNorth;

		// find the relative direction based on the heading
		const differenceBetweenAngles = Math.abs(Math.round((360 + cwAngle - heading) % 360));

		return {
			absoluteAngle: cwAngle,
			headingToPlaceAngle: differenceBetweenAngles,
			dirString: getAbsDirection(differenceBetweenAngles),
			distanceInFeet,
		};
	};

	return { heading, getRelativeDirection };
};

const getAbsDirection = (angle: number) => {
	// based on the Math.tan calculation above, **0 is directly to the left**
	// there are two separate ranges for ahead, 337.5 to 360 and 0 to 22.5, so it's easiest to use it as the default
	let absDirection = "ahead of you";
	if (angle >= 22.5 && angle < 67.5) absDirection = "ahead to your right";
	else if (angle >= 67.5 && angle < 112.5) absDirection = "to your right";
	else if (angle >= 112.5 && angle < 157.5) absDirection = "behind to your right";
	else if (angle >= 157.5 && angle < 202.5) absDirection = "behind you";
	else if (angle >= 202.5 && angle < 247.5) absDirection = "behind to your left";
	else if (angle >= 247.5 && angle < 292.5) absDirection = "to your left";
	else if (angle >= 292.5 && angle < 337.5) absDirection = "ahead to your left";

	return absDirection;
};
