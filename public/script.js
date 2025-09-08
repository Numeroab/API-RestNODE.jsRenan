console.log('✅ Script carregado! Vamos começar...');

// Variável global para armazenar os alunos
let alunos = [];

// Função para carregar alunos da API
async function carregarAlunos() {
    try {
        console.log('📡 Carregando alunos da API...');
        const response = await fetch('/api/alunos');
        
        if (!response.ok) {
            throw new Error('Erro ao carregar alunos');
        }
        
        alunos = await response.json();
        console.log('✅ Alunos carregados:', alunos);
        renderizarAlunos();
        
    } catch (error) {
        console.error('❌ Erro ao carregar alunos:', error);
        alert('Erro ao carregar lista de alunos');
    }
}

// Função para renderizar alunos na tela
function renderizarAlunos() {
    console.log('🎨 Renderizando alunos...');
    const container = document.getElementById('alunos-container');
    
    if (!container) {
        console.error('❌ Container não encontrado!');
        return;
    }
    
    // Limpar container
    container.innerHTML = '';
    
    if (alunos.length === 0) {
        container.innerHTML = '<p class="no-data">Nenhum aluno cadastrado.</p>';
        return;
    }
    
    // Adicionar cada aluno
    alunos.forEach(aluno => {
        const alunoDiv = document.createElement('div');
        alunoDiv.className = 'aluno-item';
        alunoDiv.innerHTML = `
            <div class="aluno-info">
                <h3>${aluno.nome || 'Sem nome'}</h3>
                <p><strong>CPF:</strong> ${aluno.cpf || 'Não informado'}</p>
                <p><strong>Telefone:</strong> ${aluno.telefone || 'Não informado'}</p>
                <p><strong>Email:</strong> ${aluno.email || 'Não informado'}</p>
                <p><strong>Matrícula:</strong> ${aluno.matricula || 'Não informada'}</p>
                <p><strong>Escola:</strong> ${aluno.escola || 'Não informada'}</p>
            </div>
            <div class="aluno-actions">
                <button onclick="editarAluno('${aluno.id}')">✏️ Editar</button>
                <button onclick="excluirAluno('${aluno.id}')">🗑️ Excluir</button>
            </div>
        `;
        container.appendChild(alunoDiv);
    });
    
    console.log('✅ Alunos renderizados!');
}

// Função para salvar aluno
async function salvarAluno(alunoData) {
    try {
        console.log('💾 Salvando aluno:', alunoData);
        
        const alunoId = document.getElementById('aluno-id').value;
        const url = alunoId ? `/api/alunos/${alunoId}` : '/api/alunos';
        const method = alunoId ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(alunoData)
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Erro ao salvar aluno');
        }
        
        const resultado = await response.json();
        console.log('✅ Aluno salvo:', resultado);
        return resultado;
        
    } catch (error) {
        console.error('❌ Erro ao salvar aluno:', error);
        throw error;
    }
}

// Função para editar aluno
async function editarAluno(id) {
    try {
        console.log('✏️ Editando aluno:', id);
        
        const response = await fetch(`/api/alunos/${id}`);
        if (!response.ok) {
            throw new Error('Erro ao carregar aluno');
        }
        
        const aluno = await response.json();
        
        // Preencher formulário
        document.getElementById('aluno-id').value = aluno.id;
        document.getElementById('nome').value = aluno.nome || '';
        document.getElementById('cpf').value = aluno.cpf || '';
        document.getElementById('telefone').value = aluno.telefone || '';
        document.getElementById('email').value = aluno.email || '';
        document.getElementById('matricula').value = aluno.matricula || '';
        document.getElementById('aluno').value = aluno.aluno || '';
        document.getElementById('escola').value = aluno.escola || '';
        
        // Mudar UI para modo edição
        document.getElementById('form-title').textContent = 'Editar Aluno';
        document.getElementById('submit-btn').textContent = 'Atualizar';
        document.getElementById('cancel-btn').style.display = 'inline-block';
        
        // Scroll para o formulário
        document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth' });
        
    } catch (error) {
        console.error('❌ Erro ao editar aluno:', error);
        alert('Erro ao carregar dados do aluno');
    }
}

// Função para excluir aluno
async function excluirAluno(id) {
    if (!confirm('Tem certeza que deseja excluir este aluno?')) {
        return;
    }
    
    try {
        console.log('🗑️ Excluindo aluno:', id);
        
        const response = await fetch(`/api/alunos/${id}`, { method: 'DELETE' });
        
        if (!response.ok) {
            throw new Error('Erro ao excluir aluno');
        }
        
        alert('Aluno excluído com sucesso!');
        await carregarAlunos(); // Recarregar lista
        
    } catch (error) {
        console.error('❌ Erro ao excluir aluno:', error);
        alert('Erro ao excluir aluno');
    }
}

// Configurar event listeners quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 Página carregada! Configurando eventos...');
    
    // Configurar formulário
    const form = document.getElementById('aluno-form');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            console.log('🎯 Formulário enviado!');
            
            const formData = {
                nome: document.getElementById('nome').value,
                cpf: document.getElementById('cpf').value,
                telefone: document.getElementById('telefone').value,
                email: document.getElementById('email').value,
                matricula: document.getElementById('matricula').value,
                aluno: document.getElementById('aluno').value,
                escola: document.getElementById('escola').value
            };
            
            try {
                await salvarAluno(formData);
                alert('Aluno salvo com sucesso!');
                
                // Recarregar lista e resetar formulário
                await carregarAlunos();
                this.reset();
                document.getElementById('aluno-id').value = '';
                document.getElementById('form-title').textContent = 'Adicionar Novo Aluno';
                document.getElementById('submit-btn').textContent = 'Salvar';
                document.getElementById('cancel-btn').style.display = 'none';
                
            } catch (error) {
                alert('Erro: ' + error.message);
            }
        });
    }
    
    // Configurar botão cancelar
    const cancelBtn = document.getElementById('cancel-btn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            const form = document.getElementById('aluno-form');
            form.reset();
            document.getElementById('aluno-id').value = '';
            document.getElementById('form-title').textContent = 'Adicionar Novo Aluno';
            document.getElementById('submit-btn').textContent = 'Salvar';
            this.style.display = 'none';
        });
    }
    
    // Carregar alunos inicialmente
    carregarAlunos();
    console.log('✅ Tudo configurado! Pronto para usar.');
});

// Funções globais para os botões (importante!)
window.editarAluno = editarAluno;
window.excluirAluno = excluirAluno;