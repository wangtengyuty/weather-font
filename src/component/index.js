import React from 'react';
import Header from "./header";
import Deatil from "./detail";

export default class Index extends React.Component{
    render(){
        return(
            <div>
                <Header/>
                <Deatil/>
            </div>
        )
    }
}