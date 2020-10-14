import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, FlatList, StyleSheet, Image} from 'react-native';
import {Text, Avatar, withTheme} from 'react-native-elements';
import { AppLoading } from 'expo';
import {useNavigation, useTheme} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {CardSquare, CardRect} from './index';

export default function List({data, useGrid=false}){

    const [grid, setGrid] = useState(useGrid);
    const {colors} = useTheme();
    const {navigate} = useNavigation()
    
    const renderItems = ({item, index}) => (
        grid ?<CardSquare
            {...item}
            onPress={_ => navigate('Overview', {id: item.id})}
        /> : <CardRect
            {...item}
            onPress={_ => navigate('Overview', {id: item.id})}
        />
    );

    const toggle = value => setGrid(value)

    const renderToggle = _ => (<View style={styles.header} >
        <Text style={styles.h4}>All Lessons</Text>
        <View style={{flexDirection: "row"}}>
            <TouchableOpacity onPress={e => toggle(false)} style={styles.toggle}>
                <View>
                    <Ionicons name='md-list' size={20} color={colors.text} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={e => toggle(true)} style={styles.toggle}>
                <View>
                    <MaterialCommunityIcons name='view-grid' size={20} color={colors.text} />
                </View>
            </TouchableOpacity>
        </View>
    </View>);

    return(
        <View style={styles.container}>
            {!grid ? <FlatList
                key={1}
                data={data}
                keyExtractor={item => item.id}
                renderItem={renderItems}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={_ => <View style={{width: 16, height: 16}} />}
                contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 120}}
                ListHeaderComponent={renderToggle()}
            />:
            <FlatList
                key={2}
                data={data}
                keyExtractor={item => item.id}
                renderItem={renderItems}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={_ => <View style={{width: 16, height: 16}} />}
                contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 120}}
                ListHeaderComponent={renderToggle()}
                numColumns={2}
                columnWrapperStyle={{justifyContent: "space-around", alignItems: 'flex-start'}}
            />}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        
    },
    card: {
        borderRadius: 10,
        width: 160,
        paddingTop: 10,
        elevation: 5,
    },
    h4: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 16,
    },
    text: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 14,
    },
    wrap: {
        padding: 15,
    },
    image: {
        width: 160,
        height: 100,
    },
    fav: {
        width: 40,
        height: 40,
        padding: 5,
        borderColor: '#e8e8e8',
        borderRadius: 20,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    favCont: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: '100%',
        marginBottom: 20,
    },
    toggle: {
        padding: 10
    }
});