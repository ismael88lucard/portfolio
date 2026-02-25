import { motion, useMotionValue, useSpring, AnimatePresence, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

function App() {
  const [selectedImg, setSelectedImg] = useState(null);

  // Lógica para la estela de luz superior (barra de progreso)
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 60, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 25 });

  // Configuración de SEO y Favicon
  useEffect(() => {
    document.title = "PABBLO | Full Stack & IA";

    const link = document.querySelector("link[rel~='icon']") || document.createElement('link');
    link.rel = 'icon';
    link.href = '/icono.png'; 
    document.getElementsByTagName('head')[0].appendChild(link);

    const setMeta = (name, content, isProperty = false) => {
      let meta = document.querySelector(isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        if (isProperty) meta.setAttribute('property', name);
        else meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    setMeta("description", "Portafolio profesional de Pabblo, experto en IA y desarrollo Full Stack.");
    setMeta("og:title", "Pabblo Dev | Ingeniero Full Stack & IA", true);
    setMeta("og:description", "Explora mis proyectos de ingeniería y soluciones tecnológicas de vanguardia.", true);
    setMeta("og:image", "https://www.misanosdorados.com/og-image.png", true);
    setMeta("og:url", "https://www.misanosdorados.com/", true);
    setMeta("og:type", "website", true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - 150);
      mouseY.set(e.clientY - 150);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const proyectos = [
    { 
      id: 1, 
      title: "IA WhatsApp Bot", 
      desc: "Bot con Inteligencia Artificial para gestión de choferes y clientes de cooperativa.",
      img: "/proyecto1.jpeg" 
    },
    { 
      id: 2, 
      title: "Telegram Script", 
      desc: "Automatización en JS para envío de mensajes masivos a unidades y clientes.",
      img: "/proyecto2.jpeg" 
    },
    { 
      id: 3, 
      title: "Sistema de Despacho", 
      desc: "Identificador de llamadas y despacho de carreras con Python y PostgreSQL.",
      img: "/proyecto33.jpg" 
    },
    { 
      id: 4, 
      title: "Telecom Engineering", 
      desc: "Cálculos complejos para estudios de ingeniería en telecomunicaciones (Python).",
      img: "/proyecto4.jpeg" 
    },
  ];

  return (
    <div style={{ minHeight: "100vh", position: "relative", backgroundColor: "#020202", color: "white", overflowX: "hidden" }}>
      
      {/* CSS INYECTADO para ocultar barras de scroll */}
      <style>
        {`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          body { overflow-x: hidden; margin: 0; padding: 0; }
        `}
      </style>

      {/* ESTELA DE LUZ SUPERIOR (Progress Bar) - CORREGIDO */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(90deg, #646cff, #ffffff)",
          transformOrigin: "0%",
          zIndex: 1000,
          boxShadow: "0 0 10px #646cff",
          scaleX: scaleX // Unificado aquí
        }}
      />

      {/* Luz de seguimiento */}
      <motion.div style={{
          position: "fixed", top: 0, left: 0, width: 300, height: 300,
          background: "radial-gradient(circle, rgba(100, 108, 255, 0.12) 0%, transparent 75%)",
          borderRadius: "50%", pointerEvents: "none", zIndex: 0, x: springX, y: springY
      }} />

      {/* Hero Section */}
      <section style={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", position: "relative", zIndex: 1 }}>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          style={{ fontSize: "clamp(3rem, 12vw, 7rem)", fontWeight: "900", margin: 0, letterSpacing: "-5px" }}
        >
          PABBL<span style={{ color: "#646cff" }}>O.</span>
        </motion.h1>
        <p style={{ color: "#555", fontSize: "0.8rem", letterSpacing: "4px", textTransform: "uppercase" }}>Full Stack & Linux Enthusiast</p>
        
        {/* Indicador de SCROLL animado */}
        <motion.div 
          animate={{ y: [0, 10, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ position: "absolute", bottom: "40px", color: "#646cff", fontSize: "1.2rem", fontWeight: "300" }}
        >
          DESLIZA ↓
        </motion.div>
      </section>

      {/* Galería de Proyectos */}
      <section style={{ padding: "0 20px 150px 20px", display: "flex", justifyContent: "center", zIndex: 1, position: "relative" }}>
        <div 
          className="no-scrollbar"
          style={{ 
            display: "flex", 
            flexDirection: "row", 
            flexWrap: "nowrap", 
            gap: "20px", 
            width: "100%", 
            maxWidth: "1400px",
            overflowX: "auto", 
            paddingBottom: "40px",
            scrollSnapType: "x mandatory"
          }}
        >
          {proyectos.map((p) => (
            <motion.div 
              key={p.id} 
              layoutId={`img-${p.id}`}
              onClick={() => setSelectedImg(p)}
              whileHover={{ y: -10 }}
              style={{ 
                flex: "0 0 300px", 
                background: "rgba(255,255,255,0.02)", borderRadius: "24px", overflow: "hidden", 
                border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(20px)",
                scrollSnapAlign: "center",
                cursor: "pointer"
              }}
            >
              <div style={{ height: "180px", backgroundImage: `url(${p.img})`, backgroundSize: "cover", backgroundPosition: "center" }} />
              <div style={{ padding: "20px" }}>
                <h3 style={{ margin: 0, fontSize: "0.8rem", color: "#646cff", textTransform: "uppercase", letterSpacing: "1px" }}>{p.title}</h3>
                <p style={{ color: "#777", fontSize: "0.85rem", marginTop: "10px", lineHeight: "1.4" }}>{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MODAL ZOOM */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            style={{
              position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
              backgroundColor: "rgba(0,0,0,0.98)", display: "flex", justifyContent: "center",
              alignItems: "center", zIndex: 200, padding: "20px", cursor: "zoom-out"
            }}
          >
            <div style={{ textAlign: "center", maxWidth: "900px", width: "100%" }}>
                <motion.img
                layoutId={`img-${selectedImg.id}`}
                src={selectedImg.img}
                style={{ width: "100%", height: "auto", maxHeight: "70vh", borderRadius: "20px", objectFit: "contain" }}
                />
                <h2 style={{ color: "#646cff", marginTop: "25px", fontSize: "1.5rem" }}>{selectedImg.title}</h2>
                <p style={{ color: "#aaa", fontSize: "1rem" }}>{selectedImg.desc}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón WhatsApp */}
      <motion.a
        href="https://wa.me/593989271700" target="_blank" rel="noopener noreferrer"
        whileHover={{ scale: 1.1, backgroundColor: "rgba(37, 211, 102, 0.1)" }}
        style={{
          position: "fixed", bottom: "30px", right: "30px", width: "60px", height: "60px",
          borderRadius: "50%", background: "rgba(10,10,10,0.8)", border: "1px solid rgba(255,255,255,0.1)",
          display: "flex", justifyContent: "center", alignItems: "center",
          backdropFilter: "blur(15px)", zIndex: 100
        }}
      >
        <svg width="30" height="30" viewBox="0 0 448 512" fill="#25D366">
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.1 0-65.6-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.2-3.2-5.6-.3-8.6 2.5-11.3 2.5-2.5 5.5-6.5 8.3-9.7 2.8-3.3 3.7-5.5 5.5-9.2 1.9-3.7 1-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.5 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
        </svg>
      </motion.a>

    </div>
  );
}

export default App;