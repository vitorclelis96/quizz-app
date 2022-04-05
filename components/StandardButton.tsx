import { StyleSheet, StyleProp, TextStyle, TouchableOpacity, ViewStyle, GestureResponderEvent } from "react-native";
import StandardText from "./StandardText";

const styles = StyleSheet.create({
    default: {
        backgroundColor: 'white',
        paddingVertical: 7,
        paddingHorizontal: 12,
        borderRadius: 10,
    }
})

type StandardButtonProps = {
    children: string,
    buttonStyle?: StyleProp<ViewStyle>,
    textStyle?: StyleProp<TextStyle>,
    onPress: (event: GestureResponderEvent) => void
}

export default function StandardButton({ children, buttonStyle, textStyle, onPress }: StandardButtonProps) {
    return (
        <TouchableOpacity style={[styles.default, buttonStyle]} onPress={onPress}>
            <StandardText style={textStyle}>{children}</StandardText>
        </TouchableOpacity>
    )
}