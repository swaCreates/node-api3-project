import React from 'react'

export default function UserInfo({info}) {
    return (
        <div className='info-container'>
            <div>
                <p>Character Name: {info.name}</p>
            </div>
        </div>
    )
}
