"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useApp } from "@/components/AuthProvider";
import { ContactDesignerButton } from "@/components/content-viewer/ContactDesignerButton";
import { resolveItemByRouteId } from "@/lib/entity-resolvers";
import { getItemAssistantHref } from "@/lib/entity-navigation";

const ui = {
  notFound: "Вещь не найдена или ещё не успела загрузиться.",
  back: "Назад к ленте",
  price: "Цена",
  write: "Написать дизайнеру",
  askAi: "Спроси у AI, с чем это сочетается",
  aboutDesigner: "О дизайнере",
  styles: "Стили"
};

function formatCurrency(value) {
  return `${Number(value || 0).toLocaleString("ru-RU")} ₽`;
}

export function ItemDetailView() {
  const params = useParams();
  const appState = useApp();
  const item = resolveItemByRouteId(params.itemId, appState);

  if (!item) {
    return (
      <div className="page-grid">
        <div className="empty-block">{ui.notFound}</div>
      </div>
    );
  }

  return (
    <div className="page-grid detail-page-shell">
      <div className="detail-shell item-detail-shell detail-shell-compact">
        <div className="detail-breadcrumbs detail-breadcrumbs-minimal">
          <Link className="mini-link" href="/feed">
            <ArrowLeft size={14} />
            {ui.back}
          </Link>
        </div>

        <section className="detail-hero detail-stage detail-stage-tight detail-stage-item-focus">
          <div className="detail-media-column detail-media-column-tight">
            <div className="detail-main-image detail-main-image-compact">
              <img src={item.image} alt={item.title} />
            </div>
          </div>

          <div className="detail-copy-column detail-copy-column-tight detail-copy-column-item">
            <div className="detail-title-block detail-title-block-tight">
              <h1 className="detail-title-single-line" title={item.title}>
                {item.title}
              </h1>
              <p className="detail-description-clamped detail-description-strong">{item.description}</p>
            </div>

            <div className="detail-summary-row detail-summary-row-item detail-summary-row-item-swap">
              <article className="detail-info-card detail-info-card-contrast detail-price-card-emphasis">
                <span>{ui.price}</span>
                <strong>{formatCurrency(item.price)}</strong>
              </article>

              <ContactDesignerButton
                designer={item.designerMeta.slug}
                contextType="item"
                contextId={item.routeId}
                contextTitle={item.title}
                label={ui.write}
                className="primary-btn detail-top-contact-btn"
              />
            </div>

            <article className="detail-panel detail-panel-wide detail-panel-editorial detail-panel-designer-wide detail-panel-designer-clean">
              <div className="detail-panel-head detail-panel-head-designer-clean">
                <span className="detail-panel-label">{ui.aboutDesigner}</span>
                <h2>{item.designer}</h2>
              </div>
              <p className="detail-copy-clamped detail-designer-bio">{item.designerMeta.bio}</p>
              <div className="detail-designer-meta-line detail-designer-meta-line-clean">
                <strong>{ui.styles}</strong>
                <span>{item.designerMeta.signature}</span>
              </div>
            </article>

            <div className="detail-bottom-cta">
              <Link
                className="detail-helper-link detail-ai-gradient-btn detail-primary-wide-btn detail-primary-wide-btn-ai"
                href={getItemAssistantHref({ itemId: item.routeId, itemTitle: item.title })}
              >
                <Sparkles size={18} />
                {ui.askAi}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
