import { Text, StyleSheet, StyleProp, TextStyle } from "react-native";
import { colors, typography } from "../styles";

const styles = StyleSheet.create({
    default: {
        fontSize: typography.font_normal,
        textAlign: 'center',
        color: colors.main,
    }
})

type StandardTextProps = {
    children: string,
    style?: StyleProp<TextStyle>
}

export default function StandardText({ children, style }: StandardTextProps) {
    return (
        <Text style={[styles.default, style]}>{children}</Text>
    )
}