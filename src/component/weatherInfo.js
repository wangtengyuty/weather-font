import React from 'react';

export default class WeatherInfo extends React.Component{
    constructor(){
        super()
        this.state=({
            weatherInfo:"",
            cityKey:""
        })
        this.getWeatherInfo=this.getWeatherInfo.bind(this)
    }



    getWeatherInfo(){
        var myFetchOptions={
            method:"GET",
            mode:"cors"
        }
        if(this.props.cityKey!==""){
            fetch("http://localhost:8080/weather/cityKey/"+this.props.cityKey,myFetchOptions).then(response=>response.json()).then(json=>this.setState({
                weatherInfo:json
            }))
            console.log("fetch")
        }
        console.log("getweatherinfo")
    }


    componentWillMount(){
        this.getWeatherInfo()
    }

    componentWillReceiveProps(){
        console.log("wty"+this.props.cityKey)
        this.getWeatherInfo()
    }


    render(){

        const {weatherInfo}=this.state
        //城市
        const city=weatherInfo.status===1000
        ? weatherInfo.data.city
        :"未获取到数据"
        //空气质量指数
        const aqi=weatherInfo.status===1000
            ? weatherInfo.data.aqi
            :"未获取到数据"
        //温度
        const wendu=weatherInfo.status===1000
            ? weatherInfo.data.wendu
            :"未获取到数据"
        //温度提示
        const ganmao=weatherInfo.status===1000
            ? weatherInfo.data.ganmao
            :"未获取到数据"

        return(
            <div>
                {city}{aqi}{wendu}{ganmao}
            </div>
        )
    }
}