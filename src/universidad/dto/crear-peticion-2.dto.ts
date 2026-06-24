/* src/universidad/dto/crear-peticion-2.dto.ts: */
export class CicloPeticion2Dto {
    NombreCiclo!: string;
    Activo!: boolean;
}

export class CarreraPeticion2Dto {
    IdCarrera!: number;
}

export class EstudiantePeticion2Dto {
    NombreEstudiante!: string;
    ApellidoEstudiante!: string;
    CedulaEstudiante!: string;
    CorreoEstudiante!: string;
    Activo!: boolean;
}

export class MatriculaPeticion2Dto {
    LugarAsignado!: string;
}

export class CrearPeticion2Dto {
    Ciclo!: CicloPeticion2Dto;
    Carrera!: CarreraPeticion2Dto;
    Estudiantes!: EstudiantePeticion2Dto[];
    Matricula!: MatriculaPeticion2Dto;
}

export interface CicloCreadoPeticion2 {
    IdCiclo: number;
    NombreCiclo: string;
    Activo: boolean;
}

export interface CarreraValidadaPeticion2 {
    IdCarrera: number;
    NombreCarrera: string;
    Activo: boolean;
}

export interface EstudianteCreadoPeticion2 {
    IdEstudiante: number;
    NombreEstudiante: string;
    ApellidoEstudiante: string;
    CedulaEstudiante: string;
    CorreoEstudiante: string;
    Activo: boolean;
}

export interface MatriculaCreadaPeticion2 {
    IdMatricula: number;
    EstadoMatricula: string;
    LugarAsignado: string;
    EstudianteFK: number;
    CarreraFK: number;
    CicloFK: number;
}

export interface RespuestaPeticion2 {
    Mensaje: string;
    Ciclo: CicloCreadoPeticion2;
    Carrera: CarreraValidadaPeticion2;
    Estudiantes: EstudianteCreadoPeticion2[];
    Matriculas: MatriculaCreadaPeticion2[];
}
