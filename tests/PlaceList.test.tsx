import React from "react";
import { cleanup, render } from "@testing-library/react-native";
import { useNearbyPlaces } from "../src/hooks/useNearbyPlaces";
import { PlaceData, PlacePhoto } from "@googlemaps/google-maps-services-js";
import App from "../App";

afterEach(cleanup);
jest.useFakeTimers();

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

describe("Place list tests", () => {
	it("renders the place name", () => {
		// Arrange
		mockNearbyPlaces.mockReturnValue({ nearbyPlaces: mockPlaces });
		const { getByText } = render(<App />);

		// Assert
		for (const mockPlace of mockPlaces) {
			if (!mockPlace.name) continue; // should never happen
			expect(getByText(mockPlace.name)).toBeDefined();
		}
	});

	it("renders the place address", () => {
		// Arrange
		mockNearbyPlaces.mockReturnValue({ nearbyPlaces: mockPlaces });
		const { getByText } = render(<App />);

		// Assert
		for (const mockPlace of mockPlaces) {
			if (!mockPlace.formatted_address) continue; // should never happen
			expect(getByText(mockPlace.formatted_address)).toBeDefined();
		}
	});

	it("renders the place rating", () => {
		// Arrange
		mockNearbyPlaces.mockReturnValue({ nearbyPlaces: mockPlaces });
		const { getAllByText } = render(<App />);

		// Assert
		// TODO: use mock place's rating field, and getByText instead of getAll
		expect(getAllByText("Rating: 0/5")).toHaveLength(mockPlaces.length);
	});

	it("does not render text other than the place name, address, or rating", () => {
		// Arrange
		mockNearbyPlaces.mockReturnValue({ nearbyPlaces: mockPlaces });
		const { queryByText } = render(<App />);

		// Assert
		expect(queryByText("Null Island")).toBeNull();
		expect(queryByText("000 Undefined Dr")).toBeNull();
		expect(queryByText("Rating: -1/5")).toBeNull();
	});

	it("renders an image when the photo reference field is defined", () => {
		// Arrange
		mockNearbyPlaces.mockReturnValue({ nearbyPlaces: mockPlaces });
		const { getByLabelText } = render(<App />);
		const photoFullMockPlaces = mockPlaces.filter(place => place.photos);

		// Assert
		for (const mockPlace of photoFullMockPlaces) {
			if (!mockPlace?.name) continue;
			expect(getByLabelText(`Image of ${mockPlace.name}`)).toBeDefined();
		}
	});

	it("renders an icon when the photo reference field is undefined", () => {
		// Arrange
		mockNearbyPlaces.mockReturnValue({ nearbyPlaces: mockPlaces });
		const { getByLabelText } = render(<App />);
		const photoLessMockPlaces = mockPlaces.filter(place => !place.photos);

		// Assert
		for (const mockPlace of photoLessMockPlaces) {
			if (!mockPlace?.name) continue;
			expect(getByLabelText(`No image available for ${mockPlace.name}`)).toBeDefined();
		}
	});
});
