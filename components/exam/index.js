import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {withTheme} from 'react-native-elements';

import {SubjectCard} from '../card';
import { useTheme } from '@react-navigation/native';

function ExamList({data, onPress}){
    const {colors} = useTheme();
    const random = [colors.primary, colors.secondary, colors.notification, colors.facebook];
    const renderItems = ({item, index}) => (
        <SubjectCard
            key={item.id}
            examBody={item.examBody}
            id={item.id}
            duration={item.duration}
            year={item.year}
            noQuestn={item.noQuestn}
            subject={item.subject}
            onPress={onPress}
            iconColor={random[index%4]}
        />
    );

    return(
        <View style={styles.container}>
            <FlatList 
                data={data}
                keyExtractor={item => item.id}
                renderItem={renderItems}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={_ => <View style={{width: 16,}} />}
            />
        </View>
    )
}

export default withTheme(ExamList);

const styles = StyleSheet.create({
    container:{
        width: '100%',
        padding: 20,
    },
});