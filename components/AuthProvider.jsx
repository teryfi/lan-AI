"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { catalog, featuredCapsules, initialDesignerCapsules, initialMessages } from "@/lib/data";

const AppContext = createContext(null);

const defaultUser = {
  name: "Новый пользователь",
  email: "",
  role: "client",
  avatar: "Н",
  privacy: "public",
  authenticated: false
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(defaultUser);
  const [authOpen, setAuthOpen] = useState(false);
  const [products, setProducts] = useState(catalog);
  const [savedCapsules, setSavedCapsules] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [designerCapsules, setDesignerCapsules] = useState(initialDesignerCapsules);
  const [designerMessages, setDesignerMessages] = useState(initialMessages);
  const [assistantMessages, setAssistantMessages] = useState([
    { role: "assistant", text: "Я стилист-помощник. Могу помочь собрать лук, подсказать замену вещи, подобрать обувь, палитру и объяснить, почему капсула работает." }
  ]);

  useEffect(() => {
    const raw = window.localStorage.getItem("lan-ai-user");
    if (!raw) return;

    try {
      setUser(JSON.parse(raw));
    } catch {
      window.localStorage.removeItem("lan-ai-user");
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("lan-ai-user", JSON.stringify(user));
  }, [user]);

  const metrics = useMemo(() => {
    const likes = products.reduce((sum, item) => sum + (item.likes || 120), 0);
    const views = products.reduce((sum, item) => sum + (item.likes || 120) * 22, 8200);
    const leads = Math.max(12, Math.round(likes / 18));
    const revenue = Math.round(products.slice(0, 5).reduce((sum, item) => sum + item.price, 0) / 1000);
    return { likes, views, leads, revenue };
  }, [products]);

  const login = (payload) => {
    const avatar = (payload.avatar || payload.name || "Н").trim().charAt(0).toUpperCase();
    setUser({
      name: payload.name,
      email: payload.email,
      role: payload.role,
      avatar,
      privacy: payload.privacy || "public",
      authenticated: true
    });
    setAuthOpen(false);
  };

  const logout = () => {
    setUser(defaultUser);
    setSavedCapsules([]);
    setSavedItems([]);
  };

  const updateUser = (payload) => {
    const avatar = (payload.name || payload.avatar || "Н").trim().charAt(0).toUpperCase();
    setUser((prev) => ({
      ...prev,
      ...payload,
      avatar
    }));
  };


  const addCapsule = (capsule) => {
    const total = capsule.items.reduce((sum, item) => sum + item.price, 0);
    setSavedCapsules((prev) => [
      { id: capsule.id, name: capsule.name, items: capsule.items.length, total },
      ...prev
    ]);
  };

  const toggleSave = (itemId) => {
    setSavedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]));
  };

  const publishProduct = (payload) => {
    setProducts((prev) => [
      {
        id: Date.now(),
        title: payload.title,
        designer: payload.designer,
        category: payload.category,
        categoryLabel: payload.categoryLabel,
        price: Number(payload.price),
        styles: payload.styles.split(",").map((item) => item.trim().toLowerCase()).filter(Boolean),
        description: payload.description,
        image: payload.image,
        likes: 0
      },
      ...prev
    ]);
  };

  const createDesignerCapsule = (name) => {
    setDesignerCapsules((prev) => [
      { id: Date.now(), name, items: Math.max(4, Math.min(6, products.length)), budget: products.slice(0, 4).reduce((sum, item) => sum + item.price, 0) },
      ...prev
    ]);
  };

  const sendDesignerMessage = (text) => {
    setDesignerMessages((prev) => [...prev, { role: "designer", text }]);
  };

  const askAssistant = (text) => {
    const lower = text.toLowerCase();
    if (/[a-z]/i.test(text) && !/[а-яё]/i.test(text)) {
      setAssistantMessages((prev) => [
        ...prev,
        { role: "user", text },
        { role: "assistant", text: "Я работаю только на русском языке. Напиши запрос по-русски, и я помогу собрать образ или капсулу." }
      ]);
      return;
    }

    let answer = "Собирай лук по ролям: верх, низ, верхний слой, обувь и один акцент. Так образ получается цельным и без перегруза.";

    if (lower.includes("цвет") || lower.includes("палитр")) {
      answer = "Для спокойной и дорогой по ощущению капсулы хорошо работают молочный, песочный, графитовый и один глубокий акцент. Если хочешь мягкий образ, держи не больше трёх основных цветов.";
    } else if (lower.includes("обув")) {
      answer = "Если образ на каждый день, выбирай одну ведущую пару: лоферы для офиса, кеды для города, ботильоны для более собранного силуэта, мюли или балетки для лёгких и женственных комплектов.";
    } else if (lower.includes("верхний слой") || lower.includes("куртк") || lower.includes("пальто") || lower.includes("тренч")) {
      answer = "Верхний слой должен собирать силуэт. Для офиса лучше тренч, пальто или жакет. Для города подойдут бомбер или джинсовая куртка. Если образ мягкий и чистый, избегай слишком тяжёлого декора.";
    } else if (lower.includes("офис")) {
      answer = "Для офиса держи основу на рубашке, брюках или юбке, добавляй жакет или тренч и заканчивай образ лоферами. Один акцент лучше оставить в сумке, серьгах или платке.";
    } else if (lower.includes("свидан") || lower.includes("романт")) {
      answer = "Для более романтичного лука хорошо работают блуза или платье, мягкий низ, аккуратная обувь и один деликатный акцент. Лучше выбирать пластичные ткани и не перегружать образ аксессуарами.";
    } else if (lower.includes("город") || lower.includes("повсед")) {
      answer = "Для городского лука удобно брать базовый верх, более расслабленный низ, спокойную обувь и один слой сверху. Такой образ выглядит собранно, но остаётся носибельным каждый день.";
    } else if (lower.includes("замен")) {
      answer = "Если хочешь заменить вещь, сохраняй её роль в образе. Например, вместо жакета можно взять тренч, вместо лоферов ботильоны, вместо юбки прямые брюки. Главное, чтобы баланс по силуэту не ломался.";
    } else if (lower.includes("фигур")) {
      answer = "Для фигуры важнее не мода сама по себе, а баланс пропорций. Если хочешь, я могу подсказать, что лучше подчёркивать для конкретного типа фигуры и какие вещи выбирать в капсулу.";
    } else if (lower.includes("бюдж")) {
      answer = "Если бюджет ограничен, сначала собирай базу: верх, низ, обувь и только потом добавляй верхний слой и акцент. Так капсула останется цельной, даже если вещей немного.";
    } else if (lower.includes("собери") || lower.includes("лук") || lower.includes("образ")) {
      answer = "Чтобы собрать лук, начни с одного центрального предмета, затем добавь поддерживающий низ, обувь по сценарию дня, верхний слой по сезону и один акцент. Я могу помочь и под более конкретный случай.";
    }

    setAssistantMessages((prev) => [...prev, { role: "user", text }, { role: "assistant", text: answer }]);
  };


  const value = {
    user,
    authOpen,
    setAuthOpen,
    login,
    logout,
    updateUser,
    products,
    featuredCapsules,
    savedCapsules,
    savedItems,
    addCapsule,
    toggleSave,
    designerCapsules,
    createDesignerCapsule,
    designerMessages,
    sendDesignerMessage,
    assistantMessages,
    askAssistant,
    publishProduct,
    metrics
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
