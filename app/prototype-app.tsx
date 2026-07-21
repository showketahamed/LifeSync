"use client";
import App from "../src/app/App";

export default function PrototypeApp() {
  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    window.location.assign("/");
  }

  return <App onLogout={handleLogout} />;
}
