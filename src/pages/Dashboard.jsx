import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'

const NAV = [
  { id:'overview',  icon:'⊞', label:'Overview' },
  { id:'portfolios',icon:'◈', label:'Portfolios' },
  { id:'resumes',   icon:'📄', label:'Resumes' },
  { id:'ai',        icon:'✦', label:'AI Studio' },
  { id:'settings',  icon:'⚙', label:'Settings' },
]

// ── Sidebar ──────────────────────────────────────────────────────────────
function Sidebar({ active, setActive, profile, onSignOut }) {
  return (
    <aside style={{width:220,background:'rgba(6,13,24,0.95)',borderRight:'1px solid rgba(0,245,255,0.08)',display:'flex',flexDirection:'column',padding:'28px 16px',minHeight:'100vh',flexShrink:0}}>
      <div style={{fontFamily:'Work Sans',fontWeight:900,fontSize:20,background:'linear-gradient(135deg,#00f5ff,#a855f7)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',marginBottom:36,paddingLeft:8}}>Nexfolio.</div>
      <nav style={{display:'flex',flexDirection:'column',gap:4,flex:1}}>
        {NAV.map(n=>(
          <button key={n.id} onClick={()=>setActive(n.id)} style={{
            padding:'11px 12px',borderRadius:10,fontSize:14,fontWeight:500,
            display:'flex',alignItems:'center',gap:10,cursor:'pointer',
            background: active===n.id ? 'rgba(0,245,255,0.08)' : 'transparent',
            border: active===n.id ? '1px solid rgba(0,245,255,0.15)' : '1px solid transparent',
            color: active===n.id ? '#00f5ff' : '#64748b',
            fontFamily:'Work Sans',transition:'all 0.2s',textAlign:'left',
          }}>
            <span style={{fontSize:16}}>{n.icon}</span>{n.label}
          </button>
        ))}
      </nav>
      {/* User + sign out */}
      <div style={{padding:'14px 12px',background:'rgba(0,0,0,0.3)',borderRadius:12,border:'1px solid rgba(255,255,255,0.06)'}}>
        <div style={{fontSize:13,fontWeight:600,color:'#e2e8f0',marginBottom:2,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{profile?.name || 'User'}</div>
        <div style={{fontSize:11,color:'#475569',marginBottom:10,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{profile?.email || ''}</div>
        <button onClick={onSignOut} style={{width:'100%',padding:'8px',background:'transparent',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,color:'#64748b',fontSize:12,cursor:'pointer',fontFamily:'Work Sans',transition:'all 0.2s'}}
          onMouseEnter={e=>{e.target.style.borderColor='rgba(248,113,113,0.3)';e.target.style.color='#f87171'}}
          onMouseLeave={e=>{e.target.style.borderColor='rgba(255,255,255,0.08)';e.target.style.color='#64748b'}}>
          Sign Out
        </button>
      </div>
    </aside>
  )
}

// ── Overview Tab ─────────────────────────────────────────────────────────
function Overview({ profile, portfolios, resumes }) {
  const stats = [
    { val: portfolios.length, lbl:'Portfolios', delta:'+active' },
    { val: resumes.length,    lbl:'Resumes', delta:'saved' },
    { val: portfolios.reduce((a,p)=>a+(p.view_count||0),0), lbl:'Total Views', delta:'all time' },
    { val: profile?.ai_key ? '✓' : '✗', lbl:'AI Key', delta: profile?.ai_key ? 'Connected' : 'Not set' },
  ]

  return (
    <div style={{padding:'32px'}}>
      <div style={{marginBottom:28}}>
        <h1 style={{fontFamily:'Work Sans',fontWeight:800,fontSize:26}}>
          Good {new Date().getHours()<12?'morning':'afternoon'}, {profile?.name?.split(' ')[0] || 'there'} 👋
        </h1>
        <p style={{color:'#64748b',fontSize:14,marginTop:4}}>Here's what's happening with your portfolio today.</p>
      </div>
      {/* Stats */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14,marginBottom:28}}>
        {stats.map((s,i)=>(
          <div key={i} className="card-hover" style={{background:'rgba(0,0,0,0.3)',border:'1px solid rgba(0,245,255,0.08)',borderRadius:14,padding:'18px 20px'}}>
            <div style={{fontFamily:'Work Sans',fontWeight:900,fontSize:28,background:'linear-gradient(135deg,#00f5ff,#a855f7)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{s.val}</div>
            <div style={{fontSize:12,color:'#64748b',marginTop:4,fontFamily:'Work Sans'}}>{s.lbl}</div>
            <div style={{fontSize:11,color:'#22d3ee',marginTop:3}}>{s.delta}</div>
          </div>
        ))}
      </div>
      {/* No AI key warning */}
      {!profile?.ai_key && (
        <div style={{background:'rgba(251,191,36,0.06)',border:'1px solid rgba(251,191,36,0.2)',borderRadius:12,padding:'16px 20px',marginBottom:24,display:'flex',alignItems:'center',gap:14}}>
          <span style={{fontSize:22}}>⚠️</span>
          <div>
            <div style={{fontWeight:700,fontSize:14,color:'#fbbf24'}}>No AI Key Connected</div>
            <div style={{fontSize:13,color:'#92400e',marginTop:2}}>Go to <strong>Settings</strong> to add your Claude / OpenAI / Gemini API key to unlock AI features.</div>
          </div>
        </div>
      )}
      {/* Quick actions */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
        {[
          { icon:'📄', title:'Build a Resume', desc:'AI-powered resume editor with ATS optimization', color:'#00f5ff' },
          { icon:'🌐', title:'Create Portfolio', desc:'Choose a template and publish in minutes', color:'#a855f7' },
        ].map((a,i)=>(
          <div key={i} className="card-hover glass" style={{borderRadius:14,padding:'24px',cursor:'pointer',position:'relative',overflow:'hidden'}}>
            <div style={{fontSize:30,marginBottom:12}}>{a.icon}</div>
            <div style={{fontFamily:'Work Sans',fontWeight:800,fontSize:17,marginBottom:6,color:a.color}}>{a.title}</div>
            <div style={{fontSize:13,color:'#64748b'}}>{a.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Portfolios Tab ────────────────────────────────────────────────────────
function Portfolios({ portfolios, userId, onRefresh }) {
  const [creating, setCreating] = useState(false)
  const [title, setTitle]       = useState('')
  const [template, setTemplate] = useState('neural-dark')
  const [busy, setBusy]         = useState(false)

  const create = async (e) => {
    e.preventDefault()
    setBusy(true)
    const slug = title.toLowerCase().replace(/\s+/g,'-') + '-' + Date.now().toString(36)
    const { error } = await supabase.from('portfolios').insert({ user_id:userId, title, template, slug, data:{} })
    if (!error) { setCreating(false); setTitle(''); onRefresh() }
    setBusy(false)
  }

  const del = async (id) => {
    if (!confirm('Delete this portfolio?')) return
    await supabase.from('portfolios').delete().eq('id',id)
    onRefresh()
  }

  const togglePublic = async (p) => {
    await supabase.from('portfolios').update({ is_public:!p.is_public }).eq('id',p.id)
    onRefresh()
  }

  return (
    <div style={{padding:32}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:28}}>
        <h2 style={{fontFamily:'Work Sans',fontWeight:800,fontSize:22}}>My Portfolios</h2>
        <button className="btn-primary" style={{padding:'10px 22px',fontSize:14}} onClick={()=>setCreating(true)}>+ New Portfolio</button>
      </div>

      {creating && (
        <div style={{background:'rgba(0,0,0,0.5)',border:'1px solid rgba(0,245,255,0.15)',borderRadius:16,padding:28,marginBottom:24}}>
          <h3 style={{fontFamily:'Work Sans',fontWeight:700,marginBottom:18}}>Create New Portfolio</h3>
          <form onSubmit={create} style={{display:'flex',flexDirection:'column',gap:14}}>
            <div>
              <label style={{fontSize:12,color:'#64748b',fontWeight:600,letterSpacing:1,textTransform:'uppercase',display:'block',marginBottom:6}}>Portfolio Title</label>
              <input className="input-field" placeholder="My Developer Portfolio" value={title} onChange={e=>setTitle(e.target.value)} required />
            </div>
            <div>
              <label style={{fontSize:12,color:'#64748b',fontWeight:600,letterSpacing:1,textTransform:'uppercase',display:'block',marginBottom:6}}>Template</label>
              <select className="input-field" value={template} onChange={e=>setTemplate(e.target.value)} style={{cursor:'pointer'}}>
                <option value="neural-dark">Neural Dark (Cyan)</option>
                <option value="nova-violet">Nova Violet</option>
                <option value="matrix-green">Matrix Green</option>
              </select>
            </div>
            <div style={{display:'flex',gap:12}}>
              <button className="btn-primary" type="submit" disabled={busy}>{busy?'Creating…':'Create Portfolio'}</button>
              <button className="btn-ghost" type="button" onClick={()=>setCreating(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {portfolios.length === 0 ? (
        <div style={{textAlign:'center',padding:'60px 0',color:'#475569'}}>
          <div style={{fontSize:48,marginBottom:14}}>📂</div>
          <p style={{fontSize:16}}>No portfolios yet. Create your first one!</p>
        </div>
      ) : (
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:18}}>
          {portfolios.map(p=>(
            <div key={p.id} className="card-hover glass" style={{borderRadius:16,padding:24,position:'relative'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:14}}>
                <div>
                  <h3 style={{fontFamily:'Work Sans',fontWeight:800,fontSize:16,marginBottom:4}}>{p.title}</h3>
                  <span style={{fontSize:11,padding:'3px 10px',borderRadius:100,background:'rgba(0,245,255,0.08)',border:'1px solid rgba(0,245,255,0.15)',color:'#00f5ff',fontWeight:600}}>{p.template}</span>
                </div>
                <div style={{display:'flex',gap:8,alignItems:'center'}}>
                  <span style={{fontSize:11,color:p.is_public?'#22d3ee':'#64748b',fontWeight:600}}>{p.is_public?'Public':'Private'}</span>
                </div>
              </div>
              <div style={{fontSize:13,color:'#475569',marginBottom:16}}>👁 {p.view_count||0} views · /{p.slug}</div>
              <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                <button style={{padding:'7px 14px',borderRadius:8,background:'rgba(0,245,255,0.08)',border:'1px solid rgba(0,245,255,0.15)',color:'#00f5ff',fontSize:12,cursor:'pointer',fontFamily:'Work Sans',fontWeight:600}} onClick={()=>togglePublic(p)}>
                  {p.is_public?'Make Private':'Make Public'}
                </button>
                <button style={{padding:'7px 14px',borderRadius:8,background:'transparent',border:'1px solid rgba(248,113,113,0.2)',color:'#f87171',fontSize:12,cursor:'pointer',fontFamily:'Work Sans',fontWeight:600}} onClick={()=>del(p.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Resumes Tab ───────────────────────────────────────────────────────────
function Resumes({ resumes, userId, onRefresh, navigate }) {
  const del = async (id) => {
    if (!confirm('Delete this resume?')) return
    await supabase.from('resumes').delete().eq('id',id)
    onRefresh()
  }

  return (
    <div style={{padding:32}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:28}}>
        <h2 style={{fontFamily:'Work Sans',fontWeight:800,fontSize:22}}>My Resumes</h2>
        <button className="btn-primary" style={{padding:'10px 22px',fontSize:14}} onClick={()=>navigate('/editor')}>+ New Resume</button>
      </div>
      {resumes.length === 0 ? (
        <div style={{textAlign:'center',padding:'60px 0',color:'#475569'}}>
          <div style={{fontSize:48,marginBottom:14}}>📄</div>
          <p style={{fontSize:16}}>No resumes yet.</p>
          <button className="btn-primary" style={{marginTop:20,padding:'12px 28px'}} onClick={()=>navigate('/editor')}>Create Resume →</button>
        </div>
      ) : (
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:18}}>
          {resumes.map(r=>(
            <div key={r.id} className="card-hover glass" style={{borderRadius:16,padding:24}}>
              <h3 style={{fontFamily:'Work Sans',fontWeight:800,fontSize:16,marginBottom:6}}>{r.title}</h3>
              {r.ats_score && <div style={{fontSize:12,color:'#22d3ee',marginBottom:10,fontWeight:700}}>ATS Score: {r.ats_score}/100</div>}
              <div style={{fontSize:12,color:'#475569',marginBottom:16}}>{new Date(r.created_at).toLocaleDateString()}</div>
              <div style={{display:'flex',gap:8}}>
                <button style={{padding:'7px 14px',borderRadius:8,background:'rgba(0,245,255,0.08)',border:'1px solid rgba(0,245,255,0.15)',color:'#00f5ff',fontSize:12,cursor:'pointer',fontFamily:'Work Sans',fontWeight:600}} onClick={()=>navigate('/editor')}>Edit</button>
                <button style={{padding:'7px 14px',borderRadius:8,background:'transparent',border:'1px solid rgba(248,113,113,0.2)',color:'#f87171',fontSize:12,cursor:'pointer',fontFamily:'Work Sans',fontWeight:600}} onClick={()=>del(r.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── AI Studio Tab ────────────────────────────────────────────────────────
function AIStudio({ profile }) {
  const [input, setInput]     = useState('')
  const [jd, setJd]           = useState('')
  const [output, setOutput]   = useState('')
  const [busy, setBusy]       = useState(false)
  const [error, setError]     = useState('')
  const [activeType, setType] = useState('bio')

  const types = [
    { id:'bio',     label:'Generate Bio',     icon:'👤', prompt: (i)=>`Write a compelling 3-sentence professional bio for a developer with this experience: "${i}". Be specific, punchy, and ATS-friendly. Return only the bio.` },
    { id:'summary', label:'Resume Summary',   icon:'📝', prompt: (i)=>`Write a powerful 3-sentence resume summary for this developer: "${i}". Focus on impact and measurable value. Return only the summary.` },
    { id:'improve', label:'Improve Text',     icon:'✨', prompt: (i)=>`Improve this portfolio/resume text to sound more professional and compelling: "${i}". Return only the improved version.` },
    { id:'skills',  label:'Skill Gaps',       icon:'🎯', prompt: (i,j)=>`Job description: "${j}"\nMy profile: "${i}"\n\nList 6 key skills I'm missing for this role. Return as a numbered list.` },
    { id:'ats',     label:'ATS Analysis',     icon:'📊', prompt: (i,j)=>`Analyze this resume: "${i}" vs job description: "${j}".\nReturn JSON: {"score":85,"matched":["x"],"missing":["y"],"tips":["z"]}` },
  ]

  const run = async () => {
    if (!profile?.ai_key) { setError('Add your AI key in Settings first.'); return }
    if (!input.trim()) { setError('Enter some text first.'); return }
    setError(''); setBusy(true); setOutput('')
    try {
      const t = types.find(x=>x.id===activeType)
      const { callAI } = await import('../lib/ai.js')
      const result = await callAI({
        provider: profile.ai_provider || 'claude',
        apiKey: profile.ai_key,
        prompt: t.prompt(input, jd),
      })
      setOutput(result)
    } catch(ex) { setError(ex.message) }
    setBusy(false)
  }

  return (
    <div style={{padding:32}}>
      <h2 style={{fontFamily:'Work Sans',fontWeight:800,fontSize:22,marginBottom:6}}>AI Studio</h2>
      <p style={{color:'#64748b',fontSize:14,marginBottom:24}}>Powered by your own API key • Claude / OpenAI / Gemini</p>

      {!profile?.ai_key && (
        <div style={{background:'rgba(251,191,36,0.06)',border:'1px solid rgba(251,191,36,0.25)',borderRadius:12,padding:'14px 18px',marginBottom:20,fontSize:14,color:'#fbbf24'}}>
          ⚠️ No API key found. Go to <strong>Settings</strong> to add your key.
        </div>
      )}

      {/* Type selector */}
      <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:24}}>
        {types.map(t=>(
          <button key={t.id} onClick={()=>setType(t.id)} style={{
            padding:'9px 16px',borderRadius:10,fontSize:13,fontWeight:600,cursor:'pointer',
            background: activeType===t.id ? 'rgba(0,245,255,0.12)' : 'transparent',
            border: `1px solid ${activeType===t.id ? 'rgba(0,245,255,0.3)' : 'rgba(255,255,255,0.08)'}`,
            color: activeType===t.id ? '#00f5ff' : '#64748b',
            fontFamily:'Work Sans',transition:'all 0.2s',
          }}>{t.icon} {t.label}</button>
        ))}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
        <div>
          <label style={{fontSize:12,color:'#64748b',fontWeight:600,letterSpacing:1,textTransform:'uppercase',display:'block',marginBottom:8}}>
            {activeType==='ats'||activeType==='skills' ? 'Your Profile / Resume' : 'Your Input'}
          </label>
          <textarea className="input-field" rows={8} placeholder={activeType==='bio'?"5 years React, built 3 SaaS products from 0→1, led team of 4...":activeType==='summary'?"Senior full-stack engineer with expertise in...":"Paste your text here..."} value={input} onChange={e=>setInput(e.target.value)} style={{resize:'vertical',fontFamily:'Work Sans'}} />
          {(activeType==='ats'||activeType==='skills') && (
            <div style={{marginTop:14}}>
              <label style={{fontSize:12,color:'#64748b',fontWeight:600,letterSpacing:1,textTransform:'uppercase',display:'block',marginBottom:8}}>Job Description</label>
              <textarea className="input-field" rows={5} placeholder="Paste the job description here..." value={jd} onChange={e=>setJd(e.target.value)} style={{resize:'vertical',fontFamily:'Work Sans'}} />
            </div>
          )}
          {error && <p style={{color:'#f87171',fontSize:13,marginTop:10,padding:'8px 12px',background:'rgba(248,113,113,0.08)',borderRadius:8,border:'1px solid rgba(248,113,113,0.2)'}}>{error}</p>}
          <button className="btn-primary" style={{marginTop:14,width:'100%'}} onClick={run} disabled={busy}>
            {busy ? '✦ Generating…' : `✦ ${types.find(t=>t.id===activeType)?.label}`}
          </button>
        </div>
        <div>
          <label style={{fontSize:12,color:'#64748b',fontWeight:600,letterSpacing:1,textTransform:'uppercase',display:'block',marginBottom:8}}>AI Output</label>
          <div style={{background:'rgba(0,0,0,0.5)',border:'1px solid rgba(0,245,255,0.1)',borderRadius:12,padding:20,minHeight:240,fontFamily:'Work Sans',fontSize:14,color:'#94a3b8',lineHeight:1.7,position:'relative',whiteSpace:'pre-wrap'}}>
            {busy && <div style={{color:'#00f5ff',fontFamily:'Work Sans',fontSize:13}}>✦ Generating with AI…<br/><br/><span style={{color:'#475569'}}>Using your {profile?.ai_provider||'claude'} key</span></div>}
            {!busy && !output && <span style={{color:'#334155'}}>AI output will appear here…</span>}
            {!busy && output && (
              <>
                <span>{output}</span>
                <button onClick={()=>{navigator.clipboard.writeText(output)}} style={{position:'absolute',top:12,right:12,padding:'5px 12px',background:'rgba(0,245,255,0.08)',border:'1px solid rgba(0,245,255,0.2)',borderRadius:6,color:'#00f5ff',fontSize:11,cursor:'pointer',fontFamily:'Work Sans',fontWeight:600}}>Copy</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Settings Tab ──────────────────────────────────────────────────────────
function SettingsPanel({ profile, updateProfile }) {
  const [form, setForm] = useState({ name: profile?.name||'', title: profile?.title||'', bio: profile?.bio||'', ai_provider: profile?.ai_provider||'claude', ai_key: profile?.ai_key||'' })
  const [busy, setBusy] = useState(false)
  const [saved, setSaved] = useState(false)
  const [show, setShow] = useState(false)

  const save = async (e) => {
    e.preventDefault(); setBusy(true)
    try { await updateProfile(form); setSaved(true); setTimeout(()=>setSaved(false),3000) }
    catch(ex) { alert(ex.message) }
    setBusy(false)
  }

  return (
    <div style={{padding:32,maxWidth:640}}>
      <h2 style={{fontFamily:'Work Sans',fontWeight:800,fontSize:22,marginBottom:6}}>Settings</h2>
      <p style={{color:'#64748b',fontSize:14,marginBottom:28}}>Manage your profile and API keys.</p>

      <form onSubmit={save} style={{display:'flex',flexDirection:'column',gap:20}}>
        <h3 style={{fontFamily:'Work Sans',fontWeight:700,fontSize:16,color:'#00f5ff',borderBottom:'1px solid rgba(0,245,255,0.1)',paddingBottom:10}}>Profile</h3>
        {[['name','Full Name','Alex Johnson'],['title','Job Title','Full-Stack Engineer']].map(([k,l,p])=>(
          <div key={k}>
            <label style={{fontSize:12,color:'#64748b',fontWeight:600,letterSpacing:1,textTransform:'uppercase',display:'block',marginBottom:7}}>{l}</label>
            <input className="input-field" placeholder={p} value={form[k]} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} />
          </div>
        ))}
        <div>
          <label style={{fontSize:12,color:'#64748b',fontWeight:600,letterSpacing:1,textTransform:'uppercase',display:'block',marginBottom:7}}>Bio</label>
          <textarea className="input-field" rows={3} placeholder="A brief professional bio..." value={form.bio} onChange={e=>setForm(f=>({...f,bio:e.target.value}))} style={{resize:'vertical',fontFamily:'Work Sans'}} />
        </div>

        <h3 style={{fontFamily:'Work Sans',fontWeight:700,fontSize:16,color:'#a855f7',borderBottom:'1px solid rgba(168,85,247,0.1)',paddingBottom:10,marginTop:8}}>AI API Key</h3>
        <div style={{background:'rgba(0,245,255,0.03)',border:'1px solid rgba(0,245,255,0.1)',borderRadius:12,padding:18,fontSize:13,color:'#64748b',lineHeight:1.7}}>
          🔑 Your key is saved in your profile and used only for AI requests from your browser. We never store or transmit it to our servers.
        </div>
        <div>
          <label style={{fontSize:12,color:'#64748b',fontWeight:600,letterSpacing:1,textTransform:'uppercase',display:'block',marginBottom:7}}>AI Provider</label>
          <select className="input-field" value={form.ai_provider} onChange={e=>setForm(f=>({...f,ai_provider:e.target.value}))} style={{cursor:'pointer'}}>
            <option value="claude">Claude (Anthropic) — Recommended</option>
            <option value="openai">GPT-4o (OpenAI)</option>
            <option value="gemini">Gemini 1.5 Pro (Google)</option>
          </select>
        </div>
        <div>
          <label style={{fontSize:12,color:'#64748b',fontWeight:600,letterSpacing:1,textTransform:'uppercase',display:'block',marginBottom:7}}>
            API Key {form.ai_provider==='claude'?'(sk-ant-…)':form.ai_provider==='openai'?'(sk-…)':'(AIza…)'}
          </label>
          <div style={{position:'relative'}}>
            <input className="input-field" type={show?'text':'password'} placeholder={form.ai_provider==='claude'?'sk-ant-api03-...':form.ai_provider==='openai'?'sk-proj-...':'AIza...'} value={form.ai_key} onChange={e=>setForm(f=>({...f,ai_key:e.target.value}))} style={{paddingRight:60}} />
            <button type="button" onClick={()=>setShow(s=>!s)} style={{position:'absolute',right:12,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',color:'#64748b',cursor:'pointer',fontSize:18,padding:4}}>
              {show?'🙈':'👁'}
            </button>
          </div>
          <p style={{fontSize:12,color:'#475569',marginTop:6}}>
            {form.ai_provider==='claude' && <>Get your key at <a href="https://console.anthropic.com" target="_blank" rel="noreferrer" style={{color:'#00f5ff'}}>console.anthropic.com</a></>}
            {form.ai_provider==='openai' && <>Get your key at <a href="https://platform.openai.com/api-keys" target="_blank" rel="noreferrer" style={{color:'#00f5ff'}}>platform.openai.com</a></>}
            {form.ai_provider==='gemini' && <>Get your key at <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" style={{color:'#00f5ff'}}>aistudio.google.com</a></>}
          </p>
        </div>

        <button className="btn-primary" type="submit" disabled={busy} style={{alignSelf:'flex-start',padding:'13px 32px'}}>
          {busy ? 'Saving…' : saved ? '✓ Saved!' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}

// ── Main Dashboard ────────────────────────────────────────────────────────
export default function Dashboard() {
  const { user, profile, loading, signOut, updateProfile } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [portfolios, setPortfolios] = useState([])
  const [resumes, setResumes]       = useState([])
  const navigate = useNavigate()

  const loadData = async () => {
    if (!user) return
    const [{ data: p }, { data: r }] = await Promise.all([
      supabase.from('portfolios').select('*').eq('user_id',user.id).order('created_at',{ascending:false}),
      supabase.from('resumes').select('*').eq('user_id',user.id).order('created_at',{ascending:false}),
    ])
    setPortfolios(p||[]); setResumes(r||[])
  }

  useEffect(() => { loadData() }, [user])

  if (loading) return <div style={{minHeight:'100vh',background:'#020408',display:'grid',placeItems:'center'}}><div style={{width:40,height:40,borderRadius:'50%',border:'2px solid rgba(0,245,255,0.15)',borderTopColor:'#00f5ff',animation:'spin 1s linear infinite'}} /></div>

  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#020408',fontFamily:'Work Sans,sans-serif'}}>
      <div className="grid-bg" style={{position:'fixed',inset:0,pointerEvents:'none',zIndex:0}} />
      <div style={{position:'relative',zIndex:1,display:'flex',width:'100%'}}>
        <Sidebar active={activeTab} setActive={(t)=>{if(t==='settings')setActiveTab('settings');else setActiveTab(t)}} profile={profile} onSignOut={async()=>{await signOut();navigate('/')}} />
        <main style={{flex:1,overflowY:'auto',maxHeight:'100vh'}}>
          {activeTab==='overview'   && <Overview profile={profile} portfolios={portfolios} resumes={resumes} />}
          {activeTab==='portfolios' && <Portfolios portfolios={portfolios} userId={user?.id} onRefresh={loadData} />}
          {activeTab==='resumes'    && <Resumes resumes={resumes} userId={user?.id} onRefresh={loadData} navigate={navigate} />}
          {activeTab==='ai'         && <AIStudio profile={profile} />}
          {activeTab==='settings'   && <SettingsPanel profile={profile} updateProfile={updateProfile} />}
        </main>
      </div>
    </div>
  )
}
