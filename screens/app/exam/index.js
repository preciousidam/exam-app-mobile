import React, {} from 'react';
import {View, StyleSheet, ScrollView, Platform} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {withTheme, Text, Divider} from 'react-native-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HeaderBackButton } from '@react-navigation/stack';

import FocusAwareStatusBar from '../../../components/StatusBar';
import {Solidbutton} from '../../../components/button';

export function InstructionScreen({navigation}){
    const {colors, dark} = useTheme();
    const {top, bottom} = useSafeAreaInsets();
    const paddingTop = Platform.OS == 'ios' ? top : 0;
    const paddingBottom = Platform.OS == 'ios' ? bottom : 20;

    return (
        <View style={{...styles.container}}>
            <View style={{ backgroundColor: colors.primary, paddingTop}}>
                <View style={{}}>
                    <HeaderBackButton tintColor={colors.text} onPress={() => navigation.goBack()} />
                </View>
                <View style={styles.header}>
                    <Text h4 h4Style={styles.h4}>Biology Exercise</Text>
                    <Text style={styles.headerText}>JAMB 2019 questions</Text>
                </View>
            </View>
            <ScrollView contentContainerStyle={{minHeight: '60%'}}>
                <View style={styles.insCont}>
                    <Text style={{marginHorizontal: 20, fontFamily: 'Montserrat_700Bold'}}>Instruction</Text>
                    <View style={{...styles.instruction, backgroundColor: colors.card}}>
                        <Text style={styles.insText}>Duration:{'                 '} 60 mins</Text>
                        <Text style={styles.insText}>No of Question:{'     '} 50</Text>
                        <Text style={styles.insText}>Timed:{'                    '} Yes</Text>
                        <Text style={styles.insText}>NB: You can take notes during on timed test 
                            which can viewed later outside the test.
                        </Text>
                        <Text style={styles.insText}>NB: Be sure to check your answers 
                            before submitting and make sure you have internet connection before submitting.
                        </Text>
                    </View>
                </View>
            </ScrollView>
                
            <View style={[styles.footer, {paddingBottom}]}> 
                <Solidbutton 
                    text="Start Test" 
                    onPress={_ => navigation.navigate('Test')}
                    style={styles.button}
                />
            </View>
            <FocusAwareStatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={colors.primary} />
        </View>
    )
}

export default withTheme(InstructionScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    header: {
        padding: 20,
        paddingTop: 10,
    },  
    h4: {
        fontFamily: 'Montserrat_700Bold'
    },
    headerText: {
        fontFamily: "OpenSans_400Regular"
    },
    insCont: {
        marginVertical: 30
    },
    instruction: {
        borderRadius: 30,
        paddingVertical: 30,
        paddingHorizontal: 20,
        marginVertical: 15,
        minHeight: "60%",
    },
    footer: {
        position: "absolute",
        bottom: 0,
        padding: 20,
        width: '100%',
        left: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    button: {
        width: '100%'
    },
    insText: {
        marginVertical: 15,
        fontFamily: 'OpenSans_400Regular',
        color: '#8d8d8d'
    }
});
