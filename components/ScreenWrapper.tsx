import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, StyleProp, ViewStyle } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { MainStackParamList } from '../navigation/MainNavigation';
import { colors } from '../styles';

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 5,
    },
})

type ScreenProps = {
    children: React.ReactNode,
    style?: StyleProp<ViewStyle>,
}

export default function ScreenWrapper({children, style}: ScreenProps) {
    return (
        <SafeAreaView style={[styles.content, style]}>
            {children}
        </SafeAreaView>
    )
}