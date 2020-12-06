long analogIn = 0;
long buttonState = 0;
long time = 0;
boolean wentLowAgain = false;
boolean highSound = false;

void setup() {
  Serial.begin(9600);
  pinMode(2, OUTPUT);
}

void loop() {
  buttonState = analogRead(analogIn);
  Serial.println(buttonState);
  //if over x 3 times, wait to go low again, if it goes back up again within a second, then toggle a pin
  if (buttonState > 150){
     highSound = true;
     time = millis();
  }
  
  if (highSound == true){
    if (buttonState < 50){
      wentLowAgain = true;
      time = millis();
      highSound = false;
    }
  }
  
  if (millis() - time < 500 && wentLowAgain == true){
    if (buttonState > 150){
	  //ONLY if the computer is off, then start the computer
      if (analogRead(1) < 100){
        digitalWrite(2, HIGH);
      }
      Serial.println("found it");
      wentLowAgain = false;
      highSound = false;
    }
  }

  if (millis() - time > 500){
    highSound = false;    
    wentLowAgain = false;
  }
    
  //delay(1);        // delay in between reads for stability
}
