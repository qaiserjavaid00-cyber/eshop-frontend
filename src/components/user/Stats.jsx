import React from 'react'
import UserStats from './UserStats';

const Stats = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">My Stats</h1>
            <UserStats />
        </div>
    );
}

export default Stats