import React, { ChangeEvent, Component, lazy } from 'react'

import { RouteComponentProps, withRouter } from 'react-router-dom'
import { WithTranslation, withTranslation } from 'react-i18next'
import {
    Box,
    Button,
    CircularProgress,
    createStyles,
    Divider,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    Theme,
    WithStyles,
    withStyles
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Field, Form, Formik } from 'formik'

import * as LoginActions from '../../store/ducks/auth/actions'
import * as LayoutActions from '../../store/ducks/layout/actions'
import { IApplicationState } from '../../store'
import { IAuth } from '../../store/ducks/auth/types'
import { LoginValidator } from '../../store/application/validators/auth/login'
import authService from '../../services/auth'
import { STYLE as SHARED_STYLE } from './shared.style'
import AuthWrapper from '../../components/layout/escape.pages/wrapper'
import { LanguageOptions } from '../../i18n'
import ThemeButton from '../layout/theme.button'
import { ThemeMode } from '../../material.theme'

const FormErrorMessage = lazy(() => import('../../components/form.error'))

const Style = (theme: Theme) => createStyles({
    ...SHARED_STYLE(theme),
    container: {
        background: theme.palette.background.paper
    },
    splashContent: {
        ...SHARED_STYLE(theme).splashContent,
        top: 'none',
        left: 0,
        bottom: 0,
        height: '210px'
    },
    splash: {
        ...SHARED_STYLE(theme).splash,
        stroke: theme.palette.primary.main,
        fill: theme.palette.primary.main
    },
    divider: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: 'white',
        borderRadius: '5px'
    },
    forgot: {
        maxWidth: '150px',
        color: 'white',
        textTransform: 'none',
        fontWeight: 'bold'
    }
})

interface Props extends RouteComponentProps<any> {
    readonly loading: boolean
    readonly error: boolean
    readonly language: LanguageOptions
    readonly themeMode: ThemeMode

    loginRequest(data: IAuth): void

    loginReset(): void

    changeLanguage(language: LanguageOptions): void
}

interface State {
    readonly showPassword: boolean
    readonly login: string
    readonly password: string
}

type JoinProps = Props & WithTranslation & WithStyles<any, true>

class Login extends Component<JoinProps, State> {

    constructor(props: JoinProps) {
        super(props)
        /* Bind Context */
        this.changePasswordVisibility = this.changePasswordVisibility.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        /* Initial State */
        this.state = {
            showPassword: false,
            login: '',
            password: ''
        }
        if (authService.isAuthenticated()) {
            this.props.history.push('/app/home')
        }
    }

    public componentDidUpdate(prevProps: Readonly<JoinProps>, prevState: Readonly<State>, snapshot?: any) {
        const { error } = this.props
        const { error: prevError } = prevProps
        if (error && (error !== prevError)) {
            this.setState({ password: '' })
        }
    }

    public componentWillUnmount(): void {
        this.props.loginReset()
    }

