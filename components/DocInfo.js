import React, { Component, useContext } from 'react';
import { View, Text, Button, TouchableOpacity, Image } from 'react-native';
import { Grid, Row } from 'react-native-easy-grid';
import Head from './Header'
import { AuthContext } from './Home'

function DocInfo({ navigation, route }) {
    const userId = useContext(AuthContext)

    return (
        <View>
            <Grid style={{alignItems: 'center'}}>
                <Row style={{margin: 20}}>
                    <Image style={{ height: 135, width: 135, borderRadius: 70}} source={route.params.image}></Image>
                </Row>

                <Row>
                    <Text style={{fontSize: 23, fontFamily: 'Nunito', color: 'rgb(34, 47, 45)', letterSpacing: 0.2}}>{route.params.name}</Text>
                </Row>

                <Row style={{margin: 22, marginTop: 2}}>
                    <Text style={{color: 'rgb(34, 47, 45)', letterSpacing: 0.2, fontFamily: 'Nunito-Regular'}}>Matching agent</Text>
                </Row>

                <Row style={{paddingLeft:33, paddingRight: 33, textAlign: 'center'}}>
                    <Text>{route.params.about}</Text>
                </Row>
            </Grid>
        </View>
    );
}

export default DocInfo;