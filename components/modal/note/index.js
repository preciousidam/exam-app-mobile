import React, { useEffect, useState } from 'react';
import {Text, View, TouchableOpacity, StyleSheet, TextInput, Modal, Button} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';

import FocusAwareStatusBar from '../../../components/StatusBar';
import { HeaderBackButton } from '@react-navigation/stack';
import { useTheme } from '@react-navigation/native';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {ActInd} from '../../activityIndicator';
import { newNoteAsync } from '../../../store/reducers/note';




export default function CreateNoteModal({show, close, topic}){

    const {colors, dark} = useTheme();
    const [visibility, setVisibility] = useState(0);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [saving, setSaving] = useState(false);
    const {user} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const {loading} = useSelector(state => state.notes);

    const save = _ => {
        if (visibility == 1){
            setSaving(true);
            return;
        }
        dispatch(newNoteAsync({user: user?.pk, body, title, shared: [], topic, visibility}));
        setSaving(false);
    }

    const onSubmit = list => {
        if (list.length > 0){
            setSaving(false);
            dispatch(newNoteAsync({user: user?.pk, body, title, shared: list, topic, visibility}));
            return;
        }
        Alert.alert("Did you forget email list?", "Cannot share note without email list. Please provide atleast one email.");
    }

    const {Item} = Picker;
    const Header = _ => {
        
        return (
            <View style={[styles.header, {backgroundColor: colors.card,}]}>
            <HeaderBackButton onPress={close} />
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
        <Modal
            animationType='slide'
            visible={show}
            transparent={true}
        >
            <View style={{flex: 1, backgroundColor: dark? colors.background :colors.card, position: 'relative'}}>
                <Header />
                <View style={{paddingHorizontal: 20, paddingTop: 20,}}>
                    <TextInput 
                        style={[styles.title, {fontFamily: 'OpenSans_700Bold', color: colors.text}]} 
                        placeholder="Title"
                        onChangeText={val => setTitle(val)}
                        value={title}
                    />
                </View>
                <View style={{padding: 20, paddingTop: 10, flex: 8, height: '100%'}}>
                    <TextInput
                        onChangeText={val => setBody(val)}
                        style={[styles.body, {fontFamily: 'OpenSans_400Regular', color: colors.text}]} 
                        placeholder="Notes"
                        multiline
                        textAlignVertical='top'
                        numberOfLines={500}
                        value={body}
                    />
                </View>
                {saving && <StudentList onCancel={_ => setSaving(false)} onSubmit={onSubmit} />}
                <FocusAwareStatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={colors.card} />
            </View>
            <ActInd status={loading} />
        </Modal>
    );
}

export const StudentList = ({onSubmit, onCancel}) => {
    const {colors} = useTheme();
    const [emails, setEmails] = useState('');
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
            placeholder="Enter emails, seperated with comma"
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