import React from "react";
import { Image, ImageSourcePropType, StyleProp } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { TEXT_COLOR } from "../util/colors";
import PeerIcon from "../../assets/icon.png";
import { SERVER_BASE_URL } from "../util/env";

export const PlaceImage: React.FC<{
	photoref?: string;
	placeName?: string;
	style?: StyleProp<Record<string, unknown>>;
}> = ({ photoref, placeName, style }) => {
	// prevent calls to remote server during testing
	let imageSrc: ImageSourcePropType;
	if (photoref && process.env.NODE_ENV !== "test") {
		imageSrc = { uri: `${SERVER_BASE_URL}/getPlacePhoto/${photoref}` };
	} else {
		imageSrc = PeerIcon;
	}

	return photoref ? (
		<Image
			accessible={true}
			accessibilityLabel={placeName ? `Image of ${placeName}` : ""}
			style={style}
			source={imageSrc}
		/>
	) : (
		<Icon
			name={"camera-off"}
			color={TEXT_COLOR}
			size={100}
			style={{ alignSelf: "center", marginHorizontal: 30 }}
			accessibilityLabel={
				placeName ? `No image available for ${placeName}` : "No image available"
			}
		/>
	);
};
