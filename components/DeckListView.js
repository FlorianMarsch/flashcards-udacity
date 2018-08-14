import React, { Component } from 'react';
import {
    FlatList,
    Text
} from 'react-native';

import { Card } from 'react-native-elements'

import Button from './Button';

import { getDecks } from '../api';

class DeckListView extends Component {


    state = {
        decks: []
    }

    static navigationOptions = ({ navigation }) => {
        return { title: 'Your Decks' }
    };

    componentDidUpdate() {
        // https://github.com/react-navigation/react-navigation/issues/1891
        this.componentDidMount();
    }


    componentDidMount() {

        getDecks().then((data) => {
            if (!data) {
                return;
            }

            let transformed = Object.keys(data).map(key => {

                let element = data[key];
                return {
                    title: element.title,
                    questions: element.questions ? element.questions.length : 0
                }
            });

            this.setState({
                decks: transformed
            });
        });
    }


    render() {
        return (

            <FlatList
                style={{
                    padding: 20
                }}
                data={this.state.decks}
                renderItem={
                    ({ item }) => (
                        <Card
                            key={item.title}
                            title={item.title}
                        >

                            <Text >
                                {item.questions} Cards
                                </Text>
                            <Button
                                onClick={() => {
                                    const { navigate } = this.props.navigation;
                                    navigate('Details', { deck: item.title });
                                }}
                                text="open"

                            />

                        </ Card>)





                }
            />


        )
    }

}





export default DeckListView;