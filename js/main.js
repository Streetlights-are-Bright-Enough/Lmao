document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.fade-in');
  elements.forEach((el,i)=>el.style.animationDelay=`${i*0.5}s`);
});

const konami=[38,38,40,40,37,39,37,39,66,65,32,13];
let inputSeq=[];
document.addEventListener('keydown',e=>{
  inputSeq.push(e.keyCode);
  if(inputSeq.length>konami.length) inputSeq.shift();
  if(JSON.stringify(inputSeq)===JSON.stringify(konami)){
    let pwd=prompt("Enter the password:");
    if(pwd && pwd.toLowerCase()==="joshua"){triggerHUD();}
    inputSeq=[];
  }
});

function triggerHUD(){
  document.documentElement.style.setProperty('--bg','#000');
  document.documentElement.style.setProperty('--fg','#0f0');
  document.querySelector('img').style.display='none';
  document.getElementById('bio').style.display='none';
  document.querySelector('h1').textContent="Log-Horizon HUD";
  document.getElementById('hud').style.display='block';
  loadPanelPositions();
  const nesPanel=document.getElementById('nes-panel');
  if(nesPanel) nesPanel.style.display='flex';
}

const SNAP_DISTANCE=20;
function savePanelPositions(){
  let panels={};
  document.querySelectorAll('.hud-panel').forEach(p=>{
    panels[p.id]={left:p.offsetLeft,top:p.offsetTop,width:p.offsetWidth,height:p.offsetHeight};
  });
  localStorage.setItem('panelPositions',JSON.stringify(panels));
}
function loadPanelPositions(){
  let panels=JSON.parse(localStorage.getItem('panelPositions')||"{}");
  document.querySelectorAll('.hud-panel').forEach(p=>{
    if(panels[p.id]){
      p.style.left=panels[p.id].left+'px';
      p.style.top=panels[p.id].top+'px';
      p.style.width=panels[p.id].width+'px';
      p.style.height=panels[p.id].height+'px';
    }
  });
}

document.querySelectorAll('.hud-panel').forEach(panel=>{
  let offsetX,offsetY,dragging=false;
  panel.addEventListener('mousedown',e=>{
    dragging=true;
    offsetX=e.clientX-panel.offsetLeft;
    offsetY=e.clientY-panel.offsetTop;
    panel.style.zIndex=1000;
  });
  window.addEventListener('mousemove',e=>{
    if(dragging){
      let newX=e.clientX-offsetX;
      let newY=e.clientY-offsetY;
      if(Math.abs(newX)<SNAP_DISTANCE) newX=0;
      if(Math.abs(newY)<SNAP_DISTANCE) newY=0;
      if(Math.abs(window.innerWidth-(newX+panel.offsetWidth))<SNAP_DISTANCE) newX=window.innerWidth-panel.offsetWidth;
      if(Math.abs(window.innerHeight-(newY+panel.offsetHeight))<SNAP_DISTANCE) newY=window.innerHeight-panel.offsetHeight;
      panel.style.left=newX+'px';
      panel.style.top=newY+'px';
    }
  });
  window.addEventListener('mouseup',()=>{dragging=false;panel.style.zIndex=''; savePanelPositions();});
});