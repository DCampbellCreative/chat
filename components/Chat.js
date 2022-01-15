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
	const [messages, setMessages] = useState();
	// imports states from start screen as route parameters
	const { userName, bgColor } = route.params

	// useEffect(() => {
	// 	if (!messages) {
	// 		const test = firebase.firestore().collection('messages').where("user", "==", 'test')
	// 		test.onSnapshot(onCollectionUpdate)
	// 	}
	// }, [])

	// const onCollectionUpdate = (querySnapshot) => {
	// 	const userMessages = [];
	// 	// go through each document
	// 	querySnapshot.forEach((doc) => {
	// 		// get the QueryDocumentSnapshot's data
	// 		var data = doc.data();
	// 		userMessages.push({
	// 			text: data.text,
	// 			createdAt: new Date(data.createdAt.seconds * 1000),
	// 			user: data.user,
	// 			_id: data._id
	// 		});
	// 	});
	// 	console.log(userMessages)
	// 	const sorted = userMessages.sort((a, b) => {
	// 		return a.createdAt - b.createdAt;
	// 	});
	// 	setMessages(sorted);
	// };

	useEffect(() => {
		setMessages([
			{
				_id: 1,
				text: 'Hello developer',
				createdAt: new Date(),
				user: {
					_id: 2,
					name: 'React Native',
					avatar: 'https://placeimg.com/140/140/any',
				},
			},
		])
	}, [])

	const onSend = useCallback((messages = []) => {
		setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
		const { _id, createdAt, text, user, } = messages[0]
		firebase.firestore().collection('messages').add({ _id, createdAt, text, user })
	}, [])

	// called when user sends a message, previous messages are appended to state
	// const onSend = useCallback((msg = []) => {
	// 	console.log('in callback', msg)
	// 	GiftedChat.append(msg)

	// 	setMessages(prevMessages => {
	// 		return [...prevMessages, msg[0]]
	// 	})
	// 	addMessages(msg[0]);
	// }, [])

	// const addMessages = (msg) => {
	// 	firebase.firestore().collection('messages').add({
	// 		text: msg.text,
	// 		createdAt: msg.createdAt,
	// 		user: userName,
	// 		_id: msg._id,
	// 	});
	// }

	console.log('render', messages)
	return (
		// main container 100% flex size
		<View style={styles.container}>
			{/* header 10% flex size, bgColor and userName change bases upon state set in start screen */}
			<View style={{ ...styles.header, backgroundColor: bgColor }} >
				<Text style={styles.username}>Username: {userName}</Text>
			</View>

			{
				messages &&
				<View style={styles.chatContainer}>
					{/* renders GiftedChat interface */}
					<GiftedChat
						messages={messages}
						onSend={onSend}
						user={{ _id: userName, name: 'test' }}
					/>
					{/* renders KeyboardAvoidingView conditionally if users platform is android */}
					{Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
				</View>
			}


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
