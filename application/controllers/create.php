<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Create extends CI_Controller {
	function __construct(){
		parent::__construct();
		//$this->load->dbutil();
		//$this->output->enable_profiler(TRUE);
		$this->load->helper('file');
	}

	public function index()
	{
		echo "index";
	}
	public function json($ano='2008')
	{
		ini_set('memory_limit',-1);
		$sql=<<<EEE

			SELECT v.*,
							producto.`D Producto Act`,
							producto.`VD-IMS`,
							producto.`D Laboratorio`,
							producto.`D Molécula`,
							`clientes`.`D Cliente`,
							`clientes`.`D Tipo Cliente`,
							`clientes`.`C Brick`,
							`delegados`.`C Delegado`,
							`delegados`.`D Delegado`,
							`delegados`.`D Delegado CRM`,
							`delegados`.`D Región`,
							`delegados`.`D Manager`

			FROM ratiopharm.vd$ano v
			join producto  on producto.`C Producto`=v.producto 
			join clientes on clientes.`C Cliente`=v.cliente
			join delegados on delegados.`C Delegado`=v.delegado
EEE;
		$cols=array(
			0=>array('id'=>'mes', 'label'=>'Mes', 'type'=>'date' ),
			1=>array('id'=>'cliente', 'label'=>'Cliente', 'type'=>'number' ),
			2=>array('id'=>'producto', 'label'=>'Producto', 'type'=>'number' ),
			3=>array('id'=>'delegado', 'label'=>'Delegado', 'type'=>'number' ),
			4=>array('id'=>'vpedido', 'label'=>'Valor pedido', 'type'=>'number' ),
			5=>array('id'=>'vcargo', 'label'=>'Valor cargo', 'type'=>'number' ),
			6=>array('id'=>'vabono', 'label'=>'Valor abono', 'type'=>'number' ),
			7=>array('id'=>'vtotal', 'label'=>'Valor total', 'type'=>'number' ),
			8=>array('id'=>'upedidos', 'label'=>'Unidades pedidos estandar', 'type'=>'number' ),
			9=>array('id'=>'vdescuentos', 'label'=>'Valor descuentos', 'type'=>'number' ),
			10=>array('id'=>'dproducto', 'label'=>'Producto', 'type'=>'string' ),
			11=>array('id'=>'vdims', 'label'=>'VD-IMS', 'type'=>'string' ),
			12=>array('id'=>'laboratorio', 'label'=>'Laboratorio', 'type'=>'string' ),
			13=>array('id'=>'molecula', 'label'=>'Molecula', 'type'=>'string' ),
			14=>array('id'=>'dcliente', 'label'=>'Cliente', 'type'=>'string' ),
			15=>array('id'=>'tipocliente', 'label'=>'Tipo de cliente', 'type'=>'string' ),
			16=>array('id'=>'brick', 'label'=>'Brick', 'type'=>'number' ),
			17=>array('id'=>'delegado', 'label'=>'Delegado', 'type'=>'number' ),
			18=>array('id'=>'ddelegado', 'label'=>'Delegado', 'type'=>'string' ),
			19=>array('id'=>'delegadocrm', 'label'=>'Delegado CRM', 'type'=>'string' ),
			20=>array('id'=>'delegadocrm', 'label'=>'Delegado CRM', 'type'=>'string' ),
			21=>array('id'=>'region', 'label'=>'Region', 'type'=>'string' ),
			21=>array('id'=>'manager', 'label'=>'Manager', 'type'=>'string' )
		);
		$query=$this->db->query($sql);
		$rows=array();

		foreach($query->result() as $row){
			$mes=substr($row->mes,4);
			$an=substr($row->mes,0,4);
		 	$r=array('c'=>array(
									0=>array('v'=>'new Date('.$an.','.( $mes-1 ).')','f'=>$mes.'-'.$an),
									1=>array('v'=>$row->cliente),
									2=>array('v'=>$row->producto),
									3=>array('v'=>$row->delegado),
									4=>array('v'=>$row->Vpedido),
									5=>array('v'=>$row->Vcargo),
									6=>array('v'=>$row->Vabono),
									7=>array('v'=>$row->Vtotal),
									8=>array('v'=>$row->UpedidosEstandar),
									9=>array('v'=>$row->Vdescuentos),
									10=>array('v'=>$row->{'D Producto Act'}),
									11=>array('v'=>$row->{'VD-IMS'}),
									12=>array('v'=>$row->{'D Laboratorio'}),
									13=>array('v'=>$row->{'D Molécula'}),
									14=>array('v'=>$row->{'D Cliente'}),
									15=>array('v'=>$row->{'D Tipo Cliente'}),
									16=>array('v'=>$row->{'C Brick'}),
									17=>array('v'=>$row->{'C Delegado'}),
									18=>array('v'=>$row->{'D Delegado'}),
									19=>array('v'=>$row->{'D Delegado CRM'}),
									20=>array('v'=>$row->{'D Región'}),
									21=>array('v'=>$row->{'D Manager'})
			));	
			array_push($rows,$r);
			//$hola['data']=$row->{ 'D Delegado' };
			//echo $hola['data'];exit;
			//$this->load->view('debug',$hola);
			//echo $row->{ 'D Delegado' };exit;
			//echo json_encode($r);exit;
		}	 
		$table=array('cols'=>$cols,'rows'=>$rows);
		$outjson=json_encode($table);
		write_file('./datafiles/vd'.$ano.'.json', $outjson);
		//$this->load->view('debug',array('data'=>$outjson));


	}


}

/* End of file create.php */
/* Location: ./application/controllers/create.php */
