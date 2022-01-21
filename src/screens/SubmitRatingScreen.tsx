import React from "react";
import { ScrollView, View, Text } from "react-native";
import { PlaceImage } from "../components/PlaceImage";
import { Button } from "../components/Button";
import { CANCEL, getIncrementRatingButtonLabel, PLACE_ATTRIBUTES, SUBMIT } from "../util/strings";
import { useCounter } from "../hooks/useCounter";

export interface SubmitRatingScreenProps {
	placeID?: string;
	placeName?: string;
	photo_reference?: string;
}

export const DEFAULT_INTERIM_RATING = 3;

const SubmitRatingScreen: React.FC<SubmitRatingScreenProps> = ({
	placeName,
	photo_reference,
}: SubmitRatingScreenProps) => {
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
				const { counter, increment, decrement } = useCounter(DEFAULT_INTERIM_RATING);

				return (
					<View key={`rating${index}`}>
						<Button
							iconName={"minus"}
							accessibilityLabel={getIncrementRatingButtonLabel(
								true,
								counter,
								attribute,
								placeName
							)}
							onPress={() => decrement(counter)}
						/>
						<Text>{attribute}</Text>
						<Text>{counter}</Text>
						<Button
							iconName={"plus"}
							accessibilityLabel={getIncrementRatingButtonLabel(
								false,
								counter,
								attribute,
								placeName
							)}
							onPress={() => increment(counter)}
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
