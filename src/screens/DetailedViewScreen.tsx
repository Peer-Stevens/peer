import React from "react";
import { View } from "react-native";

export interface DetailedViewScreenProps {
	toggleLocationSelected: () => void;
}

const DetailedViewScreen: React.FC<DetailedViewScreenProps> = ({
	toggleLocationSelected,
}: DetailedViewScreenProps) => {
	return <View>This is a test</View>;
};

export default DetailedViewScreen;
