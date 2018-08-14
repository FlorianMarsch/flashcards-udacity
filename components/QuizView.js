import React, { Component } from 'react'
import {
    View,
    Text,
    Easing
} from 'react-native'

import FlipView from 'react-native-flip-view-next'

import { Card } from 'react-native-elements'
import Button from './Button';

import { getDeck } from '../api'

class QuizView extends Component {


    state = {
        deck: undefined,
        correctAnswers: 0,
        index: 0,
        flipped: false
    }

    static navigationOptions = ({ navigation }) => {
        return { title: navigation.getParam('deck') + ' Quiz' }
    };


    componentDidMount() {
        let title = this.props.navigation.state.params.deck;
        getDeck(title).then((deck) => {


            this.setState({
                deck: deck,
                correctAnswers: 0,
                index: 0,
                flipped: false
            })
        });
    }


    render() {

        if (!this.state.deck) {
            return <Text>Loading</Text>
        }

        const { deck, index, correctAnswers, flipped } = this.state;


        //https://www.npmjs.com/package/react-native-flip-view
        return (
            index < deck.questions.length ?
                <FlipView style={{ flex: 1 }}
                    front={this.getFrontCard(deck, index)}
                    back={this.getBackCard(deck, index)}
                    isFlipped={flipped} />
                : <Card title={'Your score: ' + correctAnswers + ' correct answers'}>
                    <Button onClick={this.restart} text='Restart Quiz' />
                </Card>
        )
    }

    getFrontCard = (deck, currentIndex) => {

        let question = deck.questions[currentIndex];

        return (
            <Card title={question.question + '( ' + (currentIndex + 1) + ' of ' + deck.questions.length + ' )'} >
                <Button onClick={this.flip} text='flip to show Answer' />
            </Card >
        );
    };

    getBackCard = (deck, currentIndex) => {

        let question = deck.questions[currentIndex];

        return (
            <Card title={question.question + '( ' + (currentIndex + 1) + ' of ' + deck.questions.length + ' )'} >
                <Text >{question.answer}</Text>
                <Button onClick={this.correct} text='i know it' />
                <Button onClick={this.incorrect} text='i dont know it' />
            </Card>
        );
    };

    flip = () => {
        this.setState({ flipped: !this.state.flipped });
    }

    restart = () => {
        this.setState(
            {
                index: 0,
                correctAnswers: 0,
                flipped: false
            });
    }

    correct = () => {
        this.setState(
            {
                index: this.state.index + 1,
                correctAnswers: this.state.correctAnswers + 1,
                flipped: false
            });
    }

    incorrect = () => {
        this.setState(
            {
                index: this.state.index + 1,
                flipped: false
            });
    }

}







export default QuizView;