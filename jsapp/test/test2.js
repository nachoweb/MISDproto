define(['jquery','text!templates/dashboard.html','goog!visualization,1,packages:[charteditor,controls]'],function($,template){
 var templ,init,exports={},handleDatos,openEditor,dataTable,dataTable2,
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
		$.get('data/analVenta',handleDatos,"json");
		$('#editor').click(openEditor);
 };


 handleDatos=function(data){
			console.timeEnd('datos');

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
			exports.chart2=chart2;
		
			$.publish('unload');
			console.timeEnd('total');
 };


	openEditor=function() {
		// Handler for the "Open Editor" button.
		var editor = new google.visualization.ChartEditor();
		google.visualization.events.addListener(editor, 'ok',
			function() {
				chart2= editor.getChartWrapper();
				chart2.draw(document.getElementById('report2'));
		});
		editor.openDialog(chart2);
	};

	exports.setOption=function(num){
		optionsWrapper.options.pageSize=num;
			chart = new google.visualization.ChartWrapper(optionsWrapper);
		new google.visualization.Dashboard(document.getElementById('report1')).
			// Configure the slider to affect the piechart
			bind(regionPicker, chart).
			bind(managerPicker, chart).
			// Draw the dashboard
			draw(dataTable);
	};
	return {init:init,ex:exports};

});
