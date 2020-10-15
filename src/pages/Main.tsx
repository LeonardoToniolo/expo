import React, { Component, useEffect, useState } from 'react'
import { FlatList, Text, View,Image, StyleSheet } from 'react-native'

interface Member {
    login: string,
    avatar_url:string
}

const Main:React.FC = () => {
    const [members, setMembers] = useState<Member[] >([]);

    useEffect(() => {
        fetch('https://api.github.com/orgs/rocketseat/members').then(response => {
            response.json().then(data => {
                setMembers(data);
            })
        });
    }, [])

    return (
        <FlatList 
            contentContainerStyle={{padding: 24}}
            data={members}
            keyExtractor={member => member.login}
            renderItem={({item: member}) => (
                <View style={styles.member}>
                    <Image style={styles.image} source={{uri: member.avatar_url}}/>
                    <Text>{member.login}</Text>
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    member: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20
    },

    image: {
        marginRight:12,
        height:48,
        width: 48,
        borderRadius: 24
    }
})

export default Main;
