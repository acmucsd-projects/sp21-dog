import React from 'react'
import {
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    Radar,
    ResponsiveContainer,
} from 'recharts'
import { Color } from '../../helpers/Color'

export default function StatsChart({ stats }) {
    const data = [
        {
            subject: 'Community',
            A: stats.community,
            fullMark: 200,
        },
        {
            subject: 'Knowledge',
            A: stats.knowledge,
            fullMark: 200,
        },
        {
            subject: 'Nature',
            A: stats.nature,
            fullMark: 200,
        },
        {
            subject: 'Fitness',
            A: stats.fitness,
            fullMark: 200,
        },
    ]

    let imgSrc = null
    function customTick({ payload, x, y }) {
        let xOffset = 0
        let yOffset = 0

        if (payload.value === 'Community') {
            imgSrc = './icons/community.svg'
            yOffset = -10
        } else if (payload.value === 'Knowledge') {
            imgSrc = './icons/knowledge.svg'
            xOffset = 10
        } else if (payload.value === 'Nature') {
            imgSrc = './icons/nature.svg'
            yOffset = 10
        } else if (payload.value === 'Fitness') {
            imgSrc = './icons/fitness.svg'
            xOffset = -10
        }

        return (
            <image
                x={x + xOffset - 15}
                y={y + yOffset - 15}
                width={30}
                height={30}
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
