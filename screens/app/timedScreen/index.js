import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Platform, Image} from 'react-native';
import {Text, Badge, withTheme, Button, Divider} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@react-navigation/native';

import FocusAwareStatusBar from '../../../components/StatusBar';
import ExamList from '../../../components/exam';
import {data, practise} from '../../../constants/data';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function TimedScreen({navigation}){
    const {colors, dark} = useTheme();
    const {top, bottom} = useSafeAreaInsets();
    return (
        <View style={{...styles.container}}>
            
            <View style={styles.container}>
                <Header />
                <ExamList data={practise} onPress={() => navigation.navigate('Test')} />
            </View>
            
            <FocusAwareStatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={colors.primary} />
        </View>
    );
}

export default withTheme(TimedScreen);

function Header(){
    const {colors} = useTheme()
    const notification = true;
    const {top, bottom} = useSafeAreaInsets();
    const paddingTop = Platform.OS == 'ios' ? top : 20;

    return (
        <View style={{...styles.header, backgroundColor: colors.primary, paddingTop}}>
            <View style={styles.navbar}>
                <View>
                    <Ionicons name='ios-notifications-outline' size={30} color={colors.text} />
                    {notification && <Badge status='error' containerStyle={{ position: 'absolute', top: 2, right: 1 }} />}
                </View>
            </View>
            <View style={styles.main}>
                <View style={styles.textView}>
                    <Text h4 h4Style={styles.h4}>Timed Exercises </Text>
                    <Text style={styles.text}>
                        The questions on this section will be timed 
                        and simulate real exam environment
                    </Text>
                </View>
                <Image 
                    source={require('../../../assets/exam.png')}
                    style={styles.image}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }, 
    header: {
        padding: 20,
        borderBottomLeftRadius: 60,
    },
    navbar: {
        flexDirection: "row-reverse",
    },
    h4: {
        color: '#121212',
    }, 
    text: {
        fontFamily: 'OpenSans_400Regular',
        color: '#121212',
        flexWrap: 'wrap',
        width: 240,
    },
    image: {
        width: 150,
        height: 130,
        position: 'absolute',
        top: -12,
        right: -13
    },
    main: {
        flexDirection: 'row',
        justifyContent: "space-between",
        position: 'relative'
    },
    textView: {
        position: 'relative',
        top: -20,
        padding: 5
    }
});