import { View } from 'react-native';
import React from 'react';
import { Header } from 'react-native-elements';
import { FontAwesome, Entypo } from '@expo/vector-icons';

function Head({ navigation }) {

    return (
        <View style={{ backgroundColor: 'none'}}>
            <Header placement="left" backgroundColor='none'
            leftComponent={<FontAwesome.Button title='' backgroundColor='none' onPress={() => navigation.openDrawer()}>
            <Entypo name="menu" size={24} color="black" />
            </FontAwesome.Button>}
            centerComponent={{ text: 'MedAids', style: { paddingTop: '10px', color: 'black' } }}
            />
        </View>
    );
}

export default Head;