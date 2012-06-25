<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Test extends CI_Controller {
	function __construct(){
		parent::__construct();
		$this->load->dbutil();
	}
	public function index()
	{
		$queryVdirecta=<<<EEE
select left(`ventadirecta`.`Dia`,6) AS `mes`,`ventadirecta`.`C Cliente` AS `cliente`,`ventadirecta`.`C Producto` AS `producto`,`ventadirecta`.`C Delegado` AS `delegado`,sum(`ventadirecta`.`Valor Pedido`) AS `sum(``ventadirecta``.``Valor Pedido``)`,sum(`ventadirecta`.`Valor Cargo`) AS `sum(``ventadirecta``.``Valor Cargo``)`,sum(`ventadirecta`.`Valor Abono`) AS `sum(``ventadirecta``.``Valor Abono``)`,sum(`ventadirecta`.`Valor Total`) AS `sum(``ventadirecta``.``Valor Total``)`,sum(`ventadirecta`.`Unidades Pedidos Estandar`) AS `sum(``ventadirecta``.``Unidades Pedidos Estandar``)`,sum(`ventadirecta`.`Valor Descuentos`) AS `sum(``ventadirecta``.``Valor Descuentos``)` from `ventadirecta` where (left(`ventadirecta`.`Dia`,4) = '2008') group by left(`ventadirecta`.`Dia`,6),`ventadirecta`.`C Cliente`,`ventadirecta`.`C Producto`,`ventadirecta`.`C Delegado`
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

FROM ($queryVdirecta) v
join producto  on producto.`C Producto`=v.producto 
join clientes on clientes.`C Cliente`=v.cliente
join delegados on delegados.`C Delegado`=v.delegado




EEE;
		$query = $this->db->query($queryV);
		echo $this->dbutil->csv_from_result($query);

	}
	public function diesto($mens="nada")
	{
		echo "digo ".$mens;
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
