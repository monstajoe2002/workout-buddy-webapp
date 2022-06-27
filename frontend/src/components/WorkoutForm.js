import React, { useState } from 'react'

export default function WorkoutForm() {
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const handleSubmit=async (e)=>{
        e.preventDefault() //prevents page referesh after submitting form details
        const workout={title,load,reps} //create workout object
        const response=await fetch('/api/workouts',{
            method: 'POST',
            body: JSON.stringify(workout),
            headers:{
                'Content-Type': 'application/json'
            }
        }) //make a POST request and convert the workout object into a string
        const json=await response.json() //await a response from the backend
        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            console.log('New workout added',json)
        }
    }
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>
            <label>Exercise Title:</label>
            <input
                type="text"
                onChange={(e) => { setTitle(e.target.value) }}
                value={title}
            />
            <label>Load (kg):</label>
            <input
                type="number"
                onChange={(e) => { setLoad(e.target.value) }}
                value={load}
            />
            <label>Reps:</label>
            <input
                type="number"
                onChange={(e) => { setReps(e.target.value) }}
                value={reps}
            />
            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}
