import { View, Text, TextInput, Modal} from 'react-native'
import {useState} from 'react'
import MyButton from './MyButton'
import Minus from '../assets/Minus.png'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import styles from '../Style/Styles'

// 리스트 목록 반환
const CreateList = (props) => {
    const [checkBoxSelected, setCheckBoxSelected] = useState(props.state=="진행"? false:true) // 체크 표시 여부 
    const [modalVisible, setModalVisible] = useState(false) // 모달 투명화 여부
    const [inputData, setInputData] = useState() // 내용 입력 저장용
    const [list, setList] = useState()  
    let list1 = []

    return (
        <View style={[styles.row, {justifyContent: 'space-around', flex: 1, backgroundColor:"#2e2e2e"}]} key={"날짜별 목록들"}>
            <View style={styles.checkBoxView}>
                <BouncyCheckbox
                    size={25}
                    fillColor="red"
                    unfillColor="#FFFFFF"
                    disableText={true}
                    iconStyle={{ borderColor: "red" }}
                    innerIconStyle={{ borderWidth: 2 }}
                    isChecked={checkBoxSelected}
                    onPress={() => {
                        setCheckBoxSelected(!checkBoxSelected)
                        props.updateState(props.date, props.content, !checkBoxSelected==false? "진행":"완료", props.reset, props.setReset)
                        props.setReset(true)
                    }}
                />
            </View>
            <View>
                <Text style={[styles.listText, checkBoxSelected?{textDecorationLine:"line-through"} : '']} onPress={()=> {
                    setModalVisible(!modalVisible);
                }}>{props.content}</Text>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={{flex: 1, justifyContent: "center", alignItems: "center", margin:50, backgroundColor: 'rgba(52, 52, 52, 0.5)'}}>
                        <TextInput style={{width:"50%", height:"30%"}} placeholder={"내용"} defaultValue={props.content} onChangeText={(text)=> {
                            setInputData(text)
                        }}></TextInput>
                        <MyButton style={styles.button} 
                            textStyle={styles.buttonText} title={"수정"} onPress={()=>{
                            props.updateContent(props.date, inputData, props.content, props.reset, props.setReset) // 데이터 베이스 수정
                            setModalVisible(!modalVisible); // 창 투명화
                        }}/>
                    </View>
                </Modal>
            </View>
            <Text style={styles.timeText}>시간</Text>
            <MyButton style={styles.imageView} image={Minus} onPress={()=> {
                // <a href="https://www.flaticon.com/kr/free-icons/" title="적게 아이콘">적게 아이콘  제작자: Uniconlabs - Flaticon</a>
                props.deleteData(props.date, props.content, props.reset, props.setReset)
                props.setReset(true)
            }}/>
        </View>
    )
}

export default CreateList