export function updateTrainPositions(trains, stations) {
  return trains.map((train) => {
    const currentStation = stations.find((s) => s.id === train.currentStationId)
    if (!currentStation) return train

    const currentIndex = stations.findIndex((s) => s.id === train.currentStationId)
    let nextIndex

    if (train.direction === "south") {
      nextIndex = currentIndex + 1 >= stations.length ? 0 : currentIndex + 1
    } else {
      nextIndex = currentIndex - 1 < 0 ? stations.length - 1 : currentIndex - 1
    }

    const nextStation = stations[nextIndex]
    if (!nextStation) return train

    // Calculate movement towards next station
    const latDiff = nextStation.lat - train.lat
    const lonDiff = nextStation.lon - train.lon
    const distance = Math.sqrt(latDiff * latDiff + lonDiff * lonDiff)

    // If close to next station, move to it
    if (distance < 0.001) {
      return {
        ...train,
        currentStationId: nextStation.id,
        lat: nextStation.lat,
        lon: nextStation.lon,
      }
    }

    // Move towards next station
    const moveSpeed = 0.0002 // Adjust speed as needed
    const moveRatio = moveSpeed / distance

    return {
      ...train,
      lat: train.lat + latDiff * moveRatio,
      lon: train.lon + lonDiff * moveRatio,
    }
  })
}

export function generateCrowdLevels(stations) {
  const crowdLevels = {}
  stations.forEach((station) => {
    // Generate random crowd levels between 10-95%
    crowdLevels[station.id] = Math.floor(Math.random() * 85) + 10
  })
  return crowdLevels
}
