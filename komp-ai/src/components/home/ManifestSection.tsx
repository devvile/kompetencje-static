import type { HomeManifest } from "../../content/types";
import ManifestDesktop from "./manifest/ManifestDesktop";
import ManifestMobile from "./manifest/ManifestMobile";

export default function ManifestSection({ m }: { m: HomeManifest }) {
  return (
    <>
      <ManifestMobile m={m} />
      <ManifestDesktop m={m} />
    </>
  );
}
