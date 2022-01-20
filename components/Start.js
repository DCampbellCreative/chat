import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Pressable, ImageBackground, KeyboardAvoidingView } from 'react-native';

const image = require('../assets/background.png');

export const Start = ({ navigation }) => {
	// states for storing userName and bgColor variables
	const [userName, setUserName] = useState('');
	const [bgColor, setBgColor] = useState('');

	// renders start screen
	return (
		// background Image to be rendered behind all other components
		<ImageBackground source={image} style={styles.image}>
			<KeyboardAvoidingView behavior="height">
				{/* main container 100% flex size */}
				<View style={styles.container}>
					{/* title, position absolute */}
					<Text
						style={styles.title}
						accessible={false}
						accessibilityLabel="Chat"
					>
						Chat
					</Text>
					{/* secondary container 44% flex size, backgroundColor white */}
					{/* <View style={styles.border}></View>
					<View style={styles.border2}></View> */}
					<View style={styles.container2}>

						{/* tertiary container 88% of parent container, holds main interactive elements */}
						<View style={styles.container3}>

							{/* text input for userName, sets state of userName */}
							<TextInput
								style={styles.input}
								value={userName}
								onChangeText={userName => setUserName(userName)}
								placeholder="Enter Username"
								accessible={true}
								accessibilityLabel="Enter username"
								accessibilityHint="Enter your username to be displayed in the chat"
							/>

							{/* pressables for choosing bgColor and setting it to state, called in chat screen */}
							<View style={styles.colorPicker}>
								<Text style={styles.chooseColor}
									accessible={false}
									accessibilityLabel="Choose background color"
								>
									Choose Background Color
								</Text>
								<View style={styles.colorOptions}>
									<Pressable
										style={styles.colorOption1}
										onPress={() => setBgColor("#090C08")}
										accessible={true}
										accessibilityLabel="Color black"
										accessibilityHint="Chooses black for your chats background color"
									>
									</Pressable>
									<Pressable
										style={styles.colorOption2}
										onPress={() => setBgColor("#474056")}
										accessible={true}
										accessibilityLabel="Color gray"
										accessibilityHint="Chooses gray for your chats background color"
									>
									</Pressable>
									<Pressable
										style={styles.colorOption3}
										onPress={() => setBgColor("#8A95A5")}
										accessible={true}
										accessibilityLabel="Color blue"
										accessibilityHint="Chooses blue for your chats background color"
									>
									</Pressable>
									<Pressable
										style={styles.colorOption4}
										onPress={() => setBgColor("#B9C6AE")}
										accessible={true}
										accessibilityLabel="Color green"
										accessibilityHint="Chooses green for your chats background color"
									>
									</Pressable>
								</View>
							</View>

							{/* pressable to navigate to chat screen and passes states to chat screen as navigation parameters */}
							<Pressable
								style={styles.pressable}
								onPress={() => navigation.navigate('Chat', {
									userName,
									bgColor
								})}
								accessible={true}
								accessibilityLabel="Start chatting"
								accessibilityHint="Enters the chat with your selected username and background color"
							>
								<Text style={styles.pressableText}>Start Chatting</Text>
							</Pressable>

						</View>
					</View>
				</View>
			</KeyboardAvoidingView>
		</ImageBackground>
	);
};

// creates styleSheet for start screen
const styles = StyleSheet.create({
	image: {
		width: '100%',
		height: '100%',
	},
	container: {
		height: '100%',
		width: '100%',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-end',
		paddingBottom: '6%'
	},
	container2: {
		backgroundColor: 'white',
		height: 255,
		width: '88%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	border: {
		width: '100%',
		borderStyle: 'solid',
		borderBottomWidth: 1,
		position: 'absolute',
		top: 118,
	},
	border2: {
		width: '100%',
		borderStyle: 'solid',
		borderBottomWidth: 1,
		position: 'absolute',
		bottom: 25,
	},
	container3: {
		height: '88%',
		width: '88%',
		position: 'absolute',
		alignItems: 'center',
	},
	title: {
		position: 'absolute',
		top: 70,
		fontSize: 45,
		fontWeight: "600",
		color: 'white',
	},
	input: {
		fontSize: 16,
		fontWeight: "300",
		color: '#757083',
		margin: 2,
		borderColor: 'gray',
		height: 40,
		width: '100%',
		borderWidth: 1,
		position: 'absolute',
	},
	colorPicker: {
		alignItems: "center",
		flexDirection: 'column',
		position: 'absolute',
		margin: 65,
		width: '100%',
	},
	chooseColor: {
		marginBottom: 5,
		fontSize: 16,
		fontWeight: "200",
		color: '#757083',
	},
	colorOptions: {
		width: '100%',
		alignItems: 'stretch',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	colorOption1: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: "#090C08",
	},
	colorOption2: {
		width: 50,
		borderRadius: 25,
		backgroundColor: "#474056",
	},
	colorOption3: {
		width: 50,
		borderRadius: 25,
		backgroundColor: "#8A95A5",
	},
	colorOption4: {
		width: 50,
		borderRadius: 25,
		backgroundColor: "#B9C6AE",
	},
	pressable: {
		backgroundColor: '#757083',
		height: 40,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		margin: 185
	},
	pressableText: {
		fontSize: 16,
		fontWeight: "600",
		color: '#FFFFFF',
	}
});
