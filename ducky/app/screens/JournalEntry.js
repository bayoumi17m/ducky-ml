// JournalEntry.js

import React, { Component, useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Keyboard, TouchableWithoutFeedback, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, Feather, MaterialCommunityIcons, FontAwesome, Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';

import styles from '../Styles';
import Dock from '../components/Dock';

export class JournalEntry extends Component {

  constructor() {
    super();

    this.state = {
      date: '',
      time: '',
      entryTitle: '',
      entry: '',
      tags: '',
    } 

    this.handleEntryTitle = this.handleEntryTitle.bind(this);
    this.handleEntry = this.handleEntry.bind(this);
    this.handleTags = this.handleTags.bind(this);
  }

  componentDidMount() {

    // Set date

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    var fullMonth;

    switch(month) {
      case 1: 
        fullMonth = 'January';
        break;
      case 2:
        fullMonth = 'February';
        break;
      case 3:
        fullMonth = 'March';
        break;
      case 4:
        fullMonth = 'April';
        break;
      case 5:
        fullMonth = 'May';
        break;
      case 6:
        fullMonth = 'June';
        break;
      case 7:
        fullMonth = 'July';
        break;
      case 8: 
        fullMonth = 'August';
        break;
      case 9: 
        fullMonth = 'September';
        break;
      case 10: 
        fullMonth = 'October';
        break;
      case 11:
        fullMonth = 'November';
        break;
      case 12:
        fullMonth = 'December';
        break;
      default:
        fullMonth = 'Error';   
    }

    this.setState({date: fullMonth + ' ' + date + ', ' + year });

    // Set time

    var hours = new Date().getHours();
    var min = new Date().getMinutes();

    min = (min<10?'0':'') + min;

    if (hours < 12 || hours === 24) {
      if (hours === 24) hours = 12;
      this.setState({time: hours + ':' + min + ' am'});
    }
    else {
      hours = hours - 12;
      this.setState({time: hours + ':' + min + ' pm'});
    }
  }

  handleEntryTitle = (text) => {
    this.setState({entryTitle: text});
  }

  handleEntry = (text) => {
    this.setState({entry: text});
  }

  handleTags = (text) => {
    this.setState({tags: text});
  }

  render() {
    return (
      <LinearGradient colors={['#6B8DB2', '#7998B9']} style={styles.container}>
        
        {/* Back Button */}
        <View style={styles.top_left}>
          <Ionicons name="ios-arrow-back" size={25} color="#ffffff" />
        </View>

        {/* Entry Information */}
        <View style={{paddingLeft: 30, paddingRight: 30}}>
          <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
            <Text style={styles.white_15}>{this.state.date}</Text>
            <Text style={styles.white_15}>{this.state.time}</Text>
          </View>
          {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}> */}
            <View>
              <TextInput style = {styles.white_25}
                underlineColorAndroid = "transparent"
                placeholder = "placeholder title"
                placeholderTextColor = "#fbfbfb"
                autoCapitalize = "none"
                onChangeText = {this.handleEntryTitle}
                
              />
            </View>
          {/* </TouchableWithoutFeedback> */}
        </View>

        {/* Tools */}
        <View style={{display: 'flex', flexDirection: 'row', paddingLeft: 30, paddingRight: 30, paddingTop: 20}}> 
          <MaterialIcons name="format-align-left" size={25} color="#fbfbfb" style={{marginRight: 15}} />
          <MaterialIcons name="format-align-center" size={25} color="#fbfbfb" style={{marginRight: 15}} />
          <MaterialIcons name="format-align-right" size={25} color="#fbfbfb" style={{marginRight: 15}} />
          <MaterialIcons name="format-bold" size={25} color="#fbfbfb" style={{marginRight: 15}} />
          <MaterialIcons name="format-italic" size={25} color="#fbfbfb" style={{marginRight: 15}} />
          <MaterialIcons name="format-underlined" size={25} color="#fbfbfb" style={{marginRight: 15}} />
        </View>

        {/* Text Space */}
        <View style={styles.corner_card} >
          {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss()} accessible={false}> */}
            <View style={{padding: 30}}>
              <TextInput style = {styles.blue_18}
                underlineColorAndroid = "transparent"
                placeholder = "Begin entry here..."
                placeholderTextColor = "#718399"
                autoCapitalize = "none"
                multiline={true}
                onChangeText = {this.handleEntry}
              />
            </View>
          {/* </TouchableWithoutFeedback> */}

          {/* Bottom Bar */}
          <View style={styles.bottom_bar}>
            {/* Tags */}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.blue_20}>Tags:</Text>
              {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss()} accessible={false}> */}
                <View style={{marginLeft: 10}}>
                  <TextInput style = {styles.blue_15}
                    placeholder = "#"
                    placeholderTextColor = "#718399"
                    autoCapitalize = "none"
                    onChangeText = {this.handleTags}
                  />
                </View>
              {/* </TouchableWithoutFeedback> */}
            </View>
            {/* Mood and Create Entry */}
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 20}}>
              <Text style={styles.blue_20}>Mood:</Text>
              <View style={{flexDirection: 'row', width: 150, justifyContent: 'space-evenly'}}>
                <MaterialIcons name="sentiment-satisfied" size={25} color="#f9e067" />
                <MaterialIcons name="sentiment-neutral" size={25} color="#f9e067" />
                <MaterialIcons name="sentiment-dissatisfied" size={25} color="#f9e067" />
              </View>
              {/* Create Entry Button */}
              <View style={styles.button_entry}>
                <Text style={styles.white_20}>Create Entry</Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* Dock */}
        <View style={styles.dock_container}>
          <View style={styles.dock}>
            <Feather name="home" size={50} color="#FFFFFF" onPress={() => this.props.navigation.navigate('HomeScreen')} />
            <MaterialCommunityIcons name="calendar-check-outline" size={50} color="#FFFFFF" onPress={() => this.props.navigation.navigate('HabitTrackerScreen')} />
            <MaterialCommunityIcons name="duck" size={50} color="#FFFFFF" onPress={() => this.props.navigation.navigate('DuckyScreen')} />
            <FontAwesome name="pencil-square-o" size={50} color="#FFFFFF" onPress={() => this.props.navigation.navigate('JournalScreen')} />
            <AntDesign name="areachart" size={50} color="#FFFFFF" onPress={() => this.props.navigation.navigate('AnalyticsScreen')} />
          </View>
        </View>

      </LinearGradient>
    )
  }
}

export default JournalEntry;