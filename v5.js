(function(){
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const Q=new URLSearchParams(location.search),SHOT=Q.has('shot');
const hero=$('.hero');
/* WebGL dot-field hero */
const cv=document.createElement('canvas');cv.className='gl';hero.insertBefore(cv,$('.name'));
const gl=cv.getContext('webgl',{premultipliedAlpha:true,antialias:false});
let M={x:.7,y:.5,vx:0,vy:0,tx:.7,ty:.5,act:0};
if(Q.get('mx')){M.tx=M.x=+Q.get('mx');M.ty=M.y=+Q.get('my');M.act=1}
if(gl){
const vs='attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
const fs=`precision mediump float;uniform vec2 R;uniform vec2 M;uniform float T;uniform float A;uniform float S;uniform vec3 W;
void main(){vec2 fc=gl_FragCoord.xy;float cell=S;vec2 g=floor(fc/cell)*cell+cell*.5;vec2 uv=g/R;
vec2 m=vec2(M.x,1.-M.y);float asp=R.x/R.y;vec2 d=(uv-m)*vec2(asp,1.);float dist=length(d);
float wave=sin(dist*38.-T*3.2)*exp(-dist*3.4)*A;
float near=smoothstep(.34,0.,dist);
vec2 wd=(uv-W.xy)*vec2(asp,1.);float wr=length(wd);float wt=max(T-W.z,0.);float ring=exp(-pow((wr-wt*.75)*9.,2.))*exp(-wt*1.1)*step(W.z,T);
near=max(near,ring*1.2);
float base=.9+.45*sin(uv.x*9.+T*.6)*sin(uv.y*7.-T*.5);
float r=(base+near*cell*.36+wave*cell*.22+ring*cell*.5);
float dd=length(fc-g);float a=smoothstep(r,r-1.,dd);
vec3 ink=vec3(.082,.078,.059);vec3 red=vec3(.894,.251,.106);
vec3 col=mix(ink,red,smoothstep(.0,.3,near+wave*.2));
float al=a*(.22+near*.7);
gl_FragColor=vec4(col*al,al);}`;
const sh=(t,s)=>{const o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);return o};
const pr=gl.createProgram();gl.attachShader(pr,sh(gl.VERTEX_SHADER,vs));gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,fs));gl.linkProgram(pr);gl.useProgram(pr);
const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
const l=gl.getAttribLocation(pr,'p');gl.enableVertexAttribArray(l);gl.vertexAttribPointer(l,2,gl.FLOAT,false,0,0);
const u=n=>gl.getUniformLocation(pr,n);const uR=u('R'),uM=u('M'),uT=u('T'),uA=u('A'),uS=u('S'),uW=u('W');let W={x:.7,y:.6,t:0.4};
gl.enable(gl.BLEND);gl.blendFunc(gl.ONE,gl.ONE_MINUS_SRC_ALPHA);
let vis=true;new IntersectionObserver(e=>vis=e[0].isIntersecting).observe(hero);
const dpr=Math.min(devicePixelRatio||1,2);
function size(){const w=hero.clientWidth,h=hero.clientHeight;cv.width=w*dpr;cv.height=h*dpr;gl.viewport(0,0,cv.width,cv.height)}
size();addEventListener('resize',size);
const t0=performance.now();
addEventListener('pointerdown',e=>{const r=hero.getBoundingClientRect();if(e.clientY<r.top||e.clientY>r.bottom)return;W.x=(e.clientX-r.left)/r.width;W.y=(e.clientY-r.top)/r.height;W.t=(performance.now()-t0)/1000;if(window.__ph)window.__ph.kick()});
addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();M.tx=(e.clientX-r.left)/r.width;M.ty=(e.clientY-r.top)/r.height;M.act=1});
(function f(){requestAnimationFrame(f);if(!vis)return;
 const t=(performance.now()-t0)/1000;
 if(!M.act&&!SHOT){M.tx=.55+.25*Math.sin(t*.5);M.ty=.5+.25*Math.cos(t*.4)}
 M.x+=(M.tx-M.x)*.08;M.y+=(M.ty-M.y)*.08;
 gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);
 gl.uniform2f(uR,cv.width,cv.height);gl.uniform2f(uM,M.x,M.y);gl.uniform1f(uT,t);gl.uniform1f(uA,1);gl.uniform1f(uS,22*dpr);gl.uniform3f(uW,W.x,1-W.y,W.t);
 gl.drawArrays(gl.TRIANGLES,0,3)})();
}
/* WebGL liquid photo */
(function(){const img=$('#me');if(!window.ME_B64||!img)return;
 const c=document.createElement('canvas');c.className='me';c.width=495;c.height=640;c.setAttribute('role','img');c.setAttribute('aria-label','Mohamed Adel');
 const g=c.getContext('webgl',{premultipliedAlpha:true,alpha:true});if(!g)return;
 const vs='attribute vec2 p;varying vec2 v;void main(){v=p*.5+.5;gl_Position=vec4(p,0.,1.);}';
 const fs=`precision mediump float;varying vec2 v;uniform sampler2D tx;uniform vec2 M;uniform vec2 V;uniform float T;uniform float K;uniform float H;
 void main(){vec2 uv=vec2(v.x,1.-v.y);vec2 d=uv-M;d.x*=.77;float dist=length(d);float f=exp(-dist*dist*14.);
 vec2 dir=normalize(d+1e-4);
 float rip=sin(dist*44.-T*5.)*exp(-dist*5.)*H;
 vec2 off=dir*(f*.007*H+rip*.0025)+V*f*.22;
 float band=step(.985,sin(uv.y*60.+T*2.))*K*.02;off.x+=band;
 float sp=.006*(f*H+K*1.2)+.0012;
 vec4 a=texture2D(tx,uv+off+dir*sp);vec4 b=texture2D(tx,uv+off);vec4 c=texture2D(tx,uv+off-dir*sp);
 float al=b.a;vec3 col=vec3(a.r,b.g,c.b);
 col+=vec3(.9,.25,.1)*f*H*.06*al;
 gl_FragColor=vec4(col,al);}`;
 const sh=(t,s)=>{const o=g.createShader(t);g.shaderSource(o,s);g.compileShader(o);return o};
 const pr=g.createProgram();g.attachShader(pr,sh(g.VERTEX_SHADER,vs));g.attachShader(pr,sh(g.FRAGMENT_SHADER,fs));g.linkProgram(pr);
 if(!g.getProgramParameter(pr,g.LINK_STATUS))return;g.useProgram(pr);
 const bf=g.createBuffer();g.bindBuffer(g.ARRAY_BUFFER,bf);g.bufferData(g.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),g.STATIC_DRAW);
 const l=g.getAttribLocation(pr,'p');g.enableVertexAttribArray(l);g.vertexAttribPointer(l,2,g.FLOAT,false,0,0);
 const U=n=>g.getUniformLocation(pr,n);const uM=U('M'),uV=U('V'),uT=U('T'),uK=U('K'),uH=U('H');
 const tex=g.createTexture();const im=new Image();let ready=0;
 im.onload=()=>{g.bindTexture(g.TEXTURE_2D,tex);g.pixelStorei(g.UNPACK_PREMULTIPLY_ALPHA_WEBGL,true);g.texImage2D(g.TEXTURE_2D,0,g.RGBA,g.RGBA,g.UNSIGNED_BYTE,im);
  g.texParameteri(g.TEXTURE_2D,g.TEXTURE_MIN_FILTER,g.LINEAR);g.texParameteri(g.TEXTURE_2D,g.TEXTURE_MAG_FILTER,g.LINEAR);g.texParameteri(g.TEXTURE_2D,g.TEXTURE_WRAP_S,g.CLAMP_TO_EDGE);g.texParameteri(g.TEXTURE_2D,g.TEXTURE_WRAP_T,g.CLAMP_TO_EDGE);
  g.viewport(0,0,495,640);img.removeAttribute('id');img.style.display='none';c.id='me';img.parentNode.insertBefore(c,img);ready=1};
 im.src=window.ME_B64;
 let m={x:.5,y:.4,tx:.5,ty:.4,vx:0,vy:0,h:0,k:0};
 if(Q.get('px')){m.x=m.tx=+Q.get('px');m.y=m.ty=+Q.get('py');m.h=1}
 addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();if(!r.width)return;const nx=(e.clientX-r.left)/r.width,ny=(e.clientY-r.top)/r.height;m.vx=(nx-m.tx);m.vy=(ny-m.ty);m.tx=nx;m.ty=ny;m.h=1;m.k=Math.min(1,m.k+Math.hypot(m.vx,m.vy)*4)});
 window.__ph={kick(){m.k=1;m.h=2.2}};
 let vis=true;new IntersectionObserver(e=>vis=e[0].isIntersecting).observe(c);
 const t0=performance.now();
 (function f(){requestAnimationFrame(f);if(!ready||!vis)return;const t=(performance.now()-t0)/1000;
  m.x+=(m.tx-m.x)*.12;m.y+=(m.ty-m.y)*.12;m.vx*=.9;m.vy*=.9;m.k*=.94;if(!Q.has('shot'))m.h+=((m.tx<0||m.tx>1||m.ty<0||m.ty>1?0:.9)-m.h)*.04;
  g.clearColor(0,0,0,0);g.clear(g.COLOR_BUFFER_BIT);
  g.uniform2f(uM,m.x,m.y);g.uniform2f(uV,-m.vx*.35,-m.vy*.35);g.uniform1f(uT,t);g.uniform1f(uK,m.k);g.uniform1f(uH,Math.max(m.h,0));
  g.drawArrays(g.TRIANGLES,0,3)})();
})();
/* 3D tilt on photo */
addEventListener('pointermove',e=>{const me=$('#me');const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;
 me.style.transform=`perspective(1000px) rotateY(${x*9}deg) rotateX(${y*-5}deg)`});
