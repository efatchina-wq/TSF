import React, { useState, useEffect } from 'react';

interface Node {
  id: string;
  label: string;
  category: 'core' | 'formation' | 'credential' | 'market';
  angle: number; // in degrees
  distance: number; // radius from center in SVG units
  description: string;
}

const NODES: Node[] = [
  { id: 'competences', label: 'COMPÉTENCES', category: 'formation', angle: 200, distance: 160, description: 'Tests cognitifs et psychométriques standardisés' },
  { id: 'formation', label: 'FORMATION', category: 'formation', angle: 160, distance: 155, description: 'Académies intensives et immersion en situation réelle' },
  { id: 'certification', label: 'CERTIFICATION', category: 'credential', angle: 115, distance: 165, description: 'Titre infalsifiable homologué par jury international' },
  { id: 'mentorat', label: 'MENTORAT', category: 'formation', angle: 70, distance: 150, description: 'Parrainage direct par des dirigeants d’élite mondiaux' },
  { id: 'emploi', label: 'EMPLOI', category: 'market', angle: 25, distance: 160, description: 'Fast-track auprès des multinationales et ministères' },
  { id: 'entrepreneuriat', label: 'ENTREPRENEURIAT', category: 'market', angle: 340, distance: 165, description: 'Structuration de projets à haute valeur industrielle' },
  { id: 'financement', label: 'FINANCEMENT', category: 'market', angle: 295, distance: 155, description: 'Capital d’amorçage patient via SourceFund Africa' },
  { id: 'marches', label: 'MARCHÉS', category: 'market', angle: 250, distance: 160, description: 'Accès prioritaire aux grands contrats continentaux' },
  { id: 'reseaux', label: 'RÉSEAUX', category: 'credential', angle: 215, distance: 110, description: 'Confrérie active des alumni répartis dans 35 pays' }
];

