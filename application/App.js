import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, ListView, TouchableOpacity } from 'react-native';
import {Icon, Surface, Button,} from 'react-native-paper';
const car = require('./car.png');
var socket = require('socket.io-client')('http://localhost:3000');


let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
// var result = require('./test').result;

const ParkingSpot = (props) => {

  return props.data.map(function (items, i){
  
		return(
    <Surface
    key = {i}
    style={{
      backgroundColor: 'green',
      flexWrap: 'wrap',
      elevation: 8,
      width: .085*height,
      height: .085*height,
      borderRadius: 0.085*height,
      justifyContent: 'center', 
      alignItems: 'center',
      marginTop: 40,
      marginHorizontal: 10
    }}
    >
     
      <Text
      style={{fontSize: 30}}
      >{items}</Text>
      
      </Surface>
    
  );
});
}

const Top = () => {
  return(
    <View>
      <Surface
      style={{
        top: 0,
        height: 0.15*height,
        width:0.95*width,
        backgroundColor: 'white',
        elevation: 9,
        alignContent: 'center',
        justifyContent: 'center', alignItems: 'center',
      }}
      >
      <Text>
        Bienvenue dans notre application de Smart Parking. 
      </Text>
      <Text>
        Voici les espaces disponibles dans le parking.
      </Text>
      </Surface>
    </View>
  );
}

var result =[];

export default class App extends React.Component {

  constructor(props) {
    super(props);
    
    // Creating the socket-client instance will automatically connect to the server.
    this.state={
      data: []
    }
    socket.on('test', function(data){
      if (data != "Welcome"){
       result = data;
        console.log(result);
      }
    });

  }

  onReceivedMessage(messages) {
    console.log(messages);
  }

  render() {
    return (
      
      <View style={styles.container}>
      
        <Top />
        <View 
        style={{
            flexDirection: 'row'
        }}
        >
          <View
          style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', alignContent: 'center', justifyContent: 'center'}}
          >
          <ParkingSpot data={result}/>
          <Text>{result}</Text>
          </View>
          

        </View>
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    alignContent: 'center', 
    flexDirection: "column"
  
  },
});
