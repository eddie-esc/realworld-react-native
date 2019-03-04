import React from 'react'
import { connect } from 'react-redux'
import { Button, View, Text } from 'react-native'

import { isLoggedIn } from '../redux/auth/selectors'
import { SCREENS, COLORS, NAV_BUTTONS } from '../helpers/constants'

const mapStateToProps = state => ({
    isLoggedIn: isLoggedIn(state)
})

class HomeScreen extends React.PureComponent {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { params } = navigation.state
        const rightButtonTitle = (params && params.isLoggedIn) ? NAV_BUTTONS.profile : NAV_BUTTONS.signupLogin
        const navigateToScreen = (params && params.isLoggedIn) ? SCREENS.Settings : SCREENS.SignUp

        return {
            headerRight: (
                <Button
                    onPress={() => navigation.navigate(navigateToScreen)}
                    title={rightButtonTitle}
                    color={COLORS.green}
                />
            )
        }
    }

    componentDidMount () {
        const { isLoggedIn } = this.props
        this.props.navigation.setParams({ isLoggedIn: isLoggedIn })
    }

    componentDidUpdate(prevProps) {
        const { isLoggedIn } = this.props
        if (prevProps.isLoggedIn !== isLoggedIn) {
            this.props.navigation.setParams({ isLoggedIn: isLoggedIn })
        }
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
                <Button
                    title='Go to Article Details'
                    onPress={() => this.props.navigation.navigate('ArticleDetails')}
                />
                <Button
                    title='Create a new article'
                    onPress={() => this.props.navigation.navigate('NewArticle')}
                />
            </View>
        );
    }
}

export default connect (mapStateToProps, null)(HomeScreen)
