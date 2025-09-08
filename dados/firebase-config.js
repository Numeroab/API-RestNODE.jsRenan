const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, addDoc, getDocs, getDoc, updateDoc, deleteDoc } = require('firebase/firestore');

// SUA CONFIGURAÇÃO DO FIREBASE - COLE AQUI SUAS CREDENCIAIS
const firebaseConfig = {
  apiKey: "AIzaSyB3-a53XkMzy447QEbNKCtU2HhBzpoDnaI",
  authDomain: "apirestformulario.firebaseapp.com",
  projectId: "apirestformulario",
  storageBucket: "apirestformulario.firebasestorage.app",
  messagingSenderId: "446486715884",
  appId: "1:446486715884:web:69bc6a440f4b07f262f4c9",
  measurementId: "G-XNCGM533S4"
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