import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import {useNavigation, useTheme} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';

import {CardSquare, CardRect, ComingSoon} from './index';
import { addBookmark, getViewedAsync } from '../../store/reducers/subjects';
import { showMessage } from 'react-native-flash-message';
import { PaymentModal } from '../modal/payment/payment';



export default function List({subjectId, useGrid=false}){
    const {topics} = useSelector(state => state.subjects.subjects?.find(({id}) => id === subjectId));
    const {subscription_active} = useSelector(state => state.auth);
    const {viewed} = useSelector(state => state.subjects);
    const [grid, setGrid] = useState(useGrid);
    const {colors} = useTheme();
    const {navigate} = useNavigation();
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(getViewedAsync());
    }, [])

    const canAccess = async (id) => {
        return (viewed?.length < 3 || viewed?.includes(id));
    }

    const onPress = async item => {
        let access = await canAccess(item?.id);

        if(subscription_active || access){
            navigate('Overview', {topic: item});
            return;
        }
        setShowModal(true);
    }

    const bookmark = item => {
        dispatch(addBookmark({topic: item}));
        showMessage({
            autoHide: true,
            message: "Bookmarked",
            description: "Topic added to your bookmark",
            duration: 4000,
            type: 'info',
            hideStatusBar: true,
            icon: 'auto'
        })
    }
    const sub = _ => navigate('Subscription')
    
    const renderItems = ({item, index}) => (
        grid ? <CardSquare
            {...item}
            onPress={_ => onPress(item)}
            addBookmark={_ => bookmark(item)}
        /> : <CardRect
            {...item}
            onPress={_ => onPress(item)}
            addBookmark={_ => bookmark(item)}
        />
    );

    const toggle = value => setGrid(value)

    const renderToggle = _ => (<View style={styles.header} >
        <Text style={styles.h4}>All Lessons</Text>
        <View style={{flexDirection: "row"}}>
            <TouchableOpacity onPress={e => toggle(false)} style={styles.toggle}>
                <View>
                    <Ionicons name='md-list' size={20} color={!grid? colors.secondary:colors.text} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={e => toggle(true)} style={styles.toggle}>
                <View>
                    <MaterialCommunityIcons name='view-grid' size={20} color={grid? colors.secondary:colors.text} />
                </View>
            </TouchableOpacity>
        </View>
    </View>);

    return(
        <View style={styles.container}>
            {!grid ? <FlatList
                key={1}
                data={topics}
                keyExtractor={item => item.id+item.title}
                renderItem={renderItems}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={_ => <View style={{width: 16, height: 16}} />}
                contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 120}}
                ListHeaderComponent={renderToggle()}
                ListEmptyComponent={<ComingSoon />}
            /> :
            <FlatList
                key={2}
                data={topics}
                keyExtractor={item => item.id+item.title}
                renderItem={renderItems}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={_ => <View style={{width: 16, height: 16}} />}
                contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 120}}
                ListHeaderComponent={renderToggle()}
                numColumns={2}
                columnWrapperStyle={{justifyContent: "space-around", alignItems: 'flex-start'}}
                ListEmptyComponent={<ComingSoon />}
            /> }
            <PaymentModal
                show={showModal} 
                close={_ => setShowModal(false)}
                pay={sub}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        
    },
    card: {
        borderRadius: 10,
        width: 160,
        paddingTop: 10,
        elevation: 5,
    },
    h4: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 16,
    },
    text: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 14,
    },
    wrap: {
        padding: 15,
    },
    image: {
        width: 160,
        height: 100,
    },
    fav: {
        width: 40,
        height: 40,
        padding: 5,
        borderColor: '#e8e8e8',
        borderRadius: 20,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    favCont: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: '100%',
        marginBottom: 20,
    },
    toggle: {
        padding: 10
    }
});