import React, { useEffect, useState } from "react";
import StrollScreen from "./StrollScreen";
import MapScreen from "./MapScreen";
import DetailedViewScreen from "./DetailedViewScreen";
import LogInScreen from "./LoginScreen";
import CreateAccountScreen from "./CreateAccountScreen";
import NotLoggedInScreen from "./NotLoggedInScreen";
import SubmitRatingScreen from "./SubmitRatingScreen";
// import AsyncStorage from "@react-native-async-storage/async-storage";

export enum Screens {
	Home = "mapScreen",
	Stroll = "strollScreen",
	Details = "detailsScreen",
	NotLoggedIn = "notLoggedIn",
	Login = "loginScreen",
	CreateAccount = "createAccountScreen",
	SubmitRating = "submitRating",
}

/**
 * Serves as the main view of the app, here all
 * of the other screens are switched between.
 * @returns the main screen component
 */
const MainScreen: React.FC = () => {
	//const [token, setToken] = useState(false);

	// 	useEffect(() => {
	// 		//TODO this doesn't work?? idk why, please help
	// 		if (AsyncStorage.getItem("@auth_token") !== null) {
	// 			setToken(true);
	// 			return;
	// 		}
	// 		setToken(false);
	// 	}, []);
	// token ? Screens.Home : Screens.NotLoggedIn;

	const [page, setPage] = useState<Screens>(Screens.Home);
	const [placeID, setPlaceID] = useState<string>();
	const [selections, setSelections] = useState<Array<string>>([]);

	//Makes new function that calls setPage with a specific argument
	const goToMapScreen = () => setPage(Screens.Home);
	const goToStrollScreen = () => setPage(Screens.Stroll);
	const goToDetails = () => setPage(Screens.Details);
	const goToSubmitRating = () => setPage(Screens.SubmitRating);

	if (page === "strollScreen") {
		return <StrollScreen setPage={goToMapScreen} selections={selections} />;
	} else if (page === "detailsScreen") {
		if (!placeID) {
			throw new Error("No placeID set before navigation to details screen");
		}
		return <DetailedViewScreen placeID={placeID} setPage={setPage} />;
	} else if (page === "notLoggedIn") {
		return (
			<NotLoggedInScreen
				placeID={placeID}
				setPage={setPage}
				goToDetails={goToDetails}
				setPlaceID={setPlaceID}
			/>
		);
	} else if (page === "loginScreen") {
		return (
			<LogInScreen
				setPage={setPage}
				placeID={placeID}
				setPlaceID={setPlaceID}
				goToSubmitRating={goToSubmitRating}
			/>
		);
	} else if (page === "createAccountScreen") {
		return (
			<CreateAccountScreen
				setPage={setPage}
				placeID={placeID}
				setPlaceID={setPlaceID}
				goToSubmitRating={goToSubmitRating}
			/>
		);
	} else if (page === "submitRating") {
		return (
			<SubmitRatingScreen
				setPage={setPage}
				placeID={placeID}
				setPlaceID={setPlaceID}
				goToDetails={goToDetails}
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
