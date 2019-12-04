import React from 'react';
import {request} from 'graphql-request';

const url = 'http://shop-roles.asmer.fs.a-level.com.ua/graphql';

export default function Inputs(props) {
    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [problem, setProblem] = React.useState();

    const authorization = () => {
        const query = `
            query log( $log:String, $pas:String ) {
                login( login:$log, password:$pas )
            }
        `;

        request( url, query, {
            log: login,
            pas: password
        } ).then( user => {
            if(user.login) {
                localStorage.auth = user.login;
                props.set()
            }
            else {
                setProblem("Вы ввели неправильный логин или пароль!");
                document.getElementById("input1").value = '';
                document.getElementById("input2").value = '';
            }
        } )  
        
    }

    const check = (event) => {
        if(event.keyCode === 13) {
            authorization()
        }
    }
    const onLoginChange = (e) => {
        setLogin(e.target.value)
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    return(
            <div className="inputs">
                { problem ?
                <span className='inputText'>{problem}</span> :
                <span className='inputText'>Пожалуйста, введите логин и пароль</span> }
                <input type="text" name="login" onChange={onLoginChange} placeholder="Логин" id="input1" />
                <input type="password" name="password" onChange={onPasswordChange} placeholder="Пароль" onKeyDown={check} id="input2" />
                <button onClick={authorization}>Войти</button>
            </div>
    )
}