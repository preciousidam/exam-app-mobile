import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import {Text, Badge, SearchBar} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';


import FocusAwareStatusBar from '../../../components/StatusBar';
import { loadFonts } from '../../../libs/fonts';
import List from '../../../components/lesson/list';

const colorBack = ['color-primary', 'color-success', 'color-info', 'color-warning', 'color-danger', ];

export default function ListScreen({navigation, route}){
    const {colors, dark} = useTheme();
    const fontLoaded = loadFonts();
    const {navigate} = navigation;
    const lessons = useSelector(state => state.lessons);
    const {width, height} = useSafeAreaInsets();
    const {title} = route.params;

    useEffect(() => {
        navigation.setOptions({
            title,
            headerRight: () => (
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", paddingRight: 10}}>
                    <TouchableWithoutFeedback 
                        onPress={_ => navigation.openDrawer()}
                        style={styles.actionBar}
                    >
                        <View style={styles.actionBar}>
                            <Ionicons name='md-search' size={24} color={colors.text} />
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback 
                        onPress={_ => navigate('Notifications')}
                        style={styles.actionBar}
                    >
                        <View style={styles.actionBar}>
                            <Ionicons name='ios-notifications-outline' size={30} color={colors.text} />
                            {<Badge status='error' containerStyle={{ position: 'absolute', top: 2, right: 1 }} />}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            ),
        })
    })
   
    return (
        <SafeAreaView style={[styles.container, {paddingHorizontal: width, paddingTop: height}]}>
            
            <View style={styles.sect}>
                <List data={lessons} />
            </View>
            <FocusAwareStatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={colors.background} />
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bar: {
        width: '100%',
        paddingHorizontal: 25,
        paddingVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    header: {
        paddingHorizontal: 20,
    },
    h3: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 30
    },
    h4: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 18,
    },
    colors: {
        paddingVertical: 20,
    },
    card: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'transparent'
    },
    sectHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    sect: {
        
    },
    actionBar: {
        marginHorizontal: 10,
    }
});