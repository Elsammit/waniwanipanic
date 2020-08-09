import React, { Component } from 'react';

export default class Todo extends Component  {

    constructor (props) {
        super(props);
        this.state = {
            todos: [],
            name: '',
            month: '',
            day: '',
            list: ''
        };
    }

    onInput = (e) => {
        this.setState({
            name: e.target.value
        });
    }

    onInmonth = (e) => {
        this.setState({
            month: e.target.value
        })
    }

    onInday = (e) => {
        this.setState({
            day: e.target.value
        })
    }

    
    addTodo = async() => {
        var test = "aaa";
        const Do_AddToDo = () => {
            return new Promise((resolve, reject)=>{
                const {name} = this.state;
                const {day} = this.state;
                const {month} = this.state;
                
                if(name === null || name === ""){
                    resolve(-1);
                }

                var test = name + " (納期 " + month + day + ") "
                this.setState({
                    list: name + " (納期 " + month + day + ") "
                })
                resolve(0);
            })
        }
        var ret = await Do_AddToDo();

        if(ret >= 0){
            const {todos, test} = this.state;
            this.setState({
                todos:[...todos, test]
            });
        }else{
            alert("入力エラー 入力してください");
        }
    } 

    removeTodo = (index) =>{
        const{ todos } = this.state;
        this.setState({
            todos: [...todos.slice(0, index), ...todos.slice(index+1)]
        });

    }

    render() {
        const{ todos } = this.state;
        const date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1
        const bar = "/";

        var Days = [];
        for(var i = 1;i<=31;i++){
            var text = i+"日"
            Days.push(<option>{text}</option>)
        }

        var Months = [];
        for(i=1;i<=12;i++){
            text = i+"月"
            Months.push(<option>{text}</option>)           
        }

        return(<div>
            <h1>&nbsp;
                <u>todoリスト</u>
            </h1>
            <label>&nbsp; todo</label>
            <input type="text" onInput={this.onInput}/>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;  納期</label>
            <select id="month_id" name="month" onInput={this.onInmonth}>
                {Months}
            </select>
            <select id="day_id" name="day" onInput={this.onInday}>
                {Days}
            </select>

            <button onClick={this.addTodo}>登録</button>
            <ul>
                {todos.map((todo, index) => <li key={index}>
                    {todo}   <label>登録日</label>{month}{bar}{day}
                    <button onClick={() => {this.removeTodo(index)}}>削除</button>
                    
                    </li>)}
            </ul>
            </div>
        );
    }    
}