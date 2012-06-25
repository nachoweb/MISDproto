<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Data extends CI_Controller {
	function __construct(){
		parent::__construct();
		ini_set('memory_limit', '-1');
		//$this->load->dbutil();
		//$this->output->enable_profiler(TRUE);
	}

	public function index()
	{
		$data['data']="Index of data";
		$this->load->view("debug",$data);
	}
	public function vd($ano='2008')
	{
		$queryVdirecta=<<<EEE
select 
    left(ventadirecta.Dia, 6) AS mes,
    ventadirecta.`C Cliente` AS cliente,
    ventadirecta.`C Producto` AS producto,
    ventadirecta.`C Delegado` AS delegado,
    sum(ventadirecta.`Valor Pedido`),
    sum(ventadirecta.`Valor Cargo`) ,
    sum(ventadirecta.`Valor Abono`) ,
    sum(ventadirecta.`Valor Total`) ,
    sum(ventadirecta.`Unidades Pedidos Estandar`),
    sum(ventadirecta.`Valor Descuentos`) 
from ventadirecta
where (left(ventadirecta.Dia, 4) = $ano)
group by left(ventadirecta.Dia, 6) ,
				 ventadirecta.`C Cliente` ,
				 ventadirecta.`C Producto` ,
				 ventadirecta.`C Delegado`
EEE;
		$queryV=<<<EEE


SELECT v.*,
        producto.`D Producto Act`,
        producto.`VD-IMS`,
        producto.`D Laboratorio`,
        producto.`D Molecula`,
        `clientes`.`D Cliente`,
        `clientes`.`D Tipo Cliente`,
        `clientes`.`C Brick`,
        `delegados`.`C Delegado`,
				`delegados`.`D Delegado`,
				`delegados`.`D Delegado CRM`,
				`delegados`.`D Región`,
				`delegados`.`D Manager`

FROM ratiopharm.vd2008 v
join producto  on producto.`C Producto`=v.producto 
join clientes on clientes.`C Cliente`=v.cliente
join delegados on delegados.`C Delegado`=v.delegado




EEE;
		$query = $this->db->query($queryV);
		$data['data']= $this->dbutil->csv_from_result($query);
		$this->load->view("debug",$data);

	}



	public function ventadfile($ano='2008')
	{
		
		$this->output
				->set_content_type('text') // You could also use ".jpeg" which will have the full stop removed before looking in config/mimes.php
				->set_output(file_get_contents('datafiles/vd'.$ano.'.json'));
	}


	public function ventad($ano='2008'){

		$sql=<<<EEE
	
				SELECT
					mes,
					producto,
					delegado,
					Vtotal,
					Vdescuentos
				FROM vd$ano

EEE;

		$cols=array(
			0=>array('id'=>'mes', 'label'=>'Mes', 'type'=>'date' ),
			1=>array('id'=>'producto', 'label'=>'Producto', 'type'=>'number' ),
			2=>array('id'=>'delegado', 'label'=>'Delegado', 'type'=>'number' ),
			3=>array('id'=>'vtotal', 'label'=>'Valor total', 'type'=>'number' ),
			4=>array('id'=>'vdescuentos', 'label'=>'Valor descuentos', 'type'=>'number' )
		);
		$query=$this->db->query($sql);
		$rows=array();

		foreach($query->result() as $row){
			$mes=substr($row->mes,4);
			$an=substr($row->mes,0,4);
		 	$r=array('c'=>array(
									//0=>array('v'=>'new Date('.$an.','.( $mes-1 ).')','f'=>$mes.'-'.$an),
									0=>array('v'=>'Date('.$an.','.( $mes-1 ).')','f'=>$mes.'-'.$an),
									//0=>array('v'=>'&&&new Date('.$an.','.( $mes-1 ).')&&&'),
									1=>array('v'=>(int)$row->producto),
									2=>array('v'=>(int)$row->delegado),
									3=>array('v'=>(int)$row->Vtotal,'f'=>$row->Vtotal),
									4=>array('v'=>(int)$row->Vdescuentos,'f'=>$row->Vdescuentos)
			));	
			array_push($rows,$r);
		}	 
		$table=array('cols'=>$cols,'rows'=>$rows);
		$outjson=json_encode($table);
		//$removeSlash=preg_replace('/"&&&(.*?)&&&"/',"$1",$outjson);
		$this->load->view('blank',array('data'=>$outjson));
	
	
	}

	public function producto(){
	
	
		$sql=<<<EEE
	
			
				SELECT
					`C Producto` as prodid,
					`D Molécula` as molecula
				FROM producto;
	
EEE;

		$cols=array(
			0=>array('id'=>'producto', 'label'=>'Producto', 'type'=>'number' ),
			1=>array('id'=>'molecula', 'label'=>'Molécula', 'type'=>'string' ),
		);
		$query=$this->db->query($sql);
		$rows=array();

		foreach($query->result() as $row){
		 	$r=array('c'=>array(
									0=>array('v'=>(int)$row->prodid),
									1=>array('v'=>$row->molecula),
			));	
			array_push($rows,$r);
		}	 
		$table=array('cols'=>$cols,'rows'=>$rows);
		$outjson=json_encode($table);
		$this->load->view('blank',array('data'=>$outjson));
	
	
	}
	public function delegados(){
	
	
		$sql=<<<EEE
	
			SELECT
				`C Delegado` as delid,
				`D Delegado CRM` as delegado,
				`D Región` as region,
				`D Manager` as manager
			FROM `delegados`;
	
EEE;

		$cols=array(
			0=>array('id'=>'delegadoid', 'label'=>'delegadoid', 'type'=>'number' ),
			1=>array('id'=>'delegado', 'label'=>'Delegado', 'type'=>'string' ),
			2=>array('id'=>'region', 'label'=>'Region', 'type'=>'string' ),
			3=>array('id'=>'manager', 'label'=>'Manager', 'type'=>'string' ),
		);
		$query=$this->db->query($sql);
		$rows=array();

		foreach($query->result() as $row){
		 	$r=array('c'=>array(
									0=>array('v'=>(int)$row->delid),
									1=>array('v'=>$row->delegado),
									2=>array('v'=>$row->region),
									3=>array('v'=>$row->manager),
			));	
			array_push($rows,$r);
		}	 
		$table=array('cols'=>$cols,'rows'=>$rows);
		$outjson=json_encode($table);
		$this->load->view('blank',array('data'=>$outjson));
	
	
	}




	public function analVenta($ano='2008'){

	$sql=<<<EEE

	
			SELECT  v.`mes`,
							producto.`D Molécula`,
							`delegados`.`D Delegado CRM`,
							`delegados`.`D Región`,
							`delegados`.`D Manager`,
              ifnull(sum(v.`Vtotal`),0) as Vtotal,
							ifnull(sum(v.`Vdescuentos`),0) as Vdescuentos

			FROM vd$ano v
			join producto  on producto.`C Producto`=v.producto 
			join delegados on delegados.`C Delegado`=v.delegado
    group by v.`mes`,
							producto.`D Molécula`,
							`delegados`.`D Delegado CRM`,
							`delegados`.`D Región`,
							`delegados`.`D Manager`

EEE;

		$cols=array(
			0=>array('id'=>'mes', 'label'=>'Mes', 'type'=>'date' ),
			1=>array('id'=>'molecula', 'label'=>'Molecula', 'type'=>'string' ),
			2=>array('id'=>'delegadocrm', 'label'=>'Delegado CRM', 'type'=>'string' ),
			3=>array('id'=>'region', 'label'=>'Region', 'type'=>'string' ),
			4=>array('id'=>'manager', 'label'=>'Manager', 'type'=>'string' ),
			5=>array('id'=>'vtotal', 'label'=>'Valor total', 'type'=>'number' ),
			6=>array('id'=>'vdescuentos', 'label'=>'Valor descuentos', 'type'=>'number' )
		);
		$query=$this->db->query($sql);
		$rows=array();

		foreach($query->result() as $row){
			$mes=substr($row->mes,4);
			$an=substr($row->mes,0,4);
		 	$r=array('c'=>array(
									0=>array('v'=>'Date('.$an.','.( $mes-1 ).')','f'=>$mes.'-'.$an),
									1=>array('v'=>$row->{'D Molécula'}),
									2=>array('v'=>$row->{'D Delegado CRM'}),
									3=>array('v'=>$row->{'D Región'}),
									4=>array('v'=>$row->{'D Manager'}),
									5=>array('v'=>(int)$row->Vtotal,'f'=>$row->Vtotal),
									6=>array('v'=>(int)$row->Vdescuentos,'f'=>$row->Vdescuentos)
			));	
			array_push($rows,$r);
		}	 
		$table=array('cols'=>$cols,'rows'=>$rows);
		$outjson=json_encode($table);
		$this->load->view('blank',array('data'=>$outjson));
		
	}

}

/* End of file data.php */
/* Location: ./application/controllers/data.php */
