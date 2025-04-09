// @ts-ignore
import React from 'react';

export default function AppointmentForm() {
    return (
        <form>
            <h2>Appointment Form (TODO)</h2>
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