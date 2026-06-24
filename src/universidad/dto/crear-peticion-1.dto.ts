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