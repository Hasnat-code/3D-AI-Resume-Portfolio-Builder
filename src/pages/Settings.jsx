import { useNavigate } from 'react-router-dom'
export default function Settings() {
  const nav = useNavigate()
  return <div style={{minHeight:'100vh',background:'#020408',display:'grid',placeItems:'center'}}>
    <div style={{textAlign:'center'}}>
      <p style={{color:'#64748b',fontFamily:'Work Sans'}}>Settings are in the Dashboard sidebar.</p>
      <button onClick={()=>nav('/dashboard')} style={{marginTop:16,padding:'12px 24px',background:'rgba(0,245,255,0.1)',border:'1px solid rgba(0,245,255,0.2)',borderRadius:10,color:'#00f5ff',cursor:'pointer',fontFamily:'Work Sans',fontWeight:600}}>← Back to Dashboard</button>
    </div>
  </div>
}
