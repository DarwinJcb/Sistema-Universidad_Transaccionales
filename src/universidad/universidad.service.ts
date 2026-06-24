/* src/universidad/universidad.service.ts: */
import { Injectable } from '@nestjs/common';
import {
    CrearPeticion1Dto,
    RespuestaPeticion1,
} from './dto/crear-peticion-1.dto';
import {
    CrearPeticion2Dto,
    RespuestaPeticion2,
} from './dto/crear-peticion-2.dto';
import {
    CrearPeticion3Dto,
    RespuestaPeticion3,
} from './dto/crear-peticion-3.dto';
import { UniversidadRepository } from './universidad.repository';

@Injectable()
export class UniversidadService {
    constructor(private readonly universidadRepository: UniversidadRepository) { }

    async crearPeticion1(
        datosPeticion: CrearPeticion1Dto,
    ): Promise<RespuestaPeticion1> {
        const { Carrera, Materias } = datosPeticion;
        return await this.universidadRepository.crearCarreraConMaterias({
            Carrera,
            Materias,
        });
    }

    async crearPeticion2(
        datosPeticion: CrearPeticion2Dto,
    ): Promise<RespuestaPeticion2> {
        const { Ciclo, Carrera, Estudiantes, Matricula } = datosPeticion;

        return await this.universidadRepository.crearCicloEstudiantesMatriculas({
            Ciclo,
            Carrera,
            Estudiantes,
            Matricula,
        });
    }

    async crearPeticion3(
        datosPeticion: CrearPeticion3Dto,
    ): Promise<RespuestaPeticion3> {
        const { Laboratorio, Ciclo, Matricula, Materia } = datosPeticion;

        return await this.universidadRepository.asignarLaboratorio({
            Laboratorio,
            Ciclo,
            Matricula,
            Materia,
        });
    }
}
