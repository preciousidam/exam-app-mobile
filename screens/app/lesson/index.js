import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView, RefreshControl} from 'react-native';
import {Text, Badge, SearchBar} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


import FocusAwareStatusBar from '../../../components/StatusBar';
import LessonList from '../../../components/lesson';
import {SearchInput} from '../../../components/input';
import {updateSubjectsAsync} from '../../../store/reducers/subjects';
import { updateLessonsAsync } from '../../../store/lesson';




export default function LessonScreen({navigation,route}){
    const {colors, dark} = useTheme();
    const {user} = useSelector(state => state.auth);
    const {navigate} = navigation;
    const {lessons, loading} = useSelector(state => state.lessons);
    const {subjects} = useSelector(state => state.subjects);
    const {width, height} = useSafeAreaInsets();
    const dispatch = useDispatch();

    const refresh = _ => {
        if(user){
            dispatch(updateSubjectsAsync(user?.profile?.level));
            dispatch(updateLessonsAsync());
        }
    }

    useEffect(() => {
        refresh();
    },[user])
    

    return (
        <SafeAreaView style={[styles.container, {paddingHorizontal: width, paddingVertical: height}]}>
            <View style={styles.bar}>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <TouchableWithoutFeedback onPress={_ => navigation.openDrawer()}>
                        <View>
                            <Ionicons name='md-menu' size={wp(6)} color={colors.text} />
                        </View>
                    </TouchableWithoutFeedback>
                    <Text 
                        style={[styles.h4, {marginHorizontal: wp(5), fontFamily: 'OpenSans_700Bold'}]}
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
                            <Ionicons name='ios-notifications-outline' size={wp(6)} color={colors.text} />
                            {<Badge status='error' containerStyle={{ position: 'absolute', top: 2, right: 1 }} />}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={_ => refresh()} />
                }
            >
                <View style={styles.header}>
                    <Text style={styles.h4}>Start Learning!</Text>
                    <Text style={styles.h5}>{user?.profile?.level_name}</Text>
                </View>
                <View style={styles.colors}>
                    <SearchInput  
                        placeholder="search for topics, subject, title"
                    />
                </View>
                {
                    subjects?.map(({title, id}, index) => (
                        <View style={styles.sect} key={id}>
                            <View style={styles.sectHeader}>
                                <Text style={styles.h4}>{title} Lesson</Text>
                                <TouchableWithoutFeedback onPress={() => navigate('List', {title, id})}>
                                    <View><Text>more</Text></View>
                                </TouchableWithoutFeedback>
                            </View>
                            <LessonList data={lessons} subjectId={id} more={() => navigate('List', {title, id})} />
                        </View>
                    ))
                }
            </ScrollView>
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
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    header: {
        paddingHorizontal: 20,
    },
    h5: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 14
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