import React, { Component } from 'react';
import { StyleSheet, View, Text, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

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
};

if (!firebase.apps.length) {
	console.log(firebase.apps);
	firebase.initializeApp(firebaseConfig);
}

// renders chat screen
export default class Chat extends Component {
	constructor(props) {
		super();
		// state for storing the messages variable
		this.state = {
			messages: [],
			uid: 0,
			user: {
				_id: '',
				name: '',
				avatar: '',
			},
			loggedInText: 'Welcome!',
		};
	}

	componentDidMount() {
		this.referenceChatMessages = firebase.firestore().collection("messages");
		// this.unsubscribe = this.referenceChatMessages.onSnapshot(this.onCollectionUpdate)

		this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
			if (!user) {
				await firebase.auth().signInAnonymously();
			}

			this.setState({
				uid: user.uid,
				messages: [],
				loggedInText: 'Hello there',
			});

			// create reference to active user's messages
			this.referenceChatMessagesUser = firebase.firestore().collection('messages').where("uid", "==", this.state.uid);

			// listens for collection changes for current user
			this.unsubscribeListUser = this.referenceChatMessagesUser.onSnapshot(this.onCollectionUpdate);

			this.unsubscribe = this.referenceChatMessages
				.orderBy("createdAt", "desc")
				.onSnapshot(this.onCollectionUpdate);
		});
	};

	componentWillUnmount() {
		this.unsubscribe();
	};

	// 	setMessages([
	// 		{
	// 			_id: 1,
	// 			text: 'Hello developer',
	// 			createdAt: new Date(),
	// 			user: {
	// 				_id: 2,
	// 				name: 'React Native',
	// 				avatar: 'https://placeimg.com/140/140/any',
	// 			},
	// 		},
	// 	])
	// }, [])

	onCollectionUpdate = (querySnapshot) => {
		const messages = [];
		// go through each document
		querySnapshot.forEach((doc) => {
			// get the QueryDocumentSnapshot's data
			let data = doc.data();
			messages.push({
				_id: data._id,
				text: data.text,
				createdAt: data.createdAt.toDate(),
				user: data.user,
			});
			this.setState({
				messages,
			})
		})
	};

	addMessage() {
		const message = this.state.messages[0];
		// add a new message to the collection
		this.referenceChatMessages.add({
			_id: message._id,
			text: message.text || '',
			createdAt: message.createdAt,
			user: this.state.user,
			uid: this.state.uid,
		});
	}

	onSend = (messages = []) => {
		this.setState(
			previousState => ({
				messages: GiftedChat.append(previousState.messages, messages),
			}),
			() => {
				this.addMessage();
			}
		);
	}

	render() {
		const { bgColor, userName } = this.props.route.params;
		return (
			<View style={styles.container}>
				{/* header 10% flex size, bgColor and userName change bases upon state set in start screen */}
				<View style={{ ...styles.header, backgroundColor: bgColor }} >
					<Text style={styles.username}>Username: {userName}</Text>
					<Text>{this.state.loggedInText}</Text>
				</View>

				{
					this.state.messages &&
					<View style={styles.chatContainer}>
						{/* renders GiftedChat interface */}
						<GiftedChat
							messages={this.state.messages}
							onSend={this.onSend}
							user={this.state.user}
						/>
						{/* renders KeyboardAvoidingView conditionally if users platform is android */}
						{Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
					</View>
				}


			</View>
		);
	}
}


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
