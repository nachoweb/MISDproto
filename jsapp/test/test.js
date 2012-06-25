define(['jquery'],function($){

 var init=function(){
		$.get('data/ventad',function(data){
			var dataTable= new google.visualization.DataTable();

			console.time('format');
			var dat=data.split(/\n/),
					fieldsA=dat[0].split(','),
					rows=[],arr=[];
			window.fieldsA=fieldsA;
			window.rows=rows;
			window.dat=dat;

			for(var j=0;j < fieldsA.length;j++){
					dataTable.addColumn('string',fieldsA[j]);
			}
			for(var i=1;i < 5000;i++){
				//Coge las , que no estan entre "
				arr=dat[i].split(/(,)(?=(?:[^"]|"[^"]*")*$)/);
				arr= $.grep(arr, function(value) {
					return value != ',';
				});
				//rows.push(arr);	
				dataTable.addRow(arr);
			}
			console.timeEnd('format');

			//dataTable.addRows(rows);

			var table = new google.visualization.Table(document.getElementById('container'));
      table.draw(dataTable, {showRowNumber: true});
		
		});
 
 };

	return {init:init};

});
