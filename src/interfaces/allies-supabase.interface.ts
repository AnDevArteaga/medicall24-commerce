export interface Ally {
    estado: boolean;
    id_aliado: number;
    id_departamento: number;
    id_gestor: number;
    id_institucion: number;
    id_municipio: number;
    nombre_departamento?: string;
    nombre_municipio?: string
    nombre_prestador: string;
    num_identificacion: string;
    tipo_identificacion: string;
    cover?: string;
  }

/** Respuesta de GET Institutions/GetInstitution/:id (campos extra opcionales según API) */
export interface InstitutionResponse {
  institution: {
    cover?: string;
    address?: string;
    phone1?: string;
    banner?: string;
    bannerUrl?: string;
    avatar?: string;
    photo?: string;
    name?: string;
    [key: string]: unknown;
  };
}