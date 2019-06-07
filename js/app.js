import React from 'react';
import ReactDom from 'react-dom';

const changeTemperatureUnit = (temperature)=>{
    return (temperature - 273.15).toFixed(0)
};

const changeBackground = (weather)=>{
    const i = document.querySelector("body");
    console.log(weather);
    if(weather === "Clear"){
        i.style.backgroundImage = "url(\"./images/clear.jpg\")"
    }else if(weather === "Clouds"){
        i.style.backgroundImage = "url(\"./images/clouds.jpg\")"
    }else if(weather === "Rain"){
        i.style.backgroundImage = "url(\"./images/rain.jpg\")"
    }else if(weather === "Thunderstorm"){
        i.style.backgroundImage = "url(\"./images/thunderstorm.jpg\")"
    }else if(weather === "Snow"){
        i.style.backgroundImage = "url(\"./images/snow.jpg\")"
    }else if(weather === "Mist"){
        i.style.backgroundImage = "url(\"./images/fog.jpg\")"
    }
};


class AppContent extends React.Component{
    state={
        value:'',
        date: '',
        city: '',
        pressure: '',
        temperature: '',
        humidity: '',
        wind: '',
        weather: '',
        error: false,
        isDataIn:false,
        icon:''
    };

    handleInputChange = (e)=>{
    this.setState({
        value: e.target.value
    })};

    handleFormSubmit = (e)=>{
        e.preventDefault();
        console.log("Submit potwierdzony");
        const API_URL = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&APPID=bf44c50cf09df4e6c224fe799a3f0c4f`;
        fetch(API_URL)
            .then(response =>{
                if(response.ok){
                    return response
                }
                alert("Nie ma takiego miasta")
                throw Error("Nie ma takiego miasta")
            })
            .then(response => response.json())
            .then(data => {
                const time = new Date().toLocaleString();
                console.log(data);
                this.setState({
                    error:false,
                    city: data.name,
                    date: time,
                    temperature: data.main.temp,
                    pressure: data.main.pressure,
                    humidity: data.main.humidity,
                    wind: data.wind.speed,
                    weather: data.weather[0].main,
                    icon: data.weather[0].icon,
                    isDataIn:true
                })
            })
            .catch(err => {
                console.log(err, 'err');
                this.setState({
                    error:true
                })
            });
    };

    // componentDidMount() {
    //     const API_URL = `http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=bf44c50cf09df4e6c224fe799a3f0c4f`;
    //     fetch(API_URL)
    //         .then(data => data.json())
    //         .then(response => console.log(response))
    //         .catch(err => console.log(err, 'err'));
    // }

    render() {

        return (
            <>
            <Form
                value={this.state.value}
                change={this.handleInputChange}
                submit={this.handleFormSubmit}
            />
            <MainContent weather={this.state}/>
            </>
        );
    }
}

class Form extends React.Component{
    render() {
        return (
                <div className="search-container">
                    <form onSubmit={this.props.submit}>
                    <input  className="search-control"
                            type="text"
                            placeholder="Search.."
                            value={this.props.value}
                            onChange={this.props.change}/>
                    <button className="search-control" type="submit">Search City</button>
                    </form>
            </div>
        )
    }
}

class MainContent extends React.Component{
    render() {
        const {
            date,
            city,
            pressure,
            temperature,
            humidity,
            wind,
            weather,
            error,
            isDataIn,
            icon
        } = this.props.weather;
        const newTemperature = changeTemperatureUnit(temperature);
        if(isDataIn){
            changeBackground(weather);
            return (
                <div className="weather-widget">
                    <div className="weather-Description">
                        <h1 className="city">{city}</h1>
                        <div className="weatherMain">
                            <div className="temperature">{newTemperature}&deg;</div>
                            <div className="weather-DescriptionHeader">{weather}</div>
                            <div><img className="weather-image" src={`http://openweathermap.org/img/w/${icon}.png`} alt='Weather icon'/></div>
                        </div>
                        <hr/>
                        <div className="weather-time">{date}</div>
                        <hr/>
                        <div className="bottom-details"> Wind speed: {wind} m/s</div>
                        <div className="bottom-details"> Humidity level: {humidity}%</div>
                        <div className="bottom-details"> Pressure : {pressure} hPa</div>
                    </div>
                </div>
            )
        }
        return null
    }
}

const App = () => {
    return(
        <div className="app-wrapper">
        <AppContent/>
        </div>
        )
};

ReactDom.render(<App/>, document.getElementById("wrapper"));