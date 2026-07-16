import type { ONasPage } from "./types";

export const oNasPage: ONasPage = {
  _type: "oNasPage",
  hero: {
    kickerLines: ["CHANGING YOUR", "IDEA OF WHAT AI", "CAN DO"],
    // „KOMPE" solid jako jeden string (w Figmie per litera — decyzja Patryka:
    // implementujemy stringiem, ma po prostu tak wyglądać); „TENCJE" outline
    // Poppins, rozsunięte wokół robota na TEN | CJE
    titleSolid: "KOMPE",
    titleOutlineLeft: "TEN",
    titleOutlineRight: "CJE",
  },
};
