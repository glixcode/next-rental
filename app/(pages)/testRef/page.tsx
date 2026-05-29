'use client'
import { useRef, useState } from 'react'

const TestRef = () => {
  const ref = useRef(0)
  const [state, setState] = useState(0)
  const [mockData, setMockData] = useState([1, 2, 3,4, 5,6]);

  const handleIncrement = () => {
    setState(state + 1)
    ref.current++
    console.log({ref: ref.current, state})
  }
  const filteredMockData = mockData.filter((item) => item == state);
  return (
    <div>
        <h1>{state}</h1>
        {
          filteredMockData.map((item) => (
            <p key={item}>{item}</p>
          ))
        }
        <button className='rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-emerald-400' onClick={handleIncrement}>Increment</button>
    </div>
  )
}

export default TestRef