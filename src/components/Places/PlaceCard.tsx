import React from "react";
import {
	StyleSheet,
	Dimensions,
	View,
	Text,
	Image,
	ImageSourcePropType,
	Button,
	Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { TEXT_COLOR } from "../../util/colors";
import PeerIcon from "../../../assets/icon.png";
import { SERVER_BASE_URL } from "../../util/env";
export interface PlaceCardProps {
	placeName?: string;
	avg: number;
	address?: string;
	photoref?: string;
	setPageDetails: () => void;
	placeID?: string;
	setPlaceID: (placeID: string) => void;
}

const PlaceCard: React.FC<PlaceCardProps> = ({
	placeName,
	avg,
	address,
	photoref,
	placeID,
	setPageDetails,
	setPlaceID,
}: PlaceCardProps) => {
	// prevent calls to remote server during testing
	let imageSrc: ImageSourcePropType;
	if (photoref && process.env.NODE_ENV !== "test") {
		imageSrc = { uri: `${SERVER_BASE_URL}/getPlacePhoto/${photoref}` };
	} else {
		imageSrc = PeerIcon;
	}

	const image = photoref ? (
		<Image
			accessible={true}
			accessibilityLabel={placeName ? `Image of ${placeName}` : ""}
			style={styles.imageStyle}
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

	const setPageAndDetails = () => {
		setPageDetails();
		if (placeID) {
			setPlaceID(placeID);
		}
	};

	return (
		<View style={styles.card}>
			<Button onPress={setPageAndDetails} title="Details" />
			<View style={styles.alignText}>
				<Text ellipsizeMode="tail" numberOfLines={1} style={styles.title}>
					{placeName}
				</Text>
				{/* <Text ellipsizeMode="tail" numberOfLines={1} style={styles.title}>
					{placeID}
				</Text> */}
				<Text ellipsizeMode="tail" numberOfLines={1} style={styles.cardContent}>
					{address}
				</Text>
				<Text
					adjustsFontSizeToFit={true}
					numberOfLines={2}
					style={styles.cardContent}
					accessibilityLabel={`Rating: ${avg} out of 5`}
				>
					Rating: {avg}/5
				</Text>
			</View>
			{image}
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		width: Dimensions.get("window").width * 0.9,
		height: Dimensions.get("window").height * 0.25,
		borderWidth: 3,
		borderColor: "black",
		margin: 20,
	},
	title: {
		fontWeight: "bold",
		fontSize: 30,
		borderRadius: 20,
	},
	cardContent: {
		fontSize: 30,
		borderRadius: 20,
	},
	imageStyle: {
		width: "40%",
		height: "100%",
		alignSelf: "flex-end",
	},
	alignText: {
		flex: 1,
		marginHorizontal: 10,
		justifyContent: "space-around",
	},
});

export default PlaceCard;
