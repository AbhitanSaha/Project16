
Webcam.set({ width:350, height:300, image_format : 'png', png_quality:90 });
camera = document.getElementById("camera");
 Webcam.attach('#camera');
function take_snapshot(){
Webcam.snap(function(data_uri){
document.getElementById("result").innerHTML='<img id="captured_img" src="'+data_uri+'"/>';
})
}
console.log('ml5.version;', ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/C7o9B91Eq/model.json',modelLoaded);
function modelLoaded(){
console.log("Model")
}
function speak(){
    var synth=window.speechSynthesis;
    speak_data_1="The first prediction is"+prediction_1;
    speak_data_2="Second prediction is"+prediction_2;
    var utterThis= new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis);
}
function identify(){
img=document.getElementById('captured_img');
classifier.classify(img , gotResult);
}
function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emoji_name_1").innerHTML=results[0].label;
        document.getElementById("result_emoji_name_2").innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        speak();
    }
    if(results[0].label=="up"){
        document.getElementById("update_emoji_1").innerHTML="&#9758;";
    }
    if(results[0].label=="left"){
        document.getElementById("update_emoji_1").innerHTML="&#9756;";
    }
    if(results[0].label=="down"){
        document.getElementById("update_emoji_1").innerHTML="&#9759;";
    }
    if(results[0].label=="right"){
        document.getElementById("update_emoji_1").innerHTML="&#9757;";
    }
    if(results[1].label=="up"){
        document.getElementById("update_emoji_2").innerHTML="&#9758;";
    }
    if(results[1].label=="left"){
        document.getElementById("update_emoji_2").innerHTML="&#9756;";
    }
    if(results[1].label=="right"){
        document.getElementById("update_emoji_2").innerHTML="&#9757;";
    }
    if(results[0].label=="down"){
        document.getElementById("update_emoji_1").innerHTML="&#9759;";
    }
}