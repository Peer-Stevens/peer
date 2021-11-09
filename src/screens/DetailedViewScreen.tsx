import React from "react";
import PlaceDetailed from "../components/Places/PlaceDetailed";

export interface DetailedViewScreenProps {
	setPage: () => void;
	placeID?: string;
}

const DetailedViewScreen: React.FC<DetailedViewScreenProps> = ({
	setPage,
	placeID,
}: DetailedViewScreenProps) => {
	return <PlaceDetailed setPage={setPage} />;
};

export default DetailedViewScreen;
