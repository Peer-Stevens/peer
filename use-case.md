# Use Cases

## First-time Open Use Case

The first time the user opens the app, they are read aloud an info box that appears on-screen explaining to them that the app includes built-in audio cues but advises the user to turn on their screen reader/voice over functionality. If the user agrees, they are automatically taken to the option on their respective operating system, and the built-in audio cues are disabled. If the user declines, the built-in audio cues remain enabled.

## Notification Use Case

A user with the app installed running in the background of their device walks past a location that has a high score based on prior reviews given on the app. A push notification appears on the user's device that is read aloud stating that the location that they have just walked by is highly accessible, and which direction it was given their heading (on their left, right, etc.) There is a setting available to disable these notifications from each OS's respective notifications menu.

## General Facility Rating Use Case

A user opens the app (some time after the first time). A map of the area surrounding the user is displayed, and notable locations have a pin that can be selected. Upon selecting a pin, a box is drawn over the map that contains the name of the location, a description of the location (from Google/Apple maps), that location's address, and an overall accessibility score from 0-5. Below these fields are a set of buttons labeled:

- Rate use of braille
- Rate font size on signs
- Rate staff helpfulness
- Rate openness of space

The first time that any of these buttons are tapped, a description of the meaning of the button is read aloud. 

- "Rate use of braille: Please speak aloud a number from 0-5 representing how well this facility makes use of braille. Say anything else to dismiss."
- "Rate font size on signs: Please speak aloud a number from 0-5 representing if the font size on signs was large enough for those with vision problems. Say anything else to dismiss."
- "Rate staff helpfulness: Please speak aloud a number from 0-5 representing how well staff were willing to accomodate you for your vision problems when asked. Say anything else to dismiss."
- "Rate openness of space: Please speak aloud a number from 0-5 representing how many landmarks, furniture, or other objects were available for you to touch to navigate the facility. Say anything else to dismiss."

After these descriptions have been read aloud the first time, the prompt will become more brief:

> "[name of button]: Please speak aloud a number from 0-5. Say anything else to dismiss."

After this prompt has been read aloud, another audio cue will play indicating that the user's voice is being recorded. If the user speaks a number from 0-5, that rating is recorded and used to compute the accessibility score of the location selected. If the user speaks aloud anything besides a number from 0-5, the prompt is closed.

Users may tap these "rating buttons" any number of times after leaving a rating to change their rating.

Tapping anywhere besides the box containing the location description will dismiss the box and return the user to the map view.

## Settings Use Case

There is a button at the top right of the map view. Pressing this button opens a box with a small list of options:

- Native voice-over settings
- Notification settings

Pressing "native voice-over settings" will take the user to a view where there is a setting with a switch to enable or disable the native voice-over (not the one provided by an OS screen reader). There is another option to change the text speed to a slower or faster speed.

Pressing "notification settings" will take the user to their OS settings where they can configure the notifications for this app.
