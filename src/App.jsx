import { useState, useEffect, useRef } from 'react'
import {
  Home, PlusCircle, PlaySquare, User,
  Search, Bell, Cast, MoreVertical, ArrowUpRight,
  X, Send, ExternalLink, ShoppingCart, ArrowLeft, Plus, Minus,
  ThumbsUp, ThumbsDown, Share2, MessageSquare
} from 'lucide-react'
import './App.css'

// ─── Shoe Data ─────────────────────────────────────────────────────────────────

const ALL_SHOES = [
  {
    id: 1, name: 'Tree Runner', price: 110, color: '#1a1a1a', sole: '#f5f0e8',
    tagline: 'Light & breezy everyday sneaker.',
    description: 'Our most popular shoe. Made with responsibly sourced eucalyptus tree fiber, the Tree Runner is breathable, lightweight, and silky smooth.',
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Charcoal', 'Navy', 'White'],
    type: 'sneaker',
  },
  {
    id: 2, name: 'Wool Runner', price: 120, color: '#1a2744', sole: '#c8915a',
    tagline: 'Cozy & classic, made from merino wool.',
    description: 'Crafted from ZQ merino wool, the Wool Runner keeps feet comfy in all conditions. Machine washable, naturally temperature-regulating.',
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['Natural Gray', 'Tuke Midnight', 'Natural White'],
    type: 'hightop',
  },
  {
    id: 3, name: 'Tree Dasher 2', price: 135, color: '#222222', sole: '#333333',
    tagline: 'Everyday neutral running shoe.',
    description: 'Built for daily runs with a responsive midsole and engineered eucalyptus upper. Balanced cushioning from heel to toe for a smooth ride.',
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Black', 'Thunder', 'Bloom'],
    type: 'boot',
  },
  {
    id: 4, name: 'Trail Runner SWT', price: 140, color: '#3a3a3a', sole: '#c8915a',
    tagline: 'Built for off-road adventures.',
    description: 'Rugged traction meets sustainable comfort. The Trail Runner SWT features a grippy rubber outsole and water-repellent upper for any terrain.',
    sizes: ['8', '9', '10', '11', '12'],
    colors: ['Basin Green', 'Obsidian', 'Hazy Beige'],
    type: 'trail',
  },
  {
    id: 5, name: 'Tree Flyer 2', price: 160, color: '#2d4a3e', sole: '#e8e0d4',
    tagline: 'Springy & resilient for long runs.',
    description: 'Our highest-performance running shoe with SwiftFoam midsole for energy return. Lightweight eucalyptus upper and carbon-reduced materials.',
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Kaikoura White', 'Bough Green', 'Eclipse'],
    type: 'sneaker',
  },
  {
    id: 6, name: 'Wool Lounger', price: 100, color: '#4a4035', sole: '#f5f0e8',
    tagline: 'Slip-on comfort for easy days.',
    description: 'The ultimate slip-on shoe. Made from soft merino wool with a laid-back design perfect for everyday wear. No laces, no fuss.',
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['Natural Gray', 'Tuke Jo', 'Cream'],
    type: 'sneaker',
  },
]

// ─── Inline SVG Shoe Components ────────────────────────────────────────────────

function ShoeByType({ type, color = '#1a1a1a', sole = '#f5f0e8', className = '' }) {
  if (type === 'hightop') return <ShoeHighTop color={color} sole={sole} className={className} />
  if (type === 'boot') return <ShoeBlackBoot color={color} sole={sole} className={className} />
  if (type === 'trail') return <ShoeTrail color={color} sole={sole} className={className} />
  return <ShoeSneaker color={color} sole={sole} className={className} />
}

