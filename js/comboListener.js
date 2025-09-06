// js/comboListener.js
export function initComboListener(games) {
    let inputBuffer = [];

    window.addEventListener('keydown', e => {
        inputBuffer.push(e.key);
        const maxLength = Math.max(...games.map(g => g.combo.length));
        if(inputBuffer.length > maxLength) inputBuffer.shift();

        games.forEach(game => {
            if(inputBuffer.length >= game.combo.length &&
               game.combo.every((k,i)=>inputBuffer[inputBuffer.length - game.combo.length + i] === k)){
                game.action();
                inputBuffer = []; // reset after success
            }
        });
    });
}
