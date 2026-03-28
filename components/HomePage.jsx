"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { BarChart3, Bot, CircleDollarSign, MessageCircle, ShoppingBag, Sparkles } from "lucide-react";
import { useApp } from "@/components/AuthProvider";
import { Reveal } from "@/components/Reveal";
import { AuthSceneCarousel } from "@/components/AuthSceneCarousel";
import { PremiumHero } from "@/components/PremiumHero";

export function HomePage() {
  const router = useRouter();
  const { user, setAuthOpen, featuredCapsules } = useApp();
  const featureCards = [
    {
      icon: Bot,
      title: "ИИ-подборщик",
      text: "Персональные капсулы на основе роста, фигуры, сезона, палитры и бюджета.",
    },
    {
      icon: BarChart3,
      title: "Аналитика продаж",
      text: "Дизайнеры видят просмотры, клики, сохранения и реальные сигналы спроса.",
    },
    {
      icon: Sparkles,
      title: "Социальная лента",
      text: "Лайки, комментарии, подписки и охваты работают как fashion-сообщество.",
    },
    {
      icon: MessageCircle,
      title: "Прямой чат",
      text: "Клиент может сразу связаться с дизайнером, уточнить детали и договориться о покупке.",
    },
    {
      icon: CircleDollarSign,
      title: "Быстрый заказ",
      text: "От понравившейся вещи до заявки и покупки без длинного пути и посредников.",
    },
    {
      icon: ShoppingBag,
      title: "Конструктор капсул",
      text: "Образ собирается по ролям: верх, низ, верхний слой, обувь и акцент.",
    },
  ];

  if (!user.authenticated) {
    return <PremiumHero onStart={() => setAuthOpen(true)} />;
  }

  if (!user.authenticated) {
    return (
      <section className="auth-landing auth-landing-minimal">
        <div className="auth-landing-copy auth-landing-copy-centered">
          <h1 className="auth-headline">
            <span className="auth-headline-line">Дизайнеры становятся заметнее.</span>
            <span className="auth-headline-line">Пользователи собирают</span>
            <span className="auth-headline-line accent">лук, а не хаос из вещей.</span>
          </h1>

          <p className="hero-text auth-subtitle">
            Лента, AI-подбор и прямой контакт с дизайнером собраны в одном сценарии, чтобы вещь можно было найти, примерить в капсуле и сразу обсудить покупку.
          </p>

          <AuthSceneCarousel />

          <div className="center-cta">
            <button className="primary-btn hero-cta" onClick={() => setAuthOpen(true)}>
              Начать работу
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="page-grid">
      <Reveal>
        <section className="hero-grid hero-grid-balanced">
          <div className="hero-copy hero-copy-wide">
            <h1>Находи вещи дизайнеров, которые складываются в цельный образ.</h1>
            <p className="hero-text hero-text-left">
              Лента, AI-подбор и прямой контакт с дизайнером собраны в одном интерфейсе, чтобы ты быстрее находил нужный лук и мог сразу перейти к покупке.
            </p>
            <div className="hero-actions">
              <Link className="primary-btn" href="/feed">
                Смотреть ленту
              </Link>
              <Link className="ghost-btn" href="/ai">
                Собрать капсулу
              </Link>
            </div>
          </div>

          <article className="hero-editorial-card hero-editorial-card-compact">
            <div className="hero-editorial-image"></div>
            <div className="hero-editorial-copy">
              <span className="status-badge">AI Match 96%</span>
              <h2>Soft City Capsule</h2>
              <p>Собрана под городской ритм, мягкую палитру и бюджет до 30 000 ₽.</p>
            </div>
          </article>
        </section>
      </Reveal>

      <Reveal delay={80}>
        <section className="curation-strip">
          <article className="curation-item">
            <span>120+</span>
            <p>брендов и fashion-авторов уже в выдаче</p>
          </article>
          <article className="curation-item">
            <span>5 ролей</span>
            <p>верх, низ, верхний слой, обувь и акцент внутри одной капсулы</p>
          </article>
          <article className="curation-item">
            <span>AI first</span>
            <p>поиск учитывает стиль, сезон, ограничения и бюджет без лишнего шума</p>
          </article>
        </section>
      </Reveal>

      <Reveal delay={120}>
        <section className="steps-section customer-journey">
          <div className="steps-head">
            <div className="steps-intro">
              <h2>Четыре этапа от публикации вещи до связи с дизайнером.</h2>
              <p className="section-intro">
                Весь путь собран в одну понятную схему: вещь попадает в систему, пользователь задаёт параметры, AI собирает комплект и дальше можно сразу выйти на покупку.
              </p>
            </div>
            <div className="steps-note">
              <strong>После подбора пользователь не теряется в интерфейсе</strong>
              <p>Из капсулы можно перейти к дизайнеру, задать вопрос, обсудить детали и оформить покупку понравившейся вещи.</p>
            </div>
          </div>

          <div className="steps-line journey-line">
            <article className="step-item">
              <div className="step-marker">01</div>
              <h3>Публикация вещи</h3>
              <p>Дизайнер добавляет вещь как продукт с фото, описанием, категорией и ценой.</p>
            </article>
            <article className="step-item">
              <div className="step-marker">02</div>
              <h3>Параметры пользователя</h3>
              <p>Стиль, сезон, фигура и бюджет превращаются в ясный и короткий запрос.</p>
            </article>
            <article className="step-item">
              <div className="step-marker">03</div>
              <h3>Сборка капсулы</h3>
              <p>AI подбирает верх, низ, обувь, верхний слой и акцент так, чтобы всё работало вместе.</p>
            </article>
            <article className="step-item">
              <div className="step-marker">04</div>
              <h3>Связь и покупка</h3>
              <p>Пользователь открывает профиль дизайнера, пишет ему в чат и переходит к покупке выбранной вещи.</p>
            </article>
          </div>
        </section>
      </Reveal>

      <Reveal delay={160}>
        <section className="steps-section designer-steps-section designer-journey">
          <div className="steps-head">
            <div className="steps-intro">
              <h2>Четыре этапа до первой продажи на платформе.</h2>
              <p className="section-intro">
                Для дизайнера путь тоже собран ясно: оформить профиль, опубликовать вещи, попасть в рекомендации и получить первый прямой запрос от аудитории.
              </p>
            </div>
            <div className="steps-note">
              <strong>Платформа ведёт от публикации к реальному спросу</strong>
              <p>Вещи попадают в ленту, AI-капсулы и персональные рекомендации, а значит дизайнер быстрее получает первые заявки.</p>
            </div>
          </div>

          <div className="steps-line journey-line">
            <article className="step-item">
              <div className="step-marker">01</div>
              <h3>Оформить профиль</h3>
              <p>Дизайнер задаёт псевдоним, описание и визуальный стиль, чтобы кабинет выглядел как полноценный бренд.</p>
            </article>
            <article className="step-item">
              <div className="step-marker">02</div>
              <h3>Опубликовать вещи</h3>
              <p>В каталог добавляются фото, описание, категория, цена и стилистические теги для точной выдачи.</p>
            </article>
            <article className="step-item">
              <div className="step-marker">03</div>
              <h3>Попасть в рекомендации</h3>
              <p>Платформа показывает вещи в ленте и AI-капсулах тем пользователям, которым они действительно подходят.</p>
            </article>
            <article className="step-item">
              <div className="step-marker">04</div>
              <h3>Получить первую продажу</h3>
              <p>Пользователь сохраняет вещь, пишет дизайнеру напрямую и оформляет покупку без лишних посредников.</p>
            </article>
          </div>
        </section>
      </Reveal>

      <Reveal delay={200}>
        <section className="content-section">
          <div className="section-head compact-head">
            <div className="story-lead">
              <h2>Готовые капсулы от дизайнеров</h2>
              <p className="section-intro">
                Эти подборки уже собраны как законченные решения. Их можно открыть, изучить и использовать как старт для собственного AI-поиска.
              </p>
            </div>

            <button className="text-link" onClick={() => router.push("/feed")}>
              Открыть всю ленту
            </button>
          </div>

          <div className="featured-grid">
            {featuredCapsules.map((capsule) => (
              <article className="featured-card" key={capsule.id}>
                <div className="featured-image" style={{ "--preview": `url(${capsule.image})` }}></div>
                <div className="featured-content">
                  <p className="featured-label">Capsule edit</p>
                  <h3>{capsule.name}</h3>
                  <p className="muted-text">{capsule.designer}</p>
                  <div className="featured-meta">
                    <span>{capsule.itemsCount} вещей</span>
                    <span>{capsule.price.toLocaleString("ru-RU")} ₽</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal delay={240}>
        <section className="home-dark-block">
          <div className="home-dark-head">
            <h2>Все в одном месте</h2>
            <p>
              Платформа соединяет AI-подбор, ленту, покупку, чат и аналитику в одном сценарии, чтобы и клиент, и
              дизайнер двигались по понятному маршруту.
            </p>
          </div>

          <div className="home-dark-grid">
            {featureCards.map(({ icon: Icon, title, text }, index) => (
              <article className="home-dark-card" key={title} style={{ "--delay": `${index * 70}ms` }}>
                <div className="home-dark-icon">
                  <Icon size={20} strokeWidth={1.9} />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal delay={280}>
        <section className="home-dark-cta">
          <div className="home-dark-cta-inner">
            <h2>
              Начни находить
              <span> свой стиль</span>
            </h2>
            <p>
              Более 1 200 дизайнеров уже в выдаче. Можно собрать капсулу, написать автору напрямую и сразу перейти к
              покупке без лишних шагов.
            </p>

            <div className="home-dark-actions">
              <Link className="home-dark-primary" href="/ai">
                Подобрать гардероб бесплатно
              </Link>
              <button className="home-dark-secondary" onClick={() => setAuthOpen(true)}>
                Зарегистрироваться как дизайнер
              </button>
            </div>
          </div>

          <div className="home-dark-footer">
            <div className="home-dark-brand">
              <span className="home-dark-brand-mark">Л</span>
              <strong>Лань AI</strong>
            </div>

            <p>© 2026 Лань AI. Платформа для дизайнеров одежды.</p>

            <div className="home-dark-links">
              <button type="button" onClick={() => router.push("/feed")}>
                Лента
              </button>
              <button type="button" onClick={() => router.push("/ai")}>
                AI-конструктор
              </button>
              <button type="button" onClick={() => router.push("/profile")}>
                Профиль
              </button>
            </div>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
