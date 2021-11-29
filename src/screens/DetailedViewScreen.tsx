import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import PlaceDetailed from "../components/Places/PlaceDetailed";

export interface DetailedViewScreenProps {
	setPage: () => void;
	placeID?: string;
}

const DetailedViewScreen: React.FC<DetailedViewScreenProps> = ({
	setPage,
	placeID,
}: DetailedViewScreenProps) => {
	return <PlaceDetailed placeID={placeID} setPage={setPage} />;
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "flex-end",
	},
});

export default DetailedViewScreen;
