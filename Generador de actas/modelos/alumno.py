# Agrega estas importaciones al inicio del archivo
from sqlalchemy import  Integer, Column, String, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from .base import Base
class Alumno(Base):
    __tablename__ = 'alumno'
    dni = Column(String(20), primary_key=True)
    nombre = Column(String(100), nullable=False)
    modalidad = Column(String(50), nullable=False)
    permisos = relationship("Permiso", back_populates="alumno")