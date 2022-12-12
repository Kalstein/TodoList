import { db }  from '../firebaseConfig';
import { collection, getDocs, query, where, addDoc, updateDoc, deleteDoc, doc} from "firebase/firestore";

export const readData = async ()=>{
    try{
        const q = query(collection(db, "ToDoList"));
        const querySnapshot = await getDocs(q);
        let datas = []
        let data
        let i = 0
        
        querySnapshot.forEach((doc) => {
            data = doc.data()
            datas[i] = [ data.Date, data.Content, data.State ]
            i++
        });

        return datas
    } catch(error){
        console.log(error.message)
    }
}

// 입력받은 데이터를 데이터베이스에 추가한다.
export const addData = async (date, content, state, time, reset, setReset)=>{
    try{
        const docRef = await addDoc(collection(db, "ToDoList"), {
            Date: date,
            Content: content,
            State: state
        });
        docRef

        setReset(!reset)
    } catch(error){
        console.log(error.message)
    }
}

// 날짜와 기존 내용이 같은 문서를 찾는다.
// 찾은 문서의 id를 사용하여 문서를 새로운 내용으로 갱신한다.
export const updateContent = async (date, content, beforeContent, reset, setReset)=>{
    try{
        const q = query(collection(db, "ToDoList"), where("Date", "==", date), where("Content", "==", beforeContent));
        const querySnapshot = await getDocs(q);
        let id

        querySnapshot.forEach((doc) => {
            id = doc.id
        });

        const target = doc(db, "ToDoList", id)
        await updateDoc(target, {
            Content: content
        });

        setReset(!reset)
    } catch(error){
        console.log(error.message)
    }
}

// 날짜와 내용이 같은 문서를 찾는다.
// 찾은 문서의 id를 사용하여 문서의 상태 값을 변경한다.
export const updateState = async (date, content, state, reset, setReset)=>{
    try{
        const q = query(collection(db, "ToDoList"), where("Date", "==", date), where("Content", "==", content));
        const querySnapshot = await getDocs(q);
        let id

        querySnapshot.forEach((doc) => {
            id = doc.id
        });

        const washingtonRef = doc(db, "ToDoList", id);
        await updateDoc(washingtonRef, {
            State: state
        });
        
        setReset(!reset)
    } catch(error){
        console.log(error)
    }
}

export const deleteData = async (date, content, reset, setReset)=>{
    try{
        const q = query(collection(db, "ToDoList"), where("Date", "==", date), where("Content", "==", content))
        const querySnapshot = await getDocs(q)
        let id

        querySnapshot.forEach((doc) => {
            id = doc.id
        })

        deleteDoc(doc(db, "ToDoList", id));
    } catch(error){
        console.log(error.message)
    }
}