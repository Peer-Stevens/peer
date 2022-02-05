import React from "react";
import { Image, ImageSourcePropType, StyleProp, StyleSheet, TextStyle, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { TEXT_COLOR } from "../util/colors";
import PeerIcon from "../../assets/icon.png";
import { SERVER_BASE_URL } from "../util/env";
import { sendLog } from "../util/sendLog";

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
		if (!photoref) {
			sendLog({
				logtype: "error",
				logs: [
					{
						message: `photoref is undefined for place ${placeName || "<unknown>"}`,
					},
				],
			});
		}
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
		<View
			style={
				StyleSheet.compose(style, {
					display: "flex",
					justifyContent: "center",
				}) as StyleProp<TextStyle>
			}
			accessibilityLabel={
				placeName ? `No image available for ${placeName}` : "No image available"
			}
		>
			<Icon
				name={"camera-off"}
				color={TEXT_COLOR}
				size={125}
				style={{
					alignSelf: "center",
				}}
			/>
		</View>
	);
};
