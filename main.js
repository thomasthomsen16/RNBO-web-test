let audioCTX;
let device;

document.getElementById("start").addEventListener("click", async () => {
    if (!audioCTX) {
        audioCTX = new AudioContext();
        await audioCTX.resume();

        const response = await fetch("patch.export.json");
        const patcher = await response.json();

        device = await RNBO.createDevice({
            context: audioCTX, // ✅ CORRECT for 1.3.4
            patcher: patcher
        });

        const gainNode = audioCTX.createGain();
        gainNode.gain.value = 0.5; // Set the gain value to 0.5
        device.node.connect(gainNode); // Connect the device node to the gain node
        gainNode.connect(audioCTX.destination); // Connect the gain node to the audio context destination
    }
});


