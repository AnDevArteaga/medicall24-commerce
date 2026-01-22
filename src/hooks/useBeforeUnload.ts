import { useState, useEffect } from 'react';

export const useBeforeUnload = () => {
  const [isDirty, setIsDirty] = useState(false);

  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    if (isDirty) {
      e.preventDefault();
      
    }
  };

  useEffect(() => {
    // Registrar el listener para el evento beforeunload
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Limpiar el listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty]); // Solo se activa cuando isDirty cambia

  return  setIsDirty;
};

