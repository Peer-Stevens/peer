import React, { useState } from "react";
import StrollScreen from "./StrollScreen";
import MapScreen from "./MapScreen";
import DetailedViewScreen from "./DetailedViewScreen";
import LoginScreen from "./LoginScreen";
import CreateAccountScreen from "./CreateAccountScreen";

export enum Screens {
	Home = "mapScreen",
	Stroll = "strollScreen",
	Details = "detailsScreen",
	Login = "loginScreen",
	CreateAccount = "createAccountScreen",
}

/**
 * Serves as the main view of the app, here all
 * of the other screens are switched between.
 * @returns the main screen component
 */
const MainScreen: React.FC = () => {
	const [page, setPage] = useState<Screens>(Screens.Home);
	const [placeID, setPlaceID] = useState<string>();

	//Makes new function that calls setPage with a specific argument
	const goToMapScreen = () => setPage(Screens.Home);
	const goToStrollScreen = () => setPage(Screens.Stroll);
	const goToDetails = () => setPage(Screens.Details);

	if (page === "strollScreen") {
		return <StrollScreen setPage={goToMapScreen} />;
	} else if (page === "detailsScreen") {
		return <DetailedViewScreen placeID={placeID} setPage={goToMapScreen} />;
	} else if (page === "loginScreen") {
		return <LoginScreen setPage={setPage} />;
	} else if (page === "createAccountScreen") {
		return <CreateAccountScreen setPage={setPage} />;
	} else {
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
