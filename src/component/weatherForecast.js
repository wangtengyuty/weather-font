import React from 'react';
import {Card,Row,Col} from 'antd'

export default class WeatherForecast extends React.Component{
    constructor(props){
        super(props)
        this.state=({
            weatherInfo:""
        })
        this.getWeatherInfo=this.getWeatherInfo.bind(this)
    }



    getWeatherInfo(){
        var myFetchOptions={
            method:"GET",
            mode:"cors"
        }
        if(this.props.cityKey!==""){
            fetch("http://localhost:8080/weather/cityKey/"+this.props.cityKey,myFetchOptions).then(response=>response.json()).then(json=>{this.setState({
                weatherInfo:json
            });console.log(json)})
        }
    }


    componentWillMount(){
        this.getWeatherInfo()
    }

    componentWillReceiveProps(){
        this.getWeatherInfo()
    }


    shouldComponentUpdate(){
        if(this.props.cityKey===""){
            this.props.method("false")
        }
        return true;
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
        //温馨提示
        const ganmao=weatherInfo.status===1000
            ? weatherInfo.data.ganmao
            :"未获取到数据"
        //今日详情
        const todayDetail=weatherInfo.status===1000
            ? <Card title={"今日天气详情"} bordered={true}>
                <p>城市:{city}</p>
                <p>空气质量指数:{aqi}</p>
                <p>当前温度:{wendu}</p>
                <p>温馨提示:{ganmao}</p>
              </Card>
            :""
        //五月预报
        const forecasts=weatherInfo.status===1000
            ? weatherInfo.data.forecast
            :""
        const forecastList=forecasts.length
            ?forecasts.map((forecast,index)=>(
                <div key={index}>
                    <Col span={4} >
                    <Card title={forecast.date} bordered={true}>
                        <p>最高温度:{forecast.high}</p>
                        <p>最低温度:{forecast.high}</p>
                        <p>风向:{forecast.fengxiang}</p>
                        <p>天气状况:{forecast.type}</p>
                    </Card>
                 </Col>
                </div>
            ))
            :""
        return(
            <div >
                <Row>
                    <Col span={4}>
                        {todayDetail}
                    </Col>
                    {forecastList}
                 </Row>
            </div>

        )
    }
}