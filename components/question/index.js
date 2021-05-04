import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableHighlight, TextInput} from 'react-native';
import {Text, Avatar, Divider} from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { onChange } from 'react-native-reanimated';

import {InfoModal} from '../modal';
import { Image } from 'react-native';
import { ScrollView } from 'react-native';

const question = [
    {question: 'How might biological and environmental factors affect the physical growth of children especially children who are adopted from developing countries?',
        options: ['eiusmod tempor incididunt ut', 'labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
            'minim veniam, quis nostrud exercitation ullamco labore et dolore magna aliqua. Ut enim ad ',
            'minim veniam, quis nostrud exercitation ullamco labore et dolore magna aliqua. Ut enim ad '
        ],
        ans: null,
    },
    {question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?',
        options: ['eiusmod tempor incididunt ut', 'labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
            'minim veniam, quis nostrud exercitation ullamco labore et dolore magna aliqua. Ut enim ad ',
            'minim veniam, quis nostrud exercitation ullamco labore et dolore magna aliqua. Ut enim ad '
        ],
        ans: null,
    },
    {question: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat?',
        options: ['eiusmod tempor incididunt ut', 'labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
            'minim veniam, quis nostrud exercitation ullamco labore et dolore magna aliqua. Ut enim ad ',
            'minim veniam, quis nostrud exercitation ullamco labore et dolore magna aliqua. Ut enim ad '
        ],
        ans: null,
    },
    {question: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur?',
        options: ['eiusmod tempor incididunt ut', 'labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
            'minim veniam, quis nostrud exercitation ullamco labore et dolore magna aliqua. Ut enim ad ',
            'minim veniam, quis nostrud exercitation ullamco labore et dolore magna aliqua. Ut enim ad '
        ],
        ans: null,
    },
    {question: 'How might biological and environmental factors affect the physical growth of children especially children who are adopted from developing countries?',
        options: ['eiusmod tempor incididunt ut', 'labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
            'minim veniam, quis nostrud exercitation ullamco labore et dolore magna aliqua. Ut enim ad ',
            'minim veniam, quis nostrud exercitation ullamco labore et dolore magna aliqua. Ut enim ad '
        ],
        ans: null,
    },
    {question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?',
        options: ['eiusmod tempor incididunt ut', 'labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
            'minim veniam, quis nostrud exercitation ullamco labore et dolore magna aliqua. Ut enim ad ',
            'minim veniam, quis nostrud exercitation ullamco labore et dolore magna aliqua. Ut enim ad '
        ],
        ans: null,
    },
    {question: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat?',
        options: ['eiusmod tempor incididunt ut', 'labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
            'minim veniam, quis nostrud exercitation ullamco labore et dolore magna aliqua. Ut enim ad ',
            'minim veniam, quis nostrud exercitation ullamco labore et dolore magna aliqua. Ut enim ad '
        ],
        ans: null,
    },
    {question: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur?',
        options: ['eiusmod tempor incididunt ut', 'labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
            'minim veniam, quis nostrud exercitation ullamco labore et dolore magna aliqua. Ut enim ad ',
            'minim veniam, quis nostrud exercitation ullamco labore et dolore magna aliqua. Ut enim ad '
        ],
        ans: null,
    },
]

