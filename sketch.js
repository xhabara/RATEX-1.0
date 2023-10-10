let mySound1, mySound2, mySound3, mySound4, mySound5, mySound6;
let rateSlider1,
  rateSlider2,
  rateSlider3,
  rateSlider4,
  rateSlider5,
  rateSlider6;
let mic;
let fft;
let soundDelay;
let delaySlider;
let micThreshold = 0.05;
let perlinNoiseActive = false;
let xoff = 0;
let perlinButton;

function preload() {
  mySound1 = loadSound("sample alkisah-010.mp3");
  mySound2 = loadSound("Shout - Shabara Samples5.wav");
  mySound3 = loadSound("Vowels - Shabara Samples 02.wav");
  mySound4 = loadSound("Texture - Shabara Samples 048.wav");
  mySound5 = loadSound("Falsetto - Shabara Samples 04.wav");
  mySound6 = loadSound("New_Project (16).mp3");
}

function setup() {
  createCanvas(300, 600);
  background(35);

  mic = new p5.AudioIn();
  mic.start();

  fft = new p5.FFT();
  fft.setInput(mic);

  // Initialize delay effect
  soundDelay = new p5.Delay();

  // Create the original delay slider
  delaySlider = createSlider(0, 1, 0.5, 0.01);
  delaySlider.position(20, 20);
  delaySlider.id("delaySlider");
  delaySlider.style("width", "250px");

  // Create a slider for xoff increment
  xoffSlider = createSlider(0.001, 0.1, 0.01, 0.001);
  xoffSlider.position(20, 400);
  xoffSlider.id("xoffSlider");
  xoffSlider.style("width", "250px");
  xoffSlider.class("xoffStyle");

  rateSlider1 = createSlider(0.1, 3, 1, 0.1);
  rateSlider1.position(20, 50);
  rateSlider1.id("rateSlider1");
  rateSlider1.style("width", "250px");

  rateSlider2 = createSlider(0.1, 3, 1, 0.1);
  rateSlider2.position(20, 95);
  rateSlider2.id("rateSlider2");
  rateSlider2.style("width", "250px");

  rateSlider3 = createSlider(0.1, 3, 1, 0.1);
  rateSlider3.position(20, 140);
  rateSlider3.id("rateSlider3");
  rateSlider3.style("width", "250px");

  rateSlider4 = createSlider(0.1, 3, 1, 0.1);
  rateSlider4.position(20, 185);
  rateSlider4.id("rateSlider4");
  rateSlider4.style("width", "250px");

  rateSlider5 = createSlider(0.1, 3, 1, 0.1);
  rateSlider5.position(20, 230);
  rateSlider5.id("rateSlider5");
  rateSlider5.style("width", "250px");

  rateSlider6 = createSlider(0.1, 3, 1, 0.1);
  rateSlider6.position(20, 275);
  rateSlider6.id("rateSlider6");
  rateSlider6.style("width", "250px");

  volumeSlider1 = createSlider(0, 1, 0.5, 0.01);
  volumeSlider1.position(20, 70);
  volumeSlider1.id("volumeSlider1");
  volumeSlider1.style("width", "250px");
  volumeSlider1.class("volumeSlider");

  volumeSlider2 = createSlider(0, 1, 0.5, 0.01);
  volumeSlider2.position(20, 115);
  volumeSlider2.id("volumeSlider2");
  volumeSlider2.style("width", "250px");
  volumeSlider2.class("volumeSlider");

  volumeSlider3 = createSlider(0, 1, 0.5, 0.01);
  volumeSlider3.position(20, 160);
  volumeSlider3.id("volumeSlider3");
  volumeSlider3.style("width", "250px");
  volumeSlider3.class("volumeSlider");

  volumeSlider4 = createSlider(0, 1, 0.5, 0.01);
  volumeSlider4.position(20, 205);
  volumeSlider4.id("volumeSlider4");
  volumeSlider4.style("width", "250px");
  volumeSlider4.class("volumeSlider");

  volumeSlider5 = createSlider(0, 1, 0.5, 0.01);
  volumeSlider5.position(20, 250);
  volumeSlider5.id("volumeSlider5");
  volumeSlider5.style("width", "250px");
  volumeSlider5.class("volumeSlider");

  volumeSlider6 = createSlider(0, 1, 0.5, 0.01);
  volumeSlider6.position(20, 295);
  volumeSlider6.id("volumeSlider6");
  volumeSlider6.style("width", "250px");
  volumeSlider6.class("volumeSlider");

  mySound1.setVolume(0.5);
  mySound2.setVolume(0.5);
  mySound3.setVolume(0.5);
  mySound4.setVolume(0.5);
  mySound5.setVolume(0.5);
  mySound6.setVolume(0.5);

  perlinButton = createButton("AUTO MODE");
  perlinButton.position(20, 355);
  perlinButton.mousePressed(togglePerlinNoise);
  perlinButton.style("background-color", "#FF9800");
  perlinButton.style("color", "#000000");
  perlinButton.style("padding", "3px");
  perlinButton.style("border-radius", "8px");
  perlinButton.style("font-size", "10px");
}

