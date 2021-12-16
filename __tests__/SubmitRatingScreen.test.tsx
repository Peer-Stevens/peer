import React from "react";
import { cleanup, render, fireEvent, RenderAPI } from "@testing-library/react-native";
import axios, { AxiosResponse } from "axios";
import { useNearbyPlaces } from "../src/hooks/useNearbyPlaces";
import { useFetchPlace } from "../src/hooks/useFetchPlace";
import {
	PlaceDetailsWithAccesibilityData,
	PlaceWithAccesibilityData,
} from "../src/util/placeTypes";
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

jest.mock("../src/hooks/useFetchPlace");
const mockUseFetchPlace = useFetchPlace as jest.MockedFunction<typeof useFetchPlace>;

const mockPlaceDetails: PlaceDetailsWithAccesibilityData = {
	result: {
		place_id: "oiluj",
		name: mockNameString,
	},
};

mockUseFetchPlace.mockReturnValue({
	placeDetails: { placeDetails: mockPlaceDetails },
	isLoading: false,
});

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

	// press submit rating
	fireEvent.press(tr.getByText("Submit a Rating"));
});
afterEach(cleanup);

const numberOfRatingFields = 4;

describe("Detailed view screen tests", () => {
	it("renders an image", () => {
		tr.debug();
		expect(tr.queryByLabelText(`No image available for ${mockNameString}`)).not.toBeNull();
	});

	it("renders the name of the place", () => {
		expect(tr.queryByText(mockNameString)).not.toBeNull();
	});

	it("renders a plus and minus button for each rating", () => {
		expect(tr.queryAllByLabelText("Increase rating by 0.5")).not.toBeNull();
		expect(tr.queryAllByLabelText("Increase rating by 0.5")).toHaveLength(numberOfRatingFields);

		expect(tr.queryAllByLabelText("Decrease rating by 0.5")).not.toBeNull();
		expect(tr.queryAllByLabelText("Decrease rating by 0.5")).toHaveLength(numberOfRatingFields);
	});

	it("renders a cancel button", () => {
		expect(tr.queryByText("Cancel")).not.toBeNull();
	});

	it("renders a submit button", () => {
		expect(tr.queryByText("Submit")).not.toBeNull();
	});
});
