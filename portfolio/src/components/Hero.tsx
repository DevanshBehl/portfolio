import { motion } from 'framer-motion'
import type { Easing } from 'framer-motion'
import { Spotlight } from '@/components/ui/spotlight-new'
import React, { useCallback, useRef, useEffect, memo } from 'react'

const ease: Easing = [0.16, 1, 0.3, 1]

/* ═══════════════════════════════════════════════════════════════════
   NEBULA CLOUD — dual-layer SVG blob background (Huly.io-style)
   ═══════════════════════════════════════════════════════════════════ */

const NebulaCloud = memo(() => {
    return (
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }}>
            {/* ── Primary blob (large) ── */}
            <svg
                width="900"
                height="500"
                viewBox="0 0 900 500"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    mixBlendMode: 'screen',
                    opacity: 0.82,
                    position: 'absolute',
                    left: '50%',
                    top: '20%',
                    transform: 'translateX(-50%)',
                    pointerEvents: 'none',
                    animation: 'nebula-pulse 18s ease-in-out infinite, nebula-drift 26s ease-in-out infinite',
                }}
            >
                <defs>
                    <radialGradient id="nebula1" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="rgba(210,185,255,0.55)" />
                        <stop offset="30%" stopColor="rgba(150,100,255,0.38)" />
                        <stop offset="60%" stopColor="rgba(80,45,200,0.18)" />
                        <stop offset="85%" stopColor="rgba(40,15,120,0.07)" />
                        <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                    </radialGradient>
                    <filter id="f1">
                        <feGaussianBlur stdDeviation="45 30" />
                    </filter>
                </defs>
                <ellipse cx="50%" cy="50%" rx="42%" ry="38%" fill="url(#nebula1)" filter="url(#f1)" />
            </svg>

            {/* ── Secondary blob (accent, cooler) ── */}
            <svg
                width="500"
                height="280"
                viewBox="0 0 500 280"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    mixBlendMode: 'lighten',
                    opacity: 0.65,
                    position: 'absolute',
                    left: '58%',
                    top: '35%',
                    pointerEvents: 'none',
                    animation: 'nebula-pulse-2 14s ease-in-out infinite 3s',
                }}
            >
                <defs>
                    <radialGradient id="nebula2" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="rgba(140,100,255,0.35)" />
                        <stop offset="40%" stopColor="rgba(100,60,220,0.20)" />
                        <stop offset="70%" stopColor="rgba(50,20,160,0.10)" />
                        <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                    </radialGradient>
                    <filter id="f2">
                        <feGaussianBlur stdDeviation="28 20" />
                    </filter>
                </defs>
                <ellipse cx="50%" cy="50%" rx="42%" ry="38%" fill="url(#nebula2)" filter="url(#f2)" />
            </svg>
        </div>
    )
})

/* ═══════════════════════════════════════════════════════════════════
   BOTTOM LAYER — Architecture diagram panels (monochrome)
   ═══════════════════════════════════════════════════════════════════ */

