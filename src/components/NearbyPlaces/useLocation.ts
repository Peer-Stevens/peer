import { useState, useEffect } from "react";
import * as Location from "expo-location";

export const useLocation = (): {
	location?: Location.LocationObject;
	errorMsg?: string;
} => {
	const [location, setLocation] = useState<Location.LocationObject>();
	const [errorMsg, setErrorMsg] = useState<string>();

	useEffect(() => {
		(async () => {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}

			const location = await Location.getCurrentPositionAsync({
				accuracy: Location.Accuracy.Low,
			});
			setLocation(location);
		})();
	}, []);

	return { location, errorMsg };
};