import { useState, useEffect, useRef } from 'react'
import {
  Home, PlusCircle, PlaySquare, User,
  Search, Bell, Cast, MoreVertical, ExternalLink, ArrowUpRight,
  X, Send, ShoppingBag
} from 'lucide-react'
import './App.css'

// ─── Inline SVG Shoe Components ────────────────────────────────────────────────

function ShoeSneakerSide({ className = '' }) {
  return (
    <svg viewBox="0 0 200 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 65 C30 45, 50 30, 80 28 C100 26, 130 25, 155 30 C170 33, 185 40, 190 55 L190 70 C190 75, 185 80, 180 80 L25 80 C20 80, 18 75, 20 70 Z" fill="#1a1a1a"/>
      <path d="M25 72 C25 68, 30 65, 35 65 L180 65 C185 65, 192 68, 192 72 L192 78 C192 82, 188 85, 184 85 L22 85 C18 85, 15 82, 15 78 Z" fill="#f5f0e8"/>
      <path d="M80 28 C82 35, 75 42, 70 45 C65 48, 55 52, 45 58 C40 61, 35 63, 30 65" stroke="#2a2a2a" strokeWidth="1" fill="none"/>
      <ellipse cx="110" cy="50" rx="25" ry="8" fill="#2a2a2a" opacity="0.3"/>
      <text x="95" y="55" fontFamily="serif" fontStyle="italic" fontSize="11" fill="#ffffff" opacity="0.8">allbirds</text>
    </svg>
  )
}

function ShoeHighTop({ className = '' }) {
  return (
    <svg viewBox="0 0 160 140" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M45 30 C45 20, 55 12, 70 10 C85 8, 95 10, 105 15 C110 18, 115 25, 115 35 L115 80 C115 85, 125 90, 135 95 L140 100 C142 102, 142 108, 140 110 L20 110 C15 110, 12 107, 15 103 L25 95 C30 90, 40 85, 45 80 Z" fill="#1a2744"/>
      <path d="M15 103 C15 99, 20 96, 25 96 L140 96 C145 96, 148 99, 148 103 L148 108 C148 112, 145 115, 140 115 L15 115 C10 115, 8 112, 10 108 Z" fill="#c8915a"/>
      <path d="M55 20 L55 45 M70 15 L70 40 M85 15 L85 40" stroke="#243050" strokeWidth="2"/>
      <path d="M50 50 L110 50" stroke="#364a6b" strokeWidth="1.5"/>
    </svg>
  )
}

function ShoeBlackBoot({ className = '' }) {
  return (
    <svg viewBox="0 0 160 140" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 25 C50 15, 60 8, 75 8 C90 8, 100 12, 108 18 C112 22, 115 30, 115 40 L115 80 C120 85, 130 90, 138 95 L140 100 C142 103, 140 108, 136 110 L22 110 C18 110, 16 106, 18 102 L28 92 C35 85, 45 80, 50 75 Z" fill="#222222"/>
      <path d="M18 102 C18 98, 22 95, 28 95 L140 95 C145 95, 148 98, 148 102 L148 108 C148 112, 144 115, 140 115 L18 115 C14 115, 12 112, 14 108 Z" fill="#333333"/>
      <path d="M60 18 L60 40 M75 12 L75 35 M90 14 L90 38" stroke="#333" strokeWidth="2"/>
      <circle cx="62" cy="48" r="2" fill="#444"/>
      <circle cx="62" cy="56" r="2" fill="#444"/>
      <circle cx="62" cy="64" r="2" fill="#444"/>
    </svg>
  )
}

function ShoeTrail({ className = '' }) {
  return (
    <svg viewBox="0 0 200 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25 60 C25 40, 45 25, 75 22 C100 20, 135 20, 160 28 C175 33, 188 42, 192 55 L192 65 C192 70, 188 75, 183 75 L22 75 C17 75, 14 70, 16 65 Z" fill="#3a3a3a"/>
      <path d="M16 65 C16 61, 20 58, 25 58 L185 58 C190 58, 195 62, 195 66 L195 75 C195 80, 190 85, 185 85 L16 85 C11 85, 8 80, 10 75 Z" fill="#c8915a"/>
      <path d="M30 75 L35 68 L45 75 L50 68 L60 75 L65 68 L75 75 L80 68 L90 75 L95 68 L105 75 L110 68 L120 75 L125 68 L135 75 L140 68 L150 75 L155 68 L165 75 L170 68 L180 75" stroke="#b07d4a" strokeWidth="2" fill="none"/>
      <path d="M75 22 C78 30, 70 38, 60 42 C50 46, 40 52, 30 58" stroke="#444" strokeWidth="1" fill="none"/>
      <path d="M100 35 L130 32 L128 38 L100 40 Z" fill="#555" opacity="0.5"/>
    </svg>
  )
}

