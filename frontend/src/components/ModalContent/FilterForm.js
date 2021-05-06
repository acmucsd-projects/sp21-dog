import CustomButton from '../CustomButton'

export default function FilterForm() {
    return (
        <>
            <div style={{ display: 'flex' }}>
                <CustomButton type="search" selected={true}>
                    Community
                </CustomButton>
                <CustomButton type="search">Knowledge</CustomButton>
            </div>
            <div style={{ display: 'flex' }}>
                <CustomButton type="search">Nature</CustomButton>
                <CustomButton type="search" selected={true}>
                    Fitness
                </CustomButton>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <CustomButton type="search" halfWidth={true}>
                    Show All
                </CustomButton>
            </div>
        </>
    )
}
