# Agrega estas importaciones al inicio del archivo
from sqlalchemy import  Integer, Column, String, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship, backref
from .base import Base


class Materia(Base):
    __tablename__ = 'materia'
    __table_args__ = (
        UniqueConstraint('nombre', 'modalidad', name='u_nombre_modalidad'),
    )
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(255), nullable=False)
    modalidad = Column(String(50), nullable=False)
    correlativa = Column(Integer, ForeignKey('materia.id'), nullable=True)  # <- Nombre real: "correlativa"
    
    # Relaciones
    detalles = relationship("DetallePermiso", back_populates="materia_rel")  # <- Coincide con materia_rel
    correlativas = relationship(
        'Materia',
        backref=backref('correlativa_de', remote_side=[id]),
        foreign_keys=[correlativa]  # <- Usar "correlativa" directamente
    )
