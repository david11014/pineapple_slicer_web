function windows_init(){
  chooseFile('#fileDialog');
  refleshPort();

  /**setup menu**/
  menu.append(new nw.MenuItem({
    label: 'File',
    submenu: File_menu
  }));
  nw.Window.get().menu = menu;

  //open file
  File_menu.append(new nw.MenuItem({ label: 'Open File' }));      
  File_menu.items[0].click = function() {  
    $('#fileDialog').trigger('click');
  };
  //exit
  File_menu.append(new nw.MenuItem({ label: 'Exit' }));
  File_menu.items[1].click = function() {  
    nw.Window.get().close();
  };
  /**setup event**/
  $("#canvas3d").bind('mousewheel', scale);
  $('#send-command').submit(function (e) {
    e.preventDefault();
    sendCommand($("#command-input").val());
    return false;
  });
  $(window).resize(function (e) {
    $('#canvas3d').height(window.innerHeight - $("#nav").height() - 5 );
    resizeThree();
    $('#tab').css({"left":(width-$('#tab').width()).toString() + "px"});
  });
  
  $(window).bind('beforeunload',closePort);
  $('#tab').css({"left":(width-$('#tab').width()).toString() + "px"});
  $('#open-port').on('show.uk.dropdown', function(){refleshPort();});
  $('#canvas3d').height(window.innerHeight - $("#nav").height() - 5);      
}

function log(L) {
	console.log(L);
	$("#infobox").val( $("#infobox").val() + '\b' + L +'\n' );
	document.getElementById('infobox').scrollTop = document.getElementById('infobox').scrollHeight;
}

function switchTab(tab) {
	$('#control-block').children().hide();
	$('#tab').children().removeClass("uk-active");
	$(tab).show();
	$(tab + "-tab").addClass('uk-active');

}