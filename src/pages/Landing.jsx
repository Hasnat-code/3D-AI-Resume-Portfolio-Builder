import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useAppStore } from '../store/useAppStore'

// ── 3D Cursor Resume Card ────────────────────────────────────────────────
function ResumeCard3D() {
  const cardRef = useRef(null)
  const [pos, setPos]     = useState({ x: -300, y: 200 })
  const [tilt, setTilt]   = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)
  const posRef = useRef({ x: -300, y: 200 })
  const targetRef = useRef({ x: -300, y: 200 })
  const rafRef = useRef(null)

  useEffect(() => {
    const move = (e) => {
      setVisible(true)
      targetRef.current = { x: e.clientX + 30, y: e.clientY - 80 }
      const cx = e.clientX / window.innerWidth  - 0.5
      const cy = e.clientY / window.innerHeight - 0.5
      setTilt({ x: cy * 22, y: -cx * 22 })
    }
    const leave = () => setVisible(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseleave', leave)

    const animate = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.1
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.1
      setPos({ x: posRef.current.x, y: posRef.current.y })
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseleave', leave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      ref={cardRef}
      style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        zIndex: 9999,
        pointerEvents: 'none',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s ease',
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) rotateZ(-3deg)`,
        transformStyle: 'preserve-3d',
        filter: 'drop-shadow(0 30px 60px rgba(0,245,255,0.25)) drop-shadow(0 10px 30px rgba(168,85,247,0.2))',
      }}
    >
      {/* paper coming out of frame effect */}
      <div style={{
        width: 190, background: '#0a0f1e',
        border: '1px solid rgba(0,245,255,0.3)',
        borderRadius: 10, overflow: 'hidden',
        boxShadow: '0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}>
        {/* top bar */}
        <div style={{ background: 'linear-gradient(135deg,#00c8d4,#7c3aed)', padding: '12px 14px' }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', marginBottom: 8, display:'flex',alignItems:'center',justifyContent:'center',fontSize:16 }}>👤</div>
          <div style={{ height: 7, background: 'rgba(255,255,255,0.8)', borderRadius: 4, marginBottom: 5, width: '80%' }} />
          <div style={{ height: 5, background: 'rgba(255,255,255,0.5)', borderRadius: 3, width: '55%' }} />
        </div>
        {/* content lines */}
        <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[['EXPERIENCE','#00f5ff'],['',''],['',''],['SKILLS','#a855f7'],['',''],['','']].map(([label,color],i) => (
            label
              ? <div key={i} style={{ fontSize: 8, color, fontFamily:'Work Sans', fontWeight:700, letterSpacing: 2, marginTop: i>0?6:0 }}>{label}</div>
              : <div key={i} style={{ height: 5, background: `rgba(255,255,255,${0.06 + (i%2)*0.03})`, borderRadius: 3, width: `${60+i*8}%` }} />
          ))}
          <div style={{ display:'flex', gap:4, flexWrap:'wrap', marginTop:4 }}>
            {['React','Node','AI','TS'].map(s => (
              <div key={s} style={{ padding:'2px 7px', borderRadius: 20, background:'rgba(0,245,255,0.12)', border:'1px solid rgba(0,245,255,0.25)', fontSize:8, color:'#00f5ff', fontFamily:'Work Sans' }}>{s}</div>
            ))}
          </div>
        </div>
        {/* frame pop-out tab at bottom */}
        <div style={{ height: 8, background: 'linear-gradient(135deg,rgba(0,245,255,0.1),rgba(168,85,247,0.1))', borderTop:'1px solid rgba(0,245,255,0.1)' }} />
      </div>
    </div>
  )
}

// ── Particle Canvas ──────────────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let W, H, particles = [], raf
    let rotY = 0, rotX = 0, drag = false, lx = 0, ly = 0

    const resize = () => {
      const r = canvas.parentElement.getBoundingClientRect()
      W = canvas.width  = r.width  * devicePixelRatio
      H = canvas.height = r.height * devicePixelRatio
      canvas.style.width  = r.width  + 'px'
      canvas.style.height = r.height + 'px'
    }

    class P {
      constructor() { this.reset() }
      reset() {
        const phi = Math.random()*Math.PI*2, theta = Math.acos(2*Math.random()-1), r = 80+Math.random()*160
        this.ox = r*Math.sin(theta)*Math.cos(phi)
        this.oy = r*Math.sin(theta)*Math.sin(phi)
        this.oz = r*Math.cos(theta)
        this.x = this.ox; this.y = this.oy; this.z = this.oz
        this.hue = Math.random() < 0.5 ? 185 : 270
        this.size = 0.8 + Math.random()*2
        this.angle = Math.random()*Math.PI*2
        this.speed = 0.002 + Math.random()*0.003
        this.life = 0
      }
      update() {
        this.angle += this.speed
        this.x = this.ox + Math.sin(this.angle*1.3)*20
        this.y = this.oy + Math.cos(this.angle)*18
        this.z = this.oz + Math.sin(this.angle*0.7)*15
        this.life = Math.min(this.life+0.006, 1)
      }
      project() {
        const cy=Math.cos(rotY),sy=Math.sin(rotY), cx2=Math.cos(rotX),sx2=Math.sin(rotX)
        const x1 = this.x*cy - this.z*sy, z1 = this.x*sy + this.z*cy
        const y1 = this.y*cx2 - z1*sx2, z2 = this.y*sx2 + z1*cx2
        const s = 500/(500+z2+300)
        return { sx: W/2+x1*s, sy: H/2+y1*s, s, z: z2 }
      }
    }

    const init = () => { particles = Array.from({length:100},()=>new P()) }
    const draw = (t) => {
      ctx.clearRect(0,0,W,H)
      if (!drag) { rotY += 0.004; rotX = Math.sin(t*0.0004)*0.15 }
      const pts = particles.map(p=>{p.update();return{p,pr:p.project()}}).sort((a,b)=>a.pr.z-b.pr.z)
      for (let i=0;i<pts.length;i++) {
        const a = pts[i]
        for (let j=i+1;j<Math.min(i+4,pts.length);j++) {
          const b=pts[j], dx=a.pr.sx-b.pr.sx, dy=a.pr.sy-b.pr.sy, d=Math.sqrt(dx*dx+dy*dy)
          if (d<100) {
            const al=(1-d/100)*0.12*a.p.life*b.p.life
            ctx.beginPath(); ctx.moveTo(a.pr.sx,a.pr.sy); ctx.lineTo(b.pr.sx,b.pr.sy)
            ctx.strokeStyle=`hsla(${a.p.hue},100%,70%,${al})`; ctx.lineWidth=0.5; ctx.stroke()
          }
        }
      }
      for (const {p,pr} of pts) {
        const al = p.life*(0.4+pr.s*0.6), r = p.size*pr.s*1.5
        const g = ctx.createRadialGradient(pr.sx,pr.sy,0,pr.sx,pr.sy,r*4)
        g.addColorStop(0,`hsla(${p.hue},100%,75%,${al})`)
        g.addColorStop(1,`hsla(${p.hue},100%,70%,0)`)
        ctx.beginPath(); ctx.arc(pr.sx,pr.sy,r*4,0,Math.PI*2); ctx.fillStyle=g; ctx.fill()
        ctx.beginPath(); ctx.arc(pr.sx,pr.sy,r,0,Math.PI*2)
        ctx.fillStyle=`hsla(${p.hue},100%,90%,${al})`; ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    canvas.onmousedown = e=>{drag=true;lx=e.clientX;ly=e.clientY}
    window.onmouseup = ()=>drag=false
    canvas.onmousemove = e=>{ if(drag){rotY+=(e.clientX-lx)*0.005;rotX+=(e.clientY-ly)*0.005;lx=e.clientX;ly=e.clientY} }
    window.addEventListener('resize', resize)
    resize(); init(); raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} style={{width:'100%',height:'100%',cursor:'grab',borderRadius:16}} />
}

// ── Auth Modal ────────────────────────────────────────────────────────────
function AuthModal({ mode, onClose, onToggle }) {
  const { signUp, signIn } = useAuth()
  const navigate = useNavigate()
  const [name, setName]   = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass]   = useState('')
  const [err, setErr]     = useState('')
  const [busy, setBusy]   = useState(false)
  const [done, setDone]   = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setErr(''); setBusy(true)
    try {
      if (mode === 'signup') {
        await signUp(email, pass, name)
        setDone(true)
      } else {
        await signIn(email, pass)
        onClose()
        navigate('/dashboard')
      }
    } catch(ex) {
      setErr(ex.message)
    }
    setBusy(false)
  }

  return (
    <div onClick={onClose} style={{
      position:'fixed',inset:0,zIndex:200,
      background:'rgba(0,0,0,0.88)',backdropFilter:'blur(24px)',
      display:'flex',alignItems:'center',justifyContent:'center',padding:24,
    }}>
      <div onClick={e=>e.stopPropagation()} style={{
        width:'100%',maxWidth:440,
        background:'#060d18',border:'1px solid rgba(0,245,255,0.15)',
        borderRadius:24,padding:'48px 40px',position:'relative',
        animation:'fadeUp 0.3s ease',
      }}>
        <button onClick={onClose} style={{
          position:'absolute',top:18,right:18,background:'rgba(255,255,255,0.06)',
          border:'none',color:'#94a3b8',width:32,height:32,borderRadius:'50%',
          cursor:'pointer',fontSize:18,display:'flex',alignItems:'center',justifyContent:'center',
        }}>✕</button>

        <div style={{fontFamily:'Work Sans',fontWeight:800,fontSize:20,marginBottom:4,
          background:'linear-gradient(135deg,#00f5ff,#a855f7)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
          Nexfolio.
        </div>
        <h2 style={{fontFamily:'Work Sans',fontWeight:800,fontSize:28,marginBottom:6}}>
          {mode==='signup' ? 'Create Account' : 'Welcome back'}
        </h2>
        <p style={{color:'#64748b',fontSize:14,marginBottom:28}}>
          {mode==='signup' ? 'Start building your AI-powered portfolio' : 'Sign in to your dashboard'}
        </p>

        {done ? (
          <div style={{textAlign:'center',padding:'20px 0'}}>
            <div style={{fontSize:48,marginBottom:16}}>📬</div>
            <p style={{color:'#00f5ff',fontWeight:600,fontSize:16}}>Check your email!</p>
            <p style={{color:'#64748b',fontSize:14,marginTop:8}}>
              We sent a confirmation link to <strong style={{color:'#e2e8f0'}}>{email}</strong>
            </p>
          </div>
        ) : (
          <form onSubmit={submit} style={{display:'flex',flexDirection:'column',gap:16}}>
            {mode==='signup' && (
              <div>
                <label style={{display:'block',fontSize:12,color:'#64748b',fontWeight:600,marginBottom:6,letterSpacing:1,textTransform:'uppercase'}}>Full Name</label>
                <input className="input-field" type="text" placeholder="Alex Johnson" value={name} onChange={e=>setName(e.target.value)} required />
              </div>
            )}
            <div>
              <label style={{display:'block',fontSize:12,color:'#64748b',fontWeight:600,marginBottom:6,letterSpacing:1,textTransform:'uppercase'}}>Email</label>
              <input className="input-field" type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} required />
            </div>
            <div>
              <label style={{display:'block',fontSize:12,color:'#64748b',fontWeight:600,marginBottom:6,letterSpacing:1,textTransform:'uppercase'}}>Password</label>
              <input className="input-field" type="password" placeholder="••••••••••" value={pass} onChange={e=>setPass(e.target.value)} required minLength={6} />
            </div>
            {err && <p style={{color:'#f87171',fontSize:13,background:'rgba(248,113,113,0.08)',padding:'10px 14px',borderRadius:8,border:'1px solid rgba(248,113,113,0.2)'}}>{err}</p>}
            <button className="btn-primary" type="submit" disabled={busy} style={{marginTop:4}}>
              {busy ? 'Please wait…' : mode==='signup' ? 'Create Free Account →' : 'Sign In →'}
            </button>
          </form>
        )}

        {!done && (
          <p style={{textAlign:'center',marginTop:20,fontSize:14,color:'#64748b'}}>
            {mode==='signup' ? 'Already have an account? ' : "Don't have an account? "}
            <span onClick={onToggle} style={{color:'#00f5ff',cursor:'pointer',fontWeight:600}}>
              {mode==='signup' ? 'Sign in' : 'Sign up free'}
            </span>
          </p>
        )}
      </div>
    </div>
  )
}

// ── Main Landing ──────────────────────────────────────────────────────────
export default function Landing() {
  const { user } = useAuth()
  const { authModal, authMode, openAuth, closeAuth, toggleAuthMode } = useAppStore()
  const navigate = useNavigate()

  if (user) { navigate('/dashboard'); return null }

  const features = [
    { icon:'🤖', title:'AI Resume Generator', desc:'Paste your experience — AI crafts an ATS-optimized resume in seconds using your own Claude, GPT-4 or Gemini key.', badge:'AI' },
    { icon:'✦',  title:'3D Portfolio Builder', desc:'12 cinematic dark-theme templates with glassmorphism, particle effects, and smooth Framer Motion animations.', badge:'NEW' },
    { icon:'📊', title:'ATS Optimizer',       desc:'Upload a job description. AI scores your resume and tells you exactly which keywords are missing.', badge:'AI' },
    { icon:'🌐', title:'One-Click Deploy',    desc:'Publish to a custom nexfolio.dev subdomain or export static HTML to deploy on Vercel, Netlify.', badge:'' },
    { icon:'🔑', title:'Your Own AI Key',     desc:'We never store or charge for AI. Bring your Claude, OpenAI, or Gemini key. You stay in full control.', badge:'FREE' },
    { icon:'📈', title:'Analytics',           desc:'Track portfolio views, recruiter clicks, and engagement — know when your application is being reviewed.', badge:'' },
  ]

  const testimonials = [
    { q:'Went from 0 callbacks to 6 interviews in 2 weeks. The AI bio is insane.', name:'Sarah Kim', role:'@ Stripe', av:'SK', c:'#00f5ff' },
    { q:'My portfolio went viral on Twitter. Got a DM from a Google recruiter the same day.', name:'Marcus Rivera', role:'@ Figma', av:'MR', c:'#a855f7' },
    { q:'The ATS optimizer alone is worth it. Told me the exact missing keywords. Got the job.', name:'Aisha Ndiaye', role:'@ Vercel', av:'AN', c:'#22d3ee' },
  ]

  return (
    <div style={{background:'#020408',minHeight:'100vh',fontFamily:'Work Sans,sans-serif'}}>
      <ResumeCard3D />
      {authModal && <AuthModal mode={authMode} onClose={closeAuth} onToggle={toggleAuthMode} />}

      {/* grid bg */}
      <div className="grid-bg" style={{position:'fixed',inset:0,pointerEvents:'none',zIndex:0}} />
      <div style={{position:'fixed',top:-200,left:-200,width:700,height:700,borderRadius:'50%',background:'radial-gradient(circle,rgba(168,85,247,0.1),transparent 70%)',pointerEvents:'none',zIndex:0,filter:'blur(60px)'}} />
      <div style={{position:'fixed',bottom:-100,right:-100,width:600,height:600,borderRadius:'50%',background:'radial-gradient(circle,rgba(0,245,255,0.08),transparent 70%)',pointerEvents:'none',zIndex:0,filter:'blur(60px)'}} />

      {/* NAVBAR */}
      <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:100,padding:'14px 32px',display:'flex',alignItems:'center',justifyContent:'space-between',background:'rgba(2,4,8,0.75)',backdropFilter:'blur(20px)',borderBottom:'1px solid rgba(0,245,255,0.08)'}}>
        <div style={{fontFamily:'Work Sans',fontWeight:900,fontSize:22,background:'linear-gradient(135deg,#00f5ff,#a855f7)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Nexfolio.</div>
        <div style={{display:'flex',gap:12}}>
          <button className="btn-ghost" onClick={()=>openAuth('login')} style={{padding:'10px 22px',fontSize:14}}>Sign In</button>
          <button className="btn-primary" onClick={()=>openAuth('signup')} style={{padding:'10px 22px',fontSize:14}}>Get Started Free →</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:'100px 24px 60px',position:'relative',zIndex:1}}>
        <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'rgba(0,245,255,0.06)',border:'1px solid rgba(0,245,255,0.2)',borderRadius:100,padding:'8px 20px',marginBottom:32,fontSize:13,color:'#00f5ff',fontFamily:'Work Sans',fontWeight:600}}>
          <span style={{width:6,height:6,borderRadius:'50%',background:'#00f5ff',boxShadow:'0 0 8px #00f5ff',display:'inline-block',animation:'glow-pulse 2s infinite'}} />
          AI-Powered Portfolio Builder — v2.0 Live
        </div>
        <h1 style={{fontFamily:'Work Sans',fontWeight:900,fontSize:'clamp(48px,8vw,96px)',lineHeight:.95,letterSpacing:'-3px',marginBottom:24}}>
          Build Your{' '}
          <span style={{background:'linear-gradient(135deg,#00f5ff,#a855f7,#f472b6)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Future</span>
          <br />
          <span style={{WebkitTextStroke:'2px rgba(255,255,255,0.12)',color:'transparent'}}>Portfolio</span> with AI
        </h1>
        <p style={{fontSize:18,color:'#64748b',maxWidth:520,lineHeight:1.7,marginBottom:44,fontWeight:400}}>
          The world's most intelligent resume builder. Use <strong style={{color:'#e2e8f0'}}>your own AI key</strong> — Claude, GPT-4 or Gemini. Deploy in minutes.
        </p>
        <div style={{display:'flex',gap:14,flexWrap:'wrap',justifyContent:'center'}}>
          <button className="btn-primary" onClick={()=>openAuth('signup')} style={{fontSize:16,padding:'16px 36px'}}>Start Building Free →</button>
          <button className="btn-ghost" onClick={()=>openAuth('login')} style={{fontSize:16,padding:'16px 36px'}}>Sign In</button>
        </div>

        {/* 3D Canvas */}
        <div style={{width:'100%',maxWidth:860,height:320,marginTop:64,position:'relative',borderRadius:20,border:'1px solid rgba(0,245,255,0.1)',overflow:'hidden',boxShadow:'0 40px 100px rgba(0,0,0,0.5),0 0 60px rgba(168,85,247,0.08)'}}>
          <ParticleCanvas />
          <div style={{position:'absolute',top:14,left:18,fontFamily:'Work Sans',fontSize:11,color:'rgba(0,245,255,0.45)',pointerEvents:'none'}}>NEXFOLIO.AI // DRAG TO ROTATE</div>
          <div style={{position:'absolute',bottom:14,right:18,fontFamily:'Work Sans',fontSize:11,color:'rgba(0,245,255,0.35)',pointerEvents:'none'}}>PARTICLES: 100 // ACTIVE</div>
          {/* floating stats */}
          {[
            {val:'12K+',lbl:'Users Hired',  sty:{top:-18,right:50}},
            {val:'98%', lbl:'AI Match Rate', sty:{bottom:10,left:30}},
            {val:'4.9★',lbl:'Avg Rating',   sty:{top:'35%',right:-18}},
          ].map((s,i)=>(
            <div key={i} style={{position:'absolute',...s.sty,background:'rgba(2,4,8,0.9)',border:'1px solid rgba(0,245,255,0.18)',borderRadius:10,padding:'10px 14px',fontFamily:'Work Sans',animation:`float ${6+i}s ease-in-out infinite`,animationDelay:`${i*1.5}s`}}>
              <div style={{fontSize:20,fontWeight:800,color:'#00f5ff'}}>{s.val}</div>
              <div style={{fontSize:11,color:'#64748b',marginTop:2}}>{s.lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{maxWidth:1160,margin:'0 auto',padding:'80px 24px'}}>
        <div style={{textAlign:'center',marginBottom:56}}>
          <div style={{fontFamily:'Work Sans',fontSize:12,color:'#00f5ff',letterSpacing:4,textTransform:'uppercase',opacity:.8,marginBottom:14}}>CORE FEATURES</div>
          <h2 style={{fontFamily:'Work Sans',fontWeight:900,fontSize:'clamp(32px,5vw,52px)',letterSpacing:'-1.5px',marginBottom:16}}>
            Everything to <span style={{background:'linear-gradient(135deg,#00f5ff,#a855f7)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>get hired</span>
          </h2>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:20}}>
          {features.map((f,i)=>(
            <div key={i} className="card-hover glass" style={{borderRadius:16,padding:'28px 28px',position:'relative',overflow:'hidden'}}>
              {f.badge && <span style={{position:'absolute',top:18,right:18,background:'rgba(0,245,255,0.1)',border:'1px solid rgba(0,245,255,0.25)',borderRadius:100,padding:'3px 12px',fontSize:11,color:'#00f5ff',fontWeight:700}}>{f.badge}</span>}
              <div style={{fontSize:28,marginBottom:16}}>{f.icon}</div>
              <h3 style={{fontFamily:'Work Sans',fontWeight:800,fontSize:19,marginBottom:8}}>{f.title}</h3>
              <p style={{color:'#64748b',fontSize:14,lineHeight:1.65}}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{maxWidth:1160,margin:'0 auto',padding:'40px 24px 80px'}}>
        <div style={{textAlign:'center',marginBottom:48}}>
          <div style={{fontFamily:'Work Sans',fontSize:12,color:'#00f5ff',letterSpacing:4,textTransform:'uppercase',opacity:.8,marginBottom:14}}>SOCIAL PROOF</div>
          <h2 style={{fontFamily:'Work Sans',fontWeight:900,fontSize:'clamp(28px,4vw,44px)',letterSpacing:'-1px'}}>
            Loved by <span style={{background:'linear-gradient(135deg,#00f5ff,#a855f7)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>developers</span>
          </h2>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:20}}>
          {testimonials.map((t,i)=>(
            <div key={i} className="card-hover glass" style={{borderRadius:16,padding:28}}>
              <div style={{color:'#fbbf24',marginBottom:10,letterSpacing:2}}>★★★★★</div>
              <p style={{color:'#94a3b8',fontSize:15,lineHeight:1.7,marginBottom:20,fontStyle:'italic'}}>"{t.q}"</p>
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <div style={{width:38,height:38,borderRadius:'50%',background:`rgba(0,0,0,0.3)`,border:`1px solid ${t.c}33`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,fontWeight:700,color:t.c}}>{t.av}</div>
                <div><div style={{fontWeight:700,fontSize:14}}>{t.name}</div><div style={{fontSize:12,color:'#64748b',fontFamily:'Work Sans'}}>{t.role}</div></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{textAlign:'center',padding:'80px 24px 120px',position:'relative'}}>
        <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:500,height:500,borderRadius:'50%',background:'radial-gradient(circle,rgba(168,85,247,0.08),transparent 70%)',pointerEvents:'none'}} />
        <h2 style={{fontFamily:'Work Sans',fontWeight:900,fontSize:'clamp(36px,5vw,64px)',letterSpacing:'-2px',lineHeight:1,marginBottom:20,position:'relative'}}>
          Your dream job is<br/>
          <span style={{background:'linear-gradient(135deg,#00f5ff,#a855f7,#f472b6)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>one portfolio away</span>
        </h2>
        <p style={{color:'#64748b',fontSize:17,marginBottom:40,maxWidth:460,margin:'0 auto 40px',lineHeight:1.6}}>Free to start. Bring your own AI key. Deploy in 3 minutes.</p>
        <button className="btn-primary" onClick={()=>openAuth('signup')} style={{fontSize:17,padding:'18px 44px'}}>Build My Portfolio Free →</button>
        <div style={{display:'flex',gap:28,justifyContent:'center',flexWrap:'wrap',marginTop:24}}>
          {['✓ No credit card required','✓ Your own AI key','✓ Cancel anytime'].map(t=>(
            <span key={t} style={{fontSize:13,color:'#475569',fontFamily:'Work Sans'}}>{t}</span>
          ))}
        </div>
      </section>

      <footer style={{borderTop:'1px solid rgba(0,245,255,0.07)',padding:'32px',display:'flex',justifyContent:'space-between',alignItems:'center',maxWidth:1160,margin:'0 auto',flexWrap:'wrap',gap:16}}>
        <div style={{fontFamily:'Work Sans',fontWeight:900,fontSize:18,background:'linear-gradient(135deg,#00f5ff,#a855f7)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Nexfolio.</div>
        <div style={{fontSize:13,color:'#475569',fontFamily:'Work Sans'}}>© 2025 Nexfolio. Built with ❤️ for developers.</div>
      </footer>
    </div>
  )
}
