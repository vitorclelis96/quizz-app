import create from 'zustand';
import 'react-native-get-random-values';
import { v4 } from 'uuid';

type UseQuizzStoreType = {
    questions: Array<QuizzQuestion>,
    answers: Array<QuizzUserResponse>,
    fetch: () => void,
    error: boolean,
}

type TrueOrFalse = "True" | "False";

type QuizzQuestion = {
    uuid: string,
    category: string,
    question: string,
    correct_answer: TrueOrFalse,
}

type QuizzApiResponse = {
    response_code: number,
    results: QuizzQuestion[],
}

type QuizzUserResponse = {
    uuid: string,
    userResponse?: TrueOrFalse,
    correctAnswer: TrueOrFalse,
    userIsCorrect?: boolean,
   
}

const useQuizzStore = create<UseQuizzStoreType>(set => ({
    questions: [],
    answers: [],
    error: false,
    fetch: async () => {
        try {
            const res = await fetch('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean');
            const jsonData = await res.json() as QuizzApiResponse;
            set({ questions: jsonData.results.map(r => ({
                ...r,
                uuid: v4(),
            }))});
            set({ answers: jsonData.results.map(r => ({
                uuid: r.uuid,
                correctAnswer: r.correct_answer,
            }))});
        } catch (error) {
            set({ error: true });
        }
    },
    answerQuestion: (uuid: string, response: TrueOrFalse) => {
        set(state => {
            state.answers = state.answers.map(a => {
                if (a.uuid === uuid) {
                    return {
                        ...a,
                        userResponse: response,
                        userIsCorrect: response === a.correctAnswer,
                    }
                }
                return a;
            });
            return state;
        })
    },
}));

export default useQuizzStore;