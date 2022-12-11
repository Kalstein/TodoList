import { View, Text, StyleSheet, ScrollView, TextInput} from 'react-native'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import MyButton from './MyButton'
import Minus from '../assets/Minus.jfif'

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
                props.deleteData(props.date ,props.content)
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

export default CreateList