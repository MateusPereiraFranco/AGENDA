import client from '../config/database.js'; // Importando a conexão com o banco de dados

// Função para buscar todos as usuarios
const getAllUsers = async () => {
    try {
        const result = await client.query('SELECT * FROM usuario');
        return result.rows;
    } catch (err) {
        console.error('Erro ao buscar usuario:', err);
        throw err;
    }
};

// Função para buscar um usuario
const getUser = async ({ id, nome, email, senha, fk_empresa_id, tipo_usuario }) => {
    try {
        let query = 'SELECT * FROM usuario WHERE';
        const params = [];
        let conditions = [];

        if (id) {
            conditions.push('id_usuario = $' + (params.length + 1));
            params.push(id);
        }
        if (nome) {
            conditions.push('nome ILIKE $' + (params.length + 1)); // ILIKE para busca case-insensitive
            params.push(`%${nome}%`);
        }
        if (email) {
            conditions.push('email ILIKE $' + (params.length + 1));
            params.push(`%${email}%`);
        }
        if (senha) {
            conditions.push('senha ILIKE $' + (params.length + 1));
            params.push(`${senha}`);
        }
        if (fk_empresa_id) {
            conditions.push('fk_empresa_id ILIKE $' + (params.length + 1));
            params.push(`${fk_empresa_id}`);
        }
        if (tipo_usuario) {
            conditions.push('tipo_usuario ILIKE $' + (params.length + 1));
            params.push(`%${tipo_usuario}%`);
        }

        if (conditions.length === 0) {
            throw new Error('Nenhum critério de busca fornecido');
        }

        query += ' ' + conditions.join(' AND ');

        const result = await client.query(query, params);
        return result.rows; // Retorna todas as usuarios encontrada ou undefined
    } catch (err) {
        console.error('Erro ao buscar usuario:', err);
        throw err;
    }
};

// Função para adicionar um novo usuario
const addUser = async (nome, email, senha, fk_empresa_id, tipo_usuario) => {
    try {
        const result = await client.query(
            'INSERT INTO usuario (nome, email, senha, fk_empresa_id, tipo_usuario) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [nome, email, senha, fk_empresa_id, tipo_usuario]
        );
        return result.rows[0]; // Retorna o usuario recém-cadastrado
    } catch (err) {
        console.error('Erro ao adicionar usuario:', err);
        throw err;
    }
};

const deleteUser = async (id) => {
    try {
        const result = await client.query(
            'DELETE FROM usuario WHERE id_usuario = ($1) RETURNING *',
            [id]
        );
        return result.rows[0]; // Retorna a usuario deletada
    } catch (err) {
        console.error('Erro ao deletar usuario:', err);
        throw err;
    }
};


const updateUser = async (id, nome, email, senha, fk_empresa_id, tipo_usuario) => {
    try {
        const result = await client.query(
            'UPDATE usuario SET nome = $1, email = $2, senha = $3, fk_empresa_id = $4, tipo_usuario =$5 WHERE id_usuario = $6 RETURNING *',
            [nome, email, senha, fk_empresa_id, tipo_usuario, id]
        );
        return result.rows[0]; // Retorna o usuario atualizado
    } catch (err) {
        console.error('Erro ao atualizar usuario:', err);
        throw err;
    }
};

export {
    getAllUsers,
    addUser,
    deleteUser,
    updateUser,
    getUser,
}
