import React from "react";
import PlaceDetailed from "../components/Places/PlaceDetailed";

export interface DetailedViewScreenProps {
	togglePage: () => void;
	placeID?: string;
}

const DetailedViewScreen: React.FC<DetailedViewScreenProps> = ({
	togglePage,
	placeID,
}: DetailedViewScreenProps) => {
	return <PlaceDetailed togglePage={togglePage} />;
};

export default DetailedViewScreen;
