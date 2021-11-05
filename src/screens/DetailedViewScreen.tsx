import React from "react";
import PlaceDetailed from "../components/Places/PlaceDetailed";

export interface DetailedViewScreenProps {
	togglePage: () => void;
}

const DetailedViewScreen: React.FC<DetailedViewScreenProps> = ({
	togglePage,
}: DetailedViewScreenProps) => {
	return <PlaceDetailed togglePage={togglePage} />;
};

export default DetailedViewScreen;
