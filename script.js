const root = document.documentElement;
const themeBtn = document.getElementById('themeToggle');
const syncTheme = () => themeBtn.setAttribute('aria-label', root.dataset.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
syncTheme();
themeBtn.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem('vinit-theme', next); } catch (e) {}
  syncTheme();
});
const menuBtn = document.getElementById('menuToggle');
const menu = document.getElementById('mobileNav');
const closeMenu = () => { menu.hidden = true; menuBtn.setAttribute('aria-expanded','false'); menuBtn.setAttribute('aria-label','Open navigation'); };
menuBtn.addEventListener('click', () => {
  const willOpen = menu.hidden;
  menu.hidden = !willOpen;
  menuBtn.setAttribute('aria-expanded', String(willOpen));
  menuBtn.setAttribute('aria-label', willOpen ? 'Close navigation' : 'Open navigation');
});
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') { if (!menu.hidden) {closeMenu(); menuBtn.focus();} } });
window.matchMedia('(min-width: 691px)').addEventListener('change', e => { if (e.matches) closeMenu(); });
const cards = Array.from(document.querySelectorAll('.project-card'));
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  const selected = button.dataset.filter;
  document.querySelectorAll('.filter').forEach(filter => { const active = filter === button; filter.classList.toggle('active', active); filter.setAttribute('aria-pressed', String(active)); });
  cards.forEach(card => { card.hidden = selected !== 'all' && !card.dataset.categories.split(' ').includes(selected); });
}));
const animated = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: .06, rootMargin: '0px 0px 55px 0px' });
  animated.forEach(el => observer.observe(el));
} else animated.forEach(el => el.classList.add('visible'));
document.getElementById('year').textContent = new Date().getFullYear();

// The discipline buttons expose the related real projects instead of creating separate vague portfolios.
document.querySelectorAll('[data-go-filter]').forEach(button=>button.addEventListener('click',()=>{
  const filter=document.querySelector('.filter[data-filter="'+button.dataset.goFilter+'"]');
  if(filter)filter.click();
  document.getElementById('work').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
}));

// Animate career titles only when visitors have not requested reduced motion.
const roleEl=document.getElementById('rotatingRole');
if(roleEl && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  const roles=['Business Analysis','Data Analytics','Software Engineering'];
  let roleIndex=0;
  setInterval(()=>{
    if(document.hidden || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    roleEl.classList.add('is-changing');
    setTimeout(()=>{roleIndex=(roleIndex+1)%roles.length;roleEl.textContent=roles[roleIndex];roleEl.classList.remove('is-changing');},230);
  },3200);
}


// Highlight the current section in the navigation without affecting keyboard use.
if ('IntersectionObserver' in window) {
  const navLinks = [...document.querySelectorAll('.desktop-nav a[href^="#"]')];
  const bySection = new Map(navLinks.map(a => [a.getAttribute('href').slice(1), a]));
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const link = bySection.get(entry.target.id);
      if (link && entry.isIntersecting) {
        navLinks.forEach(a => { a.classList.remove('is-active'); a.removeAttribute('aria-current'); });
        link.classList.add('is-active'); link.setAttribute('aria-current','location');
      }
    });
  }, {rootMargin:'-25% 0px -60% 0px', threshold:0});
  bySection.forEach((_, id) => {const section=document.getElementById(id);if(section)navObserver.observe(section)});
}

// One accessible gallery per project. Arrows, dots, keyboard and touch swipe.
(() => {
 const data=JSON.parse(document.getElementById('galleryData').textContent);
 const dialog=document.getElementById('projectGallery');
 const heading=document.getElementById('galleryHeading'), image=document.getElementById('galleryImage');
 const caption=document.getElementById('galleryCaption'), counter=document.getElementById('galleryCounter'), dots=document.getElementById('galleryDots');
 const prev=document.getElementById('galleryPrev'), next=document.getElementById('galleryNext');
 const close=document.getElementById('galleryClose');
 const names={vigil:'VigilAI',crime:'London Crime Analysis',iot:'SmartFridge IoT',meditrack:'MediTrack',journey:'Green Journey Advisor',mobile:'Mobile Phone Selection'};
 let active=null,index=0,origin=null,touchX=null;
 function render(){
   if(!active)return;
   const slides=data[active], slide=slides[index];
   image.src=slide.src;image.alt=slide.alt;caption.textContent=slide.caption;
   counter.textContent=`${index+1} / ${slides.length}`;
   image.classList.remove('slide-enter');void image.offsetWidth;
   if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)image.classList.add('slide-enter');
   dots.replaceChildren();
   slides.forEach((_,i)=>{const b=document.createElement('button');b.type='button';b.className=i===index?'is-current':'';b.setAttribute('aria-label',`Go to screenshot ${i+1}`);b.setAttribute('aria-current',String(i===index));b.addEventListener('click',()=>{index=i;render()});dots.append(b)});
   prev.disabled=index===0; next.disabled=index===slides.length-1;
 }
 function open(key,trigger){if(!data[key]||!data[key].length)return;origin=trigger;active=key;index=0;heading.textContent=names[key]+' · Project screenshots';render();dialog.showModal();close.focus()}
 document.querySelectorAll('[data-gallery]').forEach(b=>b.addEventListener('click',()=>open(b.dataset.gallery,b)));
 prev.addEventListener('click',()=>{if(index>0){index--;render()}});
 next.addEventListener('click',()=>{if(active&&index<data[active].length-1){index++;render()}});
 close.addEventListener('click',()=>dialog.close());
 dialog.addEventListener('close',()=>{active=null;image.removeAttribute('src');if(origin && origin.isConnected)origin.focus();origin=null});
 dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
 dialog.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();next.click()}if(e.key==='ArrowLeft'){e.preventDefault();prev.click()}});
 image.addEventListener('touchstart',e=>{touchX=e.changedTouches[0].screenX},{passive:true});
 image.addEventListener('touchend',e=>{if(touchX===null)return;const delta=e.changedTouches[0].screenX-touchX;touchX=null;if(Math.abs(delta)>45){(delta<0?next:prev).click()}},{passive:true});
})();

// Keep the experience timeline compact: at most one expanded position at a time.
const experienceItems = [...document.querySelectorAll('.experience-detail')];
experienceItems.forEach(item => item.addEventListener('toggle', () => {
  if (!item.open) return;
  experienceItems.forEach(other => {if (other !== item && other.open) other.open = false;});
}));
