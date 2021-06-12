import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, FlatList, StyleSheet, Image} from 'react-native';
import {Text, Avatar, withTheme} from 'react-native-elements';
import {useNavigation, useTheme} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FontAwesome } from '@expo/vector-icons';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SvgXml} from 'react-native-svg';
import { useDispatch, useSelector } from 'react-redux';

import {loadFonts} from '../../libs/fonts';
import {Empty} from '../../assets/empty';
import { addBookmark, getViewedAsync } from '../../store/reducers/subjects';
import { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-community/async-storage';
import { PaymentModal } from '../modal/payment/payment';


function Corousel({subjectId, more}){
    const {topics} = useSelector(state => state.subjects.subjects?.find(({id}) => id === subjectId));
    const {viewed} = useSelector(state => state.subjects);
    const {subscription_active} = useSelector(state => state.auth);
    const [showModal, setShowModal] = useState(false);
    const {navigate} = useNavigation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getViewedAsync());
    }, [])

    const canAccess = async (id) => {
        return (viewed.length < 3 || viewed.includes(id));
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

    const sub = _ => {
        setShowModal(false);
        navigate('Subscription');
    }

    const renderItems = ({item, index}) => (
        <CardSquare
            {...item}
            onPress={_ => onPress(item)}
            addBookmark={_ => bookmark(item)}
        />
    );

    return(
        <View style={styles.container}>
            <FlatList 
                data={topics}
                keyExtractor={item => item.id+item.title}
                renderItem={renderItems}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={_ => <View style={{width: 16,}} />}
                contentContainerStyle={{paddingHorizontal: 20, paddingVertical: 10}}
                ListFooterComponent={<More onPress={more} />}
                ListEmptyComponent={<Text>This list is loading</Text>}
            />
            <PaymentModal 
                show={showModal} 
                close={_ => setShowModal(false)}
                pay={sub}
            />
        </View>
    )
}

export default withTheme(Corousel);



export const More = ({onPress}) => {
    const {colors} = useTheme();
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.9} >
            <View 
                style={[{...styles.card, 
                    backgroundColor: colors.card}, 
                    styles.more
                ]}
            >
                <Text style={styles.text}>View All</Text>
                <FontAwesome name="angle-right" size={24} color="black" />
            </View>
        </TouchableOpacity>);
}

export const CardSquare = ({title, icon, exercises, style, onPress, addBookmark, fav}) => {

    const {colors} = useTheme();
    
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.9} >
            <View style={[{...styles.card, backgroundColor: colors.card}, style]}>
                <Image source={{uri: icon}} style={styles.image} resizeMethod='resize' resizeMode='contain' />
                <View style={styles.wrap}>
                    <Text numberOfLines={1} tail style={styles.text}>{title}</Text>
                    <View style={styles.favCont}>
                        <View>
                            <Text>{exercises.length} Exercises</Text>
                        </View>
                        <TouchableOpacity onPress={addBookmark}>
                            <View style={[styles.fav,{backgroundColor: fav? colors.notification: "transparent"}]}>
                                <Ionicons 
                                    name="bookmarks" 
                                    size={16} 
                                    color={fav? colors.card: colors.highlight} 
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}



export function CardRect({title, icon, exercises, style, onPress, addBookmark, fav}){

    const {colors} = useTheme();
    
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8} >
            <View style={[{...styles.card, backgroundColor: colors.card}, {width: '100%'} ,style]}>
                <View style={styles.rect}>
                    <Image source={{uri: icon}} style={styles.imageRect} resizeMethod='resize' resizeMode='contain' />
                    <View style={{flex: 8}}>
                        <Text numberOfLines={1} tail style={styles.text}>{title}</Text>
                        <Text>{exercises?.length} Exercises</Text>
                    </View>
                    <TouchableOpacity onPress={addBookmark}>
                        <View style={[styles.fav,{backgroundColor: fav? colors.notification: "transparent"}]}>
                            <Ionicons 
                                name="bookmarks" 
                                size={16} 
                                color={fav? colors.card: colors.highlight} 
                            />
                        </View>
                    </TouchableOpacity>  
                </View>
            </View>
        </TouchableOpacity>
    )
}

export const ComingSoon = ({}) => {
    const {colors} = useTheme();

    return (
        <View style={styles.comSoon}>
            <SvgXml xml={Empty} width={wp(70)} height={hp(30)} />
            <Text style={styles.body}>Nothing to see here</Text>
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
        paddingVertical: 10,
        elevation: 5,
    },
    h4: {
        fontFamily: 'OpenSans_700Bold',
        fontSize: 20,
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
    imageRect: {
        width: 100,
        height: 50,
        flex: 2,
        marginRight: 5,
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
    start: {
        paddingVertical: 5,
        paddingHorizontal: 5,
        flex: 2,
        textAlign: "center",
        borderRadius: 20,
        borderWidth: 1,
        alignItems: "center"
    },
    rect: {
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center", 
        paddingHorizontal: 10
    },
    more: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginLeft: 15,
        padding: 15,
        height: 223,
    },
    comSoon: {
        width: '100%',
        height: hp(80),
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

