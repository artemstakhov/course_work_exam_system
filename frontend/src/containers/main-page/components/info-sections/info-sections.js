import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGraduationCap, 
  faChalkboardTeacher, 
  faCheckCircle, 
  faClock,
  faChartLine,
  faPlus,
  faLock,
  faUsers
} from '@fortawesome/free-solid-svg-icons';
import './info-sections.scss';

function InfoSections() {
  return (
    <div className="info-sections">
      <section className="info-section info-section--students" id="students">
        <div className="info-section__container">
          <div className="info-section__header">
            <FontAwesomeIcon icon={faGraduationCap} className="info-section__icon" />
            <h2 className="info-section__title">Для студентів</h2>
            <p className="info-section__subtitle">
              Перевірте свої знання та покращуйте результати
            </p>
          </div>
          
          <div className="info-section__features">
            <div className="feature-card">
              <div className="feature-card__icon">
                <FontAwesomeIcon icon={faCheckCircle} />
              </div>
              <h3 className="feature-card__title">Проходьте тести</h3>
              <p className="feature-card__description">
                Обирайте з публічних тестів або використовуйте приватні ключі для доступу до закритих тестів
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-card__icon">
                <FontAwesomeIcon icon={faClock} />
              </div>
              <h3 className="feature-card__title">Відстежуйте час</h3>
              <p className="feature-card__description">
                Кожен тест має таймер - тренуйтеся відповідати швидко та точно
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-card__icon">
                <FontAwesomeIcon icon={faChartLine} />
              </div>
              <h3 className="feature-card__title">Переглядайте результати</h3>
              <p className="feature-card__description">
                Миттєвий підрахунок балів та історія пройдених тестів у вашому профілі
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="info-section info-section--teachers" id="teachers">
        <div className="info-section__container">
          <div className="info-section__header">
            <FontAwesomeIcon icon={faChalkboardTeacher} className="info-section__icon" />
            <h2 className="info-section__title">Для викладачів</h2>
            <p className="info-section__subtitle">
              Створюйте тести та відстежуйте успішність студентів
            </p>
          </div>
          
          <div className="info-section__features">
            <div className="feature-card">
              <div className="feature-card__icon">
                <FontAwesomeIcon icon={faPlus} />
              </div>
              <h3 className="feature-card__title">Створюйте тести</h3>
              <p className="feature-card__description">
                Легкий конструктор тестів з можливістю додавання зображень та різних типів питань
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-card__icon">
                <FontAwesomeIcon icon={faLock} />
              </div>
              <h3 className="feature-card__title">Контролюйте доступ</h3>
              <p className="feature-card__description">
                Робіть тести публічними або приватними з унікальним ключем доступу
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-card__icon">
                <FontAwesomeIcon icon={faUsers} />
              </div>
              <h3 className="feature-card__title">Аналізуйте статистику</h3>
              <p className="feature-card__description">
                Переглядайте кількість учасників та керуйте своїми тестами
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="info-section info-section--about" id="about">
        <div className="info-section__container">
          <div className="info-section__content-wrapper">
            <div className="info-section__text">
              <h2 className="info-section__title">Про систему</h2>
              <p className="info-section__description">
                UZH Test - це сучасна платформа для створення та проходження онлайн-тестів. 
                Система розроблена для полегшення процесу перевірки знань та надання миттєвого зворотного зв'язку.
              </p>
              <p className="info-section__description">
                Простий інтерфейс, швидка робота та безпека даних - наші головні пріоритети.
              </p>
            </div>
            
            <div className="info-section__stats">
              <div className="stat-item">
                <div className="stat-item__value">100%</div>
                <div className="stat-item__label">Безкоштовно</div>
              </div>
              <div className="stat-item">
                <div className="stat-item__value">24/7</div>
                <div className="stat-item__label">Доступність</div>
              </div>
              <div className="stat-item">
                <div className="stat-item__value">∞</div>
                <div className="stat-item__label">Можливості</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default InfoSections;
