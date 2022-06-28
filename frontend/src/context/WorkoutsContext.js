import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext()
export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            return { workouts: [action.payload, ...state.workouts] }
        default:
            return state
    }

} //set a payload (data) for every action type 
export const WorkoutsContextProvider = ({ children }) => {
    /*useReducer hook seperates the state management logic 
    from rendering the final component onto the webapp*/
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null
    })
    //globally scopes all components and their properties
    return (
        
        <WorkoutsContext.Provider value={{...state, dispatch }}>
            {children}
            
        </WorkoutsContext.Provider>
        
    );
}
