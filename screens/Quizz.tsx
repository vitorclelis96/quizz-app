import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useSWR from "swr";
import MainText from "../components/MainText";
import ScreenWrapper from "../components/ScreenWrapper";
import StandardText from "../components/StandardText";
import useQuizzStore from "../hooks/useQuizzStore";

const styles = StyleSheet.create({

});

export default function Quizz() {
    const fetch = useQuizzStore(state => state.fetch);
    const questions = useQuizzStore(state => state.questions);
    const error = useQuizzStore(state => state.error)
    
    useEffect(() => fetch(), []);

    let toReturn: React.ReactNode;

    if (error) {
        toReturn = (
            <MainText>TODO: GOT ERROR</MainText>
        )
    } else if (questions) {
        toReturn = (
            questions.map((q) => (
                <StandardText>{q.category}</StandardText>
            ))
        )
    } else {
        toReturn = (
            <StandardText>Loading</StandardText>
        )
    }

    return (
        <ScreenWrapper>
            {toReturn}
        </ScreenWrapper>
    )
}