
import { NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

function navigate(routeName, params = {}) {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        })
    );
}

function replace(routeName, params = {}, action = null) {
    _navigator.dispatch(
        NavigationActions.replace({
            routeName,
            params,
            action
        })
    );
}

export default {
    navigate,
    setTopLevelNavigator,
};
