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
      $('#port-list').append('<li id="no-mech" onclick="refleshPort()"><a>No any device</a></li>');
      
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
    log("Port was opened");
}
function closePort() {
  if(port.isOpen())
  {
    $('#open-port').show();
    $('#close-port').hide();
    port.close();
  }        
  else
    log("Port was closed");
}
function sendCommand(command) {

  log("COMMAND: " + command);
  if(port.isOpen)
    port.write( command + '\n');
  else
    log("ERROR: doesn't connet any device");
  
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
    log('ERROR: ' + err.message);
  });
  port.on('open', function () {
    log('Open port: ' + port.path);
  });
  port.on('close', function () {
    log('Close port ');
  });

  port.on('data', function (data) {
    log('echo: ' + data);
  });

  openPort();
}