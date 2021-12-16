import React, { useEffect, useState } from "react";
import StrollScreen from "./StrollScreen";
import MapScreen from "./MapScreen";
import DetailedViewScreen from "./DetailedViewScreen";
import LogInScreen from "./LoginScreen";
import CreateAccountScreen from "./CreateAccountScreen";
import NotLoggedIn from "./NotLoggedIn";
import AsyncStorage from "@react-native-async-storage/async-storage";

export enum Screens {
	Home = "mapScreen",
	Stroll = "strollScreen",
	Details = "detailsScreen",
	NotLoggedIn = "notLoggedIn",
	Login = "loginScreen",
	CreateAccount = "createAccountScreen",
}

/**
 * Serves as the main view of the app, here all
 * of the other screens are switched between.
 * @returns the main screen component
 */
const MainScreen: React.FC = () => {
	const [token, setToken] = useState(false);

	useEffect(() => {
		//TODO this doesn't work?? idk why, please help
		if (AsyncStorage.getItem("@auth_token") !== null) {
			setToken(true);
			return;
		}
		setToken(false);
	}, []);

	const [page, setPage] = useState<Screens>(token ? Screens.Home : Screens.NotLoggedIn);
	const [placeID, setPlaceID] = useState<string>();
	const [selections, setSelections] = useState<Array<string>>([]);

	//Makes new function that calls setPage with a specific argument
	const goToMapScreen = () => setPage(Screens.Home);
	const goToStrollScreen = () => setPage(Screens.Stroll);
	const goToDetails = () => setPage(Screens.Details);

	if (page === "strollScreen") {
		return <StrollScreen setPage={goToMapScreen} selections={selections} />;
	} else if (page === "detailsScreen") {
		if (!placeID) {
			throw new Error("No placeID set before navigation to details screen");
		}
		return <DetailedViewScreen placeID={placeID} setPage={goToMapScreen} />;
	} else if (page === "notLoggedIn") {
		return <NotLoggedIn setPage={setPage} />;
	} else if (page === "loginScreen") {
		return <LogInScreen setPage={setPage} />;
	} else if (page === "createAccountScreen") {
		return <CreateAccountScreen setPage={setPage} />;
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
