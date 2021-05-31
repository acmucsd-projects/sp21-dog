import React from 'react'
import CustomButton from '../../buttons/CustomButton'
import { useTempContext } from '../../../contexts/TempContext'
import { Typography } from '@material-ui/core'

export default function FilterForm({ keyName }) {
    const tempContext = useTempContext()

    const handleToggle = (i) => {
        let order = { ...tempContext.state[keyName].filter }
        const filter = Object.keys(tempContext.state[keyName].filter)

        order[filter[i]] = !order[filter[i]]
        order[filter[filter.length - 1]] = false

        tempContext.setState({
            ...tempContext.state,
            [keyName]: { ...tempContext.state[keyName], filter: order },
        })
    }

    const handleSelectAll = () => {
        let order = { ...tempContext.state[keyName].filter }
        order = Object.keys(order).reduce((acc, key) => {
            if (key === Object.keys(order)[Object.keys(order).length - 1]) {
                acc[key] = true
            } else {
                acc[key] = false
            }
            return acc
        }, {})

        tempContext.setState({
            ...tempContext.state,
            [keyName]: { ...tempContext.state[keyName], filter: order },
        })
    }

    return (
        <>
            <div style={{ display: 'flex' }}>
                <CustomButton
                    type="search"
                    selected={
                        tempContext.state[keyName].filter[
                            Object.keys(tempContext.state[keyName].filter)[0]
                        ]
                    }
                    onClick={() => handleToggle(0)}
                >
                    {Object.keys(tempContext.state[keyName].filter)[0]}
                </CustomButton>
                <CustomButton
                    type="search"
                    selected={
                        tempContext.state[keyName].filter[
                            Object.keys(tempContext.state[keyName].filter)[1]
                        ]
                    }
                    onClick={() => handleToggle(1)}
                >
                    {Object.keys(tempContext.state[keyName].filter)[1]}
                </CustomButton>
            </div>
            <div style={{ display: 'flex' }}>
                <CustomButton
                    type="search"
                    selected={
                        tempContext.state[keyName].filter[
                            Object.keys(tempContext.state[keyName].filter)[2]
                        ]
                    }
                    onClick={() => handleToggle(2)}
                >
                    {Object.keys(tempContext.state[keyName].filter)[2]}
                </CustomButton>
                <CustomButton
                    type="search"
                    selected={
                        tempContext.state[keyName].filter[
                            Object.keys(tempContext.state[keyName].filter)[3]
                        ]
                    }
                    onClick={() => handleToggle(3)}
                >
                    {Object.keys(tempContext.state[keyName].filter)[3]}
                </CustomButton>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <CustomButton
                    type="search"
                    halfWidth={true}
                    selected={
                        tempContext.state[keyName].filter[
                            Object.keys(tempContext.state[keyName].filter)[4]
                        ]
                    }
                    onClick={() => {
                        handleSelectAll()
                    }}
                >
                    {Object.keys(tempContext.state[keyName].filter)[4]}
                </CustomButton>
            </div>
            <Typography style={{ textAlign: 'center', color: 'gray' }}>
                (View Only)
            </Typography>
        </>
    )
}
