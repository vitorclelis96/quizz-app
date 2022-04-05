import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import MainText from '../components/MainText';
import ScreenWrapper from '../components/ScreenWrapper';
import StandardButton from '../components/StandardButton';
import StandardText from '../components/StandardText';
import { MainStackParamList } from '../navigation/MainNavigation';
import { colors, typography} from '../styles';

type Props = NativeStackScreenProps<MainStackParamList, 'Home'>;

const styles = StyleSheet.create({
    content: {
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    mainText: {
        fontSize: typography.font_big,
        textAlign: 'center',
        fontWeight: 'bold',
        color: colors.main
    },
    btn: {
        backgroundColor: 'white',
        paddingVertical: 7,
        paddingHorizontal: 12,
        borderRadius: 10,
    }
})

export default function Home({ navigation}: Props) {
    const navigateToQuizzBegin = () => {
        navigation.navigate('Quizz');
    }
    return (
        <ScreenWrapper style={styles.content}>
            <MainText>Welcome to the Trivia Challenge!</MainText>
            <StandardText>You will be presented with 10 True of False questions.</StandardText>
            <StandardText>Can you score 100%?</StandardText>
            <StandardButton onPress={navigateToQuizzBegin}>B E G I N</StandardButton>
        </ScreenWrapper>
    )
}