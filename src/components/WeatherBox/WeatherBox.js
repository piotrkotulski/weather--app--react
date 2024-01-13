import React, { useCallback, useState } from 'react';
import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import ErrorBox from "../ErrorBox/ErrorBox";

const WeatherBox = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleCityChange = useCallback((city) => {
        setIsLoading(true);
        setError(false);

        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2b11628243cb057a7d353a47bed92f99&units=metric`)
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    setError(true);
                    setIsLoading(false);
                    return null;
                }
            })
            .then(data => {
                if (data) {
                    const formattedWeatherData = {
                        city: data.name,
                        temp: data.main.temp,
                        icon: data.weather[0].icon,
                        description: data.weather[0].main
                    };
                    setWeatherData(formattedWeatherData);
                }
                setIsLoading(false);
            });
    }, []);

    return (
        <section>
            <PickCity onSubmit={handleCityChange}/>
            {error && <ErrorBox />}
            {!isLoading && !error && weatherData && <WeatherSummary data={weatherData}/>}
            {isLoading && <Loader/>}
        </section>
    );
};

export default WeatherBox;