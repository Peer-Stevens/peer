import React from "react"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import * as Peer from "./Peer/lib"

const FilterBox = () : JSX.Element => {
    return (
        <Peer.Box accessibilityLabel="List of filters">
            <BouncyCheckbox
                onPress={(isChecked) => {}}
                text="Grocery stores"
            />
        </Peer.Box>
    )
}

export default FilterBox