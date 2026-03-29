"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BarChart3, Bot, CircleDollarSign, MessageCircle, ShoppingBag, Sparkles } from "lucide-react";
import { useApp } from "@/components/AuthProvider";
import { EntityCardLink } from "@/components/content-viewer/EntityCardLink";
import { Reveal } from "@/components/Reveal";
import { PremiumHero } from "@/components/PremiumHero";

export function HomePage() {
  const router = useRouter();
  const { user, setAuthOpen, featuredCapsules, authOpen, products } = useApp();
  const productById = useMemo(() => new Map(products.map((item) => [item.id, item])), [products]);
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
    return <PremiumHero onStart={() => setAuthOpen(true)} authModalOpen={authOpen} />;
  }


  return (
    <div className="page-grid">
      <Reveal>
        <section className="hero-section">
          <div className="hero-layout-container">
            <div className="hero-grid hero-grid-balanced">
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
                <div className="hero-editorial-image" aria-hidden="true">
                  <div className="hero-capsule-grid">
                    <div className="hero-capsule-tile hero-capsule-tile-1"></div>
                    <div className="hero-capsule-tile hero-capsule-tile-2"></div>
                    <div className="hero-capsule-tile hero-capsule-tile-3"></div>
                    <div className="hero-capsule-tile hero-capsule-tile-4"></div>
                    <div className="hero-capsule-tile hero-capsule-tile-5"></div>
                  </div>
                </div>
                <div className="hero-editorial-copy">
                  <span className="status-badge">AI Match 96%</span>
                  <h2>Soft City Capsule</h2>
                  <p>Собрана под городской ритм, мягкую палитру и бюджет до 30 000 ₽.</p>
                </div>
              </article>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal delay={80}>
        <section className="curation-strip">
          <article className="curation-item">
            <span>Прямой чат</span>
            <p>покупатель может быстро написать дизайнеру и обсудить вещь без долгого пути</p>
          </article>
          <article className="curation-item">
            <span>5 ролей</span>
            <p>верх, низ, верхний слой, обувь и акцент внутри одной капсулы</p>
          </article>
          <article className="curation-item">
            <span>AI first</span>
            <p>поиск учитывает стиль, сезон, ограничения и бюджет</p>
          </article>
        </section>
      </Reveal>

      <Reveal delay={120}>
        <section className="steps-section customer-journey">
          <div className="steps-head">
            <div className="steps-intro">
              <h2>Четыре этапа от регистрации до связи с дизайнером.</h2>
            </div>
            <div className="steps-note">
              <strong>После подбора пользователь не теряется в интерфейсе</strong>
              <p>Из капсулы можно перейти к дизайнеру, задать вопрос и обсудить детали понравившейся вещи.</p>
            </div>
          </div>

          <div className="steps-line journey-line">
            <article className="step-item">
              <div className="step-marker">01</div>
              <h3>Регистрация</h3>
              <p>Пользователь создаёт аккаунт, чтобы открыть AI-подбор, сохранять капсулы и связываться с дизайнерами.</p>
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
              <h3>Связь с дизайнером</h3>
              <p>Пользователь открывает профиль дизайнера, пишет ему в чат и уточняет детали по выбранной вещи.</p>
            </article>
          </div>
        </section>
      </Reveal>

      <Reveal delay={160}>
        <section className="steps-section designer-steps-section designer-journey">
          <div className="steps-head">
            <div className="steps-intro">
              <h2>Четыре этапа до первой продажи на платформе.</h2>
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
              <h3>Капсулы и рекомендации</h3>
              <p>Дизайнер может собирать капсулы из своих вещей, а пользователи увидят их в ленте и AI-подборках, когда они подходят по стилю и параметрам.</p>
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
            </div>
            <div className="story-summary steps-note">
              <strong>Готовые капсулы как старт для подбора</strong>
              <p className="section-intro">
                Эти подборки уже собраны как законченные решения. Их можно открыть, изучить и использовать как старт для собственного AI-поиска.
              </p>
            </div>
          </div>

          <div className="featured-grid">
            {featuredCapsules.map((capsule) => {
              const itemPreviewImages = (capsule.itemIds || [])
                .map((id) => productById.get(id)?.image)
                .filter(Boolean);
              const previewImages = [...new Set([...itemPreviewImages, ...(capsule.previewImages || []), capsule.image])]
                .filter(Boolean)
                .slice(0, 5);

              return (
                <EntityCardLink
                  as="article"
                  className="featured-card"
                  key={capsule.id}
                  entity={capsule}
                  entityType="capsule"
                  ariaLabel={`Открыть капсулу ${capsule.name}`}
                >
                  <div className="featured-capsule-preview" aria-hidden="true">
                    {previewImages.map((image, index) => (
                      <div
                        key={`${capsule.id}-${index}`}
                        className={`featured-capsule-tile featured-capsule-tile-${index + 1}`}
                        style={{ "--preview": `url(${image})` }}
                      ></div>
                    ))}
                  </div>
                  <div className="featured-content">
                    <h3>{capsule.name}</h3>
                    <p className="muted-text">{capsule.designer}</p>
                    <div className="featured-meta">
                      <span>{capsule.itemsCount} вещей</span>
                      <span>{capsule.price.toLocaleString("ru-RU")} ₽</span>
                    </div>
                  </div>
                </EntityCardLink>
              );
            })}
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
