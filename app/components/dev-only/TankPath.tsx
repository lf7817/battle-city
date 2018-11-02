import { Map as IMap } from 'immutable'
import React from 'react'
import { useRedux } from '../../ReduxContext'

let TankPath: any = () => null as any

if (DEV.TANK_PATH) {
  const colorList = ['aqua', 'red', 'yellow', 'coral', 'white']
  let nextColorIndex = 0
  const colorMap = new Map()
  function getColor(name: string) {
    if (!colorMap.has(name)) {
      colorMap.set(name, colorList[nextColorIndex++ % colorList.length])
    }
    return colorMap.get(name)
  }

  TankPath = () => {
    const [{ devOnly }] = useRedux()
    const { pathmap } = devOnly.toObject()

    const pointsMap: IMap<string, string> = pathmap.map((path: number[]) => {
      return path
        .map(t => {
          const row = Math.floor(t / 26)
          const col = t % 26
          return `${col * 8},${row * 8}`
        })
        .join(' ')
    })

    return (
      <g className="tank-path">
        {pointsMap
          .map((points, playerName) => (
            <polyline
              key={playerName}
              points={points}
              fill="none"
              strokeWidth="3"
              stroke={getColor(playerName)}
              strokeOpacity="0.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))
          .toArray()}
      </g>
    )
  }
}

export default TankPath
