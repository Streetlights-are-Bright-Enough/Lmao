let nesCanvas = document.getElementById('nes-canvas');
let nes = new JSNES({ ui: null, canvas: nesCanvas });
let nesState = null;

function loadNESROM(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      nes.loadROM(e.target.result);
      nes.start();
      nesState = null;
      console.log("NES ROM loaded!");
    } catch(err) {
      console.error("NES load error:", err);
    }
  };
  reader.readAsBinaryString(file);
}

function saveNESState() {
  if (nes) {
    nesState = nes.toJSON();
    console.log("NES state saved!");
  }
}

function loadNESState() {
  if (nes && nesState) {
    nes.fromJSON(nesState);
    console.log("NES state loaded!");
  }
}

// Keyboard mapping
document.addEventListener('keydown', e => {
  switch(e.key){
    case 'ArrowUp': nes.buttonDown(1, JSNES.Controller.BUTTON_UP); break;
    case 'ArrowDown': nes.buttonDown(1, JSNES.Controller.BUTTON_DOWN); break;
    case 'ArrowLeft': nes.buttonDown(1, JSNES.Controller.BUTTON_LEFT); break;
    case 'ArrowRight': nes.buttonDown(1, JSNES.Controller.BUTTON_RIGHT); break;
    case 'z': nes.buttonDown(1, JSNES.Controller.BUTTON_A); break;
    case 'x': nes.buttonDown(1, JSNES.Controller.BUTTON_B); break;
    case 'Enter': nes.buttonDown(1, JSNES.Controller.BUTTON_START); break;
    case 'Shift': nes.buttonDown(1, JSNES.Controller.BUTTON_SELECT); break;
  }
});

document.addEventListener('keyup', e => {
  switch(e.key){
    case 'ArrowUp': nes.buttonUp(1, JSNES.Controller.BUTTON_UP); break;
    case 'ArrowDown': nes.buttonUp(1, JSNES.Controller.BUTTON_DOWN); break;
    case 'ArrowLeft': nes.buttonUp(1, JSNES.Controller.BUTTON_LEFT); break;
    case 'ArrowRight': nes.buttonUp(1, JSNES.Controller.BUTTON_RIGHT); break;
    case 'z': nes.buttonUp(1, JSNES.Controller.BUTTON_A); break;
    case 'x': nes.buttonUp(1, JSNES.Controller.BUTTON_B); break;
    case 'Enter': nes.buttonUp(1, JSNES.Controller.BUTTON_START); break;
    case 'Shift': nes.buttonUp(1, JSNES.Controller.BUTTON_SELECT); break;
  }
});
