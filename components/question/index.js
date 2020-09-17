import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableHighlight,} from 'react-native';
import {Text, Avatar, Divider} from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import Ionicon from 'react-native-vector-icons/Ionicons';


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

export function Question({number}){
    const {colors} = useTheme();
    const [qstn, setQstn] = useState(question[number % 8]);
    

    useEffect(() =>{
        setQstn(question[number % 8]);
    },[number]);

    const select = id => {
        setQstn({...qstn, ans: id});
    }

    return(
        <View style={styles.body}>
            <View style={{...styles.card, backgroundColor: colors.primary}} > 
                <Text h4 h4Style={styles.h4}>Question {number+1}</Text>
                <Text style={styles.questn}>{qstn.question}</Text>
            </View>
            <View style={{justifyContent: "flex-start", alignItems: "flex-start", marginVertical: 30}}>
                {qstn.options.map((x,id) => 
                    <Option 
                        onSelected={() =>select(id)} 
                        value={x}
                        selected={qstn.ans === id}
                        key={id}
                    />
                )}
            </View>
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
                        {selected && <Ionicon name='ios-checkmark' size={30} color='#fff' />}
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
    }
});