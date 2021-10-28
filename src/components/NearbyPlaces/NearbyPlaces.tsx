import React from "react";
import { Text, View } from "react-native";
import { Button } from "../Button";
import { useNearbyPlaces } from "./useNearbyPlaces";
import { useCompass } from "./useCompass";
import { useLocation } from "./useLocation";

export const NearbyPlaces: React.FC<{ stopStrolling: () => void }> = ({ stopStrolling }) => {
	const { location } = useLocation();
	const { nearbyPlaces } = useNearbyPlaces();
	const { heading, getRelativeDirection } = useCompass();

	return (
		<View style={{ width: "90%" }}>
			{nearbyPlaces && nearbyPlaces.length > 0 && location ? (
				<>
					<Text style={{ fontSize: 12 }}>
						You are walking by {Math.round(heading || 0)}
					</Text>
					{nearbyPlaces.slice(0, 15).map(place => {
						const relativeDirection = getRelativeDirection({
							userLocation: location,
							place,
						});
						return (
							<Text
								key={place.name}
								style={{ fontSize: 14, fontWeight: "bold", lineHeight: 25 }}
							>
								{"\u2022"} {place.name} is {relativeDirection.distanceInFeet} feet{" "}
								{relativeDirection.dirString}
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
