import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, View, Text, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

const firebase = require('firebase');
require('firebase/firestore');

const firebaseConfig = {
	apiKey: "AIzaSyDJyRsMeXkKM-SQyQ3I66BdrtLMBXQNUfM",
	authDomain: "chat-e6f73.firebaseapp.com",
	projectId: "chat-e6f73",
	storageBucket: "chat-e6f73.appspot.com",
	messagingSenderId: "886285412669",
	appId: "1:886285412669:web:583a111c90e06816987d54",
	measurementId: "G-BZW7B5HZRC"
}

if (!firebase.apps.length) {
	console.log(firebase.apps)
	firebase.initializeApp(firebaseConfig);
}

// renders chat screen
export const Chat = ({ route, navigation }) => {
	// state for storing the messages variable
	const [messages, setMessages] = useState([]);
	const [user, setUser] = useState([]);
	// imports states from start screen as route parameters
	const { userName, bgColor } = route.params

	// sets states with static messages when component mounts, uses required gifted chat message format 
	// useEffect(() => {
	// 	setMessages([
	// 		{
	// 			_id: 1,
	// 			text: 'Hello ' + userName,
	// 			createdAt: new Date(),
	// 			user: {
	// 				_id: 2,
	// 				name: 'React Native',
	// 				avatar: 'https://placeimg.com/140/140/any',
	// 			},
	// 		},
	// 		{
	// 			_id: 2,
	// 			text: userName + ' has entered the chat',
	// 			createdAt: new Date(),
	// 			system: true,
	// 		},
	// 	])
	// }, [])

	useEffect(() => {

		if (!messages) {
			firebase.firestore().collection('messages').onSnapshot(onCollectionUpdate).where("uid", "==", user.uid)
		}

		authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
			if (!user) {
				await firebase.auth().signInAnonymously();
			}
		})
		setUser({
			uid: user.uid,
			messages: [],
		});

		unsubscribe = firebase.firestore().collection('messages').where("uid", "==", user.uid)
			.orderBy("createdAt", "desc")
			.onSnapshot(onCollectionUpdate);
	}, [])

	// useEffect(() => {
	// 	if (!messages) {
	// 		firebase.firestore().collection('messages').onSnapshot(onCollectionUpdate).where("uid", "==", user.uid)
	// 	}
	// setMessages(messages)
	// }, [])

	const onCollectionUpdate = (querySnapshot) => {
		const messages = [];
		// go through each document
		querySnapshot.forEach((doc) => {
			// get the QueryDocumentSnapshot's data
			var data = doc.data();
			console.log('data', doc, data)
			messages.push({
				_id: data._id,
				text: data.text,
				createdAt: data.createdAt.toDate(),
				user: data.name,
			});
		});
		setMessages(messages);
	};

	// called when user sends a message, previous messages are appended to state
	const onSend = useCallback((messages = []) => {
		setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
		addMessages();
	}, [])

	const addMessages = () => {
		const messages = [];
		firebase.firestore().collection('messages').add({
			_id: message._id,
			text: message.text,
			createdAt: message.createdAt,
		});
	}

	return (
		// main container 100% flex size
		<View style={styles.container}>
			{/* header 10% flex size, bgColor and userName change bases upon state set in start screen */}
			<View style={{ ...styles.header, backgroundColor: bgColor }} >
				<Text style={styles.username}>Username: {userName}</Text>
			</View>

			<View style={styles.chatContainer}>
				{/* renders GiftedChat interface */}
				<GiftedChat
					messages={messages}
					onSend={messages => onSend(messages)}
					user={{
						_id: 1,
					}}
				/>
				{/* renders KeyboardAvoidingView conditionally if users platform is android */}
				{Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
			</View>
		</View>
	);
};

// creates styleSheet for chat screen
const styles = StyleSheet.create({
	container: {
		height: '100%',
		flexDirection: 'column',
		justifyContent: 'flex-start'
	},
	header: {
		height: '10%',
		width: '100%',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	username: {
		fontSize: 16,
		fontWeight: "300",
		color: 'white',
	},
	chatContainer: {
		flex: 1
	}
})