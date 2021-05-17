import React from 'react'
import {
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    Radar,
    ResponsiveContainer,
} from 'recharts'
import { Color } from '../../helpers/Color'

const data = [
    {
        subject: 'Community',
        A: 120,
        B: 110,
        fullMark: 150,
    },
    {
        subject: 'Knowledge',
        A: 57,
        B: 130,
        fullMark: 150,
    },
    {
        subject: 'Nature',
        A: 100,
        B: 130,
        fullMark: 150,
    },
    {
        subject: 'Fitness',
        A: 98,
        B: 100,
        fullMark: 150,
    },
]

export default function StatsChart() {
    let imgSrc = null
    function customTick({ payload, x, y }) {
        let xOffset = 0
        let yOffset = 0

        if (payload.value === 'Community') {
            imgSrc = './icons/community.svg'
            yOffset = -(window.innerHeight * 0.04076086957) / 3
        } else if (payload.value === 'Knowledge') {
            imgSrc = './icons/knowledge.svg'
            xOffset = (window.innerWidth * 0.07246376812) / 3
        } else if (payload.value === 'Nature') {
            imgSrc = './icons/nature.svg'
            yOffset = (window.innerHeight * 0.04076086957) / 3
        } else if (payload.value === 'Fitness') {
            imgSrc = './icons/fitness.svg'
            xOffset = -(window.innerWidth * 0.07246376812) / 3
        }

        return (
            <image
                x={x + xOffset - (window.innerHeight * 0.04076086957) / 2}
                y={y + yOffset - (window.innerHeight * 0.04076086957) / 2}
                width={'4.076086957vh'}
                height={'4.076086957vh'}
                href={imgSrc}
            ></image>
        )
    }

    return (
        <ResponsiveContainer>
            <RadarChart
                cx={'50%'}
                cy={'50%'}
                outerRadius={'60%'}
                width={'100%'}
                height={'100%'}
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
        </ResponsiveContainer>
    )
}
