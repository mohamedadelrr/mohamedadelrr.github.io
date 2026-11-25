(function(){
const $=s=>document.querySelector(s);const Q=new URLSearchParams(location.search);
const P=window.PROJECTS,sec=$('#fly'),cv=$('#fly-c');if(!P||!window.THREE||!sec)return;
const T=THREE;let ren;try{ren=new T.WebGLRenderer({canvas:cv,antialias:true,alpha:false})}catch(e){sec.style.display='none';return}
const dpr=Math.min(devicePixelRatio||1,1.75);ren.setPixelRatio(dpr);ren.setClearColor(0x15140f,1);
const scene=new T.Scene();scene.fog=new T.Fog(0x15140f,12,42);
const cam=new T.PerspectiveCamera(55,1,.1,80);
const N=P.length,GAP=7.5;
const pos=i=>new T.Vector3(Math.sin(i*1.9)*3.1,Math.cos(i*2.4)*1.5,-i*GAP);
const cols=[['#e9e5dc','#15140f'],['#e4401b','#15140f'],['#1d1c16','#e9e5dc']];
function tex(p,i){const c=document.createElement('canvas');c.width=600;c.height=760;const x=c.getContext('2d');if(window.AR)x.letterSpacing='0px';const [bg,fg]=cols[i%3];
 x.fillStyle=bg;x.fillRect(0,0,600,760);x.fillStyle=fg;
 x.globalAlpha=.7;x.font=window.AR?'600 30px Cairo,sans-serif':'500 26px "JetBrains Mono",monospace';x.fillText(window.AR?p.c:p.c.toUpperCase(),40,70);x.globalAlpha=1;
 x.font='800 330px Archivo,sans-serif';x.fillText(String(i+1).padStart(2,'0'),24,430);
 x.font=window.AR?'700 54px Cairo,sans-serif':'italic 400 64px "Instrument Serif",serif';
 const words=p.n.split(' ');let line='',y=540;for(const w of words){const t=line?line+' '+w:w;if(x.measureText(t).width>520&&line){x.fillText(line,40,y);y+=64;line=w}else line=t}x.fillText(line,40,y);
 x.font='500 22px "JetBrains Mono",monospace';x.globalAlpha=.7;x.fillText(p.t.slice(0,3).join('  /  ').toUpperCase(),40,720);
 x.strokeStyle=fg;x.globalAlpha=.9;x.lineWidth=3;x.strokeRect(10,10,580,740);
 const t=new T.CanvasTexture(c);t.anisotropy=4;return t}
const cards=[];const grp=new T.Group();scene.add(grp);
function build(){P.forEach((p,i)=>{const m=new T.Mesh(new T.PlaneGeometry(3.3,4.18),new T.MeshBasicMaterial({map:tex(p,i),fog:true,side:T.DoubleSide}));
 const q=pos(i);m.position.copy(q);m.rotation.y=Math.sin(i*1.3)*.35;m.rotation.z=Math.sin(i*2.1)*.05;m.userData.b=m.rotation.clone();grp.add(m);cards.push(m)})}
(document.fonts&&document.fonts.load?Promise.all([document.fonts.load('800 40px Archivo'),document.fonts.load('italic 400 40px "Instrument Serif"'),document.fonts.load('500 20px "JetBrains Mono"')].concat(window.AR?[document.fonts.load('600 30px Cairo'),document.fonts.load('700 54px Cairo')]:[])).catch(()=>{}):Promise.resolve()).then(()=>{build();ready=1;upd(true)});
let ready=0;
/* path line + particles */
const pts=P.map((_,i)=>pos(i).clone());const curve=new T.CatmullRomCurve3(pts);
const lg=new T.BufferGeometry().setFromPoints(curve.getPoints(300));
scene.add(new T.Line(lg,new T.LineBasicMaterial({color:0xe4401b,transparent:true,opacity:.7})));
const K=900,pa=new Float32Array(K*3);for(let i=0;i<K;i++){pa[i*3]=(Math.random()-.5)*22;pa[i*3+1]=(Math.random()-.5)*12;pa[i*3+2]=-Math.random()*(N*GAP+10)+6}
const pg=new T.BufferGeometry();pg.setAttribute('position',new T.BufferAttribute(pa,3));
const parts=new T.Points(pg,new T.PointsMaterial({color:0xe9e5dc,size:.045,transparent:true,opacity:.7,sizeAttenuation:true}));scene.add(parts);
/* wire rings along path */
const rg=new T.TorusGeometry(2.2,.012,6,64);for(let i=0;i<N*2;i++){const m=new T.Mesh(rg,new T.MeshBasicMaterial({color:i%2?0xe4401b:0xe9e5dc,transparent:true,opacity:.35}));const t=i/(N*2-1);m.position.copy(curve.getPoint(t));m.position.z-=GAP*.5;m.scale.setScalar(1.8+Math.sin(i)*.4);grp.add(m)}
function size(){const w=cv.clientWidth,h=cv.clientHeight;ren.setSize(w,h,false);cam.aspect=w/h;cam.fov=w<h?70:58;cam.updateProjectionMatrix();portrait=w<h;if(portrait)cam.setViewOffset(w,h,0,h*.17,w,h);else cam.clearViewOffset()}
let portrait=false;size();addEventListener('resize',size);
let fe=0,target=0,prog=0,px=0,py=0,tpx=0,tpy=0,cur=-1;
if(Q.get('fly'))target=prog=+Q.get('fly');
function scrollP(){const r=sec.getBoundingClientRect();const h=sec.offsetHeight-innerHeight;return Math.max(0,Math.min(1,-r.top/h))}
addEventListener('pointermove',e=>{tpx=e.clientX/innerWidth-.5;tpy=e.clientY/innerHeight-.5});
const cap=$('.fly-cap');
function upd(force){const i=Math.max(0,Math.min(N-1,Math.round(fe)));if(i===cur&&!force)return;cur=i;const p=P[i];
 const set=()=>{$('#fc-cat').textContent=p.c;$('#fc-name').textContent=p.n;$('#fc-d').textContent=p.d;$('#fc-tg').innerHTML=p.t.map(t=>'<span>'+t+'</span>').join('');const u=$('#fc-u');if(p.u){u.href=p.u;u.textContent=TX.src;u.style.display=''}else u.style.display='none';$('#fly-n').textContent=String(i+1).padStart(2,'0')+' / '+N;cap.classList.remove('sw')};
 if(force||Q.has('shot'))set();else{cap.classList.add('sw');setTimeout(set,220)}}
let vis=true;new IntersectionObserver(e=>vis=e[0].isIntersecting).observe(sec);
const look=new T.Vector3();
function frame(){requestAnimationFrame(frame);if(!vis||!ready)return;
 if(!Q.get('fly'))target=scrollP();prog+=(target-prog)*.075;px+=(tpx-px)*.05;py+=(tpy-py)*.05;
 const f0=prog*(N-1),fl=Math.min(N-2,Math.floor(f0)),fr=Math.min(1,f0-fl);const f=fl+(fr<.5?4*fr*fr*fr:1-4*Math.pow(1-fr,3));fe=f;const t=Math.min(.999,Math.max(0,f/(N-1)));
 const here=curve.getPoint(t),ahead=curve.getPoint(Math.min(1,t+.02));
 const zc=-f*GAP;
 cam.position.set(here.x+px*1.2,here.y-py*.8,zc+(portrait?6.8:5.4));
 look.set(here.x+(ahead.x-here.x)*.5,here.y+(ahead.y-here.y)*.5,zc-4);cam.lookAt(look);if(!portrait)cam.translateX(-1.7);cam.rotation.z+=Math.sin(prog*9)*.025;
 cards.forEach((m,i)=>{const d=i-f;m.rotation.y=m.userData.b.y*(1-Math.max(0,1-Math.abs(d)));const a=Math.max(0,1-Math.abs(d)*.9);m.scale.setScalar(1+a*.08);m.position.z=-i*GAP+a*.6;});
 parts.rotation.z=prog*.6;
 $('#fly-bar').style.width=(prog*100)+'%';upd();
 ren.render(scene,cam)}
if(Q.get('fly')&&!Q.get('y'))setTimeout(()=>{$('#top').style.marginTop=-sec.offsetTop+'px'},50);
frame();
})();
