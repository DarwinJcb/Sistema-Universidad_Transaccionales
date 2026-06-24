/* src/universidad/universidad.controller.ts: */
import { Body, Controller, Post } from '@nestjs/common';
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
import { UniversidadService } from './universidad.service';

@Controller('universidad')
export class UniversidadController {
  constructor(private readonly universidadService: UniversidadService) {}

  @Post('peticion-1')
  async crearPeticion1(
    @Body() datosPeticion: CrearPeticion1Dto,
  ): Promise<RespuestaPeticion1> {
    const { Carrera, Materias } = datosPeticion;

    return await this.universidadService.crearPeticion1({
      Carrera,
      Materias,
    });
  }

  @Post('peticion-2')
  async crearPeticion2(
    @Body() datosPeticion: CrearPeticion2Dto,
  ): Promise<RespuestaPeticion2> {
    const { Ciclo, Carrera, Estudiantes, Matricula } = datosPeticion;

    return await this.universidadService.crearPeticion2({
      Ciclo,
      Carrera,
      Estudiantes,
      Matricula,
    });
  }

  @Post('peticion-3')
  async crearPeticion3(
    @Body() datosPeticion: CrearPeticion3Dto,
  ): Promise<RespuestaPeticion3> {
    const { Laboratorio, Ciclo, Matricula, Materia } = datosPeticion;

    return await this.universidadService.crearPeticion3({
      Laboratorio,
      Ciclo,
      Matricula,
      Materia,
    });
  }
}
