import React, {useState} from "react"
import {Pressable, Image, StyleSheet, View, Text} from "react-native"

import { PRIMARY_COLOR, PRIMARY_LIGHT, TEXT_COLOR } from "../../util/colors"

// All assets that can possibly be loaded into a button will
// need to be initialized here. require cannot be passed
// a dynamic value
import FilterIcon from "../../assets/filter-icon.svg"

export interface ButtonProps {
    text?: string,
    image?: string,
    accessibilityLabel: string, // not optional for this project.
    onPress: VoidFunction,
    style?: any, // may be unsafe
}

/**
 * Peer-styled button element to keep a consistent design.
 */
const Button = ({image, text, accessibilityLabel, onPress, style} : ButtonProps) : JSX.Element => {

    const [color, setColor] = useState<string>(PRIMARY_COLOR)

    const styles = StyleSheet.create({
        button: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 15,
            paddingVertical: 10,
            backgroundColor: color
        }
    })

    // chooses one to display, favoring bottom most prop

    let display : JSX.Element | null = null;    

    if (text !== undefined) {
        display = <Text style={{fontWeight: "bold", color: TEXT_COLOR, fontSize: 30}}>{text}</Text>
    }

    if (image !== undefined) {
        switch (image) {
            case "filter-icon.svg":
                display = <FilterIcon width={40} height={40} color={PRIMARY_LIGHT}/>
                break;
            default:
                throw new Error("passed image file name is not available for this component");
        }
    }

    return (
        <Pressable 
            onPress={() => {
                onPress()
                setColor(PRIMARY_COLOR)
            }} 
            onPressIn={() => setColor(PRIMARY_LIGHT)}
            onPressOut={() => setColor(PRIMARY_COLOR)}  
            style={StyleSheet.compose(styles.button, style)}
            accessibilityLabel={accessibilityLabel}>
            <View>
                {display}
            </View>
        </Pressable>
    )
}

export default Button;