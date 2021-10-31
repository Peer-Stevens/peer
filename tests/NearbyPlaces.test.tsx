import React from "react";
import { cleanup, fireEvent, render, RenderAPI } from "@testing-library/react-native";
import App from "../App";
import type { LocationObject } from "expo-location";
import { useLocation } from "../src/components/NearbyPlaces/useLocation";
import { RelativeDirectionOutput, useCompass } from "../src/components/NearbyPlaces/useCompass";
import { useNearbyPlaces } from "../src/components/NearbyPlaces/useNearbyPlaces";
import { PlaceData, PlacePhoto } from "@googlemaps/google-maps-services-js";

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
		dirString: "to your left",
		distanceInFeet: 5.58,
	};
};

// mock nearby places to prevent calls to remote server
jest.mock("../src/components/NearbyPlaces/useNearbyPlaces");
const mockNearbyPlaces = useNearbyPlaces as jest.MockedFunction<typeof useNearbyPlaces>;
const mockPhotosField: PlacePhoto[] = [
	{
		photo_reference: "a",
		height: 100,
		width: 100,
		html_attributions: [],
	},
];
const mockPlaces: Partial<PlaceData & { rating: number }>[] = [
	{
		name: "The Absolute Best Place in the Whole Wide World",
		formatted_address: "312 Jones Pl",
		photos: mockPhotosField,
		rating: 5000,
	},
	{
		name: "OneDrive Installation Services",
		formatted_address: "95 Lora Ave",
		photos: mockPhotosField,
		rating: 0,
	},
	{
		name: "Amplifier and Electric Guitar Appraisal",
		formatted_address: "570 Rotsides Ln",
		photos: undefined,
		rating: 5,
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
});
