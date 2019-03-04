import React from 'react'
import { connect } from 'react-redux';
import { TouchableOpacity, Button } from 'react-native'
import { func } from 'prop-types'

import { PLACE_HOLDERS, LOGIN, COLORS, SCREENS } from '../helpers/constants'
import { FullScreenView, ButtonView } from '../components/StyledViews'
import { StyledTitleText, StyledButtonText } from '../components/StyledText'
import { StyledTextInput } from '../components/StyledTextInput'
import { loginOperation } from '../redux/auth/actions'

const SIGN_UP_CTA = 'Need an account?'

const mapDispatchToProps = (dispatch) => {
    return {
        login: (email, password) => dispatch(loginOperation(email, password))
    }
}

class LoginScreen extends React.PureComponent {
    static propTypes = {
        login: func
    }

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            validEmail: false,
            password: '',
            validPassword: false,
            validForm: false
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { validEmail, validPassword } = this.state

        if (validEmail && validPassword) {
            this.setState({validForm: true})
        } else {
            this.setState({validForm: false})
        }
    }

    onEmailChange = (text) => {
        // eslint-disable-next-line
        const emailCheckRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.setState({
            email: text
        });
        if (!this.state.validEmail) {
            if (emailCheckRegex.test(text)) {
                this.setState({
                    validEmail: true
                });
            }
        } else {
            if (!emailCheckRegex.test(text)) {
                this.setState({
                    validEmail: false
                });
            }
        }
    }

    onPasswordChange = (text) => {
        if (!this.state.validPassword) {
            if (text.length > 4) {
                this.setState({
                    validPassword: true
                });
            }
        } else {
            if (text.length <= 4) {
                this.setState({
                    validPassword: false
                });
            }
        }
        this.setState({password: text});
    }

    loginOperation = () => {
        const { validForm, email, password } = this.state
        const { login } = this.props
        if (!validForm) { return }

        login(email, password)
    }

    render() {
        const { validForm } = this.state
        const { navigation } = this.props

        return (
            <FullScreenView paddingTopPercent={10}>
                <StyledTitleText>{LOGIN}</StyledTitleText>
                <Button
                    title={SIGN_UP_CTA}
                    onPress={() => navigation.replace(SCREENS.SignUp)}
                    color={COLORS.green}
                />
                <StyledTextInput
                    onChangeText={(email) => this.onEmailChange(email)}
                    value={this.state.email}
                    placeholder={PLACE_HOLDERS.email}
                    autoCapitalize={'none'}
                />
                <StyledTextInput
                    onChangeText={(password) => this.onPasswordChange(password)}
                    value={this.state.password}
                    placeholder={PLACE_HOLDERS.password}
                    secureTextEntry
                />
                <TouchableOpacity onPress={() => this.loginOperation()}>
                    <ButtonView themeColor={validForm ? COLORS.green : COLORS.silver} wide><StyledButtonText>{LOGIN}</StyledButtonText></ButtonView>
                </TouchableOpacity>
            </FullScreenView>
        )
    }
}

export default connect(null, mapDispatchToProps)(LoginScreen);
