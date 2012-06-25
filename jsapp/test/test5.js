define(['jquery','text!templates/dashboard.html','goog!visualization,1,packages:[table]'],function($,template){
 var templ,init,exports={},handleDatos,openEditor,dataTable,dataTable2,
 optionsTable={},chart,regionPicker,managerPicker,table2,dataView;

 templ=function(){
		$('#container').html(template) ;
 };
 init=function(){
		
		$(function(){
			templ();
			$('#dash-controls').remove();
			//$('#report2').remove();
			$('h3').remove();
		});	
		exports.t="hola";
		$.publish('load');
		console.time('datos');
		console.time('total');
		$.get('data/analVenta',handleDatos,"json");
 };


 handleDatos=function(data){
			console.timeEnd('datos');

			console.time('format');
			dataTable= new google.visualization.DataTable(data);
			exports.dataTable=dataTable;
			console.timeEnd('format');


			console.time('group');

			var dataTable2=google.visualization.data.group(dataTable,[3],
										[{'column': 5, 'aggregation': google.visualization.data.sum, 'type': 'number'},{'column': 6, 'aggregation': google.visualization.data.sum, 'type': 'number'}]);

			console.timeEnd('group');

			var formatter = new google.visualization.TableNumberFormat(
					{prefix: "$", negativeColor: 'red', negativeParens: true});
			formatter.format(dataTable, 5,6);
			formatter.format(dataTable2, 1,2);

			dataView=new google.visualization.DataView(dataTable); 
			dataView.setColumns([1,2,4,5,6]);
			table2= new google.visualization.Table(document.getElementById('report2'));
			exports.dataView=dataView;
			exports.table2=table2;



			optionsTable={
				showRowNumber: false,
				'page' : 'enable',
				'pageSize':10,
				'pagingButtonsConfiguration' : 'auto'
			};


			chart = new google.visualization.Table(document.getElementById('report1'));
			chart.draw(dataTable2,optionsTable);

			$('#report2').html('<span style="font-weight:italic;margin-top:20px;">Selecciona una región</span>');
		 	
			google.visualization.events.addListener(chart,'select',function(){
					var item=chart.getSelection()[0],
						selection=dataTable2.getValue(item.row,0);
						report2(selection);
			});
			

			$.publish('unload');
			console.timeEnd('total');
 };
 var report2=function(select){
		select= select || 'LEVANTE';
		
		var rows=dataTable.getFilteredRows([{column:3,value:select}]);
		console.log(select,rows);
		dataView.setRows(rows);
		table2.draw(dataView,optionsTable);

 };


	return {init:init,ex:exports};

});
