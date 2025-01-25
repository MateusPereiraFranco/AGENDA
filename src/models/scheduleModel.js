import client from '../config/database.js'; // Importando a conexão com o banco de dados

// Função para buscar todos as agendas
const getAllSchedules = async () => {
    try {
        const result = await client.query('SELECT * FROM agenda');
        return result.rows;
    } catch (err) {
        console.error('Erro ao buscar agenda:', err);
        throw err;
    }
};

// Função para buscar um agenda
const getSchedule = async ({ id, data, fk_usuario_id }) => {
    try {
        let query = 'SELECT * FROM agenda WHERE';
        const params = [];
        let conditions = [];

        if (id) {
            conditions.push('id = $' + (params.length + 1));
            params.push(id);
        }
        if (data) {
            conditions.push('data = $' + (params.length + 1));
            params.push(`${data}`);
        }
        if (fk_usuario_id) {
            conditions.push('fk_usuario_id = $' + (params.length + 1));
            params.push(`${fk_usuario_id}`);
        }

        if (conditions.length === 0) {
            throw new Error('Nenhum critério de busca fornecido');
        }

        query += ' ' + conditions.join(' AND ');

        const result = await client.query(query, params);
        return result.rows; // Retorna todas as agendas encontrada ou undefined
    } catch (err) {
        console.error('Erro ao buscar agenda:', err);
        throw err;
    }
};

// Função para adicionar um nova agenda
const addSchedule = async (data, fk_usuario_id) => {
    try {
        const result = await client.query(
            'INSERT INTO agenda (data, fk_usuario_id) VALUES ($1, $2) RETURNING *',
            [data, fk_usuario_id]
        );
        return result.rows[0]; // Retorna o agenda recém-cadastrado
    } catch (err) {
        console.error('Erro ao adicionar agenda:', err);
        throw err;
    }
};

const deleteSchedule = async (id) => {
    try {
        const result = await client.query(
            'DELETE FROM agenda WHERE id_agenda = ($1) RETURNING *',
            [id]
        );
        return result.rows[0]; // Retorna a agenda deletada
    } catch (err) {
        console.error('Erro ao deletar agenda:', err);
        throw err;
    }
};


const updateSchedule = async (id, data, fk_usuario_id) => {
    try {
        const result = await client.query(
            'UPDATE agenda SET data = $1, fk_usuario_id = $2 WHERE id_agenda = $3 RETURNING *',
            [data, fk_usuario_id, id]
        );
        return result.rows[0]; // Retorna o agenda atualizado
    } catch (err) {
        console.error('Erro ao atualizar agenda:', err);
        throw err;
    }
};

export {
    getAllSchedules,
    addSchedule,
    deleteSchedule,
    updateSchedule,
    getSchedule,
}
