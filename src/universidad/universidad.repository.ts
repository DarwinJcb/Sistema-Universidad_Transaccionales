/* src/universidad/universidad.repository.ts: */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
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

  async asignarLaboratorio(
    datosPeticion: CrearPeticion3Dto,
  ): Promise<RespuestaPeticion3> {
    const { Laboratorio, Ciclo, Matricula, Materia } = datosPeticion;
    const { NombreLaboratorio, Activo: LaboratorioActivo } = Laboratorio;
    const { IdCiclo } = Ciclo;
    const { IdMatricula } = Matricula;
    const { IdMateria } = Materia;

    return await this.prisma.$transaction(async (transaccion) => {
      const cicloExistente = await transaccion.ciclo.findFirst({
        where: {
          IdCiclo,
          Activo: true,
        },
        select: {
          IdCiclo: true,
          NombreCiclo: true,
          Activo: true,
        },
      });

      if (!cicloExistente) {
        throw new NotFoundException(
          `No existe un ciclo activo con el ID ${IdCiclo}`,
        );
      }

      const matriculaExistente = await transaccion.matricula.findFirst({
        where: {
          IdMatricula,
          EstadoMatricula: 'ACTIVA',
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

      if (!matriculaExistente) {
        throw new NotFoundException(
          `No existe una matrícula activa con el ID ${IdMatricula}`,
        );
      }
      if (matriculaExistente.CicloFK !== cicloExistente.IdCiclo) {
        throw new BadRequestException(
          `La matrícula con ID ${IdMatricula} no pertenece al ciclo con ID ${IdCiclo}`,
        );
      }

      const materiaExistente = await transaccion.materia.findUnique({
        where: {
          IdMateria,
        },
        select: {
          IdMateria: true,
          NombreMateria: true,
          Activo: true,
        },
      });

      if (!materiaExistente) {
        throw new NotFoundException(
          `No existe una materia con el ID ${IdMateria}`,
        );
      }

      const laboratorioCreado = await transaccion.laboratorio.create({
        data: {
          NombreLaboratorio,
          Activo: LaboratorioActivo,
          CicloFK: cicloExistente.IdCiclo,
          MatriculaFK: matriculaExistente.IdMatricula,
          MateriaFK: materiaExistente.IdMateria,
        },
        select: {
          IdLaboratorio: true,
          NombreLaboratorio: true,
          Activo: true,
          CicloFK: true,
          MatriculaFK: true,
          MateriaFK: true,
        },
      });

      return {
        Mensaje: 'Laboratorio asignado correctamente.',
        Laboratorio: laboratorioCreado,
        Ciclo: cicloExistente,
        Matricula: matriculaExistente,
        Materia: materiaExistente,
      };
    });
  }
}
