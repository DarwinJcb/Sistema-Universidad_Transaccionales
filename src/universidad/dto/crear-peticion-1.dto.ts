/* src/universidad/dto/crear-peticion-1.dto.ts: */
export class CarreraPeticion1Dto {
    NombreCarrera!: string;
}

export class MateriaPeticion1Dto {
    NombreMateria!: string;
}

export class CrearPeticion1Dto {
    Carrera!: CarreraPeticion1Dto;
    Materias!: MateriaPeticion1Dto[];
}

export interface CarreraCreadaPeticion1 {
    IdCarrera: number;
    NombreCarrera: string;
    Activo: boolean;
}

export interface MateriaCreadaPeticion1 {
    IdMateria: number;
    NombreMateria: string;
    CarreraFK: number;
}

export interface RespuestaPeticion1 {
    Mensaje: string;
    Carrera: CarreraCreadaPeticion1;
    Materias: MateriaCreadaPeticion1[];
}
