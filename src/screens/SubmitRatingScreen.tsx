import React, { useRef } from "react";
import { ScrollView, View, Text } from "react-native";
import { PlaceImage } from "../components/PlaceImage";
import { Button } from "../components/Button";
import { CANCEL, getIncrementRatingButtonLabel, PLACE_ATTRIBUTES, SUBMIT } from "../util/strings";
import Screens from "../util/screens";

export interface SubmitRatingScreenProps {
	placeID?: string;
	placeName?: string;
	photo_reference?: string;
	setPage: (screen: Screens) => void;
}

export const DEFAULT_INTERIM_RATING = 3;

const SubmitRatingScreen: React.FC<SubmitRatingScreenProps> = ({
	placeName,
	photo_reference,
	setPage,
}: SubmitRatingScreenProps) => {
	// 0 index is navigability, 1 is sensory aid, 2 is staff helpfulness, 3 is guide dog
	const interimRatingRef = useRef([
		DEFAULT_INTERIM_RATING,
		DEFAULT_INTERIM_RATING,
		DEFAULT_INTERIM_RATING,
		DEFAULT_INTERIM_RATING,
	]);

	return (
		<ScrollView>
			<PlaceImage photoref={photo_reference} placeName={placeName} />
			<Text>{placeName}</Text>
			<Button
				text={CANCEL}
				accessibilityLabel={CANCEL}
				onPress={() => {
					setPage(Screens.Details);
				}}
			/>
			{PLACE_ATTRIBUTES.map((attribute, index) => {
				const interimRating = interimRatingRef.current[index];
				return (
					<View key={`rating${index}`}>
						<Button
							iconName={"minus"}
							accessibilityLabel={getIncrementRatingButtonLabel(
								true,
								interimRating,
								attribute,
								placeName
							)}
							onPress={() => {
								// TODO
							}}
						/>
						<Text>{attribute}</Text>
						<Text>{interimRating}</Text>
						<Button
							iconName={"plus"}
							accessibilityLabel={getIncrementRatingButtonLabel(
								false,
								interimRating,
								attribute,
								placeName
							)}
							onPress={() => {
								// TODO
							}}
						/>
					</View>
				);
			})}
			<Button
				text={SUBMIT}
				accessibilityLabel={SUBMIT}
				onPress={() => {
					//TODO
				}}
			/>
		</ScrollView>
	);
};

export default SubmitRatingScreen;
