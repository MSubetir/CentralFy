import React from 'react'
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const { width, height } = Dimensions.get("window");

const UselessTextInput = (props) => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      inlineImageLeft='search'
      maxLength={40}
      placeholder=' Buscar'
    />
  );
}

export default function Topbar({ value, search, set }) {
  return (
    <View style={styles.top}>
      <TouchableOpacity
        onPress={() => set(0)}
      >
        <MaterialIcons name="keyboard-arrow-left" color='#fff' size={50} />
      </TouchableOpacity>

      <UselessTextInput
        style={styles.textInput}
        numberOfLines={1}
        onChangeText={text => search(text)}
        value={value}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  top: {
    height: height * 0.08,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: width,
    flexDirection: 'row',

  },
  textInput: {
    backgroundColor: '#f0edf6',
    height: '90%',
    width: '75%',
    borderRadius: 10,
    fontSize: 16,
    color: '#191919',
    paddingLeft: 10,
    marginLeft: 25
  },
});
