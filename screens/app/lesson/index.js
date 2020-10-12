import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import {AppLoading} from 'expo';
import {Text, Badge, SearchBar} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import { useSelector } from 'react-redux';


import FocusAwareStatusBar from '../../../components/StatusBar';
import LessonList from '../../../components/lesson';
import { loadFonts } from '../../../libs/fonts';
import {SearchInput} from '../../../components/input';


const colorBack = ['color-primary', 'color-success', 'color-info', 'color-warning', 'color-danger', ];

export default function LessonScreen({navigation,route}){
    const {colors, dark} = useTheme();
    const fontLoaded = loadFonts();
    const {user} = useSelector(state => state.auth);
    const {navigate} = navigation;
    const {lessons} = useSelector(state => state.lessons);
    const subjects = useSelector(state => state.subjects);
    const {width, height} = useSafeAreaInsets();

    return (
        fontLoaded ? <SafeAreaView style={[styles.container, {paddingHorizontal: width, paddingVertical: height}]}>
            <View style={styles.bar}>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <TouchableWithoutFeedback onPress={_ => navigation.openDrawer()}>
                        <View>
                            <Ionicons name='md-menu' size={24} color={colors.text} />
                        </View>
                    </TouchableWithoutFeedback>
                    <Text 
                        style={[styles.h4, {marginHorizontal: 20, fontFamily: 'OpenSans_700Bold'}]}
                    >
                        {route.name}
                    </Text>
                </View>
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-evenly"}}>
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
            </View>
            <ScrollView>
                <View style={styles.header}>
                    <Text h3 h3Style={styles.h3} style={styles.h4}>Hey {user.name}</Text>
                    <Text style={styles.h4}>Start Learning!</Text>
                </View>
                <View style={styles.colors}>
                    <SearchInput  
                        placeholder="search for topics, subject, title"
                    />
                </View>
                <View style={styles.sect}>
                    <View style={styles.sectHeader}>
                        <Text style={styles.h4}>School Lesson</Text>
                        <TouchableWithoutFeedback onPress={() => navigate('List')}>
                            <View><Text>more</Text></View>
                        </TouchableWithoutFeedback>
                    </View>
                    <LessonList data={lessons} />
                </View>
                <View style={styles.sect}>
                    <View style={styles.sectHeader}>
                        <Text style={styles.h4}>Tutorial Lesson</Text>
                        <TouchableWithoutFeedback onPress={() => navigate('List')}>
                            <View><Text>more</Text></View>
                        </TouchableWithoutFeedback>
                    </View>
                    <LessonList data={lessons} />
                </View>
                <View style={styles.sect}>
                    <View style={styles.sectHeader}>
                        <Text style={styles.h4}>Recommended Lesson</Text>
                        <TouchableWithoutFeedback onPress={() => navigate('List')}>
                            <View><Text>more</Text></View>
                        </TouchableWithoutFeedback>
                    </View>
                    <LessonList data={lessons} />
                </View>
                <View style={styles.sect}>
                    <View style={styles.sectHeader}>
                        <Text style={styles.h4}>Biology Lesson</Text>
                        <TouchableWithoutFeedback onPress={() => navigate('List')}>
                            <View><Text>more</Text></View>
                        </TouchableWithoutFeedback>
                    </View>
                    <LessonList data={lessons} />
                </View>
            </ScrollView>
            <FocusAwareStatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={colors.background} />
        </SafeAreaView>: <AppLoading />
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bar: {
        width: '100%',
        paddingHorizontal: 20,
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
        padding: 20,
        width: '100%',
    },
    card: {
        padding: 20,
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
        marginBottom: 40,
    },
    actionBar: {
        marginHorizontal: 10,
    }
});