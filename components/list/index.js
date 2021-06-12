import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, FlatList, StyleSheet, RefreshControl} from 'react-native';
import {Text} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';
import moment from 'moment';

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { ComingSoon } from '../lesson';
import { fetchNotesAsync } from '../../store/reducers/note';


export default function List({data, onPress}){

    const {colors} = useTheme();
    const {user} = useSelector(state => state.auth);
    const {loading} = useSelector(state => state.notes);
    const dispatch = useDispatch();
    
    const renderItems = ({item, index}) => (
        <ListItem 
            {...item}
            author={item.user === user?.pk}
            onPress={_ => onPress(item.id)} 
        />
    );

    const refresh = _ => dispatch(fetchNotesAsync(user?.pk));

    return(
        <View style={[styles.container, {backgroundColor: colors.card}]}>
            <FlatList
                refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} />}
                key={1}
                data={data}
                keyExtractor={({title}, index) => title+index}
                renderItem={renderItems}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={_ => <View style={{ width: '100%', height: 1, backgroundColor: colors.seperator}} />}
                ListEmptyComponent={<ComingSoon />}
            />
        </View>
    )
}

export function ListItem({body, last_modified, read, title, author, onPress}){
    const {colors} = useTheme();
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={.7}>
            <View style={styles.item}>
                <View style={{flex: 9}}>
                    <Text 
                        style={{
                            color: read? colors.highlight: colors.text,
                            fontFamily: 'Montserrat_700Bold',
                            fontSize: wp(3.5)
                        }}
                    >
                        {title}
                    </Text>
                    <Text 
                        ellipsizeMode='tail' 
                        numberOfLines={1} 
                        style={{
                            color: read? colors.highlight: colors.text,
                            fontFamily: 'OpenSans_400Regular',
                            fontSize: wp(3.2)
                        }}
                    >
                        {body}
                    </Text>
                </View>
                <Text 
                    style={{
                        paddingVertical: 2,
                        paddingHorizontal: 3,
                        flex: 1,
                        textAlign: "center",
                        fontFamily: 'OpenSans_400Regular',
                        fontSize: wp(3)
                    }}
                >
                    {moment(last_modified).fromNow()}
                </Text>
                <Text style={[styles.author, {backgroundColor: author? colors.success : colors.warning}]}>
                    {author? 'AUTHOR': 'SHARED'}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: hp(100)
    },
    item: {
        padding: 15,
        paddingVertical: 10,
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "flex-start"
    },
    author: {
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 10,
        fontFamily: 'OpenSans_700Bold',
        fontSize: wp(2.5),
        color: '#fff',
        position: 'absolute',
        right: 10,
        top: 10,
    }
});