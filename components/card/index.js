import React from 'react';
import {View, StyleSheet, TouchableOpacity,} from 'react-native';
import {Text, Avatar} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export function SubjectCard({onPress, subject, examBody, year, duration, noQuestn, iconColor}){

    const {colors} = useTheme();

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8} >
            <View style={{...styles.container, backgroundColor: colors.card}}>
                <View style={styles.content}>
                    <Avatar 
                        title={subject[0]}
                        containerStyle={{backgroundColor: iconColor,}}
                        size="medium"
                        rounded
                    />
                    <View>
                        <Text h4 h4Style={styles.h4}>Practise {subject}</Text>
                        <Text>{examBody} {year}</Text>
                        <View style={{flexDirection: "row", marginVertical: 10}}>
                            <Text 
                                style={{...styles.backText, backgroundColor: 'rgba(99,99,99,0.1)'}}
                            >
                                {noQuestn} questions
                            </Text>
                            <Text style={{...styles.backText, backgroundColor: 'rgba(99,99,99,0.1)'}}>
                                <Ionicons 
                                    name='md-time' 
                                />
                                {' '} {duration}
                            </Text>
                        </View>
                    </View>
                    <Ionicons name="ios-download" size={30} color={colors.secondary} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderRadius: 10,
        marginVertical: 10,
    },
    content: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    backText: {
        padding: 5,
        borderRadius: 3,
        marginRight: 10,
    },
    h4: {
        fontSize: 20,
    },
});