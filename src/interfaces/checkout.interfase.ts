export interface PurchaseData {
        identification: string;
        typeId: string;
        names: string;
        lastNames: string;
        email: string;
        address: string;
        phone: string;
        departament: string;
        city: string;
}

export interface PaymentMethodData {
  card: {
    number: string;
    cvc: string;
    expMonth: string;
    expYear: string;
    cardHolder: string;
  }
    financialInstitutionCode: string
    installments: string
    paymentDescription: string,
    phoneNumber: string,
    type: string,
    userLegalId: string,
    userLegalIdType: string,
    userType: string,
}

export interface CustomPaymentData extends Omit<PurchaseData, 'departament' | 'city'> { // Estos no los requiero para pagar, pero si para el registro de la compra`
  paymentMethod: PaymentMethodData; 
  discount: number;
  productId: number;
}

export interface registerPurchase {
  id_transaccion: string,
  id_usuario_medicall: number,
  id_aliado: number,
  id_codigo_promo: number,
  id_gestor: number,
  id_producto: number,
  porcentaje_comision_gestor: number,
  identificacion_comprador: string,
  nombre_comprador: string,
  email_comprador: string,
  direccion_comprador: string,
  telefono_comprador: string,
  ciudad_comprador: string,
  departamento_comprador: string,
  fecha_compra: string,
  metodo_pago: string,
  subtotal: number,
  iva: number,
  comision_transaccion: number,
  total: number,
  total_centavos: number,
  fecha_pago: string,
  descripcion_compra: string,
  estado_transaccion: string,
  ip_transaccion: string,
  compra_cancelada: boolean,
  id_cita_medicall: number,
  estado_cuenta: boolean,
  tipopersona_factura: number,
  tipoid_factura: string,
  numid_factura: string,
  dv_factura: string,
  nombre_factura: string,
  direccion_factura: string,
  correo_factura: string,
  pais_factura: string,
  num_factura: string,
  envio_factura: boolean,
  producto: string,
  nombre_institucion: string,
  telefono_institucio: string,
  direccion_institucion: string,
  ciudad_institucion: string,
  dpto_institucion: string,
  pais_institucion: string,
  link_ayuda: string,
  link_terminos: string,
  link_pasos: string,
}


export interface BankPse {
  financial_institution_code: string;
  financial_institution_name: string;
}

export interface CreditData {
  meddipayAuthorizationCode: string;
}


export interface detailsPayment {
  paymentMethod: string;
  description: string | null;
  valor: number | string;
  descuento: number;
  subtotal: number;
  iva: number | string;
  commission: number | string;
  total: number | string;
}

export interface CreditUser {
  id: number,
  identificacion_usuario: string,
  id_producto: number,
  codigo_credito: string,
  codigo_plataforma_credito: number,
  validado: boolean
}

