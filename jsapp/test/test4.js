define(['jquery','text!templates/dashboard.html'],function($,template){
 var cargados=0,templ,init,exports={},handleDatos,dataVentad,dataProd,dataDel,dataTodo,
 optionsWrapper,chart,regionPicker,managerPicker;

 templ=function(){
		$('#container').html(template) ;
 };
 init=function(){
		
		templ();
		exports.t="hola";
		$.publish('load');
		console.time('datos');
		console.time('total');
		req();
		//$.get('data/ventad',handleVentad);
		//$.get('data/producto',handleProd,"json");
		//$.get('data/delegados',handleDel,"json");
		$('#editor').click(openEditor);
 };

function req(){
 require(['text!data/delegados?k=.','text!data/producto?k=.','text!data/ventad?k=.'],function(del,prod,ven){
 

			console.time('formatVenta');
			dataVentad= new google.visualization.DataTable(ven);
			console.timeEnd('formatVenta');

			console.time('formatProd');
			dataProd= new google.visualization.DataTable(prod);
			console.timeEnd('formatProd');

			console.time('formatDel');
			dataDel= new google.visualization.DataTable(del);
			console.timeEnd('formatDel');
 
			handlerTodo();
 
 });
}
 var handleVentad=function(data){
			console.time('formatVenta');
			dataVentad= new google.visualization.DataTable(data);
			console.timeEnd('formatVenta');
			(cargados===2)? handlerTodo() : cargados+=1 ;
 };
 var handleProd=function(data){
			console.time('formatProd');
			dataProd= new google.visualization.DataTable(data);
			console.timeEnd('formatProd');
			(cargados===2)? handlerTodo() : cargados+=1 ;
 };
 var handleDel=function(data){
			console.time('formatDel');
			dataDel= new google.visualization.DataTable(data);
			console.timeEnd('formatDel');
			(cargados===2)? handlerTodo() : cargados+=1 ;
 };
 var handlerTodo=function(){
 	 
			console.timeEnd('datos');
			console.time('join1');


			var d1=google.visualization.data.join(dataVentad, dataProd, 'inner', [[1,0]], [0,2,3,4], [1]);
			exports.d1=d1;
			console.timeEnd('join1');

			console.time('join2');


			var d2=google.visualization.data.join(d1, dataDel, 'inner', [[2,0]], [1,3,4,5], [1,2,3]);
			exports.d2=d2;
			console.timeEnd('join2');
			var formatter_medium = new google.visualization.DateFormat({formatType: 'long'});
			formatter_medium.format(d2,1);
			var table= new google.visualization.Table(document.getElementById('report1'));
			table.draw(d2, {'page':'enable','pageSize':10,"alternatingRowStyle":true});
			exports.table=table;

			$.publish('unload');
			console.timeEnd('total');
 };


 handleDatos=function(){

			console.time('format');
			dataTable= new google.visualization.DataTable(data);
			console.timeEnd('format');

			console.time('group');
			exports.dataTable=dataTable;

			dataTable2=google.visualization.data.group(dataTable,[3],
				[
					//{'column': 6, 'aggregation': google.visualization.data.sum, 'type': 'number'},
					{'column': 5, 'aggregation': google.visualization.data.sum, 'type': 'number'}
				]
			);
			console.timeEnd('group');

			var formatter = new google.visualization.NumberFormat({
				prefix: '$', negativeColor: 'red'
			});

      formatter.format(dataTable2,1);
      //formatter.format(dataTable2,2);


			var optionsTable={
				showRowNumber: false,
				'page' : 'enable',
				'pageSize':10,
				'pagingButtonsConfiguration' : 'auto'
			};
			optionsWrapper={
				'chartType':'Table',
				//'dataTable':dataTable,
				'containerId':'report1',
				options: optionsTable
			};
			var optionsWrapper2={
				'chartType':'Table',
				'dataTable':dataTable2,
				'containerId':'report2',
				options: {"is3D":true,'title': 'Descuentos y Total por región'}
			};

			
			managerPicker = new google.visualization.ControlWrapper({
				
					'controlType': 'StringFilter',
					'containerId': 'manager',
					'options': {
						'filterColumnLabel': 'Manager'
					}
			});
			
			regionPicker = new google.visualization.ControlWrapper({
				'controlType': 'CategoryFilter',
				'containerId': 'regiones',
				'options': {
					'filterColumnLabel': 'Region',
					'ui': {
						'allowTyping': false,
						'allowMultiple': true,
						'selectedValuesLayout': 'belowStacked'
					}
				},
				// Define an initial state, i.e. a set of metrics to be initially selected.
				'state': {'selectedValues': [null, "ANDALUCIA", "CATALUÑA AU",  "CENTRO"]}
			});


			chart = new google.visualization.ChartWrapper(optionsWrapper);


			new google.visualization.Dashboard(document.getElementById('report1')).
			// Configure the slider to affect the piechart
			bind(regionPicker, chart).
			bind(managerPicker, chart).
			// Draw the dashboard
			draw(dataTable);

			chart2= new google.visualization.ChartWrapper(optionsWrapper2);
			chart2.draw();
		
			$.publish('unload');
			console.timeEnd('total');
 };


	var openEditor=function() {
		// Handler for the "Open Editor" button.
		var editor = new google.visualization.ChartEditor();
		google.visualization.events.addListener(editor, 'ok',
			function() {
				chart2= editor.getChartWrapper();
				chart2.draw(document.getElementById('report2'));
		});
		editor.openDialog(chart2);
	};

	return {init:init,ex:exports};

});
