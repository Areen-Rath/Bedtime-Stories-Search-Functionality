import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, TextInput, Alert, KeyboardAvoidingView, ToastAndroid} from 'react-native';
import { Header } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import firebase from 'firebase';
import db from '../config';

export default class WriteStoryScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            title: '',
            author: '',
            story: ''
        }
    }

    submitStory = async () => {
        db.collection("stories").add({
            'storyTitle': this.state.title,
            'author': this.state.author,
            'story': this.state.story
        });
        ToastAndroid.show("Story Submitted", ToastAndroid.SHORT);
    }

    render(){
        return (
            <SafeAreaProvider>
                <KeyboardAvoidingView behavior="padding" enabled>
                    <Header
                    backgroundColor={'red'}
                    centerComponent={{text: "Bedtime Stories", style: {color: "white", fontWeight: "bold", fontSize: 20}}} />
                    <TextInput
                    style={styles.inputBox}
                    onChangeText={(text) => {
                        this.setState({
                            title: text
                        });
                    }}
                    value={this.state.title}
                    placeholder="Story Title" />
                    <TextInput
                    style={styles.inputBox}
                    onChangeText={(text) => {
                        this.setState({
                            author: text
                        });
                    }}
                    value={this.state.author}
                    placeholder="Author" />
                    <TextInput
                    style={[styles.inputBox, {height: 250}]}
                    onChangeText={(text) => {
                        this.setState({
                            story: text
                        });
                    }}
                    value={this.state.story}
                    placeholder="Write the Story" />
                    <TouchableOpacity style={styles.button} onPress={() => {this.submitStory()}}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </SafeAreaProvider>
        );
    }
}

const styles = StyleSheet.create({
    inputBox: {
        margin: 20,
        width: 290,
        borderWidth: 2,
        height: 30,
    },
    button: {
        backgroundColor: '#ffaa00',
        width: 75,
        height: 30,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'black',
        fontWeight: "bold",
        textAlign: 'center'
    }
});