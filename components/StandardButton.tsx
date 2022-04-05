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
    disabled?: boolean
}

export default function StandardButton({ disabled, children, buttonStyle, textStyle, onPress }: StandardButtonProps) {
    return (
        <TouchableOpacity disabled={disabled} style={[styles.default, buttonStyle]} onPress={onPress}>
            <StandardText style={textStyle}>{children}</StandardText>
        </TouchableOpacity>
    )
}