function log(L) {
	console.log(L);
	$("#infobox").val( $("#infobox").val() + '\b' + L +'\n' );
	document.getElementById('infobox').scrollTop = document.getElementById('infobox').scrollHeight;
}