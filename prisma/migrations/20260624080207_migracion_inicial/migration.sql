-- CreateEnum
CREATE TYPE "EstadoMatricula" AS ENUM ('ACTIVA', 'INACTIVA', 'ANULADA');

-- CreateTable
CREATE TABLE "Carrera" (
    "IdCarrera" SERIAL NOT NULL,
    "NombreCarrera" TEXT NOT NULL,
    "Activo" BOOLEAN NOT NULL DEFAULT true,
    "FechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Carrera_pkey" PRIMARY KEY ("IdCarrera")
);

-- CreateTable
CREATE TABLE "Materia" (
    "IdMateria" SERIAL NOT NULL,
    "NombreMateria" TEXT NOT NULL,
    "Activo" BOOLEAN NOT NULL DEFAULT true,
    "FechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "CarreraFK" INTEGER NOT NULL,

    CONSTRAINT "Materia_pkey" PRIMARY KEY ("IdMateria")
);

-- CreateTable
CREATE TABLE "Ciclo" (
    "IdCiclo" SERIAL NOT NULL,
    "NombreCiclo" TEXT NOT NULL,
    "Activo" BOOLEAN NOT NULL DEFAULT true,
    "FechaInicio" TIMESTAMP(3),
    "FechaFin" TIMESTAMP(3),

    CONSTRAINT "Ciclo_pkey" PRIMARY KEY ("IdCiclo")
);

-- CreateTable
CREATE TABLE "Estudiante" (
    "IdEstudiante" SERIAL NOT NULL,
    "NombreEstudiante" TEXT NOT NULL,
    "ApellidoEstudiante" TEXT NOT NULL,
    "CedulaEstudiante" TEXT NOT NULL,
    "CorreoEstudiante" TEXT NOT NULL,
    "Activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Estudiante_pkey" PRIMARY KEY ("IdEstudiante")
);

-- CreateTable
CREATE TABLE "Matricula" (
    "IdMatricula" SERIAL NOT NULL,
    "EstadoMatricula" "EstadoMatricula" NOT NULL DEFAULT 'ACTIVA',
    "FechaMatricula" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "EstudianteFK" INTEGER NOT NULL,
    "CarreraFK" INTEGER NOT NULL,
    "MateriaFK" INTEGER NOT NULL,
    "CicloFK" INTEGER NOT NULL,

    CONSTRAINT "Matricula_pkey" PRIMARY KEY ("IdMatricula")
);

-- CreateTable
CREATE TABLE "Lugar" (
    "IdLugar" SERIAL NOT NULL,
    "NombreLugar" TEXT NOT NULL,
    "Capacidad" INTEGER NOT NULL,
    "Activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Lugar_pkey" PRIMARY KEY ("IdLugar")
);

-- CreateTable
CREATE TABLE "AsignacionLugar" (
    "IdAsignacionLugar" SERIAL NOT NULL,
    "FechaAsignacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "MatriculaFK" INTEGER NOT NULL,
    "LugarFK" INTEGER NOT NULL,

    CONSTRAINT "AsignacionLugar_pkey" PRIMARY KEY ("IdAsignacionLugar")
);

-- CreateTable
CREATE TABLE "Laboratorio" (
    "IdLaboratorio" SERIAL NOT NULL,
    "NombreLaboratorio" TEXT NOT NULL,
    "Capacidad" INTEGER NOT NULL,
    "Activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Laboratorio_pkey" PRIMARY KEY ("IdLaboratorio")
);

-- CreateTable
CREATE TABLE "AsignacionLaboratorio" (
    "IdAsignacionLaboratorio" SERIAL NOT NULL,
    "FechaAsignacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "LaboratorioFK" INTEGER NOT NULL,
    "MateriaFK" INTEGER NOT NULL,
    "CicloFK" INTEGER NOT NULL,

    CONSTRAINT "AsignacionLaboratorio_pkey" PRIMARY KEY ("IdAsignacionLaboratorio")
);

