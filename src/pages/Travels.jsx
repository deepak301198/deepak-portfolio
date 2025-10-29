import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Globe from "react-globe.gl";
import { MapPin, Plane, ChevronLeft, ChevronRight } from "lucide-react";
import travelData from "../data/travels.json";

export default function Travels() {
  const globeRef = useRef();
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const locations = [...travelData.places, ...travelData.airports];

  // ✅ Fixed missing closing brace
  useEffect(() => {
    const globe = globeRef.current;
    if (globe) {
      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 0.05; // smooth cinematic rotation
      globe.controls().enableZoom = true;
      globe.controls().minDistance = 200;
      globe.controls().maxDistance = 800;
    }
  }, []);

  const handleNext = () => {
    if (!selectedPoint?.slides) return;
    setCurrentSlide((prev) => (prev + 1) % selectedPoint.slides.length);
  };

  const handlePrev = () => {
    if (!selectedPoint?.slides) return;
    setCurrentSlide(
      (prev) =>
        (prev - 1 + selectedPoint.slides.length) %
        selectedPoint.slides.length
    );
  };

  useEffect(() => {
    if (selectedPoint) setCurrentSlide(0);
  }, [selectedPoint]);

  return (
    <div className="min-h-screen bg-black text-gray-100 pt-32 px-6 pb-40 relative overflow-hidden">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="text-4xl font-bold text-center mb-10"
      >
        Travels ✈️
      </motion.h1>

      {/* Globe */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative max-w-6xl mx-auto flex flex-col items-center"
      >
        <div className="relative w-full h-[600px] flex items-center justify-center rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/30">
          <Globe
            ref={globeRef}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            showAtmosphere={true}
            atmosphereColor="#3a82f6"
            atmosphereAltitude={0.18}
            pointsData={locations}
            pointLat="lat"
            pointLng="lng"
            pointColor={(d) =>
              d.type === "airport" ? "#fbbf24" : "#14b8a6"
            }
            pointAltitude={0.008}
            pointRadius={0.4}
            pointLabel={(d) => `${d.name}`}
            onPointClick={(point) => setSelectedPoint(point)}
          />
        </div>

        {/* Legend */}
        <div className="mt-6 flex justify-center gap-8 text-slate-300">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-accent" />
            <span className="text-sm">Places I have been to</span>
          </div>
          <div className="flex items-center gap-2">
            <Plane size={16} className="text-yellow-400" />
            <span className="text-sm">Airports I have survived</span>
          </div>
        </div>
      </motion.div>

      {/* Info Card with Slider */}
      <AnimatePresence>
        {selectedPoint && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            drag
            dragConstraints={{ top: -100, bottom: 100, left: -100, right: 100 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[90%] md:w-[550px] max-h-[75vh] overflow-y-auto bg-gradient-to-b from-slate-900/95 to-slate-800/80 border border-slate-700 rounded-2xl shadow-2xl backdrop-blur-xl p-6 z-50"
          >
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-semibold text-accent">
                {selectedPoint.name}
              </h2>
              <button
                onClick={() => setSelectedPoint(null)}
                className="text-slate-400 hover:text-accent transition-colors"
              >
                ✕
              </button>
            </div>

            {/* ✅ Slider (image + text) */}
            {selectedPoint.slides && selectedPoint.slides.length > 0 && (
              <div className="relative mt-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                  >
                    {selectedPoint.slides[currentSlide].image && (
  <img
    src={selectedPoint.slides[currentSlide].image}
    alt={selectedPoint.name}
    className="rounded-xl w-full h-56 object-cover"
    onError={(e) => (e.target.style.display = "none")}
  />
)}

                    {selectedPoint.slides[currentSlide].text && (
                      <p className="text-slate-300 mt-4 leading-relaxed text-sm whitespace-pre-line text-justify">
                        {selectedPoint.slides[currentSlide].text}
                      </p>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* ✅ Arrows below content */}
                {selectedPoint.slides.length > 1 && (
                  <div className="flex justify-center gap-6 mt-6">
                    <button
                      onClick={handlePrev}
                      className="bg-slate-800/70 hover:bg-slate-700/70 px-3 py-2 rounded-full transition-all"
                      title="Previous"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={handleNext}
                      className="bg-slate-800/70 hover:bg-slate-700/70 px-3 py-2 rounded-full transition-all"
                      title="Next"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}