import React, { useState } from 'react';
import '../css/style.css';

function Cep() {
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState(null);
    const [erro, setErro] = useState('');

    const buscarCep = async () => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json`);
            const data = await response.json();
            if (response.ok) {
                setEndereco(data);
                setErro('');
            } else {
                setErro('CEP não encontrado');
                setEndereco(null);
            }
        } catch (error) {
            setErro('Ocorreu um erro ao buscar o CEP, verifique se o CEP está correto');
            setEndereco(null);
        }
    };

    return (
        <div>
            <div className="formulario">
                <form>
                <h1>Candidatar-se</h1>
                    <label>Nome Completo</label>
                    <input type="text" placeholder="Digite seu nome completo" />
                    <label>E-mail</label>
                    <input type="text" placeholder="Digite seu email" />
                    <label>Data de Nascimento</label>
                    <input type="date" /> <br></br>
                    <label>Telefone</label>
                    <input type="tel" />
                    <label>CEP</label>
                    <input type="text" value={cep} onChange={(e) => setCep(e.target.value)} placeholder="Digite o CEP" />
                    <button type="button" className="button_buscar" onClick={buscarCep}>Buscar</button>
                    {erro && <span>{erro}</span>} <br></br>
                    <label>CEP</label>
                    <input value={endereco ? endereco.cep : ''} readOnly />
                    <label>Logradouro</label>
                    <input value={endereco ? endereco.logradouro : ''} readOnly />
                    <label>Bairro</label>
                    <input value={endereco ? endereco.bairro : ''} readOnly />
                    <label>Cidade</label>
                    <input value={endereco ? endereco.localidade : ''} readOnly />
                    <label>Estado</label>
                    <input value={endereco ? endereco.uf : ''} readOnly />
                    <div className="botao-enviar">
            <button type="submit">Enviar para o meu whatsApp </button>
        </div>
                </form>
            </div>
        </div>
    );
}

export default Cep;
