/* src/universidad/universidad.controller.ts: */
import { Body, Controller, Post } from '@nestjs/common';
import {
  CrearPeticion1Dto,
  RespuestaPeticion1,
} from './dto/crear-peticion-1.dto';
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
}
