import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView, FlatList, TouchableOpacity} from 'react-native';
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
import List from '../../../components/lesson/list';
import { Bookmarks } from '../../../components/lesson/bookmarks';
import { getBookmarkAsync } from '../../../store/reducers/subjects';

export default function BookmarkScreen({navigation, route}){
    const {colors, dark} = useTheme();
    const {navigate} = navigation;
    const {width, height} = useSafeAreaInsets();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBookmarkAsync());
    },[])

    
    return (
        <SafeAreaView style={[styles.container, {paddingHorizontal: width, paddingTop: height}]}>
            
            <View style={styles.sect}>
                <View style={[styles.header, {backgroundColor: colors.card}]}>
                    <Text style={styles.headerText}>Bookmarks</Text>
                </View>
                <View style={[styles.notice, {backgroundColor: colors.card}]}>
                    <Text style={styles.noticeText}>
                        All bookmarked topic can be view when offline 
                        {`  `} <Ionicons name="cloud-download-outline" size={18} color={colors.info} />
                    </Text>

                </View>
                <Bookmarks />
            </View>
            <FocusAwareStatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={colors.card} />
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
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 15,
        elevation: 5
    },
    headerText: {
        fontFamily: "Montserrat_700Bold",
        fontSize: wp(4)
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
    },
    notice: {
        padding: 15,
    },
    noticeText: {
        fontFamily: "OpenSans_400Regular",
        textAlignVertical: 'center'
    }
});