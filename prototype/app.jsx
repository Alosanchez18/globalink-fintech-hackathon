import React from "react"
import { callAI } from "call-ai"
import { useFireproof } from "use-fireproof"
import { useViewer } from "use-vibes"
import { useVibe } from "use-vibes"

const c = {
  page: "min-h-screen bg-gradient-to-b from-[#e8f5ec] to-white flex justify-center",
  shell: "w-full max-w-[430px] min-h-screen bg-gradient-to-b from-[#f1faf3] to-white flex flex-col relative shadow-xl",
  header: "bg-[#1B4332] px-4 py-3 flex items-center justify-between sticky top-0 z-20",
  brand: "text-white font-bold text-lg leading-tight",
  tagline: "text-[#a7d7b9] text-[10px] leading-tight",
  langBtn: "text-white text-xs bg-[#2d5a43] px-2.5 py-1.5 rounded-full flex items-center gap-1 min-h-[36px]",
  kyc: "bg-[#fbe4e9] px-4 py-2.5 flex items-center justify-between gap-2",
  kycText: "text-[#9c2c43] text-xs font-semibold",
  kycBtn: "bg-[#1B4332] text-white text-[11px] font-semibold px-3 py-2 rounded-full min-h-[40px] whitespace-nowrap",
  main: "flex-1 overflow-y-auto px-4 py-4 pb-28",
  balanceCard: "bg-gradient-to-br from-[#1B4332] to-[#2d6a4f] rounded-2xl p-5 text-white shadow-lg",
  whitePill: "bg-white text-[#1B4332] text-sm font-semibold rounded-full px-4 py-2.5 w-full mt-4 min-h-[44px]",
  chip: "flex-1 bg-white rounded-xl py-2.5 px-1 text-center text-[10px] font-semibold text-[#1B4332] shadow-sm",
  sectionH: "text-[#1B4332] font-bold text-base mt-6 mb-3 flex items-center justify-between",
  greenBtn: "bg-[#1B4332] text-white font-semibold rounded-2xl py-4 text-sm min-h-[44px] shadow-md active:translate-y-0.5 transition",
  tealBtn: "bg-gradient-to-r from-[#2dd4bf] to-[#38bdf8] text-white font-semibold rounded-2xl py-4 text-sm min-h-[44px] shadow-md active:translate-y-0.5 transition",
  grayBtn: "bg-gray-100 text-gray-600 font-semibold rounded-2xl py-3.5 text-sm min-h-[44px] w-full",
  card: "bg-white rounded-2xl p-4 shadow-sm",
  input: "w-full border border-gray-200 rounded-xl px-3.5 py-3 text-sm focus:outline-none focus:border-[#1B4332] min-h-[44px]",
  label: "text-xs font-semibold text-gray-600 mb-1.5 block",
  iconCircle: "w-20 h-20 rounded-full bg-gradient-to-br from-[#2dd4bf] to-[#1B4332] flex items-center justify-center text-3xl mx-auto",
  nav: "absolute bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white border-t border-gray-100 flex justify-around py-2 z-20",
  navBtn: "flex flex-col items-center gap-0.5 px-3 py-1.5 text-[10px] font-semibold min-h-[44px] justify-center",
}

