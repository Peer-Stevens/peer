import React from "react";
import { cleanup, fireEvent, render, RenderAPI } from "@testing-library/react-native";
import App from "../App";
import type { LocationObject } from "expo-location";
import { useLocation } from "../src/hooks/useLocation";
import { useNearbyPlaces } from "../src/hooks/useNearbyPlaces";
import { RelativeDirectionOutput, useCompass } from "../src/hooks/useCompass";
import { PlaceData } from "@googlemaps/google-maps-services-js";

// mock use location to prevent querying for location data
jest.mock("../src/components/NearbyPlaces/useLocation");
const mockUseLocation = useLocation as jest.MockedFunction<typeof useLocation>;
const mockLocation: LocationObject = {
	coords: {
		latitude: 0,
		longitude: 0,
		altitude: null,
		accuracy: null,
		altitudeAccuracy: null,
		heading: null,
		speed: null,
	},
	timestamp: 0,
};

// mock use compass to prevent querying for compass data
jest.mock("../src/components/NearbyPlaces/useCompass");
const mockUseCompass = useCompass as jest.MockedFunction<typeof useCompass>;
const mockRelativeDirection = (): RelativeDirectionOutput => {
	return {
		absoluteAngle: 0,
		headingToPlaceAngle: 90,
		dirString: "to your right",
		distanceInFeet: 5.58,
	};
};

// mock nearby places to prevent calls to remote server
jest.mock("../src/components/NearbyPlaces/useNearbyPlaces");
const mockNearbyPlaces = useNearbyPlaces as jest.MockedFunction<typeof useNearbyPlaces>;
const mockPlaces: Partial<PlaceData>[] = [
	{
		name: "The Absolute Best Place in the Whole Wide World",
	},
	{
		name: "OneDrive Installation Services",
	},
	{
		name: "Amplifier and Electric Guitar Appraisal",
	},
];

let tr: RenderAPI;
beforeEach(() => {
	mockUseLocation.mockReturnValue({ location: mockLocation });
	mockNearbyPlaces.mockReturnValue({ nearbyPlaces: mockPlaces });
	mockUseCompass.mockReturnValue({ heading: 0, getRelativeDirection: mockRelativeDirection });

	tr = render(<App />);
	// press take a stroll button
	const strollButton = tr.getByText("Take a stroll");
	fireEvent.press(strollButton);
});
afterEach(cleanup);

describe("Nearby places tests", () => {
	it("provides the user a way to stop strolling", () => {
		// Arrange
		const { getByLabelText } = tr;

		// Assert
		expect(getByLabelText("Stop this stroll")).toBeDefined();
	});

	it("displays the name and heading of each place", () => {
		// Arrange
		const { getByText } = tr;

		// Assert
		const namedMockPlaces = mockPlaces.filter(place => place.name);
		for (const mockPlace of namedMockPlaces) {
			if (!mockPlace.name) continue; // cannot happen
			expect(getByText(`\u2022 ${mockPlace.name} is 5.58 feet to your right`)).toBeDefined();
		}
	});
});
