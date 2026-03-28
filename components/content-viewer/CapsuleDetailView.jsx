"use client";

import { useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Layers3, Sparkles } from "lucide-react";
import { useApp } from "@/components/AuthProvider";
import { ContactDesignerButton } from "@/components/content-viewer/ContactDesignerButton";
import { EntityCardLink } from "@/components/content-viewer/EntityCardLink";
import { resolveCapsuleByRouteId } from "@/lib/entity-resolvers";

const ui = {
  notFound: "Капсула не найдена или ещё не успела загрузиться.",
  back: "Назад к просмотру",
  designer: "Дизайнер",
  items: "Вещей",
  budget: "Бюджет",
  contact: "Связаться с дизайнером",
  styleLogic: "Почему эта капсула работает",
  includedItems: "Вещи внутри капсулы",
  openItem: "Открыть",
  viewItems: "Смотреть вещи"
};

function formatCurrency(value) {
  return `${Number(value || 0).toLocaleString("ru-RU")} ₽`;
}

export function CapsuleDetailView() {
  const itemsScrollRef = useRef(null);
  const params = useParams();
  const appState = useApp();
  const capsule = resolveCapsuleByRouteId(params.capsuleId, appState);

  if (!capsule) {
    return (
      <div className="page-grid">
        <div className="empty-block">{ui.notFound}</div>
      </div>
    );
  }

  const galleryImages = [...new Set([...(capsule.items || []).map((item) => item.image), ...(capsule.previewImages || [])])]
    .filter(Boolean)
    .slice(0, 6);

  return (
    <div className="page-grid detail-page-shell">
      <div className="detail-shell capsule-detail-shell detail-shell-compact">
        <div className="detail-breadcrumbs detail-breadcrumbs-minimal">
          <Link className="mini-link" href="/feed">
            <ArrowLeft size={14} />
            {ui.back}
          </Link>
        </div>

        <section className="detail-hero detail-stage detail-stage-tight detail-stage-capsule-focus">
          <div className="detail-media-column detail-media-column-tight">
            <div className="detail-hero-gallery detail-gallery-compact detail-gallery-auto">
              {galleryImages.map((image, index) => (
                <div
                  key={`${capsule.routeId}-${index}`}
                  className={`detail-preview-tile detail-preview-tile-${index + 1}`}
                  style={{ "--preview": `url(${image})` }}
                />
              ))}
            </div>
          </div>

          <div className="detail-copy-column detail-copy-column-tight detail-copy-column-capsule">
            <div className="detail-title-block detail-title-block-tight">
              <h1 className="detail-title-single-line" title={capsule.name}>{capsule.name}</h1>
              <p className="detail-description-clamped">{capsule.description}</p>
            </div>

            <div className="detail-summary-row detail-summary-row-capsule">
              <article className="detail-info-card">
                <span>{ui.designer}</span>
                <strong>{capsule.designer}</strong>
              </article>
              <article className="detail-info-card">
                <span>{ui.items}</span>
                <strong>{capsule.itemsCount}</strong>
              </article>
              <article className="detail-info-card detail-info-card-contrast">
                <span>{ui.budget}</span>
                <strong>{formatCurrency(capsule.totalPrice)}</strong>
              </article>
            </div>

            <article className="detail-panel detail-panel-wide detail-panel-editorial">
              <div className="detail-panel-head">
                <span className="detail-panel-label">Style logic</span>
                <h2>{ui.styleLogic}</h2>
              </div>
              <p className="detail-copy-clamped detail-copy-clamped-capsule">{capsule.styleLogic}</p>
            </article>

            <article className="detail-panel detail-panel-wide detail-panel-subtle detail-panel-scrollable" id="capsule-items">
              <div className="detail-panel-head detail-panel-head-inline">
                <span className="detail-panel-label">{ui.includedItems}</span>
                <button
                  className="detail-inline-link detail-inline-link-button"
                  type="button"
                  onClick={() => itemsScrollRef.current?.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  <Layers3 size={14} />
                  {ui.viewItems}
                </button>
              </div>

              <div className="detail-items-scroll" ref={itemsScrollRef}>
                <div className="detail-inline-list detail-inline-list-compact">
                  {capsule.items.map((item) => (
                    <EntityCardLink
                      key={item.routeId}
                      as="article"
                      className="detail-inline-item"
                      entity={item}
                      entityType="item"
                      ariaLabel={`${ui.openItem} ${item.title}`}
                    >
                      <div className="detail-inline-thumb">
                        <img src={item.image} alt={item.title} />
                      </div>
                      <div className="detail-inline-copy">
                        <strong>{item.title}</strong>
                        <span>{item.categoryLabel} · {formatCurrency(item.price)}</span>
                      </div>
                      <span className="detail-item-link">
                        <Sparkles size={14} />
                        {ui.openItem}
                      </span>
                    </EntityCardLink>
                  ))}
                </div>
              </div>
            </article>

            <div className="detail-helper-row">
              <div className="detail-tags-inline" aria-label="Стили капсулы">
                {capsule.tags.map((tag, index) => (
                  <span key={`${capsule.routeId}-tag-${index}`}>{index ? ` · ${tag}` : tag}</span>
                ))}
              </div>
            </div>

            <div className="detail-bottom-cta">
              <ContactDesignerButton
                designer={capsule.designerMeta.slug}
                contextType="capsule"
                contextId={capsule.routeId}
                contextTitle={capsule.name}
                label={ui.contact}
                className="primary-btn detail-primary-wide-btn"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
