import React, { ChangeEvent, Component, lazy } from 'react'

import { RouteComponentProps, withRouter } from 'react-router-dom'
import { WithTranslation, withTranslation } from 'react-i18next'
import {
    Box,
    Button,
    CircularProgress,
    createStyles,
    FormControl,
    Input,
    InputLabel,
    Theme,
    Typography,
    WithStyles,
    withStyles
} from '@material-ui/core'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import clsx from 'clsx'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'

import * as LoginActions from '../../store/ducks/auth/actions'
import { IApplicationState } from '../../store'
import { Field, Form, Formik } from 'formik'
import { ForgotValidator } from '../../store/application/validators/auth/forgot'
import CONFIG_THEME, { ThemeMode } from '../../material.theme'
import { STYLE as SHARED_STYLE } from './shared.style'
import AuthWrapper from '../../components/escape.pages/wrapper'

const FormErrorMessage = lazy(() => import('../../components/form.error'))

const Style = (theme: Theme) => createStyles({
    ...SHARED_STYLE(theme),
    splashContent: {
        ...SHARED_STYLE(theme).splashContent,
        height: '270px',
        transform: 'rotate(180deg)'
    },
    login: {
        maxWidth: '150px',
        color: theme.palette.background.paper,
        textTransform: 'none',
        fontWeight: 'bold'
    },
    title: {
        ...SHARED_STYLE(theme).title,
        color: theme.palette.primary.main
    }
})

interface Props extends RouteComponentProps<any> {
    readonly loading: boolean
    readonly success: boolean
    readonly themeMode: ThemeMode

    forgotRequest(email: string): void

    forgotReset(): void
}

type JoinProps = Props & WithTranslation & WithStyles<any>

class Forgot extends Component<JoinProps> {

    constructor(props: JoinProps) {
        super(props)
        /* Bind Context */
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    public componentWillUnmount(): void {
        this.props.forgotReset()
    }

    public render() {
        const {
            t,
            classes,
            loading,
            history,
            success,
            themeMode
        } = this.props
        const THEME = createTheme({
            ...CONFIG_THEME[themeMode],
            palette: {
                ...CONFIG_THEME[themeMode].palette,
                primary: { main: '#FFFFFF' },
                error: { main: '#FFFFFF' },
                white: { main: '#FFFFFF' },
                text: { primary: '#FFFFFF', secondary: '#FFFFFF' }
            }
        })

        return <AuthWrapper
            title={t('AUTH.FORGOT.HELMET')}
            className={classes.container}
            splashContent={classes.splashContent}
            splash={classes.splash}
            svgOptions={{ width: 360, height: 270, scale: 5 }}
            themeMode={themeMode}>

            {
                success ?
                    <React.Fragment>
                        <Box
                            display="flex"
                            justifyContent="center"
                            flexDirection="column"
                            p={1}>
                            <Typography
                                id="success_title"
                                variant="h6"
                                className={clsx(classes.successCommon, classes.successTitleColor)}>
                                {t('AUTH.FORGOT.SUCCESS.TITLE')}
                            </Typography>

                            <Typography
                                id="success_message"
                                className={clsx(classes.successCommon, classes.successMessageColor)}>
                                {t('AUTH.FORGOT.SUCCESS.MESSAGE')}
                            </Typography>
                        </Box>

                        <Box display="flex" justifyContent="center" p={1}>
                            <FormControl className={classes.formControl}>
                                <Button
                                    id="btn_understood"
                                    type="button"
                                    variant="contained"
                                    size="medium"
                                    color="primary"
                                    className={classes.button}
                                    onClick={() => history.push('/login')}>
                                    {t('AUTH.FORGOT.UNDERSTOOD')}
                                </Button>

                            </FormControl>
                        </Box>

                    </React.Fragment>
                    :
                    <React.Fragment>
                        <Box
                            display="flex"
                            justifyContent="center"
                            p={1}>
                            <Typography
                                variant="h6"
                                className={classes.title}
                                noWrap={true}>
                                {t('AUTH.FORGOT.TITLE')}
                            </Typography>
                        </Box>

                        <Formik
                            initialValues={{ email: '' }}
                            onSubmit={this.handleSubmit}
                            validationSchema={ForgotValidator.validationScheme}
                            validateOnMount={true}>
                            {({ isValid, errors, touched }) => (
                                <Form className={classes.form} id="form_forgot">

                                    <ThemeProvider theme={THEME}>
                                        <Field id="email" name="email" type="customField">
                                            {({ field, form: { setFieldValue, setFieldTouched } }) => (
                                                <Box display="flex" justifyContent="center" p={1}>
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
                                                            autoFocus={true}
                                                            value={field.value}
                                                            className={classes.border}
                                                            onChange={
                                                                (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                                                                    setFieldValue('email', e.target.value)
                                                                }
                                                            }
                                                            onBlur={() => setFieldTouched('email', true, true)}
                                                        />
                                                        <FormErrorMessage name="email"/>
                                                    </FormControl>
                                                </Box>
                                            )}
                                        </Field>
                                    </ThemeProvider>

                                    <Box display="flex" justifyContent="center" p={1}>
                                        <FormControl className={classes.formControl}>
                                            <Button
                                                id="btn_recover"
                                                type="submit"
                                                variant="contained"
                                                size="medium"
                                                color="primary"
                                                className={classes.button}
                                                disabled={!isValid || loading}>
                                                {t('AUTH.FORGOT.RECOVER')}
                                            </Button>

                                            {
                                                loading &&
                                                <CircularProgress id="loading_recover" size={24}
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
                            p={4}>

                            <Button
                                id="btn_back_login"
                                size="small"
                                className={classes.login}
                                onClick={() => history.push('/login')}>
                                {t('AUTH.FORGOT.BACK_LOGIN')}
                            </Button>

                        </Box>
                    </React.Fragment>

            }
        </AuthWrapper>

    }

    private handleSubmit(values): void {
        const { email } = values
        this.props.forgotRequest(email)
    }
}

const forgotWithTranslation = withTranslation()(Forgot)

const forgotWithStyle = withStyles<any>(Style, { withTheme: true })(forgotWithTranslation)

const mapStateToProps = (state: IApplicationState) => ({
    loading: state.auth.forgot.loading,
    success: state.auth.forgot.success,
    themeMode: state.layout.themeMode
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(LoginActions, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(forgotWithStyle))
