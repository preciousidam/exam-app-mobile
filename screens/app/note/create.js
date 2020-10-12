import React, { useEffect, useState } from 'react';
import {Text, View, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-community/picker';

import List from '../../../components/list';
import {FloatingActionButton} from '../../../components/button';
import FocusAwareStatusBar from '../../../components/StatusBar';
import { HeaderBackButton } from '@react-navigation/stack';
import { useTheme } from '@react-navigation/native';




export default function CreateNoteScreen({navigation}){

    const {colors, dark} = useTheme();
    const [category, setCategory] = useState(0);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const {Item} = Picker;
    const Header = _ => {
        
        return (<View style={[styles.header, {backgroundColor: colors.card,}]}>
            <HeaderBackButton onPress={e => navigation.goBack()} />
            <View style={{ flex: 6, }}>
                <Picker
                    style={{color: colors.text, width: '70%', }}
                    itemStyle={{fontFamily: 'Montserrat_700Bold'}}
                    selectedValue={category}
                    onValueChange={val => setCategory(val)}
                >
                    <Item label="Private" value={0} />
                    <Item label="Share with Friends" value={1} />
                </Picker>
            </View>
            <TouchableOpacity activeOpacity={0.8}>
                <View style={styles.save}>
                    <Text style={{color: colors.text, fontWeight: "bold"}}>Save</Text>
                </View>
            </TouchableOpacity>
        </View>)
    }

    return (
        <View style={{flex: 1, backgroundColor: dark? color.background :colors.card}}>
            <Header />
            <View style={{paddingHorizontal: 20, paddingTop: 20,}}>
                <TextInput 
                    style={[styles.title, {fontFamily: 'OpenSans_700Bold', color: colors.text}]} 
                    placeholder="Title"
                    onChangeText={val => setTitle(val)}
                />
            </View>
            <View style={{padding: 20, paddingTop: 10, flex: 8, height: '100%'}}>
                <TextInput
                    onChangeText={val => setBody(val)}
                    style={[styles.body, {fontFamily: 'OpenSans_700Bold', color: colors.text}]} 
                    placeholder="Notes"
                    multiline
                    textAlignVertical='top'
                    numberOfLines={500}
                />
            </View>
            <FocusAwareStatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={colors.card} />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        elevation: 10,
    },
    save: {
        flex: 2,
        padding: 10, 
        marginHorizontal: 10,
    },
    title: {
        fontSize: 18,
    },
    body: {
        fontSize: 16,
        width: '100%',
        height: '100%',
    }
})