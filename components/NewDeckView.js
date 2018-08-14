import React, { Component } from 'react'
import {
    View,
    Text,
    TextInput,
    Alert
} from 'react-native'

import Button from './Button'

import { saveDeck } from '../api'

class NewDeckView extends Component {

    state = {
        title: ''
    }

    static navigationOptions = ({ navigation }) => {
        return { title: 'Create Deck' }
    };

    componentDidUpdate() {
        // https://github.com/react-navigation/react-navigation/issues/1891
        this.componentDidMount();
    }

    save = () => {

        const { title } = this.state;
        if (title.trim().length == 0) {
            Alert.alert(
                'Cannot save new Deck',
                'Title is missing!'
            )

        } else {


            saveDeck(title);
            const { navigate, goBack } = this.props.navigation;
            goBack();
            navigate('Details', { deck: title });
            this.setState(() => ({ title: '' }));



        }
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>

                <Text>What is the Title of your new Deck?</Text>
                <TextInput
                    value={this.state.title}
                    onChangeText={(title) => this.setState({ title: title })}
                    placeholder="Enter Title" />
                <Button onClick={this.save} text='Create Deck' />
            </View>
        )
    }

}





export default NewDeckView;