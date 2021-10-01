import React, { ChangeEvent, Component, lazy } from 'react'

import { RouteComponentProps, withRouter } from 'react-router-dom'
import { WithTranslation, withTranslation } from 'react-i18next'
import {
    Box,
    Button,
    CircularProgress,
    createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    SvgIcon,
    Theme,
    Tooltip,
    Typography,
    WithStyles,
    withStyles
} from '@material-ui/core'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Field, Form, Formik } from 'formik'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import clsx from 'clsx'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import * as LoginActions from '../../store/ducks/auth/actions'
import { IApplicationState } from '../../store'
import { LanguageOptions, MAP_ENUM_TO_LANGUAGE } from '../../i18n'
import authService from '../../services/auth'
import { ChangePasswordValidator } from '../../store/application/validators/auth/change.password'
import { STYLE as SHARED_STYLE } from './shared.style'
import CONFIG_THEME, { ThemeMode } from '../../material.theme'
import sessionStorageService from '../../services/session.storage'
import { IChangePassword } from '../../store/ducks/auth/types'
import AuthWrapper from '../../components/escape.pages/wrapper'
import { ReactComponent as LogoLight } from '../../assets/imgs/logo_light.svg'
import { ReactComponent as LogoDark } from '../../assets/imgs/logo_dark.svg'

const ThemeButton = lazy(() => import('../layout/theme.button'))
const FormErrorMessage = lazy(() => import('../../components/form.error'))
const Loading = lazy(() => import('../../components/loading'))

const SPLASH_CONTENT_HEIGHT = 180

