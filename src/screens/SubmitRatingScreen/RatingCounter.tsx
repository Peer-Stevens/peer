import { YesNoRating } from "peer-types";
import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import CheckBox from "react-native-check-box";
import { Button } from "../../components/Button";
import { PopUp } from "../../components/PopUp";
import BoundedDial from "../../util/boundedDial";
import { getIncrementRatingButtonLabel, getPopUpProps } from "../../util/strings";
import { fieldInfo } from "./SubmitRatingScreen";

const RatingCounter: React.FC<{
	field: fieldInfo;
	counter: {
		[attribute: string]: BoundedDial<{
			value: number | null;
			text: string;
		}>;
	};
	setCounter: React.Dispatch<
		React.SetStateAction<{
			[attribute: string]: BoundedDial<{
				value: number | null;
				text: string;
			}>;
		}>
	>;
	yesNoCounter: {
		[attribute: string]: YesNoRating;
	};
	setYesNoCounter: React.Dispatch<
		React.SetStateAction<{
			[attribute: string]: YesNoRating;
		}>
	>;
	placeName?: string;
}> = ({ field, counter, setCounter, yesNoCounter, setYesNoCounter, placeName }) => {
	if (field.ratingType === "numeric") {
		const dial = counter[field.fieldName];
		return (
			<View style={styles.numericalRatingOptions}>
				<Button
					iconName={"minus"}
					accessibilityLabel={getIncrementRatingButtonLabel(
						dial.current().text,
						dial.peekPrev().text,
						field.renderText,
						placeName
					)}
					onPress={() => {
						setCounter({
							...counter,
							[field.fieldName]: counter[field.fieldName].prev(),
						});
					}}
				/>
				<View style={{ flexDirection: "column" }}>
					<Text style={styles.textStyle}>{field.renderText}</Text>
					<Text style={styles.textStyle}>{dial.current().text}</Text>
					<PopUp
						style={styles.popUp}
						accessibilityLabel={getPopUpProps(
							field.renderText,
							"buttonAccessibilityLabel"
						)}
						text={"Help"}
						modalAccessibilityLabel={getPopUpProps(
							field.fieldName,
							"modalAccessibilityLabel"
						)}
						closeButtonAccessibilityLabel={"Close this pop up."}
						closeButtonText={"Close"}
					>
						<Text>{field.helpText}</Text>
					</PopUp>
				</View>
				<Button
					iconName={"plus"}
					accessibilityLabel={getIncrementRatingButtonLabel(
						dial.current().text,
						dial.peekNext().text,
						field.renderText,
						placeName
					)}
					onPress={() => {
						setCounter({
							...counter,
							[field.fieldName]: counter[field.fieldName].next(),
						});
					}}
				/>
			</View>
		);
	} else {
		// thus, field.ratingType === "yes/no"

		return (
			<View style={styles.yesNoRatingOptions}>
				<View style={{ flex: 5 }}>
					<Text style={{ fontSize: 25 }}>{field.renderText}</Text>
					<PopUp
						accessibilityLabel={getPopUpProps(
							field.renderText,
							"buttonAccessibilityLabel"
						)}
						text={"Help"}
						modalAccessibilityLabel={getPopUpProps(
							field.fieldName,
							"modalAccessibilityLabel"
						)}
						closeButtonAccessibilityLabel={"Close this pop up."}
						closeButtonText={"Close"}
					>
						<Text ellipsizeMode="tail" numberOfLines={1}>
							{field.helpText}
						</Text>
					</PopUp>
				</View>
				<CheckBox
					style={{ flex: 2 }}
					onClick={() => {
						if (yesNoCounter[field.fieldName] === 0) {
							setYesNoCounter({
								...yesNoCounter,
								[field.fieldName]: 1,
							});
						} else {
							// thus, yesNoCounter[field.fieldName]  === 1
							setYesNoCounter({
								...yesNoCounter,
								[field.fieldName]: 0,
							});
						}
					}}
					isChecked={yesNoCounter[field.fieldName] === 1}
				/>
			</View>
		);
	}
};

const styles = StyleSheet.create({
	numericalRatingOptions: {
		flexDirection: "row",
		width: Dimensions.get("window").width,
		marginTop: 5,
		marginBottom: 5,
		justifyContent: "space-evenly",
	},
	yesNoRatingOptions: {
		flexDirection: "row",
		width: Dimensions.get("window").width,
		marginTop: 5,
		marginBottom: 5,
	},
	popUp: {
		width: Dimensions.get("window").width * 0.5,
		height: Dimensions.get("window").height * 0.1,
		alignSelf: "flex-end",
	},
	textStyle: {
		alignSelf: "center",
		fontFamily: "APHontBold",
		fontSize: 20,
	},
});

export default RatingCounter;
