// useScript.js
import { useEffect } from 'react';

const useScript = (url, callback) => {
  useEffect(() => {
    // Definir la función de inicialización en window para asegurar su disponibilidad global
    window.googleTranslateElementInit = callback;

    const script = document.createElement('script');
    script.src = url;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      // Limpieza: remover la función de window para evitar posibles errores o fugas de memoria
      delete window.googleTranslateElementInit;
    };
  }, [url, callback]);
};

export default useScript;
