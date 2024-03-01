import React, { useState, useEffect } from "react";
import './book.css';
import { Link, useHistory } from 'react-router-dom';

import { FiPower, FiEdit, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';


export default function Books() {

    const [livros, setLivros] = useState([]);
    const [page, setPage] = useState(1);

    const nome = localStorage.getItem('nome');
    const token = localStorage.getItem('token');

    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const history = useHistory();

    useEffect(() => {
        fetchMoreBooks();
    }, [token]);
    
    async function fetchMoreBooks() {
        try {
            console.log('Authorization:', authorization);
            const response = await api.get(`/Livro?page=${page}`, authorization);
    
            const newBooks = response.data || [];
    
            // Use um conjunto temporário para garantir a unicidade dos livros
            const uniqueNewBooks = new Set([...livros, ...newBooks]);
    
            // Converta novamente para um array antes de atualizar o estado
            setLivros([...uniqueNewBooks]);
            setPage(page + 1); // Incrementa a página para carregar mais livros na próxima chamada
        } catch (error) {
            console.error('Erro ao buscar mais livros:', error);
        }
    }

    const logout = () => {

        localStorage.clear();
        history.push('/');
      };

    async function deleteBook(id) {
        try {
            await api.delete(`Livro/deletarLivro/${id}`, authorization)

            setLivros(livros.filter(livro => livro.id !== id))
        }
        catch (error) {
            alert('Delete failed! Try again!')
        }
    }

    async function editBook(id) {
        try {
            history.push(`book/new/${id}`)
        }
        catch (error) {
            alert('Edit book failed! Try again!')
        }
    }

    return (
        <div className="book-container">
            <header>
                <span>Welcome, <strong>{nome.toLowerCase()}</strong>!</span>
                <Link className="buttonnn" to="/book/new/0">Add New Book</Link>
                <button onClick={logout} type="button">
                    <FiPower size={18} color="#251FC5" />
                </button>
            </header>

            <h1 className="titulo">Registered Books</h1>
            <ul>
                {livros.map(livro => (
                    <li key={livro.id}>
                        <strong>Title:</strong>
                        <p>{livro.titulo}</p>
                        <strong>Author:</strong>
                        <p>{livro.autor}</p>
                        <strong>Price:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(livro.preco)}</p>
                        <strong>Release Date:</strong>
                        <p>{Intl.DateTimeFormat('pt-BR').format(new Date(livro.dataLancamento))}</p>

                        <button onClick={() => editBook(livro.id)} type='button'>
                            <FiEdit size={20} color="orange" />
                        </button>
                        <button onClick={() => deleteBook(livro.id)} type='button'>
                            <FiTrash2 size={20} color="#ff6666" />
                        </button>
                    </li>
                ))}
            </ul>
            <button className="buttonnnn" onClick={fetchMoreBooks} type="button">Load More</button>
        </div>
    )
}