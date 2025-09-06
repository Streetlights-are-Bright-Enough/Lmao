// NES
let nesCanvas=document.getElementById('nes-canvas');
let nes=new JSNES({ui:null,canvas:nesCanvas});
let nesState=null;
function loadNESROM(e){const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{try{nes.loadROM(ev.target.result);nes.start();nesState=null;console.log("NES ROM loaded!");}catch(err){console.error("NES load error:",err);}};r.readAsBinaryString(f);}
function saveState(t){if(t==='nes'&&nes)nesState=nes.toJSON();}
function loadState(t){if(t==='nes'&&nesState)nes.fromJSON(nesState);}

// SNES
let snesCanvas=document.getElementById('snes-canvas');
let snes=new Snes9x({canvas:snesCanvas});
let snesState=null;
function loadSNESROM(e){const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{try{let d=new Uint8Array(ev.target.result);snes.loadROM(d);snes.run();snesState=null;console.log("SNES ROM loaded!");}catch(err){console.error("SNES load error:",err);}};r.readAsArrayBuffer(f);}
function saveStateSNES(){if(snes)snesState=snes.serialize();}
function loadStateSNES(){if(snesState)snes.deserialize(snesState);}

// GB
let gbCanvas=document.getElementById('gb-canvas');
let gb=new JSGameBoy({canvas:gbCanvas});
let gbState=null;
function loadGBROM(e){const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{try{gb.loadROM(ev.target.result);gb.start();gbState=null;console.log("GB ROM loaded!");}catch(err){console.error("GB load error:",err);}};r.readAsArrayBuffer(f);}
function saveStateGB(){if(gb)gbState=gb.saveState();}
function loadStateGB(){if(gbState)gb.loadState(gbState);}