const LANGS = {
  us: { flag: "🇺🇸", code: "en-US", speaking: "Speaking English", loc: "Houston, USA",
    welcome: "Hi! Tap the circle and just talk to me.",
    placeholder: "Tap and speak",
    samples: [
      { text: "Send money to Mom", reply: "Sending $25 to Mom. Confirm?", intent: "send" },
      { text: "How much are the fees", reply: "Fees are 2.5%. Send $25, they get $24.38", intent: "fees" },
      { text: "Where is the nearest kiosk", reply: "The nearest kiosk is 2 km away", intent: "kiosk" },
      { text: "What is my balance", reply: "Your balance is $1,250.50", intent: "balance" },
    ],
    yes: "Yes", no: "No", findKiosk: "Find Nearest Kiosk", sending: "Listening…", thinking: "Thinking…" },
  mx: { flag: "🇲🇽", code: "es-MX", speaking: "Hablando en Español", loc: "Oaxaca, México",
    welcome: "¡Hola! Toca el círculo y háblame.",
    placeholder: "Toca y habla",
    samples: [
      { text: "Mandar dinero a Mamá", reply: "Enviando $25 a Mamá. ¿Confirmar?", intent: "send" },
      { text: "Cuánto cuesta", reply: "Costo 2.5%. Mandas $25, recibe $24.38", intent: "fees" },
      { text: "Dónde está el kiosco", reply: "El kiosco más cercano está a 2 km", intent: "kiosk" },
      { text: "Cuánto dinero tengo", reply: "Tu saldo es $1,250.50", intent: "balance" },
    ],
    yes: "Sí", no: "No", findKiosk: "Buscar Kiosco", sending: "Escuchando…", thinking: "Pensando…" },
  br: { flag: "🇧🇷", code: "pt-BR", speaking: "Falando em Português", loc: "São Paulo, Brasil",
    welcome: "Oi! Toque no círculo e fale comigo.",
    placeholder: "Toque e fale",
    samples: [
      { text: "Mandar dinheiro pra Mãe", reply: "Enviando $25 pra Mãe. Confirmar?", intent: "send" },
      { text: "Quanto custa", reply: "Custo 2.5%. Manda $25, recebe $24.38", intent: "fees" },
      { text: "Onde fica o quiosque", reply: "O quiosque mais perto fica a 2 km", intent: "kiosk" },
      { text: "Quanto eu tenho", reply: "Seu saldo é $1,250.50", intent: "balance" },
    ],
    yes: "Sim", no: "Não", findKiosk: "Achar Quiosque", sending: "Ouvindo…", thinking: "Pensando…" },
  ht: { flag: "🇭🇹", code: "fr-FR", speaking: "Parlant Français", loc: "Port-au-Prince, Haïti",
    welcome: "Bonjour ! Touchez le cercle et parlez-moi.",
    placeholder: "Touchez et parlez",
    samples: [
      { text: "Envoyer argent à Maman", reply: "Envoi de $25 à Maman. Confirmer?", intent: "send" },
      { text: "Combien ça coûte", reply: "Frais 2.5%. Vous envoyez $25, reçoit $24.38", intent: "fees" },
      { text: "Où est le kiosque", reply: "Le kiosque le plus proche est à 2 km", intent: "kiosk" },
      { text: "Combien j'ai", reply: "Votre solde est $1,250.50", intent: "balance" },
    ],
    yes: "Oui", no: "Non", findKiosk: "Trouver Kiosque", sending: "J'écoute…", thinking: "Je réfléchis…" },
}

function detectLang() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""
    if (tz.includes("Mexico")) return "mx"
    if (tz.includes("Sao_Paulo") || tz.includes("Brazil")) return "br"
    if (tz.includes("Port-au-Prince") || tz.includes("Paris")) return "ht"
  } catch (e) {}
  return "us"
}

function playChime() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext
    const ac = new Ctx()
    const notes = [880, 1175]
    notes.forEach((f, i) => {
      const o = ac.createOscillator(), g = ac.createGain()
      o.type = "sine"; o.frequency.value = f
      const t = ac.currentTime + i * 0.12
      g.gain.setValueAtTime(0.0001, t)
      g.gain.exponentialRampToValueAtTime(0.2, t + 0.02)
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.25)
      o.connect(g).connect(ac.destination); o.start(t); o.stop(t + 0.3)
    })
  } catch (e) {}
}

