import React, {useState} from "react";
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';


import './login.css';

import api from '../../services/api';

export default function Login() {

    const [nome, setNome ] = useState('');
    const [senha, setSenha ] = useState('');

    const history = useHistory();

    async function login(e) {
        e.preventDefault();

        const data = {
            nome,
            senha,
        };

        try {          
           console.log(data);
           const response = await api.post('/Autenticacao', data);

           localStorage.setItem('nome', nome);
           localStorage.setItem('token', response.data.token);

           history.push('/books')
        }
        catch(error) {
            //console.error('Error during login:', error);
            toast.error('Invalid email or password!')
        }
    }

    return(
        <div className="login-container">
            <form onSubmit={login}>
                <h1 className="access">Access your <b>account</b></h1>

                <input
                    className="input"
                    placeholder="Username" 
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                />
                    
                    <br/><br/>

                <input type="password" 
                     className="input"
                     placeholder="Password"
                     value={senha}
                     onChange={e => setSenha(e.target.value)}
                    /> 
                    
                    <br/><br/>
                
                <button className="buttonnnnn" type="submit">Login</button>
            </form>
        </div>
    )
}