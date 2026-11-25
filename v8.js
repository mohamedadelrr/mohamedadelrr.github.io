(function(){
var $=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return[].slice.call((r||document).querySelectorAll(s))};
var G=window.GALLERY||[],box=$('#gal'),sec=$('#gallery');
var CATS=[['p','Projects','المشاريع','Built, shown, presented','بُني وعُرض وقُدّم'],['a','Awards','التكريمات','Certificates and honors','شهادات وتكريمات'],['e','Events','الفعاليات','On stage and in the lab','على المسرح وفي المعمل'],['t','Teaching','التدريس','Technological Child University','جامعة الطفل التكنولوجية']];
var pad=function(n){return n<10?'0'+n:''+n};
if(box&&G.length){
box.className='gal-rows';
box.innerHTML=CATS.map(function(c,ci){var L=G.filter(function(g){return g.c==c[0]});
return '<div class="grow"><div class="grow-h"><span class="gnum">'+pad(ci+1)+'</span><div><h3>'+(window.AR?c[2]:c[1])+'</h3><p class="mono">'+(window.AR?c[4]:c[3])+' &middot; '+L.length+'</p></div><div class="garr"><button type="button" class="gprv" aria-label="'+(window.AR?'السابق':'Previous')+'">&larr;</button><button type="button" class="gnxt" aria-label="'+(window.AR?'التالي':'Next')+'">&rarr;</button></div></div><div class="gstrip" tabindex="0">'+L.map(function(g,i){var t=window.AR?g.ar:g.en;return '<figure class="gfr" style="--r:'+(g.w/g.h).toFixed(3)+'"><div class="gph"><img src="'+g.s+'" srcset="'+g.s.replace(".webp","-s.webp")+' 720w,'+g.s+' 1600w" sizes="(max-width:700px) 80vw,520px" width="'+g.w+'" height="'+g.h+'" alt="'+t+'" loading="lazy" decoding="async" draggable="false" data-lb></div><figcaption class="mono"><b>'+pad(i+1)+'</b>/'+pad(L.length)+' &nbsp;'+t+'</figcaption></figure>'}).join('')+'</div></div>'}).join('');
$$('.grow',box).forEach(function(r){var st=$('.gstrip',r),dx=0,sx=0,sl=0,drag=false,moved=false;
function by(d){st.scrollBy({left:d*Math.min(st.clientWidth*.8,700)*(window.AR?-1:1),behavior:'smooth'})}
$('.gprv',r).onclick=function(){by(-1)};$('.gnxt',r).onclick=function(){by(1)};
st.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;drag=true;moved=false;sx=e.clientX;sl=st.scrollLeft;st.classList.add('dg')});
addEventListener('pointermove',function(e){if(!drag)return;dx=e.clientX-sx;if(Math.abs(dx)>5)moved=true;st.scrollLeft=sl-dx});
addEventListener('pointerup',function(){if(!drag)return;drag=false;st.classList.remove('dg')});
st.addEventListener('click',function(e){if(moved){e.stopPropagation();e.preventDefault();moved=false}},true)});
}
else if(sec){sec.style.display='none';$$('a[href="#gallery"]').forEach(function(a){a.style.display='none'})}
else if(sec){sec.style.display='none';$$('a[href="#gallery"]').forEach(function(a){a.style.display='none'})}
var lb=document.createElement('div');lb.className='lb';lb.innerHTML='<p class="lb-t"></p><button class="lb-x" aria-label="Close">&times;</button><button class="lb-p" aria-label="Previous">&#8249;</button><img alt=""><button class="lb-n" aria-label="Next">&#8250;</button><span class="mono lb-c"></span>';document.body.appendChild(lb);
var im=$('img',lb),cc=$('.lb-c',lb),tt=$('.lb-t',lb),set=[],ix=0;
function show(){im.src=set[ix].currentSrc?set[ix].src:set[ix].src;im.alt=set[ix].alt;tt.textContent=set[ix].alt;cc.textContent=(ix+1)+' / '+set.length;lb.classList.toggle('one',set.length<2)}
function open(el){var g=el.closest('.pim,.gal-grid,.gstrip');set=$$('img[data-lb]',g||document.body).filter(function(i){return !i.closest('.hide')});if(!g)set=[el];ix=Math.max(0,set.indexOf(el));show();lb.classList.add('on');document.documentElement.classList.add('lbo')}
function close(){lb.classList.remove('on');document.documentElement.classList.remove('lbo')}
var tx=null;lb.addEventListener('touchstart',function(e){tx=e.touches[0].clientX},{passive:true});lb.addEventListener('touchend',function(e){if(tx===null)return;var d=e.changedTouches[0].clientX-tx;tx=null;if(Math.abs(d)>50)step((d<0?1:-1)*(window.AR?-1:1))});
function step(d){ix=(ix+d+set.length)%set.length;show()}
document.addEventListener('click',function(e){var t=e.target;if(t.matches&&t.matches('img[data-lb]'))return open(t);if(t===lb||t.classList.contains('lb-x'))close();else if(t.classList.contains('lb-p'))step(window.AR?1:-1);else if(t.classList.contains('lb-n'))step(window.AR?-1:1)});
addEventListener('keydown',function(e){if(!lb.classList.contains('on'))return;if(e.key==='Escape')close();if(e.key==='ArrowRight')step(window.AR?-1:1);if(e.key==='ArrowLeft')step(window.AR?1:-1)});
})();
