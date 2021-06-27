import React, { useEffect, useState } from 'react';

export default function TodayDate(props) {

    const [intervalTime, setIntervalTime] = useState()

    const date = new Date(new Date().toLocaleString('en-US', { timeZone: props.TimeZone }));

    const Year = date.getFullYear();

    const Month = date.getMonth();
    const Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const Day = date.getDay();
    const Days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const NumDay = date.getDate();
    const FullYear = `${Days[Day]} ${Months[Month]} ${NumDay} ${Year}`;

    const Hours = date.getHours();
    const Minutes = date.getMinutes();
    const Seconds = date.getSeconds();

    let Time = `${Hours}:${Minutes}:${Seconds}`;

    if (Hours < 10) {
        if (Minutes < 10) {
            if (Seconds < 10) {
                Time = `0${Hours}:0${Minutes}:0${Seconds}`;
            } else {
                Time = `0${Hours}:0${Minutes}:${Seconds}`;
            }
        } else {
            if (Seconds < 10) {
                Time = `0${Hours}:${Minutes}:0${Seconds}`;
            } else {
                Time = `0${Hours}:${Minutes}:${Seconds}`;
            }
        }
    } else {
        if (Minutes < 10) {
            if (Seconds < 10) {
                Time = `${Hours}:0${Minutes}:0${Seconds}`;
            } else {
                Time = `${Hours}:0${Minutes}:${Seconds}`;
            }
        } else {
            if (Seconds < 10) {
                Time = `${Hours}:${Minutes}:0${Seconds}`;
            } else {
                Time = `${Hours}:${Minutes}:${Seconds}`;
            }
        }
    }

    useEffect(() => {
        const interval = setInterval(() => setIntervalTime(Time), 1000);
        return () => clearInterval(interval)
    })

    return (
        <React.Fragment>
            <p className='FullYear'>{FullYear}</p>
            <p className='Time'>{intervalTime}</p>
        </React.Fragment>
    )
};