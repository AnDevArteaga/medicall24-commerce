export interface Ally {
    estado: boolean;
    id_aliado: number;
    id_departamento: number;
    id_gestor: number;
    id_institucion: number;
    id_municipio: number;
    nombre_prestador: string;
    num_identificacion: string;
    tipo_identificacion: string;
    cover?: string;
  }

export interface InstitutionResponse {
    institution: {
      cover: string;
    };
  }