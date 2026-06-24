/* src/universidad/universidad.repository.ts: */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CrearPeticion1Dto,
  RespuestaPeticion1,
} from './dto/crear-peticion-1.dto';

@Injectable()
export class UniversidadRepository {
  constructor(private readonly prisma: PrismaService) {}
  async crearCarreraConMaterias(
    datosPeticion: CrearPeticion1Dto,
  ): Promise<RespuestaPeticion1> {
    const { Carrera, Materias } = datosPeticion;
    const { NombreCarrera } = Carrera;
    return await this.prisma.$transaction(async (transaccion) => {
      const carreraCreada = await transaccion.carrera.create({
        data: {
          NombreCarrera,
        },
        select: {
          IdCarrera: true,
          NombreCarrera: true,
          Activo: true,
        },
      });

      const materiasCreadas = await Promise.all(
        Materias.map((materia) => {
          const { NombreMateria } = materia;

          return transaccion.materia.create({
            data: {
              NombreMateria,
              CarreraFK: carreraCreada.IdCarrera,
            },
            select: {
              IdMateria: true,
              NombreMateria: true,
              CarreraFK: true,
            },
          });
        }),
      );
      return {
        Mensaje: 'Carrera y Materias registradas.',
        Carrera: carreraCreada,
        Materias: materiasCreadas,
      };
    });
  }
}