-- CreateIndex
CREATE UNIQUE INDEX "Carrera_NombreCarrera_key" ON "Carrera"("NombreCarrera");

-- CreateIndex
CREATE UNIQUE INDEX "Materia_NombreMateria_CarreraFK_key" ON "Materia"("NombreMateria", "CarreraFK");

-- CreateIndex
CREATE UNIQUE INDEX "Ciclo_NombreCiclo_key" ON "Ciclo"("NombreCiclo");

-- CreateIndex
CREATE UNIQUE INDEX "Estudiante_CedulaEstudiante_key" ON "Estudiante"("CedulaEstudiante");

-- CreateIndex
CREATE UNIQUE INDEX "Estudiante_CorreoEstudiante_key" ON "Estudiante"("CorreoEstudiante");

-- CreateIndex
CREATE UNIQUE INDEX "Matricula_EstudianteFK_MateriaFK_CicloFK_key" ON "Matricula"("EstudianteFK", "MateriaFK", "CicloFK");

-- CreateIndex
CREATE UNIQUE INDEX "Lugar_NombreLugar_key" ON "Lugar"("NombreLugar");

-- CreateIndex
CREATE UNIQUE INDEX "AsignacionLugar_MatriculaFK_LugarFK_key" ON "AsignacionLugar"("MatriculaFK", "LugarFK");

-- CreateIndex
CREATE UNIQUE INDEX "Laboratorio_NombreLaboratorio_key" ON "Laboratorio"("NombreLaboratorio");

-- CreateIndex
CREATE UNIQUE INDEX "AsignacionLaboratorio_LaboratorioFK_MateriaFK_CicloFK_key" ON "AsignacionLaboratorio"("LaboratorioFK", "MateriaFK", "CicloFK");

-- AddForeignKey
ALTER TABLE "Materia" ADD CONSTRAINT "Materia_CarreraFK_fkey" FOREIGN KEY ("CarreraFK") REFERENCES "Carrera"("IdCarrera") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Matricula" ADD CONSTRAINT "Matricula_EstudianteFK_fkey" FOREIGN KEY ("EstudianteFK") REFERENCES "Estudiante"("IdEstudiante") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Matricula" ADD CONSTRAINT "Matricula_CarreraFK_fkey" FOREIGN KEY ("CarreraFK") REFERENCES "Carrera"("IdCarrera") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Matricula" ADD CONSTRAINT "Matricula_MateriaFK_fkey" FOREIGN KEY ("MateriaFK") REFERENCES "Materia"("IdMateria") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Matricula" ADD CONSTRAINT "Matricula_CicloFK_fkey" FOREIGN KEY ("CicloFK") REFERENCES "Ciclo"("IdCiclo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AsignacionLugar" ADD CONSTRAINT "AsignacionLugar_MatriculaFK_fkey" FOREIGN KEY ("MatriculaFK") REFERENCES "Matricula"("IdMatricula") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AsignacionLugar" ADD CONSTRAINT "AsignacionLugar_LugarFK_fkey" FOREIGN KEY ("LugarFK") REFERENCES "Lugar"("IdLugar") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AsignacionLaboratorio" ADD CONSTRAINT "AsignacionLaboratorio_LaboratorioFK_fkey" FOREIGN KEY ("LaboratorioFK") REFERENCES "Laboratorio"("IdLaboratorio") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AsignacionLaboratorio" ADD CONSTRAINT "AsignacionLaboratorio_MateriaFK_fkey" FOREIGN KEY ("MateriaFK") REFERENCES "Materia"("IdMateria") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AsignacionLaboratorio" ADD CONSTRAINT "AsignacionLaboratorio_CicloFK_fkey" FOREIGN KEY ("CicloFK") REFERENCES "Ciclo"("IdCiclo") ON DELETE RESTRICT ON UPDATE CASCADE;
