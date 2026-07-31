import type { HomeHero, NavLink } from "../../content/types";
import HeroDesktop from "./hero/HeroDesktop";
import HeroMobile from "./hero/HeroMobile";

export default function HeroSection({ hero, nav }: { hero: HomeHero; nav: NavLink[] }) {
  return (
    <>
      <HeroMobile hero={hero} nav={nav} />
      <div className="hidden md:block">
        <HeroDesktop hero={hero} nav={nav} />
      </div>
    </>
  );
}