function VoiceStyles() {
  return (
    <style>{`
      @keyframes breathe { 0%,100%{transform:scale(1);box-shadow:0 0 0 0 rgba(45,212,191,0.5)} 50%{transform:scale(1.05);box-shadow:0 0 0 18px rgba(45,212,191,0)} }
      @keyframes ripple { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(1.8);opacity:0} }
      @keyframes bar { 0%,100%{height:14px} 50%{height:46px} }
      @keyframes dotfade { 0%,100%{opacity:0.25} 50%{opacity:1} }
      @keyframes spk { 0%,100%{transform:scaleY(0.4)} 50%{transform:scaleY(1)} }
      .gl-breathe{animation:breathe 2.6s ease-in-out infinite}
      .gl-ripple{animation:ripple 1.6s ease-out infinite}
      .gl-bar{width:6px;border-radius:3px;background:white;animation:bar 0.7s ease-in-out infinite}
      .gl-dot{width:12px;height:12px;border-radius:50%;background:white;animation:dotfade 1.2s ease-in-out infinite}
      .gl-spk{width:5px;border-radius:3px;background:white;animation:spk 0.5s ease-in-out infinite}
      .gl-chime{width:4px;border-radius:2px;background:#27AE60;animation:spk 0.4s ease-in-out infinite}
    `}</style>
  )
}

function Header() {
  return (
    <header id="app-header" className={c.header}>
      <div>
        <div className={c.brand}>GlöbaLink</div>
        <div className={c.tagline}>Send Money Home, Simply</div>
      </div>
      <button className={c.langBtn}>US EN ▾</button>
    </header>
  )
}

function KycBanner() {
  return (
    <div className={c.kyc}>
      <span className={c.kycText}>KYC Pending — Complete Verification</span>
      <button className={c.kycBtn}>Complete Your Profile</button>
    </div>
  )
}

function BottomNav({ tab, setTab }) {
  const tabs = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "send", label: "Send", icon: "✈️" },
    { id: "kiosk", label: "Kiosk", icon: "🏧" },
    { id: "help", label: "Help", icon: "❓" },
  ]
  return (
    <nav className={c.nav}>
      {tabs.map((t) => (
        <button key={t.id} onClick={() => setTab(t.id)}
          className={`${c.navBtn} ${tab === t.id ? "text-[#1B4332]" : "text-gray-400"}`}>
          <span className="text-lg">{t.icon}</span>
          {t.label}
        </button>
      ))}
    </nav>
  )
}

