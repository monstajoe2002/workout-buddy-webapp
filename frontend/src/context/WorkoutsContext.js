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
        case 'DELETE_WORKOUT':
            return {
                workouts:state.workouts.filter((w)=>w._id!==action.payload._id)
            }
        default:
            return state
    }

} //for every action is a new workouts objects except GET
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
