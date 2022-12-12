import {useState} from 'react'

const deleteListData = (listData, setListData, date, content, state) => {
    const [list, setList] = useState()  

    listData.map((array) => {
        if(array[0] == date && array[1] == content && array[2] == state ){console.log("삭제된 데이터 : "+array)}
        else {
            setList(array)
        }
    })

    console.log(list)
}

export default deleteListData