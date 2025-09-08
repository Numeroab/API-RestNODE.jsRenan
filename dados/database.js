// Mude para:
const { alunosCollection, addDoc, getDocs, getDoc, updateDoc, deleteDoc, doc } = require('./firebase-config');

const database = {
  // GET ALL - Buscar todos os alunos
  getAll: async () => {
    try {
      const querySnapshot = await getDocs(alunosCollection);
      const alunos = [];
      
      querySnapshot.forEach((doc) => {
        alunos.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return alunos;
    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
      throw new Error('Falha ao buscar alunos');
    }
  },
  
  // GET BY ID - Buscar aluno por ID
  getById: async (id) => {
    try {
      const docRef = doc(alunosCollection, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar aluno:', error);
      throw new Error('Falha ao buscar aluno');
    }
  },
  
  // CREATE - Criar novo aluno
  create: async (alunoData) => {
    try {
      // Adicionar timestamps
      const alunoComTimestamps = {
        ...alunoData,
        dataCriacao: new Date().toISOString(),
        dataAtualizacao: new Date().toISOString()
      };
      
      const docRef = await addDoc(alunosCollection, alunoComTimestamps);
      
      return {
        id: docRef.id,
        ...alunoComTimestamps
      };
    } catch (error) {
      console.error('Erro ao criar aluno:', error);
      throw new Error('Falha ao criar aluno');
    }
  },
  
  // UPDATE - Atualizar aluno
  update: async (id, alunoData) => {
    try {
      const docRef = doc(alunosCollection, id);
      const alunoAtualizado = {
        ...alunoData,
        dataAtualizacao: new Date().toISOString()
      };
      
      await updateDoc(docRef, alunoAtualizado);
      
      return {
        id: id,
        ...alunoAtualizado
      };
    } catch (error) {
      console.error('Erro ao atualizar aluno:', error);
      throw new Error('Falha ao atualizar aluno');
    }
  },
  
  // DELETE - Deletar aluno
  delete: async (id) => {
    try {
      const docRef = doc(alunosCollection, id);
      const aluno = await database.getById(id);
      
      if (aluno) {
        await deleteDoc(docRef);
        return aluno;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Erro ao deletar aluno:', error);
      throw new Error('Falha ao deletar aluno');
    }
  }
};

module.exports = database;