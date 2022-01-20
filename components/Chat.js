import React, { Component } from 'react';
import { StyleSheet, View, Text, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

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

		};
	}

	componentDidMount() {
		this.referenceChatMessages = firebase.firestore().collection("messages");
		// this.unsubscribe = this.referenceChatMessages.onSnapshot(this.onCollectionUpdate)

		NetInfo.fetch().then(connection => {
			if (connection.isConnected) {
				console.log('online');


				// anonymously authenticates user using firebase
				this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
					if (!user) {
						await firebase.auth().signInAnonymously();
					}
					this.setState({
						uid: user.uid,
						messages: [],
						loggedInText: 'Welcome!',
					});

					console.log(user);

					// create reference to active user's messages
					this.referenceChatMessagesUser = firebase.firestore().collection('messages').where("uid", "==", this.state.uid);

					// gets messages from firebase
					this.getMessages();

					// saves messages to firebase
					this.saveMessages();

					// listens for collection changes for current user
					this.unsubscribeChatMessagesUser = this.referenceChatMessagesUser.onSnapshot(this.onCollectionUpdate);

					this.unsubscribe = this.referenceChatMessages
						.orderBy("createdAt", "desc")
						.onSnapshot(this.onCollectionUpdate);
				})
			} else {

				console.log('offline')


				this.getMessages();

			}
		});
	};

	componentWillUnmount() {
		this.unsubscribe();
		this.authUnsubscribe();
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

	// add message to firebase
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

	// retrieve messages from AsyncStorage
	getMessages = async () => {
		let messages = '';
		try {
			messages = await AsyncStorage.getItem('messages') || [];
			this.setState({
				messages: JSON.parse(messages)
			});
		} catch (error) {
			console.log(error.message);
		}
	}

	// store messages when a new message is added
	saveMessages = async () => {
		try {
			await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
		} catch (error) {
			console.log(error.message);
		}
	}

	// add messages when a message is sent
	onSend = (messages = []) => {
		this.setState(
			previousState => ({
				messages: GiftedChat.append(previousState.messages, messages),
			}),
			() => {
				this.saveMessages();
			}
		);
	}

	// deletes message
	deleteMessages = async () => {
		try {
			await AsyncStorage.removeItem('messages');
			this.setState({
				messages: []
			})
		} catch (error) {
			console.log(error.message);
		}
	}

	render(props) {
		const { bgColor, userName } = this.props.route.params;
		return (
			<View style={styles.container}>
				{/* header 10% flex size, bgColor and userName change bases upon state set in start screen */}
				<View style={{ ...styles.header, backgroundColor: bgColor }} >
					{/* <View style={styles.border}></View> */}
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
							user={{
								_id: this.state.uid,
							}}
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
		height: 60,
		width: '100%',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	border: {
		width: '100%',
		borderStyle: 'solid',
		borderBottomWidth: 1,
		position: 'absolute',
		top: 60,
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
