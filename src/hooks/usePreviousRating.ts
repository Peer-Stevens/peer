import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_BASE_URL } from "../util/env";
import { Rating } from "../util/ratingTypes";

// email may be undefined if the user is not logged in
export const usePreviousRating = (
	email?: string | null,
	placeID?: string
): Rating | null | undefined => {
	const [previousRating, setPreviousRating] = useState<Rating | undefined | null>(undefined);

	useEffect(() => {
		(async () => {
			if (placeID && email) {
				const result = await axios.get<Rating | null>(
					`${SERVER_BASE_URL}/getPotentialRating/${email}/${placeID}`
				);
				setPreviousRating(result.data);
			}
		})();
	}, [placeID]);

	return previousRating;
};
