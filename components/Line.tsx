import { View, StyleSheet } from 'react-native';
import { colors } from '../styles';

const styles = StyleSheet.create({
    line: {
        borderWidth: 1,
        borderColor: colors.earthYellow,
    }
});

export default function Line() {
    return (
        <View style={styles.line} />
    )
}