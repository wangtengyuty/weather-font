import React from 'react';
import {Select} from 'antd';
import WeatherForecast from "./weatherForecast";

const Option = Select.Option;
export default class Deatil extends React.Component{

    constructor(props){
        super(props);
        this.state={
            citys:"",
            cityKey:"",
            isFirstRender:"",
            createRender:""
        }
        this.handleChange=this.handleChange.bind(this);
    }

    handleChange(value) {
        this.setState({
            cityKey:value
        },function () {
            this.createRender()
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


    shouldComponentUpdate(){
        if(this.state.isFirstRender===""){
            this.setState({
                isFirstRender:"false"
            })
            return true;
        }
        if(this.state.isFirstRender==="false" &&this.state.cityKey===""){
            return false;
        }
        return true;
    }
    createRender(){
        this.setState({
            createRender:"true"
        })
    }

    method(value){
        this.setState({
            createRender:value
        });
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
                    <WeatherForecast cityKey={this.state.cityKey} method={value=>this.method(value)} />
                </div>
            </div>
        )
    }
}
