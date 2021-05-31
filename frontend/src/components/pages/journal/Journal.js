import { Typography } from '@material-ui/core'
import React from 'react'
import { Color } from '../../../helpers/Color'
import StreaksChart from '../../charts/StreaksChart'

export default function Journal() {
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    padding: '4.347826086%',
                    flexDirection: 'column',
                }}
            >
                <div
                    style={{
                        height: '45%',
                        flex: 1,
                    }}
                >
                {/*<h3
                        style={{
                            fontSize: '2.54076087vh',
                            margin: '0.5434682609vh',
                        }}
                    >
                        Streaks
                    </h3>
                </div>
                <img
                    style={{
                        flex: 1,
                        width: '4.076086957vh',
                        height: '4.076086957vh',
                    }}
                    src="./icons/community.svg"
                    alt="community stat icon"
                />
                <img
                    style={{
                        flex: 1,
                        width: '4.076086957vh',
                        height: '4.076086957vh',
                    }}
                    src="./icons/knowledge.svg"
                    alt="knowledge stat icon"
                />
                <img
                    style={{
                        flex: 1,
                        width: '4.076086957vh',
                        height: '4.076086957vh',
                    }}
                    src="./icons/nature.svg"
                    alt="knowledge nature icon"
                />
                <img
                    style={{
                        flex: 1,
                        width: '4.076086957vh',
                        height: '4.076086957vh',
                    }}
                    src="./icons/fitness.svg"
                    alt="fitness stat icon"
                />
            </div>
            <div
                style={{
                    backgroundColor: Color.accent,
                    borderRadius: '10px',
                    marginBottom: '1.086956522vh',
                }}
            >*/}

                    <StreaksChart />
                </div>
                <hr style={{ margin: '5% 0' }} />
                <div
                    style={{
                        display: 'flex',
                        marginBottom: '8px',
                    }}
                ></div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        textAlign: 'center',
                        margin: '10px 0',
                    }}
                >
                    <div
                        style={{
                            borderRadius: '10px 0 0 0',
                            flex: 1,
                        }}
                    >
                        <h3
                            style={{
                                fontSize: '2.54076087vh',
                                margin: '0.5434682609vh',
                            }}
                        >
                            Streaks
                        </h3>
                    </div>
                 {/*<p style={{ fontSize: '2.173913043vh', flex: 1 }}>None</p>
                    <p style={{ fontSize: '2.173913043vh', flex: 1 }}>6 days</p>
                    <p style={{ fontSize: '2.173913043vh', flex: 1 }}>
                        28 days
                    </p>
                    <p style={{ fontSize: '2.173913043vh', flex: 1 }}>
                        31 days
                    </p>*/}
                    <img
                        style={{ flex: 1, width: '30px', height: '30px' }}
                        src="./icons/community.svg"
                        alt="community stat icon"
                    />
                    <img
                        style={{ flex: 1, width: '30px', height: '30px' }}
                        src="./icons/knowledge.svg"
                        alt="knowledge stat icon"
                    />
                    <img
                        style={{ flex: 1, width: '30px', height: '30px' }}
                        src="./icons/nature.svg"
                        alt="knowledge nature icon"
                    />
                    <img
                        style={{ flex: 1, width: '30px', height: '30px' }}
                        src="./icons/fitness.svg"
                        alt="fitness stat icon"
                    />
                </div>
                <div
                    style={{
                        backgroundColor: Color.accent,
                        borderRadius: '10px',
                        marginBottom: '8px',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <div
                            style={{
                                fontSize: '2.54076087vh',
                                margin: '0.5434682609vh',
                                backgroundColor: Color.selection,
                                borderRadius: '10px 0 0 0',
                                flex: 1,
                            }}
                        >
                            <h3
                                style={{
                                    margin: '4px',
                                }}
                            >
                                Current
                            </h3>
                        </div>
                        <p style={{ flex: 1 }}>None</p>
                        <p style={{ flex: 1 }}>6 days</p>
                        <p style={{ flex: 1 }}>28 days</p>
                        <p style={{ flex: 1 }}>31 days</p>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            textAlign: 'center',
                            borderRadius: '10px 0 10px 0',
                            backgroundColor: Color.lightYellow,
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: Color.yellow,
                                borderRadius: '0 0 0 10px',
                                flex: 1,
                            }}
                        >
                            <h3
                                style={{
                                    margin: '4px',
                                }}
                            >
                                Best
                            </h3>
                        </div>
                        <p style={{ flex: 1 }}>3 days</p>
                        <p style={{ flex: 1 }}>12 days</p>
                        <p style={{ flex: 1 }}>29 days</p>
                        <p style={{ flex: 1 }}>31 days</p>
                    </div>
                    /*<p style={{ fontSize: '2.173913043vh', flex: 1 }}>3 days</p>
                    <p style={{ fontSize: '2.173913043vh', flex: 1 }}>
                        12 days
                    </p>
                    <p style={{ fontSize: '2.173913043vh', flex: 1 }}>
                        29 days
                    </p>
                    <p style={{ fontSize: '2.173913043vh', flex: 1 }}>
                        31 days
                    </p>*/
                </div>
                <p style={{ fontSize: '14px', textAlign: 'center' }}>
                    Complete tasks on consecutive days increase your streaks!
                </p>
            </div>
            /*<p style={{ fontSize: '1.902173913vh', textAlign: 'center' }}>
                Complete tasks on consecutive days increase your streaks!
            </p>*/
            <Typography
                style={{
                    textAlign: 'center',
                    color: 'gray',
                    marginBottom: '3%',
                }}
            >
                (View Only)
            </Typography>
        </div>
    )
}
