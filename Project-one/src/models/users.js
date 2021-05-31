const conexao = require('../database/db')

//funções que iram executar as tarefas do CRUID do usuário
async function creatUser(name, email, password) {
    const conn = await conexao.connect();
    const sql = 'INSERT INTO users(name, email, password) VALUES (?,?,?);';
    const values = [name, email, password]
    const query = await conn.query(sql, values);
    const users = [{ name: name, email: email, password: password }];
    return users;
}
async function getUser(id) {
    const conn = await conexao.connect();

    if (id != 0) {
        const sql = 'SELECT * FROM `users` WHERE id =' + id;
        const [rows] = await conn.query(sql);
        return rows;
    } else {
        const sql = 'SELECT * FROM `users`';
        const [rows] = await conn.query(sql);
        return rows;
    }
}
async function updateUsers(id, name, email, crypted_pass, userupdate) {
    const conn = await conexao.connect();
    const sql = 'UPDATE users SET name=?, email=?, password=?,userupdate=? WHERE id=?;';
    const values = [name, email, crypted_pass, userupdate, id]
    const query = await conn.query(sql, values);

    const [rows] = await getUser(id);
    return rows;
}
async function deleteUsers(id) {
    try {
        const conn = await conexao.connect();
        const sql = 'DELETE FROM users WHERE id=?';
        const [rows] = await conn.query(sql, [id]);
        return await rows;
    } catch (err) {
        console.log(err);
        return err;
    }
}
async function getUsermail(mail) {
    try {
        const conn = await conexao.connect();
        const sql = 'SELECT * FROM users WHERE email=?';
        const [rows] = await conn.query(sql, [mail]);
        return await rows;
    } catch (err) {
        console.log(err);
        return err;
    }

}

module.exports = { creatUser, getUser, updateUsers, deleteUsers, getUsermail };
