
import { createSelector } from 'reselect'

const authStore = state => state.authStore
const currentUserStore = state => state.authStore.user

export const isLoggedIn = createSelector(
    [authStore, currentUserStore],
    (auth, currentUser) => {
        const passedUXLogin = auth.isLoggedIn
        const userId = currentUser.id
        const token = currentUser.token
        return (passedUXLogin && userId && token) ? true : false
    }
)