export function Question({question, selected, number, onSelect}){
    const {colors} = useTheme();
    const [showHint, setShowHint] = useState(false);
    const [showImage, setShowImage] = useState(false);
    
    return(
        <View style={styles.body}>
            <ScrollView contentContainerStyle={{paddingBottom: hp(30)}}>
                <View style={{...styles.card, backgroundColor: colors.primary}} > 
                    <View style={styles.header}>
                        <Text h4 h4Style={styles.h4}>Question {number+1}</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                            {question?.image && <Text 
                                style={{paddingHorizontal: 10}} 
                                onPress={_ => {setShowImage(true)}}
                                >
                                    <Ionicons name="image-outline" size={24} color={colors.text} />
                                </Text>
                            }
                            <Text onPress={_ => {setShowHint(true)}}><Ionicons name="ios-bulb-outline" size={24} color={colors.text} /></Text>
                        </View>
                        
                    </View>
                    <Text style={styles.questn}>{question?.question}</Text>
                </View>
                <View style={{justifyContent: "flex-start", alignItems: "flex-start", marginVertical: 30}}>
                    {question?.qtn_type === 'MTC' && <View>
                        {question?.opt_a && <Option 
                            onSelected={() =>onSelect(question?.opt_a)} 
                            value={question?.opt_a}
                            selected={selected === question?.opt_a}
                        />}
                        {question?.opt_b && <Option 
                            onSelected={() =>onSelect(question?.opt_b)} 
                            value={question?.opt_b}
                            selected={selected === question?.opt_b}
                        />}
                        {question?.opt_c && <Option 
                            onSelected={() => onSelect(question?.opt_c)} 
                            value={question?.opt_c}
                            selected={selected === question?.opt_c}
                        />}
                        {question?.opt_d && <Option 
                            onSelected={() =>onSelect(question?.opt_d)} 
                            value={question?.opt_d}
                            selected={selected === question?.opt_d}
                        />}
                        {question?.opt_e && <Option 
                            onSelected={() =>onSelect(question?.opt_e)} 
                            value={question?.opt_e}
                            selected={selected === question?.opt_e}
                        />}
                    </View>}

                    {question?.qtn_type === 'SUB' && <View>
                        <TextInput 
                            placeholder="Enter your answer here"
                            multiline={true}
                            style={[styles.textIn, {borderBottomColor: colors.secondary}]}
                            lineHeight={4}
                            numberOfLines={5}
                            textAlignVertical="top"
                            onChangeText={value => onSelect(value)}
                            value={selected}
                        />
                    </View>}
                </View>
            </ScrollView>
            <InfoModal close={_ => setShowHint(false)} show={showHint}>
                <Text style={{alignSelf: 'flex-start', marginBottom: 10, fontFamily: 'Montserrat_700Bold'}}>Hint</Text>
                <Text style={styles.hint}>{question?.hint}</Text>
            </InfoModal>
            <InfoModal close={_ => setShowImage(false)} show={showImage}>
                <View style={{width: wp(80), alignItems: 'center', flexDirection: 'column'}}>
                    <Text style={{alignSelf: 'flex-start', marginBottom: 10, fontFamily: 'Montserrat_700Bold'}}>Use Image to answer question</Text>
                    <Image source={{uri: question?.image}} style={{width: wp(80), height: hp(50)}} resizeMode="contain" />
                </View>
            </InfoModal>
        </View>
    )
}

export function Option({value, selected, onSelected}){
    const {colors} = useTheme();
    const name = selected ? 'ios-checkmark' :'';
    return (
        <TouchableHighlight
            underlayColor={colors.secondary}
            onPress={onSelected}
            activeOpacity={0.1}
        >
            <View style={styles.option}>
                <View style={{marginRight: 15}}>
                    <View 
                        style={{
                            ...styles.rounded, 
                            borderColor: colors.secondary, 
                            backgroundColor: selected? colors.secondary: '#fff',
                        }}
                    >
                        {selected && <Ionicons name='ios-checkmark' size={18} color='#fff' />}
                    </View>
                </View>
                <View style={{flex: 8}}>
                    <Text>{value}</Text>
                </View>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
   
    h4: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 18,
    },
    header: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        paddingBottom: 10,
    },
    body: {
        padding: 20,
    },
    card: {
        width: '100%',
        borderRadius: 10,
        padding: 20,
        elevation: 15
    },
    questn: {
        fontSize: 16,
        lineHeight: 24,
        fontFamily: 'OpenSans_400Regular',
    },
    hint: {
        fontFamily: 'OpenSans_400Regular',
    },
    option: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
        width: '100%',
        marginVertical: 10,
        alignItems: "center",
    },
    rounded: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
    },
    textIn: {
        width: wp(90),
        borderBottomWidth: 1,
        paddingTop: 10,
    }
});