import React, { useEffect, useState } from 'react';
import {Text, View, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-community/picker';
import moment from 'moment';

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FocusAwareStatusBar from '../../../components/StatusBar';
import { HeaderBackButton } from '@react-navigation/stack';
import { useTheme } from '@react-navigation/native';
import { ActInd } from '../../../components/activityIndicator';
import { editNoteAsync } from '../../../store/reducers/note';
import { Alert } from 'react-native';




export default function EditNoteScreen({navigation, route}){
    
    const {colors, dark} = useTheme();
    const [visibility, setVisibility] = useState(0);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const {id} = route.params;
    const note = useSelector(state => state.notes.notes.find(({id: noteId}) => noteId === id ));
    const {user} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [saving, setSaving] = useState(false);
    const {loading} = useSelector(state => state.notes);

    const save = _ => {
        if (visibility == 1){
            setSaving(true);
            return;
        }
        dispatch(editNoteAsync({...note, body, title, visibility, shared: []}));
        setSaving(false);
    }

    const onSubmit = list => {
        
        if (list.length > 0){
            setSaving(false);
            dispatch(editNoteAsync({...note, body, title, shared: list, visibility}));
            return;
        }
        Alert.alert("Did you forget email list?", "Cannot share note without email list. Please provide atleast one email.");
    }
    

    useEffect(() => {
        setBody(note?.body);
        setTitle(note?.title);
        setVisibility(note?.visibility);
    },[note]);


    const {Item} = Picker;
    const Header = _ => {
        
        return (<View style={[styles.header, {backgroundColor: colors.card,}]}>
            <HeaderBackButton onPress={e => navigation.goBack()} />
            <View style={{ flex: 6, }}>
                <Picker
                    style={{color: colors.text, width: '70%', }}
                    itemStyle={{fontFamily: 'Montserrat_700Bold'}}
                    selectedValue={visibility}
                    onValueChange={val => setVisibility(val)}
                >
                    <Item label="Private" value={0} />
                    <Item label="Share with Friends" value={1} />
                </Picker>
            </View>
            <TouchableOpacity activeOpacity={0.8} onPress={save}>
                <View style={styles.save}>
                    <Text style={{color: colors.text, fontWeight: "bold"}}>Save</Text>
                </View>
            </TouchableOpacity>
        </View>)
    }

    return (
        <View style={{flex: 1, backgroundColor: dark? color.background :colors.card}}>
            <Header />
            <View style={{paddingHorizontal: 20, paddingTop: 20, height: hp(8)}}>
                <TextInput 
                    style={[styles.title, {fontFamily: 'OpenSans_700Bold', color: colors.text}]} 
                    placeholder="Title"
                    onChangeText={val => setTitle(val)}
                    value={title}
                    editable={note?.user === user?.pk}
                />
            </View>
            <View style={{padding: 20, paddingTop: 10, flex: 8, height: hp(80)}}>
                <TextInput
                    onChangeText={val => setBody(val)}
                    style={[styles.body, {fontFamily: 'OpenSans_400Regular', color: colors.text}]} 
                    placeholder="Notes"
                    multiline
                    textAlignVertical='top'
                    numberOfLines={500}
                    value={body}
                    editable={note?.user === user?.pk}
                />
            </View>
            <View style={[styles.footer, {backgroundColor: dark? color.background :colors.card}]}>
                <Text style={[styles.author, {backgroundColor: note?.user === user?.pk ? colors.success : colors.warning}]}>
                    {note?.user === user?.pk ? 'NOTE AUTHOR': 'SHARED WITH YOU'}
                </Text>
                
                <Text style={[{color: colors.text, fontFamily: 'OpenSans_700Bold', fontSize: wp(3),}]}>
                    Last Modified: {moment(note?.last_modified).fromNow()}
                </Text>
            </View>
            {saving && <StudentList shared={note?.shared_list} onCancel={_ => setSaving(false)} onSubmit={onSubmit} />}
            <ActInd status={loading} />
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
        fontSize: 15,
        width: '100%',
        height: '100%',
        
    },
    author: {
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 10,
        fontFamily: 'OpenSans_700Bold',
        fontSize: wp(3),
        color: '#fff',
        marginRight: 20,
    },
    footer: {
        alignSelf: 'flex-end',
        height: hp(8),
        elevation: 10,
        width: wp(100),
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: wp(5),
        flexDirection: 'row',
    },
    list: {
        position: 'absolute',
        width: wp(80),
        height: hp(60),
        zIndex: 100,
        top: hp(20),
        alignSelf: 'center',
        elevation: 20,
        shadowOpacity: .4,
        borderRadius: 10,
    },
    listText: {
        marginHorizontal: 10,
        marginVertical: 15,
        borderWidth: 1,
        borderColor: "#c6c6c6",
        padding: 10,
        borderRadius: wp(2)
    },
    mHeader: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        elevation: 5,
        borderBottomColor: "#c6c6c6",
        backgroundColor: '#fff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    hText: {
        fontFamily: 'Montserrat_700Bold',
    },
    bottom: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        elevation: 5,
        borderBottomColor: "#c6c6c6",
        backgroundColor: '#fff',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    cancel: {
        marginHorizontal: 10,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    share: {
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    btext: {
        fontFamily: 'OpenSans_700Bold',
        fontSize: wp(2.7)
    },
    middle: {
        padding: 10,
    },
    email: {
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: hp(0.7),
        alignItems: 'center',
        borderRadius: wp(8)
    },
    emailText: {
        fontFamily: 'OpenSans_700Bold', 
        color: '#fff', 
        fontSize: wp(3),
        flex: 9
    }
})

export const StudentList = ({shared, onSubmit, onCancel}) => {
    const {colors} = useTheme();
    const [emails, setEmails] = useState(shared.join(','));
    const [list, setList] = useState([]);

    const remove = email => {
        let filtered = emails.split(',')?.filter(x => x !== email);
        setEmails(filtered.join(','));
    }

    useEffect(() => {
        setList(emails?.split(','));
    }, [emails])

    return (<View style={[styles.list, {backgroundColor: colors.card}]}>
        <View style={styles.mHeader}>
            <Text style={styles.hText}>Share with...</Text>
        </View>
        <TextInput 
            placeholder="Enter emails, seperated by comma"
            style={styles.listText}
            value={emails}
            onChangeText={emails => setEmails(emails.replace(/\s+/g, ''))}
        />

        <View style={styles.middle}>
            {list.map((email, id) => (email.length > 0) && (
                <TouchableOpacity key={id} style={[styles.email, {backgroundColor: colors.primary}]}>
                    <Text 
                        style={styles.emailText} 
                        ellipsizeMode="tail" 
                        numberOfLines={1}
                    >
                        {email}
                    </Text>

                    <Text style={{flex: 1}} onPress={_ => remove(email)}>
                        <Ionicons name="close-circle" size={24} color="#fff" />
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
        <View style={styles.bottom}>
            <TouchableOpacity style={[styles.cancel, {borderColor: colors.secondary}]} onPress={onCancel}>
                <Text style={[styles.btext, {color: colors.secondary}]} >CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.share, {backgroundColor: colors.primary}]} onPress={_ => onSubmit(list)}>
                <Text style={styles.btext} >SHARE</Text>
            </TouchableOpacity>
        </View>
    </View>)
}