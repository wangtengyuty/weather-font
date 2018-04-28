import React from 'react';
import {Select} from 'antd';
import WeatherInfo from "./weatherInfo";

const Option = Select.Option;
export default class Deatil extends React.Component{
    constructor(){
        super();
        this.state={
            citys:"",
            cityKey:"",
            test:""
        }

        this.handleChange=this.handleChange.bind(this);
    }

    handleChange(value) {
        this.setState({
            cityKey:value
        })

    }

    componentWillMount(){
        var myFetchOptions={
            method:"GET",
            mode:"cors",
        }
        fetch("http://localhost:8080/weather/getAllCountry",myFetchOptions).then(response=>response.json()).then(json=>this.setState({
            citys:json
        }))
    }


    render(){
        const {citys}=this.state
        const cityList=citys.length
        ?citys.map((city,index)=>(
            <Option key={index} value={city.cityKey}>
                {city.cityName}
            </Option>
            ))
        :""
        return(
            <div>
                <div className={"weatherSelect"}>
                    <Select placeholder={"请选择城市"} style={{ width: 120 }} onChange={this.handleChange}>
                        {cityList}
                    </Select>
                    <WeatherInfo cityKey={this.state.cityKey}/>
                </div>
            </div>
        )
    }
}
