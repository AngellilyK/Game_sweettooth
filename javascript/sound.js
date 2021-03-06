function sound(src){
    const audioElement = document.createElement('audio');
    audioElement.src=src;
    document.body.prepend(audioElement);
}

sound("sounds/spliced.mp3");
sound("sounds/missed.mp3");
sound("sounds/boom.mp3");

let audio=document.querySelectorAll("audio");

const audioElement = document.createElement('audio');
audioElement.src="sounds/music.mp3";
audioElement.loop="true";

document.body.prepend(audioElement);

const playButton = document.querySelector('.btn-sound');

playButton.addEventListener('click', function() {
    // play or pause track depending on state
    if (this.dataset.playing === 'false') {
        audioElement.play();
        this.dataset.playing = 'true';
    } else if (this.dataset.playing === 'true') {
        audioElement.pause();
        this.dataset.playing = 'false';
    }
}, false);




