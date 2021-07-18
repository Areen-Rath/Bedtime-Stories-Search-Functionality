import * as React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Header, SearchBar } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import firebase from 'firebase';
import db from '../config';

export default class ReadStoryScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            stories: [],
            search: ''
        }
    }

    componentDidMount = async () => {
        const query = await db.collection("stories").get();
        query.docs.map((doc) => {
            this.setState({
                stories: [...this.state.stories, doc.data()]
            });
        });
    }

    retrieveStories = async (text) => {
        this.setState({
            search: text,
        });
        var stories = [];
        var storyRef = [];
        if(text){
            storyRef = await db.collection("stories").where("storyTitle", ">=", text).get();
        } else {
            storyRef = await db.collection("stories").get();
        }
        storyRef.docs.map((doc) => {
            stories.push(doc.data());
        });
        this.setState({
            stories: stories
        });
    }

    render(){
        return (
            <SafeAreaProvider>
                <ScrollView>
                    <Header
                    backgroundColor={'red'}
                    centerComponent={{text: "Bedtime Stories", style: {color: "white", fontWeight: "bold", fontSize: 20}}} />
                    <SearchBar
                    placeholder="Search a Book"
                    onChangeText={(text) => {
                        this.retrieveStories(text);
                    }}
                    value={this.state.search}
                    style={{color: "white"}} />
                    {this.state.stories.map((story, index) => {
                        return (
                            <View key={index} style={{borderBottomWidth: 2}}>
                                <Text>{"Story: " + story.storyTitle}</Text>
                                <Text>{"Author: " + story.author}</Text>
                            </View>
                        );
                    })}
                </ScrollView>
            </SafeAreaProvider>
        );
    }
}