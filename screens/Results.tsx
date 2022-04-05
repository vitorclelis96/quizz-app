import { NativeStackScreenProps } from "@react-navigation/native-stack";
import MainText from "../components/MainText";
import ScreenWrapper from "../components/ScreenWrapper";
import StandardText from "../components/StandardText";
import useQuizzStore from "../hooks/useQuizzStore";
import { MainStackParamList } from "../navigation/MainNavigation";
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';
import { FlatList, StyleSheet, View } from "react-native";
import Line from "../components/Line";
import StandardButton from "../components/StandardButton";
import { colors } from "../styles";

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        marginLeft: 15,
        marginRight: 25,
        textAlign: 'center',
    },
    rowCenter: {
        flexDirection: 'row',
        paddingBottom: 20,
        paddingTop: 20,
        alignItems: 'center',
    },
    btnStyle: {
        backgroundColor: colors.background,
    }
})

type Props = NativeStackScreenProps<MainStackParamList, 'Results'>;

export default function Results({ navigation }: Props) {
    const questions = useQuizzStore(state => state.questions);

    const goToHome = () => navigation.popToTop();

    const count = questions.reduce((p, c) => {
        if (c.userIsCorrect) {
            return p + 1;
        }
        return p;
    }, 0);

    const renderAnswers = () => {
        const data = questions.map((q) => ({
            uuid: q.uuid,
            question: q.question,
            isRight: q.userIsCorrect,
            icon: q.userIsCorrect ? 
                <AntDesign name="checkcircleo" size={24} color="green" />
                : <Feather name="x-circle" size={24} color="red" />
        }));
        return (
            <FlatList
                data={data}
                renderItem={({index, item}) => (
                    <View>
                        <View style={styles.rowCenter}>
                            {item.icon}
                            <StandardText style={styles.text}>{item.question}</StandardText>
                        </View>
                        <Line />
                    </View>
                )}
                keyExtractor={({uuid}) => uuid}
            />
        )
    };

    return (
        <ScreenWrapper>
            <MainText>You scored</MainText>
            <MainText>{`${count} / 10`}</MainText>
            {
                renderAnswers()
            }
            <StandardButton buttonStyle={styles.btnStyle} onPress={goToHome}>Play again?</StandardButton>
        </ScreenWrapper>
    )
}