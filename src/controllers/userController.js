import { getAllUsers, addUser, deleteUser, updateUser, getUser } from "../models/userModel.js";

// Função para lidar com a requisição de listar usuarios
const getAllUsersController = async (req, res) => {
    try {
        const users = await getAllUsers(); // Chama a função do model
        res.json(users);  // Retorna os dados no formato JSON
    } catch (err) {
        console.error('Erro ao buscar usuarios:', err);
        res.status(500).send('Erro ao buscar usuarios');
    }
};

// Função para lidar com a requisição de listar usuarios
const getUserController = async (req, res) => {
    const { id, nome, email, senha, fk_empresa_id, tipo_usuario } = req.query; // Pega os parâmetros da query string

    if (!id && !nome && !email && !senha && !fk_empresa_id && !tipo_usuario) {
        return res.status(400).send('É necessário fornecer algum parâmetro para a busca');
    }

    try {
        const user = await getUser({ id, nome, email, senha, fk_empresa_id, tipo_usuario });

        if (!user) {
            return res.status(404).send('Usuario não encontrado');
        }

        res.status(200).json(user);
    } catch (err) {
        console.error('Erro ao buscar usuario:', err);
        res.status(500).send('Erro ao buscar usuario');
    }
};


// Controlador para adicionar um nova usuario
const addUserController = async (req, res) => {
    const { nome, email, senha, fk_empresa_id, tipo_usuario } = req.body; // Recebe os dados do corpo da requisição
    if (!nome || !email || !senha || !fk_empresa_id || !tipo_usuario) {
        return res.status(400).send('Nome, email, senha, empresa e tipo são obrigatórios');
    }

    try {
        const newUser = await addUser(nome, email, senha, fk_empresa_id, tipo_usuario); // Chama o modelo para adicionar a usuario
        res.status(201).json(newUser); // Retorna a usuario criada
    } catch (err) {
        console.error('Erro ao adicionar usuario:', err);
        res.status(500).send('Erro ao adicionar usuario');
    }
};

// Controlador para adicionar um novo usuario
const deleteUserController = async (req, res) => {
    const { id } = req.body; // Recebe os dados do corpo da requisição
    if (!id) {
        return res.status(400).send('ID é obrigatório para exclusão');
    }

    try {
        const user = await deleteUser(id); // Chama o modelo para deletar o usuario
        if (!user) {
            return res.status(404).send('Usuario não encontrado');
        }
        res.status(200).json({ message: 'Usuario excluido com sucesso!', user }); // Retorna usuario excluido
    } catch (err) {
        console.error('Erro ao excluir usuario:', err);
        res.status(500).send('Erro ao excluir usuario:');
    }
};

const updateUserController = async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha, fk_empresa_id, tipo_usuario } = req.body; // Recebe os dados do corpo da requisição
    if (!id || !nome || !email || !senha || !fk_empresa_id || !tipo_usuario) {
        return res.status(400).send('ID, nome, email, senha, fk_empresa_id e tipo_usuario são obrigatório para atualização');
    }

    try {
        const user = await updateUser(id, nome, email, senha, fk_empresa_id, tipo_usuario); // Chama o modelo para atualizar o usuario
        if (!user) {
            return res.status(404).send('Usuario não encontrado');
        }
        res.status(200).json({ message: 'Usuario atualizado com sucesso!', user }); // Retorna usuario atualizado
    } catch (err) {
        console.error('Erro ao atualizar usuario:', err);
        res.status(500).send('Erro ao atualizar usuario:');
    }
};

export {
    getAllUsersController,
    addUserController,
    deleteUserController,
    updateUserController,
    getUserController,
}

