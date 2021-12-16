import React, { useState } from "react";
import StrollScreen from "./StrollScreen";
import MapScreen from "./MapScreen";
import DetailedViewScreen from "./DetailedViewScreen";
import SubmitRatingScreen from "./SubmitRatingScreen";
import { useFetchPlace } from "../hooks/useFetchPlace";

/**
 * Serves as the main view of the app, here all
 * of the other screens are switched between.
 * @returns the main screen component
 */
const MainScreen: React.FC = () => {
	const [page, setPage] = useState("mapScreen");
	const [placeID, setPlaceID] = useState<string>();
	const [selections, setSelections] = useState<Array<string>>([]);

	// Keep data around to avoid making another call when moving from
	// details screen to submit rating screen
	const placeDetails = useFetchPlace({ placeID });

	//Makes new function that calls setPage with a specific argument
	const goToMapScreen = () => setPage("mapScreen");
	const goToStrollScreen = () => setPage("strollScreen");
	const goToDetails = () => setPage("detailsScreen");
	const goToSubmitRatingScreen = () => setPage("submitRatingScreen");

	if (page === "strollScreen") {
		return <StrollScreen setPage={goToMapScreen} selections={selections} />;
	} else if (page === "detailsScreen") {
		if (!placeID) {
			throw new Error("No placeID set before navigation to details screen");
		}
		return (
			<DetailedViewScreen
				placeID={placeID}
				goToMapScreen={goToMapScreen}
				goToSubmitRatingScreen={goToSubmitRatingScreen}
				placeDetails={placeDetails.placeDetails}
			/>
		);
	} else if (page === "submitRatingScreen") {
		const photos = placeDetails.placeDetails?.placeDetails.result.photos; // TODO: this is atrocious
		const photo_reference = photos ? photos[0].photo_reference : undefined;
		return (
			<SubmitRatingScreen
				placeID={placeID}
				placeName={placeDetails.placeDetails?.placeDetails.result.name} // TODO: this is atrocious
				photo_reference={photo_reference}
			/>
		);
	} else {
		return (
			<MapScreen
				selections={selections}
				setSelections={setSelections}
				setPlaceID={setPlaceID}
				setPageStrolling={goToStrollScreen}
				goToDetails={goToDetails}
			/>
		);
	}
};

export default MainScreen;
