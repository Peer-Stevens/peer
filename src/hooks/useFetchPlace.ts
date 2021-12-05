import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_BASE_URL } from "../util/env";
import { PlaceDetailsWithAccesibilityData } from "../util/placeTypes";

export const useFetchPlace = ({
	placeID,
	includeRatings = true,
}: {
	placeID: string;
	includeRatings?: boolean;
}) => {
	const [isLoading, setIsLoading] = useState(false);
	const [placeDetails, setPlaceDetails] =
		useState<{ placeDetails: PlaceDetailsWithAccesibilityData }>();

	const getPlaceDetails = async (placeID: string) => {
		const result = await axios.get<{ placeDetails: PlaceDetailsWithAccesibilityData }>(
			`${SERVER_BASE_URL}/getPlaceDetails/${placeID}?${
				includeRatings ? `includeRatings=true` : ``
			}`
		);
		setPlaceDetails(result.data);
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
