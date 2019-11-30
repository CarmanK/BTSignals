// Validate that the brightness is within the range 0-100
function validate_brightness(){
    var input = document.getElementById('brightness_text');
    if(isNaN(input.value) || input.value < 0){
        input.value = 0;
    }else if(input.value > 100){
        input.value = 100;
    }
}