# Agrega estas importaciones al inicio del archivo
from sqlalchemy import  Integer, Column, String, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base


class DetallePermiso(Base):
    __tablename__ = 'detalle_permiso'
    
    id_permiso = Column(Integer, ForeignKey('permiso.nro'), primary_key=True)
    materia = Column(Integer, ForeignKey('materia.id'), primary_key=True)  # <- Nombre real: "materia"
    curso = Column(String(20))
    condicion = Column(String(20))
    nota = Column(Integer)
    
    # Relaciones
    materia_rel = relationship("Materia", back_populates="detalles")  # <- Usar otro nombre para la relación
    permiso = relationship("Permiso", back_populates="detalles")