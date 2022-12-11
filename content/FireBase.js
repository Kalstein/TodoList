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
export const addData = async (date, content, state)=>{
    try{
        const docRef = await addDoc(collection(db, "ToDoList"), {
            Date: date,
            Content: content,
            State: state
        });
        docRef
    } catch(error){
        console.log(error.message)
    }
}

// 날짜와 기존 내용이 같은 문서를 찾는다.
// 찾은 문서의 id를 사용하여 문서를 새로운 내용으로 업데이트 한다.
export const updateData = async (props)=>{
    try{
        const q = query(collection(db, "ToDoList"), where("Date", "==", props.date), where("content", "==", props.beforeContent));
        const querySnapshot = getDocs(q);
        let id

        querySnapshot.forEach((doc) => {
            id = doc.id
        });

        const target = doc(db, "ToDoList", id)
        await updateDoc(target, {
            content: props.content,
            state: props.state,
        });
    } catch(error){
        console.log(error.message)
    }
}

export const deleteData = async (date, content)=>{
    try{
        console.log(date, content)
        const q = query(collection(db, "ToDoList"), where("Date", "==", date), where("Content", "==", content))
        const querySnapshot = await getDocs(q)
        let id

        querySnapshot.forEach((doc) => {
            id = doc.id
        })

        await deleteDoc(doc(db, "ToDoList", id));
    } catch(error){
        console.log(error.message)
    }
}