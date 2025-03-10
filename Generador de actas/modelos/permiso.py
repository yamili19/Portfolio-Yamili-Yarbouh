# Agrega estas importaciones al inicio del archivo
from sqlalchemy import  Integer, Column, String, ForeignKey, Date
from sqlalchemy.orm import relationship
from .base import Base


class Permiso(Base):
    __tablename__ = 'permiso'
    nro = Column(Integer, primary_key=True, autoincrement=True)
    dni = Column(String(20), ForeignKey('alumno.dni'), nullable=False)
    fechaPermiso = Column(Date, nullable=False)
    alumno = relationship("Alumno", back_populates="permisos")
    detalles = relationship("DetallePermiso", back_populates="permiso")