export const TalentNetworkVisual: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [activeNode, setActiveNode] = useState<Node | null>(null);
  const [pulsePhase, setPulsePhase] = useState(0);

  // Center coordinate in 420x420 coordinate system
  const cx = 210;
  const cy = 210;

  useEffect(() => {
    const interval = setInterval(() => {
      setPulsePhase((prev) => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* Decorative ambient subtle background grid */}
      <div className="absolute inset-0 bg-radial from-slate-100/80 via-transparent to-transparent opacity-80 pointer-events-none rounded-full" />

      {/* SVG Canvas */}
      <svg
        viewBox="0 0 420 420"
        className="w-full max-w-[440px] h-auto select-none overflow-visible"
        aria-label="Visualisation du Réseau de Propulsion du Talent Africain TSF"
      >
        <defs>
          {/* Subtle glow filter */}
          <filter id="subtle-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Gradients */}
          <linearGradient id="orbit-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0070C0" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#FF6600" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0070C0" stopOpacity="0.08" />
          </linearGradient>

          <radialGradient id="center-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0070C0" />
            <stop offset="90%" stopColor="#004D85" />
            <stop offset="100%" stopColor="#FF6600" />
          </radialGradient>
        </defs>

        {/* Outer orbital guides */}
        <circle cx={cx} cy={cy} r="160" fill="none" stroke="url(#orbit-grad)" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx={cx} cy={cy} r="110" fill="none" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="2 4" />
        <circle cx={cx} cy={cy} r="60" fill="none" stroke="#CBD5E1" strokeWidth="0.8" />

        {/* Dynamic connection lines to surrounding nodes */}
        {NODES.map((node, idx) => {
          const rad = (node.angle * Math.PI) / 180;
          const x = cx + node.distance * Math.cos(rad);
          const y = cy + node.distance * Math.sin(rad);
          const isHighlighted = activeNode?.id === node.id;

          // Pulse dot progression along the wire
          const dotT = ((pulsePhase + idx * 11) % 100) / 100;
          const dotX = cx + (x - cx) * dotT;
          const dotY = cy + (y - cy) * dotT;

          return (
            <g key={`wire-${node.id}`}>
              {/* Primary hairline wire */}
              <line
                x1={cx}
                y1={cy}
                x2={x}
                y2={y}
                stroke={isHighlighted ? '#FF6600' : '#CBD5E1'}
                strokeWidth={isHighlighted ? '1.8' : '1'}
                strokeOpacity={isHighlighted ? '1' : '0.6'}
                className="transition-all duration-300"
              />

              {/* Data packet pulse along connection line */}
              <circle
                cx={dotX}
                cy={dotY}
                r={isHighlighted ? 2.5 : 1.5}
                fill={isHighlighted ? '#FF6600' : '#0070C0'}
                opacity={isHighlighted ? 0.9 : 0.4}
              />
            </g>
          );
        })}

        {/* Central Core: TALENT */}
        <g className="cursor-pointer group">
          {/* Animated subtle halo */}
          <circle
            cx={cx}
            cy={cy}
            r="44"
            fill="none"
            stroke="#FF6600"
            strokeWidth="1.2"
            opacity="0.3"
            strokeDasharray="4 2"
            className="animate-spin"
            style={{ animationDuration: '30s', transformOrigin: `${cx}px ${cy}px` }}
          />

          {/* Central Hub Circle */}
          <circle
            cx={cx}
            cy={cy}
            r="36"
            fill="url(#center-core)"
            filter="url(#subtle-glow)"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            className="transition-transform duration-300 group-hover:scale-105"
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />

          {/* Center Text */}
          <text
            x={cx}
            y={cy - 2}
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="11"
            fontWeight="800"
            letterSpacing="2"
            fontFamily="system-ui, sans-serif"
          >
            TALENT
          </text>
          <text
            x={cx}
            y={cy + 11}
            textAnchor="middle"
            fill="#FBBF24"
            fontSize="7"
            fontWeight="700"
            letterSpacing="1.5"
            fontFamily="monospace"
          >
            AFRICAIN
          </text>
        </g>

        {/* Satellite Nodes */}
        {NODES.map((node) => {
          const rad = (node.angle * Math.PI) / 180;
          const x = cx + node.distance * Math.cos(rad);
          const y = cy + node.distance * Math.sin(rad);
          const isSelected = activeNode?.id === node.id;

          return (
            <g
              key={node.id}
              className="cursor-pointer transition-transform duration-200"
              onMouseEnter={() => setActiveNode(node)}
              onMouseLeave={() => setActiveNode(null)}
              onClick={() => setActiveNode(node)}
              tabIndex={0}
              role="button"
              aria-label={node.label}
              onFocus={() => setActiveNode(node)}
              onBlur={() => setActiveNode(null)}
            >
              {/* Outer hover ring */}
              <circle
                cx={x}
                cy={y}
                r={isSelected ? 18 : 13}
                fill={isSelected ? '#0070C0' : '#FFFFFF'}
                stroke={isSelected ? '#FF6600' : '#0070C0'}
                strokeWidth={isSelected ? 2 : 1.2}
                className="transition-all duration-200"
              />

              {/* Inner core dot */}
              <circle
                cx={x}
                cy={y}
                r={isSelected ? 5 : 3.5}
                fill={isSelected ? '#FF6600' : '#0070C0'}
                className="transition-colors duration-200"
              />

              {/* Label Pill */}
              <rect
                x={x - 44}
                y={y > cy ? y + 10 : y - 24}
                width="88"
                height="16"
                rx="3"
                fill={isSelected ? '#0070C0' : '#FFFFFF'}
                stroke={isSelected ? '#FF6600' : '#E2E8F0'}
                strokeWidth="1"
                className="transition-all duration-200 shadow-2xs"
              />
              <text
                x={x}
                y={y > cy ? y + 21 : y - 13}
                textAnchor="middle"
                fill={isSelected ? '#FFFFFF' : '#1E293B'}
                fontSize="8"
                fontWeight="700"
                letterSpacing="0.8"
                fontFamily="system-ui, sans-serif"
                className="transition-colors duration-200 select-none pointer-events-none"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Floating Detail Tooltip */}
      <div className="mt-4 min-h-[46px] w-full max-w-sm px-3 py-2 bg-white/95 border border-slate-200/90 rounded-md text-center shadow-xs transition-all duration-200">
        {activeNode ? (
          <div>
            <span className="text-[11px] font-mono text-[#0070C0] font-bold uppercase tracking-wider block">
              {activeNode.label}
            </span>
            <p className="text-xs text-slate-600 mt-0.5 leading-snug">
              {activeNode.description}
            </p>
          </div>
        ) : (
          <p className="text-xs text-slate-400 font-mono flex items-center justify-center gap-1.5 pt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6600] animate-pulse" />
            <span>Survolez ou touchez un nœud pour explorer les connexions</span>
          </p>
        )}
      </div>
    </div>
  );
};
