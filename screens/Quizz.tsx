import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import MainText from "../components/MainText";
import ScreenWrapper from "../components/ScreenWrapper";
import StandardText from "../components/StandardText";
import useQuizzStore, { TrueOrFalse } from "../hooks/useQuizzStore";
import StandardButton from "../components/StandardButton";
import { colors } from "../styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../navigation/MainNavigation";

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 50,
    },
    box: {
        borderColor: colors.sweetBrown,
        padding: 20,
        marginVertical: 20,
        borderWidth: 2,
    },
    titleMarginBottom: {
        marginBottom: '30%',
    },
    largeBtn: {
        paddingHorizontal: 30,
    },
    marginBottom: {
        marginBottom: 25,
    }
});

type Props = NativeStackScreenProps<MainStackParamList, 'Quizz'>;

export default function Quizz({ navigation }: Props) {
    const answerQuestion = useQuizzStore(state => state.answerQuestion);
    const nextQuestion = useQuizzStore(state => state.nextQuestion);
    const currentQuestion = useQuizzStore(state => state.currentQuestion);
    const questionCount = useQuizzStore(state => state.questionCount);
    const quizzIsOver = useQuizzStore(state => state.quizzIsOver);

    useEffect(() => {
        if (quizzIsOver) {
            navigation.navigate('Results');
        }
    }, [quizzIsOver]);

    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            Alert.alert(
                'Keep playing?',
                "You're still playing, are you sure you wanna go back and quit?",
                [
                    { text: "No", style: 'cancel', onPress: () => {} },
                    { text: 'Yes', style: 'destructive', onPress: () => navigation.dispatch(e.data.action) },
                ],
                {
                    cancelable: true,
                }
            );
        })
    }, [navigation])

    const wrap = (el: React.ReactNode) => (
        <ScreenWrapper>
        {el}
        </ScreenWrapper>
    );

    const AnswerButton = (text: string, onPress: () => void) => {
        return (
            <StandardButton buttonStyle={styles.largeBtn} onPress={onPress}>
                {text}
            </StandardButton>
        )
    }

    const doAnswer = (answer: TrueOrFalse) => {
        if (!currentQuestion) {
            return;
        }
        answerQuestion(currentQuestion.uuid, answer);
        nextQuestion();
    }

    if (!currentQuestion) {
        return wrap(<StandardText>Loading</StandardText>);
    }
    
    return (
        <ScreenWrapper style={{justifyContent: 'space-between'}}>
            <View>
            <StandardText>{currentQuestion.category}</StandardText>
            </View>
            <View>
            <MainText style={styles.box}>{currentQuestion.question}</MainText>
            {
                questionCount !== undefined && (
                    <StandardText style={styles.marginBottom}>{`Question ${(questionCount + 1)}/10`}</StandardText>
                )
            }
            </View>
            <View style={styles.buttonContainer}>
                {AnswerButton('True', () => doAnswer('True'))}
                {AnswerButton('False', () => doAnswer('False'))}
            </View>
        </ScreenWrapper>
    )
}