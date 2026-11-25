(()=>{
const io0=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io0.unobserve(e.target)}}),{threshold:.25});
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const Q=new URLSearchParams(location.search),SHOT=Q.has('shot');
if(SHOT)document.body.classList.add('shot');
/* name chars */
$$('.name .ln>span').forEach((s,k)=>{const t=s.textContent;s.innerHTML=[...t].map((ch,i)=>`<span class="ch" style="--i:${i+k*7}">${ch}</span>`).join('')});
/* clock */
const clk=()=>{$('#clock').textContent=new Date().toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit',timeZone:'Africa/Cairo'})};clk();setInterval(clk,20000);
/* strip */
const words=['Web systems','Mobile apps','Embedded hardware','Computer vision','Desktop software','Teaching'];
$('#strip').innerHTML=[...words,...words,...words,...words].map(w=>`<span>${w}</span><span>/</span>`).join('');
/* projects */
$('#n1').textContent=PROJECTS.length;
const cats=['All',...new Set(PROJECTS.map(p=>p.c))];
$('#tabs').innerHTML=cats.map((c,i)=>`<button data-c="${c}" class="${i?'':'on'}">${c}<sup>${c==='All'?PROJECTS.length:PROJECTS.filter(p=>p.c===c).length}</sup></button>`).join('');
function render(c){
  const list=PROJECTS.filter(p=>c==='All'||p.c===c);
  $('#rows').innerHTML=list.map((p,i)=>`<li class="row"><button class="row-h" aria-expanded="false"><span class="num mono">${String(i+1).padStart(2,'0')}</span><span class="nm">${p.n}</span><span class="ct mono">${p.c}</span><span class="pl">+</span></button><div class="row-b"><div><p>${p.d}</p><div class="tg">${p.t.map(t=>`<span class="mono">${t}</span>`).join('')}</div>${p.u?`<a class="mono" href="${p.u}" target="_blank" rel="noopener">Source on GitHub &rarr;</a>`:''}</div></div></li>`).join('');
  $$('.row').forEach((r,i)=>{r.style.setProperty('--i',i);r.classList.add('pop')});
  hot();
}
$('#tabs').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;$$('#tabs button').forEach(x=>x.classList.remove('on'));b.classList.add('on');render(b.dataset.c)});
$('#rows').addEventListener('click',e=>{const h=e.target.closest('.row-h');if(!h)return;const r=h.parentElement,was=r.classList.contains('open');$$('.row.open').forEach(x=>{x.classList.remove('open');$('.row-h',x).setAttribute('aria-expanded','false')});if(!was){r.classList.add('open');h.setAttribute('aria-expanded','true')}});
render('All');
if(SHOT&&Q.get('open')){const r=$$('.row')[+Q.get('open')];if(r)r.classList.add('open')}
/* statement word highlight on scroll */
const st=$('#statement');st.innerHTML=st.textContent.trim().split(/\s+/).map(w=>`<span class="w">${w}</span>`).join(' ');
const ws=$$('.w',st);
function scrollFx(){const r=st.getBoundingClientRect(),vh=innerHeight;const p=Math.min(1,Math.max(0,(vh*.85-r.top)/(r.height+vh*.35)));const n=Math.round(p*ws.length);ws.forEach((w,i)=>w.classList.toggle('on',i<n));
  const y=scrollY;$('#me').style.setProperty('--py',(y*.06)+'px')}
addEventListener('scroll',scrollFx,{passive:true});scrollFx();
let lastY=scrollY,vel=0,off=0;const strip=$('#strip'),ln=$$('.name .ln>span'),disc=$('#disc'),prog=$('#prog');
(function tick(){const y=scrollY;vel+=((y-lastY)-vel)*.12;lastY=y;off-= (1.1+Math.abs(vel)*.6);const half=strip.scrollWidth/4;if(off<-half)off+=half;
 strip.style.animation='none';strip.style.transform=`translateX(${off}px)`;strip.parentElement.style.transform=`skewX(${Math.max(-8,Math.min(8,-vel*.5))}deg)`;
 const hh=innerHeight;if(y<hh*1.2){ln[0].style.transform=`translateX(${-y*.12}px)`;ln[1].style.transform=`translateX(${y*.18}px)`;disc.style.scale=1+y/hh*.35;$('#me').style.marginBottom=(-y*.05)+'px'}
 const ap=$('#abph');if(ap){const r=ap.getBoundingClientRect();ap.style.setProperty('--ty',((r.top-innerHeight/2)*-.08)+'px')}
 prog.style.transform=`scaleX(${y/(document.documentElement.scrollHeight-innerHeight||1)})`;requestAnimationFrame(tick)})();
if(SHOT)ws.forEach(w=>w.classList.add('on'));
/* counters */
const cio=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;cio.unobserve(e.target);const to=+e.target.dataset.to,t0=performance.now();const f=t=>{const p=Math.min(1,(t-t0)/1600),v=1-Math.pow(1-p,4);e.target.textContent=Math.round(to*v);if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)}),{threshold:.6});
$$('.cnt').forEach(c=>{if(SHOT)c.textContent=c.dataset.to;else cio.observe(c)});
/* observe extra reveal targets */
['#abph','.bigname'].forEach(s=>{const el=$(s);if(el){el.classList.add('rv0');io0.observe(el)}});
/* reveal */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
$$('.rv').forEach((el,i)=>io.observe(el));
if(SHOT)$$('.rv,.rv0').forEach(e=>e.classList.add('in'));
/* intro */
function go(){document.body.classList.add('go');$('#curtain').classList.add('up')}
if(SHOT){go()}else{
  let n=0;const c=$('#count');const t=setInterval(()=>{n+=Math.ceil(Math.random()*9);if(n>=100){n=100;clearInterval(t);setTimeout(go,250)}c.textContent=n},55);
}
/* scramble */
$$('.bar nav a,.links a,.down').forEach(a=>{const o=a.textContent;a.addEventListener('mouseenter',()=>{let k=0;const L='ABCDEFGHIJKLMNOPQRSTUVWXYZ';const t=setInterval(()=>{a.textContent=[...o].map((c,i)=>c===' '||i<k?c:L[Math.random()*26|0]).join('');if(++k>o.length){clearInterval(t);a.textContent=o}},28)})});
/* cursor and magnet */
const dot=$('#dot');let mx=0,my=0,dx=0,dy=0;
addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;const hx=(e.clientX/innerWidth-.5),hy=(e.clientY/innerHeight-.5);
  $('#disc').style.translate=`${hx*-24}px ${hy*-16}px`;$('#me').style.translate=`${hx*14}px ${hy*8}px`});
(function loop(){dx+=(mx-dx)*.2;dy+=(my-dy)*.2;dot.style.transform=`translate(${dx}px,${dy}px)`;requestAnimationFrame(loop)})();
function hot(){$$('a,button,.row-h').forEach(a=>{if(a._h)return;a._h=1;a.addEventListener('mouseenter',()=>{dot.classList.add('hot');dot.firstElementChild.textContent=a.classList.contains('row-h')?'Open':''});a.addEventListener('mouseleave',()=>dot.classList.remove('hot'))})}
hot();
$$('[data-mag]').forEach(m=>{m.addEventListener('mousemove',e=>{const r=m.getBoundingClientRect();m.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.12}px,${(e.clientY-r.top-r.height/2)*.2}px)`});m.addEventListener('mouseleave',()=>m.style.transform='')});
if(SHOT&&Q.get('open')===null){}
if(SHOT&&Q.get('y'))$('#top').style.marginTop=-(+Q.get('y'))+'px';
})();
