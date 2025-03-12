import { Pagination, PaginationItem } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PropTypes from "prop-types"; // Para tipar los props

const Paginacion = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  // Calculamos el número de páginas basado en el total de ítems y los ítems por página
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <Pagination
      count={totalPages} // Número total de páginas
      page={currentPage} // Página actual
      onChange={(_, page) => onPageChange(page)} // Callback para manejar el cambio de página
      renderItem={(item) => (
        <PaginationItem
          slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }} // Íconos personalizados
          {...item}
          sx={{
            backgroundColor: "#f8bbd0", // Color de fondo del número de cada página
            "&:hover": {
              backgroundColor: "#f48fb1", // Color al pasar el mouse
            },
            "&.Mui-selected": {
              backgroundColor: "#e91e63", // Color para la página seleccionada
              fontSize: "large", // Tamaño grande para el número
            },
          }}
        />
      )}
    />
  );
};

Paginacion.propTypes = {
  totalItems: PropTypes.number.isRequired, // Total de elementos a paginar
  itemsPerPage: PropTypes.number.isRequired, // Cantidad de elementos por página
  currentPage: PropTypes.number.isRequired, // Página actual
  onPageChange: PropTypes.func.isRequired, // Callback cuando cambie de página
};

export default Paginacion;
