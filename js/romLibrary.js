const roms={
  nes:[
    {name:"Super Mario Bros",file:"assets/roms/nes/smb.nes"},
    {name:"Mega Man 2",file:"assets/roms/nes/mm2.nes"}
  ],
  snes:[
    {name:"Super Metroid",file:"assets/roms/snes/smetroid.smc"},
    {name:"Chrono Trigger",file:"assets/roms/snes/chrono.smc"}
  ],
  gb:[
    {name:"Pokemon Red",file:"assets/roms/gb/poke_red.gb"},
    {name:"Tetris",file:"assets/roms/gb/tetris.gb"}
  ]
};

function createROMLibrary(){
  const lib=document.getElementById('rom-library');
  lib.innerHTML="";
  Object.keys(roms).forEach(type=>{
    roms[type].forEach(r=>{
      const btn=document.createElement('div');
      btn.className='rom-item';
      btn.textContent=`[${type.toUpperCase()}] ${r.name}`;
      btn.onclick=()=>loadROMFromLibrary(type,r.file);
      lib.appendChild(btn);
    });
  });
}

function loadROMFromLibrary(type,url){
  fetch(url).then(r=>r.arrayBuffer()).then(buf=>{
    const file=new File([buf],url.split("/").pop());
    if(type==='nes') loadNESROM({target:{files:[file]}});
    if(type==='snes') loadSNESROM({target:{files:[file]}});
    if(type==='gb') loadGBROM({target:{files:[file]}});
  });
}

// initialize
document.addEventListener('DOMContentLoaded',createROMLibrary);
