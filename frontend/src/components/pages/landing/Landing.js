import { Color } from '../../../helpers/Color'
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { objToFormData } from '../../../helpers/Utils'

const useStyles = makeStyles({
    top: {
        width: '100%',
        height: '43.49919743%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url(/Map.png)',
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
        height: '49.44648446%',
    },
    bold: {
        fontSize: '36px',
        margin: '0 2px;',
        fontFamily: 'Oswald',
        fontWeight: 'normal',
    },
    bolder: {
        fontSize: '36px',
        margin: '0 3px;',
        fontFamily: 'Oswald',
    },
    desc: {
        margin: '5px 5px',
        fontFamily: 'Oswald',
        fontSize: '18px',
    },
    paragraph: {
        margin: '15px 0',
        fontWeight: 'bold',
        fontSize: '18px',
    },
})

export default function Landing() {
    const classes = useStyles()

    return (
        <div style={{ width: '100%' }}>
            <div className={classes.top}>
                <img className={classes.logo} src="/logo.svg"></img>
                <div className={classes.container}>
                    <h1 className={classes.bold}>Taskathon</h1>
                    <h1 className={classes.bolder}>Go!</h1>
                </div>
                <p className={classes.desc}>
                    Exploring the world, one task at a time.
                </p>
            </div>
            <div className={classes.bottom}>
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
            </div>
        </div>
    )
}
