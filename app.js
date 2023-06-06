const express = require('express');
const os = require('os');
const app = express();
const mysql = require('mysql2/promise');

app.get('/', (request, response) => {
    return response
        .status(200)
        .json({
            message: 'Olá'
        });
});

app.get("/liveness", (request, response) => {
    return response
        .status(200)
        .json({
            message: "Meu app está vivo!",
            path: process.cwd() //,
            //gid: process.getgid(),
            //uid: process.geteuid()
        });
});

app.get("/readiness", (request, response) => {
    return response
        .status(200)
        .json({
            message: "Meu app está pronto!",
            plataform: os.platform(),
            freemem: os.freemem(),
            homedir: os.homedir(),
            date: new Date().getTime()
        });
});



app.get("/consulta-dados", (request, response) => {

    //SCRIPT CREATE DATABASE
    //SCRIPT TABLE
    //SCRIPT INSERT

    //GITHUB
    //DOCKERHUB

    //LISTAGEM DOS CADASTROS DA TABELA CRIADA.
    //CONEXAO COM BANCO
    //INSTALACAO DO PACOTE NPM

    async function consultarDados(){
        const conn = await mysql.createConnection({
            host: "mysql",
            user: "user",
            password: "passwd",
            database: "db_datacloud"
        });
    
        const sql = 'SELECT * FROM usuarios';
        const [rows] = await conn.query(sql);
        conn.end();
        const listaUsuarios = [];
    
        for (const row of rows){
            const usuario = {
                id    : row['idusuario'],
                login : row['usu_login'],
                senha : row['usu_senha']
            }
    
            listaUsuarios.push(usuario);
        }
    
        return listaUsuarios;
    }

    return consultarDados()
        .then((usuarios) => {
            response.status(200).json(usuarios);
        }).catch((erro) => {
            response.status(500).json({
                status: false,
                mensagem: erro.message
            });
        });
});

module.exports = app;