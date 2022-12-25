
//Broadcast Channel API
if ('BroadcastChannel' in window) {
	const channel = new BroadcastChannel("test_channel"); 
	let send = document.querySelector(".send");
	let messageText = document.querySelector(".message-text");
	let messageContent = document.querySelector(".message-content");
	let disable = document.querySelector(".disable");

	let href = location.pathname;

	send.addEventListener("click", () => {
		channel.postMessage("<b>Channel:</b><span>" + messageText.value + "</span>");
		createMessage("<b>You:</b> " + messageText.value);
		messageText.value = "";
	}, false);

	channel.addEventListener("message", (e) => {
		createMessage(e.data);
	}, false);

	function createMessage(message) {
		let item = document.createElement("P");
		item.innerHTML = message;
		messageContent.appendChild(item);
	}

	if (disable) {
		disable.addEventListener("click", () => {
			document.querySelector(".iframe-content").style.display = "none";
		}, false);
	}
} 

else {
	document.querySelector(".content").style.display = "none";
	document.querySelector(".error").style.display = "block";
}




//Battery Status API

navigator.getBattery().then((battery) => {
    function updateAllBatteryInfo() {
      updateChargeInfo();
      updateLevelInfo();
      updateChargingInfo();
      updateDischargingInfo();
    }
    updateAllBatteryInfo();
  
    battery.addEventListener("chargingchange", () => {
      updateChargeInfo();
    });
    function updateChargeInfo() {
        
        let statusEl = document.createElement("P");
		statusEl.innerHTML = `<b>Battery charging?</b> ${battery.charging ? "Yes" : "No"}`;
        document.querySelector(".btryStatus").appendChild(statusEl); 
    }
  
    battery.addEventListener("levelchange", () => {
      updateLevelInfo();
    });
    function updateLevelInfo() {
        let statusEl = document.createElement("P");
		statusEl.innerHTML = `<b>Battery level:</b> `+Math.trunc(battery.level * 100)+`%`;
        document.querySelector(".btryStatus").appendChild(statusEl);
 
    }
  
    battery.addEventListener("chargingtimechange", () => {
      updateChargingInfo();
    });
    function updateChargingInfo() {
        let statusEl = document.createElement("P");
		statusEl.innerHTML = `<b>Battery charging time:</b> ${battery.chargingTime} seconds`;
        document.querySelector(".btryStatus").appendChild(statusEl);
 
    }
  
    battery.addEventListener("dischargingtimechange", () => {
      updateDischargingInfo();
    });
    function updateDischargingInfo() {
        let statusEl = document.createElement("P");
		statusEl.innerHTML = `<b>Battery discharging time:</b> ${battery.dischargingTime} seconds`;
        document.querySelector(".btryStatus").appendChild(statusEl);
 
    }
  });
  




//File Access API

const fileInput = document.querySelector("input[type=file]");
const output = document.querySelector('.output');

fileInput.addEventListener("change", () => {
  const [file] = fileInput.files;
  if (file) {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      output.innerText = reader.result;
    });
    reader.readAsText(file);
  }
})



//Lock Pointer API

const RADIUS = 20;

function degToRad(degrees) {
  var result = Math.PI / 180 * degrees;
  return result;
}
 

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var x = 50;
var y = 50;

function canvasDraw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#f00";
  ctx.beginPath();
  ctx.arc(x, y, RADIUS, 0, degToRad(360), true);
  ctx.fill();
}
canvasDraw(); 

canvas.requestPointerLock = canvas.requestPointerLock ||
                            canvas.mozRequestPointerLock;

document.exitPointerLock = document.exitPointerLock ||
                           document.mozExitPointerLock;

canvas.onclick = function() {
  canvas.requestPointerLock();
};
 
document.addEventListener('pointerlockchange', lockChangeAlert, false);
document.addEventListener('mozpointerlockchange', lockChangeAlert, false);

function lockChangeAlert() {
  if (document.pointerLockElement === canvas ||
      document.mozPointerLockElement === canvas) {
    console.log('The pointer lock status is now locked');
    document.addEventListener("mousemove", updatePosition, false);
  } else {
    console.log('The pointer lock status is now unlocked');  
    document.removeEventListener("mousemove", updatePosition, false);
  }
}

var tracker = document.getElementById('tracker');

var animation;
function updatePosition(e) {
  x += e.movementX;
  y += e.movementY;
  if (x > canvas.width + RADIUS) {
    x = -RADIUS;
  }
  if (y > canvas.height + RADIUS) {
    y = -RADIUS;
  }  
  if (x < -RADIUS) {
    x = canvas.width + RADIUS;
  }
  if (y < -RADIUS) {
    y = canvas.height + RADIUS;
  }
  tracker.textContent = "X position: " + x + ", Y position: " + y;

  if (!animation) {
    animation = requestAnimationFrame(function() {
      animation = null;
      canvasDraw();
    });
  }
}








