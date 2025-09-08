const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, addDoc, getDocs, getDoc, updateDoc, deleteDoc } = require('firebase/firestore');

// SUA CONFIGURAÇÃO DO FIREBASE - COLE AQUI SUAS CREDENCIAIS
const firebaseConfig = {
  apiKey: "sua-api-key",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "sua-app-id"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Referência para a coleção de alunos
const alunosCollection = collection(db, 'alunos');

module.exports = {
  db,
  alunosCollection,
  doc,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc
};