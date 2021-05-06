import CustomButton from '../CustomButton'

export default function SortForm() {
    return (
        <>
            <div style={{ display: 'flex' }}>
                <CustomButton type="search" selected={true}>
                    Type
                </CustomButton>
                <CustomButton type="search">Points</CustomButton>
            </div>
            <div style={{ display: 'flex' }}>
                <CustomButton type="search">Distance</CustomButton>
                <CustomButton type="search">Name</CustomButton>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <CustomButton type="search" halfWidth={true}>
                    Ascending
                </CustomButton>
            </div>
        </>
    )
}
