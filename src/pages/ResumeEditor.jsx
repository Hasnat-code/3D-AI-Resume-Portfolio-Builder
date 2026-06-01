import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'
import { callAI, prompts } from '../lib/ai'

const EMPTY = { name:'', title:'', email:'', phone:'', location:'', bio:'', skills:'', experience:'', education:'', projects:'' }

export default function ResumeEditor() {
  const { user, profile } = useAuth()
  const navigate = useNavigate()
  const [form, setForm]   = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved]   = useState(false)
  const [aiField, setAiField] = useState(null)
  const [aiLoading, setAiLoading] = useState(false)
  const [resumeId, setResumeId]   = useState(null)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const runAI = async (type) => {
    if (!profile?.ai_key) { alert('Add your AI key in Settings first.'); return }
    setAiField(type); setAiLoading(true)
    try {
      const promptMap = {
        bio:     prompts.bio(form.experience || form.bio),
        summary: prompts.summary(form.experience),
        improve: prompts.improve(form.bio),
      }
      const result = await callAI({ provider: profile.ai_provider||'claude', apiKey: profile.ai_key, prompt: promptMap[type] })
      if (type === 'bio' || type === 'improve') set('bio', result)
      else alert(result)
    } catch(ex) { alert('AI error: ' + ex.message) }
    setAiLoading(false); setAiField(null)
  }

  const save = async () => {
    if (!user) return
    setSaving(true)
    const content = { ...form }
    const raw = Object.values(form).join(' ')
    const payload = { user_id: user.id, title: form.name ? `${form.name} - Resume` : 'My Resume', content, raw_text: raw, is_active: true }
    let error
    if (resumeId) {
      const res = await supabase.from('resumes').update(payload).eq('id', resumeId).select().single()
      error = res.error
    } else {
      const res = await supabase.from('resumes').insert(payload).select().single()
      error = res.error
      if (res.data) setResumeId(res.data.id)
    }
    if (!error) { setSaved(true); setTimeout(() => setSaved(false), 3000) }
    else alert(error.message)
    setSaving(false)
  }

  const Section = ({ title, color='#00f5ff', children }) => (
    <div style={{marginBottom:28}}>
      <h3 style={{fontFamily:'Work Sans',fontWeight:800,fontSize:15,color,marginBottom:14,paddingBottom:8,borderBottom:`1px solid ${color}18`,letterSpacing:.5}}>{title}</h3>
      {children}
    </div>
  )

  const Field = ({ label, field, type='text', placeholder='', rows=0 }) => (
    <div style={{marginBottom:14}}>
      <label style={{fontSize:11,color:'#64748b',fontWeight:700,letterSpacing:1.5,textTransform:'uppercase',display:'block',marginBottom:6}}>{label}</label>
      {rows ? (
        <textarea className="input-field" rows={rows} placeholder={placeholder} value={form[field]} onChange={e=>set(field,e.target.value)} style={{resize:'vertical',fontFamily:'Work Sans'}} />
      ) : (
        <input className="input-field" type={type} placeholder={placeholder} value={form[field]} onChange={e=>set(field,e.target.value)} />
      )}
    </div>
  )

  return (
    <div style={{minHeight:'100vh',background:'#020408',fontFamily:'Work Sans,sans-serif'}}>
      <div className="grid-bg" style={{position:'fixed',inset:0,pointerEvents:'none'}} />
      {/* Top bar */}
      <div style={{position:'sticky',top:0,zIndex:50,background:'rgba(2,4,8,0.9)',borderBottom:'1px solid rgba(0,245,255,0.08)',padding:'14px 28px',display:'flex',alignItems:'center',gap:16,backdropFilter:'blur(20px)'}}>
        <button onClick={()=>navigate('/dashboard')} style={{background:'transparent',border:'1px solid rgba(255,255,255,0.1)',color:'#94a3b8',padding:'8px 16px',borderRadius:8,cursor:'pointer',fontSize:13,fontFamily:'Work Sans',fontWeight:600}}>← Dashboard</button>
        <span style={{fontFamily:'Work Sans',fontWeight:800,fontSize:16}}>Resume Editor</span>
        <div style={{marginLeft:'auto',display:'flex',gap:10}}>
          {!profile?.ai_key && <span style={{fontSize:12,color:'#fbbf24',padding:'6px 12px',background:'rgba(251,191,36,0.08)',borderRadius:8,border:'1px solid rgba(251,191,36,0.2)'}}>⚠ No AI key in Settings</span>}
          <button className="btn-primary" style={{padding:'10px 24px',fontSize:14}} onClick={save} disabled={saving}>{saving?'Saving…':saved?'✓ Saved!':'Save Resume'}</button>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:0,maxWidth:1300,margin:'0 auto',padding:'0 0 80px'}}>
        {/* Editor */}
        <div style={{padding:'32px 28px',borderRight:'1px solid rgba(0,245,255,0.07)',overflowY:'auto',maxHeight:'calc(100vh - 64px)'}}>
          <Section title="Personal Info" color="#00f5ff">
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
              <Field label="Full Name"    field="name"     placeholder="Alex Johnson" />
              <Field label="Job Title"    field="title"    placeholder="Full-Stack Engineer" />
              <Field label="Email"        field="email"    type="email" placeholder="alex@example.com" />
              <Field label="Phone"        field="phone"    placeholder="+1 (555) 000-0000" />
            </div>
            <Field label="Location" field="location" placeholder="New York, NY" />
          </Section>

          <Section title="Professional Bio" color="#a855f7">
            <Field label="Bio" field="bio" rows={4} placeholder="Results-driven engineer with 5+ years..." />
            <div style={{display:'flex',gap:8,marginTop:6}}>
              <button onClick={()=>runAI('bio')} disabled={aiLoading&&aiField==='bio'} style={{padding:'8px 16px',background:'rgba(168,85,247,0.1)',border:'1px solid rgba(168,85,247,0.25)',borderRadius:8,color:'#a855f7',fontSize:12,cursor:'pointer',fontFamily:'Work Sans',fontWeight:600}}>
                {aiLoading&&aiField==='bio'?'✦ Generating…':'✦ AI Generate Bio'}
              </button>
              <button onClick={()=>runAI('improve')} disabled={aiLoading&&aiField==='improve'} style={{padding:'8px 16px',background:'rgba(0,245,255,0.06)',border:'1px solid rgba(0,245,255,0.15)',borderRadius:8,color:'#00f5ff',fontSize:12,cursor:'pointer',fontFamily:'Work Sans',fontWeight:600}}>
                {aiLoading&&aiField==='improve'?'✦ Improving…':'✦ AI Improve'}
              </button>
            </div>
          </Section>

          <Section title="Skills" color="#22d3ee">
            <Field label="Skills (comma separated)" field="skills" placeholder="React, TypeScript, Node.js, AWS, PostgreSQL, Docker" rows={3} />
          </Section>

          <Section title="Work Experience" color="#f472b6">
            <Field label="Experience (describe each role)" field="experience" rows={6} placeholder={`Software Engineer @ Company (2022–Present)\n• Built X which increased Y by Z%\n• Led team of N engineers\n\nJunior Developer @ Other Co (2020–2022)\n• ...`} />
          </Section>

          <Section title="Education" color="#a855f7">
            <Field label="Education" field="education" rows={3} placeholder="B.Sc. Computer Science — MIT, 2020" />
          </Section>

          <Section title="Projects" color="#00f5ff">
            <Field label="Projects" field="projects" rows={5} placeholder={`SaaS Dashboard (2024)\nTech: React, Supabase, Tailwind\nLink: github.com/you/project\n• What it does and impact`} />
          </Section>
        </div>

        {/* Live Preview */}
        <div style={{padding:'32px 28px',overflowY:'auto',maxHeight:'calc(100vh - 64px)'}}>
          <div style={{fontSize:12,color:'#475569',fontFamily:'Work Sans',fontWeight:600,letterSpacing:2,textTransform:'uppercase',marginBottom:18}}>LIVE PREVIEW</div>
          <div style={{background:'#0a0f1e',border:'1px solid rgba(0,245,255,0.12)',borderRadius:16,padding:'36px 32px',minHeight:600,boxShadow:'0 20px 60px rgba(0,0,0,0.5)'}}>
            {form.name ? (
              <>
                <div style={{borderBottom:'2px solid rgba(0,245,255,0.15)',paddingBottom:20,marginBottom:24}}>
                  <h1 style={{fontFamily:'Work Sans',fontWeight:900,fontSize:26,marginBottom:4}}>{form.name}</h1>
                  {form.title && <div style={{fontSize:15,color:'#00f5ff',fontWeight:600,marginBottom:8}}>{form.title}</div>}
                  <div style={{display:'flex',gap:16,flexWrap:'wrap',fontSize:13,color:'#64748b'}}>
                    {form.email && <span>✉ {form.email}</span>}
                    {form.phone && <span>📞 {form.phone}</span>}
                    {form.location && <span>📍 {form.location}</span>}
                  </div>
                </div>
                {form.bio && (
                  <div style={{marginBottom:22}}>
                    <div style={{fontSize:11,color:'#a855f7',fontWeight:800,letterSpacing:2,textTransform:'uppercase',marginBottom:8}}>SUMMARY</div>
                    <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7}}>{form.bio}</p>
                  </div>
                )}
                {form.skills && (
                  <div style={{marginBottom:22}}>
                    <div style={{fontSize:11,color:'#00f5ff',fontWeight:800,letterSpacing:2,textTransform:'uppercase',marginBottom:10}}>SKILLS</div>
                    <div style={{display:'flex',flexWrap:'wrap',gap:7}}>
                      {form.skills.split(',').map(s=>s.trim()).filter(Boolean).map((s,i)=>(
                        <span key={i} style={{padding:'4px 12px',background:'rgba(0,245,255,0.08)',border:'1px solid rgba(0,245,255,0.15)',borderRadius:100,fontSize:12,color:'#00f5ff'}}>{s}</span>
                      ))}
                    </div>
                  </div>
                )}
                {form.experience && (
                  <div style={{marginBottom:22}}>
                    <div style={{fontSize:11,color:'#f472b6',fontWeight:800,letterSpacing:2,textTransform:'uppercase',marginBottom:10}}>EXPERIENCE</div>
                    <pre style={{fontSize:13,color:'#94a3b8',lineHeight:1.7,whiteSpace:'pre-wrap',fontFamily:'Work Sans'}}>{form.experience}</pre>
                  </div>
                )}
                {form.education && (
                  <div style={{marginBottom:22}}>
                    <div style={{fontSize:11,color:'#a855f7',fontWeight:800,letterSpacing:2,textTransform:'uppercase',marginBottom:10}}>EDUCATION</div>
                    <pre style={{fontSize:13,color:'#94a3b8',lineHeight:1.7,whiteSpace:'pre-wrap',fontFamily:'Work Sans'}}>{form.education}</pre>
                  </div>
                )}
                {form.projects && (
                  <div>
                    <div style={{fontSize:11,color:'#22d3ee',fontWeight:800,letterSpacing:2,textTransform:'uppercase',marginBottom:10}}>PROJECTS</div>
                    <pre style={{fontSize:13,color:'#94a3b8',lineHeight:1.7,whiteSpace:'pre-wrap',fontFamily:'Work Sans'}}>{form.projects}</pre>
                  </div>
                )}
              </>
            ) : (
              <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:400,color:'#334155',textAlign:'center'}}>
                <div style={{fontSize:48,marginBottom:16}}>📄</div>
                <p style={{fontSize:16,fontWeight:600}}>Start filling in your details</p>
                <p style={{fontSize:13,marginTop:6,color:'#1e293b'}}>Your resume preview appears here in real-time</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
