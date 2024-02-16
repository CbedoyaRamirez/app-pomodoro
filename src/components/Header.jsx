import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Header = ({ setTime, currentTime, setCurrentTime }) => {

    const options = ["Pomodoro", "Short Break", "Long Break"];

    const handlePress = (index) => {
        const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
        setCurrentTime(index);
        setTime(newTime * 60);
    }

    return (
        <View style={{ flexDirection: "row" }} >
            {
                options.map((opt, index) => (
                    <TouchableOpacity
                        onPress={() => handlePress(index)}
                        key={index} style={[styles.itemStyle, currentTime != index && { borderColor: 'transparent' }]}>
                        <Text >{opt}</Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    );
}

const styles = StyleSheet.create({
    itemStyle: {
        width: '33%',
        alignItems: 'center',
        borderWidth: 3,
        padding: 5,
        borderRadius: 10,
        borderColor: "white",
        marginVertical: 20
    },
    text: {
        color: '#fff',
    }
})

export default Header;