const BottomLayerGrid = memo(() => {
    return (
        <div className="w-full h-full max-w-7xl mx-auto p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 auto-rows-auto items-stretch">

            {/* ─── Distributed System Architecture ─── */}
            <div className="col-span-1 sm:col-span-2 border border-[#1a1a1a] bg-[#080808] rounded-xl p-4 sm:p-5 flex flex-col min-h-[250px] sm:min-h-[300px]">
                <span className="text-[#555] text-[10px] font-mono uppercase tracking-widest mb-4">Distributed System Architecture</span>
                <div className="flex-1 relative">
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 420 280" fill="none">
                        <path d="M210 40 L120 95" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="3 3" />
                        <path d="M210 40 L300 95" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="3 3" />
                        <path d="M120 130 L60 175" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="3 3" />
                        <path d="M120 130 L180 175" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="3 3" />
                        <path d="M300 130 L240 175" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="3 3" />
                        <path d="M300 130 L360 175" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="3 3" />
                        <path d="M60 210 L120 245" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="3 3" />
                        <path d="M180 210 L120 245" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="3 3" />
                        <path d="M240 210 L300 245" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="3 3" />
                        <path d="M360 210 L300 245" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="3 3" />
                        <rect x="155" y="16" width="110" height="30" rx="4" fill="#0d0d0d" stroke="#222" />
                        <text x="210" y="35" textAnchor="middle" fill="#777" fontSize="9" fontFamily="monospace">API Gateway</text>
                        <rect x="60" y="88" width="120" height="30" rx="4" fill="#0d0d0d" stroke="#222" />
                        <text x="120" y="107" textAnchor="middle" fill="#777" fontSize="9" fontFamily="monospace">Auth Service</text>
                        <rect x="240" y="88" width="120" height="30" rx="4" fill="#0d0d0d" stroke="#222" />
                        <text x="300" y="107" textAnchor="middle" fill="#777" fontSize="9" fontFamily="monospace">Order Service</text>
                        <rect x="10" y="168" width="100" height="30" rx="4" fill="#0d0d0d" stroke="#1a1a1a" />
                        <text x="60" y="187" textAnchor="middle" fill="#555" fontSize="8" fontFamily="monospace">Session Store</text>
                        <rect x="130" y="168" width="100" height="30" rx="4" fill="#0d0d0d" stroke="#1a1a1a" />
                        <text x="180" y="187" textAnchor="middle" fill="#555" fontSize="8" fontFamily="monospace">Token Cache</text>
                        <rect x="190" y="168" width="100" height="30" rx="4" fill="#0d0d0d" stroke="#1a1a1a" />
                        <text x="240" y="187" textAnchor="middle" fill="#555" fontSize="8" fontFamily="monospace">Queue Worker</text>
                        <rect x="310" y="168" width="100" height="30" rx="4" fill="#0d0d0d" stroke="#1a1a1a" />
                        <text x="360" y="187" textAnchor="middle" fill="#555" fontSize="8" fontFamily="monospace">Payment Svc</text>
                        <rect x="60" y="235" width="120" height="26" rx="4" fill="#0a0a0a" stroke="#181818" />
                        <text x="120" y="252" textAnchor="middle" fill="#444" fontSize="8" fontFamily="monospace">PostgreSQL Primary</text>
                        <rect x="240" y="235" width="120" height="26" rx="4" fill="#0a0a0a" stroke="#181818" />
                        <text x="300" y="252" textAnchor="middle" fill="#444" fontSize="8" fontFamily="monospace">Redis Cluster</text>
                    </svg>
                </div>
            </div>

            {/* ─── Event-Driven Pipeline ─── */}
            <div className="col-span-1 sm:col-span-2 border border-[#1a1a1a] bg-[#080808] rounded-xl p-4 sm:p-5">
                <span className="text-[#555] text-[10px] font-mono uppercase tracking-widest mb-4 block">Event-Driven Pipeline</span>
                <div className="relative h-24">
                    <svg className="w-full h-full" viewBox="0 0 400 90" fill="none">
                        <path d="M70 25 L130 25" stroke="#222" strokeWidth="1" markerEnd="url(#ah)" />
                        <path d="M230 25 L270 25" stroke="#222" strokeWidth="1" markerEnd="url(#ah)" />
                        <path d="M230 25 L270 55" stroke="#222" strokeWidth="1" markerEnd="url(#ah)" />
                        <path d="M370 25 L395 25" stroke="#222" strokeWidth="1" />
                        <path d="M370 55 L395 55" stroke="#222" strokeWidth="1" />
                        <defs><marker id="ah" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto"><polygon points="0 0, 6 2, 0 4" fill="#333" /></marker></defs>
                        <rect x="5" y="10" width="65" height="30" rx="4" fill="#0d0d0d" stroke="#222" />
                        <text x="37" y="29" textAnchor="middle" fill="#777" fontSize="8" fontFamily="monospace">Producer</text>
                        <rect x="130" y="10" width="100" height="30" rx="4" fill="#0d0d0d" stroke="#222" />
                        <text x="180" y="29" textAnchor="middle" fill="#777" fontSize="8" fontFamily="monospace">Kafka Broker</text>
                        <rect x="270" y="10" width="100" height="30" rx="4" fill="#0d0d0d" stroke="#222" />
                        <text x="320" y="29" textAnchor="middle" fill="#777" fontSize="8" fontFamily="monospace">Consumer A</text>
                        <rect x="270" y="42" width="100" height="30" rx="4" fill="#0d0d0d" stroke="#222" />
                        <text x="320" y="61" textAnchor="middle" fill="#777" fontSize="8" fontFamily="monospace">Consumer B</text>
                    </svg>
                </div>
                <div className="border border-[#1a1a1a] bg-[#0a0a0a] rounded-md p-3 mt-2">
                    <code className="text-[9px] font-mono text-[#555] block leading-relaxed">
                        topic: user.events | partitions: 12 | replication: 3<br />
                        throughput: 45k msg/s | avg latency: 2.3ms<br />
                        consumer-group: order-processor | lag: 0
                    </code>
                </div>
            </div>

            {/* ─── Relational Schema ─── */}
            <div className="col-span-1 sm:col-span-2 border border-[#1a1a1a] bg-[#080808] rounded-xl p-4 sm:p-5">
                <span className="text-[#555] text-[10px] font-mono uppercase tracking-widest mb-3 block">Relational Schema</span>
                <div className="grid grid-cols-3 gap-2">
                    {[
                        { name: 'users', fields: ['id uuid PK', 'email varchar UNIQUE', 'password_hash text', 'role enum', 'created_at timestamptz'] },
                        { name: 'orders', fields: ['id uuid PK', 'user_id FK -> users', 'total decimal(10,2)', 'status enum', 'placed_at timestamptz'] },
                        { name: 'ledger', fields: ['id uuid PK', 'order_id FK -> orders', 'amount decimal', 'type enum', 'settled boolean'] },
                    ].map((table) => (
                        <div key={table.name} className="border border-[#1a1a1a] bg-[#0a0a0a] rounded-lg overflow-hidden">
                            <div className="bg-[#0d0d0d] px-2.5 py-1.5 border-b border-[#1a1a1a]">
                                <span className="text-[#777] text-[9px] font-mono font-semibold">{table.name}</span>
                            </div>
                            <div className="px-2.5 py-1.5 space-y-0.5">
                                {table.fields.map((f) => (
                                    <div key={f} className="text-[#444] text-[8px] font-mono leading-relaxed">{f}</div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ─── Kubernetes Cluster ─── */}
            <div className="col-span-1 sm:col-span-2 border border-[#1a1a1a] bg-[#080808] rounded-xl p-4 sm:p-5">
                <span className="text-[#555] text-[10px] font-mono uppercase tracking-widest mb-3 block">Kubernetes Cluster</span>
                <div className="grid grid-cols-3 gap-2 mb-3">
                    {['Node A', 'Node B', 'Node C'].map((node) => (
                        <div key={node} className="border border-[#1a1a1a] bg-[#0a0a0a] rounded-md p-2.5">
                            <span className="text-[#666] text-[9px] font-mono block mb-1.5">{node}</span>
                            <div className="space-y-1">
                                {['pod-api', 'pod-worker'].map((pod) => (
                                    <div key={`${node}-${pod}`} className="flex items-center gap-1.5">
                                        <div className="w-1 h-1 rounded-full bg-[#444]" />
                                        <span className="text-[#444] text-[8px] font-mono">{pod}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="border border-[#1a1a1a] bg-[#0a0a0a] rounded-md p-2.5">
                    <code className="text-[8px] font-mono text-[#555] block leading-relaxed">
                        $ kubectl get pods -n production<br />
                        NAME{'                '}READY{'   '}STATUS{'    '}RESTARTS{'   '}AGE<br />
                        api-6d4f8b7c-x9k2m{'  '}1/1{'     '}Running{'   '}0{'          '}12d<br />
                        api-6d4f8b7c-p3j7n{'  '}1/1{'     '}Running{'   '}0{'          '}12d<br />
                        worker-8f2a1c-m4k9{'  '}1/1{'     '}Running{'   '}0{'          '}8d
                    </code>
                </div>
            </div>

            {/* ─── Infrastructure Layers ─── */}
            <div className="col-span-1 sm:col-span-2 border border-[#1a1a1a] bg-[#080808] rounded-xl p-4 sm:p-5">
                <span className="text-[#555] text-[10px] font-mono uppercase tracking-widest mb-3 block">Infrastructure Layers</span>
                <div className="space-y-1.5">
                    {[
                        { layer: 'CDN', detail: 'CloudFront / 42 edge locations / TLS 1.3' },
                        { layer: 'Ingress', detail: 'ALB / WAF rules / rate limiting 10k/min' },
                        { layer: 'Compute', detail: 'ECS Fargate / 4 vCPU / auto-scale 2-12' },
                        { layer: 'Cache', detail: 'ElastiCache r6g.large / 3-node cluster' },
                        { layer: 'Database', detail: 'RDS PostgreSQL 15 / Multi-AZ / 500 IOPS' },
                        { layer: 'Storage', detail: 'S3 Standard / lifecycle policies / versioned' },
                        { layer: 'Monitoring', detail: 'CloudWatch / X-Ray traces / custom metrics' },
                    ].map((row) => (
                        <div key={row.layer} className="flex items-center gap-3 border border-[#1a1a1a] bg-[#0a0a0a] rounded-md px-3 py-1.5">
                            <span className="text-[#666] text-[9px] font-mono font-semibold w-20 shrink-0">{row.layer}</span>
                            <span className="text-[#444] text-[8px] font-mono">{row.detail}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ─── Smart Contract ─── */}
            <div className="col-span-1 sm:col-span-2 border border-[#1a1a1a] bg-[#080808] rounded-xl p-4 sm:p-5">
                <span className="text-[#555] text-[10px] font-mono uppercase tracking-widest mb-3 block">Smart Contract</span>
                <div className="border border-[#1a1a1a] bg-[#0a0a0a] rounded-md p-3">
                    <code className="text-[9px] font-mono text-[#555] block leading-[1.7] whitespace-pre">{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Vault {
  mapping(address => uint256) private _balances;
  mapping(address => mapping(address => uint256)) private _allowances;
  uint256 private _totalSupply;

  event Deposit(address indexed from, uint256 amount);
  event Withdraw(address indexed to, uint256 amount);

  function deposit() external payable {
    _balances[msg.sender] += msg.value;
    _totalSupply += msg.value;
    emit Deposit(msg.sender, msg.value);
  }

  function withdraw(uint256 amount) external {
    require(_balances[msg.sender] >= amount);
    _balances[msg.sender] -= amount;
    payable(msg.sender).transfer(amount);
    emit Withdraw(msg.sender, amount);
  }
}`}</code>
                </div>
            </div>

            {/* ─── System Metrics ─── */}
            <div className="col-span-1 sm:col-span-2 border border-[#1a1a1a] bg-[#080808] rounded-xl p-4 sm:p-5">
                <span className="text-[#555] text-[10px] font-mono uppercase tracking-widest mb-3 block">System Metrics</span>
                <div className="grid grid-cols-2 gap-2 mb-3">
                    {[
                        { label: 'Requests/sec', value: '12,847' },
                        { label: 'P99 Latency', value: '23ms' },
                        { label: 'Uptime', value: '99.97%' },
                        { label: 'Error Rate', value: '0.02%' },
                    ].map((metric) => (
                        <div key={metric.label} className="border border-[#1a1a1a] bg-[#0a0a0a] rounded-md px-3 py-2.5">
                            <span className="text-[#444] text-[8px] font-mono block mb-1">{metric.label}</span>
                            <span className="text-[#888] text-base font-mono font-semibold">{metric.value}</span>
                        </div>
                    ))}
                </div>
                <div className="border border-[#1a1a1a] bg-[#0a0a0a] rounded-md p-2.5">
                    <code className="text-[8px] font-mono text-[#444] block leading-relaxed">
                        $ curl -s /health | jq .<br />
                        {'{'}<br />
                        {'  '}"status": "healthy",<br />
                        {'  '}"version": "2.4.1",<br />
                        {'  '}"connections": 2847,<br />
                        {'  '}"memory_mb": 512,<br />
                        {'  '}"cpu_percent": 34.2<br />
                        {'}'}
                    </code>
                </div>
            </div>
        </div>
    )
})

/* ═══════════════════════════════════════════════════════════════════
   FLOWING LIGHT BEAM — Many thin beams concentrated into one laser
   ═══════════════════════════════════════════════════════════════════ */

const BEAM_COUNT = 80

// Pre-compute beam positions — Gaussian-like distribution centered at 0
// More beams clustered at center, fewer toward edges
const beamConfigs = Array.from({ length: BEAM_COUNT }).map((_, i) => {
    // Distribute beams in a bell-curve: center-heavy, edge-sparse
    const t = (i / (BEAM_COUNT - 1)) * 2 - 1 // -1 to 1
    const offset = Math.sign(t) * Math.pow(Math.abs(t), 0.6) * 40 // ±40px from center, clustered
    const duration = 6 + (i % 7) * 1.2 // 6s to ~14s variations
    const delay = (i * 0.3) % 8 // stagger up to 8s then wrap
    const opacity = 1 - Math.abs(t) * 0.5 // center beams brighter

    return { offset, duration, delay, opacity }
})

const FlowingLightBeam = memo(() => {
    return (
        <div
            className="absolute bottom-[100%] left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
                width: '100vw',
                maxWidth: '80rem',
                height: '200vh',
                overflow: 'hidden',
                zIndex: 10,
            }}
        >


            {/* Beam container — all beams centered */}
            <div
                className="absolute inset-0"
                style={{ mixBlendMode: 'screen' }}
            >
                {beamConfigs.map((cfg, i) => (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            left: '50%',
                            marginLeft: `${cfg.offset}px`,
                            top: 0,
                            width: '4px',
                            height: '100%',
                            animation: `beam-fall ${cfg.duration}s linear ${cfg.delay}s infinite both`,
                        }}
                    >
                        {/* Glow halo behind core */}
                        <div
                            style={{
                                position: 'absolute',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                top: 0,
                                width: '40px',
                                height: '100%',
                                background: `linear-gradient(to bottom, transparent 0%, rgba(230,225,255,${0.04 * cfg.opacity}) 20%, rgba(240,235,255,${0.08 * cfg.opacity}) 50%, rgba(230,225,255,${0.04 * cfg.opacity}) 80%, transparent 100%)`,
                                filter: 'blur(12px)',
                                borderRadius: '50%',
                            }}
                        />
                        {/* Core beam — razor thin */}
                        <div
                            style={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                width: '100%',
                                height: '100%',
                                clipPath: 'polygon(48% 0, 52% 0, 58% 100%, 42% 100%)',
                                background: `linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(248,245,255,${0.4 * cfg.opacity}) 10%, rgba(255,255,255,${0.95 * cfg.opacity}) 35%, rgba(245,240,255,${0.9 * cfg.opacity}) 50%, rgba(255,255,255,${0.95 * cfg.opacity}) 65%, rgba(248,245,255,${0.4 * cfg.opacity}) 90%, rgba(255,255,255,0) 100%)`,
                            }}
                        />
                    </div>
                ))}
            </div>


        </div>
    )
})


/* ═══════════════════════════════════════════════════════════════════
   HORIZONTAL LIGHT BEAM — same beams, moving right to left
   ═══════════════════════════════════════════════════════════════════ */

const HorizontalLightBeam = memo(() => {
    return (
        <div
            className="absolute pointer-events-none"
            style={{
                right: 0,
                top: 0,
                width: '100vw',
                height: '100px',
                overflow: 'hidden',
                zIndex: 10,
            }}
        >
            {/* Beam container */}
            <div
                className="absolute inset-0"
                style={{ mixBlendMode: 'screen' }}
            >
                {beamConfigs.map((cfg, i) => (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            marginTop: `${cfg.offset}px`,
                            left: 0,
                            height: '4px',
                            width: '100%',
                            animation: `beam-slide ${cfg.duration}s linear ${cfg.delay}s infinite both`,
                        }}
                    >
                        {/* Glow halo */}
                        <div
                            style={{
                                position: 'absolute',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                left: 0,
                                height: '40px',
                                width: '100%',
                                background: `linear-gradient(to left, transparent 0%, rgba(230,225,255,${0.04 * cfg.opacity}) 20%, rgba(240,235,255,${0.08 * cfg.opacity}) 50%, rgba(230,225,255,${0.04 * cfg.opacity}) 80%, transparent 100%)`,
                                filter: 'blur(12px)',
                                borderRadius: '50%',
                            }}
                        />
                        {/* Core beam */}
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                height: '100%',
                                width: '100%',
                                clipPath: 'polygon(0 48%, 0 52%, 100% 58%, 100% 42%)',
                                background: `linear-gradient(to left, rgba(255,255,255,0) 0%, rgba(248,245,255,${0.4 * cfg.opacity}) 10%, rgba(255,255,255,${0.95 * cfg.opacity}) 35%, rgba(245,240,255,${0.9 * cfg.opacity}) 50%, rgba(255,255,255,${0.95 * cfg.opacity}) 65%, rgba(248,245,255,${0.4 * cfg.opacity}) 90%, rgba(255,255,255,0) 100%)`,
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
})

/* ═══════════════════════════════════════════════════════════════════
   HERO COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

const Hero = () => {
    const sectionRef = useRef<HTMLElement>(null)
    const heroContentRef = useRef<HTMLDivElement>(null)
    const maskRef = useRef<HTMLDivElement>(null)
    const rafPending = useRef(false)
    const rectCache = useRef<DOMRect | null>(null)
    const maskActive = useRef(false)

    // Cache bounding rect — recalculate only on resize / scroll, not every frame
    useEffect(() => {
        const updateRect = () => {
            if (sectionRef.current) {
                rectCache.current = sectionRef.current.getBoundingClientRect()
            }
        }
        updateRect()
        window.addEventListener('resize', updateRect, { passive: true })
        window.addEventListener('scroll', updateRect, { passive: true })
        return () => {
            window.removeEventListener('resize', updateRect)
            window.removeEventListener('scroll', updateRect)
        }
    }, [])

    // Direct DOM manipulation — NO React state, NO re-renders
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
        if (rafPending.current) return
        const clientX = e.clientX
        const clientY = e.clientY
        rafPending.current = true
        requestAnimationFrame(() => {
            rafPending.current = false
            const mask = maskRef.current
            if (!mask) return
            const rect = rectCache.current || sectionRef.current?.getBoundingClientRect()
            if (!rect) return
            const x = clientX - rect.left
            const y = clientY - rect.top
            const halfW = window.innerWidth / 2

            if (x > halfW) {
                // Right half — punch a hole
                const grad = `radial-gradient(circle 350px at ${x}px ${y}px, transparent 0%, transparent 20%, black 70%, black 100%)`
                mask.style.maskImage = grad
                mask.style.webkitMaskImage = grad
                if (!maskActive.current) {
                    mask.style.transition = 'none'
                    maskActive.current = true
                }
            } else if (maskActive.current) {
                // Left half — restore, only if previously active
                mask.style.transition = 'mask-image 0.5s ease-out, -webkit-mask-image 0.5s ease-out'
                mask.style.maskImage = ''
                mask.style.webkitMaskImage = ''
                maskActive.current = false
            }
        })
    }, [])

    const handleMouseLeave = useCallback(() => {
        const mask = maskRef.current
        if (!mask || !maskActive.current) return
        mask.style.transition = 'mask-image 0.5s ease-out, -webkit-mask-image 0.5s ease-out'
        mask.style.maskImage = ''
        mask.style.webkitMaskImage = ''
        maskActive.current = false
    }, [])

    return (
        <section
            id="hero"
            ref={sectionRef}
            className="relative min-h-[160vh] w-full overflow-hidden flex flex-col"
        >
            {/* ═══════════════════════════════════════════════════════
                HERO CONTENT AREA — hover effect only works here
                ═══════════════════════════════════════════════════════ */}
            <div
                ref={heroContentRef}
                className="relative w-full flex flex-col pt-[22vh] pb-16"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                {/* BOTTOM LAYER — Grid */}
                <div className="absolute inset-0 z-0 overflow-hidden pt-20">
                    <BottomLayerGrid />
                </div>

                {/* TOP LAYER — Black mask overlay (constrained to hero content) */}
                <div
                    ref={maskRef}
                    className="absolute inset-0 z-10 bg-black pointer-events-none"
                    style={{ contain: 'strict' }}
                />

                {/* SPOTLIGHT */}
                <div className="absolute inset-0 z-[11] pointer-events-none">
                    <Spotlight
                        gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(0, 0%, 100%, .08) 0, hsla(0, 0%, 80%, .02) 50%, hsla(0, 0%, 60%, 0) 80%)"
                        gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(0, 0%, 100%, .06) 0, hsla(0, 0%, 80%, .02) 80%, transparent 100%)"
                        gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(0, 0%, 100%, .04) 0, hsla(0, 0%, 60%, .02) 80%, transparent 100%)"
                        translateY={-350}
                        width={560}
                        height={1380}
                        smallWidth={240}
                        duration={7}
                        xOffset={100}
                    />
                </div>

                {/* NEBULA */}
                <NebulaCloud />

                {/* TEXT CONTENT */}
                <div className="relative z-20 max-w-5xl w-full text-left pointer-events-auto px-10 sm:px-16 lg:px-24 mb-16">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2, ease }}
                        className="text-[#888888] text-xs sm:text-sm font-medium tracking-[0.2em] uppercase mb-6 sm:mb-8"
                    >
                        Full Stack Developer · Web3 Developer · DevOps Engineer
                    </motion.p>

                    <div className="overflow-hidden mb-2 sm:mb-3">
                        <motion.h1
                            initial={{ y: '100%', opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.9, delay: 0.4, ease }}
                            className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-tighter text-white leading-[0.9]"
                        >
                            Devansh
                        </motion.h1>
                    </div>
                    <div className="overflow-hidden mb-6 sm:mb-8">
                        <motion.h1
                            initial={{ y: '100%', opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.9, delay: 0.55, ease }}
                            className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-tighter text-white leading-[0.9]"
                        >
                            Behl
                        </motion.h1>
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.8, ease }}
                        className="text-lg sm:text-xl lg:text-2xl text-[#a1a1a1] font-normal max-w-2xl mb-4 leading-relaxed"
                    >
                        Full Stack &amp; Web3 Engineer building scalable systems.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.95, ease }}
                        className="text-sm sm:text-base text-[#888888] font-normal max-w-xl mb-10 sm:mb-12 leading-relaxed"
                    >
                        I design and build high-performance web applications, decentralized
                        systems, and production-grade cloud infrastructure.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 1.1, ease }}
                        className="flex flex-col sm:flex-row items-start justify-start gap-4"
                    >
                        <motion.a
                            href="#projects"
                            whileHover={{ scale: 1.04, borderColor: '#555555' }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ duration: 0.2 }}
                            className="px-8 py-3.5 border border-[#333333] text-white text-sm font-medium tracking-wide rounded-full inline-flex items-center gap-2 transition-colors duration-300 hover:bg-[#111111]"
                        >
                            View Projects
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </motion.a>
                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ duration: 0.2 }}
                            className="px-8 py-3.5 bg-white text-black text-sm font-medium tracking-wide rounded-full transition-colors duration-300 hover:bg-[#e0e0e0]"
                        >
                            Contact Me
                        </motion.a>
                    </motion.div>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════════
                TABLET CONTAINER — full-width bordered device
                The light beam falls onto this. No hover effect here.
                ═══════════════════════════════════════════════════════ */}
            <div className="relative z-30 w-full px-6 sm:px-10 lg:px-16 mb-32">
                {/* Laser Beam — positioned to fall onto the tablet from above */}
                <div className="absolute right-[15%] top-0 z-40">
                    <FlowingLightBeam />
                </div>

                {/* Horizontal Beam — left side, 20% up from bottom */}
                <div className="absolute left-0 bottom-[20%] z-20 h-[100px] w-6 sm:w-10 lg:w-16 overflow-visible">
                    <HorizontalLightBeam />
                </div>



                <div className="relative w-full border border-[#222] rounded-2xl bg-[#0a0a0a] overflow-hidden">
                    {/* Top edge glow */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#444] to-transparent" />


                    {/* Tablet content */}
                    <div className="relative flex flex-col lg:flex-row items-center lg:items-stretch">
                        {/* Text content — left side */}
                        <div className="w-full lg:w-3/5 px-10 sm:px-16 lg:px-20 py-16 sm:py-20 lg:py-24 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4 text-[#fdfbf7] drop-shadow-lg">
                                Systems-oriented engineer.
                            </h2>
                            <div className="h-[2px] w-12 lg:w-16 bg-[#fdfbf7] mb-6 shadow-[0_0_10px_rgba(253,251,247,0.5)] mx-auto lg:mx-0" />
                            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 lg:mb-8 font-medium max-w-lg">
                                I am a systems-oriented full stack developer specializing in
                                scalable backend architecture, modern frontend engineering, and
                                decentralized application development. I focus on performance,
                                clean abstractions, and production-ready infrastructure.
                            </p>
                            <div className="flex flex-col gap-3">
                                {[
                                    'Clean, maintainable architecture',
                                    'Distributed systems & event-driven design',
                                    'DevOps & cloud-native infrastructure',
                                    'Web3 & blockchain development',
                                    'Performance-first mindset'
                                ].map((item) => (
                                    <div key={item} className="flex items-center gap-3 justify-center lg:justify-start">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#fdfbf7] shadow-[0_0_8px_rgba(253,251,247,0.8)]" />
                                        <span className="text-gray-200 text-sm sm:text-base font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Photo frame — right side */}
                        <div className="w-full lg:w-2/5 flex items-center justify-center py-10 lg:py-16 px-8 lg:px-10 lg:pr-16">
                            <div className="relative w-full max-w-[320px] aspect-square">
                                {/* Outer metallic frame */}
                                <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-[#2a2a2a] via-[#1a1a1a] to-[#222]" />
                                {/* Frame inner edge highlight */}
                                <div className="absolute inset-[1px] rounded-lg bg-gradient-to-b from-[#333] via-[#111] to-[#1a1a1a]" />
                                {/* Matte / passepartout */}
                                <div className="absolute inset-[4px] rounded-md bg-[#0d0d0d]" />

                                {/* Corner brackets — top left */}
                                <div className="absolute top-[14px] left-[14px] w-5 h-[1px] bg-[#444]" />
                                <div className="absolute top-[14px] left-[14px] w-[1px] h-5 bg-[#444]" />
                                {/* Corner brackets — top right */}
                                <div className="absolute top-[14px] right-[14px] w-5 h-[1px] bg-[#444]" />
                                <div className="absolute top-[14px] right-[14px] w-[1px] h-5 bg-[#444]" />
                                {/* Corner brackets — bottom left */}
                                <div className="absolute bottom-[14px] left-[14px] w-5 h-[1px] bg-[#444]" />
                                <div className="absolute bottom-[14px] left-[14px] w-[1px] h-5 bg-[#444]" />
                                {/* Corner brackets — bottom right */}
                                <div className="absolute bottom-[14px] right-[14px] w-5 h-[1px] bg-[#444]" />
                                <div className="absolute bottom-[14px] right-[14px] w-[1px] h-5 bg-[#444]" />

                                {/* Photo area */}
                                <div className="absolute inset-[18px] rounded overflow-hidden">
                                    <img
                                        src="/devansh.jpg"
                                        alt="Devansh Behl"
                                        className="w-full h-full object-cover grayscale brightness-90 contrast-110"
                                    />
                                    {/* Top light reflection */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-transparent" />
                                    {/* Inner shadow vignette */}
                                    <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.7)]" />
                                </div>

                                {/* Bottom label plaque */}
                                <div className="absolute bottom-[5px] left-1/2 -translate-x-1/2">
                                    <div className="px-4 py-[2px] bg-[#151515] border border-[#2a2a2a] rounded-sm">
                                        <span className="text-[8px] font-mono text-[#555] tracking-[0.2em] uppercase">DB</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 1.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-auto"
            >
                <span className="text-[#555555] text-xs tracking-widest uppercase">Scroll</span>
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-[1px] h-8 bg-[#888888]"
                />
            </motion.div>
        </section>
    )
}

export default Hero

