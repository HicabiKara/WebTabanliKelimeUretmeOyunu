export const showModal=(modalTitle,modalDescription)=>{
    return {
        type:"SHOW_MODAL",
        payload:{modalTitle,modalDescription},
    }
}
export const showGameResult=(modalTitle,modalDescription,foundWords)=>{ 
    return {
        type:"SHOW_GAME_RESULT",
        payload:{modalTitle,modalDescription,foundWords}
    }
}

