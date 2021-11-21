import React from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import {View, Alert, StyleSheet} from 'react-native';
import {Avatar, Text} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Picker } from '@react-native-community/picker';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { logout } from '../../store/auth';
import { useAuth } from '../../store/auth/hook';

export default function DrawerCustom(props){
    const {colors} = useTheme();
    //const {user} = useSelector(state => state.auth);
    const {user} = useAuth();
    const dispatch = useDispatch();
    const {Item} = Picker;
    console.log(user)
    const signOut = _ => {
        dispatch(logout());
    }
    
    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{height: '100%'}}>
            <View style={styles.header}>
                <View style={styles.headerprofile}>
                    <Avatar 
                        rounded 
                        size="medium" 
                        icon={{name: 'person', type: 'ionicons', color: colors.secondary}} 
                        containerStyle={{backgroundColor: colors.primary, marginTop: 10}} 
                    />
                    <View style={{flexDirection: "column", padding: 10}}>
                        <Text style={styles.h4}>{`${user?.first_name} ${user?.last_name}`}</Text>
                        <Text style={styles.email} ellipsizeMode='tail' numberOfLines={1}>{user?.email}</Text>
                    </View>
                </View>
            </View>
            <DrawerItemList {...props} />
            <View style={styles.view}>
                <DrawerItem 
                    label="About"
                    icon={({color, size}) => <Ionicons name="md-information-circle" color={color} size={size} />}
                    onPress={_ => Alert.alert('Help')}
                />
                <DrawerItem 
                    label="Help"
                    icon={({color, size}) => <Ionicons name="md-help-circle" color={color} size={size} />}
                    onPress={_ => Alert.alert('Help')}
                />
                <DrawerItem 
                    label="Settings"
                    icon={({color, size}) => <Ionicons name="md-settings" color={color} size={size} />}
                    onPress={_ => Alert.alert('Settings')}
                />
            </View>
            <View style={[styles.bottom,{bottom: 40}]}>
                <Text onPress={signOut} style={{color: '#8d8d8d'}}>Logout</Text>  
            </View>
            <View style={styles.bottom}>
                <Text style={{color: '#8d8d8d'}}>Version 0.0.1</Text>
            </View>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    view: {
        borderTopColor: "rgba(166, 166, 166, 0.2)",
        borderTopWidth: 1,
    },
    header: {
        borderBottomColor: "rgba(166, 166, 166, 0.2)",
        borderBottomWidth: 1,
    },
    headerprofile: {
        flexDirection: "column",
        justifyContent: "space-evenly",
    },
    h4: {
        fontSize: wp('4%'),
    },
    email: {
        
    },
    bottom: {
        position: "absolute",
        bottom: 0,
        padding: 10,
        paddingVertical: 5,
        borderTopColor: "rgba(166, 166, 166, 0.2)",
        borderTopWidth: 1,
        width: '100%'
    },  
});