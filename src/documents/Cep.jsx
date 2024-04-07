import React, { useState } from 'react';
import '../css/style.css';

function Cep() {
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState(null);
    const [erro, setErro] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [telefone, setTelefone] = useState('');

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

    const enviarWhatsapp = (e) => {
        e.preventDefault();
        const mensagem = `Olá ${nome}, aqui está a sua solicitação:\n` + // \n serve para quebrar a linha ao enviar a mensagem para o whatsApp
            `Nome: ${nome}\n` +
            `Email: ${email}\n` +
            `Data de Nascimento: ${dataNascimento}\n` +
            `Telefone: ${telefone}\n` +
            `CEP: ${endereco ? endereco.cep : ''}\n` +
            `Logradouro: ${endereco ? endereco.logradouro : ''}\n` +
            `Bairro: ${endereco ? endereco.bairro : ''}\n` +
            `Cidade: ${endereco ? endereco.localidade : ''}\n` +
            `Estado: ${endereco ? endereco.uf : ''}`;

        const linkWhatsapp = `https://api.whatsapp.com/send?phone=${telefone}&text=${encodeURIComponent(mensagem)}`;
        window.open(linkWhatsapp, '_blank');
    };

    return (
        <div>
            <div className="formulario">
                <form onSubmit={enviarWhatsapp}>
                    <h1>Candidatar-se</h1>
                    <label>Nome Completo</label>
                    <input type="text" placeholder="Digite seu nome completo" value={nome} onChange={(e) => setNome(e.target.value)} />
                    <label>E-mail</label>
                    <input type="text" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label>Data de Nascimento</label>
                    <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} /> <br />
                    <label>Telefone</label>
                    <input type="tel" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                    <label>CEP</label>
                    <input type="text" value={cep} onChange={(e) => setCep(e.target.value)} placeholder="Digite o CEP" />
                    <button type="button" className="button_buscar" onClick={buscarCep}>Buscar</button>
                    {erro && <span>{erro}</span>} <br />
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
                        <button type="submit">Enviar para o meu WhatsApp</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Cep;
