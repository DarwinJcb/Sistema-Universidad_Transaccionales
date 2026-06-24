/* src/universidad/dto/crear-peticion-3.dto.ts: */
export class LaboratorioPeticion3Dto {
    NombreLaboratorio!: string;
    Activo!: boolean;
}

export class CicloPeticion3Dto {
    IdCiclo!: number;
}

export class MatriculaPeticion3Dto {
    IdMatricula!: number;
}

export class MateriaPeticion3Dto {
    IdMateria!: number;
}

export class CrearPeticion3Dto {
    Laboratorio!: LaboratorioPeticion3Dto;
    Ciclo!: CicloPeticion3Dto;
    Matricula!: MatriculaPeticion3Dto;
    Materia!: MateriaPeticion3Dto;
}

export interface LaboratorioCreadoPeticion3 {
    IdLaboratorio: number;
    NombreLaboratorio: string;
    Activo: boolean;
    CicloFK: number;
    MatriculaFK: number;
    MateriaFK: number;
}

export interface CicloValidadoPeticion3 {
    IdCiclo: number;
    NombreCiclo: string;
    Activo: boolean;
}

export interface MatriculaValidadaPeticion3 {
    IdMatricula: number;
    EstadoMatricula: string;
    LugarAsignado: string;
    EstudianteFK: number;
    CarreraFK: number;
    CicloFK: number;
}

export interface MateriaValidadaPeticion3 {
    IdMateria: number;
    NombreMateria: string;
    Activo: boolean;
}

export interface RespuestaPeticion3 {
    Mensaje: string;
    Laboratorio: LaboratorioCreadoPeticion3;
    Ciclo: CicloValidadoPeticion3;
    Matricula: MatriculaValidadaPeticion3;
    Materia: MateriaValidadaPeticion3;
}