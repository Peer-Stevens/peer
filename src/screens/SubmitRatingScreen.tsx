import React, { useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { PlaceImage } from "../components/PlaceImage";
import { Button } from "../components/Button";
import { CANCEL, getIncrementRatingButtonLabel, PLACE_ATTRIBUTES, SUBMIT } from "../util/strings";
import Screen from "../util/screens";
import { Rating } from "../util/ratingTypes";

export interface SubmitRatingScreenProps {
	placeName?: string;
	photo_reference?: string;
	setPage: (screen: Screen) => void;
	previousRating?: Rating | null;
}

export const DEFAULT_INTERIM_RATING = 3;
const MAX_COUNT = 5;
const MIN_COUNT = 0;
const INCREMENT_VAL = 0.5;

const SubmitRatingScreen: React.FC<SubmitRatingScreenProps> = ({
	placeName,
	photo_reference,
	setPage,
	previousRating,
}: SubmitRatingScreenProps) => {
	const [counter, setCounter] = useState(
		PLACE_ATTRIBUTES.reduce<{ [attribute: string]: number }>(function (countersMap, attribute) {
			if (previousRating) {
				// this smells bad
				if (attribute === "Navigability") {
					countersMap[attribute] = previousRating.navigability ?? DEFAULT_INTERIM_RATING;
				} else if (attribute === "Sensory Aids") {
					// TODO: change braille to sensory aids
					countersMap[attribute] = previousRating.braille ?? DEFAULT_INTERIM_RATING;
				} else if (attribute === "Staff Helpfulness") {
					countersMap[attribute] =
						previousRating.staffHelpfulness ?? DEFAULT_INTERIM_RATING;
				} else if (attribute === "Guide Dog Friendliness") {
					countersMap[attribute] =
						previousRating.guideDogFriendly ?? DEFAULT_INTERIM_RATING;
				}
			}
			return countersMap;
		}, {})
	);

	return (
		<ScrollView>
			<PlaceImage photoref={photo_reference} placeName={placeName} />
			<Text>{placeName}</Text>
			<Button
				text={CANCEL}
				accessibilityLabel={CANCEL}
				onPress={() => {
					setPage(Screen.Details);
				}}
			/>
			{PLACE_ATTRIBUTES.map((attribute, index) => {
				const count = counter[attribute];

				return (
					<View key={`rating${index}`}>
						<Button
							iconName={"minus"}
							accessibilityLabel={getIncrementRatingButtonLabel(
								true,
								count,
								attribute,
								placeName
							)}
							onPress={() => {
								if (count === MIN_COUNT) {
									return;
								}
								setCounter({
									...counter,
									[attribute]: count - INCREMENT_VAL,
								});
							}}
						/>
						<Text>{attribute}</Text>
						<Text>{count}</Text>
						<Button
							iconName={"plus"}
							accessibilityLabel={getIncrementRatingButtonLabel(
								false,
								count,
								attribute,
								placeName
							)}
							onPress={() => {
								if (count === MAX_COUNT) {
									return;
								}
								setCounter({
									...counter,
									[attribute]: count + INCREMENT_VAL,
								});
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
