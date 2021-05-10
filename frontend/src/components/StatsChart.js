import {
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    Legend,
} from 'recharts'
import { Color } from '../helpers/Color'

const data = [
    {
        subject: 'Community',
        A: 120,
        B: 110,
        fullMark: 150,
    },
    {
        subject: 'Knowledge',
        A: 98,
        B: 130,
        fullMark: 150,
    },
    {
        subject: 'Nature',
        A: 86,
        B: 130,
        fullMark: 150,
    },
    {
        subject: 'Fitness',
        A: 99,
        B: 100,
        fullMark: 150,
    },
]

export default function Stats() {
    function customTick({ payload, x, y }) {
        let imgSrc = null
        let xOffset = 0
        let yOffset = 0
        let imgOffset = 0
        let pointsOffsetX = 0
        let pointsOffsetY = 0

        if (payload.value === 'Community') {
            imgSrc = './icons/community.svg'
            xOffset = -70
            yOffset = -90
            imgOffset = 45
            pointsOffsetX = 35
            pointsOffsetY = 30
        } else if (payload.value === 'Knowledge') {
            imgSrc = './icons/knowledge.svg'
            xOffset = 114
            yOffset = -200
            imgOffset = -75
            pointsOffsetX = -35
            pointsOffsetY = 30
        } else if (payload.value === 'Nature') {
            imgSrc = './icons/nature.svg'
            xOffset = -55
            yOffset = -140
            imgOffset = 30
            pointsOffsetX = 20
            pointsOffsetY = -30
        } else if (payload.value === 'Fitness') {
            imgSrc = './icons/fitness.svg'
            xOffset = 315
            yOffset = -32
            imgOffset = -60
            pointsOffsetX = -20
            pointsOffsetY = -30
        }

        return (
            <>
                <image
                    x={x + xOffset + imgOffset}
                    y={y + yOffset - 15}
                    width={30}
                    height={30}
                    transform="rotate(45, 100, 50)"
                    href={imgSrc}
                ></image>
                <text
                    x={x + xOffset}
                    y={y + yOffset}
                    text-anchor="middle"
                    transform="rotate(45, 100, 50)"
                >
                    {payload.value}
                </text>
                <text
                    x={x + xOffset + pointsOffsetX}
                    y={y + yOffset + pointsOffsetY}
                    text-anchor="middle"
                    transform="rotate(45, 100, 50)"
                >
                    17 Points
                </text>
            </>
        )
    }

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '300px',
                transform: 'rotateZ(-45deg)',
            }}
        >
            <RadarChart
                cx={200}
                cy={200}
                outerRadius={100}
                width={400}
                height={400}
                data={data}
            >
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={customTick} />
                <Radar
                    name="Stats"
                    dataKey="A"
                    stroke={Color.coreTheme}
                    fill={Color.coreTheme}
                    fillOpacity={1}
                />
            </RadarChart>
        </div>
    )
}
