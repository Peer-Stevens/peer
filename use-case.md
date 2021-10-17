# Use Cases

## First-time Open Use Case

The first time the user opens the app, a prompt appears asking them to enable their location permissions. Then a box appears that asks them to identify their personal experience with their disability, including:

- Sunlight sensitivty
- Reads braille
- Dislikes help from sighted strangers

The answers for these questions will be used to personalize their app experience. If the user selected that they have sunlight sensitivity, the app switches into dark mode after the user submits the identification. If the user selected that they read braille, they view an info box that advises the user to turn on their OS screen reader functionality. These self-identification options are also available in the settings.

After this, the user is taken to the main view, which includes a list of recommended nearby places, a button to take a stroll, a map displaying their current location, and a settings button.

## Strolling Use Case

There is a "Take a stroll" button on the main view, and a small button besides it reveals a box that is drawn over the main view with a "filter list" of categories with checkmarks. When the user selects the "Take a stroll" button on the main view of the app, they enter a "strolling" state. They are taken to another view that contains a bulleted list of nearby recommended places.

If the user has the app open still:
The text appears in the aforementioned bulleted list.

If the user has the app running in the background and a different app open, or has the phone locked:
A push notification is sent instead.

The notification that appears on the user's device states that the location that they have just walked by is highly accessible, and which direction it was given their heading (on their left, right, etc.) Only the highly accessibly locations that fall under the categories selected in the filter list are recommended via notifictioan the rest are ignored. There is a setting available to disable these notifications from each OS's respective notifications menu.

## Rating Use Case

From the main view, a map of the area surrounding the user is displayed, and recommended locations have a pin that can be selected. Upon selecting a pin, the user is taken to a new view that contains the name of the location, a description of the location (from Google/Apple maps), that location's address, and an overall accessibility score from 0-5. Below these fields are a set of fields labeled:

-   Use of braille (if the user selected that they read braille)
-   Font size on signs
-   Staff helpfulness  (if the user did not select that they dislike help from sighted strangers)
-   Navigability

There is a "-" and "+" button to the left and right of the field, respectively.

When the field names are tapped while using a screen reader, a description of the button is read aloud.

-   "Use of braille: how well this facility makes use of braille"
-   "Font size on signs: font size on signs was large enough for those with low vision"
-   "Staff helpfulness: how well staff were willing to accomodate you for your vision problems"
-   "Navigability: how many landmarks, furniture, or other objects were available for you to touch to navigate the facility"

If the user is signed in, tapping the "-"/"+" button for each field will decrease/increase the rating by some interval, and read aloud the new rating value when a screen reader is enabled. If the user is not authenticated and they tap one of these buttons, they are prompted to authenticate.

Users may tap the "+" and "-" buttons again after leaving a rating to change their rating.

When using a screen reader, if the user has not already given a rating, they will hear "No previous rating given" when pressing on the field name, after the description. If the user has given a rating, they will hear "Previous rating: [rating]" after the description.

### Comment Use Case

Beneath all of the rating fields for a location is a comments section, labeled "Comments". Beneath this label is a text field where the user can enter some text, and beneath that is a button labeled "Submit". Beneath this button is a list of other users' comments, labeled with their name and their comment text. When the user hits "Submit", if they are signed in, their comment is added for other users of the app to read. If they are not signed in when the user hits "Submit", they are prompted to authenticate.

## Search Bar Use Case

At the top of the screen of the main view, there is a search bar visible. When the user enters text into the search bar, the list of nearby places is replaced with a list of locations with matching names with the nearest at the top and the farthest at the bottom. This list is refreshed as they enter each letter, with no need to press a button to submit. If the user selects one of the locations, the map pans over to the selected location, and the box described in "General Facility Rating Use Case" is shown.
## Settings Use Case

There is a button at the top right of the main view. Pressing this button opens a box with a small list of options:

-   Self-identification settings
-   Notification settings

Pressing "self-identifcation settings" will take the user to the list of all of the experiences that they identify with concerning their disability, and toggle each one back on or off.

Pressing "notification settings" will take the user to their OS settings where they can configure the push notifications for this app.

## Authentication Use Case

There is a button at the top right of the main view, underneath the button for the settings. Pressing this button takes the user to a new view where there are two text fields, one labeled "Email address" and one labeled "Password". Underneath these fields is a button labeled "Sign in" and another labeled "Sign up".

If the user does not have an account:

The user can click the button labeled "Sign up". After clicking this button, they are taken to a view that contains three fields: one labeled "Email address", one emailed "Password", and the last labeled "Confirm password". After the user enters one of their email addresses and selects a password and enters it into the bottom two boxes, they are signed into the app successfully.

If the user already has an account:

After entering their username and selected password, the user can press the "Sign-in" button. After validating that their credentials exist and are correct,  they are successfully signed into the app.