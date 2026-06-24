/* src/universidad/universidad.service.ts: */
import { BadRequestException, Injectable, NotFoundException, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RespuestaCarrerasConMaterias, RespuestaMatriculasActivas, } from './dto/consultas-derivadas.dto';
import { CrearPeticion1Dto, RespuestaPeticion1, } from './dto/crear-peticion-1.dto';
import { CrearPeticion2Dto, RespuestaPeticion2, } from './dto/crear-peticion-2.dto';
import { CrearPeticion3Dto, RespuestaPeticion3, } from './dto/crear-peticion-3.dto';

@Injectable()
export class UniversidadService {
    constructor(private readonly prisma: PrismaService) { }

    async crearPeticion1( // Funcion Asíncrona #1
        datosPeticion: CrearPeticion1Dto,
    ): Promise<RespuestaPeticion1> {
        const { Carrera, Materias } = datosPeticion; // Desestructuración de objetos #1
        const { NombreCarrera } = Carrera; // Desestructuración de objetos #1
        return await this.prisma.$transaction(async (transaccion) => { // Operacion Transaccional #1
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

    async crearPeticion2( // Funcion Asíncrona #2
        datosPeticion: CrearPeticion2Dto,
    ): Promise<RespuestaPeticion2> {
        const { Ciclo, Carrera, Estudiantes, Matricula } = datosPeticion; // Desestructuración de objetos #2
        const { NombreCiclo, Activo: CicloActivo } = Ciclo; // Desestructuración de objetos #2
        const { IdCarrera } = Carrera;
        const { LugarAsignado } = Matricula;

        return await this.prisma.$transaction(async (transaccion) => { // Operacion Transaccional #2
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
                        NombreEstudiante, ApellidoEstudiante, CedulaEstudiante, CorreoEstudiante, Activo: EstudianteActivo,
                    } = estudiante;

                    return transaccion.estudiante.create({
                        data: {
                            NombreEstudiante, ApellidoEstudiante, CedulaEstudiante, CorreoEstudiante, Activo: EstudianteActivo,
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
                Mensaje: 'Ciclo, Estudiantes y Matrículas activas registradas.',
                Ciclo: cicloCreado,
                Carrera: carreraExistente,
                Estudiantes: estudiantesCreados,
                Matriculas: matriculasCreadas,
            };
        });
    }

    async crearPeticion3( // Funcion Asíncrona #3
        datosPeticion: CrearPeticion3Dto,
    ): Promise<RespuestaPeticion3> {
        const { Laboratorio, Ciclo, Matricula, Materia } = datosPeticion; // Desestructuración de objetos #3
        const { NombreLaboratorio, Activo: LaboratorioActivo } = Laboratorio; // Desestructuración de objetos #3
        const { IdCiclo } = Ciclo;
        const { IdMatricula } = Matricula;
        const { IdMateria } = Materia;

        return await this.prisma.$transaction(async (transaccion) => { // Operacion Transaccional #3
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
                    `No existe una Matrícula activa con el ID ${IdMatricula}`,
                );
            }

            if (matriculaExistente.CicloFK !== cicloExistente.IdCiclo) {
                throw new BadRequestException(
                    `La Matrícula con ID ${IdMatricula} no pertenece al ciclo con ID ${IdCiclo}`,
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
                    `No existe una Materia con el ID ${IdMateria}`,
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

    async consultarCarrerasConMaterias(): Promise<RespuestaCarrerasConMaterias> { // Funcion Asíncrona #4
        const carreras = await this.prisma.carrera.findMany({
            where: {
                Activo: true,
            },
            select: {
                IdCarrera: true,
                NombreCarrera: true,
                Activo: true,
                Materias: {
                    where: {
                        Activo: true,
                    },
                    select: {
                        IdMateria: true,
                        NombreMateria: true,
                        Activo: true,
                        CarreraFK: true,
                    },
                    orderBy: {
                        NombreMateria: 'asc',
                    },
                },
            },
            orderBy: {
                NombreCarrera: 'asc',
            },
        });

        return {
            Mensaje: 'Consulta derivada de carreras con materias activas.',
            Carreras: carreras,
        };
    }

    async consultarMatriculasActivas(): Promise<RespuestaMatriculasActivas> { // Funcion Asíncrona #5
        const matriculas = await this.prisma.matricula.findMany({
            where: {
                EstadoMatricula: 'ACTIVA',
            },
            select: {
                IdMatricula: true,
                EstadoMatricula: true,
                LugarAsignado: true,
                Estudiante: {
                    select: {
                        IdEstudiante: true,
                        NombreEstudiante: true,
                        ApellidoEstudiante: true,
                        CedulaEstudiante: true,
                        CorreoEstudiante: true,
                    },
                },
                Carrera: {
                    select: {
                        IdCarrera: true,
                        NombreCarrera: true,
                    },
                },
                Ciclo: {
                    select: {
                        IdCiclo: true,
                        NombreCiclo: true,
                        Activo: true,
                    },
                },
                Laboratorios: {
                    select: {
                        IdLaboratorio: true,
                        NombreLaboratorio: true,
                        Activo: true,
                        MateriaFK: true,
                    },
                },
            },
            orderBy: {
                IdMatricula: 'asc',
            },
        });

        return {
            Mensaje: 'Consulta derivada de matrículas activas.',
            Matriculas: matriculas,
        };
    }
}
