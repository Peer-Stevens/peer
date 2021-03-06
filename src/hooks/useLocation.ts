import { useState, useEffect } from "react";
import * as Location from "expo-location";

export const useLocation = (): {
	location?: Location.LocationObject;
} => {
	const [location, setLocation] = useState<Location.LocationObject>();

	useEffect(() => {
		let permission: Location.LocationPermissionResponse;
		let locationSubscription:
			| {
					remove(): void;
			  }
			| undefined;

		(async () => {
			permission = await Location.requestForegroundPermissionsAsync();
			locationSubscription = await Location.watchPositionAsync(
				{
					accuracy: Location.Accuracy.Lowest,
				},
				location => setLocation(location)
			);
		})();

		return () => {
			if (locationSubscription && permission) {
				void locationSubscription.remove();
			}
		};
	}, []);

	return { location };
};
