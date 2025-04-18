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

        // Create a gain node and set the gain value
        const gainNode = audioCTX.createGain();
        gainNode.gain.value = 0.5; // Set the gain value to 0.5


        // Create a delay node and feedback node
        const delayNode = audioCTX.createDelay();
        delayNode.delayTime.value = 100; // Set the delay time to 0.5 seconds
        const feedbackNode = audioCTX.createGain();
        feedbackNode.gain.value = 0.5; // Set the feedback gain to 0.5
        // Connect the delay node to the feedback node
        delayNode.connect(feedbackNode);
        feedbackNode.connect(delayNode); 
        delayNode.connect(gainNode); // Connect the delay node to the gain node

        device.node.connect(gainNode); // Connect the device node to the gain node
        device.node.connect(delayNode); // Connect the device node to the delay node
        gainNode.connect(audioCTX.destination); // Connect the gain node to the audio context destination
    }
});

document.getElementById("play").addEventListener("click", () => { 
    const trig = device.parametersById.get("trig");
    trig.value=1;
    setTimeout(() => {
        trig.value=0;
    }, 20);
})
