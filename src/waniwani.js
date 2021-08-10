import React, { Component } from 'react';
import "./waniwani.css";
import iwakabe from './image/iwakabe.jpg';
import wani from './image/makewani.png';
import hit from './image/waniHit.png';
import hitsound from './sound/boysound.mp3';
import byte from './sound/byte.mp3';
import face from './image/face.png'
import losePose from './image/pose_lose_boy.png'

export default class waniwani extends Component  {
    constructor (props) {
        super(props);
        this.state = {
            location:0,
            hitflg:true,
            hitpoint:3,
            point:0
        };
    }

    MakeGate = () =>{
        return(
        <div className="Gate">
        <table >
            <tbody>
                <tr className="kabe">
                    <td><img src={iwakabe} alt="kabe" /></td>
                    <td><img src={iwakabe} alt="kabe" /></td>
                    <td><img src={iwakabe} alt="kabe" /></td>
                    <td><img src={iwakabe} alt="kabe" /></td>
                </tr>
                <tr className="kabe">
                <td><img src={iwakabe} alt="kabe" height="30px" width="30px"/></td>
                    <td></td>
                    <td></td>
                    <td><img src={iwakabe} alt="kabe" height="30px" width="30px"/></td>
                </tr>
                <tr className="kabe">
                <td><img src={iwakabe} alt="kabe" height="30px" width="30px"/></td>
                    <td></td>
                    <td></td>
                    <td><img src={iwakabe} alt="kabe" height="30px" width="30px"/></td>
                </tr>
            </tbody>
        </table>
    </div>
        );
    }

    HitWani = () =>{
        const {point} = this.state;
        //const audio = new Audio(hitsound);
        //audio.play();

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
                return {hitpoint:3};
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

            for(var i=0;i<4;i++){
                var hitpointId = "HitPointFace" + i; 
                document.getElementById(hitpointId).style.visibility = "visible";
            }
            resolve();
        })

    }

    test = () =>{
        return new Promise((resolve, reject) =>{
            const {hitpoint} = this.state;
            var hitpointId = "HitPointFace" + hitpoint; 
            document.getElementById(hitpointId).style.visibility = "hidden";
            this.setState(()=>{
                return {hitpoint:hitpoint - 1};
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
            if(hitpoint <0){
               clearInterval(this.intervalId);
               this.setState(()=>{
                    return {hitflg:true};
                })
                this.setState(()=>{
                    return {location:0};
                })
            }else{
                //const audio = new Audio(byte);
                //audio.play();
            }
        })
    }

    rand_WaniUp = () =>{
        this.DoCalcHitpoint().then( () =>{
            const {hitpoint} = this.state;

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

    atack = () =>{
        alert("test");
    }

    render() {
        const {location} = this.state;
        const {hitflg} = this.state;
        const {point} = this.state;
        const {hitpoint} = this.state;

        return (<div>
            <div className="Header">
                <h1>ワニたたき</h1>
                <input type="button" id="StButton"　className="StButton" value="スタート" onClick={this.ClickStart}></input><br/>
            </div>
            <div className="pointposition">
                <a className="Hitpoint">ヒットポイント</a>
                <img id="HitPointFace0" alt="hitpoint" src={face} width="50px"/>
                <img id="HitPointFace1" alt="hitpoint" src={face} width="50px"/>
                <img id="HitPointFace2" alt="hitpoint" src={face} width="50px"/>
                <img id="HitPointFace3" alt="hitpoint" src={face} width="50px"/>
                <a className="Point">ポイント：{point}</a>
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
                        if(hitflg === true){
                            return(<div className="WaniWani1"><img src={hit} alt="Wani" width="150px" heigt="150px" /></div>)
                        }else{
                            return(<div className="WaniWani1"  onClick={this.HitWani}><img src={wani} alt="hit" width="100px" heigt="100px" /></div>);
                        }
                    }else if(location===2){
                        if(hitflg === true){
                            return(<div className="WaniWani2"><img src={hit} alt="Wani" width="150px" heigt="150px" /></div>)
                        }else{                        
                            return(<div className="WaniWani2"  onClick={this.HitWani}><img src={wani} alt="hit" width="100px" heigt="100px" /></div>);
                        }
                    }else if(location===3){
                        if(hitflg === true){
                            return(<div className="WaniWani3"><img src={hit} alt="Wani" width="150px" heigt="150px" /></div>)
                        }else{
                            return(<div className="WaniWani3" onClick={this.HitWani}><img src={wani} alt="hit" width="100px" heigt="100px" /></div>);
                        }
                    }else if(location===4){
                        if(hitflg === true){
                            return(<div className="WaniWani4"><img src={hit} alt="Wani" width="150px" heigt="150px" /></div>)
                        }else{
                            return(<div className="WaniWani4"  onClick={this.HitWani}><img src={wani} alt="hit" width="100px" heigt="100px" /></div>);
                        }
                    }else if(location===5){
                        if(hitflg === true){
                            return(<div className="WaniWani5"><img src={hit} alt="Wani" width="150px" heigt="150px" /></div>)
                        }else{
                            return(<div className="WaniWani5"  onClick={this.HitWani}><img src={wani} alt="hit" width="100px" heigt="100px" /></div>);
                        }
                    }
                })()
            }
            </div>
            <div>
                {
                    (() =>{
                        if(hitpoint < 0){
                            return(
                                <div className="Finishbox">
                                    Game Over !!<br/>
                                    <img src={losePose} alt="losePose" className="LosePose">
                                    </img>
                                    <button className="continue" onClick={this.finish_Game}>
                                            続ける
                                    </button>
                                </div>);
                        }
                    })()
                }
            </div>
        </div>);
    }
  }