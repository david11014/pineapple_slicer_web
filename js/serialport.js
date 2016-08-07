var serialPort = require("serialport");
var defaultBaudRate = 250000;
var portList = [];
port =0 ;

function refleshPort() {
  portList = [];
  $('#port-list').empty();  
  serialPort.list(function (err, ports) {
    ports.forEach(function(port) {
      portList.push(port.comName);
      $('#port-list').append("<li><a onclick='settingPort(\"" + port.comName  + "\",250000);'>" + port.comName  + "</a></li>");
    });
    
    if(portList.length == 0) {
      $('#port-list').append('<li id="no-mech" onclick="refleshPort()"><a >無可用機器請點擊刷新</a></li>');
      //log("NO port"); 
    }
    else {
      //log("Have ports:" + portList.toString());
    }    
  });
}
function openPort() {
  if(!port.isOpen())
  {
    $('#open-port').hide();
    $('#close-port').show();
    port.open();
  }        
  else
    log("port was opened");
}
function closePort() {
  if(port.isOpen())
  {
    $('#open-port').show();
    $('#close-port').hide();
    port.close();
  }        
  else
    log("port was closed");
}
function sendCommand(command) {
  port.write( command + '\n');
  log("CMD: " + command);
}
function emergencyStop() {
  sendCommand('M112');
  closePort();
  openPort();
}

function settingPort(portName , baud) {
  port = new serialPort(portName,{
    baudRate: baud
  });

  port.on('error',function (err){
    log('Error: ' + err.message);
  });
  port.on('open', function () {
    log('port open');
  });
  port.on('close', function () {
    log('port close');
  });

  port.on('data', function (data) {
    log('echo: ' + data);
  });

  openPort();
}