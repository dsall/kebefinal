import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, ListView, TouchableOpacity } from 'react-native';
import {Icon, Surface, Button,} from 'react-native-paper';
const car = require('./car.png');
import axios from 'axios';
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
// var result = require('./test').result;

const ParkingSpot = (props) => {

  return props.data.map(function (items, i){
  
		return(
    <Surface
    key = {i}
    style={{
      top: 10,
      backgroundColor: 'green',
      flexWrap: 'wrap',
      elevation: 8,
      width: .085*height,
      height: .085*height,
      borderRadius: 0.085*height,
      justifyContent: 'center', 
      alignItems: 'center',
      marginTop: 10,
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
        top: 30,
        height: 0.10*height,
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


let interval;
export default class App extends React.Component {

  constructor(props) {
    super(props);
    
    // Creating the socket-client instance will automatically connect to the server.
    this.state={
      data: [], 
      error: false
    }

    this.CheckSpace();
  }
  componentDidMount() {
    interval = setInterval(() => {

        this.CheckSpace();

    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(interval);
  }

  // Envoyer requette au server . il recoit les spaces disponibles 
  CheckSpace =  async () =>{
    try {
        const response = await axios.get(`http://18.223.98.134:3000/spaces`)
            this.setState({data: response.data.espace});
        }
        catch(err){
            this.setState({error: true});
        }

}




  render() {
    if(this.state.error){
      return(
        <View
        style={{
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          flex: 1,

        }}
        >
          <Text
          style={{
            color: 'red'
          }}
          >Erreur de connection veuiller reessayer</Text>
          <TouchableOpacity
          onPress={() => {this.setState({error: false})}}
          >Retry</TouchableOpacity>
        </View>
      );
    }
    return (
      
      <View style={styles.container}>
      
        <Top />
        <View 
        style={{
            flexDirection: 'row'
        }}
        >
          <View
          style={{marginTop: 35, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', alignContent: 'center', justifyContent: 'center'}}
          >

          <ParkingSpot data={this.state.data}/>
    
        
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
