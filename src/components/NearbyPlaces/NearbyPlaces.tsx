import React from "react";
import { Text, View } from "react-native";
import { Button } from "../Button";
import { useNearbyPlaces } from "../../hooks/useNearbyPlaces";
import { useCompass } from "../../hooks/useCompass";
import { useLocation } from "../../hooks/useLocation";

export const NearbyPlaces: React.FC<{ stopStrolling: () => void }> = ({ stopStrolling }) => {
	const { location } = useLocation();
	const { nearbyPlaces } = useNearbyPlaces();
	const { getRelativeDirection } = useCompass();

	return (
		<View style={{ width: "90%" }}>
			{nearbyPlaces && nearbyPlaces.length > 0 && location ? (
				<>
					<Text style={{ fontSize: 24, marginBottom: 15 }}>
						The following places are nearby:
					</Text>
					{nearbyPlaces.slice(0, 5).map(place => {
						const relativeDirection = getRelativeDirection({
							userLocation: location,
							place,
						});
						if (relativeDirection)
							return (
								<Text
									key={place.name}
									style={{ fontSize: 24, fontWeight: "bold", marginBottom: 15 }}
								>
									{"\u2022"} {place.name} is {relativeDirection.distanceInFeet}{" "}
									feet {relativeDirection.dirString}
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
