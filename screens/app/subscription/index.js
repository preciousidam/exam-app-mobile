import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SolidbuttonNoGradient } from '../../../components/button';

const plans = [
    {id: 1, title: "Monthly", amount: 10000, duration: 1, discount: null},
    {id: 2, title: "Quarterly", amount: 36000, duration: 3, discount: 10},
    {id: 3, title: "Half Yearly", amount: 51000, duration: 6, discount: 15},
    {id: 4, title: "Annualy", amount: 96000, duration: 6, discount: 20},
]

export const SubscriptionScreen = ({navigation}) => {
    const {colors} = useTheme();
    const {width, height} = useSafeAreaInsets();
    const close = _ => navigation.goBack();

    const renderItems = ({item}) => (
        <Plan
            {...item}
            onPress={_ => {}}
        />
    );

    return (
        <SafeAreaView style={[styles.container, {paddingHorizontal: width, paddingVertical: height}]}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={close}
                >
                    <Ionicons name="close" size={30} color={colors.text} />
                </TouchableOpacity>
            </View>
            <View style={styles.main}>
                <FlatList 
                    data={plans}
                    key={1}
                    keyExtractor={item => item.id+item.title}
                    renderItem={renderItems}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={_ => <View style={{width: 30}} />}
                    contentContainerStyle={{paddingHorizontal: 30}}
                />
            </View>
        </SafeAreaView>
    )
}

export const Plan = ({id, title, amount, discount, duration}) => {
    const {colors} = useTheme();

    return (
        <LinearGradient start={[0.6,0.6]} end={[.2,.8]} colors={[colors.primary, colors.warning,]} style={styles.plan}>
            <View style={[styles.sect]}>
                <Text style={[styles.title]}>{title}</Text>
                <Text style={[styles.amt]}>NGN {amount} / {duration} Month(s)</Text>
            </View>
            <View style={[styles.sect,]}>
                <Text style={[styles.middle]}>Unlimited access to lessons and practise questions for up to {duration} month(s).</Text>
            </View>

            <View style={[styles.sect,]}>
                <SolidbuttonNoGradient
                    text="SUBSCRIBE NOW"
                    style={styles.button}
                />
                <Text style={styles.bottomText}>No Commitment, Cancel anytime.</Text>
            </View>
            
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        width: wp(100),
        height: hp(100),
    },
    main: {
        justifyContent: 'center',
        alignItems: 'center',
        height: hp(90),
        flexDirection: 'row',
    },
    header: {
        paddingVertical: 15,
        paddingHorizontal: 10
    },
    plan: {
        minHeight: hp(65),
        height: hp(65),
        width: wp(75),
        borderRadius: wp(3),
        elevation: 10,
        shadowColor: '#c6c6c6',
        shadowOpacity: .2,
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    sect: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    },
    title: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: wp(6),
        color: '#fff',
        marginTop: '20%',
    },
    amt: {
        fontFamily: 'OpenSans_700Bold',
        fontSize: wp(4)
    },
    middle: {
        textAlign: 'center',
        fontFamily: 'OpenSans_400Regular',
    },
    button: {
        backgroundColor: "#000"
    },
    bottomText: {
        fontFamily: "OpenSans_700Bold",
        fontSize: wp(2.7),
        marginTop: '5%'
    }
});