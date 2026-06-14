import { useEffect, useState } from "react";
import { isMusicPlaying, subscribeMusic, toggleMusic } from "@/utils/music";

// site-geneli müzik durumuna abone küçük hook — intro barı ve navbar ortak kullanır
export default function useMusic() {
  const [playing, setPlaying] = useState(isMusicPlaying);
  useEffect(() => subscribeMusic(setPlaying), []);
  return { playing, toggle: toggleMusic };
}