const Style = (theme: Theme) => createStyles({
    ...SHARED_STYLE(theme),
    container: {
        background: theme.palette.primary.main
    },
    splashContent: {
        ...SHARED_STYLE(theme).splashContent,
        height: `${SPLASH_CONTENT_HEIGHT}px`,
        transform: 'rotate(180deg)'
    },
    title: {
        ...SHARED_STYLE(theme).title,
        color: theme.palette.primary.main
    },
    padding: {
        padding: `0 ${theme.spacing(1)}px`
    },
    dialogButton: {
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    media: {
        width: 200,
        height: 100,
        color: theme.palette.text.primary
    },
    successTitleColor: {
        color: '#FFFFFF'
    }
})

interface Props extends RouteComponentProps<any> {
    readonly loading: boolean
    readonly success: boolean
    readonly themeMode: ThemeMode

    changePasswordRequest(data: IChangePassword): void

    changePasswordReset(): void
}

type JoinProps = Props & WithTranslation & WithStyles<any, true>

interface State {
    readonly validatingToken: boolean
    readonly validToken: boolean | undefined
    readonly showPassword: boolean
    readonly showConfirmPassword: boolean
    readonly email: string
}

class ChangePassword extends Component<JoinProps, State> {
    private _isMounted = false

    constructor(props: JoinProps) {
        super(props)
        /* Bind Context */
        this.handleSubmit = this.handleSubmit.bind(this)
        this.validateToken = this.validateToken.bind(this)
        this.changePasswordVisibility = this.changePasswordVisibility.bind(this)
        this.changeConfirmPasswordVisibility = this.changeConfirmPasswordVisibility.bind(this)
        /* Initial State */
        this.state = {
            validatingToken: true,
            validToken: undefined,
            showConfirmPassword: false,
            showPassword: false,
            email: ''
        }
        const { history, match: { params: { language } }, i18n } = this.props
        const languageOptions = Object.values(LanguageOptions)
        if (!language || !languageOptions.includes(language)) {
            history.push('/not_found')
            return
        }
        i18n.changeLanguage(MAP_ENUM_TO_LANGUAGE[language])
        this.validateToken()
    }

    public componentWillUnmount(): void {
        this.props.changePasswordReset()
        this._isMounted = false
        sessionStorageService.clear()
    }

    public componentDidMount(): void {
        this._isMounted = true
    }

    public render() {
        const {
            t,
            classes,
            loading,
            history,
            success,
            themeMode,
            theme
        } = this.props
        const { validatingToken, validToken, showConfirmPassword, showPassword, email } = this.state

        const tooltipPosition = window?.innerWidth > 980 ? 'right' : 'top'

        const THEME = createTheme({
            ...CONFIG_THEME[themeMode],
            palette: {
                ...CONFIG_THEME[themeMode].palette,
                primary: { main: '#FFFFFF' },
                white: { main: '#FFFFFF' },
                text: { primary: '#FFFFFF', secondary: '#FFFFFF' }
            }
        })

        return <React.Fragment>

            {
                validatingToken && <Loading id="loading_validating_token" message={t('AUTH.CHANGE_PASSWORD.LOADING')}/>
            }

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

            <Dialog
                id="dialog_error"
                open={!validToken && validToken !== undefined}>
                <DialogTitle id="dialog_error_title">
                    {t('AUTH.CHANGE_PASSWORD.ERROR_DIALOG.TITLE')}
                </DialogTitle>
                <DialogContent id="dialog_error_content">
                    <Box
                        display="flex"
                        justifyContent="center"
                        p={1}>
                        <SvgIcon
                            component={themeMode === ThemeMode.LIGHT ? LogoLight : LogoDark}
                            className={classes.media}
                            viewBox="0 0 164 62"/>
                    </Box>
                    <DialogContentText align="justify" id="dialog_error_message">
                        {t('AUTH.CHANGE_PASSWORD.ERROR_DIALOG.MESSAGE')}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        id="btn_error_understood"
                        autoFocus={true}
                        variant="contained"
                        size="small"
                        className={classes.dialogButton}
                        onClick={() => history.push('/login')} color="primary">
                        {t('AUTH.FORGOT.UNDERSTOOD')}
                    </Button>
                </DialogActions>
            </Dialog>

            <AuthWrapper
                title={t('AUTH.FORGOT.HELMET')}
                className={classes.container}
                splashContent={classes.splashContent}
                splash={classes.splash}
                svgOptions={{ width: 360, height: SPLASH_CONTENT_HEIGHT, scale: 5 }}
                themeMode={themeMode}>
                {
                    success ?
                        <React.Fragment>

                            <Box
                                display="flex"
                                justifyContent="center"
                                flexDirection="column">
                                <Typography
                                    id="success_title"
                                    variant="h6"
                                    className={clsx(classes.successCommon, classes.successTitleColor)}>
                                    {t('AUTH.CHANGE_PASSWORD.SNACKBAR.TITLE')}
                                </Typography>
                            </Box>


                            <Box
                                display="flex"
                                justifyContent="center"
                                flexDirection="column"
                                p={1}>

                                <Typography
                                    id="success_message"
                                    className={clsx(classes.successCommon, classes.successMessageColor)}>
                                    {t('AUTH.CHANGE_PASSWORD.SNACKBAR.MESSAGE')}
                                </Typography>
                            </Box>

                            <Box display="flex" justifyContent="center" p={1}>
                                <FormControl className={classes.formControl}>
                                    <Button
                                        id="btn_success_understood"
                                        type="button"
                                        variant="contained"
                                        size="medium"
                                        color="secondary"
                                        className={classes.button}
                                        onClick={() => history.push('/login')}>
                                        {t('AUTH.FORGOT.UNDERSTOOD')}
                                    </Button>

                                </FormControl>

                            </Box>
                        </React.Fragment>
                        :
                        <Formik
                            initialValues={{ email, new_password: '', confirmPassword: '' }}
                            enableReinitialize={true}
                            onSubmit={this.handleSubmit}
                            validationSchema={ChangePasswordValidator.validationScheme}
                            validateOnMount={true}>
                            {({ isValid, errors, touched, values }) => (
                                <Form>

                                    <ThemeProvider theme={THEME}>
                                        <Field id="email" name="email" type="customField">
                                            {({ field }) => (
                                                <Box display="flex" justifyContent="center"
                                                     className={classes.padding}>
                                                    <FormControl
                                                        className={classes.formControl}
                                                        error={!!errors.email && !!touched.email}>
                                                        <InputLabel htmlFor="inp_email">
                                                            {t('AUTH.FORGOT.EMAIL')}
                                                        </InputLabel>
                                                        <Input
                                                            id="inp_email"
                                                            name="email"
                                                            type="text"
                                                            fullWidth={true}
                                                            value={field.value}
                                                            className={classes.border}
                                                            disabled={true}
                                                        />
                                                        <FormErrorMessage name="email"/>
                                                    </FormControl>
                                                </Box>
                                            )}
                                        </Field>

                                        <Field id="new_password" name="new_password" type="customField">
                                            {({ field, form: { setFieldValue, setFieldTouched } }) => (
                                                <Box display="flex" justifyContent="center"
                                                     className={classes.padding}>
                                                    <FormControl
                                                        className={classes.formControl}
                                                        error={!!errors.new_password && !!touched.new_password}
                                                        disabled={!values?.email}>
                                                        <InputLabel htmlFor="inp_new_password">
                                                            {t('AUTH.CHANGE_PASSWORD.PASSWORD')}
                                                        </InputLabel>
                                                        <Tooltip
                                                            title={`${t('AUTH.CHANGE_PASSWORD.PASSWORD_PATTERN')}`}
                                                            placement={tooltipPosition}
                                                            arrow={true}
                                                            open={!!field.value && !!errors.new_password && !!touched.new_password}>
                                                            <Input
                                                                id="inp_new_password"
                                                                name="new_password"
                                                                value={field.value}
                                                                type={showPassword ? 'text' : 'password'}
                                                                autoFocus={true}
                                                                className={
                                                                    !!errors.new_password && !!touched.new_password ?
                                                                        clsx(classes.border, classes.error)
                                                                        : classes.border
                                                                }
                                                                fullWidth={true}
                                                                endAdornment={
                                                                    <InputAdornment position="end">
                                                                        <IconButton
                                                                            id={showPassword ? 'btn_new_password_visibility' : 'btn_new_password_visibility_off'}
                                                                            disabled={!values?.email}
                                                                            color="inherit"
                                                                            aria-label="toggle password visibility"
                                                                            onClick={() => this.changePasswordVisibility(true)}
                                                                            onMouseDown={() => this.changePasswordVisibility(false)}>
                                                                            {showPassword ? <Visibility/> :
                                                                                <VisibilityOff/>}
                                                                        </IconButton>
                                                                    </InputAdornment>
                                                                }
                                                                onChange={
                                                                    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                                                                        setFieldValue('new_password', e.target.value)
                                                                    }
                                                                }
                                                                onBlur={() => setFieldTouched('new_password', true, true)}
                                                            />
                                                        </Tooltip>
                                                        <FormErrorMessage name="new_password"/>
                                                    </FormControl>
                                                </Box>
                                            )}
                                        </Field>

                                        <Field id="confirmPassword" name="confirmPassword" type="customField">
                                            {({ field, form: { setFieldValue, setFieldTouched } }) => (
                                                <Box display="flex" justifyContent="center"
                                                     className={classes.padding}>
                                                    <FormControl
                                                        className={classes.formControl}
                                                        error={!!errors.confirmPassword && !!touched.confirmPassword}
                                                        disabled={!values?.email}>
                                                        <InputLabel htmlFor="inp_confirmPassword">
                                                            {t('AUTH.CHANGE_PASSWORD.CONFIRM_PASSWORD')}
                                                        </InputLabel>
                                                        <Input
                                                            id="inp_confirmPassword"
                                                            name="confirmPassword"
                                                            value={field.value}
                                                            type={showConfirmPassword ? 'text' : 'password'}
                                                            fullWidth={true}
                                                            className={
                                                                !!errors.confirmPassword && !!touched.confirmPassword ?
                                                                    clsx(classes.border, classes.error)
                                                                    : classes.border
                                                            }
                                                            endAdornment={
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        id={showPassword ? 'btn_confirmPassword_visibility' : 'btn_confirmPassword_visibility_off'}
                                                                        disabled={!values?.email}
                                                                        color="inherit"
                                                                        aria-label="toggle password visibility"
                                                                        onClick={() => this.changeConfirmPasswordVisibility(true)}
                                                                        onMouseDown={() => this.changeConfirmPasswordVisibility(false)}>
                                                                        {showConfirmPassword ? <Visibility/> :
                                                                            <VisibilityOff/>}
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            }
                                                            onChange={
                                                                (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                                                                    setFieldValue('confirmPassword', e.target.value)
                                                                }
                                                            }
                                                            onBlur={() => setFieldTouched('confirmPassword', true, true)}
                                                        />
                                                        <FormErrorMessage name="confirmPassword"/>
                                                    </FormControl>
                                                </Box>
                                            )}
                                        </Field>
                                    </ThemeProvider>

                                    <Box display="flex" justifyContent="center" className={classes.padding}>
                                        <FormControl className={classes.formControl}>
                                            <Button
                                                id="btn_password_reset"
                                                type="submit"
                                                variant="contained"
                                                size="medium"
                                                color="secondary"
                                                className={classes.button}
                                                disabled={!isValid || loading}>
                                                {t('AUTH.CHANGE_PASSWORD.RESET')}
                                            </Button>

                                            {
                                                loading &&
                                                <CircularProgress id="loading_password_reset" size={24}
                                                                  className={classes.buttonProgress}/>
                                            }

                                        </FormControl>
                                    </Box>

                                </Form>
                            )}
                        </Formik>
                }
            </AuthWrapper>
        </React.Fragment>

    }

    private handleSubmit(values): void {
        this.props.changePasswordRequest(values)
    }

    private validateToken(): void {
        const {
            location: { search },
            history,
            match: { params: { language } }
        } = this.props
        const query = new URLSearchParams(search)
        let token: string = query.get('token') || ''
        if (token) {
            sessionStorageService.setItem('token', token)
            history.push(`/${language}/password-reset`)
        }
        token = sessionStorageService.getItem('token')
        let email: string = ''
        let validToken: boolean = false
        try {
            const decoded = authService.verify(token)
            email = decoded?.email || ''
            validToken = true
        } catch (e) {
            sessionStorageService.clear()
        } finally {
            const interval = setInterval(() => {
                if (this._isMounted) {
                    this.setState({ validToken, validatingToken: false, email })
                    clearInterval(interval)
                }
            })
        }
    }

    private changePasswordVisibility(visibility: boolean): void {
        this.setState({ showPassword: visibility })
    }

    private changeConfirmPasswordVisibility(visibility: boolean): void {
        this.setState({ showConfirmPassword: visibility })
    }
}

const changePasswordWithTranslation = withTranslation()(ChangePassword)

const changePasswordWithStyle = withStyles<any>(Style, { withTheme: true })(changePasswordWithTranslation)

const mapStateToProps = (state: IApplicationState) => ({
    loading: state.auth.changePassword.loading,
    success: state.auth.changePassword.success,
    themeMode: state.layout.themeMode
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(LoginActions, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(changePasswordWithStyle))
