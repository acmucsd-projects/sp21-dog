import CustomButton from '../../buttons/CustomButton'
import { useTempContext } from '../../../contexts/TempContext'
import { Typography } from '@material-ui/core'

export default function SortForm({ keyName }) {
    const tempContext = useTempContext()
    const options = ['type', 'points', 'distance', 'name']

    const handleItemsToggle = (i) => {
        tempContext.setState({
            ...tempContext.state,
            [keyName]: {
                ...tempContext.state[keyName],
                sort: {
                    ...tempContext.state[keyName].sort,
                    sortBy: options[i],
                },
            },
        })
    }

    const handleAscendingToggle = () => {
        tempContext.setState({
            ...tempContext.state,
            [keyName]: {
                ...tempContext.state[keyName],
                sort: {
                    ...tempContext.state[keyName].sort,
                    ascending: !tempContext.state[keyName].sort.ascending,
                },
            },
        })
    }

    return (
        <>
            <div style={{ display: 'flex' }}>
                <CustomButton
                    type="search"
                    selected={
                        options[0] === tempContext.state[keyName].sort.sortBy
                    }
                    onClick={() => {
                        handleItemsToggle(0)
                    }}
                >
                    {options[0]}
                </CustomButton>
                <CustomButton
                    type="search"
                    selected={
                        options[1] === tempContext.state[keyName].sort.sortBy
                    }
                    onClick={() => {
                        handleItemsToggle(1)
                    }}
                >
                    {options[1]}
                </CustomButton>
            </div>
            <div style={{ display: 'flex' }}>
                <CustomButton
                    type="search"
                    selected={
                        options[2] === tempContext.state[keyName].sort.sortBy
                    }
                    onClick={() => {
                        handleItemsToggle(2)
                    }}
                >
                    {options[2]}
                </CustomButton>
                <CustomButton
                    type="search"
                    selected={
                        options[3] === tempContext.state[keyName].sort.sortBy
                    }
                    onClick={() => {
                        handleItemsToggle(3)
                    }}
                >
                    {options[3]}
                </CustomButton>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <CustomButton
                    type="search"
                    halfWidth={true}
                    selected={tempContext.state[keyName].sort.ascending}
                    onClick={() => {
                        handleAscendingToggle()
                    }}
                >
                    ascending
                </CustomButton>
            </div>
            <Typography style={{ textAlign: 'center', color: 'gray' }}>
                (View Only)
            </Typography>
        </>
    )
}
