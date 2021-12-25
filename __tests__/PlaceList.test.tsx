import React from "react";
import { cleanup, render } from "@testing-library/react-native";
import { useNearbyPlaces } from "../src/hooks/useNearbyPlaces";
import { PlacePhoto } from "@googlemaps/google-maps-services-js";
import { computeDistanceMi } from "../src/util/distance";
import { PlaceWithAccesibilityData } from "../src/util/placeTypes";
import MainScreen from "../src/screens/MainScreen";

afterEach(cleanup);
jest.useFakeTimers();

// mock distance computation because user location is not available during testing
jest.mock("../src/util/distance");
const mockDistMi = computeDistanceMi as jest.MockedFunction<typeof computeDistanceMi>;

// mock axios to prevent calls to remote server for nearby places
jest.mock("../src/hooks/useNearbyPlaces");
const mockNearbyPlaces = useNearbyPlaces as jest.MockedFunction<typeof useNearbyPlaces>;
const mockPhotosField: PlacePhoto[] = [
	{
		photo_reference: "a",
		height: 100,
		width: 100,
		html_attributions: [],
	},
];
const mockPlaces: PlaceWithAccesibilityData[] = [
	{
		name: "The Absolute Best Place in the Whole Wide World",
		formatted_address: "312 Jones Pl",
		photos: mockPhotosField,
		accessibilityData: {
			_id: "andhous",
			avgBraille: 5,
			avgFontReadability: 5,
			avgGuideDogFriendly: 5,
			avgNavigability: 5,
			avgStaffHelpfulness: 5,
		},
	},
	{
		name: "OneDrive Installation Services",
		formatted_address: "95 Lora Ave",
		photos: mockPhotosField,
		accessibilityData: {
			_id: "microsoft",
			avgBraille: 0,
			avgFontReadability: 0,
			avgGuideDogFriendly: 0,
			avgNavigability: 0,
			avgStaffHelpfulness: 0,
		},
	},
	{
		name: "East LA",
		formatted_address: "500 Marg Rd",
		photos: undefined,
		accessibilityData: {
			_id: "margs",
			avgBraille: 3.5,
			avgFontReadability: 3.5,
			avgGuideDogFriendly: 3.5,
			avgNavigability: 3.5,
			avgStaffHelpfulness: 3.5,
		},
	},
];
mockNearbyPlaces.mockReturnValue({ nearbyPlaces: mockPlaces });

describe("Place list tests", () => {
	it("renders the place name", () => {
		// Arrange
		const { getByText } = render(<MainScreen />);

		// Assert
		for (const mockPlace of mockPlaces) {
			if (!mockPlace.name) continue; // should never happen
			expect(getByText(mockPlace.name)).toBeDefined();
		}
	});

	it("renders the place address", () => {
		// Arrange
		const { getByText } = render(<MainScreen />);

		// Assert
		for (const mockPlace of mockPlaces) {
			if (!mockPlace.formatted_address) continue; // should never happen
			expect(getByText(mockPlace.formatted_address)).toBeDefined();
		}
	});

	it("renders the place rating", () => {
		// Arrange
		const { getByText } = render(<MainScreen />);

		// Assert
		expect(getByText("Rating: 5/5")).toBeDefined();
		expect(getByText("Rating: 3.5/5")).toBeDefined();
		expect(getByText("Rating: 0/5")).toBeDefined();
	});

	it("does not render text other than the place name, address, or rating", () => {
		// Arrange
		const { queryByText } = render(<MainScreen />);

		// Assert
		expect(queryByText("Null Island")).toBeNull();
		expect(queryByText("000 Undefined Dr")).toBeNull();
		expect(queryByText("Rating: -1/5")).toBeNull();
	});

	it("renders an image when the photo reference field is defined", () => {
		// Arrange
		const { getByLabelText } = render(<MainScreen />);
		const photoFullMockPlaces = mockPlaces.filter(place => place.photos);

		// Assert
		for (const mockPlace of photoFullMockPlaces) {
			if (!mockPlace?.name) continue;
			expect(getByLabelText(`Image of ${mockPlace.name}`)).toBeDefined();
		}
	});

	it("renders an icon when the photo reference field is undefined", () => {
		// Arrange
		const { getByLabelText } = render(<MainScreen />);
		const photoLessMockPlaces = mockPlaces.filter(place => !place.photos);

		// Assert
		for (const mockPlace of photoLessMockPlaces) {
			if (!mockPlace?.name) continue;
			expect(getByLabelText(`No image available for ${mockPlace.name}`)).toBeDefined();
		}
	});

	it("renders the text stating how far away a location is from the user", () => {
		// Arrange
		const distances = [0.13, 0.41, 0.34];
		for (const distance of distances) {
			mockDistMi.mockReturnValueOnce(distance);
		}
		const { getByText } = render(<MainScreen />);

		// Assert
		expect(getByText("0.13 mi away")).toBeDefined();
		expect(getByText("0.41 mi away")).toBeDefined();
		expect(getByText("0.34 mi away")).toBeDefined();
	});

	it("does not render incorrect text about distance away", () => {
		// Arrange
		mockDistMi.mockReturnValue(21);
		const { queryByText } = render(<MainScreen />);

		// Assert
		expect(queryByText("9001 mi away")).toBeNull();
	});

	it("renders text stating how far the location is with an accessibility label", () => {
		// Arrange
		const distances = [0.13, 0.41, 0.34];
		for (const distance of distances) {
			mockDistMi.mockReturnValueOnce(distance);
		}
		const { getByLabelText } = render(<MainScreen />);

		// Assert
		expect(getByLabelText("0.13 miles away")).toBeDefined();
		expect(getByLabelText("0.41 miles away")).toBeDefined();
		expect(getByLabelText("0.34 miles away")).toBeDefined();
	});

	it("renders a loading indicator when no places are available", () => {
		mockNearbyPlaces.mockReturnValueOnce({ nearbyPlaces: undefined });
		const { queryByLabelText } = render(<MainScreen />);

		expect(queryByLabelText("List of places nearby is still loading")).not.toBeNull();
	});
});
