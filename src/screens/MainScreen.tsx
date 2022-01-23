import React, { useState } from "react";
import StrollScreen from "./StrollScreen";
import MapScreen from "./MapScreen";
import DetailedViewScreen from "./DetailedViewScreen";
import SubmitRatingScreen from "./SubmitRatingScreen";
import { useFetchPlace } from "../hooks/useFetchPlace";
import LogInScreen from "./LoginScreen";
import CreateAccountScreen from "./CreateAccountScreen";
import NotLoggedInScreen from "./NotLoggedInScreen";
import Screen from "../util/screens";

/**
 * Serves as the main view of the app, here all
 * of the other screens are switched between.
 * @returns the main screen component
 */
const MainScreen: React.FC = () => {
	const [page, setPage] = useState<Screen>(Screen.Home);
	const [placeID, setPlaceID] = useState<string>();
	const [selections, setSelections] = useState<Array<string>>([]);

	// Keep data around to avoid making another call when moving from
	// details screen to submit rating screen
	const { placeDetails } = useFetchPlace({ placeID });

	//Makes new function that calls setPage with a specific argument
	const goToMapScreen = () => setPage(Screen.Home);
	const goToStrollScreen = () => setPage(Screen.Stroll);
	const goToDetails = () => setPage(Screen.Details);
	const goToSubmitRating = () => setPage(Screen.SubmitRating);

	if (page === Screen.Stroll) {
		return <StrollScreen setPage={goToMapScreen} selections={selections} />;
	} else if (page === Screen.Details) {
		if (!placeID) {
			throw new Error("No placeID set before navigation to details screen");
		}
		return <DetailedViewScreen placeID={placeID} setPage={setPage} />;
	} else if (page === Screen.SubmitRating) {
		const photos = placeDetails?.result.photos;
		const photo_reference = photos ? photos[0].photo_reference : undefined;
		return (
			<SubmitRatingScreen
				placeID={placeID}
				placeName={placeDetails?.result.name}
				photo_reference={photo_reference}
				setPage={setPage}
			/>
		);
	} else if (page === Screen.NotLoggedIn) {
		return (
			<NotLoggedInScreen
				placeID={placeID}
				setPage={setPage}
				goToDetails={goToDetails}
				setPlaceID={setPlaceID}
			/>
		);
	} else if (page === Screen.Login) {
		return (
			<LogInScreen
				setPage={setPage}
				placeID={placeID}
				setPlaceID={setPlaceID}
				goToSubmitRating={goToSubmitRating}
			/>
		);
	} else if (page === Screen.CreateAccount) {
		return (
			<CreateAccountScreen
				setPage={setPage}
				placeID={placeID}
				setPlaceID={setPlaceID}
				goToSubmitRating={goToSubmitRating}
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
