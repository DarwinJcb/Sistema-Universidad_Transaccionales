/* src/universidad/dto/consultas-derivadas.dto.ts */
export interface MateriaConsultaDerivada {
  IdMateria: number;
  NombreMateria: string;
  Activo: boolean;
  CarreraFK: number;
}

export interface CarreraConMateriasConsultaDerivada {
  IdCarrera: number;
  NombreCarrera: string;
  Activo: boolean;
  Materias: MateriaConsultaDerivada[];
}

export interface RespuestaCarrerasConMaterias {
  Mensaje: string;
  Carreras: CarreraConMateriasConsultaDerivada[];
}

export interface EstudianteConsultaDerivada {
  IdEstudiante: number;
  NombreEstudiante: string;
  ApellidoEstudiante: string;
  CedulaEstudiante: string;
  CorreoEstudiante: string;
}

export interface CarreraConsultaDerivada {
  IdCarrera: number;
  NombreCarrera: string;
}

export interface CicloConsultaDerivada {
  IdCiclo: number;
  NombreCiclo: string;
  Activo: boolean;
}

export interface LaboratorioConsultaDerivada {
  IdLaboratorio: number;
  NombreLaboratorio: string;
  Activo: boolean;
  MateriaFK: number;
}

export interface MatriculaActivaConsultaDerivada {
  IdMatricula: number;
  EstadoMatricula: string;
  LugarAsignado: string;
  Estudiante: EstudianteConsultaDerivada;
  Carrera: CarreraConsultaDerivada;
  Ciclo: CicloConsultaDerivada;
  Laboratorios: LaboratorioConsultaDerivada[];
}

export interface RespuestaMatriculasActivas {
  Mensaje: string;
  Matriculas: MatriculaActivaConsultaDerivada[];
}
