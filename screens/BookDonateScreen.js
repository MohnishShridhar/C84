import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'
import { ListItem } from 'react-native-elements'

export default class BookDonateScreen extends Component{
    constructor(){
        super();
        this.state={
            userid:firebase.auth().currentUser.email,
            requestedBooksList:[]
        }
        this.requestRef=null
    }
    getRequestedBooksList=()=>{
        this.requestRef=db.collection("requested_books")
        .onSnapshot((snapshot)=>{
            var requestedBooksList=snapshot.docs.map(document=>document.data());
            this.setState({
                requestedBooksList:requestedBooksList
            })
        })
    }
    componentDidMount(){
        this.getRequestedBooksList()
    }
    compentWillUnmount(){
        this.requestRef()
    }
    keyExtractor=(item, index)=>index.toString()
    renderItem=({item, i})=>{

        return(
            <ListItem
            key={i}
            title={item.book_name}
            subtitle={item.reason_to_request}
            titleStyle={{color:'black', fontWeight:'bold'}}
            rightElement={
                <TouchableOpacity style={styles.button}
                    onPress={()=>{
                        this.props.navigation.navigate("ReceiverDetails", {"details": item})
                    }}
                >

                    <Text style={{color:'#ffff'}}>View</Text>
                </TouchableOpacity>
            }
            bottomDivider/>
        )
    }
    render(){
        return(
            <View style={{flex:1}}>
                <MyHeader title="Donate Books"/>
                <View style={{flex:1}}>
                    {
                        this.state.requestedBooksList.length==0
                        ?(
                            <View style={styles.subContainer}>
                                <Text style={{fontSize:20}}>List of all requested books</Text>
                            </View>
                        ):(
                            <FlatList
                            keyExtractor={this.keyExtractor}
                            data={this.state.requestedBooksList}
                            renderItem={this.renderItem}
                            />
                        )
                    }
                </View>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    button:{
        width:100,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        backgroundColor:'#ff9800',
        shadowColor:"#000",
        shadowOffset:{
            width:0,
            height:8
        },
    },
    subContainer:{
        flex:1,
        fontSize:20,
        justifyContent:'center',
        alignItems:'center'
    }
})