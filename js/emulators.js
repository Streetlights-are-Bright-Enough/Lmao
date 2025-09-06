// NES
let nes=new JSNES({'ui':null,'canvas':document.getElementById('nes-canvas')});
let nesState=null;
function loadNESROM(event){const reader=new FileReader();reader.onload=e=>{nes.loadROM(e.target.result);nes.start();nesState=null;};reader.readAsBinaryString(event.target.files[0]);}

// SNES
let snes=new Snes9x({canvas:document.getElementById('snes-canvas')});
let snesState=null;
function loadSNESROM(event){const reader=new FileReader();reader.onload=e=>{snes.loadROM(new Uint8Array(e.target.result));snes.run();snesState=null;};reader.readAsArrayBuffer(event.target.files[0]);}

// GB
let gb=new JSGameBoy({canvas:document.getElementById('gb-canvas')});
let gbState=null;
function loadGBROM(event){const reader=new FileReader();reader.onload=e=>{gb.loadROM(e.target.result);gb.start();gbState=null;};reader.readAsArrayBuffer(event.target.files[0]);}

// Save/Load states
function saveState(type){
  if(type==='nes' && nes) nesState=nes.toJSON();
  if(type==='snes' && snes) snesState=snes.serialize();
  if(type==='gb' && gb) gbState=gb.saveState();
}
function loadState(type){
  if(type==='nes' && nesState) nes.fromJSON(nesState);
  if(type==='snes' && snesState) snes.deserialize(snesState);
  if(type==='gb' && gbState) gb.loadState(gbState);
}
