// src/components/BackgroundCanvas.jsx
import React, { useEffect, useRef } from 'react';

const BackgroundCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // --- CONFIGURACIÓN AUDITOR TI ---
    const particleCount = 70; // Cantidad de nodos
    const connectionDistance = 140; 
    const mouseRadius = 180;
    
    // Paleta Cyberpunk: Verde Kali, Cian Terminal, Magenta Bug, Rojo Alerta
    const colors = ['#39ff14', '#00f3ff', '#ff00ff', '#ff3131']; 
    // Fragmentos de "Datos" para dibujar
    const techText = ['0x1', 'A9', 'FF', 'TCP', 'SYN', 'ACK', '::1', '10', '01'];

    let particles = [];
    let mouse = { x: null, y: null };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };

    const handleMouseLeave = () => {
        mouse.x = null;
        mouse.y = null;
    }

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    resizeCanvas();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 2.5; // Más velocidad
        this.vy = (Math.random() - 0.5) * 2.5;
        this.size = Math.random() * 2 + 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        // Estelas (Historial de posiciones)
        this.history = []; 
        this.maxHistory = 10; // Largo de la cola

        // Probabilidad de ser un "Paquete de Datos" (Texto) en vez de un punto
        this.isText = Math.random() > 0.8; 
        this.text = techText[Math.floor(Math.random() * techText.length)];
      }

      update() {
        // Guardar posición actual en el historial para la estela
        this.history.push({ x: this.x, y: this.y });
        if (this.history.length > this.maxHistory) {
            this.history.shift();
        }

        // Interacción con Mouse (Efecto Campo de Fuerza)
        if (mouse.x) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouseRadius) {
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const force = (mouseRadius - distance) / mouseRadius;
                const directionX = forceDirectionX * force * 3; // Fuerza de repulsión
                const directionY = forceDirectionY * force * 3;
                
                this.x -= directionX;
                this.y -= directionY;
            }
        }

        this.x += this.vx;
        this.y += this.vy;

        // Rebotar en bordes
        if (this.x <= 0 || this.x >= canvas.width) this.vx *= -1;
        if (this.y <= 0 || this.y >= canvas.height) this.vy *= -1;
      }

      draw() {
        // 1. Dibujar la ESTELA (Cola de velocidad)
        if (this.history.length > 1) {
            ctx.beginPath();
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 0.5;
            for (let i = 0; i < this.history.length - 1; i++) {
                const point = this.history[i];
                const nextPoint = this.history[i+1];
                // La opacidad aumenta hacia la cabeza
                ctx.globalAlpha = i / this.maxHistory; 
                ctx.moveTo(point.x, point.y);
                ctx.lineTo(nextPoint.x, nextPoint.y);
                ctx.stroke();
            }
            ctx.globalAlpha = 1; // Reset alpha
        }

        // 2. Dibujar la CABEZA (Nodo o Texto)
        ctx.fillStyle = this.color;
        
        if (this.isText) {
            // Modo Hacker: Dibuja texto hex
            ctx.font = '10px monospace';
            ctx.fillText(this.text, this.x, this.y);
        } else {
            // Modo Nodo: Dibuja círculo brillante
            ctx.beginPath();
            ctx.shadowBlur = 10; // Glow effect
            ctx.shadowColor = this.color;
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0; // Reset glow
        }
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      // Efecto "Barrido": Deja un rastro muy leve del frame anterior
      // Esto crea un efecto de desenfoque de movimiento (motion blur) natural
      ctx.fillStyle = 'rgba(2, 6, 23, 0.2)'; // Color de fondo slate-950 con transparencia
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        // Conexiones de red
        for (let j = index + 1; j < particles.length; j++) {
          const dx = particle.x - particles[j].x;
          const dy = particle.y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            const opacity = 1 - (distance / connectionDistance);
            ctx.strokeStyle = particle.color; // Hereda color del nodo origen
            ctx.lineWidth = 0.8;
            ctx.globalAlpha = opacity * 0.4;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
};

export default BackgroundCanvas;