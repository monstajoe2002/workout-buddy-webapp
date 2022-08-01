import { useAuthContext } from "./useAuthContext"
export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const logout = () => {
        //remove token from local storage
        localStorage.removeItem('user')

        //dispatch action to logout
        dispatch({ type: 'LOGOUT' })

    }
    return { logout }
}
