/* src/universidad/universidad.service.ts: */
import { Injectable } from '@nestjs/common';
import {
  CrearPeticion1Dto,
  RespuestaPeticion1,
} from './dto/crear-peticion-1.dto';
import { UniversidadRepository } from './universidad.repository';

@Injectable()
export class UniversidadService {
  constructor(private readonly universidadRepository: UniversidadRepository) {}

  async crearPeticion1(
    datosPeticion: CrearPeticion1Dto,
  ): Promise<RespuestaPeticion1> {
    const { Carrera, Materias } = datosPeticion;

    return await this.universidadRepository.crearCarreraConMaterias({
      Carrera,
      Materias,
    });
  }
}
