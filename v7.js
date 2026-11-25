(function(){
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const Q=new URLSearchParams(location.search),SHOT=Q.has('shot');
const fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
/* ---------- loader words ---------- */
const cur=$('#curtain');
if(cur&&!SHOT){const w=document.createElement('div');w.className='cw';cur.appendChild(w);
 const bar=document.createElement('div');bar.className='cb';bar.innerHTML='<i></i>';cur.appendChild(bar);
 const words=['Web<b>.</b>','Mobile<b>.</b>','Hardware<b>.</b>','Systems<b>.</b>','Mohamed<b>.</b>'];let k=0;w.innerHTML=words[0];
 const tm=setInterval(()=>{if(++k>=words.length){clearInterval(tm);return}w.innerHTML=words[k]},420);
 const c=$('#count');const bi=bar.firstChild;const mo=new MutationObserver(()=>{bi.style.width=(parseInt(c.textContent)||0)+'%'});mo.observe(c,{childList:true,characterData:true,subtree:true});}
/* ---------- smooth scroll (wheel, desktop) ---------- */
let ty=scrollY,cy=scrollY,anim=0,own=0;
window.__syncScroll=()=>{ty=cy=scrollY};
function loop(){const d=ty-cy;if(Math.abs(d)<.4){cy=ty;own=1;scrollTo(0,cy);own=0;anim=0;return}cy+=d*.085;own=1;scrollTo(0,cy);own=0;requestAnimationFrame(loop)}
function go(){if(!anim){anim=1;requestAnimationFrame(loop)}}
if(fine&&!SHOT&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
 addEventListener('wheel',e=>{if(e.ctrlKey||e.target.closest('textarea,input'))return;e.preventDefault();
  const max=document.documentElement.scrollHeight-innerHeight;ty=Math.max(0,Math.min(max,ty+e.deltaY*(e.deltaMode===1?32:1)));go()},{passive:false});
 addEventListener('scroll',()=>{if(!anim&&!own){ty=cy=scrollY}});
 addEventListener('keydown',e=>{if(['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(e.key))setTimeout(()=>{if(!anim){ty=cy=scrollY}},60)});
}
window.__smoothTo=y=>{if(fine&&!SHOT){ty=Math.max(0,y);go()}else scrollTo({top:y,behavior:'smooth'})};
/* ---------- magnetic cursor ---------- */
if(fine){
 const els=$$('.bar nav a,.bar>a,.down,.tabs button,.links a,.mail,.fidx button,.fly-cap a');els.forEach(e=>e.classList.add('mg'));
 addEventListener('pointermove',e=>{els.forEach(el=>{const r=el.getBoundingClientRect();const cx=r.left+r.width/2,cy2=r.top+r.height/2;const dx=e.clientX-cx,dy=e.clientY-cy2;const R=Math.max(r.width,r.height)*.9+30;
  if(Math.hypot(dx,dy)<R){el.classList.add('pull');el.style.transform=`translate(${dx*.28}px,${dy*.34}px)`}else if(el.style.transform){el.classList.remove('pull');el.style.transform=''}})},{passive:true});
}
/* ---------- shader page transition ---------- */
const sc=document.createElement('canvas');sc.id='sw';document.body.appendChild(sc);
const g=sc.getContext('webgl',{premultipliedAlpha:true});
if(g){
 const vs='attribute vec2 p;varying vec2 v;void main(){v=p*.5+.5;gl_Position=vec4(p,0.,1.);}';
 const fs=`precision mediump float;varying vec2 v;uniform float P;uniform float R;
 float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
 float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
 void main(){vec2 u=v*vec2(R*6.,6.);float nz=n(u)*.6+n(u*2.1)*.3+n(u*4.3)*.1;
 float e=v.y*.55+nz*.45;float t=P*1.6-.3;
 float m=smoothstep(t-.04,t,1.-e);float edge=smoothstep(t-.1,t-.04,1.-e)-m;
 vec3 red=vec3(.894,.251,.106),ink=vec3(.082,.078,.059);
 float a=smoothstep(t-.1,t-.1+.001,1.-e);
 vec3 col=mix(red,ink,smoothstep(t-.26,t-.08,1.-e)*.0+edge*0.);
 float band=smoothstep(t-.22,t-.1,1.-e);
 col=mix(ink,red,band);
 gl_FragColor=vec4(col*a,a);}`;
 const sh=(t,s)=>{const o=g.createShader(t);g.shaderSource(o,s);g.compileShader(o);return o};
 const pr=g.createProgram();g.attachShader(pr,sh(g.VERTEX_SHADER,vs));g.attachShader(pr,sh(g.FRAGMENT_SHADER,fs));g.linkProgram(pr);g.useProgram(pr);
 const b=g.createBuffer();g.bindBuffer(g.ARRAY_BUFFER,b);g.bufferData(g.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),g.STATIC_DRAW);
 const l=g.getAttribLocation(pr,'p');g.enableVertexAttribArray(l);g.vertexAttribPointer(l,2,g.FLOAT,false,0,0);
 const uP=g.getUniformLocation(pr,'P'),uR=g.getUniformLocation(pr,'R');g.enable(g.BLEND);g.blendFunc(g.ONE,g.ONE_MINUS_SRC_ALPHA);
 const draw=p=>{const d=Math.min(devicePixelRatio||1,1.5);const w=Math.round(innerWidth*d*.5),h=Math.round(innerHeight*d*.5);if(sc.width!==w||sc.height!==h){sc.width=w;sc.height=h;g.viewport(0,0,w,h)}
  g.clearColor(0,0,0,0);g.clear(g.COLOR_BUFFER_BIT);g.uniform1f(uP,p);g.uniform1f(uR,innerWidth/innerHeight);g.drawArrays(g.TRIANGLES,0,3)};
 const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
 window.__swipe=(mid,done)=>{sc.style.display='block';const D=650;let t0=performance.now(),phase=0;
  (function f(now){const t=Math.min(1,(now-t0)/D);
   if(!phase){draw(ease(t)*.99+0);if(t>=1){phase=1;mid();t0=performance.now();requestAnimationFrame(f);return}}
   else{draw(1+ease(t)*.99);if(t>=1){sc.style.display='none';done();return}}
   requestAnimationFrame(f)})(performance.now())};
}
/* ---------- flight index ---------- */
const stage=$('.fly-stage'),P=window.PROJECTS,sec=$('#fly');
if(stage&&P&&sec){const nav=document.createElement('div');nav.className='fidx';
 P.forEach((p,i)=>{const b=document.createElement('button');b.setAttribute('aria-label',p.n);b.title=String(i+1).padStart(2,'0')+' '+p.n;b.innerHTML='<i></i>';
  b.addEventListener('click',()=>{const y=sec.offsetTop+(i/(P.length-1))*(sec.offsetHeight-innerHeight);window.__smoothTo(y)});nav.appendChild(b)});
 stage.appendChild(nav);const bs=[...nav.children];
 const upd=()=>{const i=(parseInt($('#fly-n').textContent)||1)-1;bs.forEach((b,k)=>b.classList.toggle('on',k===i))};
 new MutationObserver(upd).observe($('#fly-n'),{childList:true,characterData:true,subtree:true});upd();}
})();
