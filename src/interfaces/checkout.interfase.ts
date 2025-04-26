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
  valor: number;
  descuento: number;
  subtotal: number;
  iva: number;
  commission: number;
  total: number;
}

export interface CreditUser {
  id: number,
  identificacion_usuario: string,
  id_producto: number,
  codigo_credito: string,
  codigo_plataforma_credito: number,
  validado: boolean
}

