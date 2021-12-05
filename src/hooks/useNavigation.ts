import { useContext } from "react";
import { NavigationScreenProp, NavigationRoute, NavigationContext } from "react-navigation";

// Credit: https://dev.to/andreasbergqvist/react-navigation-with-typescript-29ka#:~:text=I%20will%20be%20using%20a%20useNavigation%20hook

export function useNavigation<Params>() {
	return useContext(NavigationContext) as unknown as NavigationScreenProp<
		NavigationRoute,
		Params
	>;
}
