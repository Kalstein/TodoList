import { View, ScrollView, Text, TextInput, Alert} from 'react-native'
import { useState } from 'react'
import MyButton from './MyButton'
import { addAccount } from './FireBase'
import styles from '../Style/Styles'

// 로그인 페이지
const SignIn_Page = ({navigation}) => {
    const [id, setId] = useState()
    const [password, setPassword] = useState()

    return (
        <View style={{justifyContent: 'space-around', flex: 1}}>
            <View>
                <View style={[styles.row, {height:"70%"}]}>
                    <Text style={{paddingLeft:20, paddingTop:20, marginLeft:20, marginTop:10, textAlignVertical:"center",fontSize:20}}>아이디 : </Text>
                    <TextInput style={[styles.textInput, {height:"80%", width:"50%"}]} 
                        placeholder={"아이디"} placeholderTextColor={"#2e2e2e"} onChangeText={(text)=> {
                            setId(text)
                    }}/>
                </View>
                <View style={[styles.row, {height:"70%"}]}>
                    <Text style={{paddingTop:20, marginLeft:20, marginTop:10, textAlignVertical:"center",fontSize:20}}>비밀번호 : </Text>
                    <TextInput style={[styles.textInput, {height:"80%", width:"50%"}]}  secureTextEntry={true}
                        placeholder={"비밀번호"} placeholderTextColor={"#2e2e2e"} onChangeText={(text)=> {
                            setPassword(text)
                    }}/>
                </View>
            </View>

            <View>
                <MyButton style={[styles.button, {height:"30%", width:"60%"}]} textStyle={styles.buttonText} title={"로그인"} onPress={()=>{
                    if (id == ''){
                        Alert.alert("아이디를 입력해주세요")
                    } else if (password == ''){
                        Alert.alert("비밀번호를 입력해주세요")
                    } else if(signIn){
                        navigation.navigate('Home')
                    } else {
                        Alert.alert("아이디 또는 비밀번호가 다릅니다.")
                    }
                }}/>
                <MyButton style={[styles.button, {height:"30%", width:"60%"}]} textStyle={styles.buttonText} title={"회원가입"} onPress={()=>{
                    navigation.navigate('SignUp')
                }}/>
            </View>
        </View>
    )
}

export default SignIn_Page