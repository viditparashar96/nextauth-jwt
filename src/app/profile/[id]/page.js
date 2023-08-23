import React from 'react'

function page({ params }) {
    return (
        <div>
            <h3>Profile Page</h3>
            <h1 className='text-4xl font-bold'>hello there {params.id}!!</h1>

        </div>
    )
}

export default page