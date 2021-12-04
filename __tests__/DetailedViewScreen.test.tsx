import React from "react";
import { cleanup, render, fireEvent, RenderAPI } from "@testing-library/react-native";
import axios, { AxiosResponse } from "axios";
import { useNearbyPlaces } from "../src/hooks/useNearbyPlaces";
import { PlaceWithAccesibilityData } from "../src/util/placeTypes";
import { PlaceDetailsResponseData } from "@googlemaps/google-maps-services-js";
import App from "../App";

const mockNameString = "Julio's OneDrive Installation Services";
const mockAddressString = "123 Microsoft Road";

jest.mock("../src/hooks/useNearbyPlaces");
const mockNearbyPlaces = useNearbyPlaces as jest.MockedFunction<typeof useNearbyPlaces>;

const mockPlaces: PlaceWithAccesibilityData[] = [
	{
		place_id: "oiluj",
		name: mockNameString,
	},
];

jest.mock("axios");
// eslint-disable-next-line @typescript-eslint/unbound-method
const mockGet = axios.get as jest.MockedFunction<typeof axios.get>;

const mockResponseData: Partial<
	AxiosResponse<{ placeDetails: Partial<PlaceDetailsResponseData> }>
> = {
	data: {
		placeDetails: { result: { name: mockNameString, formatted_address: mockAddressString } },
	},
};

let tr: RenderAPI;
beforeEach(() => {
	// mock data
	mockNearbyPlaces.mockReturnValue({ nearbyPlaces: mockPlaces });
	mockGet.mockResolvedValue(mockResponseData);

	// press place name
	tr = render(<App />);
	fireEvent.press(tr.getByText(mockNameString));
});
afterEach(cleanup);

describe("Detailed place screen tests", () => {
	it("should render the name of the place", async () => {
		expect(await tr.findByText(mockNameString)).toBeDefined();
	});

	it("should render the address", async () => {
		const text = await tr.findByText(mockAddressString);

		expect(text).toBeDefined();
	});

	it("should render the go home button", async () => {
		expect(await tr.findByText("Go Home")).toBeDefined();
	});
});
