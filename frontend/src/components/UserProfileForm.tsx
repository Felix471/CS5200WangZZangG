// @ts-ignore
import React from 'react';

export default function UserProfileForm() {
    return (
        <form>
            <h2>User Profile Form (TODO)</h2>
            <div>
                <label htmlFor="username">Username: </label>
                <input type="text" id="username" />
            </div>
            <div>
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}