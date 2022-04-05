import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import MainText from '../components/MainText';
import ScreenWrapper from '../components/ScreenWrapper';
import StandardButton from '../components/StandardButton';
import StandardText from '../components/StandardText';
import useQuizzStore from '../hooks/useQuizzStore';
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
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const newGame = useQuizzStore(state => state.newGame);

    const navigateToQuizzBegin = async () => {
        try {
            setIsLoading(true);
            await newGame();
            setIsLoading(false);
            navigation.navigate('Quizz');
        } catch (error) {
            // console.log(error);
            setErrorMessage('Something went wrong while fetching quizz api');
        }
    }

    if (errorMessage !== '') {
        Alert.alert('Error', errorMessage);
    }

    return (
        <ScreenWrapper style={styles.content}>
            <MainText>Welcome to the Trivia Challenge!</MainText>
            <StandardText>You will be presented with 10 True of False questions.</StandardText>
            <StandardText>Can you score 100%?</StandardText>
            {
                isLoading ?
                    <ActivityIndicator size='large' color={colors.main} />
                    : <StandardButton disabled={isLoading} onPress={navigateToQuizzBegin}>B E G I N</StandardButton>

            }
        </ScreenWrapper>
    )
}