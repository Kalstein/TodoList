import { View, Text, StyleSheet, ScrollView, TextInput} from 'react-native'
import { useState, useEffect, createContext } from 'react'
import MyButton from './MyButton'
//import CreateList from './CreateList'
import Minus from '../assets/Minus.jfif'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {readData, addData, updateData, deleteData} from './FireBase'

// props : 
// 
// 바텀 탭 : 진행, 완료
const MyList = (props) => {
    const [state, SetState] = useState("전체")
    const [check, setCheck] = useState(false)
    const [listData, setListData] = useState()
    const [deleteListData, setDeleteListData] = useState(true)
    const [inputData, setInputData] = useState()

    try{
        useEffect(() => {
            const data = readData(state) 
            data && data.then((array) => {
                setListData(array);
            })
        }, [deleteListData]);

        return (
            <View style={{justifyContent: 'space-around', flex: 1}}>
                <Text style={styles.mainText}>To Do List</Text>
                <View style={styles.row} title={"입력란"}>
                    <TextInput placeholder={"내용"} onChangeText={(text)=> {
                        setInputData(text)
                    }}></TextInput>
                    <MyButton style={styles.button} textStyle={styles.buttonText} title={"등록"} onPress={()=>{
                        let now = new Date()
                        const nowDate = (now.getFullYear() + "." + (now.getMonth() + 1) + "." + now.getDate())
                        addData(nowDate, inputData, "진행")
                    }}/>
                </View>
                <ScrollView style={styles.scrollView}>
                    {listData.map((array, idx) => {
                        let date = 0;

                        if((state == "전체" || state == array[2]) && (date != array[0])){
                            date = array[0]

                            return (
                                <View key={idx + 2}>
                                    <Text key={idx} style={styles.dateText}>{date}</Text>
                                    <CreateList key={idx + 1} date={array[0]} content={array[1]} state={array[2]} 
                                        check={check} setCheck={setCheck} deleteData={deleteData} deleteListData={deleteListData} setDeleteListData={setDeleteListData}/>
                                </View>
                            )
                        } else if (state == "전체" || state == array[2]){
                            return (
                                <CreateList key={idx} date={array[0]} content={array[1]} state={array[2]} 
                                    check={check} setCheck={setCheck} deleteData={deleteData} deleteListData={deleteListData} setDeleteListData={setDeleteListData}/>
                            )
                        } else if (idx == 0){
                            return (
                                <View key={idx}>
                                    <Text style={styles.mainText}>비어있어요</Text>
                                </View>
                            )
                        }
                    })}
                </ScrollView>
                <View style={styles.row} title={"버튼"}>
                    <MyButton style={styles.button} textStyle={styles.buttonText} title={"전체"} onPress={()=>{
                        SetState("전체")
                    }}/>
                    <MyButton style={styles.button} textStyle={styles.buttonText} title={"미완료"} onPress={()=>{
                        SetState("진행")
                    }}/>
                    <MyButton style={styles.button} textStyle={styles.buttonText} title={"완료"} onPress={()=>{
                        SetState("완료")
                    }}/>
                </View>
            </View>
        )
    }catch(error){
        console.log(error)
    }
}

const CreateList = (props) => {
    return (
        <View style={styles.row} key={"날짜별 목록들"}>
            <BouncyCheckbox
                size={20}
                fillColor="red"
                unfillColor="#FFFFFF"
                isChecked={props.state=="진행" ? props.check : ()=>{
                    props.setCheck(!props.check)
                    props.check
                }}
                text={props.content}
                iconStyle={{ borderColor: "red" }}
                textStyle={{ fontFamily: "JosefinSans-Regular" }}
                onPress={() => {props.setCheck(!props.check)}}
                style={styles.checkBox}
            />
            <Text style={styles.timeText}>AM 10:20</Text>
            <MyButton style={styles.ImageView} image={Minus} onPress={()=> {
                props.deleteData(props.date, props.content)
                props.setDeleteListData(!props.deleteListData)
            }}/>
        </View>
    )
}

const styles = StyleSheet.create({
    row : {
        flexDirection:"row",
    },
    mainText : {
        fontSize:40,
        fontWeight:'bold',
        textAlign:'center',
    },
    dateText : {
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center',
    },
    timeText : {
        textAlign:'right',
        textAlignVertical: 'center',
        marginRight:20,
        flex:1,
    },
    checkBox : {
        marginLeft:20,
    },
    button : {
        height:"50%",
        width:"30%",
        alignItems: "center",
        backgroundColor: "#8cfffb",
        padding: 10,
        margin: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#8cfffb",
        flex:1,
    },
    buttonText : {
        fontSize:15,
        fontWeight:'bold',
        textAlign:'center',
    },
    ImageView : {
        width:30,
        height:30,
        marginRight:20,
    },
    scrollView : {
        flex:1,
    },
});

export default MyList