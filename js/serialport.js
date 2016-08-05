var portName = "COM14"
var serialPort = require("serialport");
var port = new serialPort(portName, {
  baudRate: 250000
});
port.on('open', function() {
  log('port open');
});
port.on('close', function() {
  log('port close');
});

// open errors will be emitted as an error event 
port.on('error', function(err) {
  log('Error: ', err.message);
})
port.on('data', function (data) {
  log('echo: ' + data);
});
function openPort()
{
  if(!port.isOpen())
  {
    $('#open-port').hide();
    $('#close-port').show();
    port.open();
  }        
  else
    log("port was opened");
}
function closePort()
{
  if(port.isOpen())
  {
    $('#open-port').show();
    $('#close-port').hide();
    port.close();
  }        
  else
    log("port was closed");
}
function sendCommand(command)
{
  port.write( command + '\n');
  log("CMD: " + command);
}
function emergencyStop()
{
  sendCommand('M112');
  closePort();
  openPort();
}