// ─── Curved Arrow SVGs ─────────────────────────────────────────────────────────

function CurvedArrowDown() {
  return (
    <svg width="40" height="50" viewBox="0 0 40 50" fill="none">
      <path d="M5 5 C8 15, 15 25, 25 35 C28 38, 32 42, 35 45" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M28 40 L35 45 L30 38" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  )
}

function CurvedArrowUp() {
  return (
    <svg width="40" height="50" viewBox="0 0 40 50" fill="none">
      <path d="M35 45 C32 35, 25 25, 15 15 C12 12, 8 8, 5 5" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M12 10 L5 5 L10 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  )
}

// ─── Shorts Icon SVG ───────────────────────────────────────────────────────────

function ShortsIcon({ size = 22, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M10 14.65v-5.3L15 12l-5 2.65zm7.77-4.33c-.77-.32-1.2-.5-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25z"/>
    </svg>
  )
}

// ─── Chat Modal Component ─────────────────────────────────────────────────────
function ChatModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([])
  const [chips, setChips] = useState(['Running Shoes', 'Daily Walking', 'Slip-ons'])
  const [showTrending, setShowTrending] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef(null)

  const trendingProducts = [
    { name: 'Wool Runners', price: '$110', color: 'bg-amber-50', Shoe: ShoeSneakerSide },
    { name: 'Tree Pipers', price: '$105', color: 'bg-emerald-50', Shoe: ShoeTrail },
    { name: 'Wool Loungers', price: '$100', color: 'bg-sky-50', Shoe: ShoeSneakerSide },
  ]

  useEffect(() => {
    if (isOpen) {
      setMessages([
        {
          from: 'bot',
          text: "Hi there! I'm Allie. Ready to find your perfect travel shoes?",
        },
      ])
      setChips(['Running Shoes', 'Daily Walking', 'Slip-ons'])
      setShowTrending(true)
      setIsTyping(false)
    }
  }, [isOpen])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleChipClick = (chip) => {
    setMessages((prev) => [...prev, { from: 'user', text: chip }])
    setChips([])
    setShowTrending(false)
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        {
          from: 'bot',
          text: 'Excellent choice for staying active on a trip! Based on our current lineup at allbirds.com, here are my top two recommendations for running:',
        },
        {
          from: 'bot',
          type: 'products',
          products: [
            {
              name: 'Tree Flyer 2',
              price: '$160',
              tagline: 'Springy & resilient for long runs.',
              color: 'bg-lime-50',
              accent: 'border-lime-200',
              Shoe: ShoeTrail,
            },
            {
              name: 'Tree Dasher 2',
              price: '$135',
              tagline: 'Everyday neutral running shoe.',
              color: 'bg-teal-50',
              accent: 'border-teal-200',
              Shoe: ShoeSneakerSide,
            },
          ],
        },
      ])
    }, 1500)
  }

  if (!isOpen) return null

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-t-2xl flex flex-col animate-slide-up" style={{ height: '85%' }}>
        {/* Drag Handle */}
        <div className="flex justify-center pt-2 pb-1">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-sm font-bold">A</div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Allie from Allbirds</p>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block" />
                Online now
              </p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 no-scrollbar">
          {messages.map((msg, i) => {
            if (msg.type === 'products') {
              return (
                <div key={i} className="flex justify-start">
                  <div className="max-w-[85%] space-y-2">
                    {msg.products.map((p, j) => (
                      <div key={j} className={`rounded-xl border ${p.accent} overflow-hidden bg-white shadow-sm`}>
                        <div className={`${p.color} h-28 flex items-center justify-center`}>
                          <p.Shoe className="w-32 h-auto" />
                        </div>
                        <div className="p-3">
                          <div className="flex justify-between items-start">
                            <p className="font-semibold text-gray-900 text-sm">{p.name}</p>
                            <p className="font-bold text-gray-900 text-sm">{p.price}</p>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">{p.tagline}</p>
                          <button className="mt-2 w-full bg-black text-white text-xs font-medium py-2 rounded-lg flex items-center justify-center gap-1">
                            View on Allbirds <ExternalLink size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            }
            return msg.from === 'bot' ? (
              <div key={i} className="flex justify-start">
                <div className="max-w-[80%] bg-gray-100 rounded-2xl rounded-tl-sm px-3.5 py-2.5">
                  <p className="text-sm text-gray-800 leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ) : (
              <div key={i} className="flex justify-end">
                <div className="max-w-[80%] bg-black text-white rounded-2xl rounded-tr-sm px-3.5 py-2.5">
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>
            )
          })}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          {chips.length > 0 && (
            <div className="flex gap-2 flex-wrap pt-1">
              {chips.map((chip) => (
                <button key={chip} onClick={() => handleChipClick(chip)}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors">
                  {chip}
                </button>
              ))}
            </div>
          )}

          {showTrending && (
            <div className="pt-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Trending Now</p>
              <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
                {trendingProducts.map((p, i) => (
                  <div key={i} className="min-w-[130px] bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm flex-shrink-0">
                    <div className={`${p.color} h-20 flex items-center justify-center`}>
                      <p.Shoe className="w-24 h-auto" />
                    </div>
                    <div className="p-2">
                      <p className="text-xs font-semibold text-gray-800">{p.name}</p>
                      <p className="text-xs text-gray-500">{p.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <div className="border-t border-gray-200 px-4 py-3 flex items-center gap-2">
          <input type="text" placeholder="Ask Allie anything..." className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-sm text-gray-700 outline-none placeholder-gray-400" disabled />
          <button className="w-9 h-9 bg-black rounded-full flex items-center justify-center flex-shrink-0">
            <Send size={16} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main App ──────────────────────────────────────────────────────────────────
function App() {
  const [chatOpen, setChatOpen] = useState(false)

  const thumbnails = [
    { Shoe: ShoeHighTop, bg: 'bg-gray-100' },
    { Shoe: ShoeBlackBoot, bg: 'bg-gray-50' },
    { Shoe: ShoeTrail, bg: 'bg-gray-100' },
    { Shoe: ShoeSneakerSide, bg: 'bg-gray-50' },
  ]

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900 p-4">
      {/* Phone Container */}
      <div className="relative w-[390px] h-[844px] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border-[8px] border-gray-800">

        {/* YouTube Top Nav */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-white">
          <div className="flex items-center gap-0.5">
            <svg width="28" height="20" viewBox="0 0 28 20" className="flex-shrink-0">
              <rect width="28" height="20" rx="5" fill="#FF0000"/>
              <polygon points="11,5 11,15 20,10" fill="white"/>
            </svg>
            {/* Profile avatar placeholder */}
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-400 via-yellow-400 to-blue-500 ml-1.5 flex items-center justify-center overflow-hidden">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-300 to-pink-400" />
            </div>
          </div>
          <div className="flex items-center gap-5">
            <Cast size={22} className="text-gray-800" />
            <Bell size={22} className="text-gray-800" />
            <Search size={22} className="text-gray-800" />
          </div>
        </div>

        {/* Main Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto no-scrollbar bg-white">

          {/* Hero Ad Section - "TRAVEL LIGHT" */}
          <div className="relative mx-0 overflow-hidden" style={{ aspectRatio: '3/3.2' }}>
            {/* Cityscape gradient background */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-b from-[#8b6fa3] via-[#c9907a] to-[#d4a574]" />
              {/* City silhouette */}
              <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 400 150" preserveAspectRatio="none">
                <path d="M0 150 L0 100 L15 100 L15 70 L25 70 L25 60 L30 55 L35 60 L35 70 L40 70 L40 80 L50 80 L50 65 L55 65 L55 55 L58 50 L60 45 L62 50 L65 55 L65 65 L70 65 L70 80 L80 80 L80 90 L100 90 L100 75 L105 75 L105 60 L110 55 L115 50 L120 55 L120 75 L130 75 L130 85 L150 85 L150 70 L155 70 L155 45 L160 40 L163 30 L166 40 L170 45 L170 70 L180 70 L180 80 L200 80 L200 65 L210 65 L210 50 L215 45 L220 42 L225 45 L225 65 L235 65 L235 75 L250 75 L250 60 L255 55 L260 50 L265 55 L265 75 L280 75 L280 85 L300 85 L300 70 L310 65 L315 60 L320 55 L325 60 L325 70 L330 75 L340 75 L340 80 L350 80 L350 90 L370 90 L370 100 L385 100 L385 110 L400 110 L400 150 Z" fill="rgba(0,0,0,0.15)"/>
              </svg>
              {/* Dome accent */}
              <svg className="absolute bottom-12 left-8" width="60" height="70" viewBox="0 0 60 70">
                <path d="M10 70 L10 30 C10 15, 25 5, 30 3 C35 5, 50 15, 50 30 L50 70" fill="rgba(200,180,140,0.4)" stroke="rgba(200,180,140,0.6)" strokeWidth="1"/>
                <circle cx="30" cy="8" r="4" fill="rgba(255,215,0,0.5)"/>
              </svg>
            </div>

            {/* "TRAVEL LIGHT" title */}
            <div className="absolute top-6 left-0 right-0 text-center">
              <h2 className="text-[2.5rem] font-black text-white tracking-wide leading-none" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
                TRAVEL LIGHT
              </h2>
            </div>

            {/* Main shoe - center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3">
              <ShoeSneakerSide className="w-64 h-auto drop-shadow-2xl" />
            </div>

            {/* "SUITCASE FRIENDLY" label + arrow - bottom left */}
            <div className="absolute bottom-16 left-3">
              <div className="flex flex-col items-start">
                <CurvedArrowUp />
                <span className="text-white text-sm font-bold tracking-wide leading-tight mt-1" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
                  SUITCASE<br/>FRIENDLY
                </span>
              </div>
            </div>

            {/* "MACHINE WASHABLE" label + arrow - bottom right */}
            <div className="absolute bottom-16 right-3">
              <div className="flex flex-col items-end">
                <CurvedArrowDown />
                <span className="text-white text-sm font-bold tracking-wide leading-tight text-right mt-1" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
                  MACHINE<br/>WASHABLE
                </span>
              </div>
            </div>

            {/* External link icon */}
            <div className="absolute bottom-3 right-3 w-8 h-8 bg-black/60 rounded-full flex items-center justify-center">
              <ArrowUpRight size={16} className="text-white" />
            </div>
          </div>

          {/* Thumbnail Carousel */}
          <div className="flex gap-2.5 px-3 mt-3 overflow-x-auto no-scrollbar">
            {thumbnails.map((t, i) => (
              <div key={i}
                className={`min-w-[90px] h-[90px] ${t.bg} rounded-xl flex items-center justify-center flex-shrink-0 border-2 ${i === 2 ? 'border-gray-400' : 'border-transparent'}`}
              >
                <t.Shoe className="w-16 h-auto" />
              </div>
            ))}
          </div>

          {/* Ad Metadata */}
          <div className="px-4 mt-3">
            <div className="flex items-start gap-3">
              {/* Allbirds logo */}
              <div className="flex-shrink-0 mt-0.5">
                <span className="text-sm font-serif italic text-gray-800">allbirds</span>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-[15px] font-semibold text-gray-900 leading-snug">
                      The Perfect Pair For Anywhere
                    </h3>
                    <p className="text-sm text-gray-600 mt-0.5 leading-snug">
                      Easy to pack, breezy to clean, our shoes are ready for whatever.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      <span className="font-semibold">Sponsored</span> &middot; Allbirds
                    </p>
                  </div>
                  <button className="p-1 -mr-1 flex-shrink-0">
                    <MoreVertical size={18} className="text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2.5 px-4 mt-3 mb-4">
            <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold text-sm py-2.5 rounded-full transition-colors border border-gray-200">
              Shop now
            </button>
            <button
              onClick={() => setChatOpen(true)}
              className="flex-1 bg-black hover:bg-gray-800 text-white font-semibold text-sm py-2.5 rounded-full transition-colors"
            >
              Chat with AllBirds
            </button>
          </div>
        </div>

        {/* Bottom Navigation - Dark */}
        <div className="flex items-center justify-around py-2 pb-5 bg-[#212121]">
          <NavItem icon={<Home size={22} />} label="Home" active />
          <NavItem icon={<ShortsIcon size={22} />} label="Shorts" />
          <div className="flex flex-col items-center">
            <PlusCircle size={32} className="text-white" />
          </div>
          <NavItem icon={<PlaySquare size={22} />} label="Subscriptions" />
          <NavItem icon={<User size={22} />} label="You" />
        </div>

        {/* Chat Modal Overlay */}
        <ChatModal isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      </div>
    </div>
  )
}

function NavItem({ icon, label, active = false }) {
  return (
    <button className="flex flex-col items-center gap-0.5">
      <span className={active ? 'text-white' : 'text-gray-400'}>{icon}</span>
      <span className={`text-[10px] ${active ? 'text-white font-medium' : 'text-gray-400'}`}>
        {label}
      </span>
    </button>
  )
}

export default App
