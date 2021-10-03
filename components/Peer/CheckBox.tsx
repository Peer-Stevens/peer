import React from "react"
import { View, Text, StyleSheet } from "react-native"
import * as CB from "@react-native-community/checkbox"
import { TEXT_COLOR } from "../../util/colors"

export interface CheckBoxProps {
    value: boolean,
    onValueChange: VoidFunction,
    text: string,
    accessibilityLabel: string
}

const CheckBox = ({value, onValueChange, text, accessibilityLabel}:CheckBoxProps) => {
    return (
        <View style={styles.container} accessibilityLabel={accessibilityLabel}>
            <CB.default value={value} onValueChange={onValueChange}/>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: TEXT_COLOR,
        fontWeight: "bold"
    },
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        margin: 5
    }
})

export default CheckBox