const keyMap={'ArrowUp':'Up','ArrowDown':'Down','ArrowLeft':'Left','ArrowRight':'Right','z':'A','x':'B','Enter':'Start','Shift':'Select'};
document.addEventListener('keydown',e=>{
  const key=keyMap[e.key];if(!key) return;
  document.querySelectorAll('.kb-key').forEach(k=>{if(k.textContent===key) k.style.background='#0f0', k.style.color='#000';});
});
document.addEventListener('keyup',e=>{
  const key=keyMap[e.key];if(!key) return;
  document.querySelectorAll('.kb-key').forEach(k=>{if(k.textContent===key) k.style.background='transparent', k.style.color='#0f0';});
});
