import React, { PureComponent } from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'
import { Color } from '../helpers/Color'

const data = [
    {
        name: 'Sun',
        community: 40,
        knowledge: 24,
        nature: 24,
        fitness: 10,
    },
    {
        name: 'Mon',
        community: 30,
        knowledge: 13,
        nature: 22,
        fitness: 10,
    },
    {
        name: 'Tu',
        community: 20,
        knowledge: 38,
        nature: 22,
        fitness: 10,
    },
    {
        name: 'Wed',
        community: 27,
        knowledge: 39,
        nature: 20,
        fitness: 10,
    },
    {
        name: 'Th',
        community: 18,
        knowledge: 28,
        nature: 21,
        fitness: 10,
    },
    {
        name: 'Fri',
        community: 23,
        knowledge: 38,
        nature: 25,
        fitness: 10,
    },
    {
        name: 'Sat',
        community: 34,
        knowledge: 43,
        nature: 21,
        fitness: 10,
    },
]

export default class StreaksChart extends PureComponent {
    static demoUrl = 'https://codesandbox.io/s/simple-line-chart-kec3v'

    render() {
        return (
            <>
                <h4 style={{ textAlign: 'center' }}>Last Week: Task Points</h4>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="community"
                            stroke={Color.community}
                            dot={false}
                        />
                        <Line
                            type="monotone"
                            dataKey="knowledge"
                            stroke={Color.knowledge}
                            dot={false}
                        />
                        <Line
                            type="monotone"
                            dataKey="nature"
                            stroke={Color.nature}
                            dot={false}
                        />
                        <Line
                            type="monotone"
                            dataKey="fitness"
                            stroke={Color.fitness}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </>
        )
    }
}
