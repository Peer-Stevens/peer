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
import MapAnchor from "../components/MapAnchor";
import Icon from "react-native-vector-icons/FontAwesome";
import { START_WALKING } from "../util/strings";
import { fieldsToNamesMap } from "peer-types";
import { PRIMARY_COLOR, TEXT_COLOR } from "../util/colors";
import { FieldInfo, fieldInfos } from "./SubmitRatingScreen/SubmitRatingScreen";
import { getPopUpProps } from "../util/strings";
import { PopUp } from "../components/PopUp";

export interface PlaceProps {
	placeID: string;
	setPage: (screen: Screen) => void;
}

const BodyText = (props: TextProps) => (
	<Text
		style={{
			fontFamily: "APHont",
			fontSize: 20,
			lineHeight: 20,
			marginBottom: 15,
		}}
		{...props}
	/>
);

const DetailedViewScreen: React.FC<PlaceProps> = ({ setPage, placeID }: PlaceProps) => {
	const [tokenExists, setTokenExists] = useState(false);

	const [isOpenInMapsTapped, setIsOpenInMapsTapped] = useState<boolean>(false);

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
		const placeCoord = {
			latitude: placeDetails?.geometry?.location.lat,
			longitude: placeDetails?.geometry?.location.lng,
		};
		const distanceInMi = computeDistanceMi(userCoords, placeCoord)?.toPrecision(2);

		return (
			<View style={{ flex: 1 }}>
				<PlaceImage
					photoref={placeDetails.photos?.[0]?.photo_reference}
					placeName={placeDetails.name}
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
								marginTop: 15,
							}}
						>
							{placeDetails.name}
						</Text>

						<BodyText ellipsizeMode="tail" numberOfLines={2}>
							{placeDetails.formatted_address}
						</BodyText>
						<BodyText
							accessibilityLabel={distanceInMi ? `${distanceInMi} miles away` : ""}
						>
							{distanceInMi ? `${distanceInMi} mi away` : ""}
						</BodyText>
						<MapAnchor
							destination={placeDetails.name}
							destination_place_id={placeID}
							formatted_address={placeDetails.formatted_address}
							callback={setIsOpenInMapsTapped}
						>
							<View
								style={{
									...styles.button,
									display: "flex",
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "center",
									paddingHorizontal: 15,
									paddingVertical: 10,
									backgroundColor: isOpenInMapsTapped
										? TEXT_COLOR
										: PRIMARY_COLOR,
									borderWidth: 3,
									borderColor: "black",
								}}
								accessibilityLabel="Submit an accessibility rating"
							>
								<View style={{ display: "flex", flexDirection: "row" }}>
									<Icon
										name="map-marker"
										size={45}
										color={isOpenInMapsTapped ? PRIMARY_COLOR : TEXT_COLOR}
									/>
									<Text
										style={{
											fontSize: 30,
											lineHeight: 45,
											marginLeft: 10,
											marginTop: 5,
											fontFamily: "APHontBold",
											color: isOpenInMapsTapped ? PRIMARY_COLOR : TEXT_COLOR,
										}}
									>
										{START_WALKING}
									</Text>
								</View>
							</View>
						</MapAnchor>
						{Object.entries(placeDetails.accessibilityData ?? {}).map(
							([attrName, rating], index) => {
								const fieldInfo = fieldInfos.find(
									fieldInfo => fieldInfo.avgFieldName === attrName
								) as FieldInfo;
								const isNumeric = fieldInfo?.ratingType === "numeric";
								if (attrName === "guideDogAvg") attrName = "avgGuideDogFriendly";
								if (["promotion", "_id"].includes(attrName)) return null;
								let attribute = fieldsToNamesMap[attrName];
								const score = rating;

								// These are here to make some of the text more friendly for this view
								if (attribute === "Menu Accessibility")
									attribute = "Accessible Menu Offered";
								if (attribute === "Staff Helpfulness") attribute = "Helpful Staff";

								return (
									<View
										key={`rating${index}`}
										style={{
											display: "flex",
											flexDirection: "row",
											justifyContent: "space-between",
											paddingVertical: 8,
											borderBottomColor: "black",
											borderBottomWidth: 1,
										}}
									>
										<View style={{ width: "50%" }}>
											<BodyText>{attribute}</BodyText>
										</View>
										<BodyText>
											{isNumeric
												? score ?? "No ratings"
												: ["Yes", "No"][Math.round(score as number)]}
										</BodyText>
										<PopUp
											fontSize={15}
											style={styles.popUp}
											accessibilityLabel={getPopUpProps(
												fieldInfo.renderText,
												"buttonAccessibilityLabel"
											)}
											text={"Help"}
											modalAccessibilityLabel={getPopUpProps(
												fieldInfo.fieldName,
												"modalAccessibilityLabel"
											)}
											closeButtonAccessibilityLabel={"Close this pop up."}
											closeButtonText={"Close"}
										>
											<Text>{fieldInfo.helpText}</Text>
										</PopUp>
									</View>
								);
							}
						)}
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
	popUp: {
		width: "20%",
		height: 40,
	},
});

export default DetailedViewScreen;
