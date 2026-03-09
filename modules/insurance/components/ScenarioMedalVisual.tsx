"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";

/** 3: עצירת פיגוע נכונה — Golden trophy image with parallax */
export const CrackingMedalVisual = ({ isActive }: { isActive: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!isActive || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setRot({
      x: ((e.clientY - r.top) / r.height - 0.5) * -16,
      y: ((e.clientX - r.left) / r.width - 0.5) * 20,
    });
  }, [isActive]);

  return (
    <div ref={ref} className="w-full h-full flex items-center justify-center p-1 cursor-default"
      onMouseMove={onMove} onMouseLeave={() => setRot({ x: 0, y: 0 })}>
      <div style={{
        transform: `perspective(900px) rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
        transition: rot.x === 0 && rot.y === 0 ? "transform 0.4s ease-out" : "transform 0.08s linear",
        willChange: "transform",
        opacity: isActive ? 1 : 0,
        transitionProperty: "transform, opacity",
      }}>
        <Image
          src="/images/insurance/trophy-web.png"
          alt="גביע הצטיינות"
          width={180}
          height={180}
          className="object-contain drop-shadow-lg"
          style={{ filter: "drop-shadow(0 12px 28px rgba(180,130,20,0.25))" }}
        />
      </div>
    </div>
  );
};
