import React, { useState } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import type { StyleProp } from "react-native";
import { PRIMARY_COLOR, TEXT_COLOR } from "../util/colors";
import { Button } from "./Button";
import Modal from "react-native-modal";

export interface ModalProps {
	text: string;
	accessibilityLabel: string;
	accessibilityHint?: string;
	modalAccessibility: string;
	closeButtonAccessibilityLabel: string;
	closeButtonText: string;
	style?: StyleProp<ViewStyle>;
}

export const PopUp: React.FC<ModalProps> = ({
	text,
	accessibilityLabel,
	accessibilityHint,
	modalAccessibility,
	closeButtonText,
	closeButtonAccessibilityLabel,
	style,
	children,
}) => {
	const [modalVisible, setModalVisible] = useState(false);
	return (
		<View
			accessibilityLabel={modalAccessibility}
			accessibilityHint={modalAccessibility}
			style={StyleSheet.compose(
				{
					backgroundColor: PRIMARY_COLOR,
				},
				style
			)}
		>
			<Modal isVisible={modalVisible} style={styles.modal}>
				<View style={styles.modalView}>
					{children}
					<Button
						style={{ marginTop: 15 }}
						onPress={() => setModalVisible(!modalVisible)}
						accessibilityLabel={closeButtonAccessibilityLabel}
						text={closeButtonText}
					/>
				</View>
			</Modal>
			<Button
				onPress={() => setModalVisible(true)}
				accessibilityLabel={accessibilityLabel}
				accessibilityHint={accessibilityHint}
				text={text}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	modal: {
		justifyContent: "flex-end",
		margin: 0,
	},
	modalView: {
		backgroundColor: "white",
		borderColor: TEXT_COLOR,
		borderStyle: "solid",
		borderTopWidth: 3,
		padding: 15,
		alignItems: "center",
	},
});
