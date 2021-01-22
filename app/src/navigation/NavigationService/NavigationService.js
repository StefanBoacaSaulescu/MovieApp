import { NavigationActions, StackActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

function goBack(numberOfRoutesToPop) {
    _navigator.dispatch(
        StackActions.pop({
            n: numberOfRoutesToPop
        })
    );
}

function navigate(routeName, params, pageId) {
    console.log('Navigate to ' + routeName)
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
            key: routeName + pageId
        })
    );
}

export default {
    navigate,
    setTopLevelNavigator,
    goBack
};
