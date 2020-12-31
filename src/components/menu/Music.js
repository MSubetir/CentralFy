import React from 'react'
import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native'

const { width, height } = Dimensions.get("window");

const Music = ({ data, song, index, onMusic }) => {
  
    return (
        <SafeAreaView style={styles.container}>
            <View
                style={{
                    borderBottomColor: '#FFF',
                    borderBottomWidth: 1,
                }}
            />
            <TouchableOpacity
                onPress={() => onMusic(data, index)}
            >
                <View style={styles.item}>
                    <Text style={styles.textTitle}>{index} | {song.title} -
                            <Text style={styles.textArtist}> {song.artist}</Text>
                    </Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Music

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        flex: 1,
        width: width * 0.95,

    },
    textTitle: {
        color: '#fff',
        fontSize: 18,
    },
    textArtist: {
        color: '#B2B2B2',
        fontSize: 14
    },
})
