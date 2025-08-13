import React, { useEffect, useRef } from "react";
import { Mail, MapPin, Globe, Terminal } from "lucide-react";

const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Matrix characters
    const chars = "0123456789ABCDEF".split("");
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(0);

    // Animation settings
    let fadeStrength = 0.05;

    const draw = () => {
      // Create fade effect
      ctx.fillStyle = `rgba(0, 0, 0, ${fadeStrength})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text properties
      ctx.fillStyle = "#0f0";
      ctx.font = `${fontSize}px monospace`;

      // Draw characters
      drops.forEach((y, i) => {
        // Generate random character
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;

        ctx.fillStyle = `rgba(0, 255, 0, ${Math.random()})`;
        ctx.fillText(char, x, y);

        // Reset drop or move it down
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        } else {
          drops[i] += fontSize;
        }
      });
    };

    // Animation loop
    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full"
      style={{ opacity: 0.2 }}
    />
  );
};

export const Contact = () => {
  return (
    <section id="contact" className="relative min-h-screen bg-black text-green-500 font-mono py-20 overflow-hidden">
      <MatrixRain />

      <div className="container relative mx-auto px-4">
        {/* Terminal Window */}
        <div className="max-w-3xl mx-auto backdrop-blur-sm">
          {/* Terminal Header */}
          <div className="border border-green-900 p-2 flex items-center gap-2 bg-black/90">
            <Terminal size={14} />
            <span className="text-xs">
              MATRIX_TERMINAL <span className="text-green-600">{`<F6>`}</span>
            </span>
          </div>

          {/* Contact Content */}
          <div className="border-l border-r border-b border-green-900 p-8 bg-black/90">
            <div className="text-center mb-12">
              <h2 className="text-2xl mb-4 animate-pulse">
                CONNECTION ESTABLISHED
              </h2>
              <p className="text-sm text-green-400">
                /* SECURE CHANNEL ACTIVATED */
              </p>
            </div>

            <div className="grid gap-8 max-w-lg mx-auto">
              <div className="border border-green-900/50 p-6 backdrop-blur-md hover:border-green-500 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-4 h-4" />
                  <span className="text-xs text-green-600">EMAIL</span>
                </div>
                <a
                  href="mailto:99viktor.agren@gmail.com"
                  className="text-white hover:text-green-500 transition-colors"
                >
                  99VIKTOR.AGREN@GMAIL.COM
                </a>
              </div>

              <div className="border border-green-900/50 p-6 backdrop-blur-md hover:border-green-500 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span className="text-xs text-green-600">LOCATION</span>
                </div>
                <span className="text-white">STOCKHOLM, SWEDEN</span>
              </div>

              <div className="border border-green-900/50 p-6 backdrop-blur-md hover:border-green-500 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="w-4 h-4" />
                  <span className="text-xs text-green-600">TIMEZONE</span>
                </div>
                <span className="text-white">CET (UTC+1)</span>
              </div>
            </div>

            <div className="mt-12 text-center text-xs">
              <div className="inline-block border border-green-900/50 px-4 py-2">
                <span className="text-green-600">STATUS: </span>
                <span className="text-white">READY TO CONNECT </span>
                <span className="animate-pulse">_</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
