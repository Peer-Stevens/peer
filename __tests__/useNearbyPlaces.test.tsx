import { useLocation } from "../src/hooks/useLocation";
import { useNearbyPlaces } from "../src/hooks/useNearbyPlaces";
import axios from "axios";
import { Place } from "@googlemaps/google-maps-services-js";
import { LocationObject } from "expo-location";
import { renderHook, act, cleanup } from "@testing-library/react-hooks";
import { waitFor } from "@testing-library/react-native";

jest.mock("../src/hooks/useLocation");

const mockLocation: LocationObject = {
	coords: {
		latitude: 0,
		longitude: 0,
		altitude: null,
		altitudeAccuracy: null,
		heading: null,
		speed: null,
		accuracy: null,
	},
	timestamp: 0,
};
const mockLocation2: LocationObject = {
	coords: {
		latitude: 22,
		longitude: 44,
		altitude: null,
		altitudeAccuracy: null,
		heading: null,
		speed: null,
		accuracy: null,
	},
	timestamp: 0,
};
const mockLocation3: LocationObject = {
	coords: {
		latitude: 34,
		longitude: 33,
		altitude: null,
		altitudeAccuracy: null,
		heading: null,
		speed: null,
		accuracy: null,
	},
	timestamp: 0,
};
const mockLocationClose1: LocationObject = {
	coords: {
		latitude: 98.000000001,
		longitude: 33,
		altitude: null,
		altitudeAccuracy: null,
		heading: null,
		speed: null,
		accuracy: null,
	},
	timestamp: 0,
};
const mockLocationClose2: LocationObject = {
	coords: {
		latitude: 98.0000000011,
		longitude: 81,
		altitude: null,
		altitudeAccuracy: null,
		heading: null,
		speed: null,
		accuracy: null,
	},
	timestamp: 0,
};
const mockUseLocation = useLocation as jest.MockedFunction<typeof useLocation>;

jest.mock("axios");

const firstPlaceList: Place[] = [{ name: "Hungry Boi Place" }, { name: "Underground Tunnels" }];
const secondPlaceList: Place[] = [{ name: "Hungrier Boi Place" }, { name: "Magma Core" }];
const thirdPlaceList: Place[] = [{ name: "Hungriest Boi Place" }, { name: "Gravity Well" }];
const closePlaceList: Place[] = [{ name: "Hairline Width Barber Shop" }];
// axios.get is an "unbound method" but this is an implementation detail of axios
// eslint-disable-next-line @typescript-eslint/unbound-method
const mockGet = axios.get as jest.MockedFunction<typeof axios.get>;
mockGet.mockImplementation((url): Promise<{ data: { places: Place[] } }> => {
	return new Promise(resolve => {
		if (url.search("0") !== -1) {
			resolve({
				data: {
					places: firstPlaceList,
				},
			});
		} else if (url.search("22") !== -1) {
			resolve({
				data: {
					places: secondPlaceList,
				},
			});
		} else if (url.search("98") !== -1 && url.search("81") === -1) {
			resolve({
				data: {
					places: closePlaceList,
				},
			});
		} else {
			// must be third place
			resolve({
				data: {
					places: thirdPlaceList,
				},
			});
		}
	});
});

beforeEach(() => {
	mockUseLocation.mockReset();
	mockGet.mockClear();
});

afterEach(cleanup);

describe("useNearbyPlaces tests", () => {
	it("should fetch new places from the server after a while", async () => {
		// Arrange
		mockUseLocation
			.mockReturnValueOnce({ location: mockLocation })
			.mockReturnValueOnce({ location: mockLocation2 })
			.mockReturnValue({ location: mockLocation3 });
		const { result } = renderHook(() => useNearbyPlaces());

		// Assert

		// nearbyPlaces will never be secondPlaceList because the second run of the
		// useEffect loop will occur much sooner than the end of the 10 second interval
		await waitFor(() => {
			expect(result.current.nearbyPlaces).toEqual(thirdPlaceList);
			expect(mockGet.mock.calls.length).toBeGreaterThanOrEqual(1);
		});
	});

	it("should not get new places from the server if the user has not moved somewhere new", async () => {
		// Arrange
		mockUseLocation.mockReturnValue({ location: mockLocation });
		const { result } = renderHook(() => useNearbyPlaces());

		// Assert
		await waitFor(() => {
			expect(result.current.nearbyPlaces).toEqual(firstPlaceList);
			expect(mockGet).toHaveBeenCalledTimes(1); // only EXACTLY once
		});
	});

	it("should not get new places from the server if the user's place is very close to the old one", async () => {
		// Arrange
		mockUseLocation
			.mockReturnValueOnce({ location: mockLocationClose1 })
			.mockReturnValue({ location: mockLocationClose2 });
		renderHook(() => useNearbyPlaces());

		// Assert
		await act(async () => {
			// this needs to be awaited or else there will be an open handle upon
			// this tests's completion
			// eslint-disable-next-line @typescript-eslint/await-thenable
			await setTimeout(() => {
				expect(mockGet).toHaveBeenCalledTimes(1);
			}, 20000);
		});
	});
});
