import React from "react";
import { View } from "react-native";
import { NearbyPlaces } from "../components/NearbyPlaces/NearbyPlaces";

export interface StrollScreenProps {
	setPage: () => void;
}

const StrollScreen: React.FC<StrollScreenProps> = ({ setPage }: StrollScreenProps) => {
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
			<NearbyPlaces stopStrolling={setPage} />
		</View>
	);
};

export default StrollScreen;
