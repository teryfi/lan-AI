"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronRight, MessageCircle, Send } from "lucide-react";
import { useApp } from "@/components/AuthProvider";

function getInitials(name) {
  return (name || "?")
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function MessagesExperience({ mode = "workspace" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, designerConversations, sendDesignerMessage } = useApp();
  const [draft, setDraft] = useState("");

  const activeConversationId = searchParams.get("conversation");
  const fallbackConversationId = !activeConversationId && searchParams.get("contextTitle")
    ? designerConversations[0]?.id || null
    : null;
  const resolvedConversationId = activeConversationId || fallbackConversationId;

  const activeConversation = useMemo(
    () => designerConversations.find((conversation) => conversation.id === resolvedConversationId) || null,
    [designerConversations, resolvedConversationId]
  );

  const openConversation = (conversationId) => {
    router.push(`/messages?conversation=${conversationId}`);
  };

  const handleSubmit = () => {
    if (!activeConversation || !draft.trim()) return;
    sendDesignerMessage(activeConversation.id, draft);
    setDraft("");
  };

  if (!user.authenticated) {
    return <div className="empty-block">Сначала войдите в профиль, чтобы открыть сообщения.</div>;
  }

  if (mode === "panel") {
    return (
      <section className="messages-panel">
        <div className="messages-panel-head">
          <div>
            <h3>Сообщения</h3>
            <p>Новые заявки, уточнения по заказам и рабочие диалоги с клиентами.</p>
          </div>
          <Link className="ghost-btn messages-open-all" href="/messages">
            Открыть чат <ChevronRight size={15} />
          </Link>
        </div>

        <div className="messages-panel-list">
          {designerConversations.map((conversation) => (
            <button
              className="messages-panel-item"
              key={conversation.id}
              onClick={() => openConversation(conversation.id)}
              type="button"
            >
              <span className={`messages-status-dot ${conversation.online ? "online" : ""}`}></span>
              <div className="messages-panel-item-main">
                <div className="messages-panel-item-top">
                  <strong>{conversation.name}</strong>
                  <span>{conversation.timeLabel}</span>
                </div>
                <p>{conversation.preview}</p>
              </div>
              {conversation.unreadCount ? <span className="messages-badge">{conversation.unreadCount}</span> : null}
            </button>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="messages-workspace-shell">
      <aside className="messages-sidebar">
        <div className="messages-sidebar-head">
          <div>
            <p>Сообщения</p>
            <strong>{designerConversations.length} диалога</strong>
          </div>
        </div>

        <div className="messages-sidebar-list">
          {designerConversations.map((conversation) => {
            const isActive = conversation.id === resolvedConversationId;
            return (
              <button
                className={`messages-sidebar-item ${isActive ? "active" : ""}`}
                key={conversation.id}
                onClick={() => openConversation(conversation.id)}
                type="button"
              >
                <div className="messages-sidebar-avatar">{getInitials(conversation.name)}</div>
                <div className="messages-sidebar-copy">
                  <div className="messages-sidebar-copy-top">
                    <strong>{conversation.name}</strong>
                    <span>{conversation.timeLabel}</span>
                  </div>
                  <p>{conversation.preview}</p>
                </div>
                {conversation.unreadCount ? <span className="messages-badge">{conversation.unreadCount}</span> : null}
              </button>
            );
          })}
        </div>
      </aside>

      <div className="messages-stage">
        {activeConversation ? (
          <>
            <div className="messages-stage-head">
              <div className="messages-stage-person">
                <div className="messages-stage-avatar">{getInitials(activeConversation.name)}</div>
                <div>
                  <strong>
                    {activeConversation.name}
                    <span className={`messages-presence-dot ${activeConversation.online ? "online" : ""}`}></span>
                  </strong>
                </div>
              </div>
            </div>

            <div className="messages-thread">
              {activeConversation.messages.map((item, index) => (
                <article className={`messages-bubble ${item.role === "designer" ? "self" : ""}`} key={`${activeConversation.id}-${index}`}>
                  <p>{item.text}</p>
                  <span>{item.time}</span>
                </article>
              ))}
            </div>

            <div className="messages-compose">
              <input
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Ответить клиенту"
                value={draft}
              />
              <button className="primary-btn" onClick={handleSubmit} type="button">
                <Send size={15} /> Отправить
              </button>
            </div>
          </>
        ) : (
          <div className="messages-empty-state">
            <div className="messages-empty-icon">
              <MessageCircle size={26} />
            </div>
            <h2>Выберите диалог</h2>
            <p>Откройте разговор слева, чтобы увидеть историю переписки и ответить клиенту.</p>
          </div>
        )}
      </div>
    </section>
  );
}
