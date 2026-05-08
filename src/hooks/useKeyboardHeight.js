import { useEffect, useState } from "react";
import { Keyboard, Platform } from "react-native";

/**
 * Tracks the on-screen keyboard height so ScrollView padding can keep
 * focused fields (e.g. location) visible above the keyboard.
 */
export function useKeyboardHeight() {
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    useEffect(() => {
        const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
        const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

        const onShow = (e) => setKeyboardHeight(e.endCoordinates?.height ?? 0);
        const onHide = () => setKeyboardHeight(0);

        const subShow = Keyboard.addListener(showEvent, onShow);
        const subHide = Keyboard.addListener(hideEvent, onHide);

        return () => {
            subShow.remove();
            subHide.remove();
        };
    }, []);

    return keyboardHeight;
}
