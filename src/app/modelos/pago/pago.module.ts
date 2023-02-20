export interface Pago {
    pag_descripcion: string;
    pag_costo: number;
  }
  
  export interface Alicuota {
    ali_descripcion: string;
    ali_costo: number;
    pagos: Pago[];
  }

  export interface PagoById {
  pag_id: number;
  pag_descripcion: string;
  pag_costo: number;
  ali_descripcion: string;
  ali_id: number;
  ali_costo: number;
  }