const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

const widthMult = 1;
const heightMult = 1;

function getVideo(){
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(localMediaStream => {
            console.log(localMediaStream);
            //video.scr = window.URL.createObjectURL(localMediaStream);
            video.srcObject = localMediaStream;
            video.play();
        })
        .catch(err => {
            console.log('OH NOOO!!!', err);
        });
}



function paintToCanvas(){
    const width = video.videoWidth*widthMult;
    const height = video.videoHeight*heightMult;
    canvas.width = width;
    canvas.height = height;

    //console.log(width, height);

    //setInterval(()=>{ctx.drawImage(video, 0, 0, width, height);}, 16);

    
    //Return the timer increase we ever need it
    return  setInterval(()=>{
        ctx.drawImage(video, 0, 0, width, height, );

        //get pixels from the canvas
        let pixels = ctx.getImageData(0, 0,width, height);
        
        

        //Red effect
        // pixels = redEffect(pixels);
    

        // pixels = rgbSplit(pixels);
        // ctx.globalAlpha = 0.1;

        // pixels = rbSplit(pixels);

        //GreenScreen
        // pixels = greenScren(pixels);

        //Put the pixels back!
        ctx.putImageData(pixels, 0, 0);
    }, 16);
    
}

function redEffect(pixels){
    for(let i = 0; i < pixels.data.length; i += 4){
        pixels.data[i] = pixels.data[i] + 100; //r
        pixels.data[i + 1] = pixels.data[i + 1] - 50; //g
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5; //b
    }
    return pixels;
}

function rgbSplit(pixels){
    for(let i = 0; i < pixels.data.length; i += 4){
        pixels.data[i - 150] = pixels.data[i + 0]; //r
        pixels.data[i + 100] = pixels.data[i + 1]; //g
        pixels.data[i - 150] = pixels.data[i + 2]; //b
    }
    return pixels;
}
function rbSplit(pixels){
    for(let i = 0; i < pixels.data.length; i += 4){
        pixels.data[i ] = pixels.data[i + 1]; //g
        pixels.data[i - 20] = pixels.data[i + 0]; //r
        pixels.data[i + 20] = pixels.data[i + 2]; //b
    }
    return pixels;
}

function greenScren(pixels){
    const levels = {};

    document.querySelectorAll('.rgb input')
        .forEach((input) => {
            levels[input.name] = input.value;
        });

    for(let i = 0; i < pixels.data.length; i += 4){
        red = pixels.data[i]; //r
        green = pixels.data[i + 1]; //g
        blue = pixels.data[i + 2]; //b
        alpha = pixels.data[i + 3];

        if(red >= levels.rmin
            && green >= levels.gmin
            && blue >= levels.bmin
            && red <= levels.rmax
            && green <= levels.gmax
            && blue <= levels.bmax){
                pixels.data[i + 3] = 0;
            }
    }
    return pixels;
}



function takePhoto(){
    //play the song
    snap.currentTime = 0;
    snap.play();

    //take the data out of canvas
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', "handsome");
    link.textContent = 'Download Image';
    link.innerHTML = `<img src="${data}" alt="Handsome Man" />`
    strip.insertBefore(link, strip.firstChild)
}

getVideo();

video.addEventListener('canplay', paintToCanvas);

