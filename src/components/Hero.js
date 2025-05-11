import React, { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';
import { 
  Terminal, 
  TrendingUp, 
  Clock, 
  Globe, 
  Coffee,
  Activity,
  Monitor,
  Cpu
} from 'lucide-react';

export const Hero = () => {
  const typedRef = useRef(null);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ['Software Developer', 'Quantitative Analyst', 'Financial Mathematics Graduate'],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      startDelay: 1000,
      loop: true,
    });

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      typed.destroy();
      clearInterval(timer);
    };
  }, []);

  return (
    <section className="min-h-screen bg-black text-green-500 font-mono">
      {/* Terminal Header */}
      <div className="border-b border-green-900 p-2 flex justify-between items-center bg-black">
        <div className="flex items-center gap-3">
          <Terminal size={16} />
          <span>VIK {`<GO>`}</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock size={14} />
            <span>{time.toLocaleTimeString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe size={14} />
            <span>SWE</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-1 p-1">
        {/* Left Column */}
        <div className="col-span-3 space-y-1">
          <div className="border border-green-900 p-3 bg-black">
            <h2 className="text-xs mb-2 text-green-600">PROFILE</h2>
            <p className="text-sm mb-4">{`>>DEVELOPER`}</p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span>NAME</span>
                <span className="text-white">VIKTOR ÅGREN</span>
              </div>
              <div className="flex justify-between">
                <span>LOCATION</span>
                <span className="text-white">STOCKHOLM, SWE</span>
              </div>
              <div className="flex justify-between">
                <span>SPECIALTY</span>
                <span className="text-white">QUANT</span>
              </div>
            </div>
          </div>

          <div className="border border-green-900 p-3 bg-black">
            <h2 className="text-xs mb-2 text-green-600">METRICS</h2>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span>YOE</span>
                <span className="text-white">1+</span>
              </div>
              <div className="flex justify-between">
                <span>PROJ</span>
                <span className="text-white">X</span>
              </div>
              <div className="flex justify-between">
                <span>TECH</span>
                <span className="text-white">X</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Terminal Area */}
        <div className="col-span-9 space-y-1">
          <div className="border border-green-900 p-4 bg-black h-[calc(100vh-8rem)]">
            <div className="flex items-center gap-2 mb-6">
              <Activity size={16} />
              <span className="text-sm">TERMINAL ACTIVE</span>
            </div>

            <div className="mb-8">
              <p className="text-xs text-green-600 mb-1">CMD:</p>
              <h1 className="text-2xl text-white font-bold mb-2">VIKTOR ÅGREN</h1>
              <div className="text-sm mb-4">
                I'm a <span ref={typedRef} className="text-white"></span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="border border-green-900 p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Monitor size={14} />
                  <span className="text-xs">TECH STACK</span>
                </div>
                <div className="text-xs space-y-1">
                  <p>PYTHON • SQL • GIT</p>
                  <p>R • Matlab • C#</p>
                </div>
              </div>

              <div className="border border-green-900 p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Cpu size={14} />
                  <span className="text-xs">SPECIALIZATION</span>
                </div>
                <div className="text-xs space-y-1">
                  <p>QUANTITATIVE ANALYSIS</p>
                  <p>FINANCIAL MATHEMATICS</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs">{`>> Type "PROJ" to view projects`}</p>
              <p className="text-xs">{`>> Type "CONT" to contact`}</p>
              <p className="text-xs">{`>> Type "HELP" for more commands`}</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