function ShoeSneaker({ color = '#1a1a1a', sole = '#f5f0e8', className = '' }) {
  return (
    <svg viewBox="0 0 200 100" className={className} fill="none">
      <path d="M30 65 C30 45, 50 30, 80 28 C100 26, 130 25, 155 30 C170 33, 185 40, 190 55 L190 70 C190 75, 185 80, 180 80 L25 80 C20 80, 18 75, 20 70 Z" fill={color}/>
      <path d="M25 72 C25 68, 30 65, 35 65 L180 65 C185 65, 192 68, 192 72 L192 78 C192 82, 188 85, 184 85 L22 85 C18 85, 15 82, 15 78 Z" fill={sole}/>
      <path d="M80 28 C82 35, 75 42, 70 45 C65 48, 55 52, 45 58 C40 61, 35 63, 30 65" stroke={color} strokeWidth="1" fill="none" opacity="0.5"/>
      <text x="90" y="55" fontFamily="serif" fontStyle="italic" fontSize="11" fill="white" opacity="0.7">allbirds</text>
    </svg>
  )
}

function ShoeHighTop({ color = '#1a2744', sole = '#c8915a', className = '' }) {
  return (
    <svg viewBox="0 0 160 140" className={className} fill="none">
      <path d="M45 30 C45 20, 55 12, 70 10 C85 8, 95 10, 105 15 C110 18, 115 25, 115 35 L115 80 C115 85, 125 90, 135 95 L140 100 C142 102, 142 108, 140 110 L20 110 C15 110, 12 107, 15 103 L25 95 C30 90, 40 85, 45 80 Z" fill={color}/>
      <path d="M15 103 C15 99, 20 96, 25 96 L140 96 C145 96, 148 99, 148 103 L148 108 C148 112, 145 115, 140 115 L15 115 C10 115, 8 112, 10 108 Z" fill={sole}/>
      <path d="M55 20 L55 45 M70 15 L70 40 M85 15 L85 40" stroke={color} strokeWidth="2" opacity="0.4"/>
      <path d="M50 50 L110 50" stroke={color} strokeWidth="1.5" opacity="0.3"/>
    </svg>
  )
}

function ShoeBlackBoot({ color = '#222222', sole = '#333333', className = '' }) {
  return (
    <svg viewBox="0 0 160 140" className={className} fill="none">
      <path d="M50 25 C50 15, 60 8, 75 8 C90 8, 100 12, 108 18 C112 22, 115 30, 115 40 L115 80 C120 85, 130 90, 138 95 L140 100 C142 103, 140 108, 136 110 L22 110 C18 110, 16 106, 18 102 L28 92 C35 85, 45 80, 50 75 Z" fill={color}/>
      <path d="M18 102 C18 98, 22 95, 28 95 L140 95 C145 95, 148 98, 148 102 L148 108 C148 112, 144 115, 140 115 L18 115 C14 115, 12 112, 14 108 Z" fill={sole}/>
      <path d="M60 18 L60 40 M75 12 L75 35 M90 14 L90 38" stroke={color} strokeWidth="2" opacity="0.3"/>
      <circle cx="62" cy="48" r="2" fill={color} opacity="0.4"/>
      <circle cx="62" cy="56" r="2" fill={color} opacity="0.4"/>
      <circle cx="62" cy="64" r="2" fill={color} opacity="0.4"/>
    </svg>
  )
}

function ShoeTrail({ color = '#3a3a3a', sole = '#c8915a', className = '' }) {
  return (
    <svg viewBox="0 0 200 100" className={className} fill="none">
      <path d="M25 60 C25 40, 45 25, 75 22 C100 20, 135 20, 160 28 C175 33, 188 42, 192 55 L192 65 C192 70, 188 75, 183 75 L22 75 C17 75, 14 70, 16 65 Z" fill={color}/>
      <path d="M16 65 C16 61, 20 58, 25 58 L185 58 C190 58, 195 62, 195 66 L195 75 C195 80, 190 85, 185 85 L16 85 C11 85, 8 80, 10 75 Z" fill={sole}/>
      <path d="M30 75 L35 68 L45 75 L50 68 L60 75 L65 68 L75 75 L80 68 L90 75 L95 68 L105 75 L110 68 L120 75 L125 68 L135 75 L140 68 L150 75 L155 68 L165 75 L170 68 L180 75" stroke={sole} strokeWidth="2" fill="none" opacity="0.6"/>
      <path d="M75 22 C78 30, 70 38, 60 42 C50 46, 40 52, 30 58" stroke={color} strokeWidth="1" fill="none" opacity="0.4"/>
    </svg>
  )
}