function draw() {
  let micLevel = mic.getLevel();
  let spectrum = fft.analyze();
  let dominantFrequency = fft.getCentroid();
  let delayTime = delaySlider.value(); // Get the delay time from the slider

  if (micLevel > micThreshold) {
    // Get manual rates from the sliders
    let manualRate1 = rateSlider1.value();
    let manualRate2 = rateSlider2.value();
    let manualRate3 = rateSlider3.value();
    let manualRate4 = rateSlider4.value();
    let manualRate5 = rateSlider5.value();
    let manualRate6 = rateSlider6.value();

    let volume1 = volumeSlider1.value();
    let volume2 = volumeSlider2.value();
    let volume3 = volumeSlider3.value();
    let volume4 = volumeSlider4.value();
    let volume5 = volumeSlider5.value();
    let volume6 = volumeSlider6.value();

    // Map dominant frequency to rate
    let mappedRate = map(dominantFrequency, 0, 8000, 0.1, 1.5);

    // Applying the delay effect
    soundDelay.process(mySound1, delayTime, 0.7, 2300);
    soundDelay.process(mySound2, delayTime, 0.7, 2300);
    soundDelay.process(mySound3, delayTime, 0.7, 2300);
    soundDelay.process(mySound4, delayTime, 0.7, 2300);
    soundDelay.process(mySound5, delayTime, 0.7, 2300);
    soundDelay.process(mySound6, delayTime, 0.7, 2300);

    // Apply the mixed rate
    mySound1.rate(mappedRate * manualRate1);
    mySound2.rate(mappedRate * manualRate2);
    mySound3.rate(mappedRate * manualRate3);
    mySound4.rate(mappedRate * manualRate4);
    mySound5.rate(mappedRate * manualRate5);
    mySound6.rate(mappedRate * manualRate6);

    mySound1.setVolume(volume1);
    mySound2.setVolume(volume2);
    mySound3.setVolume(volume3);
    mySound4.setVolume(volume4);
    mySound5.setVolume(volume5);
    mySound6.setVolume(volume6);

    if (!mySound1.isPlaying()) mySound1.loop();
    if (!mySound2.isPlaying()) mySound2.loop();
    if (!mySound3.isPlaying()) mySound3.loop();
    if (!mySound4.isPlaying()) mySound4.loop();
    if (!mySound5.isPlaying()) mySound5.loop();
    if (!mySound6.isPlaying()) mySound6.loop();
  } else {
    mySound1.stop();
    mySound2.stop();
    mySound3.stop();
    mySound4.stop();
    mySound5.stop();
    mySound6.stop();
  }
  if (perlinNoiseActive) {
    let xoffIncrement = xoffSlider.value();
    // Update rate sliders using Perlin noise
    rateSlider1.value(map(noise(xoff), 0, 1, 0.1, 3));
    rateSlider2.value(map(noise(xoff + 1), 0, 1, 0.1, 3));
    rateSlider3.value(map(noise(xoff + 2), 0, 1, 0.1, 3));
    rateSlider4.value(map(noise(xoff + 3), 0, 1, 0.1, 3));
    rateSlider5.value(map(noise(xoff + 4), 0, 1, 0.1, 3));
    rateSlider6.value(map(noise(xoff + 5), 0, 1, 0.1, 3));

    // Update volume sliders using Perlin noise
    volumeSlider1.value(noise(xoff + 6));
    volumeSlider2.value(noise(xoff + 7));
    volumeSlider3.value(noise(xoff + 8));
    volumeSlider4.value(noise(xoff + 9));
    volumeSlider5.value(noise(xoff + 10));
    volumeSlider6.value(noise(xoff + 11));

    // Update the delay slider with Perlin magic
    delaySlider.value(map(noise(xoff + 12), 0, 1, 0, 1));

    xoff += xoffIncrement; // Increment xoff by the value from the slider
  }
}

function togglePerlinNoise() {
  perlinNoiseActive = !perlinNoiseActive;
  if (perlinNoiseActive) {
    perlinButton.style("background-color", "#FF5733"); // Set background to red when ON
    perlinButton.html("AUTO MODE IS ON");
  } else {
    perlinButton.style("background-color", "#454946"); // Set background to green when OFF
    perlinButton.html("AUTO MODE IS OFF");
  }
}
