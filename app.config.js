export default {
	name: "Peer",
	description:
		"An explorative navigation app for the blind and visually impaired for iOS and Android.",
	owner: "peer-stevens",
	slug: "peer",
	sdkVersion: "43.0.0",
	version: "1.2.0",
	orientation: "portrait",
	githubUrl: "https://github.com/Peer-Stevens/peer",
	icon: "./assets/icon.png",
	permissions: ["ACCESS_FINE_LOCATION", "ACCESS_BACKGROUND_LOCATION"],
	splash: {
		image: "./assets/splash.png",
		resizeMode: "contain",
		backgroundColor: "#ffffff",
	},
	primaryColor: "#ffffff",
	updates: {
		fallbackToCacheTimeout: 0,
	},
	assetBundlePatterns: ["**/*"],
	ios: {
		bundleIdentifier: "com.aej11.peerstevens",
		supportsTablet: true,
		buildNumber: "1.2.0",
	},
	android: {
		adaptiveIcon: {
			foregroundImage: "./assets/android-icon-foreground.png",
			backgroundImage: "./assets/android-icon-background.png",
			backgroundColor: "#FFFFFF",
		},
		package: "com.peer.peerstevens",
		versionCode: 3,
		config: {
			googleMaps: {
				apiKey: process.env.MAPS_API_KEY,
			},
		},
	},
	androidStatusBar: {
		barStyle: "dark-content",
	},
	androidNavigationBar: {
		visible: "sticky-immersive",
		barStyle: "light-content",
	},
	web: {
		favicon: "./assets/favicon.png",
	},
};
