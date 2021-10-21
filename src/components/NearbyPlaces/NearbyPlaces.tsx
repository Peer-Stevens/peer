import React from "react";
import { Text, View } from "react-native";
import { Button } from "../Button";
import { useNearbyPlaces } from "./useNearbyPlaces";

export const NearbyPlaces: React.FC<{ stopStrolling: () => void }> = ({ stopStrolling }) => {
	const { nearbyPlaces } = useNearbyPlaces();

	return (
		<View style={{ width: "90%" }}>
			{nearbyPlaces && nearbyPlaces.length > 0 ? (
				<>
					<Text style={{ fontSize: 25 }}>You are walking by </Text>
					{nearbyPlaces.slice(0, 3).map(place => (
						<Text
							key={place.name}
							style={{ fontSize: 25, fontWeight: "bold", lineHeight: 45 }}
						>
							{"\u2022"} {place.name}
						</Text>
					))}
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
