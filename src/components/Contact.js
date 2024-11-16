import React, { useEffect, useState } from 'react';
import { Mail, MapPin, Globe, Terminal, Clock, Activity, Network } from 'lucide-react';

// Tech hub data for visualization
const techHubs = [
  { id: 1, name: 'STOCKHOLM', x: 200, y: 150, connections: [2, 3], size: 20 },
  { id: 2, name: 'UPPSALA', x: 200, y: 100, connections: [1], size: 15, current: true },
  { id: 3, name: 'GOTHENBURG', x: 100, y: 200, connections: [1], size: 12 },
  { id: 4, name: 'MALMÖ', x: 150, y: 300, connections: [3], size: 12 },
  { id: 5, name: 'LINKÖPING', x: 250, y: 200, connections: [1, 2], size: 10 }
];

export const Contact = () => {
  const [activeNode, setActiveNode] = useState(null);
  const [networkStatus, setNetworkStatus] = useState([]);

  useEffect(() => {
    // Simulate network activity logs
    const interval = setInterval(() => {
      setNetworkStatus(prev => {
        const newStatus = [
          `Connection established with ${techHubs[Math.floor(Math.random() * techHubs.length)].name}`,
          ...prev
        ].slice(0, 5);
        return newStatus;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const SwedenMap = () => (
    <svg viewBox="0 0 400 400" className="w-full h-full">
      {/* Connection lines */}
      {techHubs.map(hub => 
        hub.connections.map(connId => {
          const connectedHub = techHubs.find(h => h.id === connId);
          return (
            <g key={`${hub.id}-${connId}`}>
              <line
                x1={hub.x}
                y1={hub.y}
                x2={connectedHub.x}
                y2={connectedHub.y}
                stroke="#0f766e"
                strokeWidth="1"
                className="animate-pulse"
              />
              {/* Data flow animation */}
              <circle className="animate-ping-slow">
                <animateMotion
                  dur="3s"
                  repeatCount="indefinite"
                  path={`M${hub.x},${hub.y} L${connectedHub.x},${connectedHub.y}`}
                />
              </circle>
            </g>
          );
        })
      )}

      {/* Tech hub nodes */}
      {techHubs.map(hub => (
        <g
          key={hub.id}
          transform={`translate(${hub.x},${hub.y})`}
          onMouseEnter={() => setActiveNode(hub)}
          onMouseLeave={() => setActiveNode(null)}
          className="cursor-pointer"
        >
          <circle
            r={hub.size / 2}
            fill={hub.current ? '#059669' : '#1f2937'}
            stroke="#0f766e"
            strokeWidth="2"
            className={`${hub.current ? 'animate-pulse' : ''}`}
          />
          <text
            y={hub.size + 10}
            textAnchor="middle"
            fill="#6ee7b7"
            className="text-[8px]"
          >
            {hub.name}
          </text>
        </g>
      ))}
    </svg>
  );

  return (
    <section id="contact" className="min-h-screen bg-black text-green-500 font-mono py-20">
      <div className="container mx-auto px-4">
        {/* Terminal Header */}
        <div className="border border-green-900 p-2 mb-4 flex items-center justify-between bg-black">
          <div className="flex items-center gap-2">
            <Terminal size={14} />
            <span className="text-xs">NETWORK_TERMINAL <span className="text-green-600">{`<F6>`}</span></span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} />
            <span className="text-xs">{new Date().toLocaleTimeString()}</span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* Contact Info Panel */}
          <div className="col-span-4 space-y-4">
            <div className="border border-green-900 p-4 bg-black">
              <div className="flex items-center gap-2 mb-4">
                <Activity size={14} />
                <span className="text-xs text-green-600">CONTACT INFO</span>
              </div>
              <div className="space-y-4">
                <div className="text-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <Mail size={12} />
                    <span className="text-green-600">EMAIL</span>
                  </div>
                  <a href="mailto:99viktor.agren@gmail.com" className="text-white hover:text-green-500">
                    99VIKTOR.AGREN@GMAIL.COM
                  </a>
                </div>
                <div className="text-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin size={12} />
                    <span className="text-green-600">LOCATION</span>
                  </div>
                  <span className="text-white">STOCKHOLM, SWEDEN</span>
                </div>
                <div className="text-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <Globe size={12} />
                    <span className="text-green-600">TIMEZONE</span>
                  </div>
                  <span className="text-white">CET (UTC+1)</span>
                </div>
              </div>
            </div>

            {/* Network Status */}
            <div className="border border-green-900 p-4 bg-black">
              <div className="flex items-center gap-2 mb-4">
                <Network size={14} />
                <span className="text-xs text-green-600">NETWORK STATUS</span>
              </div>
              <div className="text-xs space-y-2">
                {networkStatus.map((status, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-green-600">&gt;</span>
                    <span className="text-white">{status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Node Info */}
            {activeNode && (
              <div className="border border-green-900 p-4 bg-black">
                <div className="flex items-center gap-2 mb-4">
                  <Activity size={14} />
                  <span className="text-xs text-green-600">NODE DETAILS</span>
                </div>
                <div className="text-xs space-y-2">
                  <div className="flex justify-between">
                    <span>LOCATION</span>
                    <span className="text-white">{activeNode.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CONNECTIONS</span>
                    <span className="text-white">{activeNode.connections.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>STATUS</span>
                    <span className="text-green-400">ACTIVE</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Map Visualization */}
          <div className="col-span-8">
            <div className="border border-green-900 bg-black h-full">
              <div className="border-b border-green-900 p-2">
                <span className="text-xs text-green-600">NETWORK_MAP</span>
              </div>
              <div className="p-4 h-[600px]">
                <SwedenMap />
              </div>
              
              {/* Terminal Output */}
              <div className="border-t border-green-900 p-4">
                <div className="text-xs space-y-1">
                  <p>{`>> Network monitoring active`}</p>
                  <p>{`>> Hover over nodes for details`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};