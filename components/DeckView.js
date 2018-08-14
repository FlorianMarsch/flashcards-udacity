import React, { Component } from 'react'
import {
    View,
    Text
} from 'react-native'

import { Card } from 'react-native-elements'
import Button from './Button';

import { getDeck } from '../api'

class DeckView extends Component {


    state = {
        deck: undefined
    }

    static navigationOptions = ({ navigation }) => {
        return { title: navigation.getParam('deck') }
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


    render() {

        if (!this.state.deck) {
            return <Text>Loading</Text>
        }

        let item = this.state.deck;


        return (


            <View>

                <Card
                    key={item.title}
                    title={item.title}
                >

                    <Text >
                        {item.questions ? item.questions.length : 0} Cards
                    </Text>
                    <Button
                        onClick={() => {
                            const { navigate } = this.props.navigation;
                            navigate('Quiz', { deck: item.title });
                        }}
                        text="Start Quiz"

                    />
                    <Button
                        onClick={() => {
                            const { navigate } = this.props.navigation;
                            navigate('AddCard', { deck: item.title });
                        }}
                        text="Add Questions"

                    />

                </ Card>
            </View>


        )
    }

}





export default DeckView;