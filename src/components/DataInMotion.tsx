import React, { useState, useEffect, useRef } from 'react';
import { Activity, Play, RefreshCw, BarChart2, Cpu, Zap, PieChart } from 'lucide-react';

export default function DataInMotion() {
  const [activeTab, setActiveTab] = useState<'matrix' | 'kmeans' | 'nn'>('matrix');

  // 1. Confusion Matrix State
  const [tp, setTp] = useState(85);
  const [fp, setFp] = useState(12);
  const [fn, setFn] = useState(8);
  const [tn, setTn] = useState(145);

  const precision = Math.round((tp / (tp + fp)) * 100) || 0;
  const recall = Math.round((tp / (tp + fn)) * 100) || 0;
  const f1 = Math.round((2 * precision * recall) / (precision + recall)) || 0;
  const accuracy = Math.round(((tp + tn) / (tp + fp + fn + tn)) * 100) || 0;

  // 2. K-Means Canvas State
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [points, setPoints] = useState<{ x: number; y: number; cluster: number }[]>([]);
  const [centroids, setCentroids] = useState<{ x: number; y: number; color: string }[]>([]);

  useEffect(() => {
    // Initialize random points for K-Means
    resetKMeansPoints();
  }, []);

  const resetKMeansPoints = () => {
    const newPoints = [];
    for (let i = 0; i < 60; i++) {
      newPoints.push({
        x: Math.random() * 320 + 20,
        y: Math.random() * 200 + 20,
        cluster: -1,
      });
    }
    setPoints(newPoints);

    setCentroids([
      { x: 80, y: 80, color: '#3b82f6' },
      { x: 260, y: 150, color: '#0ea5e9' },
      { x: 180, y: 200, color: '#6366f1' },
    ]);
  };

  const stepKMeans = () => {
    if (centroids.length === 0) return;

    // Assign points to nearest centroid
    const updatedPoints = points.map(p => {
      let minDist = Infinity;
      let closestCluster = 0;
      centroids.forEach((c, idx) => {
        const dist = Math.hypot(p.x - c.x, p.y - c.y);
        if (dist < minDist) {
          minDist = dist;
          closestCluster = idx;
        }
      });
      return { ...p, cluster: closestCluster };
    });

    // Update centroids
    const updatedCentroids = centroids.map((c, clusterIdx) => {
      const clusterPoints = updatedPoints.filter(p => p.cluster === clusterIdx);
      if (clusterPoints.length === 0) return c;
      const meanX = clusterPoints.reduce((acc, p) => acc + p.x, 0) / clusterPoints.length;
      const meanY = clusterPoints.reduce((acc, p) => acc + p.y, 0) / clusterPoints.length;
      return { ...c, x: meanX, y: meanY };
    });

    setPoints(updatedPoints);
    setCentroids(updatedCentroids);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Points
    points.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = p.cluster === 0 ? '#3b82f6' : p.cluster === 1 ? '#0ea5e9' : p.cluster === 2 ? '#6366f1' : '#64748b';
      ctx.fill();
    });

    // Draw Centroids
    centroids.forEach(c => {
      ctx.beginPath();
      ctx.arc(c.x, c.y, 8, 0, Math.PI * 2);
      ctx.fillStyle = c.color;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();
    });
  }, [points, centroids]);

  return (
    <section id="dataviz" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono tracking-widest uppercase">
          <Activity className="w-3.5 h-3.5 text-red-400" />
          <span>Data Science Laboratory</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          DATA IN <span className="bg-gradient-to-r from-red-400 via-red-400 to-indigo-400 bg-clip-text text-transparent">MOTION</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg">
          Interactive real-time algorithm simulators demonstrating Machine Learning evaluation, clustering, and neural weight math.
        </p>
      </div>

      {/* Tabs Switcher */}
      <div className="flex justify-center gap-2 mb-10">
        <button
          onClick={() => setActiveTab('matrix')}
          className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'matrix'
              ? 'bg-red-600 text-white shadow-sm'
              : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
          }`}
        >
          <BarChart2 className="w-4 h-4" />
          <span>01. CONFUSION MATRIX & METRICS</span>
        </button>

        <button
          onClick={() => setActiveTab('kmeans')}
          className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'kmeans'
              ? 'bg-red-600 text-white shadow-sm'
              : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
          }`}
        >
          <PieChart className="w-4 h-4" />
          <span>02. K-MEANS CLUSTERING CANVAS</span>
        </button>
      </div>

      {/* Tab 1: Confusion Matrix Simulator */}
      {activeTab === 'matrix' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-950 border border-slate-800 p-6 sm:p-8 rounded-3xl backdrop-blur-xl">
          
          {/* Controls & Matrix Box */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
              <Zap className="w-5 h-5 text-red-400" />
              <span>Interactive Model Evaluation Matrix</span>
            </h3>

            {/* Matrix Grid Input */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="p-3 rounded-xl bg-red-950/40 border border-red-800/60">
                <span className="block text-[11px] font-mono text-red-300">True Positive (TP)</span>
                <input
                  type="number"
                  value={tp}
                  onChange={e => setTp(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 text-red-300 font-mono text-lg p-1 rounded mt-1"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="block text-[11px] font-mono text-slate-400">False Positive (FP)</span>
                <input
                  type="number"
                  value={fp}
                  onChange={e => setFp(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 text-slate-300 font-mono text-lg p-1 rounded mt-1"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="block text-[11px] font-mono text-red-300">False Negative (FN)</span>
                <input
                  type="number"
                  value={fn}
                  onChange={e => setFn(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 text-red-300 font-mono text-lg p-1 rounded mt-1"
                />
              </div>

              <div className="p-3 rounded-xl bg-red-950/40 border border-red-800/60">
                <span className="block text-[11px] font-mono text-red-300">True Negative (TN)</span>
                <input
                  type="number"
                  value={tn}
                  onChange={e => setTn(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 text-red-300 font-mono text-lg p-1 rounded mt-1"
                />
              </div>
            </div>
          </div>

          {/* Computed Metric Gauges */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-xs font-mono text-slate-400 block mb-1">Accuracy</span>
              <span className="text-3xl font-black text-red-400 font-mono">{accuracy}%</span>
              <span className="text-[10px] text-slate-500 block mt-1">(TP+TN)/Total</span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-xs font-mono text-slate-400 block mb-1">Precision</span>
              <span className="text-3xl font-black text-red-400 font-mono">{precision}%</span>
              <span className="text-[10px] text-slate-500 block mt-1">TP/(TP+FP)</span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-xs font-mono text-slate-400 block mb-1">Recall (Sensitivity)</span>
              <span className="text-3xl font-black text-indigo-400 font-mono">{recall}%</span>
              <span className="text-[10px] text-slate-500 block mt-1">TP/(TP+FN)</span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-xs font-mono text-slate-400 block mb-1">F1-Score</span>
              <span className="text-3xl font-black text-cyan-400 font-mono">{f1}%</span>
              <span className="text-[10px] text-slate-500 block mt-1">Harmonic Mean</span>
            </div>
          </div>

        </div>
      )}

      {/* Tab 2: K-Means Canvas */}
      {activeTab === 'kmeans' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-950 border border-slate-800 p-6 sm:p-8 rounded-3xl backdrop-blur-xl">
          <div className="lg:col-span-7 flex justify-center">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 p-2 shadow-xl">
              <canvas
                ref={canvasRef}
                width={360}
                height={240}
                className="w-full h-auto bg-slate-950 rounded-xl cursor-crosshair"
              />
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-lg font-bold text-white font-mono">K-Means Cluster Optimization</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Watch centroid convergence in real time. K-Means minimizes intra-cluster variance by iteratively recalculating cluster centroids.
            </p>

            <div className="flex gap-3">
              <button
                onClick={stepKMeans}
                className="px-5 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs flex items-center gap-2 hover:bg-red-500 transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run K-Means Iteration Step</span>
              </button>

              <button
                onClick={resetKMeansPoints}
                className="px-4 py-2.5 rounded-xl bg-slate-900 text-slate-300 font-mono text-xs flex items-center gap-2 hover:bg-slate-800 transition-colors cursor-pointer border border-slate-800"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Points</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
