import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_BASE_URL } from "../util/env";
import { PlaceWithAccessibilityData } from "peer-types";

export const useFetchPlace = ({
	placeID,
	includeRatings = true,
}: {
	placeID?: string;
	includeRatings?: boolean;
}): {
	placeDetails?: PlaceWithAccessibilityData;
	isLoading: boolean;
} => {
	const [isLoading, setIsLoading] = useState(false);
	const [placeDetails, setPlaceDetails] = useState<PlaceWithAccessibilityData>();

	const getPlaceDetails = async (placeID: string) => {
		const result = await axios.get<{ placeDetails: PlaceWithAccessibilityData }>(
			`${SERVER_BASE_URL}/getPlaceDetails/${placeID}?${
				includeRatings ? `includeRatings=true` : ``
			}`
		);
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
