"use client";

/*
 * Wideo z przezroczystością działające we WSZYSTKICH przeglądarkach (także
 * Safari/iOS, które nie obsługują WebM z alfą). Plik = zwykłe MP4 H.264
 * "packed alpha": lewa połowa klatki = kolor, prawa = maska (biel = widoczne);
 * shader WebGL składa je w RGBA na <canvas>. Tło wideo generowane na magencie
 * i wycięte skryptem design-refs/tools/mf-key.js.
 * Odtwarza się RAZ przy wejściu w viewport; po końcu zostaje ostatnia klatka.
 * Bez WebGL / przy błędzie wideo / prefers-reduced-motion → statyczny PNG
 * (ostatnia klatka), więc wygląd końcowy jest zawsze ten sam.
 */

import { useEffect, useRef, useState } from "react";

const VS = `attribute vec2 p;varying vec2 uv;void main(){uv=vec2((p.x+1.)*.5,(1.-p.y)*.5);gl_Position=vec4(p,0.,1.);}`;
const FS = `precision mediump float;varying vec2 uv;uniform sampler2D t;
void main(){vec3 c=texture2D(t,vec2(uv.x*.5,uv.y)).rgb;float a=texture2D(t,vec2(.5+uv.x*.5,uv.y)).r;gl_FragColor=vec4(c*a,a);}`;

export default function AlphaVideo({
  src,
  fallbackSrc,
  alt,
  className,
  style,
  playbackRate = 1,
}: {
  src: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  playbackRate?: number;
}) {
  const wrap = useRef<HTMLDivElement | null>(null);
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const video = useRef<HTMLVideoElement | null>(null);
  const [mode, setMode] = useState<"pending" | "video" | "static">("pending");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMode("static");
      return;
    }
    const cv = canvas.current!, v = video.current!;
    const gl = cv.getContext("webgl", { premultipliedAlpha: true, alpha: true });
    if (!gl) {
      setMode("static");
      return;
    }
    const sh = (type: number, code: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, code);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VS));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      setMode("static");
      return;
    }
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    let alive = true;
    const draw = () => {
      if (!v.videoWidth) return;
      const w = v.videoWidth / 2, h = v.videoHeight;
      if (cv.width !== w || cv.height !== h) {
        cv.width = w;
        cv.height = h;
      }
      gl.viewport(0, 0, w, h);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, v);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    type RVFC = HTMLVideoElement & { requestVideoFrameCallback?: (cb: () => void) => number };
    const rv = v as RVFC;
    const loop = () => {
      if (!alive) return;
      draw();
      if (v.paused || v.ended) return;
      if (rv.requestVideoFrameCallback) rv.requestVideoFrameCallback(loop);
      else requestAnimationFrame(loop);
    };
    const onError = () => setMode("static");
    const onLoaded = () => {
      draw(); // pierwsza klatka (robot wyłączony) zanim ruszy odtwarzanie
      setMode("video");
    };
    const onEnded = () => draw();
    v.addEventListener("error", onError);
    v.addEventListener("loadeddata", onLoaded);
    v.addEventListener("ended", onEnded);
    v.playbackRate = playbackRate;
    v.load();

    let played = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (played || !entries.some((e) => e.isIntersecting)) return;
        played = true;
        io.disconnect();
        v.play().then(loop).catch(() => {
          /* autoplay zablokowany → zostaje pierwsza klatka; pokaż stopklatkę końcową */
          setMode("static");
        });
      },
      { threshold: 0.35 },
    );
    io.observe(wrap.current!);
    return () => {
      alive = false;
      io.disconnect();
      v.removeEventListener("error", onError);
      v.removeEventListener("loadeddata", onLoaded);
      v.removeEventListener("ended", onEnded);
    };
  }, [playbackRate]);

  return (
    <div ref={wrap} className={className} style={style}>
      {mode === "static" ? (
        <img src={fallbackSrc} alt={alt} className="absolute inset-0 h-full w-full" />
      ) : (
        <>
          <canvas
            ref={canvas}
            role="img"
            aria-label={alt}
            className="absolute inset-0 h-full w-full"
            style={{ opacity: mode === "video" ? 1 : 0 }}
          />
          <video
            ref={video}
            src={src}
            muted
            playsInline
            preload="auto"
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 h-px w-px opacity-0"
          />
        </>
      )}
    </div>
  );
}