    public render() {
        const {
            t,
            classes,
            loading,
            history,
            theme,
            themeMode
        } = this.props
        const {
            showPassword,
            login,
            password
        } = this.state

        return <React.Fragment>
            <Box
                position="absolute"
                top={0}
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                p={1}
                width={'100%'}
                zIndex={1200}>
                <ThemeButton color={theme.palette.primary.main}/>
            </Box>

            <AuthWrapper
                title={t('AUTH.LOGIN.HELMET')}
                className={classes.container}
                splashContent={classes.splashContent}
                splash={classes.splash}
                svgOptions={{ width: 360, height: 210, scale: 3.8 }}
                themeMode={themeMode}>

                <Formik
                    initialValues={{ login, password }}
                    onSubmit={this.handleSubmit}
                    validationSchema={LoginValidator.validationScheme}
                    validateOnMount={true}
                    enableReinitialize={true}>
                    {({
                          isValid,
                          errors,
                          touched,
                          setFieldValue,
                          setFieldTouched
                      }) => (
                        <Form id="form_login">
                            <Field id="login" name="login" type="customField">
                                {({ field }) => (
                                    <Box display="flex" justifyContent="center" p={1}>
                                        <FormControl
                                            className={classes.formControl}
                                            error={!!errors.login && !!touched.login}>
                                            <InputLabel htmlFor="inp_login">
                                                {t('AUTH.LOGIN.USERNAME')}
                                            </InputLabel>
                                            <Input
                                                id="inp_login"
                                                name="login"
                                                type="text"
                                                fullWidth={true}
                                                autoFocus={true}
                                                value={field.value}
                                                onChange={
                                                    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                                                        setFieldValue('login', e.target.value)
                                                    }
                                                }
                                                onBlur={() => setFieldTouched('login', true, true)}
                                            />
                                            <FormErrorMessage name="login"/>
                                        </FormControl>
                                    </Box>
                                )}
                            </Field>

                            <Field id="password" name="password" type="customField">
                                {({ field }) => (
                                    <Box display="flex" justifyContent="center" p={1}>
                                        <FormControl
                                            className={classes.formControl}
                                            error={!!errors.password && !!touched.password}>
                                            <InputLabel htmlFor="inp_password">
                                                {t('AUTH.LOGIN.PASSWORD')}
                                            </InputLabel>
                                            <Input
                                                id="inp_password"
                                                name="password"
                                                value={field.value}
                                                type={showPassword ? 'text' : 'password'}
                                                fullWidth={true}
                                                className={
                                                    !!errors.password && !!touched.password ?
                                                        classes.error
                                                        : ''
                                                }
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            color="inherit"
                                                            aria-label="toggle password visibility"
                                                            onClick={() => this.changePasswordVisibility(true)}
                                                            onMouseDown={() => this.changePasswordVisibility(false)}>
                                                            {showPassword ? <Visibility/> : <VisibilityOff/>}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                onChange={
                                                    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                                                        setFieldValue('password', e.target.value)
                                                    }
                                                }
                                                onBlur={() => setFieldTouched('password', true, true)}
                                            />
                                            <FormErrorMessage name="password"/>
                                        </FormControl>
                                    </Box>
                                )}
                            </Field>

                            <Box display="flex" justifyContent="center" p={1}>
                                <FormControl className={classes.formControl}>
                                    <Button
                                        id="btn_enter"
                                        type="submit"
                                        variant="contained"
                                        size="medium"
                                        color="secondary"
                                        className={classes.button}
                                        disabled={!isValid || loading}>
                                        {t('AUTH.LOGIN.ENTER')}
                                    </Button>

                                    {
                                        loading &&
                                        <CircularProgress id="loading_enter" size={24}
                                                          className={classes.buttonProgress}/>
                                    }

                                </FormControl>
                            </Box>

                        </Form>
                    )}
                </Formik>

                <Box
                    display="flex"
                    justifyContent="center"
                    p={0}>
                    <FormControl className={classes.formControl}>
                        <Divider className={classes.divider}/>
                    </FormControl>
                </Box>

                <Box
                    display="flex"
                    justifyContent="center"
                    p={0}>

                    <Button
                        id="btn_forgot"
                        size="small"
                        className={classes.forgot}
                        onClick={() => history.push('/forgot')}>
                        {t('AUTH.LOGIN.FORGOT')}
                    </Button>

                </Box>
            </AuthWrapper>
        </React.Fragment>
    }

    private changePasswordVisibility(visibility: boolean): void {
        this.setState({ showPassword: visibility })
    }

    private handleSubmit(credentials: IAuth): void {
        const { login, password } = credentials
        this.setState({
            login,
            password
        })
        this.props.loginRequest(credentials)
    }
}

const loginWithTranslation = withTranslation()(Login)

const loginWithStyle = withStyles<any>(Style, { withTheme: true })(loginWithTranslation)

const mapStateToProps = (state: IApplicationState) => ({
    loading: state.auth.login.loading,
    error: state.auth.login.error,
    language: state.layout.language,
    themeMode: state.layout.themeMode
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    ...LoginActions,
    ...LayoutActions
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(loginWithStyle))
