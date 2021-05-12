import React from 'react'
import { useAppContext } from '../../../contexts/AppContext'
import { Color } from '../../../helpers/Color'
import StreaksChart from '../../charts/StreaksChart'
import Searchbar from '../../navs/Searchbar'

export default function Journal() {
    const context = useAppContext()

    return (
        <div
            style={{
                width: '100%',
                //padding: '4.347826086%',
                flexDirection: 'column',
            }}
        >
            {context.state.desktopView && <Searchbar />}
            <div
                style={{
                    height: '45%',
                    flex: 1,
                }}
            >
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
                            margin: '4px',
                        }}
                    >
                        Streaks
                    </h3>
                </div>
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
            </div>
            <p style={{ fontSize: '14px', textAlign: 'center' }}>
                Complete tasks on consecutive days increase your streaks!
            </p>
        </div>
    )
}
