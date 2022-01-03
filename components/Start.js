import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Pressable, ImageBackground } from 'react-native';

const image = require('../assets/background.png');

export const Start = ({ navigation }) => {
	// states for storing userName and bgColor variables
	const [userName, setUserName] = useState('');
	const [bgColor, setBgColor] = useState('');

	// renders start screen
	return (
		// background Image to be rendered behind all other components
		<ImageBackground source={image} style={styles.image}>
			{/* main container 100% flex size */}
			<View style={styles.container}>
				{/* title, position absolute */}
				<Text style={styles.title}>Chat</Text>
				{/* secondary container 44% flex size, backgroundColor white */}
				<View style={styles.container2}>
					{/* tertiary container 88% of parent container, holds main interactive elements */}
					<View style={styles.container3}>

						{/* text input for userName, sets state of userName */}
						<TextInput
							style={styles.input}
							value={userName}
							onChangeText={userName => setUserName(userName)}
							placeholder="Your Name"
						/>

						{/* pressables for choosing bgColor and setting it to state, called in chat screen */}
						<View style={styles.colorPicker}>
							<Text style={styles.chooseColor}>Choose Background Color</Text>
							<View style={styles.colorOptions}>
								<Pressable style={styles.colorOption1} onPress={() => setBgColor("#090C08")}></Pressable>
								<Pressable style={styles.colorOption2} onPress={() => setBgColor("#474056")}></Pressable>
								<Pressable style={styles.colorOption3} onPress={() => setBgColor("#8A95A5")}></Pressable>
								<Pressable style={styles.colorOption4} onPress={() => setBgColor("#B9C6AE")}></Pressable>
							</View>
						</View>

						{/* pressable to navigate to chat screen and passes states to chat screen as navigation parameters */}
						<Pressable
							style={styles.pressable}
							onPress={() => navigation.navigate('Chat', {
								userName,
								bgColor
							})}>
							<Text style={styles.pressableText}>Start Chatting</Text>
						</Pressable>

					</View>
				</View>
			</View>
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
		height: '44%',
		width: '88%',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	container3: {
		height: '88%',
		width: '88%',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	title: {
		position: 'absolute',
		top: '12%',
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
		borderWidth: 1
	},
	colorPicker: {
		alignItems: "center",
		flexDirection: 'column',
		width: '100%',
	},
	chooseColor: {
		marginBottom: 5,
		fontSize: 16,
		fontWeight: "200",
		color: '#757083'
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
		justifyContent: 'center'
	},
	pressableText: {
		fontSize: 16,
		fontWeight: "600",
		color: '#FFFFFF',
	}
});
