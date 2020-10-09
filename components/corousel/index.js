import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, FlatList, StyleSheet, ProgressBarAndroid} from 'react-native';
import {Text, Avatar, withTheme} from 'react-native-elements';
import { AppLoading } from 'expo';
import {useTheme} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {loadFonts} from '../../libs/fonts';


function Corousel({data}){
    const [active, setActive] = useState(0);
    
    const renderItems = ({item, index}) => (
        <Card 
            examBody={item.examBody} 
            subject={item.subject}
            progress={item.progress}
            noQuestn={item.noQuestn}
            startDate={item.startDate}
            active={index === active}
            onPress={_ => setActive(index)}
        />
    );

    return(
        <View style={styles.container}>
            <FlatList 
                data={data}
                keyExtractor={item => item.id}
                renderItem={renderItems}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={_ => <View style={{width: 16,}} />}
                contentContainerStyle={{paddingHorizontal: 20}}
            />
        </View>
    )
}

export default withTheme(Corousel);

function Card({examBody, subject, progress, startDate, noQuestn, active, onPress}){

    const fontLoaded = loadFonts();
    const {colors} = useTheme();

    return (
        fontLoaded ? <TouchableOpacity onPress={onPress} activeOpacity={0.8} >
            <View style={{...styles.card, backgroundColor: active ? colors.primary : colors.card}}>
                <View>
                    <Text style={styles.text}>{examBody}</Text>
                    <Text h4 h4Style={styles.h4}>{subject}</Text>
                </View>
                <View style={{flexDirection: "row", marginVertical: 10}}>
                    <Text 
                        style={{...styles.backText, backgroundColor: active ? 'rgba(255,255,255,0.2)': 'rgba(99,99,99,0.1)'}}
                    >
                        30 of {noQuestn}
                    </Text>
                    <Text style={{...styles.backText, backgroundColor: active ? 'rgba(255,255,255,0.2)': 'rgba(99,99,99,0.1)'}}>
                        <Ionicons 
                            name='md-time' 
                        />
                        {' '} {startDate}
                    </Text>
                </View>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <ProgressBarAndroid 
                        styleAttr="Horizontal"
                        indeterminate={false}
                        progress={progress}
                        color={active ? colors.secondary: colors.primary}
                        style={{flex: 3, marginRight: 10}}
                    />
                    <Text style={{fontSize: 12, fontWeight: "bold", flex: 2}}>{progress * 100}% complete</Text>
                </View>
            </View>
        </TouchableOpacity>: <AppLoading />
    )
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
    },
    card: {
        padding: 20,
        borderRadius: 10,
        width: 300
    },
    h4: {
        fontFamily: 'OpenSans_700Bold',
        fontSize: 20,
    },
    text: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 12,
    },
    backText: {
        padding: 5,
        borderRadius: 3,
        marginRight: 10,
    }
});

