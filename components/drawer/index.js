import React from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import {View, Alert, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';

export default function DrawerCustom(props){
    const {colors} = useTheme();
    
    return (
        <DrawerContentScrollView {...props}>
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
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    view: {
        borderTopColor: "rgba(166, 166, 166, 0.2)",
        borderTopWidth: 1,
    }
});