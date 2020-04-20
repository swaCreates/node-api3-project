import React from 'react';
import UserInfo from './UserInfo';


export default function Users({users}){
    return(
        <div className='user-container'>
            <div>
                {users.map(user => {
                    return <UserInfo key={user.id} info={user}/>
                })}
            </div>
        </div>
    )
}