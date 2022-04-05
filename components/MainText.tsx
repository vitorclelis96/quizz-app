import { Text, StyleSheet, StyleProp, TextStyle } from "react-native";
import { colors, typography } from "../styles";

const styles = StyleSheet.create({
    default: {
        fontSize: typography.font_big,
        textAlign: 'center',
        fontWeight: 'bold',
        color: colors.main
    }
})

type MainTextProps = {
    children: string,
    style?: StyleProp<TextStyle>
}

export default function MainText({ children, style }: MainTextProps) {
    return (
        <Text style={[styles.default, style]}>{children}</Text>
    )
}