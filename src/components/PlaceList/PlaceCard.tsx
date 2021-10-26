import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, View, Text, Image } from "react-native";
import axios, { AxiosResponse } from "axios";
import { PLACES_API_KEY } from "@env";

export interface PlaceCardProps {
	place?: string;
	avg: number;
	address?: string;
	img?: string;
	accessabilityLabel?: string;
}

const PlaceCard: React.FC<PlaceCardProps> = ({
	place,
	avg,
	address,
	img,
	accessabilityLabel,
}: PlaceCardProps) => {
	const [photoSrc, setPhotoSrc] = useState<string>("");

	const getPhoto = async (img?: string) : Promise<string | undefined> => {
		if (!img) return undefined;
		const res : AxiosResponse<string> | undefined = await axios({
			method: "GET",
			url: "https://maps.googleapis.com/maps/api/place/photo",
			params: {
				photo_reference: img,
				key: PLACES_API_KEY,
				maxwidth: 400,
			}
		}).catch(() => {
			return undefined;
		})
		if (!res) return undefined;
		// document has moved, expected behavior
		const parser = new DOMParser();
		const doc = parser.parseFromString(res.data, "text/html");
		const link = doc.getElementsByTagName("a")[0];
		return link.href;
	}

	useEffect(() => {
		(async () => {
			// only set photo if empty
			if (photoSrc === "") {
				let newSrc = await getPhoto(img);
				if (newSrc) {
					setPhotoSrc(newSrc);
				}
			}
		})();
	})

	return (
		<View style={styles.card}>
			<View style={styles.alignText}>
				<Text style={styles.title}>{place}</Text>

				<View style={{ borderBottomColor: "black", borderBottomWidth: 2 }} />

				<Text style={styles.cardContent}>{address}</Text>
				<Text style={styles.cardContent}>Rating: {avg}/5</Text>
			</View>
			<View
				accessible={true}
				accessibilityLabel={`Image of ${accessabilityLabel}`}
				style={styles.imagePosition}
			>
				<Image
					style={styles.imageStyle}
					source={photoSrc !== "" ? {uri: photoSrc} : require("../../../assets/qmark.png")}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		width: Dimensions.get("window").width - 55,
		height: Dimensions.get("window").height / 6,
		borderWidth: 3,
		borderColor: "black",
		borderRadius: 20,
		margin: 15,
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
		height: Dimensions.get("window").height / 6,
		width: Dimensions.get("window").width - 300,
		borderTopRightRadius: 20,
		borderBottomRightRadius: 20,
	},
	alignText: {
		flex: 2,
	},
	imagePosition: {
		flex: 1,
		alignSelf: "center",
	},
});

export default PlaceCard;
