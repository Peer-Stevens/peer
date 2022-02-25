import React from "react";
import { cleanup, render } from "@testing-library/react-native";
import { useNearbyPlaces } from "../../src/hooks/useNearbyPlaces";
import { PlacePhoto } from "@googlemaps/google-maps-services-js";
import { computeDistanceMi } from "../../src/util/distance";
import { PlaceDetailsWithAccesibilityData } from "../../src/util/placeTypes";
import { PlaceWithAccessibilityData } from "peer-types";
import { useFetchPlace } from "../../src/hooks/useFetchPlace";
import MainScreen from "../../src/screens/MainScreen";

afterEach(cleanup);
jest.useFakeTimers();

// mock distance computation because user location is not available during testing
jest.mock("../../src/util/distance");
const mockDistMi = computeDistanceMi as jest.MockedFunction<typeof computeDistanceMi>;

// mock axios to prevent calls to remote server for nearby places
jest.mock("../../src/hooks/useNearbyPlaces");
const mockNearbyPlaces = useNearbyPlaces as jest.MockedFunction<typeof useNearbyPlaces>;
const mockPhotosField: PlacePhoto[] = [
	{
		photo_reference: "a",
		height: 100,
		width: 100,
		html_attributions: [],
	},
];
const mockPlaces: PlaceWithAccessibilityData[] = [
	{
		name: "The Absolute Best Place in the Whole Wide World",
		formatted_address: "312 Jones Pl",
		photos: mockPhotosField,
		accessibilityData: {
			_id: "andhous",
			spacingAvg: 5,
			guideDogAvg: 5,
			lightingAvg: 5,
			noiseLevelAvg: 5,
			isStaffHelpfulAvg: 1.0,
			isMenuAccessibleAvg: 1.0,
			isBathroomOnEntranceFloorAvg: 1.0,
			isContactlessPaymentOfferedAvg: 1.0,
			isStairsRequiredAvg: 1.0,
			promotion: {
				monthly_budget: 0,
				max_cpc: 0,
			},
		},
	},
	{
		name: "OneDrive Installation Services",
		formatted_address: "95 Lora Ave",
		photos: mockPhotosField,
		accessibilityData: {
			_id: "microsoft",
			spacingAvg: 0,
			guideDogAvg: 0,
			lightingAvg: 0,
			noiseLevelAvg: 0,
			isStaffHelpfulAvg: 0,
			isMenuAccessibleAvg: 0,
			isBathroomOnEntranceFloorAvg: 0,
			isContactlessPaymentOfferedAvg: 0,
			isStairsRequiredAvg: 0,
			promotion: {
				monthly_budget: 0,
				max_cpc: 0,
			},
		},
	},
	{
		name: "East LA",
		formatted_address: "500 Marg Rd",
		photos: undefined,
		accessibilityData: {
			_id: "margs",
			spacingAvg: 2.5,
			guideDogAvg: 2.5,
			lightingAvg: 2.5,
			noiseLevelAvg: 2.5,
			isStaffHelpfulAvg: 0.8,
			isMenuAccessibleAvg: 0.7,
			isBathroomOnEntranceFloorAvg: 0.9,
			isContactlessPaymentOfferedAvg: 0.2,
			isStairsRequiredAvg: 1.0,
			promotion: {
				monthly_budget: 0,
				max_cpc: 0,
			},
		},
	},
];
mockNearbyPlaces.mockReturnValue({ nearbyPlaces: mockPlaces });

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
