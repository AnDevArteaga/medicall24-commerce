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
    number: string;
    cvc: string;
    expMonth: string;
    expYear: string;
    cardHolder: string;
    financialInstitutionCode: number
    installments: number
    paymentDescription: string,
    phoneNumber: string,
    type: string,
    userLegalId: string,
    userLegalIdType: string,
    userType: string,
}

export interface CustomPaymentData extends Omit<PurchaseData, 'departament' | 'city'> { // Estos no los requiero para pagar, pero si para el registro de la compra`
  PaymentMethod: PaymentMethodData; 
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



