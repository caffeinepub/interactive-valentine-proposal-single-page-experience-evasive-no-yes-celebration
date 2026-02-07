export default function RomanticBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-romantic-gradient" />
      
      {/* Bokeh light effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="bokeh-light bokeh-1" />
        <div className="bokeh-light bokeh-2" />
        <div className="bokeh-light bokeh-3" />
        <div className="bokeh-light bokeh-4" />
        <div className="bokeh-light bokeh-5" />
      </div>
      
      {/* Subtle glow overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent" />
    </div>
  );
}
