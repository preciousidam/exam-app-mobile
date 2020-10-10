import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import {AppLoading} from 'expo';
import {Text, Button, Badge} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';
import { loadFonts } from '../../../libs/fonts';
import { useSelector } from 'react-redux';
import {OutlinedInput} from '../../../components/input';
import { LinearGradient } from 'expo-linear-gradient';
import FocusAwareStatusBar from '../../../components/StatusBar';
import LessonList from '../../../components/corousel/lessons';
//import {lessons} from '../../../constants/data';

const colorBack = ['color-primary', 'color-success', 'color-info', 'color-warning', 'color-danger', ];

export default function SubjectScreen({navigation, route}){
    const {colors, dark} = useTheme();
    const fontLoaded = loadFonts();
    const {user} = useSelector(state => state.auth);
    const {navigate} = navigation;
    const {lessons} = useSelector(state => state.lessons);
    const subjects = useSelector(state => state.subjects);
   
    return (
        fontLoaded ? <View style={styles.container}>
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
            </View>
            
            <View style={styles.colors}>
                <Subjects data={subjects} />
            </View>
            <View style={styles.sect}>
                <View style={styles.sectHeader}>
                    <Text style={styles.h4}>School Lesson</Text>
                    <TouchableWithoutFeedback>
                        <View><Text>more</Text></View>
                    </TouchableWithoutFeedback>
                </View>
                <LessonList data={lessons} />
            </View>
            <FocusAwareStatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={colors.background} />
        </View>: <AppLoading />
    );
}

export const Subjects = ({data}) => {
    const {colors} = useTheme();
    const renderItems = ({item, index}) => (
        <TouchableOpacity
            activeOpacity={.8}
        >
            <LinearGradient
                key={index}
                start={[1,.2]}
                colors={[colors[`${colorBack[index % colorBack.length]}-500`], colors[`${colorBack[index % colorBack.length]}-500`],]} 
                style={[styles.card,{}]}
            >
                <Text h4 h4Style={{fontSize: 16, color: '#ffffff'}}>{item}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
    return (
        <FlatList
            data={data}
            keyExtractor={(item,index) => `${index}`}
            renderItem={renderItems}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={_ => <View style={{width: 16,}} />}
            contentContainerStyle={{paddingHorizontal: 20}}
        />
    )
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
        paddingVertical: 30,
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