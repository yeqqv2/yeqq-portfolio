/* site-geneli arka plan müziği: React ağacının dışında tek bir <audio>.
   rota değişse de çalmaya devam eder; kullanıcı jesti (tık) ile başlar →
   tarayıcı autoplay politikalarına takılmaz. intro üst barı ve navbar island'ı
   aynı tekil sesi yönetir. dosya: public/assets/audio/ambient.mp3 */

const SRC = "/assets/audio/ambient.mp3";

let audio = null;
const listeners = new Set();

const emit = () => {
  const playing = isMusicPlaying();
  listeners.forEach((fn) => fn(playing));
};

const getAudio = () => {
  if (audio || typeof Audio === "undefined") return audio;
  audio = new Audio(SRC);
  audio.loop = true;
  audio.volume = 0.4;
  audio.preload = "none";
  // gerçek play/pause olaylarını dinle → harici değişimde bile aboneler senkron
  audio.addEventListener("play", emit);
  audio.addEventListener("pause", emit);
  return audio;
};

export const isMusicPlaying = () => !!audio && !audio.paused;

export const subscribeMusic = (fn) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};

export const toggleMusic = async () => {
  const a = getAudio();
  if (!a) return;
  if (a.paused) {
    try {
      await a.play();
    } catch (e) {
      // kullanıcı izni yok ya da dosya eksik — sessiz geç, durum değişmez
    }
  } else {
    a.pause();
  }
};
