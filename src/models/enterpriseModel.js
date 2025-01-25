import client from '../config/database.js'; // Importando a conexão com o banco de dados

// Função para buscar todos as empresas
const getAllEnterprises = async () => {
    try {
        const result = await client.query('SELECT * FROM empresa');
        return result.rows;
    } catch (err) {
        console.error('Erro ao buscar empresa:', err);
        throw err;
    }
};

// Função para buscar um empresa
const getEnterprise = async ({ id, nome, cnpj, telefone, email }) => {
    try {
        let query = 'SELECT * FROM empresa WHERE';
        const params = [];
        let conditions = [];

        if (id) {
            conditions.push('id = $' + (params.length + 1));
            params.push(id);
        }
        if (nome) {
            conditions.push('nome ILIKE $' + (params.length + 1)); // ILIKE para busca case-insensitive
            params.push(`%${nome}%`);
        }
        if (cnpj) {
            conditions.push('cnpj ILIKE $' + (params.length + 1));
            params.push(`%${cnpj}%`);
        }
        if (telefone) {
            conditions.push('telefone ILIKE $' + (params.length + 1));
            params.push(`%${telefone}%`);
        }
        if (email) {
            conditions.push('email ILIKE $' + (params.length + 1));
            params.push(`%${email}%`);
        }

        if (conditions.length === 0) {
            throw new Error('Nenhum critério de busca fornecido');
        }

        query += ' ' + conditions.join(' AND ');

        const result = await client.query(query, params);
        return result.rows; // Retorna todas as empresas encontrada ou undefined
    } catch (err) {
        console.error('Erro ao buscar empresa:', err);
        throw err;
    }
};

// Função para adicionar um nova empresa
const addEnterprise = async (nome, cnpj, telefone, email) => {
    try {
        const result = await client.query(
            'INSERT INTO empresa (nome, cnpj, telefone, email) VALUES ($1, $2, $3, $4) RETURNING *',
            [nome, cnpj, telefone, email]
        );
        return result.rows[0]; // Retorna o empresa recém-cadastrado
    } catch (err) {
        console.error('Erro ao adicionar empresa:', err);
        throw err;
    }
};

const deleteEnterprise = async (id) => {
    try {
        const result = await client.query(
            'DELETE FROM empresa WHERE id_empresa = ($1) RETURNING *',
            [id]
        );
        return result.rows[0]; // Retorna a empresa deletada
    } catch (err) {
        console.error('Erro ao deletar empresa:', err);
        throw err;
    }
};


const updateEnterprise = async (id, nome, cnpj, telefone, email) => {
    try {
        const result = await client.query(
            'UPDATE empresa SET nome = $1, cnpj = $2, telefone = $3, email = $4 WHERE id_empresa = $5 RETURNING *',
            [nome, cnpj, telefone, email, id]
        );
        return result.rows[0]; // Retorna o empresa atualizado
    } catch (err) {
        console.error('Erro ao atualizar empresa:', err);
        throw err;
    }
};

export {
    getAllEnterprises,
    addEnterprise,
    deleteEnterprise,
    updateEnterprise,
    getEnterprise,
}

// export { getAllUsers, getUser, addUser, deleteUser, updateUser };