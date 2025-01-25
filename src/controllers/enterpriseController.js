// import { getAllUsers, addUser, deleteUser, updateUser, getUser } from '../models/userModel.js';

import { addEnterprise, deleteEnterprise, getAllEnterprises, getEnterprise, updateEnterprise } from "../models/enterpriseModel.js";

// Função para lidar com a requisição de listar empresas
const getAllEnterprisesController = async (req, res) => {
    try {
        const enterprises = await getAllEnterprises(); // Chama a função do model
        res.json(enterprises);  // Retorna os dados no formato JSON
    } catch (err) {
        console.error('Erro ao buscar empresas:', err);
        res.status(500).send('Erro ao buscar empresas');
    }
};

// // Função para lidar com a requisição de listar empresas
const getEnterpriseController = async (req, res) => {
    const { id, nome, cnpj, telefone, email } = req.query; // Pega os parâmetros da query string

    if (!id && !nome && !cnpj && !telefone && !email) {
        return res.status(400).send('É necessário fornecer algum parâmetro para a busca');
    }

    try {
        const enterprise = await getEnterprise({ id, nome, cnpj, telefone, email });

        if (!enterprise) {
            return res.status(404).send('Empresa não encontrado');
        }

        res.status(200).json(enterprise);
    } catch (err) {
        console.error('Erro ao buscar empresa:', err);
        res.status(500).send('Erro ao buscar empresa');
    }
};


// Controlador para adicionar um nova empresa
const addEnterpriseController = async (req, res) => {
    const { nome, cnpj, telefone, email } = req.body; // Recebe os dados do corpo da requisição
    if (!nome || !email) {
        return res.status(400).send('Nome e e-mail são obrigatórios');
    }

    try {
        const newEnterprise = await addEnterprise(nome, cnpj, telefone, email); // Chama o modelo para adicionar a empresa
        res.status(201).json(newEnterprise); // Retorna a empresa criada
    } catch (err) {
        console.error('Erro ao adicionar empresa:', err);
        res.status(500).send('Erro ao adicionar empresa');
    }
};

// Controlador para adicionar um novo empresa
const deleteEnterpriseController = async (req, res) => {
    const { id } = req.body; // Recebe os dados do corpo da requisição
    if (!id) {
        return res.status(400).send('ID é obrigatório para exclusão');
    }

    try {
        const enterprise = await deleteEnterprise(id); // Chama o modelo para deletar o empresa
        if (!enterprise) {
            return res.status(404).send('Empresa não encontrado');
        }
        res.status(200).json({ message: 'Empresa excluido com sucesso!', enterprise }); // Retorna empresa excluido
    } catch (err) {
        console.error('Erro ao excluir empresa:', err);
        res.status(500).send('Erro ao excluir empresa:');
    }
};

const updateEnterpriseController = async (req, res) => {
    const { id } = req.params;
    const { nome, cnpj, telefone, email } = req.body; // Recebe os dados do corpo da requisição
    if (!id || !nome || !cnpj || !telefone || !email) {
        return res.status(400).send('ID, nome, cnpj, telefone e email são obrigatório para atualização');
    }

    try {
        const enterprise = await updateEnterprise(id, nome, cnpj, telefone, email); // Chama o modelo para atualizar o empresa
        if (!enterprise) {
            return res.status(404).send('Empresa não encontrado');
        }
        res.status(200).json({ message: 'Empresa atualizado com sucesso!', enterprise }); // Retorna empresa atualizado
    } catch (err) {
        console.error('Erro ao atualizar empresa:', err);
        res.status(500).send('Erro ao atualizar empresa:');
    }
};

export {
    getAllEnterprisesController,
    addEnterpriseController,
    deleteEnterpriseController,
    updateEnterpriseController,
    getEnterpriseController,
}

