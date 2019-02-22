import React from 'react'
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native'
import { func } from 'prop-types'

import { FullScreenView, ButtonView } from '../components/StyledViews'
import { StyledTitleText, StyledButtonText } from '../components/StyledText'
import { StyledTextInput } from '../components/StyledTextInput'
import { signUpOperation } from '../redux/auth/actions'
import { PLACE_HOLDERS, SIGN_UP, COLORS } from '../helpers/constants'

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (userName, email, password) => dispatch(signUpOperation(userName, email, password))
    }
}

class SignUpScreen extends React.PureComponent {
    static propTypes = {
        signUp: func
    }

    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            validUserName: false,
            email: '',
            validEmail: false,
            password: '',
            validPassword: false,
            validForm: false
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { validUserName, validEmail, validPassword } = this.state

        if (validUserName && validEmail && validPassword) {
            this.setState({validForm: true})
        } else {
            this.setState({validForm: false})
        }
    }

    onUserNameChange = (text) => {
        if (!this.state.validUserName) {
            if (text.length > 4) {
                this.setState({
                    validUserName: true
                });
            }
        } else {
            if (text.length <= 4) {
                this.setState({
                    validUserName: false
                });
            }
        }
        this.setState({userName: text});
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

    signUpOperation = () => {
        const { validForm, userName, email, password } = this.state
        const { signUp } = this.props
        if (!validForm) { return }

        signUp(userName, email, password)
    }

    render() {
        const { validForm } = this.state

        return (
            <FullScreenView paddingTopPercent={10}>
                <StyledTitleText>{SIGN_UP}</StyledTitleText>
                <StyledTextInput
                    onChangeText={(userName) => this.onUserNameChange(userName)}
                    value={this.state.userName}
                    placeholder={PLACE_HOLDERS.userName}
                    marginTop={20}
                />
                <StyledTextInput
                    onChangeText={(email) => this.onEmailChange(email)}
                    value={this.state.email}
                    placeholder={PLACE_HOLDERS.email}
                />
                <StyledTextInput
                    onChangeText={(password) => this.onPasswordChange(password)}
                    value={this.state.password}
                    placeholder={PLACE_HOLDERS.password}
                    secureTextEntry
                />
                <TouchableOpacity onPress={() => this.signUpOperation()}>
                    <ButtonView themeColor={validForm ? COLORS.green : COLORS.silver} wide><StyledButtonText>{SIGN_UP}</StyledButtonText></ButtonView>
                </TouchableOpacity>
            </FullScreenView>
        )
    }
}

export default connect(null, mapDispatchToProps)(SignUpScreen);
