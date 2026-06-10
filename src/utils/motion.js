/**
 * Kullanıcının işletim sisteminde "hareketi azalt" tercihi açık mı?
 * Vestibüler hassasiyeti olan ziyaretçiler için ağır animasyonları kısmak/durdurmak amacıyla kullanılır.
 */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
