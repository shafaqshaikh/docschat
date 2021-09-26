import React, { Component, useContext } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import Head from './Header'
import { AuthContext } from './Home'

function Appointments({ navigation }) {
    const userId = useContext(AuthContext)

    return (
        <View>
            <Head navigation= {navigation}></Head>
            <Text style={{ margin: 'auto', paddingTop: '10%' }}>Appointments Screen</Text>
            {/* <Text>Welcome {userId.uid}!</Text> */}
        </View>
    );
}

export default Appointments;