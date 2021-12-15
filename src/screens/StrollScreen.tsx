import React from "react";
import { View } from "react-native";
import { NearbyPlaces } from "../components/NearbyPlaces/NearbyPlaces";

export interface StrollScreenProps {
	setPage: () => void;
	selections: string[];
}

const StrollScreen: React.FC<StrollScreenProps> = ({ setPage, selections }: StrollScreenProps) => {
	const selection = selections.length > 0 ? selections[0] : "";
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
			<NearbyPlaces stopStrolling={setPage} type={selection} />
		</View>
	);
};

export default StrollScreen;
