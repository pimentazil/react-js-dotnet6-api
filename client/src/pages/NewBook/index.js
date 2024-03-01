import React, { useEffect, useState } from "react";
import './style.css';

import api from '../../services/api';

import { FiArrowLeft } from 'react-icons/fi';

import { Link, useHistory, useParams } from 'react-router-dom';

export default function NewBook() {

    const [id, setId ] = useState(null)
    const [autor, setAutor] = useState('');
    const [titulo, setTitulo] = useState('');
    const [preco, setPreco] = useState('');
    const [dataLancamento, setDataLancamento] = useState('');


    const { livroId } = useParams();

    const history = useHistory();

    const token = localStorage.getItem('token');

    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    useEffect(() => {
        if(livroId === '0') return;
        else loadBook();
    }, livroId);

    async function loadBook() {
        try{
            const response = await api.get(`/Livro/obterLivro/${livroId}`, authorization)

            let adjustDate = response.data.dataLancamento.split("T", 10)[0];

            setId(response.data.id);
            setTitulo(response.data.titulo);
            setAutor(response.data.autor);
            setPreco(response.data.preco);
            setDataLancamento(adjustDate);  // Corrigido aqui
        }
        catch (error){
            console.log("Erro ao editar")
           // history.push('/books');
        }
    }

    async function saveOrUpdate(e) {
        e.preventDefault();

   // async function createNewBook(e) {
     //   e.preventDefault();

        const data = {
            titulo,
            autor,
            preco,
            dataLancamento,
        }


        try {
            if(livroId === '0') {
                await api.post('/Livro/adicionarLivro', data, authorization);
            } else {
                data.id = id;
                await api.put(`/Livro/atualizarLivro/${id}`, data, authorization);
            }
        } catch (error) {
            alert('Error while recording Book! Try again!')
        }
        history.push('/books');
    }


    return(
        <div className="new-book-container">
            <div className="content">
                <section>
                <h1>{livroId === '0'? 'Add New' : 'Update'} Book</h1>
                <p>Enter the book information and click on {livroId === '0'? `'Add'` : `'Update'`}!</p>
                    <Link to="/books" className="back-link">
                        <FiArrowLeft size={13} color="149eca" />
                        Back to Books
                    </Link>
                </section>

                <form onSubmit={saveOrUpdate}>
                    <input placeholder="Title" value={titulo} onChange={e => setTitulo(e.target.value)}/>
                    <input placeholder="Author" value={autor} onChange={e => setAutor(e.target.value)}/>
                    <input placeholder="Price" value={preco} onChange={e => setPreco(e.target.value)}/> 
                    <input type="date" className="date" value={dataLancamento} onChange={e => setDataLancamento(e.target.value)}/>
                    
                    <button className="buttonn" type="submit">{livroId === '0'? 'Add' : 'Update'}</button>
                </form>
            </div>
        </div>
    )
}   