import React from 'react';
import { StatusBar, StyleSheet, ScrollView, Text, View, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import {Vibration} from 'react-native';

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
);

export default class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      seconds: 0,
      minutes: 0,
      type: 'work',
      counting: false
    }
  }

  stop = () => {
    clearInterval(this.interval)
    this.setState( prevState => ({
      counting: false
    }))
  }

  start = () => {
    if(this.state.counting == false){
      this.interval = setInterval(this.inc, 1000)
    }
  }

  reset = () => {
    this.setState(prevState=> ({
      seconds:0,
      minutes:0,
      type: 'work',
      counting:false
    }))
    clearInterval(this.interval)
  }

  inc = () => {

    if(this.state.seconds == 59){   
// if type is break and minutes is 4  -- switch to work type
      if(this.state.type=="break" && this.state.minutes==4){
        this.setState( prevState => ({
          minutes: 0,
          seconds: 0,
          type: 'work'
        }))
        Vibration.vibrate([10, 800, 800])
      } else{
        if(this.state.type=="break" && this.state.minutes < 4){
          this.setState( prevState => ({
            minutes: prevState.minutes + 1,
            seconds: 0,
          }))
        }
      }
// if type is work and minutes is 29 .... switch to break type
      if(this.state.type=='work' && this.state.minutes == 29){   
        this.setState( prevState => ({
          minutes: 0,
          seconds: 0,
          type: 'break'
        }))
        Vibration.vibrate([10, 800, 800])  // vibration pattern, ios default 500 duration
      }else{
        if(this.state.type=="work" && this.state.minutes < 29){  
          this.setState( prevState => ({
            minutes: prevState.minutes + 1,
            seconds: 0,
          }))
        }
      }
    }
    else{
      this.setState(prevState => ({
        seconds: prevState.seconds + 1,
        counting: true
      }))
    }
  }

  render(){
    let display, title, timer, btn = {}
    //set values for dark/work mode:
    if(this.state.type == 'work'){
      display = {
        backgroundColor: '#1c1c1c',
        fontSize: 100
      }
      title = {
        fontSize: 100,
        color: 'white',
        textAlign: 'center',
        marginTop: 80,
        fontFamily: 'GillSans-BoldItalic'
      },
      timer = {
        fontSize: 70,
        padding: 10,
        color: 'white',
      },
      btn = {
        backgroundColor: '#e83e1c',
        padding: 5,
        color: '#e8d2cf',
      }
      // Set values for light/break mode
    } else{
      display = {
        backgroundColor: '#fcd0ca',
        fontSize: 100
      }
      title = {
        fontSize: 100,
        color: '#1c1919',
        textAlign: 'center',
        marginTop: 80,
        fontFamily: 'GillSans-BoldItalic'
      },
      timer = {
        fontSize: 70,
        padding: 10,
        color: '#1c1919',
      },
      btn = {
        backgroundColor: '#e83e1c',
        padding: 5,
        color: '#1c1919',
      }
    }

    return(
      
      <ScrollView style={[styles.appContainer, display]}>

        <View style={styles.container}>
        <MyStatusBar backgroundColor="#c44b4b" barStyle="light-content" />
        </View>

          <Text style={title}>{this.state.type}</Text>

          <View
          style={{
            borderBottomColor: 'white',
            borderBottomWidth: 2,
            marginTop: 30
          }}/>

        <View style={styles.bttnContainer}>
          <Text style={timer}>{this.state.minutes}</Text>
          <Text style={timer}>:</Text>
          <Text style={timer}>{this.state.seconds}</Text>
        </View>

        <View style={styles.bttnContainer}>
          <TouchableOpacity style={{ height: 100, marginTop: 10 }}
          onPress={this.start}>
            <Text style={[styles.appButton1, btn]}>Start</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ height: 100, marginTop: 10 }}
          onPress={this.reset}>
            <Text style={[styles.appButton1, btn]}>Reset</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={{ height: 100, marginTop: 10 }}
        onPress={this.stop}>
          <Text style={[styles.appButton2, btn]}>Stop</Text>
        </TouchableOpacity>

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create( {
  appContainer: {
  } ,
  bttnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    marginTop: 60,
  },
  appButton1: {
    fontSize: 50,
    width: 140,
    textAlign: 'center',
    borderRadius: 15,
    overflow:'hidden',
    marginLeft: 20,
    marginRight: 20,
      },
    appButton2: {
      alignSelf: 'center',
      fontSize: 50,
      width: 240,
      textAlign: 'center',
      borderRadius: 15,
      overflow:'hidden',
      marginLeft: 20,
      marginRight: 20,
      marginTop: 20,
        },
})