import React from 'react'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import DeckListView from './DeckListView'
import NewDeckView from './NewDeckView'
import DeckView from './DeckView'
import NewQuestionView from './NewQuestionView'
import QuizView from './QuizView'

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

let tabs = createBottomTabNavigator({
    DeckListView: {
        screen: DeckListView,
        navigationOptions: {
            tabBarLabel: 'Decks',
            tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
        }
    },
    NewDeckView: {
        screen: NewDeckView,
        navigationOptions: {
            tabBarLabel: 'add new Deck',
            tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
        }
    }
});

export default createStackNavigator({
    Home: {
        screen: tabs
    },
    Details: {
        screen: DeckView
    },
    AddCard: {
        screen: NewQuestionView
    },
    Quiz: {
        screen: QuizView
    }

})