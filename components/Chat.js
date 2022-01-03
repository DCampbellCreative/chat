import React from "react";
import { StyleSheet, View, Text } from 'react-native';

// renders chat screen
export const Chat = ({ route, navigation }) => {
	// imports states from start screen as route parameters
	const { userName, bgColor } = route.params
	return (
		// main container 100% flex size
		<View style={styles.container}>
			{/* header 10% flex size, bgColor and userName change bases upon state set in start screen */}
			<View style={{ ...styles.header, backgroundColor: bgColor }} >
				<Text style={styles.username}>Username: {userName}</Text>
			</View>
		</View>
	);
};

// creates styleSheet for chat screen
const styles = StyleSheet.create({
	container: {
		height: '100%',
		flexDirection: 'column',
		alignItems: 'center',
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
	}
})