/* ring cursor */
const ring=document.createElement('div');ring.className='ring';document.body.appendChild(ring);
let rx=0,ry=0,tx=0,ty=0;addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY});
(function f(){rx+=(tx-rx)*.1;ry+=(ty-ry)*.1;ring.style.transform=`translate(${rx}px,${ry}px)`;requestAnimationFrame(f)})();
/* project preview card */
const pv=document.createElement('div');pv.className='pv';document.body.appendChild(pv);
let px=0,py=0,cx=0,cy=0;
addEventListener('pointermove',e=>{px=e.clientX;py=e.clientY});
(function f(){cx+=(px-cx)*.14;cy+=(py-cy)*.14;const vx=(px-cx)*.08;
 pv.style.transform=`translate(${cx+36}px,${cy-185}px) rotate(${Math.max(-8,Math.min(8,vx))-3}deg) scale(${pv.classList.contains('on')?1:.7})`;requestAnimationFrame(f)})();
const rows=$('#rows');
if(rows&&window.PROJECTS){
 rows.addEventListener('mouseover',e=>{const h=e.target.closest('.row-h');if(!h)return;const li=h.parentElement;const i=[...rows.children].indexOf(li);const p=PROJECTS[i];if(!p)return;
  pv.className='pv on c'+(1+i%2);
  pv.innerHTML=`<span class="pc">${p.c}</span><span class="pn">${String(i+1).padStart(2,'0')}</span><div><div class="pt">${p.n}</div><div class="pg" style="margin-top:12px">${p.t.slice(0,4).map(t=>`<i>${t}</i>`).join('')}</div></div>`});
 rows.addEventListener('mouseout',e=>{if(!e.relatedTarget||!e.relatedTarget.closest||!e.relatedTarget.closest('.row-h'))pv.classList.remove('on')});
}
/* page transition (shader, see v7.js) */
let busy=0;
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a||busy)return;const id=a.getAttribute('href');const el=id==='#top'?document.body:$(id);if(!el)return;
 e.preventDefault();busy=1;
 const jump=()=>{const y=id==='#top'?0:el.getBoundingClientRect().top+scrollY;window.scrollTo({top:y,behavior:'instant'});if(window.__syncScroll)window.__syncScroll()};
 if(window.__swipe)window.__swipe(jump,()=>{busy=0});else{jump();busy=0}},true);
})();
