
export interface Institution {
    id_institucion: string;
    nombre_prestador: string;
    num_identificacion: string;
    tipo_identificacion: string;
    estado: boolean;
    id_departamento: number;
    id_municipio: number;
    id_aliado: number;
    id_gestor: number;
    cover?: string;
}

export interface Sede {
    id: string;
    name: string;
    address: string;
    phone: string;
    municipality: {
        nombre: string;
    };
    department: {
        nombre: string;
    };
}

export interface Professional {
    id: string;
    user: {
        avatar?: string;
        name1: string;
        name2?: string;
        lastname1: string;
        lastname2?: string;
    };
}

export interface DayAvailable {
    date: string;
    fecha: string; // visible string for UI
    specialty?: string;
    time: string[];
}

export interface HourAvailable {
    fecha: string;
}
