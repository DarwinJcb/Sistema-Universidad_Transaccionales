/* src/universidad/universidad.repository.ts: */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CrearPeticion1Dto,
  RespuestaPeticion1,
} from './dto/crear-peticion-1.dto';
import {
  CrearPeticion2Dto,
  RespuestaPeticion2,
} from './dto/crear-peticion-2.dto';

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

  async crearCicloEstudiantesMatriculas(
    datosPeticion: CrearPeticion2Dto,
  ): Promise<RespuestaPeticion2> {
    const { Ciclo, Carrera, Estudiantes, Matricula } = datosPeticion;
    const { NombreCiclo, Activo: CicloActivo } = Ciclo;
    const { IdCarrera } = Carrera;
    const { LugarAsignado } = Matricula;

    return await this.prisma.$transaction(async (transaccion) => {
      const carreraExistente = await transaccion.carrera.findUnique({
        where: {
          IdCarrera,
        },
        select: {
          IdCarrera: true,
          NombreCarrera: true,
          Activo: true,
        },
      });

      if (!carreraExistente) {
        throw new NotFoundException(
          `No existe una carrera con el ID ${IdCarrera}`,
        );
      }

      const cicloCreado = await transaccion.ciclo.create({
        data: {
          NombreCiclo,
          Activo: CicloActivo,
        },
        select: {
          IdCiclo: true,
          NombreCiclo: true,
          Activo: true,
        },
      });

      const estudiantesCreados = await Promise.all(
        Estudiantes.map((estudiante) => {
          const {
            NombreEstudiante,
            ApellidoEstudiante,
            CedulaEstudiante,
            CorreoEstudiante,
            Activo: EstudianteActivo,
          } = estudiante;

          return transaccion.estudiante.create({
            data: {
              NombreEstudiante,
              ApellidoEstudiante,
              CedulaEstudiante,
              CorreoEstudiante,
              Activo: EstudianteActivo,
            },
            select: {
              IdEstudiante: true,
              NombreEstudiante: true,
              ApellidoEstudiante: true,
              CedulaEstudiante: true,
              CorreoEstudiante: true,
              Activo: true,
            },
          });
        }),
      );

      const matriculasCreadas = await Promise.all(
        estudiantesCreados.map((estudianteCreado) => {
          const { IdEstudiante } = estudianteCreado;

          return transaccion.matricula.create({
            data: {
              EstadoMatricula: 'ACTIVA',
              LugarAsignado,
              EstudianteFK: IdEstudiante,
              CarreraFK: carreraExistente.IdCarrera,
              CicloFK: cicloCreado.IdCiclo,
            },
            select: {
              IdMatricula: true,
              EstadoMatricula: true,
              LugarAsignado: true,
              EstudianteFK: true,
              CarreraFK: true,
              CicloFK: true,
            },
          });
        }),
      );

      return {
        Mensaje: 'Ciclo, estudiantes y matrículas activas registradas.',
        Ciclo: cicloCreado,
        Carrera: carreraExistente,
        Estudiantes: estudiantesCreados,
        Matriculas: matriculasCreadas,
      };
    });
  }
}
