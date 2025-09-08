const express = require('express');
const router = express.Router();
const database = require('../dados/database');

// GET - Listar todos os alunos
router.get('/', async (req, res) => {
  try {
    const alunos = await database.getAll();
    res.json(alunos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Buscar aluno por ID
router.get('/:id', async (req, res) => {
  try {
    const aluno = await database.getById(req.params.id);
    
    if (aluno) {
      res.json(aluno);
    } else {
      res.status(404).json({ error: 'Aluno não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST - Criar novo aluno
router.post('/', async (req, res) => {
  try {
    const { nome, cpf, telefone, email, matricula, aluno: nomeAluno, escola } = req.body;
    
    if (!nome || !cpf || !telefone || !email || !matricula || !nomeAluno || !escola) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }
    
    const novoAluno = await database.create(req.body);
    res.status(201).json(novoAluno);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT - Atualizar aluno
router.put('/:id', async (req, res) => {
  try {
    const alunoAtualizado = await database.update(req.params.id, req.body);
    
    if (alunoAtualizado) {
      res.json(alunoAtualizado);
    } else {
      res.status(404).json({ error: 'Aluno não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE - Remover aluno
router.delete('/:id', async (req, res) => {
  try {
    const alunoRemovido = await database.delete(req.params.id);
    
    if (alunoRemovido) {
      res.json({ message: 'Aluno removido com sucesso', aluno: alunoRemovido });
    } else {
      res.status(404).json({ error: 'Aluno não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;