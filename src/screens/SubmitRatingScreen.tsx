import React, { useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { PlaceImage } from "../components/PlaceImage";
import { Button } from "../components/Button";
import { CANCEL, getIncrementRatingButtonLabel, PLACE_ATTRIBUTES, SUBMIT } from "../util/strings";

export interface SubmitRatingScreenProps {
	placeID?: string;
	placeName?: string;
	photo_reference?: string;
}

export const DEFAULT_INTERIM_RATING = 3;
const MAX_COUNT = 5;
const MIN_COUNT = 0;
const INCREMENT_VAL = 0.5;

const SubmitRatingScreen: React.FC<SubmitRatingScreenProps> = ({
	placeName,
	photo_reference,
}: SubmitRatingScreenProps) => {
	const [counter, setCounter] = useState(
		PLACE_ATTRIBUTES.reduce<{ [attribute: string]: number }>(function (countersMap, attribute) {
			countersMap[attribute] = DEFAULT_INTERIM_RATING;
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
					// TODO
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
