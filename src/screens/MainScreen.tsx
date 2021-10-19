import React, { useState } from "react";
import StrollScreen from "./StrollScreen";
import MapScreen from "./MapScreen";

/**
 * Serves as the main view of the app, here all
 * of the other screens are switched between.
 * @returns the main screen component
 */
const MainScreen : React.FC = () => {
	const [isStrolling, setIsStrolling] = useState(false);
	
	const toggleIsStrolling = () => {
		setIsStrolling(!isStrolling);
	};

	if (isStrolling) {
		return (
			<StrollScreen toggleIsStrolling={toggleIsStrolling}/>
		);
	} else {
		return (
			<MapScreen toggleIsStrolling={toggleIsStrolling}/>
		)
	}
};

export default MainScreen;