// ─── Allbirds Logo SVG ─────────────────────────────────────────────────────────

function AllbirdsLogo({ size = 32, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className}>
      <circle cx="20" cy="20" r="20" fill="#1a1a1a"/>
      <text x="20" y="24" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize="10" fill="white">allbirds</text>
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

// ─── Shoe Detail View ──────────────────────────────────────────────────────────

function ShoeDetail({ shoe, onBack, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(shoe.colors[0])
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    if (!selectedSize) return
    setAdded(true)
    onAddToCart({ ...shoe, size: selectedSize, color: selectedColor, qty })
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-2 border-b border-gray-100">
        <button onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <p className="text-sm font-semibold text-gray-900 flex-1">{shoe.name}</p>
        <span className="text-sm font-bold text-gray-900">${shoe.price}</span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Shoe Image */}
        <div className="bg-gray-50 py-8 flex items-center justify-center">
          <ShoeByType type={shoe.type} color={shoe.color} sole={shoe.sole} className="w-52 h-auto" />
        </div>

        <div className="px-4 py-3 space-y-4">
          {/* Name & Price */}
          <div>
            <h3 className="text-lg font-bold text-gray-900">{shoe.name}</h3>
            <p className="text-sm text-gray-500 mt-0.5">{shoe.tagline}</p>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed">{shoe.description}</p>

          {/* Color */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Color: {selectedColor}</p>
            <div className="flex gap-2">
              {shoe.colors.map((c) => (
                <button key={c} onClick={() => setSelectedColor(c)}
                  className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${selectedColor === c ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-300'}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Size</p>
            <div className="flex gap-2 flex-wrap">
              {shoe.sizes.map((s) => (
                <button key={s} onClick={() => setSelectedSize(s)}
                  className={`w-10 h-10 text-sm font-medium rounded-lg border transition-colors ${selectedSize === s ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-300'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Quantity</p>
            <div className="flex items-center gap-3">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center">
                <Minus size={14} className="text-gray-600" />
              </button>
              <span className="text-sm font-semibold w-6 text-center">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center">
                <Plus size={14} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add to Cart */}
      <div className="px-4 py-3 border-t border-gray-200">
        <button onClick={handleAdd}
          className={`w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
            added ? 'bg-green-600 text-white' :
            selectedSize ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}>
          {added ? (
            <>Added to Cart!</>
          ) : (
            <><ShoppingCart size={16} /> Add to Cart — ${shoe.price * qty}</>
          )}
        </button>
        {!selectedSize && <p className="text-xs text-red-400 mt-1.5 text-center">Please select a size</p>}
      </div>
    </div>
  )
}

// ─── Chat Modal Component ─────────────────────────────────────────────────────
function ChatModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([])
  const [chips, setChips] = useState(['Running Shoes', 'Daily Walking', 'Slip-ons'])
  const [showTrending, setShowTrending] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const [selectedShoe, setSelectedShoe] = useState(null)
  const [cart, setCart] = useState([])
  const chatEndRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setMessages([{ from: 'bot', text: "Hi there! I'm Allie from Allbirds. Ready to find your perfect travel shoes? Browse our collection below or pick a category!" }])
      setChips(['Running Shoes', 'Daily Walking', 'Slip-ons'])
      setShowTrending(true)
      setIsTyping(false)
      setSelectedShoe(null)
      setCart([])
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

    const replyMap = {
      'Running Shoes': {
        text: 'Great choice! Here are our best running shoes — swipe to explore:',
        shoes: ALL_SHOES.filter(s => ['Tree Dasher 2', 'Tree Flyer 2', 'Trail Runner SWT'].includes(s.name)),
      },
      'Daily Walking': {
        text: 'Perfect for everyday comfort! Check out these favorites:',
        shoes: ALL_SHOES.filter(s => ['Tree Runner', 'Wool Runner', 'Wool Lounger'].includes(s.name)),
      },
      'Slip-ons': {
        text: 'Easy on, easy off! Here are our most comfortable slip-on options:',
        shoes: ALL_SHOES.filter(s => ['Wool Lounger', 'Tree Runner'].includes(s.name)),
      },
    }

    const reply = replyMap[chip] || replyMap['Running Shoes']

    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        { from: 'bot', text: reply.text },
        { from: 'bot', type: 'shoe-carousel', shoes: reply.shoes },
      ])
    }, 1200)
  }

  const handleAddToCart = (item) => {
    setCart((prev) => [...prev, item])
    setSelectedShoe(null)
    setMessages((prev) => [
      ...prev,
      { from: 'bot', text: `${item.name} (Size ${item.size}, ${item.color}) added to your cart! Anything else I can help with?` },
    ])
    setChips(['Running Shoes', 'Daily Walking', 'Slip-ons'])
  }

  if (!isOpen) return null

  // Show shoe detail view
  if (selectedShoe) {
    return (
      <div className="absolute inset-0 z-50 flex flex-col justify-end">
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />
        <div className="relative bg-white rounded-t-2xl flex flex-col animate-slide-up" style={{ height: '85%' }}>
          <div className="flex justify-center pt-2 pb-1"><div className="w-10 h-1 bg-gray-300 rounded-full" /></div>
          <ShoeDetail shoe={selectedShoe} onBack={() => setSelectedShoe(null)} onAddToCart={handleAddToCart} />
        </div>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-t-2xl flex flex-col animate-slide-up" style={{ height: '85%' }}>
        {/* Drag Handle */}
        <div className="flex justify-center pt-2 pb-1"><div className="w-10 h-1 bg-gray-300 rounded-full" /></div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <AllbirdsLogo size={36} />
            <div>
              <p className="text-sm font-semibold text-gray-900">Allie from Allbirds</p>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block" />
                Online now
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <div className="relative">
                <ShoppingCart size={20} className="text-gray-600" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] flex items-center justify-center font-bold">{cart.length}</span>
              </div>
            )}
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
              <X size={20} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 no-scrollbar">
          {messages.map((msg, i) => {
            if (msg.type === 'shoe-carousel') {
              return (
                <div key={i} className="flex justify-start">
                  <div className="max-w-[92%]">
                    <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-2 pt-1">
                      {msg.shoes.map((shoe) => (
                        <button key={shoe.id} onClick={() => setSelectedShoe(shoe)}
                          className="min-w-[150px] bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm flex-shrink-0 text-left hover:shadow-md transition-shadow">
                          <div className="bg-gray-50 h-24 flex items-center justify-center p-2">
                            <ShoeByType type={shoe.type} color={shoe.color} sole={shoe.sole} className="w-28 h-auto" />
                          </div>
                          <div className="p-2.5">
                            <p className="text-xs font-semibold text-gray-900">{shoe.name}</p>
                            <p className="text-[10px] text-gray-500 mt-0.5 line-clamp-1">{shoe.tagline}</p>
                            <div className="flex items-center justify-between mt-1.5">
                              <span className="text-xs font-bold text-gray-900">${shoe.price}</span>
                              <span className="text-[10px] text-blue-600 font-medium">View →</span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )
            }
            return msg.from === 'bot' ? (
              <div key={i} className="flex justify-start gap-2">
                <AllbirdsLogo size={24} className="flex-shrink-0 mt-1" />
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
            <div className="flex justify-start gap-2">
              <AllbirdsLogo size={24} className="flex-shrink-0 mt-1" />
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
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Popular Right Now</p>
              <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
                {ALL_SHOES.slice(0, 4).map((shoe) => (
                  <button key={shoe.id} onClick={() => setSelectedShoe(shoe)}
                    className="min-w-[120px] bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm flex-shrink-0 text-left">
                    <div className="bg-gray-50 h-16 flex items-center justify-center">
                      <ShoeByType type={shoe.type} color={shoe.color} sole={shoe.sole} className="w-20 h-auto" />
                    </div>
                    <div className="p-2">
                      <p className="text-[11px] font-semibold text-gray-800">{shoe.name}</p>
                      <p className="text-[11px] text-gray-500">${shoe.price}</p>
                    </div>
                  </button>
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
    { type: 'hightop', color: '#1a2744', sole: '#c8915a' },
    { type: 'boot', color: '#222222', sole: '#333333' },
    { type: 'trail', color: '#3a3a3a', sole: '#c8915a' },
    { type: 'sneaker', color: '#1a1a1a', sole: '#f5f0e8' },
  ]

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      {/* Phone Container - no curved edges */}
      <div className="relative w-[390px] h-[844px] bg-white shadow-2xl overflow-hidden flex flex-col">

        {/* YouTube Top Nav */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-white">
          <div className="flex items-center gap-0.5">
            <svg width="28" height="20" viewBox="0 0 28 20" className="flex-shrink-0">
              <rect width="28" height="20" rx="5" fill="#FF0000"/>
              <polygon points="11,5 11,15 20,10" fill="white"/>
            </svg>
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

          {/* Hero Ad Section */}
          <div className="relative mx-0 overflow-hidden" style={{ aspectRatio: '3/3.2' }}>
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-b from-[#8b6fa3] via-[#c9907a] to-[#d4a574]" />
              <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 400 150" preserveAspectRatio="none">
                <path d="M0 150 L0 100 L15 100 L15 70 L25 70 L25 60 L30 55 L35 60 L35 70 L40 70 L40 80 L50 80 L50 65 L55 65 L55 55 L58 50 L60 45 L62 50 L65 55 L65 65 L70 65 L70 80 L80 80 L80 90 L100 90 L100 75 L105 75 L105 60 L110 55 L115 50 L120 55 L120 75 L130 75 L130 85 L150 85 L150 70 L155 70 L155 45 L160 40 L163 30 L166 40 L170 45 L170 70 L180 70 L180 80 L200 80 L200 65 L210 65 L210 50 L215 45 L220 42 L225 45 L225 65 L235 65 L235 75 L250 75 L250 60 L255 55 L260 50 L265 55 L265 75 L280 75 L280 85 L300 85 L300 70 L310 65 L315 60 L320 55 L325 60 L325 70 L330 75 L340 75 L340 80 L350 80 L350 90 L370 90 L370 100 L385 100 L385 110 L400 110 L400 150 Z" fill="rgba(0,0,0,0.15)"/>
              </svg>
              <svg className="absolute bottom-12 left-8" width="60" height="70" viewBox="0 0 60 70">
                <path d="M10 70 L10 30 C10 15, 25 5, 30 3 C35 5, 50 15, 50 30 L50 70" fill="rgba(200,180,140,0.4)" stroke="rgba(200,180,140,0.6)" strokeWidth="1"/>
                <circle cx="30" cy="8" r="4" fill="rgba(255,215,0,0.5)"/>
              </svg>
            </div>

            <div className="absolute top-6 left-0 right-0 text-center">
              <h2 className="text-[2.5rem] font-black text-white tracking-wide leading-none" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
                TRAVEL LIGHT
              </h2>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3">
              <ShoeSneaker color="#1a1a1a" sole="#f5f0e8" className="w-64 h-auto drop-shadow-2xl" />
            </div>

            <div className="absolute bottom-16 left-3">
              <div className="flex flex-col items-start">
                <CurvedArrowUp />
                <span className="text-white text-sm font-bold tracking-wide leading-tight mt-1" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
                  SUITCASE<br/>FRIENDLY
                </span>
              </div>
            </div>

            <div className="absolute bottom-16 right-3">
              <div className="flex flex-col items-end">
                <CurvedArrowDown />
                <span className="text-white text-sm font-bold tracking-wide leading-tight text-right mt-1" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
                  MACHINE<br/>WASHABLE
                </span>
              </div>
            </div>

            <div className="absolute bottom-3 right-3 w-8 h-8 bg-black/60 rounded-full flex items-center justify-center">
              <ArrowUpRight size={16} className="text-white" />
            </div>
          </div>

          {/* Thumbnail Carousel */}
          <div className="flex gap-2.5 px-3 mt-3 overflow-x-auto no-scrollbar">
            {thumbnails.map((t, i) => (
              <div key={i}
                className={`min-w-[90px] h-[90px] bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 border-2 ${i === 2 ? 'border-gray-400' : 'border-transparent'}`}>
                <ShoeByType type={t.type} color={t.color} sole={t.sole} className="w-16 h-auto" />
              </div>
            ))}
          </div>

          {/* Ad Metadata */}
          <div className="px-4 mt-3">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <span className="text-sm font-serif italic text-gray-800">allbirds</span>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-[15px] font-semibold text-gray-900 leading-snug">The Perfect Pair For Anywhere</h3>
                    <p className="text-sm text-gray-600 mt-0.5 leading-snug">Easy to pack, breezy to clean, our shoes are ready for whatever.</p>
                    <p className="text-xs text-gray-500 mt-1"><span className="font-semibold">Sponsored</span> &middot; Allbirds</p>
                  </div>
                  <button className="p-1 -mr-1 flex-shrink-0">
                    <MoreVertical size={18} className="text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons - Bigger CTAs */}
          <div className="flex gap-3 px-4 mt-3 mb-4">
            <button className="flex-1 bg-white hover:bg-gray-50 text-gray-900 font-bold text-[15px] py-3 rounded-full transition-colors border border-gray-300">
              Shop now
            </button>
            <button onClick={() => setChatOpen(true)}
              className="flex-[1.2] bg-black hover:bg-gray-800 text-white font-bold text-[15px] py-3 rounded-full transition-colors">
              Chat with AllBirds
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200 mx-4" />

          {/* YouTube Video Placeholder */}
          <div className="px-3 py-3">
            <div className="w-full bg-gray-100 rounded-xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
              <div className="w-full h-full flex items-center justify-center relative">
                <PlaySquare size={48} className="text-gray-300" />
                {/* Duration badge */}
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
                  12:34
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-2.5 px-1">
              <div className="w-9 h-9 rounded-full bg-gray-200 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 leading-snug">Best Travel Shoes of 2026 — Allbirds vs Nike vs On Cloud</p>
                <p className="text-xs text-gray-500 mt-1">PackHacker &middot; 284K views &middot; 2 weeks ago</p>
              </div>
              <MoreVertical size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
            </div>
            {/* Engagement row */}
            <div className="flex gap-4 mt-2.5 px-1">
              <div className="flex items-center gap-1 text-xs text-gray-500"><ThumbsUp size={14} /> 4.2K</div>
              <div className="flex items-center gap-1 text-xs text-gray-500"><ThumbsDown size={14} /></div>
              <div className="flex items-center gap-1 text-xs text-gray-500"><Share2 size={14} /> Share</div>
              <div className="flex items-center gap-1 text-xs text-gray-500"><MessageSquare size={14} /> 328</div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation - Dark */}
        <div className="flex items-center justify-around py-2 pb-5 bg-[#212121]">
          <NavItem icon={<Home size={22} />} label="Home" active />
          <NavItem icon={<ShortsIcon size={22} />} label="Shorts" />
          <div className="flex flex-col items-center"><PlusCircle size={32} className="text-white" /></div>
          <NavItem icon={<PlaySquare size={22} />} label="Subscriptions" />
          <NavItem icon={<User size={22} />} label="You" />
        </div>

        <ChatModal isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      </div>
    </div>
  )
}

function NavItem({ icon, label, active = false }) {
  return (
    <button className="flex flex-col items-center gap-0.5">
      <span className={active ? 'text-white' : 'text-gray-400'}>{icon}</span>
      <span className={`text-[10px] ${active ? 'text-white font-medium' : 'text-gray-400'}`}>{label}</span>
    </button>
  )
}

export default App
