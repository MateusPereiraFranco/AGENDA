// import { getAllUsers, addUser, deleteUser, updateUser, getUser } from '../models/userModel.js';

import { addSchedule, deleteSchedule, getAllSchedules, getSchedule, updateSchedule } from "../models/scheduleModel.js";

// Função para lidar com a requisição de listar agendas
const getAllSchedulesController = async (req, res) => {
    try {
        const schedules = await getAllSchedules(); // Chama a função do model
        res.json(schedules);  // Retorna os dados no formato JSON
    } catch (err) {
        console.error('Erro ao buscar agendas:', err);
        res.status(500).send('Erro ao buscar agendas');
    }
};

// // Função para lidar com a requisição de listar agendas
const getScheduleController = async (req, res) => {
    const { id, data, fk_usuario_id } = req.query; // Pega os parâmetros da query string

    if (!id && !data && !fk_usuario_id) {
        return res.status(400).send('É necessário fornecer algum parâmetro para a busca');
    }

    try {
        const schedule = await getSchedule({ id, data, fk_usuario_id });

        if (!schedule) {
            return res.status(404).send('Empresa não encontrado');
        }

        res.status(200).json(schedule);
    } catch (err) {
        console.error('Erro ao buscar agenda:', err);
        res.status(500).send('Erro ao buscar agenda');
    }
};


// Controlador para adicionar um nova agenda
const addScheduleController = async (req, res) => {
    const { data, fk_usuario_id } = req.body; // Recebe os dados do corpo da requisição
    if (!data || !fk_usuario_id) {
        return res.status(400).send('data e fk_usuario_id são obrigatórios');
    }

    try {
        const newSchedule = await addSchedule(data, fk_usuario_id); // Chama o modelo para adicionar a agenda
        res.status(201).json(newSchedule); // Retorna a agenda criada
    } catch (err) {
        console.error('Erro ao adicionar agenda:', err);
        res.status(500).send('Erro ao adicionar agenda');
    }
};

// Controlador para adicionar um novo agenda
const deleteScheduleController = async (req, res) => {
    const { id } = req.body; // Recebe os dados do corpo da requisição
    if (!id) {
        return res.status(400).send('ID é obrigatório para exclusão');
    }

    try {
        const schedule = await deleteSchedule(id); // Chama o modelo para deletar o agenda
        if (!schedule) {
            return res.status(404).send('Empresa não encontrado');
        }
        res.status(200).json({ message: 'Empresa excluido com sucesso!', schedule }); // Retorna agenda excluido
    } catch (err) {
        console.error('Erro ao excluir agenda:', err);
        res.status(500).send('Erro ao excluir agenda:');
    }
};

const updateScheduleController = async (req, res) => {
    const { id } = req.params;
    const { data, fk_usuario_id } = req.body; // Recebe os dados do corpo da requisição
    if (!id || !data || !fk_usuario_id) {
        return res.status(400).send('ID, data e fk_usuario_id são obrigatório para atualização');
    }

    try {
        const schedule = await updateSchedule(id, data, fk_usuario_id); // Chama o modelo para atualizar o agenda
        if (!schedule) {
            return res.status(404).send('Empresa não encontrado');
        }
        res.status(200).json({ message: 'Empresa atualizado com sucesso!', schedule }); // Retorna agenda atualizado
    } catch (err) {
        console.error('Erro ao atualizar agenda:', err);
        res.status(500).send('Erro ao atualizar agenda:');
    }
};

export {
    getAllSchedulesController,
    addScheduleController,
    deleteScheduleController,
    updateScheduleController,
    getScheduleController,
}

