import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import './not-found-page.scss';

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <div className="not-found-content">
          <div className="error-code">404</div>
          
          <div className="error-illustration">
            <div className="floating-icons">
              <span className="icon-1">📝</span>
              <span className="icon-2">📚</span>
              <span className="icon-3">🎓</span>
              <span className="icon-4">✏️</span>
              <span className="icon-5">📖</span>
            </div>
          </div>
          
          <h1 className="error-title">Сторінку не знайдено</h1>
          <p className="error-description">
            На жаль, сторінка, яку ви шукаєте, не існує або була переміщена.
            <br />
            Можливо, тест був видалений або посилання застаріло.
          </p>
          
          <div className="error-actions">
            <Link to="/" className="error-btn error-btn--primary">
              <FontAwesomeIcon icon={faHome} />
              Повернутися на головну
            </Link>
            <Link to="/" className="error-btn error-btn--secondary">
              <FontAwesomeIcon icon={faSearch} />
              Шукати тести
            </Link>
          </div>
          
          <div className="error-tips">
            <h3>Що можна зробити?</h3>
            <ul>
              <li>Перевірте правильність введеної адреси</li>
              <li>Поверніться на головну та знайдіть потрібний тест</li>
              <li>Скористайтеся пошуком на головній сторінці</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
