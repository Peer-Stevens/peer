import React from "react"
import {View, StyleSheet} from "react-native"
import { PRIMARY_COLOR } from "../../util/colors"

export interface BoxProps {
    children?: JSX.Element | null
    accessibilityLabel: string
    //eslint-disable-next-line @typescript-eslint/ban-types
	style?: object; // may be unsafe, but this is the type provided
	// by Stylesheet documentation:
	// https://reactnative.dev/docs/stylesheet#compose
}

const Box = ({children, accessibilityLabel, style} : BoxProps): JSX.Element => {
    return (
        <View accessibilityLabel={accessibilityLabel} style={StyleSheet.compose(styles.box, style)}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        backgroundColor: PRIMARY_COLOR
    }
})

export default Box;