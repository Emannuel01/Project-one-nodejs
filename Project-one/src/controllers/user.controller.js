const users = require('../models/users');
const crypt = require('bcryptjs');

const salt = crypt.genSaltSync(10);

const timestamp = new Date();

module.exports = {
    async creatusers(req, res) {
        const { name, email, password } = req.body;
        try {
            //verifico se existe algum usuário cadastrado no banco de dados com este email
            const verify = await users.getUsermail(email);
            if (await verify.length == 0) {
                const crypted_pass = crypt.hashSync(password, salt);

                const user = await users.creatUser(name, email, crypted_pass);
                const [response] = await users.getUsermail(email);

                return res.status(201).json({
                    status: 'sucesso',
                    return: response
                });
            } else {
                return res.status(406).json({
                    status: 'falha',
                    mensage: 'Já possui usuário com o email cadastrado'
                })
            }
        } catch (err) {
            return res.status(500).json({ mensage: err })
        }
    },

    async getusers(req, res) {
        try {
            const { id } = req.body;

            if (id >= 0) {
                const response = await users.getUser(id);
                return res.status(200).json(response);
            } else {
                return res.status(406).json({ err: "informe o id valido" })
            }

        } catch (err) {
            return res.status(500).json({ mensage: err })
        }
    },

    async updateusers(req, res) {

        const { id, name, email, password } = req.body;

        try {
            //verifico se existe algum usuário cadastrado no banco de dados com este email
            const verify = await users.getUsermail(email);
            if (await verify.length == 0) {
                const crypted_pass = crypt.hashSync(password, salt);
                await users.updateUsers(id, name, email, crypted_pass, timestamp);
                const [response] = await users.getUser(id);
                return res.status(200).json({ response });
            } else {
                return res.status(406).json({
                    status: 'falha',
                    mensage: 'Já possui usuário com o email cadastrado'
                })
            }
        } catch (err) {
            return res.status(500).json({ mensage: err })
        }
    },

    async deleteusers(req, res) {
        try {
            const { id } = req.body;
            //verifico se foi passado algum id para executar o delete
            const verify = await users.getUser(id);
            if (await verify.length == 0) {
                return res.status(404).json({
                    status: 'falha',
                    mensage: 'usuário não encontrado na base'
                })
            } else {
                return res.status(200).json({
                    status: 'sucesso',
                    mensage: `Usuario id ${id} deletado com sucesso`
                })
            }
        } catch (err) {
            return res.status(500).json({ mensage: err })
        }
    }
}
