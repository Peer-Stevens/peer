import { LocationType, Place } from "@googlemaps/google-maps-services-js";
import { cleanup, render, RenderAPI } from "@testing-library/react-native";
import React from "react";
import { View, Text } from "react-native";
import { useCompass } from "../src/hooks/useCompass";
import { LocationObject } from "expo-location";

afterEach(cleanup);

const mockPlace: Place = {
	name: "Eiffel Tower",
	geometry: {
		location_type: LocationType.APPROXIMATE,
		location: { lat: 48.85848994432945, lng: 2.294498241775167 },
		viewport: { northeast: { lat: 48, lng: 2 }, southwest: { lat: 49, lng: 3 } },
		bounds: { northeast: { lat: 48, lng: 2 }, southwest: { lat: 49, lng: 3 } },
	},
};

// near the eiffel tower, south of it
const mockLocation: LocationObject = {
	coords: {
		latitude: 48.85673627371885,
		longitude: 2.2934672750925396,
		altitude: null,
		accuracy: null,
		altitudeAccuracy: null,
		heading: 10,
		speed: null,
	},
	timestamp: 0,
};

jest.spyOn(React, "useState").mockImplementation(() => [
	10,
	() => {
		return;
	},
]);
const CompassComponent = () => {
	const { heading, getRelativeDirection } = useCompass();
	const relDir = getRelativeDirection({ userLocation: mockLocation, place: mockPlace });
	return (
		<View>
			<Text testID="heading">Heading: {heading}</Text>
			<Text testID="abs-angle">Absolute angle: {relDir?.absoluteAngle}</Text>
			<Text testID="heading-to-place">
				Heading to place angle: {relDir?.headingToPlaceAngle}
			</Text>
			<Text testID="dir-string">Dir string: {relDir?.dirString}</Text>
		</View>
	);
};

let testRenderer: RenderAPI;
beforeEach(() => {
	testRenderer = render(<CompassComponent />);
});

describe("useCompass tests", () => {
	it("should return a heading", () => {
		// Arrange
		const headingAsNum = Number(testRenderer.getByTestId("heading").children[1] as string);

		// Assert
		expect(headingAsNum).toEqual(10);
	});

	/*
	Computation performed by useCompass, done by hand for reference for the following
	tests.

	adjacent = 48.85848994432945 - 48.85673627371885 = 0.0017536706105971689
	opposite = 2.294498241775167 - 2.2934672750925396 = 0.0010309666826273656
	absoluteAngle = Math.atan2(adjacent, opposite) * (180 / Math.PI) = 59.54912458782186
	positiveAbsAngle = absoluteAngle < 0 ? absoluteAngle + 360 : absoluteAngle = 59.54912458782186
	angleFromNorth = positiveAbsAngle - 90 = -30.450875412178142
	cwAngle = 360 - angleFromNorth = 390.45087541217816
	differenceBetweenAngles = Math.abs(Math.round((360 + cwAngle - heading) % 360)) = 20
	*/

	it("should return the absolute angle between the place and the user's heading", () => {
		// Arrange
		const angleAsNum = Number(testRenderer.getByTestId("abs-angle").children[1] as string);

		// Assert
		expect(angleAsNum).toBeCloseTo(390.45087541217816);
	});

	it("should return the angle between the user's heading and the place", () => {
		// Arrange
		const betweenAngleAsNum = Number(
			testRenderer.getByTestId("heading-to-place").children[1] as string
		);

		// Assert
		expect(betweenAngleAsNum).toEqual(20);
	});

	it("should return some text representing the heading between the user and the place", () => {
		// Arrange
		const dirText = testRenderer.getByTestId("dir-string").children[1] as string;

		// Assert
		expect(dirText).toEqual("ahead of you");
	});
});
