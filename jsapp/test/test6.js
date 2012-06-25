define(['jquery','text!templates/test.html','goog!visualization,1,packages:[table]'],
			 function($,template){

var exports={};

	function init(){
		//run draw on load

		$(tmpl);
		$(draw);
	
	//END of init
	}
	function tmpl(){$('#container').html(template);}

	function draw(){
	
      // Create and populate the data table.
      var data = google.visualization.arrayToDataTable([
        ['Name', 'Height', 'Smokes'],
        ['Tong Ning mu', 174, true],
        ['Huang Ang fa', 523, false],
        ['Teng nu', 86, true],
        ['Tong Ning mu', 174, true],
        ['Huang Ang fa', 5, false],
        ['Huang Ang fa', 23, false],
        ['Huang Ang fa', 3, false],
        ['Huang Ang fa', 5, false],
        ['Huang Ang fa', 2233, false],
        ['Tong Ning mu', 1, true],
        ['Tong Ning mu', 18, true],
        ['Tong Ning mu', 19, true]
      ]);
      data.sort(0);
      var data2 = google.visualization.data.group(
          data, [0],
          [{'column': 1, 'aggregation': google.visualization.data.sum, 'type': 'number'}]);
      var cols=data.getDistinctValues(0);
      
      console.log(cols);
      var p='border-top:2px solid black;border-bottom:2px solid black;font-size:18px;font-style:bold;';
      var totalI=[],totalRows=[];
      
      $.each(cols,function(i,v){
        //idxs indices de todas las rows del grupo que estamo recorriendo
        //idT indice de la fila de total que hemos insertado.
        var idxs=data.getFilteredRows([{column:0,value:v}]),
            idT=Math.min.apply(null,idxs);
        
        data.insertRows(idT,[['TOTAL '+v,data2.getValue(i,1),true]]);
        data.setProperty(idT,0,'style',p);
        data.setProperty(idT,1,'style',p);
        data.setProperty(idT,2,'style',p);
        totalI.push(idT);
        //Suma uno para actualizar la posicion de los indices despues de haber insertado.
				var idxss =$.map(idxs,function(v){return v+1;});
        totalRows.push(idxss);
      });
      
      //Inicial dataview
      var dataView=new google.visualization.DataView(data);
      dataView.setRows(totalI);
      
    
      // Create and draw the inicial visualization.
      visualization = new google.visualization.Table($('#test')[0]);
      var drawT=function(){
				visualization.draw(dataView, {allowHtml:true,sort:'disable'});
      };
      drawT();
      
      //Select event to expand rows
      var show=false;
      google.visualization.events.addListener(visualization , 'select', function(){
        //set up all rows in the beginning
        //dataView.setRows(0,data.getNumberOfRows()-1);
        //Si está expandido contrae para mostrar solo totales
        if(show){
          dataView.setRows(totalI);show=false;
          
        //Si no está expandido se expande el grupo seleccionado. Ocultando los otros
        }else{
          var item=visualization.getSelection()[0],
              result=[];
          
          $.each(totalI,function(i,v){
            result.push(v);
            if(item.row === i)
            	result.push(totalRows[i]);
          
          });          
          //Flatten array
          result=$.map(result,function(n){return n;});
          dataView.setRows(result);
          show=true;
        } 

					drawT();
        
      
      
      });
    }
	

	return {init:init,e:exports};
});
