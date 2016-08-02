$(document).ready(function(){
 	// ADD A SUBMIT HANDLER FOR OUR FORM. STOP THE FORM FROM SUBMITTING WHEN THE USER CLICKS OR HITS ENTER
 	$('.yahoo-form').submit(function(){
 		event.preventDefault();
 		// console.log('I am listening for your submission');
 		var symbol = $('#symbol').val();
 		// alert(symbol);
 		var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20("' + symbol + '")%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json';
 		// console.log(url);
 		$.getJSON(url, function(theDataJsFoundIfAny){
 			// console.log(theDataJsFoundIfAny);
 			var stockInfo = theDataJsFoundIfAny.query.results.quote;
			var stockCount = theDataJsFoundIfAny.query.count;
			var newHTML = '';
 			if(stockCount > 1){
 			for(var i = 0; i < stockInfo.length; i++){
 				newHTML += buildNewTable(stockInfo[i]);
 				}	
 			}else{newHTML += buildNewTable(stockInfo);
 			}
 			$('.yahoo-body').html(newHTML);
 			$('.table').DataTable();
 		});
 	});
 
 });
 function buildNewTable(stockInfo){
 	if(stockInfo.Change[0] == '+'){
 		var upDown = 'success';
 	}else if(stockInfo.Change[0] == '-'){
 		var upDown = 'danger';
 	}
 	var htmlString = '';			
 	htmlString = '<tr><td>'+ stockInfo.Symbol + '</td>';
 	htmlString += '<td>'+ stockInfo.Name + '</td>';
 	htmlString += '<td>'+ stockInfo.Ask + '</td>';
 	htmlString += '<td>'+ stockInfo.Bid + '</td>';
 	htmlString += '<td class="'+upDown+'">'+ stockInfo.Change + '</td></tr>'
 	return htmlString;
 }
 if(typeof(Storage) !== "undefined"){
 	/* set it */
 	$('#set').click(function() {
 	  var save = $('#save').val();
 	  localStorage.setItem("save", save);
 	});
 
 	/* get it */
 	$('#get').click(function() {
 	  $('#val').text(localStorage.getItem("save"));
 	});
 
 	/* remove it */
 	$('#remove').click(function() {
 	  localStorage.removeItem("save");
 	});
 
 	$('#val').text(localStorage.getItem("save"));
 }