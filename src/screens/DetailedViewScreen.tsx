//This is where we will be displaying the information of each single place
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ActivityIndicator, TextProps, ScrollView } from "react-native";
import { computeDistanceMi } from "../util/distance";
import { useLocation } from "../hooks/useLocation";
import { Button } from "../components/Button";
import { PlaceImage } from "../components/PlaceImage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFetchPlace } from "../hooks/useFetchPlace";
import Screen from "../util/screens";

export interface PlaceProps {
	placeID: string;
	setPage: (screen: Screen) => void;
}

const BodyText = (props: TextProps) => (
	<Text
		style={{
			fontFamily: "APHont",
			fontSize: 30,
			lineHeight: 35,
			marginBottom: 15,
		}}
		{...props}
	/>
);

const DetailedViewScreen: React.FC<PlaceProps> = ({ setPage, placeID }: PlaceProps) => {
	const [tokenExists, setTokenExists] = useState(false);

	useEffect(() => {
		const checkForToken = async () => {
			const key = await AsyncStorage.getItem("@auth_token");

			if (key !== null) {
				setTokenExists(true);
				return;
			}
			setTokenExists(false);
		};
		void checkForToken();
	}, []);

	const { placeDetails } = useFetchPlace({ placeID });

	const { location } = useLocation();

	const userCoords = {
		latitude: location?.coords.latitude,
		longitude: location?.coords.longitude,
	};

	if (placeDetails) {
		const place = placeDetails.result;

		const placeCoord = {
			latitude: place.geometry?.location.lat,
			longitude: place.geometry?.location.lng,
		};
		const distanceInMi = computeDistanceMi(userCoords, placeCoord)?.toPrecision(2);

		// TODO: update to use new rating "sensory aids"
		const a11yDataMap = {
			"Navigability": placeDetails.accessibilityData?.avgNavigability,
			"Sensory Aids": placeDetails.accessibilityData?.avgBraille,
			"Staff Helpfulness": placeDetails.accessibilityData?.avgStaffHelpfulness,
			"Guide Dog Friendliness": placeDetails.accessibilityData?.avgGuideDogFriendly,
		};

		return (
			<View style={{ flex: 1 }}>
				<PlaceImage
					photoref={place.photos?.[0]?.photo_reference}
					placeName={place.name}
					style={{
						width: "100%",
						height: "40%",
					}}
				/>
				<View
					style={{
						width: "90%",
						alignSelf: "center",
					}}
				>
					<ScrollView style={{ height: "40%" }}>
						<Text
							ellipsizeMode="tail"
							numberOfLines={2}
							style={{
								fontFamily: "APHontBold",
								fontSize: 35,
							}}
						>
							{place.name}
						</Text>
						<BodyText ellipsizeMode="tail" numberOfLines={2}>
							{place.formatted_address}
						</BodyText>
						<BodyText
							accessibilityLabel={distanceInMi ? `${distanceInMi} miles away` : ""}
						>
							{distanceInMi ? `${distanceInMi} mi away` : ""}
						</BodyText>
						{Object.entries(a11yDataMap).map((attrScorePair, index) => {
							const attribute = attrScorePair[0];
							const score = attrScorePair[1];

							return (
								<View key={`rating${index}`}>
									<Text>{attribute}</Text>
									<Text>{score ?? "N/A"}</Text>
								</View>
							);
						})}
					</ScrollView>
					<Button
						style={styles.button}
						onPress={() =>
							tokenExists ? setPage(Screen.SubmitRating) : setPage(Screen.NotLoggedIn)
						}
						accessibilityLabel="Submit an accessibility rating"
						text="Submit a Rating"
					/>
					<Button
						style={styles.button}
						onPress={() => setPage(Screen.Home)}
						accessibilityLabel="Return to Home Page"
						text="Go Home"
					/>
				</View>
			</View>
		);
	} else {
		return (
			<View
				style={{
					height: "100%",
					display: "flex",
					justifyContent: "center",
				}}
			>
				<ActivityIndicator size="large" color="#000000" />
			</View>
		);
	}
};

const styles = StyleSheet.create({
	button: {
		width: "100%",
		marginBottom: 10,
	},
});

export default DetailedViewScreen;
