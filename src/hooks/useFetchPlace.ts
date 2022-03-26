import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_BASE_URL } from "../util/env";
import { PlaceWithA11yData } from "peer-types";

// in-memory cache to prevent a loading spinner when the user clicks on a place they've already checked
const cachedPlaces: Record<string, PlaceWithA11yData> = {};

export const useFetchPlace = ({
	placeID,
	includeRatings = true,
}: {
	placeID?: string;
	includeRatings?: boolean;
}): {
	placeDetails?: PlaceWithA11yData;
	isLoading: boolean;
} => {
	const [isLoading, setIsLoading] = useState(false);
	const [placeDetails, setPlaceDetails] = useState<PlaceWithA11yData | undefined>(() => {
		if (placeID) {
			return cachedPlaces[placeID];
		}
	});

	const getPlaceDetails = async (placeID: string) => {
		const result = await axios.get<{ placeDetails: PlaceWithA11yData }>(
			`${SERVER_BASE_URL}/getPlaceDetails/${placeID}?${
				includeRatings ? `includeRatings=true` : ``
			}`
		);
		// cache the result (or update the cache if it's already cached)
		cachedPlaces[placeID] = result.data.placeDetails;
		setPlaceDetails(result.data.placeDetails);
	};

	useEffect(() => {
		(async () => {
			if (placeID) {
				setIsLoading(true);
				await getPlaceDetails(placeID);
				setIsLoading(false);
			}
		})();
	}, [placeID]);

	return { placeDetails, isLoading };
};
