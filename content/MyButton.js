import {TouchableOpacity, Text, View, StyleSheet, Image } from 'react-native'

const MyButton = (props) => {
    return (
        <TouchableOpacity
          style={props.style}
          onPress={() => {
            props.onPress()
          }}
        >
          <Text style={props.textStyle}>{props.title}</Text>
          <Image source={props.image? props.image:''} style={styles.ImageView} resizeMode="contain"/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  ImageView: {
    width:30,
    height:30,
  },
});

export default MyButton;