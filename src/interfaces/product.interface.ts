export interface CodeXProduct {
    cod_promo: string;
    compra_maxima: number;
    cuenta_compra: number;
    estado_producto: string;
    fecha_fin: string;
    fecha_inicio: string;
    id_aliado: number;
    id_codigo: number;
    id_gestor: number;
    id_producto: number;
    id_producto_pago: number;
    porcentaje_gestor: number;
    procentaje_descuento_compra: number;
    producto: string;
    valor_cop: number;
  }
  
  export interface Product {
    id_producto: number;
    nombre: string;
    valor_cop: number;
    iva: number;
  }