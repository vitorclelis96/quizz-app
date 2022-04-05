import create from 'zustand';
import 'react-native-get-random-values';
import { v4 } from 'uuid';
import he from 'he';

type UseQuizzStoreType = {
    questions: Array<QuizzQuestion>,
    newGame: () => Promise<void>,
    error: boolean,
    currentQuestion?: QuizzQuestion,
    questionCount?: number,
    answerQuestion: (uuid: string, response: TrueOrFalse) => void,
    nextQuestion: () => void,
    quizzIsOver: boolean,
}

export type TrueOrFalse = "True" | "False";

export type QuizzQuestion = {
    uuid: string,
    category: string,
    question: string,
    correct_answer: TrueOrFalse,
    userResponse?: TrueOrFalse,
    userIsCorrect?: boolean,
}

type QuizzApiResponse = {
    response_code: number,
    results: QuizzQuestion[],
}

const rawStore = {
    questions: [],
    answers: [],
    error: false,
    currentQuestion: undefined,
    questionCount: undefined,
    quizzIsOver: false,
}

const useQuizzStore = create<UseQuizzStoreType>(set => ({
    ...rawStore,
    newGame: async () => {
        try {
            set(state => ({
                ...state,
                ...rawStore
            }));
            const res = await fetch('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean');
            const jsonData = await res.json() as QuizzApiResponse;
            set(state => {
                state.questionCount = 0;
                state.currentQuestion = state.questions[0];

                state.quizzIsOver = false;

                state.questions = jsonData.results.map(r => ({
                    ...r,
                    uuid: v4(),
                    question: he.decode(r.question),
                }));

                state.currentQuestion = state.questions[0];

                return { ...state };
            });
        } catch (error) {
            set({ error: true });
        }
    },
    answerQuestion: (uuid: string, response: TrueOrFalse) => {
        set(state => {
            state.questions = state.questions.map(q => {
                if (q.uuid === uuid) {
                    return {
                        ...q,
                        userResponse: response,
                        userIsCorrect: response === q.correct_answer,
                    }
                }
                return { ...q };
            });
            return { ...state };
        });
    },
    nextQuestion: () => {
        set(state => {
            const nextQuestion = state.questions.find((q) => !q.userResponse);
            if (!nextQuestion) {
                state.quizzIsOver = true;
                return { ...state }
            }
            state.currentQuestion = nextQuestion;
            state.questionCount = (state.questionCount || 0) + 1;
            return { ...state };
        })
    },
}));

export default useQuizzStore;