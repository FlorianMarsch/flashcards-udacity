import { AsyncStorage } from 'react-native'

const DECK_STORAGE_KEY = 'decks';

export function saveDeck(newTitle) {
    const newDeck = { title: newTitle, questions: [] }
    console.log(newDeck);
    AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({ [newTitle]: newDeck }));

}

export function getDecks() {
    return AsyncStorage.getItem(DECK_STORAGE_KEY).then((result) => JSON.parse(result));

    /*return {
        React: {
            title: 'React',
            questions: [
                {
                    question: 'What is React?',
                    answer: 'A library for managing user interfaces'
                },
                {
                    question: 'Where do you make Ajax requests in React?',
                    answer: 'The componentDidMount lifecycle event'
                }
            ]
        },
        JavaScript: {
            title: 'JavaScript',
            questions: [
                {
                    question: 'What is a closure?',
                    answer: 'The combination of a function and the lexical environment within which that function was declared.'
                }
            ]
        }
    };*/
}

export function getDeck(title) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY).then(result => {

        const data = JSON.parse(result);
        const deck = data[title];

        return deck;
    });

}

export function saveCard(title, card) {
    AsyncStorage.getItem(DECK_STORAGE_KEY).then(result => {

        const data = JSON.parse(result);
        const deck = data[title];
        deck.questions = [...deck.questions, card];
        return deck;
    }).then(deck => AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({ [title]: deck })));

}