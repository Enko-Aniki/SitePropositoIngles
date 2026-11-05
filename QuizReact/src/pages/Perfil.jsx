import React, { useContext, useMemo, useState } from 'react';
import { AuthContext, profileAvatarOptions } from '../context/auth';

import './Perfil.css';

export default function Perfil() {
  const { user, updateUser, getQuizAvailabilityInfo } = useContext(AuthContext);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  const quizAvailability = useMemo(() => getQuizAvailabilityInfo(), [getQuizAvailabilityInfo]);

  const handleAvatarChange = (avatar) => {
    updateUser({ avatar });
    setShowAvatarPicker(false);
  };

  const totalAttempts = user?.quizHistory?.length ?? 0;
  const formattedTime = quizAvailability.nextAvailableInMs
    ? new Date(quizAvailability.nextAvailableInMs).toISOString().slice(11, 19)
    : 'agora';

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar-wrap">
            <img src={user?.avatar || profileAvatarOptions[0].src} alt="User Avatar" className="profile-avatar" />
            <button type="button" className="avatar-change-btn" onClick={() => setShowAvatarPicker((prev) => !prev)}>
              Alterar foto
            </button>
          </div>

          {showAvatarPicker && (
            <div className="avatar-picker">
              {profileAvatarOptions.map((avatar) => (
                <button
                  key={avatar.id}
                  type="button"
                  className="avatar-option"
                  onClick={() => handleAvatarChange(avatar.src)}
                  aria-label={`Selecionar avatar ${avatar.id}`}
                >
                  <img src={avatar.src} alt={`avatar ${avatar.id}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="profile-body">
          <span className="profile-badge">Usuário</span>
          <h2 className="profile-name">{user?.username || 'Nome Perfil'}</h2>
          <p className="profile-email">{user?.email || 'email@exemplo.com'}</p>

          <div className="profile-score-box">
            <span className="score-label">Pontuação total</span>
            <strong className="score-value">{user?.totalScore ?? 0}</strong>
          </div>

          <div className="profile-stats">
            <div className="stat-item">
              <span>Quiz hoje</span>
              <strong>{quizAvailability.used}/{quizAvailability.limit}</strong>
            </div>
            <div className="stat-item">
              <span>Jogos concluídos</span>
              <strong>{totalAttempts}</strong>
            </div>
          </div>

          {!quizAvailability.canPlay && (
            <div className="profile-lock">
              Limite atingido. Próximo quiz em <strong>{formattedTime}</strong>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}