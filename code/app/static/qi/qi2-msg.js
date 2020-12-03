var testMsg = "imported msg";
var session;

function printMsg() {
    console.log(testMsg + " from external func");
}

function speak(msg) {
  QiSession(function(session) {
    console.log("connected!");

    session.service("ALTextToSpeech").then(function(tts) {
      tts.say(msg);
    }, function(error) {
      console.log(error);
    });
  }, function() {
    console.log("disconnected");
  });
}

function walk(x, y, theta) {
  QiSession(function(session) {
    console.log("connected!");

    session.service("ALMotion").then(function(motion) {
      // (x, y, theta) [m, m, rad] theta pos -> left, theta neg -> right
      motion.moveTo(x, y, theta);
    }, function(error) {
      console.log(error);
    });
  }, function() {
    console.log("disconnected");
  });
}

// experimental to share session over global var
function initQiSession(robotIp) {
    try {
        QiSession(function(s) {
            console.log("connected!");
            session = s;
        }, robotIp);
    } catch (error) {
        console.log(error);
    }
}