function VoiceAssistant({ setTab, lang, setLang }) {
  const L = LANGS[lang]
  const [phase, setPhase] = React.useState("idle") // idle | listening | processing | responding
  const [transcript, setTranscript] = React.useState("")
  const [response, setResponse] = React.useState(null) // { reply, intent }
  const [chime, setChime] = React.useState(false)
  const [welcomed, setWelcomed] = React.useState(false)
  const timers = React.useRef([])

  React.useEffect(() => {
    // First-open spoken welcome (simulated)
    if (!welcomed) {
      setWelcomed(true)
      setPhase("responding")
      setResponse({ reply: L.welcome, intent: "welcome" })
      const t = setTimeout(() => { setPhase("idle"); setResponse(null) }, 4200)
      timers.current.push(t)
    }
    return () => { timers.current.forEach(clearTimeout); timers.current = [] }
    // eslint-disable-next-line
  }, [])

  function reset() {
    timers.current.forEach(clearTimeout); timers.current = []
    setTranscript(""); setResponse(null); setPhase("idle"); setChime(false)
  }

  function runIntent(sample) {
    timers.current.forEach(clearTimeout); timers.current = []
    setResponse(null); setChime(false)
    setPhase("listening")
    // simulate live transcription
    const words = sample.text.split(" ")
    let shown = ""
    words.forEach((w, i) => {
      const t = setTimeout(() => { shown += (i ? " " : "") + w; setTranscript(shown) }, 350 * (i + 1))
      timers.current.push(t)
    })
    const listenEnd = 350 * (words.length + 1) + 300
    timers.current.push(setTimeout(() => setPhase("processing"), listenEnd))
    timers.current.push(setTimeout(() => {
      setPhase("responding")
      setResponse({ reply: sample.reply, intent: sample.intent })
      playChime(); setChime(true)
      timers.current.push(setTimeout(() => setChime(false), 1400))
    }, listenEnd + 1300))
  }

  function tapButton() {
    if (phase === "idle") {
      // pick a random sample to simulate, default to balance
      runIntent(L.samples[3])
    } else {
      reset()
    }
  }

  const bigText = "text-[#1B4332]"

  return (
    <div className="bg-white rounded-2xl p-5 shadow-md text-center space-y-3">
      {/* location + language badges */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <span className="inline-flex items-center gap-1 bg-[#e9f7ef] text-[#1B4332] text-xs font-semibold px-3 py-1.5 rounded-full">📍 {L.loc}</span>
        <span className="inline-flex items-center gap-1 bg-[#e8f4fb] text-[#1e6091] text-xs font-semibold px-3 py-1.5 rounded-full">🗣️ {L.speaking}</span>
      </div>

      {/* flag toggle */}
      <div className="flex items-center justify-center gap-2">
        {Object.keys(LANGS).map((k) => (
          <button key={k} onClick={() => { setLang(k); reset() }}
            className={`text-2xl w-11 h-11 rounded-full flex items-center justify-center transition ${lang === k ? "bg-[#1B4332] ring-2 ring-[#2dd4bf]" : "bg-gray-50"}`}
            aria-label={LANGS[k].speaking}>
            {LANGS[k].flag}
          </button>
        ))}
      </div>

      {/* the big voice button */}
      <div className="relative flex items-center justify-center py-3" style={{ height: 160 }}>
        {phase === "listening" && (
          <>
            <span className="absolute w-[120px] h-[120px] rounded-full bg-[#2dd4bf]/40 gl-ripple" />
            <span className="absolute w-[120px] h-[120px] rounded-full bg-[#2dd4bf]/40 gl-ripple" style={{ animationDelay: "0.8s" }} />
          </>
        )}
        <button onClick={tapButton}
          className={`relative z-10 w-[120px] h-[120px] rounded-full bg-gradient-to-br from-[#2dd4bf] to-[#1B4332] flex items-center justify-center shadow-lg ${phase === "idle" ? "gl-breathe" : ""}`}
          aria-label={L.placeholder}>
          {phase === "idle" && (
            <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" />
            </svg>
          )}
          {phase === "listening" && (
            <div className="flex items-end gap-1.5" style={{ height: 46 }}>
              {[0, 1, 2, 3, 4].map((i) => <span key={i} className="gl-bar" style={{ animationDelay: `${i * 0.12}s` }} />)}
            </div>
          )}
          {phase === "processing" && (
            <div className="flex items-center gap-2">
              {[0, 1, 2].map((i) => <span key={i} className="gl-dot" style={{ animationDelay: `${i * 0.25}s` }} />)}
            </div>
          )}
          {phase === "responding" && (
            <div className="flex items-center gap-2">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.5 8.5a5 5 0 0 1 0 7" /><path d="M18.5 5.5a9 9 0 0 1 0 13" />
              </svg>
              <div className="flex items-end gap-1" style={{ height: 22 }}>
                {[0, 1, 2].map((i) => <span key={i} className="gl-spk h-full" style={{ animationDelay: `${i * 0.15}s` }} />)}
              </div>
            </div>
          )}
        </button>
      </div>

      {/* live transcription */}
      {transcript && (
        <p className="text-[20px] font-bold text-gray-700 leading-snug">"{transcript}"</p>
      )}

      {/* status hint when idle/empty */}
      {phase === "idle" && !response && !transcript && (
        <p className="text-[20px] font-semibold text-gray-400">{L.placeholder}</p>
      )}
      {phase === "listening" && <p className="text-[20px] font-semibold text-[#2dd4bf]">{L.sending}</p>}
      {phase === "processing" && <p className="text-[20px] font-semibold text-gray-400">{L.thinking}</p>}

      {/* assistant response (voice + text together) */}
      {response && (
        <div className="space-y-3">
          <div className="bg-[#e9f7ef] rounded-2xl p-4 flex items-start gap-2 text-left">
            <span className="text-xl">🤖</span>
            <p className={`text-[20px] font-bold leading-snug ${bigText}`}>{response.reply}</p>
          </div>

          {/* chime soundwave cue */}
          {chime && (
            <div className="flex items-center justify-center gap-1" style={{ height: 16 }}>
              {[0, 1, 2, 3].map((i) => <span key={i} className="gl-chime h-full" style={{ animationDelay: `${i * 0.1}s` }} />)}
            </div>
          )}

          {/* intent-specific action UI */}
          {response.intent === "send" && (
            <div className="flex gap-3 justify-center">
              <button onClick={() => { reset(); setTab("send") }}
                className="w-16 h-16 rounded-full bg-[#27AE60] flex items-center justify-center shadow-md active:translate-y-0.5" aria-label={L.yes}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </button>
              <button onClick={reset}
                className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center shadow-md active:translate-y-0.5" aria-label={L.no}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
          )}
          {response.intent === "fees" && (
            <div className="bg-[#e8f4fb] rounded-2xl p-4 space-y-2 text-left">
              <div className="flex justify-between text-sm"><span>You Send</span><span className="font-semibold">$25.00</span></div>
              <div className="border-t border-blue-100" />
              <div className="flex justify-between text-sm text-gray-600"><span>Fees (2.5%)</span><span>-$0.63</span></div>
              <div className="border-t border-blue-100" />
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-[#27AE60]">They Receive</span>
                <p className="font-bold text-[#27AE60] text-lg">$24.38</p>
              </div>
            </div>
          )}
          {response.intent === "kiosk" && (
            <button onClick={() => { reset(); setTab("kiosk") }}
              className="w-full bg-gradient-to-r from-[#2dd4bf] to-[#1B4332] text-white font-semibold rounded-2xl py-4 text-[18px] flex items-center justify-center gap-2 shadow-md">
              📍 {L.findKiosk}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

function HomeScreen({ setTab, transfers, rate, ViewerTag, lang, setLang }) {
  const sentTotal = transfers.reduce((s, t) => s + (t.amount || 0), 0)
  const balance = 1250.50 - sentTotal
  return (
    <section id="home" className="space-y-4">
      <div className={c.balanceCard}>
        <p className="text-[#a7d7b9] text-xs font-semibold">Your Balance</p>
        <p className="text-3xl font-bold mt-1">${balance.toFixed(2)}</p>
        <p className="text-[#a7d7b9] text-sm">≈ {(balance * rate).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})} MXN</p>
        <button className={c.whitePill}>🔒 Enable Biometric Login</button>
      </div>
      <VoiceAssistant setTab={setTab} lang={lang} setLang={setLang} />
      <div className="flex gap-2">
        <div className={c.chip}>🔒 Secure &amp; Encrypted</div>
        <div className={c.chip}>💰 Low Fees (2.5%)</div>
        <div className={c.chip}>⚡ Instant Transfers</div>
      </div>
      <h2 className={c.sectionH}>Quick Actions</h2>
      <div className="flex gap-3">
        <button className={`${c.greenBtn} flex-1`} onClick={() => setTab("send")}>📤 Send Money</button>
        <button className={`${c.tealBtn} flex-1`} onClick={() => setTab("kiosk")}>🏧 ATM Kiosk</button>
      </div>
      <h2 className={c.sectionH}>Recent Transactions <span className="text-[#2dd4bf] text-xs font-semibold">View All</span></h2>
      <div className="space-y-2">
        {transfers.length === 0 && (
          <div className={`${c.card} text-center text-sm text-gray-400`}>No transfers yet — send money home today 💚</div>
        )}
        {transfers.map((t) => (
          <div key={t._id} className={`${c.card} flex items-center gap-3`}>
            <div className="w-9 h-9 rounded-full bg-[#1B4332] text-white flex items-center justify-center text-sm font-bold shrink-0">
              {(t.recipient || "?")[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#1B4332] truncate">{t.recipient}</p>
              <p className="text-xs text-gray-400 truncate">{t.note || "—"} · {new Date(t.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-bold text-[#e63946]">-${(t.amount||0).toFixed(2)}</p>
              <span className="text-[10px] font-semibold text-[#27AE60] bg-[#e9f7ef] px-2 py-0.5 rounded-full">{t.status}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
function SendScreen({ setTab, rate, can, me, onSend }) {
  const [step, setStep] = React.useState("input")
  const [amount, setAmount] = React.useState("25")
  const [recipient, setRecipient] = React.useState("4CodeHer@gmail.com")
  const [note, setNote] = React.useState("Textbook")
  const [busy, setBusy] = React.useState(false)

  const verdict = can.create({ type: "transfer", authorHandle: me })
  const amt = Number(amount) || 0
  const fee = amt * 0.025
  const receive = amt - fee

  async function confirm() {
    setBusy(true)
    try {
      await onSend({ amount: amt, recipient, note })
      setStep("success")
    } finally { setBusy(false) }
  }

  if (step === "success") {
    return (
      <section id="send" className="space-y-4 pt-6">
        <div className={c.iconCircle}>✅</div>
        <h2 className="text-center text-xl font-bold text-[#1B4332]">Money Sent!</h2>
        <div className="bg-gradient-to-br from-[#1B4332] to-[#2d6a4f] rounded-2xl p-6 text-white text-center">
          <p className="text-3xl font-bold">${receive.toFixed(2)}</p>
          <p className="text-[#a7d7b9] text-sm mt-1">≈ {(receive*rate).toFixed(2)} MXN delivered</p>
          <p className="text-xs text-[#a7d7b9] mt-3">Funds received instantly via GlöbaLink — no waiting.</p>
        </div>
        <button className={`${c.greenBtn} w-full`} onClick={() => setTab("home")}>Done</button>
      </section>
    )
  }

  if (step === "confirm") {
    return (
      <section id="send" className="space-y-4 pt-6">
        <div className={c.iconCircle}>💸</div>
        <h2 className="text-center text-xl font-bold text-[#1B4332]">Send Money</h2>
        <p className="text-center text-sm text-gray-500">Fast, secure, and transparent</p>
        <h3 className="font-bold text-[#1B4332]">Fee Breakdown</h3>
        <div className="bg-[#e8f4fb] rounded-2xl p-4 space-y-2">
          <div className="flex justify-between text-sm"><span>You Send</span><span className="font-semibold">${amt.toFixed(2)}</span></div>
          <div className="border-t border-blue-100" />
          <div className="flex justify-between text-sm text-gray-600"><span>Fees (2.5%)</span><span>-${fee.toFixed(2)}</span></div>
          <div className="border-t border-blue-100" />
          <div className="flex justify-between items-baseline">
            <span className="font-bold text-[#27AE60]">They Receive</span>
            <div className="text-right">
              <p className="font-bold text-[#27AE60] text-lg">${receive.toFixed(2)}</p>
              <p className="text-xs text-gray-500">≈ {(receive*rate).toFixed(2)} MXN</p>
            </div>
          </div>
        </div>
        <div className="bg-[#fdf6e3] rounded-2xl p-3.5 text-xs text-[#7a6a2a] font-medium">
          💡 Transparent pricing: What you see is what you pay. No hidden fees.
        </div>
        {verdict.ok ? (
          <button className={`${c.greenBtn} w-full`} disabled={busy} onClick={confirm}>
            {busy ? "Sending…" : "✓ Confirm Transfer"}
          </button>
        ) : <p className="text-center text-sm text-gray-500">{verdict.reason}</p>}
        <button className={c.grayBtn} onClick={() => setTab("home")}>Cancel</button>
      </section>
    )
  }

  return (
    <section id="send" className="space-y-4 pt-6">
      <div className={c.iconCircle}>💸</div>
      <h2 className="text-center text-xl font-bold text-[#1B4332]">Send Money</h2>
      <p className="text-center text-sm text-gray-500">Fast, secure, and transparent</p>
      <div>
        <label className={c.label}>Amount</label>
        <input className={c.input} value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g,""))} inputMode="decimal" />
        <p className="text-xs text-gray-400 mt-1">≈ {(amt*rate).toFixed(2)} MXN</p>
      </div>
      <div>
        <label className={c.label}>Recipient</label>
        <input className={c.input} value={recipient} onChange={(e) => setRecipient(e.target.value)} />
      </div>
      <div>
        <label className={c.label}>Notes (optional)</label>
        <input className={c.input} value={note} onChange={(e) => setNote(e.target.value)} />
      </div>
      <button className={`${c.greenBtn} w-full`} onClick={() => setStep("confirm")}>Send Now</button>
      <button className={c.grayBtn} onClick={() => setTab("home")}>Cancel</button>
    </section>
  )
}
function KioskScreen({ setTab }) {
  return (
    <section id="kiosk" className="space-y-4 pt-6">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#fbbf24] to-[#f97316] flex items-center justify-center text-3xl mx-auto">☀️</div>
      <h2 className="text-center text-xl font-bold text-[#1B4332]">ATM Kiosk</h2>
      <p className="text-center text-sm text-gray-500">Solar-powered kiosks in rural areas</p>
      <div className="bg-[#fdf6e3] rounded-2xl p-4">
        <p className="text-2xl">🌍</p>
        <h3 className="font-bold text-[#1B4332] mt-1">Access Your Money Anywhere</h3>
        <p className="text-sm text-[#7a6a2a] mt-1">Cash in and cash out at thousands of solar-powered kiosks across rural communities.</p>
      </div>
      <div className="flex gap-3">
        <button className={`${c.greenBtn} flex-1`}>💵 Cash In</button>
        <button className={`${c.tealBtn} flex-1`}>💱 Cash Out</button>
      </div>
      <button className="w-full bg-gradient-to-r from-[#2dd4bf] to-[#1B4332] text-white font-semibold rounded-2xl py-4 text-sm min-h-[44px] shadow-md">📍 Find Nearest Kiosk</button>
      <button className={c.grayBtn} onClick={() => setTab("home")}>Cancel</button>
    </section>
  )
}
function HelpScreen() {
  return (
    <section id="help" className="space-y-3">
      <div className={c.iconCircle}>💬</div>
      <h2 className="text-center text-xl font-bold text-[#1B4332]">We're Here to Help</h2>
      <p className="text-center text-sm text-gray-500">Friendly support, any time you need it.</p>
      <div className={c.card}>
        <p className="text-sm font-semibold text-[#1B4332]">Common questions</p>
        <ul className="mt-2 space-y-2 text-sm text-gray-600">
          <li>• How long do transfers take?</li>
          <li>• Where are the kiosks near me?</li>
          <li>• How do I complete verification?</li>
        </ul>
      </div>
    </section>
  )
}

export default function App() {
  const [tab, setTab] = React.useState("home")
  const [lang, setLang] = React.useState(detectLang)
  const { ViewerTag, viewer } = useViewer()
  const { can } = useVibe("globalink")
  const { useLiveQuery, database } = useFireproof("globalink")
  const { docs: transfers } = useLiveQuery("type", { key: "transfer", descending: true })

  const me = viewer?.userHandle
  const RATE = 20.008 // MXN per USD

  async function sendTransfer({ amount, recipient, note }) {
    await database.put({
      type: "transfer",
      authorHandle: me,
      amount: Number(amount),
      recipient,
      note,
      status: "received",
      createdAt: Date.now(),
    })
  }

  return (
    <div className={c.page}>
      <div className={c.shell}>
        <VoiceStyles />
        <Header />
        <KycBanner />
        <main id="app" className={c.main}>
          {tab === "home" && <HomeScreen setTab={setTab} transfers={transfers} rate={RATE} ViewerTag={ViewerTag} lang={lang} setLang={setLang} />}
          {tab === "send" && <SendScreen setTab={setTab} rate={RATE} can={can} me={me} onSend={sendTransfer} />}
          {tab === "kiosk" && <KioskScreen setTab={setTab} />}
          {tab === "help" && <HelpScreen />}
        </main>
        <BottomNav tab={tab} setTab={setTab} />
      </div>
    </div>
  )
}
