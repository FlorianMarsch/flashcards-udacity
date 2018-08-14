import React from 'react';

import Navigation from './components/Navigation';
import { enableNotification } from './api/notification'

import { AsyncStorage } from 'react-native'


export default class App extends React.Component {

  componentDidMount() {
    //AsyncStorage.clear();
    enableNotification();
  }

  render() {
    return (
      <Navigation />
    );
  }

}


