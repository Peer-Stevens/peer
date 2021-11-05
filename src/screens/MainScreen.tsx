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
	const [placeID, setPlaceID] = useState();

	//Makes new function that calls setPage with a specific argument
	const goToMapScreen = () => setPage("mapScreen");

	if (page === "strolling") {
		return <StrollScreen toggleIsStrolling={goToMapScreen} />;
	} else if (page === "locationSelected") {
		return <DetailedViewScreen togglePage={goToMapScreen} />;
	} else {
		//Make sure that mapScreen takes in setPlace and uses it
		return <MapScreen setPlace={setPlaceID} toggleIsStrolling={() => setPage("strolling")} />;
	}
};

export default MainScreen;
