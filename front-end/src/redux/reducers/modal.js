const initialState ={
    modalTitle:"",
    modalDescription:"",
    modalShow:false,
    foundWords:[],
}

const modalReducer =(state=initialState,action)=>{
    switch (action.type) {
        case "SHOW_MODAL":
            return {
                ...state,
                modalTitle:action.payload.modalTitle,
                modalDescription:action.payload.modalDescription,
                modalShow:true
            }
        case "HIDE_MODAL":
            return {
                ...state,
                modalTitle:"",
                modalDescription:"",
                modalShow:false,
                foundWords:[]
            }
        case "SHOW_GAME_RESULT":
        return {
            ...state,
            modalShow:true,
            modalTitle:action.payload.modalTitle,
            modalDescription:action.payload.modalDescription,
            foundWords:action.payload.foundWords
        }   
        default:
           return state
    }
}
export default modalReducer;