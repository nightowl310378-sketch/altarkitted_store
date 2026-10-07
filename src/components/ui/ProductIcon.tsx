import React from 'react';
import { Product } from '../../types';

const SHIELD_PATH =
  'M368 210 L558 268 L558 452 C558 560 470 630 368 662 C266 630 178 560 178 452 L178 268 Z';

const TIER: Record<string, [string, string]> = {
  mvp: ['#818cf8', '#312e81'],
  altar: ['#60a5fa', '#1e40af'],
  'altar-plus': ['#a78bfa', '#6d28d9'],
  'custom-rank': ['#f47195', '#9d174d'],
  'upgrade-mvp-altar': ['#c7d2fe', '#6366f1'],
  'upgrade-altar-plus': ['#c7d2fe', '#6366f1'],
  'upgrade-custom': ['#c7d2fe', '#6366f1'],
  'key-koth': ['#f87171', '#991b1b'],
  'key-custom': ['#93c5fd', '#1e3a8a'],
  'key-pumpkin': ['#fb923c', '#9a3412'],
  'key-undead': ['#a3e635', '#3f6212'],
};

const MONOGRAM: Record<string, string> = {
  mvp: 'M',
  altar: 'A',
  'altar-plus': 'A+',
  'custom-rank': 'CR',
};

const TierDefs: React.FC<{ id: string; from: string; to: string }> = ({ id, from, to }) => (
  <defs>
    <linearGradient id={`${id}-tier`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor={from} />
      <stop offset="100%" stopColor={to} />
    </linearGradient>
    <linearGradient id={`${id}-blade`} x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor="#f8fafc" />
      <stop offset="50%" stopColor="#cbd5e1" />
      <stop offset="100%" stopColor="#94a3b8" />
    </linearGradient>
    <linearGradient id={`${id}-gloss`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
      <stop offset="45%" stopColor="#ffffff" stopOpacity="0" />
    </linearGradient>
  </defs>
);

const Sword: React.FC<{ id: string; rotate: number }> = ({ id, rotate }) => (
  <g transform={`rotate(${rotate} 368 400)`}>
    <polygon points="368,132 392,178 392,440 344,440 344,178" fill={`url(#${id}-blade)`} />
    <rect x="300" y="440" width="136" height="26" rx="8" fill={`url(#${id}-tier)`} />
    <rect x="354" y="466" width="28" height="72" rx="8" fill="#292524" />
    <circle cx="368" cy="548" r="18" fill={`url(#${id}-tier)`} />
  </g>
);

const KeyGlyph: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx="0" cy="-60" r="52" fill="none" stroke="#ffffff" strokeWidth="34" />
    <rect x="-17" y="-20" width="34" height="150" rx="10" fill="#ffffff" />
    <rect x="17" y="46" width="52" height="26" rx="8" fill="#ffffff" />
    <rect x="17" y="94" width="40" height="26" rx="8" fill="#ffffff" />
  </g>
);

const PumpkinGlyph: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x="-12" y="-108" width="24" height="40" rx="6" fill="#16a34a" transform="rotate(-12)" />
    <circle cx="0" cy="0" r="82" fill="#f97316" />
    <circle cx="0" cy="0" r="82" fill="none" stroke="#c2410c" strokeWidth="8" />
    <rect x="-70" y="-70" width="20" height="140" rx="9" fill="#ea580c" opacity="0.6" />
    <rect x="50" y="-70" width="20" height="140" rx="9" fill="#ea580c" opacity="0.6" />
    <polygon points="-42,-18 -14,-18 -28,8" fill="#431407" />
    <polygon points="42,-18 14,-18 28,8" fill="#431407" />
    <path d="M -34 34 Q 0 58 34 34 Q 0 46 -34 34" fill="#431407" />
  </g>
);

interface EmblemProps {
  product: Product;
}

const RankEmblem: React.FC<EmblemProps> = ({ product }) => {
  const id = product.icon ?? 'x';
  const [from, to] = TIER[id] ?? ['#818cf8', '#312e81'];
  const isKey = id.startsWith('key-');
  const isUpgrade = id.startsWith('upgrade-');

  return (
    <svg
      viewBox="0 0 736 691"
      preserveAspectRatio="xMidYMax meet"
      className="w-full h-full"
      style={{ filter: 'drop-shadow(0 8px 14px rgba(0,0,0,0.55))' }}
      role="img"
      aria-label={product.name}
    >
      <TierDefs id={id} from={from} to={to} />

      {/* Name banner */}
      <text
        x="368"
        y="102"
        textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="900"
        fontSize={product.name.length > 10 ? 76 : 96}
        letterSpacing="4"
        fill={`url(#${id}-tier)`}
        stroke="#171a35"
        strokeWidth="14"
        paintOrder="stroke"
      >
        {product.name}
      </text>

      {/* Crossed swords */}
      <Sword id={id} rotate={45} />
      <Sword id={id} rotate={-45} />

      {/* Crest shield */}
      <path d={SHIELD_PATH} fill="#171a35" opacity="0.9" transform="translate(6 8)" />
      <path d={SHIELD_PATH} fill={`url(#${id}-tier)`} />
      <path d={SHIELD_PATH} fill={`url(#${id}-gloss)`} />
      <path
        d={SHIELD_PATH}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.55"
        strokeWidth="7"
      />

      {/* Emblem inside shield */}
      {isKey && id !== 'key-pumpkin' && <KeyGlyph x={368} y={430} s={1} />}
      {id === 'key-pumpkin' && <PumpkinGlyph x={368} y={430} s={1} />}
      {isUpgrade && (
        <g fill="#ffffff" stroke="#171a35" strokeWidth="6" paintOrder="stroke">
          <path d="M368 330 L470 430 L428 430 L428 470 L308 470 L308 430 L266 430 Z" />
          <path d="M368 470 L458 552 L424 552 L424 588 L312 588 L312 552 L278 552 Z" />
        </g>
      )}
      {!isKey && !isUpgrade && (
        <text
          x="368"
          y="510"
          textAnchor="middle"
          fontFamily="Inter, system-ui, sans-serif"
          fontWeight="900"
          fontSize="170"
          fill="#ffffff"
          stroke="#171a35"
          strokeWidth="12"
          paintOrder="stroke"
        >
          {MONOGRAM[id] ?? '★'}
        </text>
      )}
    </svg>
  );
};

interface ProductIconProps {
  product: Product;
  iconSize?: number;
  className?: string;
}

const ProductIcon: React.FC<ProductIconProps> = ({ product, className = '' }) => {
  if (product.image) {
    return (
      <div
        className={`relative flex items-end justify-center overflow-hidden bg-gradient-to-br ${
          product.color ?? 'from-pink-400 to-indigo-700'
        } ${className}`}
      >
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(circle at 25% 12%, rgba(255,255,255,0.35), transparent 55%)' }}
        />
        <img
          src={product.image}
          alt={product.name}
          className="relative w-full h-full object-contain object-bottom p-2"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-end justify-center overflow-hidden bg-gradient-to-br ${
        product.color ?? 'from-pink-400 to-indigo-700'
      } ${className}`}
    >
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(circle at 25% 12%, rgba(255,255,255,0.35), transparent 55%)' }}
      />
      <div className="relative w-full h-full p-2">
        <RankEmblem product={product} />
      </div>
    </div>
  );
};

export default ProductIcon;
