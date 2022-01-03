import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, View, Text, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

// renders chat screen
export const Chat = ({ route, navigation }) => {
	// state for storing the messages variable
	const [messages, setMessages] = useState([]);
	// imports states from start screen as route parameters
	const { userName, bgColor } = route.params

	// sets states with static messages when component mounts, uses required gifted chat message format 
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
			{
				_id: 2,
				text: 'This is a system message',
				createdAt: new Date(),
				system: true,
			},
		])
	}, [])

	// called when user sends a message, previous messages are appended to state
	const onSend = useCallback((messages = []) => {
		setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
	}, [])

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