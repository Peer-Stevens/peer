import React from "react";
import { cleanup, fireEvent, render, RenderAPI } from "@testing-library/react-native";
import type { LocationObject } from "expo-location";
import { useLocation } from "../../src/hooks/useLocation";
import { useNearbyPlaces, BusinessStatus } from "../../src/hooks/useNearbyPlaces";
import { RelativeDirectionOutput, useCompass } from "../../src/hooks/useCompass";
import { computeDistanceFeet } from "../../src/util/distance";
import {
	PlaceDetailsWithAccesibilityData,
	PlaceWithAccesibilityData,
} from "../../src/util/placeTypes";
import { useFetchPlace } from "../../src/hooks/useFetchPlace";
import MainScreen from "../../src/screens/MainScreen";

// mock use location to prevent querying for location data
jest.mock("../../src/hooks/useLocation");
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
jest.mock("../../src/hooks/useCompass");
const mockUseCompass = useCompass as jest.MockedFunction<typeof useCompass>;
const mockRelativeDirection = (): RelativeDirectionOutput => {
	return {
		absoluteAngle: 0,
		headingToPlaceAngle: 90,
		dirString: "to your right",
	};
};

// mock compute distance because user location is nonsense
jest.mock("../../src/util/distance.ts");
const mockComputeDistance = computeDistanceFeet as jest.MockedFunction<typeof computeDistanceFeet>;
const mockDistance = 5.58;

// mock nearby places to prevent calls to remote server
jest.mock("../../src/hooks/useNearbyPlaces");
const mockNearbyPlaces = useNearbyPlaces as jest.MockedFunction<typeof useNearbyPlaces>;
const mockPlaces: Partial<PlaceWithAccesibilityData>[] = [
	{
		name: "The Absolute Best Place in the Whole Wide World",
		business_status: BusinessStatus.OPERATIONAL,
	},
	{
		name: "OneDrive Installation Services",
		business_status: BusinessStatus.OPERATIONAL,
	},
	{
		name: "Amplifier and Electric Guitar Appraisal",
		business_status: BusinessStatus.OPERATIONAL,
	},
];

jest.mock("../../src/hooks/useFetchPlace");
const mockUseFetchPlace = useFetchPlace as jest.MockedFunction<typeof useFetchPlace>;

const mockPlaceDetails: PlaceDetailsWithAccesibilityData = {
	result: {
		place_id: "oiluj",
	},
};

mockUseFetchPlace.mockReturnValue({
	placeDetails: mockPlaceDetails,
	isLoading: false,
});

let tr: RenderAPI;
beforeEach(() => {
	mockUseLocation.mockReturnValue({ location: mockLocation });
	mockNearbyPlaces.mockReturnValue({ nearbyPlaces: mockPlaces });
	mockUseCompass.mockReturnValue({ heading: 0, getRelativeDirection: mockRelativeDirection });
	mockComputeDistance.mockReturnValue(mockDistance);

	tr = render(<MainScreen />);
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
			expect(
				getByText(
					`\u2022 ${mockPlace.name} is 5.58 feet to your right and has no accessibility ratings.`
				)
			).toBeDefined();
		}
	});
});
