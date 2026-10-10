import { Component, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { effects } from './src/data/effects';
import './src/index.css';
class Boundary extends Component<{children: React.ReactNode}, {failed: boolean}> {
  state = {failed:false};
  static getDerivedStateFromError() { return {failed:true}; }
  render() { return this.state.failed ? <p role="alert">此效果当前无法运行，可查看原始源码。 / Preview unavailable; source is still available.</p> : this.props.children; }
}
const effect = effects.find(e => e.id === new URLSearchParams(location.search).get('effect'));
const Preview = effect?.component;
createRoot(document.getElementById('root')!).render(<Boundary><main data-effect={effect?.id} style={{minHeight:'100vh',display:'grid',placeItems:'center',padding:24,background:effect?.dark?'#09090b':'#fafafa',color:effect?.dark?'white':'#09090b'}}><div style={{width:'100%',height:520,position:'relative',overflow:'hidden'}}><Suspense fallback={<p>Loading…</p>}>{Preview ? <Preview/> : <p>Unknown effect</p>}</Suspense></div></main></Boundary>);
