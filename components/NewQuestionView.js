import React, { Component } from 'react'
import {
    View,
    Text,
    TextInput,
    Alert
} from 'react-native'

import Button from './Button'

import { saveCard, getDeck } from '../api'

class NewQuestionView extends Component {

    state = {
        question: '',
        answer: '',
        deck: undefined
    }

    static navigationOptions = ({ navigation }) => {
        return { title: 'Create Questions' }
    };

    componentDidUpdate() {
        // https://github.com/react-navigation/react-navigation/issues/1891
        this.componentDidMount();
    }

    componentDidMount() {
        let title = this.props.navigation.state.params.deck;
        getDeck(title).then((deck) => {


            this.setState({
                deck: deck
            })
        });
    }

    save = () => {


        const { question, answer } = this.state;
        if (question.trim().length == 0 || answer.trim().length == 0) {
            Alert.alert(
                'Cannot save new Question',
                'question or answer is missing!'
            )

        } else {


            saveCard(this.state.deck.title, { question: question, answer: answer });
            this.props.navigation.goBack();



        }
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>

                <Text>What is the Question?</Text>
                <TextInput
                    value={this.state.question}
                    onChangeText={(question) => this.setState({ question: question })}
                    placeholder="Enter Question" />
                <Text>What is the correct Answer?</Text>
                <TextInput
                    value={this.state.answer}
                    onChangeText={(answer) => this.setState({ answer: answer })}
                    placeholder="Correct Answer" />
                <Button onClick={this.save} text='Create Question' />
            </View>
        )
    }

}





export default NewQuestionView;