import { useState, useEffect } from 'react'

const Stopwatch = () => {
    const [time, setTime] = useState({
        minutes: 0,
        seconds: 0,
        centiseconds: 0,
    })
    const [running, setRunning] = useState(false)
    const [laps, setLaps] = useState([])

    useEffect(() => {
        let interval
        if (running) {
            interval = setInterval(() => {
                setTime((prevTime) => {
                    let { minutes, seconds, centiseconds } = prevTime
                    centiseconds += 1
                    if (centiseconds === 100) {
                        centiseconds = 0
                        seconds += 1
                    }
                    if (seconds === 60) {
                        seconds = 0
                        minutes += 1
                    }
                    return { minutes, seconds, centiseconds }
                })
            }, 10)
        }
        return () => clearInterval(interval)
    }, [running])

    const handleStartPauseResume = () => {
        setRunning((prevRunning) => !prevRunning)
    }

    const handleReset = () => {
        setRunning(false)
        setTime({ minutes: 0, seconds: 0, centiseconds: 0 })
        setLaps([])
    }

    const handleLap = () => {
        setLaps((prevLaps) => [
            ...prevLaps,
            `${formatTime(time.minutes)}:${formatTime(
                time.seconds
            )}:${formatTime(time.centiseconds)}`,
        ])
    }

    const formatTime = (value) => value.toString().padStart(2, '0')

    return (
        <div className="relative flex flex-col items-center justify-start bg-gray-100 text-gray-900 mt-16">
            <div className="absolute inset-0 bg-gray-200 opacity-25 pointer-events-none"></div>
            <h1 className="text-4xl font-bold mb-6">Stopwatch</h1>
            <div className="text-6xl font-mono mb-4">
                {formatTime(time.minutes)}:{formatTime(time.seconds)}:
                {formatTime(time.centiseconds)}
            </div>
            {laps.length > 0 && (
                <div className="text-2xl text-orange-700 font-bold text-right mb-4">
                    Last Lap: {laps[laps.length - 1]}
                </div>
            )}
            <div className="flex space-x-4 mb-6">
                <button
                    onClick={handleStartPauseResume}
                    className={`py-2 px-4 rounded font-bold text-white ${
                        running
                            ? 'bg-green-500 hover:bg-green-600'
                            : time.minutes === 0 &&
                              time.seconds === 0 &&
                              time.centiseconds === 0
                            ? 'bg-green-500 hover:bg-green-600'
                            : 'bg-yellow-500 hover:bg-yellow-600'
                    }`}
                    disabled={false} // Always enabled
                >
                    {running
                        ? 'PAUSE'
                        : time.minutes === 0 &&
                          time.seconds === 0 &&
                          time.centiseconds === 0
                        ? 'START'
                        : 'RESUME'}
                </button>

                <button
                    onClick={handleReset}
                    className="py-2 px-4 rounded font-bold bg-red-500 hover:bg-red-600 text-white"
                >
                    RESET
                </button>
                <button
                    onClick={handleLap}
                    disabled={!running}
                    className="py-2 px-4 rounded font-bold bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50"
                >
                    LAP
                </button>
            </div>
            <div className="w-full max-w-md mx-auto">
                <ul className="list-inside space-y-2">
                    {laps.map((lap, index) => (
                        <li
                            key={index}
                            className="text-lg text-cyan-800 font-bold text-center"
                        >
                            Lap {index + 1}: {lap}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Stopwatch
