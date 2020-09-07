import React, { Component } from 'react';
import "./waniwani.css";
import iwakabe from './image/iwakabe.jpg';
import wani from './image/makewani.png';
import hit from './image/waniHit.png';
import hitsound from './sound/boysound.mp3';
import byte from './sound/byte.mp3';

export default class waniwani extends Component  {
    constructor (props) {
        super(props);
        this.state = {
            location:0,
            hitflg:true,
            hitpoint:30,
            point:0
        };
    }

    MakeGate = () =>{
        return(
        <div className="Gate">
        <table cellSpacing="0" cellPadding="0">
            <tbody>
                <tr>
                    <td><img src={iwakabe} height="30px" width="30px"/></td>
                    <td><img src={iwakabe} height="30px" width="30px"/></td>
                    <td><img src={iwakabe} height="30px" width="30px"/></td>
                    <td><img src={iwakabe} height="30px" width="30px"/></td>
                </tr>
                <tr>
                <td><img src={iwakabe} height="30px" width="30px"/></td>
                    <td></td>
                    <td></td>
                    <td><img src={iwakabe} height="30px" width="30px"/></td>
                </tr>
                <tr>
                <td><img src={iwakabe} height="30px" width="30px"/></td>
                    <td></td>
                    <td></td>
                    <td><img src={iwakabe} height="30px" width="30px"/></td>
                </tr>
            </tbody>
        </table>
    </div>
        );
    }

    HitWani = () =>{
        const {point} = this.state;
        const audio = new Audio(hitsound);
        audio.play();

        this.setState(()=>{
            return {hitflg:true};
        })
        this.setState(()=>{
            return {point:point + 10};
        })
    }

    ClickStart = () =>{
        this.intervalId = setInterval(()=>{
            this.rand_WaniUp();
        }, 1000);

        document.getElementById("StButton").setAttribute("disabled", "disabled");
        document.getElementById("StButton").style.backgroundColor = "gray";
    }

    finish_Game = () =>{
        return new Promise((resolve, reject) =>{
            this.setState(()=>{
                return {hitpoint:30};
            })
            this.setState(()=>{
                return {hitflg:true};
            })
            this.setState(()=>{
                return {location:0};
            })
            this.setState(()=>{
                return {point:0};
            })
    
            clearInterval(this.intervalId);
            document.getElementById("StButton").removeAttribute("disabled");
            document.getElementById("StButton").style.backgroundColor = "#24d";
    
            document.getElementById('hitpointbar').style.width = 30*3 + "px";
            resolve();
        })

    }

    test = () =>{
        return new Promise((resolve, reject) =>{
            const {hitpoint} = this.state;
            document.getElementById('hitpointbar').style.width = (hitpoint - 10)*3 + 10 + "px";
            this.setState(()=>{
                return {hitpoint:hitpoint - 10};
            })
            resolve();
        })
    }

    
    DoCalcHitpoint = () =>{
        return new Promise((resolve) =>{
            const {hitflg} = this.state;
    
            var a = Math.floor( Math.random() * 5)+1 ;
            this.setState(()=>{
                return {location:a};
            })
        
            if(hitflg === false){
                this.test().then( () =>{
                    this.checkHitpoint().then(()=>{
                        resolve();
                    })
                })
            }else{
                this.setState(()=>{
                    return {hitflg:false};
                })
                resolve();
            }
        })
    }

    checkHitpoint = () =>{
        return new Promise((resolve, reject) =>{
            const {hitpoint} = this.state;
            console.log("hitpoint:"+hitpoint);
            if(hitpoint <0){
                document.getElementById('hitpointbar').style.width = 0 + "px";
                this.CheckResult();
            }else{
                const audio = new Audio(byte);
                audio.play();
            }
        })
    }

    rand_WaniUp = () =>{
        this.DoCalcHitpoint().then( () =>{
            const {hitpoint} = this.state;
            console.log("hitpoint:"+hitpoint);
        })
    }

    CheckResult = () =>{
        const {hitpoint} = this.state;
        if(hitpoint <= 0){
            this.finish_Game().then( () =>{
                alert("Game Finish!!");
            })
        }
    }

    render() {
        const {location} = this.state;
        const {hitflg} = this.state;
        const {point} = this.state;

        if(hitflg === true){
            console.log("location:"+location);
        }

        return (<div>
            <div className="Header">
                <h1>ワニたたき</h1>
                <input type="button" id="StButton"　className="StButton" value="スタート" onClick={this.ClickStart}></input><br/>
            </div>
            <div className="hitpoint">
                <a>ヒットポイント</a>
                <div id="hitpointbar" width="100px" height="50px" className="pointbar" >&nbsp;</div>
            </div>
            <div className="Point">
                <a>ポイント：{point}</a>
                </div>

            <div className="SeaBack">
            <div className = "Gate">
                {this.MakeGate()}
                {this.MakeGate()}
                {this.MakeGate()}
                {this.MakeGate()}
                {this.MakeGate()}
            </div>
            {
                (() => {
                    if(location===1){
                        if(hitflg == true){
                            return(<div className="WaniWani1"><img src={hit} width="150px" heigt="150px" /></div>)
                        }else{
                            return(<div className="WaniWani1"  onClick={this.HitWani}><img src={wani} width="100px" heigt="100px" /></div>);
                        }
                    }else if(location===2){
                        if(hitflg == true){
                            return(<div className="WaniWani2"><img src={hit} width="150px" heigt="150px" /></div>)
                        }else{                        
                            return(<div className="WaniWani2"  onClick={this.HitWani}><img src={wani} width="100px" heigt="100px" /></div>);
                        }
                    }else if(location===3){
                        if(hitflg == true){
                            return(<div className="WaniWani3"><img src={hit} width="150px" heigt="150px" /></div>)
                        }else{
                            return(<div className="WaniWani3" onClick={this.HitWani}><img src={wani} width="100px" heigt="100px" /></div>);
                        }
                    }else if(location===4){
                        if(hitflg == true){
                            return(<div className="WaniWani4"><img src={hit} width="150px" heigt="150px" /></div>)
                        }else{
                            return(<div className="WaniWani4"  onClick={this.HitWani}><img src={wani} width="100px" heigt="100px" /></div>);
                        }
                    }else if(location===5){
                        if(hitflg == true){
                            return(<div className="WaniWani5"><img src={hit} width="150px" heigt="150px" /></div>)
                        }else{
                            return(<div className="WaniWani5"  onClick={this.HitWani}><img src={wani} width="100px" heigt="100px" /></div>);
                        }
                    }
                })()
            }
            </div>
        </div>);
    }
  }