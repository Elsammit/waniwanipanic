import React, { Component } from 'react';
import "./calc.css";

export default class Todo extends Component  {

    constructor (props) {
        super(props);
        this.state = {
            num: 0,
            type:0,
            BufNum:0
        };
    }

    onInput = (e) => {
        const {num} = this.state;
        var calcNum = 0;
        if(num == 0 ){
            calcNum = e.target.value;
        }else{
            calcNum = Number(num)  + e.target.value;
        }
        
        console.log("calcNum is " + calcNum);

        this.setState({
            num: calcNum
        });
        document.getElementById("CalcResult").value = calcNum;
    }
    
    OnAdd = () => {
        console.log("click Add");
        this.CalcFunc_before();
        this.setState({
            type: 1
        });

        document.getElementById("CalcResult").value = 0;
    }

    Ondel = () =>{
        this.CalcFunc_before();

        this.setState({
            type: 2
        });

        document.getElementById("CalcResult").value = 0;  
    }

    OnKakeru = () =>{
        this.CalcFunc_before();

        this.setState({
            type: 3
        });

        document.getElementById("CalcResult").value = 0;  
    }

    OnWaru = () =>{
        this.CalcFunc_before();

        this.setState({
            type: 3
        });

        document.getElementById("CalcResult").value = 0;  
    }


    CalcFunc_before = () => {
        const {type} = this.state;
        const {num} = this.state;
        const {BufNum} = this.state;

        var calc = num;
        if(type!=0){
            var calc = this.CalcFunc(type, BufNum, num);
        }

        console.log("calcNum is " + calc);
        this.setState({
            BufNum:calc
        });

        this.setState({
            num: 0
        });
    }


    CalcFunc = (buf, BufNum, num) => {
        var calc = 0;
        if(buf==1){
            calc = Number(num) + Number(BufNum);
        }else if(buf==2){
            calc = Number(BufNum) - Number(num);
        }else if(buf == 3){
            calc = Number(BufNum) * Number(num);
        }

        return calc;
    }


    OnCalc = () => {
        console.log("click equal");
        const {type} = this.state;

        if(type!=0){
            const {num} = this.state;
            const {BufNum} = this.state;
            var calc = this.CalcFunc(type, BufNum, num);

            console.log("calcNum is " + calc);
            this.setState({
                BufNum:calc
            });
    
            this.setState({
                num: 0
            });
        }
        
        
        this.setState({
            type: 0
        });

        document.getElementById("CalcResult").value = calc;

    }

    onCancel = () => {
        this.setState({
            num: 0
        });
        document.getElementById("CalcResult").value = 0;
    }

    onAllClear = () => {
        this.setState({
            BufNum:0
        });

        this.setState({
            num: 0
        });
        document.getElementById("CalcResult").value = 0;
    }

    render() {
        return(<div>
            <h1>&nbsp;
                <u>計算機</u>
            </h1>
            <table border="3">
                <tbody>
                <tr height="20">
                    <td colSpan="5"><input type="text" id="CalcResult" className="Calc_Text"></input></td>
                </tr>
                <tr>
                    <td><button value="7" onClick={this.onInput} className="button">7</button></td>
                    <td><button value="8" onClick={this.onInput} className="button">8</button></td>
                    <td><button value="9" onClick={this.onInput} className="button">9</button></td>
                    <td><button value="+" onClick={this.OnAdd} className="button">+</button></td>
                    <td rowSpan="4"><button onClick={this.OnCalc} className="equal_button">=</button></td>
                </tr>
                <tr>
                    <td><button value="4" onClick={this.onInput} className="button">4</button></td>
                    <td><button value="5" onClick={this.onInput} className="button">5</button></td>
                    <td><button value="6" onClick={this.onInput} className="button">6</button></td>
                    <td><button value="-" onClick={this.Ondel} className="button">-</button></td>
                </tr>
                <tr>
                    <td><button value="1" onClick={this.onInput} className="button">1</button></td>
                    <td><button value="2" onClick={this.onInput} className="button">2</button></td>
                    <td><button value="3" onClick={this.onInput} className="button">3</button></td>
                    <td><button onClick={this.OnKakeru} className="button">×</button></td>
                </tr>
                <tr>
                    <td><button value="0" onClick={this.onInput} className="button">0</button></td>
                    <td><button onClick={this.onCancel} className="button">C</button></td>
                    <td><button onClick={this.onAllClear} className="button">AC</button></td>
                    <td><button onClick={this.OnWaru} className="button">/</button></td>
                </tr>
                </tbody>
            </table>
        </div>
        );
    }    
}