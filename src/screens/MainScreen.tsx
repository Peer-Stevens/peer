import React, { useState } from "react";
import StrollScreen from "./StrollScreen";
import MapScreen from "./MapScreen";
import DetailedViewScreen from "./DetailedViewScreen";

/**
 * Serves as the main view of the app, here all
 * of the other screens are switched between.
 * @returns the main screen component
 */
const MainScreen: React.FC = () => {
	const [page, setPage] = useState("mapScreen");
	const [placeID, setPlaceID] = useState<string>();

	//Makes new function that calls setPage with a specific argument
	const goToMapScreen = () => setPage("mapScreen");
	const goToStrollScreen = () => setPage("strollScreen");
	const goToDetails = () => setPage("detailsScreen");

	if (page === "strollScreen") {
		return <StrollScreen setPage={goToMapScreen} />;
	} else if (page === "detailsScreen") {
		return <DetailedViewScreen placeID={placeID} setPage={goToMapScreen} />;
	} else {
		//Make sure that mapScreen takes in setPlace and uses it

		// return <MapScreen toggleIsStrolling={goToStrollScreen} />;
		return (
			<MapScreen
				setPlaceID={setPlaceID}
				setPageStrolling={goToStrollScreen}
				goToDetails={goToDetails}
			/>
		);
	}
};

export default MainScreen;
