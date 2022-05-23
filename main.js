song1 = "";
song2 = "";

song1_status = "";
song2_status = "";

 score_left_wrist = 0;
 score_right_wrist = 0;

 right_wrist_x = 0;
 right_wrist_y = 0;
 left_wrist_x = 0;
 left_wrist_y = 0;

function preload()
{
    song = loadSound("music.mp3");
    song = loadSound("Arcade.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotposes);
}
function modelLoaded()
{
   console.log("PoseNet Is Initialized");
}

function gotposes(results)
{
    if(results.length > 0)
    {
        console.log(results);
        score_right_wrist = results[0].pose.keypoints[10].score;
        score_left_wrist = results[0].pose.keypoints[9].score;
        console.log("score_right_wrist ="+score_right_wrist+"score_left_wrist ="+score_left_wrist);

        right_wrist_x = results[0].pose.right_wrist.x;
        right_wrist_y = results[0].pose.right_wrist.y;
        console.log("right_wrist_x ="+right_wrist_x+"right_wrist_y ="+right_wrist_y);

        left_wrist_x = results[0].pose.left_wrist.x;
       left_wrist_y = results[0].pose.left_wrist.y;
        console.log("left_wrist_x ="+left_wrist_x+"left_wrist_y ="+left_wrist_y);
    }
}

function draw()
{
    image(video,0,0,600,500);

    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    fill("#ff0000");
    stroke("#ff0000");

    if(score_right_wrist > 0.2)
    {
        circle(right_wrist_x, right_wrist_y, 20);

        song2.stop();
        if(song1_status == false)
        {
            song1.play();
            document.getElementById("song").innerHTML = "playing unstoppable";
        }
    }
    if(score_left_wrist > 0.2)
    {
        circle(left_wrist_x, left_wrist_y, 20);

        song1.stop();
        if(song2_status == false)
        {
            song2.play();
            document.getElementById("song").innerHTML = "playing arcade";
        }
    }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);

}