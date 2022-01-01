import React from "react";
import { Text, View } from "react-native";
import { Button } from "../Button";
import { useNearbyPlaces } from "../../hooks/useNearbyPlaces";
import { useCompass } from "../../hooks/useCompass";
import { useLocation } from "../../hooks/useLocation";
import { computeDistanceFeet } from "../../util/distance";
import { getPlaceRatingString } from "../../util/processA11yRatings";

export interface NearbyPlacesProps {
	stopStrolling: () => void;
	type: string;
}

export const NearbyPlaces: React.FC<NearbyPlacesProps> = ({ stopStrolling, type }) => {
	const { location } = useLocation();
	const { nearbyPlaces } = useNearbyPlaces(type);
	const { getRelativeDirection } = useCompass();

	return (
		<View style={{ width: "90%" }}>
			{nearbyPlaces && nearbyPlaces.length > 0 && location ? (
				<>
					<Text style={{ fontFamily: "APHont", fontSize: 24, marginBottom: 15 }}>
						The following places are nearby:
					</Text>
					{nearbyPlaces.slice(0, 5).map(place => {
						const relativeDirection = getRelativeDirection({
							userLocation: location,
							place,
						});
						const userCoords = {
							latitude: location.coords.latitude,
							longitude: location.coords.longitude,
						};
						const placeCoords = {
							latitude: place.geometry?.location.lat,
							longitude: place.geometry?.location.lng,
						};
						if (relativeDirection)
							return (
								<Text
									key={place.name}
									style={{
										fontSize: 24,
										fontFamily: "APHontBold",
										marginBottom: 15,
									}}
								>
									{"\u2022"} {place.name} is{" "}
									{computeDistanceFeet(userCoords, placeCoords)} feet{" "}
									{relativeDirection.dirString} and has{" "}
									{getPlaceRatingString(place)} accessibility ratings.
								</Text>
							);
						else
							return (
								<Text
									key={place.name}
									style={{ fontSize: 24, fontWeight: "bold", marginBottom: 15 }}
								>
									{"\u2022"} {place.name}
								</Text>
							);
					})}
				</>
			) : (
				<Text>Loading...</Text>
			)}
			<View style={{ marginBottom: 15 }}>
				<Button
					onPress={stopStrolling}
					accessibilityLabel="Stop this stroll"
					text="Stop this stroll"
				/>
			</View>
		</View>
	);
};
