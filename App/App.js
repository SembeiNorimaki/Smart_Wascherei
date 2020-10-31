/*
  Author: Isaac Alonso
  Date: 31/10/2020
*/

import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state={
      machine1: "1",
      machine2: "1",
      machine3: "1",
      machine4: "0",
      machine5: "0",
      machine6: "0"
    }
  }

  fetchData() {
    console.log('Fetching data');
    fetch('https://api.thingspeak.com/channels/1210138/feeds.json?results=1')
    .then((response) => response.json())
    .then((json) => {
      this.setState({
        machine1: json.feeds[0].field1,
        machine2: json.feeds[0].field2,
        machine3: json.feeds[0].field3,
        machine4: json.feeds[0].field4,
        machine5: json.feeds[0].field5,
        machine6: json.feeds[0].field6,
      })
    })
    .catch((error) => {
      console.error(error);
    });
    //this.forceUpdate();
  }

  onPress(machineId) {
    // Alert.alert(machineId);
  }
  componentDidMount() {    
    this.fetchData();
    this.timer = setInterval(()=> this.fetchData(), 1000);
    //this.forceUpdate();
  }

  render(){
    return (      
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source = {require('./images/LogoHeader.png')}/>
        </View>  

        <View style={styles.row}>
          <View style={this.state.machine1 == "1" ? styles.colFree : styles.colBusy}>
            <Image source = {require('./images/logo.png')}/>
            <Text style={styles.text2}>{this.state.machine1 == "1"?"":"Occupied"}</Text>
            <Text style={styles.text}>Machine 1</Text>
          </View>
          <View style={this.state.machine2 == "1" ? styles.colFree : styles.colBusy}>
            <Image source = {require('./images/logo.png')}/>
            <Text style={styles.text2}>{this.state.machine2 == "1"?"":"Occupied"}</Text>
            <Text style={styles.text}>Machine 2</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={this.state.machine3 == "1" ? styles.colFree : styles.colBusy}>
            <Image source = {require('./images/logo.png')}/>
            <Text style={styles.text2}>{this.state.machine3 == "1"?"":"Occupied"}</Text>
            <Text style={styles.text}>Machine 3</Text>
          </View>
          <View style={this.state.machine4 == "1" ? styles.colFree : styles.colBusy}>
            <Image source = {require('./images/logo.png')}/>
            <Text style={styles.text2}>{this.state.machine4 == "1"?"":"Occupied"}</Text>
            <Text style={styles.text}>Machine 4</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={this.state.machine5 == "1" ? styles.colFree : styles.colBusy}>
            <Image source = {require('./images/logo.png')}/>
            <Text style={styles.text2}>{this.state.machine5 == "1"?"":"Occupied"}</Text>
            <Text style={styles.text}>Machine 5</Text>
          </View>
          <View style={this.state.machine6 == "1" ? styles.colFree : styles.colBusy}>
            <Image source = {require('./images/logo.png')}/>
            <Text style={styles.text2}>{this.state.machine6 == "1"?"":"Occupied"}</Text>
            <Text style={styles.text}>Machine 6</Text>
          </View>
        </View>
      </View>
        
    );
  }
}
/*


<View style={styles.row}>
          <TouchableOpacity style={this.state.machine1 == "1" ? styles.colFree : styles.colBusy}
            onPress={()=>{this.onPress("1")}}
          > 
      
          <Image source = {require('./logo.png')}/>
          <Text style={styles.text2}>{this.state.machine1 == "1"?"":"Occupied"}</Text>
          <Text style={styles.text}>Machine 1</Text>
      
      </TouchableOpacity>
      
      
      <TouchableOpacity style={this.state.machine2 == "1" ? styles.colFree : styles.colBusy}
        onPress={()=>{this.onPress("2")}}
      >
          <Image source = {require('./logo.png')}/>
          <Text style={styles.text2}>{this.state.machine2 == "1"?"":"Occupied"}</Text>
          <Text style={styles.text}>Machine 2</Text>  
      </TouchableOpacity>
    </View>


      */

//<Text style={styles.textGreen}>{this.state.text1}</Text>
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "column"
  },
  header: {
    backgroundColor: '#DEF9FE',
    width: "100%",
    position:"absolute",
    top: 0,
    left: 10
  },
  // oppacity: {
  //   backgroundColor: '#000000',
  //   width: 200,
  //   height: 180,
  //   borderRadius: 10,
  //   // /opacity: 0.3
  // },
  row: {
    flexDirection: "row" 
  },
  colBusy: {
    flex:1,
    flexDirection: "column",    
    margin: 20,
    backgroundColor: '#DEF9FE',
    borderRadius: 10,
    width: 200,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.3,
  },
  colFree: {
    flex:1,
    flexDirection: "column",    
    margin: 20,
    backgroundColor: '#DEF9FE',
    borderRadius: 10,
    width: 200,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1
  },

  textGreen: {
    color: 'green'
  },
  textRed: {
    color: 'red'
  },
  text: {
    fontFamily: "Sans",
    fontSize: 18
  },
  text2: {
    fontFamily: "Sans",
    fontSize: 22,
    color: "red",
    position:"absolute",
    left:32,
    top:58,
    fontWeight: "bold"
  }  
});
