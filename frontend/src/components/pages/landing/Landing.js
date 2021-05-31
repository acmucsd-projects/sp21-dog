import { Color } from '../../../helpers/Color'
import { useState } from 'react'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import { useTempContext } from '../../../contexts/TempContext'
import { Page } from '../../../helpers/Page'
import CustomDialog from '../../modals/CustomDialog'
import { makeStyles } from '@material-ui/core/styles'
import CustomButton from '../../buttons/CustomButton'
import { objToFormData } from '../../../helpers/Utils'

const useStyles = makeStyles({
    top: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url(/Map.png)',
        backgroundSize: 'cover',
        backgroundColor: Color.coreTheme,
        color: 'white',
    },
    bottom: {
        boxShadow:
            '0px -2px 4px -1px rgb(0 0 0 / 20%),' +
            '0px -4px 5px 0px rgb(0 0 0 / 14%), 0px -1px 10px 0px rgb(0 0 0 / 12%)',
        padding: '14px',
    },
    container: {
        display: 'flex',
    },
    logo: {
        height: '18.20652174vh',
    },
    bold: {
        fontSize: '4.891304348vh',
        margin: '0 2px;',
        fontFamily: 'Oswald',
        fontWeight: 'normal',
    },
    bolder: {
        fontSize: '4.891304348vh',
        margin: '0 3px;',
        fontFamily: 'Oswald',
    },
    desc: {
        margin: '5px 5px',
        fontFamily: 'Oswald',
        fontSize: '2.445652714vh',
    },
    paragraph: {
        margin: '15px 0',
        fontWeight: 'bold',
        fontSize: '18px',
    },
})

export default function Landing() {
    const classes = useStyles()
    const tempContext = useTempContext()
    const [loginOpen, setLoginOpen] = useState(false)
    const [signupOpen, setSignupOpen] = useState(false)
    const [landingOpen, setLandingOpen] = useState(false)

    const customSetLoginSignupOpen = (open) => {
        setLoginOpen(!loginOpen)
        setSignupOpen(!signupOpen)
    }
    const confirmPasswordValidate = () => {
        console.log(tempContext.state)
        return tempContext.state.password === tempContext.state.confirmPassword
    }

    return (
        <div className={classes.top}>
            <CustomDialog
                type="login"
                open={loginOpen}
                setOpen={setLoginOpen}
                setSignupOpen={customSetLoginSignupOpen}
                nextPage={Page.home}
            />
            <CustomDialog
                type="landing"
                open={landingOpen}
                setOpen={setLandingOpen}
            />
            <CustomDialog
                type="signup"
                open={signupOpen}
                setOpen={setSignupOpen}
                setLoginOpen={customSetLoginSignupOpen}
                nextPage={Page.home}
                validate={confirmPasswordValidate}
                errorMessage="Passwords do not match"
            />
            <img className={classes.logo} src="/logo.svg"></img>
            <div className={classes.container}>
                <h1 className={classes.bold}>Taskathon</h1>
                <h1 className={classes.bolder}>Go!</h1>
            </div>
            <p className={classes.desc}>
                Exploring the world, one task at a time.
            </p>
            <CustomButton
                type="landing"
                variant="primary"
                onClick={() => {
                    // context.setState(Page.home)
                    setSignupOpen(true)
                }}
            >
                Sign Up
            </CustomButton>
            <CustomButton
                type="landing"
                variant="secondary"
                onClick={() => {
                    setLoginOpen(true)
                }}
            >
                Log In
            </CustomButton>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Oswald',
                    fontSize: '2.445652714vh',
                    position: 'fixed',
                    bottom: '2.038043478vh',
                    cursor: 'pointer',
                }}
                onClick={() => setLandingOpen(true)}
            >
                <ArrowForwardIosIcon
                    style={{
                        transform: 'rotate(-90deg) scaleY(2)',
                        fontSize: '2.445652714vh',
                        color: '#B7E1FF',
                    }}
                />
                What's Taskathon Go?
            </div>
            {/* <div className={classes.bottom}>
                <p className={classes.paragraph}>
                    Taskathon Go! is a brand new way to experience the world
                </p>
                <p className={classes.paragraph}>
                    Every day, there's a new set of tasks to explore in your
                    area. You can complete tasks by exercising outdoors,
                    partaking in community events, and visiting nearby shops and
                    restaurants.
                </p>
                <p className={classes.paragraph}>
                    Compete with your friends and other users. Top the worldwide
                    leaderboards and gain points for your profile!
                </p>
                <p className={classes.paragraph}>
                    Sign up to join the Taskathon family today!
                </p>
            </div> */}
        </div>
    )
}
