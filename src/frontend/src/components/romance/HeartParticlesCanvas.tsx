import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

interface HeartParticlesCanvasProps {
  dense?: boolean;
}

export default function HeartParticlesCanvas({ dense = false }: HeartParticlesCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with device pixel ratio for smooth rendering
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles - significantly more when dense, bottom-biased when dense
    const particles: Particle[] = [];
    const particleCount = dense ? 100 : 20;

    for (let i = 0; i < particleCount; i++) {
      // When dense, strongly bias particles toward the bottom 80% of the screen
      let yPosition: number;
      if (dense) {
        // Use exponential distribution to heavily favor bottom
        const randomFactor = Math.pow(Math.random(), 0.5); // Bias toward 1
        yPosition = window.innerHeight * 0.2 + randomFactor * window.innerHeight * 0.8;
      } else {
        yPosition = Math.random() * window.innerHeight;
      }

      particles.push({
        x: Math.random() * window.innerWidth,
        y: yPosition,
        size: Math.random() * 15 + 10,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }

    // Draw heart shape
    const drawHeart = (x: number, y: number, size: number, opacity: number) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = '#ff69b4';
      ctx.beginPath();
      
      const topCurveHeight = size * 0.3;
      ctx.moveTo(x, y + topCurveHeight);
      // Left curve
      ctx.bezierCurveTo(
        x, y, 
        x - size / 2, y, 
        x - size / 2, y + topCurveHeight
      );
      ctx.bezierCurveTo(
        x - size / 2, y + (size + topCurveHeight) / 2, 
        x, y + (size + topCurveHeight) / 2, 
        x, y + size
      );
      // Right curve
      ctx.bezierCurveTo(
        x, y + (size + topCurveHeight) / 2, 
        x + size / 2, y + (size + topCurveHeight) / 2, 
        x + size / 2, y + topCurveHeight
      );
      ctx.bezierCurveTo(
        x + size / 2, y, 
        x, y, 
        x, y + topCurveHeight
      );
      
      ctx.fill();
      ctx.restore();
    };

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      particles.forEach((particle) => {
        drawHeart(particle.x, particle.y, particle.size, particle.opacity);

        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around edges
        if (particle.x < -particle.size) particle.x = window.innerWidth + particle.size;
        if (particle.x > window.innerWidth + particle.size) particle.x = -particle.size;
        if (particle.y < -particle.size) particle.y = window.innerHeight + particle.size;
        if (particle.y > window.innerHeight + particle.size) particle.y = -particle.size;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [dense]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.4 }}
    />
  );
}
