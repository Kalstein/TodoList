import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    row : {
        flexDirection:"row",
        marginBottom:10,
        backgroundColor:"#2e2e2e"
    },
    mainText : {
        fontSize:40,
        fontWeight:'bold',
        textAlign:'center',
        marginTop:20,
    },
    dateText : {
        fontSize:25,
        fontWeight:'bold',
        textAlign:'center',
        marginBottom:10,
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
    },
    buttonText : {
        fontSize:15,
        fontWeight:'bold',
        textAlign:'center',
        textAlignVertical:'center'
    },
    imageView : {
        marginRight:20,
        paddingBottom:20,
    },
    scrollView : {
        flex:1,
    },
    checkBox : {
        alignSelf: "center",
    },
    checkBoxView : {
        marginLeft:20,
        paddingTop:20,
    },
    listText : {
        textAlign:'left',
        textAlignVertical: 'center',
        marginLeft:20,
        flex:1,
    },
    textInput : {
        paddingLeft:20, 
        marginLeft:20, 
        marginTop:10, 
        backgroundColor:"#e2e2e2", 
        borderRadius:20, 
        borderWidth:1, 
        borderColor:"#e2e2e2", 
        height:"50%",
    },
});

export default styles