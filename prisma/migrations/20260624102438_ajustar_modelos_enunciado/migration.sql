/*
  Warnings:

  - You are about to drop the column `Capacidad` on the `Laboratorio` table. All the data in the column will be lost.
  - You are about to drop the column `MateriaFK` on the `Matricula` table. All the data in the column will be lost.
  - You are about to drop the `AsignacionLaboratorio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AsignacionLugar` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Lugar` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[NombreLaboratorio,CicloFK,MatriculaFK,MateriaFK]` on the table `Laboratorio` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[EstudianteFK,CarreraFK,CicloFK]` on the table `Matricula` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `CicloFK` to the `Laboratorio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `MateriaFK` to the `Laboratorio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `MatriculaFK` to the `Laboratorio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LugarAsignado` to the `Matricula` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AsignacionLaboratorio" DROP CONSTRAINT "AsignacionLaboratorio_CicloFK_fkey";

-- DropForeignKey
ALTER TABLE "AsignacionLaboratorio" DROP CONSTRAINT "AsignacionLaboratorio_LaboratorioFK_fkey";

-- DropForeignKey
ALTER TABLE "AsignacionLaboratorio" DROP CONSTRAINT "AsignacionLaboratorio_MateriaFK_fkey";

-- DropForeignKey
ALTER TABLE "AsignacionLugar" DROP CONSTRAINT "AsignacionLugar_LugarFK_fkey";

-- DropForeignKey
ALTER TABLE "AsignacionLugar" DROP CONSTRAINT "AsignacionLugar_MatriculaFK_fkey";

-- DropForeignKey
ALTER TABLE "Matricula" DROP CONSTRAINT "Matricula_MateriaFK_fkey";

-- DropIndex
DROP INDEX "Laboratorio_NombreLaboratorio_key";

-- DropIndex
DROP INDEX "Matricula_EstudianteFK_MateriaFK_CicloFK_key";

-- AlterTable
ALTER TABLE "Laboratorio" DROP COLUMN "Capacidad",
ADD COLUMN     "CicloFK" INTEGER NOT NULL,
ADD COLUMN     "MateriaFK" INTEGER NOT NULL,
ADD COLUMN     "MatriculaFK" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Matricula" DROP COLUMN "MateriaFK",
ADD COLUMN     "LugarAsignado" TEXT NOT NULL;

-- DropTable
DROP TABLE "AsignacionLaboratorio";

-- DropTable
DROP TABLE "AsignacionLugar";

-- DropTable
DROP TABLE "Lugar";

-- CreateIndex
CREATE UNIQUE INDEX "Laboratorio_NombreLaboratorio_CicloFK_MatriculaFK_MateriaFK_key" ON "Laboratorio"("NombreLaboratorio", "CicloFK", "MatriculaFK", "MateriaFK");

-- CreateIndex
CREATE UNIQUE INDEX "Matricula_EstudianteFK_CarreraFK_CicloFK_key" ON "Matricula"("EstudianteFK", "CarreraFK", "CicloFK");

-- AddForeignKey
ALTER TABLE "Laboratorio" ADD CONSTRAINT "Laboratorio_CicloFK_fkey" FOREIGN KEY ("CicloFK") REFERENCES "Ciclo"("IdCiclo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Laboratorio" ADD CONSTRAINT "Laboratorio_MatriculaFK_fkey" FOREIGN KEY ("MatriculaFK") REFERENCES "Matricula"("IdMatricula") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Laboratorio" ADD CONSTRAINT "Laboratorio_MateriaFK_fkey" FOREIGN KEY ("MateriaFK") REFERENCES "Materia"("IdMateria") ON DELETE RESTRICT ON UPDATE CASCADE;
