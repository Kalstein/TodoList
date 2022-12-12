import { View, Text, ScrollView, TextInput} from 'react-native'
import { useState } from 'react'
import MyButton from './MyButton'
import {readData, addData, updateContent, updateState, deleteData} from './FireBase'
import styles from '../Style/Styles'

// 회원가입 페이지
const SignUp_Page = () => {
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')

    return (
        <View style={{justifyContent: 'space-around', flex: 1}}>
            <TextInput style={styles.textInput}
                placeholder={"아이디"} placeholderTextColor={"#2e2e2e"} onChangeText={(text)=> {
                    setId(text)
            }}/>
            <TextInput style={styles.textInput} secureTextEntry={true}
                placeholder={"비밀번호"} placeholderTextColor={"#2e2e2e"} onChangeText={(text)=> {
                    setPassword(text)
            }}/>

            <MyButton style={[styles.button, {flex:1}]} textStyle={styles.buttonText} title={"회원가입"} onPress={()=>{
                if (id == ''){
                    Alert.alert("아이디를 입력해주세요")
                } else if (password == ''){
                    Alert.alert("비밀번호를 입력해주세요")
                } else if(signUp){
                    // 아이디 중복 일때 이벤트
                    navigation.navigate('SignIn')
                }
            }}/>
        </View>
    )
}

export default SignUp_Page