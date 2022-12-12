import { View, Text, ScrollView, TextInput} from 'react-native'
import { useState, useEffect } from 'react'
import MyButton from './MyButton'
import CreateList from './CreateList'
import {readData, addData, updateContent, updateState, deleteData} from './FireBase'
import styles from '../Style/Styles'

// 화면 전체 출력 
const MyList = () => {
    try{
        const [state, setState] = useState("전체") // 버튼에 사용할 상태값 저장용
        const [listData, setListData] = useState() // 리스트 목록 저장용 
        const [inputData, setInputData] = useState() // 내용 입력 저장용
        const [reset, setReset] = useState(false) // 리셋 여부
        const [delayComplete, setDelayComplete] = useState(false); // 처음 실행될 때 사용
        let date = 0 // 날짜 저장용
        let now = new Date() // 현재 날짜 생성용 
        let i = 0; // 리스트 출력에 사용
        const nowDate = (now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate()) // 원하는 형식 맞추기

        useEffect(() => {
            const data = readData(state) // 파이어베이스에서 데이터 가져오기
            data && data.then((array) => {
                setListData(array) // 데이터 갱신
            })
        }, [reset, setReset])

        useEffect(() => { // 파이어베이스 갱신 후 갱신된 내용이 화면의 리스트에 적용되게 하기 위해 타이머 설정
            if (delayComplete && !reset) return

            const timeout = setTimeout(() => {
                setDelayComplete(true)
                setReset(false)
            }, 400)
        
            return () => clearTimeout(timeout)
        }, [delayComplete, reset, setReset])

        return (
            delayComplete? ( // 타이머 실행 여부
                <View style={{justifyContent: 'space-around', flex: 1}}>
                    <Text style={styles.mainText}>To Do List</Text>
                    <View style={[styles.row, {marginBottom:10}]} title={"입력란"}>
                        <TextInput style={styles.textInput} 
                            placeholder={"내용"} placeholderTextColor={"#2e2e2e"} onChangeText={(text)=> {
                            setInputData(text)
                        }}/>
                        <MyButton style={[styles.button, {flex:1}]} textStyle={styles.buttonText} title={"등록"} onPress={()=>{
                            const nowTime = now.getHours() + "h " + now.getMinutes() + "m " + now.getSeconds() + "s"
                            addData(nowDate, inputData, "진행", nowTime, reset, setReset) // 파이어베이스 등록
                        }}/>
                    </View>
                    <ScrollView style={styles.scrollView}>
                        {listData.map((array, idx) => {
                            if((state == "전체" || state == array[2]) && (date != array[0])){ // 날짜가 다를 때 
                                date = array[0] // 새로운 날짜
                                i++
                                
                                return (
                                    <View key={idx + i}>
                                        <Text key={idx + i * 2} style={styles.dateText}>{date==nowDate?"Today":date}</Text>
                                        <CreateList key={idx + i * 3} date={array[0]} content={array[1]} state={array[2]} 
                                            deleteData={deleteData} updateContent={updateContent} updateState={updateState}
                                            reset={reset} setReset={setReset} listData={listData} setListData={setListData}/>
                                    </View>
                                )
                            } else if (state == "전체" || state == array[2]){ // 날짜가 같을 때
                                i++

                                return (
                                    <CreateList key={idx + i} date={array[0]} content={array[1]} state={array[2]} 
                                        deleteData={deleteData} updateContent={updateContent} updateState={updateState}
                                        reset={reset} setReset={setReset} listData={listData} setListData={setListData}/>
                                )
                            } else if (idx == listData.length - 1 && i == 0){ // 리스트의 마지막 & 버튼 상태에 해당하는 요소가 없을 때
                                return (
                                    <View key={idx}>
                                        <Text style={styles.mainText}>비어있어요</Text>
                                    </View>
                                )
                            }
                        })}
                    </ScrollView>
                    <View style={styles.row}>
                        <MyButton style={[styles.button, {flex:1}]} textStyle={styles.buttonText} title={"전체"} onPress={()=>{
                            setState("전체")
                        }}/>
                        <MyButton style={[styles.button, {flex:1}]} textStyle={styles.buttonText} title={"진행"} onPress={()=>{
                            setState("진행")
                        }}/>
                        <MyButton style={[styles.button, {flex:1}]} textStyle={styles.buttonText} title={"완료"} onPress={()=>{
                            setState("완료")
                        }}/>
                    </View>
                </View>
            ):<Text style={styles.mainText}>로딩중</Text>
        )
    }catch(error){
        console.log(error)
    }
}

export default MyList