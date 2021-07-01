import React, { useEffect, useState } from 'react';
import TodayDate from './TodayDate';

/*

TODO:

*Need to work about the style of description. DONE
*Add local time anywhere on its own. DONE
*Add current location. DONE

*/

export default function Weather() {

    const [weather, setWeather] = useState({
        City: '',
        Temp: '',
        Icon: '',
        Description: ''
    })

    const API_key = '54e8c800c54c301b5358c368e7df9d49';
    const lang = 'en';

    const [timeZone, setTimeZone] = useState();

    const [locationAPI, setLocationAPI] = useState(`https://api.openweathermap.org/data/2.5/weather?lat=${31.771959}&lon=${35.217018}&appid=${API_key}&lang=${lang}`);

    const [todayDateCondition, setTodayDateCondition] = useState();

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position.coords)
                setLocationAPI(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_key}&lang=${lang}`);
            })
        } else {
            console.log(`This browser don't support geolocation`);
        }
    }, []);

    useEffect(
        () => {   // Returns the weather.
            fetch(locationAPI)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=current&appid=${API_key}`)
                        .then((response) => response.json())
                        .then((data2) => {
                            setTimeZone(data2.timezone)
                        })
                    setWeather({
                        City: data.name,
                        Temp: `${Math.floor(data.main.temp - 273.15)}°C`,
                        Icon: <img className='Icon' src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt={data.weather[0].icon} />,
                        Description: data.weather[0].description
                    })
                    setTodayDateCondition(true)
                    console.log(data)
                })
                .catch((data) => {
                    setWeather({
                        City: 'Not Found',
                    })
                    setTodayDateCondition(false)
                    throw data
                })
        }, [locationAPI]);

    return (
        <React.Fragment>
            <input type='text' className='InputSearch' placeholder='Search...' onKeyPress={e => {
                if (e.key === 'Enter') {
                    setLocationAPI(`https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&lang=${lang}&appid=${API_key}&lang=${lang}`)
                }
            }} />
            <p className='CityName'>{weather.City}</p>
            {todayDateCondition && <TodayDate TimeZone={timeZone} />}
            <p className='Description'>{weather.Description}</p>
            <div className='TempAndIcon'>
                <p className='Temp'>{weather.Temp}</p>
                {weather.Icon}
            </div>
        </React.Fragment >
    )
};
