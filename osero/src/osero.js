import React, { Component } from 'react';
import "./osero.css";

var mas = new Array(9);

export default class Todo extends Component  {

    constructor (props) {
        super(props);
        this.state = {
            turn:true,
            result:0
        };
        this.init();
    }
    
    DoReset = () =>{
        document.getElementById("osero11").value = "";
        document.getElementById("osero12").value = "";
        document.getElementById("osero13").value = "";
        document.getElementById("osero21").value = "";
        document.getElementById("osero22").value = "";
        document.getElementById("osero23").value = "";
        document.getElementById("osero31").value = "";
        document.getElementById("osero32").value = "";
        document.getElementById("osero33").value = "";
    }

    Check_Shohai = (turn) => {
        var ret = 0;
        if(mas[0] == turn && mas[1] == turn && mas[2] == turn){
            ret =turn;
        }else if(mas[3] == turn && mas[4] == turn && mas[5] == turn){
            ret = turn;
        }else if(mas[6] == turn && mas[7] == turn && mas[8] == turn){
            ret = turn;
        }else if(mas[0] == turn && mas[3] == turn && mas[6] == turn){
            ret = turn;
        }else if(mas[1] == turn && mas[4] == turn && mas[7] == turn){
            ret = turn;
        }else if(mas[2] == turn && mas[5] == turn && mas[8] == turn){
            ret = turn;
        }else if(mas[0] == turn && mas[4] == turn && mas[8] == turn){
            ret = turn;
        }else if(mas[2] == turn && mas[4] == turn && mas[6] == turn){
            ret = turn;
        }else{
            var count = 0;
            for(var i=0;i<9;i++){
                if(mas[i] != 0){
                    count++;
                }
            }
            if(count === 9){
                ret = 3;
            }else{
                console.log("count is " + count);
            }
        }

        return ret;
    }

    DoMark = (ids,x,y) => {
        const {turn} = this.state;
        const {result} = this.state;

        var flg = false;
        x = x -1;
        y = y -1;
        const TurnMessage = document.getElementById("TurnId");
        
        if(result !=0){
            this.DoReset();
            this.init();
            this.setState({
                result:0
            });
            this.setState({
                turn:true
            });
            TurnMessage.textContent = "ゲームスタート！！";
            TurnMessage.style.color = "black";
            return;
        }

        if(mas[y*3 + x] != 0){
            return;
        }

        var win_flg = 0;
        if(turn == true){
            document.getElementById(ids).value = "〇";
            document.getElementById(ids).style.color = "red";
            
            mas[y*3 + x] = 1;
            win_flg = this.Check_Shohai(1);
            flg = false;
        }else{
            document.getElementById(ids).value = "×";
            document.getElementById(ids).style.color = "blue";
            TurnMessage.textContent = "プレイヤー1のターン";
            mas[y*3 + x] = 2;
            win_flg = this.Check_Shohai(2);
            flg =true;
        }
        this.setState({
            turn:flg
        });
        this.setState({
            result:win_flg
        });

        if(win_flg ==1){
            TurnMessage.textContent = "プレイヤー1の勝利！！";
            TurnMessage.style.color = "red";
        }else if(win_flg == 2){
            TurnMessage.textContent = "プレイヤー2の勝利！！";
            TurnMessage.style.color = "blue";
        }else if(win_flg == 3){
            TurnMessage.textContent = "引き分けです";
            TurnMessage.style.color = "black";
        }else if(turn == true){
            TurnMessage.textContent = "プレイヤー2のターン";
        }else{
            TurnMessage.textContent = "プレイヤー1のターン";
        }
    }

    onClick = (id) => {
        var x_value = id.substr(-2, 1);
        var y_value = id.substr(-1, 1);
        console.log("x:"+x_value+", y:"+y_value);
        this.DoMark(id, Number(x_value), Number(y_value));
    }
    onClick12 = () => {
        this.DoMark("osero12",1,2);
    }
    
    init = () => {
        for(var i=0;i<9;i++){
            mas[i] = 0;
        }
    }

    render() {
        return (<div>
            <h1 className="title">&nbsp;
                <u>〇×ゲーム</u>
            </h1>
            <table>
                <tbody>
                    <tr>
                        <td><input type="text" id="osero11" onClick={() => this.onClick("osero11" )} className="Mas" /></td>
                        <td><input type="text" id="osero12" onClick={() => this.onClick("osero12" )}  className="Mas" /></td>
                        <td><input type="text" id="osero13" onClick={() => this.onClick("osero13" )}  className="Mas" /></td>
                    </tr>
                    <tr>
                        <td><input type="text" id="osero21" onClick={() => this.onClick("osero21" )} className="Mas" /></td>
                        <td><input type="text" id="osero22" onClick={() => this.onClick("osero22" )} className="Mas" /></td>
                        <td><input type="text" id="osero23" onClick={() => this.onClick("osero23" )} className="Mas" /></td>
                    </tr>
                    <tr>
                        <td><input type="text" id="osero31" onClick={() => this.onClick("osero31" )} className="Mas" /></td>
                        <td><input type="text" id="osero32" onClick={() => this.onClick("osero32" )} className="Mas" /></td>
                        <td><input type="text" id="osero33" onClick={() => this.onClick("osero33" )} className="Mas" /></td>
                    </tr>
                </tbody>
            </table>
            <h1 id="TurnId" className="Message">プレイヤー1のターン</h1>
        </div>);
    }
  }