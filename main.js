let audioCTX;
let gainNode;
let device;

document.getElementById("start").addEventListener("click", async () => {
    if(!audioCTX) {
        audioCTX = new AudioContext
    }
    const response = await fetch("patch.export.json");
    const patcher = await response.json();
    const device = await RNBO.createDevice({ audioCTX, patcher });
    device.connect(gainNode);
    gainNode = audioCTX.createGain();
    gainNode.gain.value = 0.5;
    gainNode.connect(audioCTX.destination);
    
});