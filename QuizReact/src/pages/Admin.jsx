import React, { useState, useContext } from 'react';
import './Admin.css';
import { AuthContext } from '../context/auth';
import { QuestionsContext } from '../context/questions';
import { createUserAccount, getRegisteredUsers } from '../data/admlogin';

export default function Admin() {
  const { user } = useContext(AuthContext);
  const {
    quizData, addQuizQuestion, updateQuizQuestion, deleteQuizQuestion,
    dragData, addDragQuestion, updateDragQuestion, deleteDragQuestion,
    hangmanData, addHangmanWord, updateHangmanWord, deleteHangmanWord
  } = useContext(QuestionsContext);

  const [gameType, setGameType] = useState('quiz');
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [activeSection, setActiveSection] = useState('content');
  const [initialRegisteredUserState] = useState(() => {
    try {
      return {
        users: getRegisteredUsers().map(({ id, username, role }) => ({ id, username, role })),
        error: '',
      };
    } catch (error) {
      console.error('Error loading registered users:', error);
      return {
        users: [],
        error: 'Não foi possível carregar as contas cadastradas.',
      };
    }
  });
  const [registeredUsers, setRegisteredUsers] = useState(initialRegisteredUserState.users);
  const [userFormData, setUserFormData] = useState({ username: '', password: '', confirmPassword: '' });
  const [userError, setUserError] = useState(initialRegisteredUserState.error);

  // Form states
  const [formData, setFormData] = useState(getInitialFormData());

  function getInitialFormData(type = gameType) {
  if (type === 'quiz') {
    return { question: '', options: ['', '', '', ''], answer: '', tip: '' };
  } else if (type === 'drag') {
    return { sentence: '', tip: '' };
  } else {
    return { word: '', hint: '' };
  }
}

const handleGameTypeChange = (type) => {
  setGameType(type);
  setSelectedCategory(0);
  setEditingIndex(null);
  setShowForm(false);
  setFormData(getInitialFormData(type)); // <-- passa o tipo novo
};

  const handleCategoryChange = (index) => {
    setSelectedCategory(index);
    setEditingIndex(null);
    setShowForm(false);
    setFormData(getInitialFormData());
  };

  const handleFormChange = (field, value, index = null) => {
    if (index !== null && field === 'options') {
      const newOptions = [...formData.options];
      newOptions[index] = value;
      setFormData({ ...formData, options: newOptions });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleAdd = () => {
    setEditingIndex(null);
    setShowForm(true);
    setFormData(getInitialFormData());
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setShowForm(true);

    if (gameType === 'quiz') {
      const question = quizData[selectedCategory].questions[index];
      setFormData({
        question: question.question,
        options: [...question.options],
        answer: question.answer,
        tip: question.tip || ''
      });
    } else if (gameType === 'drag') {
      const sentence = dragData[selectedCategory].questions[index];
      setFormData({
        sentence: sentence.sentence,
        tip: sentence.tip || ''
      });
    } else {
      const word = hangmanData[selectedCategory].words[index];
      setFormData({
        word: word.word,
        hint: word.hint || ''
      });
    }
  };

  const handleDelete = (index) => {
    if (window.confirm('Tem certeza que quer deletar este item?')) {
      if (gameType === 'quiz') {
        deleteQuizQuestion(selectedCategory, index);
      } else if (gameType === 'drag') {
        deleteDragQuestion(selectedCategory, index);
      } else {
        deleteHangmanWord(selectedCategory, index);
      }
      showSuccess('Item deletado com sucesso!');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (gameType === 'quiz') {
      if (!formData.question || formData.options.some(o => !o) || !formData.answer) {
        alert('Por favor preencha todos os campos obrigatórios');
        return;
      }
      if (!formData.options.includes(formData.answer)) {
        alert('A resposta deve estar entre as opções');
        return;
      }

      if (editingIndex !== null) {
        updateQuizQuestion(selectedCategory, editingIndex, formData);
        showSuccess('Pergunta atualizada com sucesso!');
      } else {
        addQuizQuestion(selectedCategory, formData);
        showSuccess('Pergunta criada com sucesso!');
      }
    } else if (gameType === 'drag') {
      if (!formData.sentence) {
        alert('Por favor preencha a frase');
        return;
      }
      if (editingIndex !== null) {
        updateDragQuestion(selectedCategory, editingIndex, formData);
        showSuccess('Frase atualizada com sucesso!');
      } else {
        addDragQuestion(selectedCategory, formData);
        showSuccess('Frase criada com sucesso!');
      }
    } else {
      if (!formData.word) {
        alert('Por favor preencha a palavra');
        return;
      }
      if (editingIndex !== null) {
        updateHangmanWord(selectedCategory, editingIndex, formData);
        showSuccess('Palavra atualizada com sucesso!');
      } else {
        addHangmanWord(selectedCategory, formData);
        showSuccess('Palavra criada com sucesso!');
      }
    }

    setShowForm(false);
    setFormData(getInitialFormData());
    setEditingIndex(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingIndex(null);
    setFormData(getInitialFormData());
  };

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    setUserError('');

    if (userFormData.password !== userFormData.confirmPassword) {
      setUserError('As senhas não coincidem.');
      return;
    }

    try {
      const newUser = createUserAccount(userFormData.username, userFormData.password);
      setRegisteredUsers((currentUsers) => [...currentUsers, newUser]);
      setUserFormData({ username: '', password: '', confirmPassword: '' });
      showSuccess('Conta criada com sucesso!');
    } catch (error) {
      console.error('Error creating user account:', error);
      setUserError(error instanceof Error ? error.message : 'Não foi possível criar a conta.');
    }
  };

  const currentData = gameType === 'quiz' ? quizData :
                     gameType === 'drag' ? dragData : hangmanData;
  const currentCategory = currentData[selectedCategory];

  return (
    <div className="admin-container">
      {/* Access Control Check */}
      {user?.role !== 'admin' && (
        <div className="admin-denied">
          <h2>Acesso Negado</h2>
          <p>Apenas administradores têm acesso a esta página.</p>
        </div>
      )}

      {user?.role === 'admin' && (
        <>
          <div className="admin-header">
            <h1>Painel de Administração</h1>
            <p>Gerenciar usuários, perguntas e conteúdos</p>
          </div>

          {successMessage && <div className="success-message">{successMessage}</div>}

          <div className="game-selector admin-section-selector">
            <button
              type="button"
              className={`game-btn ${activeSection === 'content' ? 'active' : ''}`}
              onClick={() => setActiveSection('content')}
            >
              Gerenciar conteúdo
            </button>
            <button
              type="button"
              className={`game-btn ${activeSection === 'users' ? 'active' : ''}`}
              onClick={() => setActiveSection('users')}
            >
              Usuários
            </button>
          </div>

          {activeSection === 'content' && (
            <>
          {/* Game Type Selector */}
          <div className="game-selector">
            <button
              className={`game-btn ${gameType === 'quiz' ? 'active' : ''}`}
              onClick={() => handleGameTypeChange('quiz')}
            >
              📝 Quiz
            </button>
            <button
              className={`game-btn ${gameType === 'drag' ? 'active' : ''}`}
              onClick={() => handleGameTypeChange('drag')}
            >
              🎯 Drag & Drop
            </button>
            <button
              className={`game-btn ${gameType === 'hangman' ? 'active' : ''}`}
              onClick={() => handleGameTypeChange('hangman')}
            >
              🎮 Hangman
            </button>
          </div>

          {/* Category Selector */}
          <div className="category-selector">
            {currentData.map((cat, index) => (
              <button
                key={index}
                className={`category-btn ${selectedCategory === index ? 'active' : ''}`}
                onClick={() => handleCategoryChange(index)}
              >
                {cat.category}
              </button>
            ))}
          </div>

          {/* Add Button */}
          <div className="action-buttons">
            <button className="add-btn" onClick={handleAdd}>
              ➕ Adicionar Novo Item
            </button>
          </div>

          {/* Form */}
          {showForm && (
            <form className="admin-form" onSubmit={handleSubmit}>
              <div className="form-title">
                {editingIndex !== null ? 'Editar Item' : 'Criar Novo Item'}
              </div>

              {gameType === 'quiz' && (
                <>
                  <div className="form-group">
                    <label>Pergunta *</label>
                    <textarea
                      value={formData.question}
                      onChange={(e) => handleFormChange('question', e.target.value)}
                      placeholder="Digite a pergunta"
                      rows={3}
                    />
                  </div>

                  <div className="form-group">
                    <label>Opções *</label>
                    {formData.options.map((option, idx) => (
                      <input
                        key={idx}
                        type="text"
                        value={option}
                        onChange={(e) => handleFormChange('options', e.target.value, idx)}
                        placeholder={`Opção ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <div className="form-group">
                    <label>Resposta Correta *</label>
                    <select
                      value={formData.answer}
                      onChange={(e) => handleFormChange('answer', e.target.value)}
                    >
                      <option value="">Selecione a resposta correta</option>
                      {formData.options.map((option, idx) => (
                        option && <option key={idx} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Dica</label>
                    <input
                      type="text"
                      value={formData.tip}
                      onChange={(e) => handleFormChange('tip', e.target.value)}
                      placeholder="Digite uma dica (opcional)"
                    />
                  </div>
                </>
              )}

              {gameType === 'drag' && (
                <>
                  <div className="form-group">
                    <label>Frase *</label>
                    <textarea
                      value={formData.sentence}
                      onChange={(e) => handleFormChange('sentence', e.target.value)}
                      placeholder="Digite a frase"
                      rows={3}
                    />
                  </div>

                  <div className="form-group">
                    <label>Dica</label>
                    <textarea
                      value={formData.tip}
                      onChange={(e) => handleFormChange('tip', e.target.value)}
                      placeholder="Digite uma dica (opcional)"
                      rows={2}
                    />
                  </div>
                </>
              )}

              {gameType === 'hangman' && (
                <>
                  <div className="form-group">
                    <label>Palavra *</label>
                    <input
                      type="text"
                      value={formData.word}
                      onChange={(e) => handleFormChange('word', e.target.value.toUpperCase())}
                      placeholder="Digite a palavra em letras maiúsculas"
                    />
                  </div>

                  <div className="form-group">
                    <label>Dica *</label>
                    <textarea
                      value={formData.hint}
                      onChange={(e) => handleFormChange('hint', e.target.value)}
                      placeholder="Digite a dica"
                      rows={2}
                    />
                  </div>
                </>
              )}

              <div className="form-buttons">
                <button type="submit" className="submit-btn">
                  {editingIndex !== null ? '✏️ Atualizar' : '➕ Criar'}
                </button>
                <button type="button" className="cancel-btn" onClick={handleCancel}>
                  ✖️ Cancelar
                </button>
              </div>
            </form>
          )}

          {/* Items List */}
          <div className="items-list">
            <h3>
              {gameType === 'quiz' ? `${currentCategory.questions.length} Perguntas` :
               gameType === 'drag' ? `${currentCategory.questions.length} Frases` :
               `${currentCategory.words.length} Palavras`}
            </h3>

            {gameType === 'quiz' && (
              <div className="quiz-items">
                {currentCategory.questions.map((q, idx) => (
                  <div key={idx} className="item-card">
                    <div className="item-content">
                      <h4>{q.question}</h4>
                      <div className="options-list">
                        {q.options.map((opt, i) => (
                          <span key={i} className={opt === q.answer ? 'correct' : ''}>
                            {opt}
                          </span>
                        ))}
                      </div>
                      {q.tip && <p className="tip">💡 {q.tip}</p>}
                    </div>
                    <div className="item-actions">
                      <button className="edit-btn" onClick={() => handleEdit(idx)}>
                        ✏️ Editar
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(idx)}>
                        🗑️ Deletar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {gameType === 'drag' && (
              <div className="drag-items">
                {currentCategory.questions.map((q, idx) => (
                  <div key={idx} className="item-card">
                    <div className="item-content">
                      <h4>{q.sentence}</h4>
                      {q.tip && <p className="tip">💡 {q.tip}</p>}
                    </div>
                    <div className="item-actions">
                      <button className="edit-btn" onClick={() => handleEdit(idx)}>
                        ✏️ Editar
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(idx)}>
                        🗑️ Deletar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {gameType === 'hangman' && (
              <div className="hangman-items">
                {currentCategory.words.map((w, idx) => (
                  <div key={idx} className="item-card">
                    <div className="item-content">
                      <h4>{w.word}</h4>
                      <p className="hint">💡 {w.hint}</p>
                    </div>
                    <div className="item-actions">
                      <button className="edit-btn" onClick={() => handleEdit(idx)}>
                        ✏️ Editar
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(idx)}>
                        🗑️ Deletar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
            </>
          )}

          {activeSection === 'users' && (
            <section className="user-management">
              <form className="admin-form" onSubmit={handleCreateUser}>
                <h2 className="form-title">Criar conta de usuário</h2>
                <div className="form-group">
                  <label htmlFor="new-username">Nome de usuário *</label>
                  <input
                    id="new-username"
                    type="text"
                    autoComplete="off"
                    value={userFormData.username}
                    onChange={(e) => setUserFormData({ ...userFormData, username: e.target.value })}
                    placeholder="Digite um nome de usuário"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="new-password">Senha *</label>
                  <input
                    id="new-password"
                    type="password"
                    autoComplete="new-password"
                    value={userFormData.password}
                    onChange={(e) => setUserFormData({ ...userFormData, password: e.target.value })}
                    placeholder="Crie uma senha"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirm-password">Confirmar senha *</label>
                  <input
                    id="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    value={userFormData.confirmPassword}
                    onChange={(e) => setUserFormData({ ...userFormData, confirmPassword: e.target.value })}
                    placeholder="Digite a senha novamente"
                    required
                  />
                </div>
                {userError && <p className="admin-error-message" role="alert">{userError}</p>}
                <div className="form-buttons">
                  <button type="submit" className="submit-btn">Criar usuário</button>
                </div>
              </form>

              <div className="items-list">
                <h3>Contas criadas ({registeredUsers.length})</h3>
                {registeredUsers.length === 0 ? (
                  <p className="empty-users-message">Ainda não há contas criadas pelo administrador.</p>
                ) : (
                  <div className="users-list">
                    {registeredUsers.map((registeredUser) => (
                      <div className="user-card" key={registeredUser.id}>
                        <strong>{registeredUser.username}</strong>
                        <span>Usuário</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <p className="storage-notice">
                As contas ficam salvas neste navegador. Para produção, será necessário armazená-las em um servidor.
              </p>
            </section>
          )}
        </>
      )}
    </div>
  );
}
