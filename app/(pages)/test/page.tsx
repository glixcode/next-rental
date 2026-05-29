"use client"
import { useState } from "react"
import TestForm from "./test-form"
import { TestContext } from "./test-context"

const page = () => {
    const [name, setName] = useState("")
  return (
    <div>
        <TestContext.Provider value={{state:name, setState:setName}}>
            <h1>Test Page {name}</h1>
            <TestForm/>
        </TestContext.Provider>
    </div>
  )
}

export default page