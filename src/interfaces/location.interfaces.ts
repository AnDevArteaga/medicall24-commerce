// Interfaz para representar un Departamento
export interface Department {
    id: string; // El ID del departamento, debe ser una cadena
    nombre: string; // El nombre del departamento
  }


// Interfaz para representar un Municipio
export interface Municipality {
    id: number; // El ID del municipio, debe ser un número
    codMunicipio: string; // El código del municipio
    departmentId: string; // El ID del departamento al que pertenece
    nombre: string; // El nombre del municipio
    department: Department | null; // El departamento al que pertenece, puede ser nulo si no está asociado
  }
  