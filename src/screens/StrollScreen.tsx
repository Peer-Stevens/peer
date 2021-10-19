import React from "react";
import { View } from "react-native";
import { NearbyPlaces } from "../components/NearbyPlaces/NearbyPlaces";

export interface StrollScreenProps {
	toggleIsStrolling: () => void;
}

const StrollScreen: React.FC<StrollScreenProps> = ({ toggleIsStrolling }: StrollScreenProps) => {
	return (
		<View
			style={{
				flex: 1,
				flexDirection: "column",
				backgroundColor: "#fff",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<NearbyPlaces stopStrolling={toggleIsStrolling} />
		</View>
	);
};

export default StrollScreen;
