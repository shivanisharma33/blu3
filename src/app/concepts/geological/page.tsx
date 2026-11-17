import Image from "next/image";
import Contours from "@/components/Contours";
import { HARPER } from "@/content/site";

/**
 * CONCEPT B — GEOLOGICAL INTELLIGENCE
 * Light mist ground, generative bathymetric contour field, serif-led headline,
 * the company's own 3D seismic as the "photograph", and a data strip.
 */
export default function ConceptGeological() {
  return (
    <main id="main" className="cB" data-nav-theme="light">
      <Contours className="cB__field" seed={4} rings={30} color="#102D3A" cx={980} cy={520} opacity={0.32} />
      <div className="grid cB__grid">
        <p className="cB__label label"><span>Fig. 00 — Harper Basin, offshore Liberia</span><span>RL-003 · LB-26 / LB-30 / LB-31</span></p>
        <div className="cB__title">
          <h1>
            Reading the <em>basin</em> floor.
          </h1>
          <p className="lead" style={{ marginTop: "2rem", color: "var(--ink-70)" }}>
            Six Cretaceous deepwater fans, recognised through regional subsurface work and 3D seismic interpretation.
          </p>
        </div>
        <div className="cB__seis">
          <figure>
            <Image src="/site/Fan_Play_image_v2.jpg" alt="3D seismic image of Cretaceous fan systems" width={1499} height={826} sizes="(max-width: 1023px) 100vw, 33vw" />
            <figcaption className="figcap" style={{ color: "var(--ink-70)" }}><span>Cenomanian top</span><span>Data property of TGS</span></figcaption>
          </figure>
        </div>
        <dl className="cB__data">
          <div><dt>3D seismic</dt><dd>{HARPER.seismicKm2} km²</dd></div>
          <div><dt>Licence area</dt><dd>{HARPER.areaKm2} km²</dd></div>
          <div><dt>Deepwater fans</dt><dd>6</dd></div>
          <div><dt>Distance to shore</dt><dd>~{HARPER.shoreKm} km</dd></div>
        </dl>
      </div>
    </main>
  );
}
