// hooks/useApiRequest.js
import { useState } from 'react';
import Swal from 'sweetalert2';

const useApiRequest = () => {
  const [isLoading, setIsLoading] = useState(false);

  const makeRequest = async ({
    url,
    method = 'GET',
    data = null,
    headers = {},
    confirm,
    loading,
    success,
    error,
    onSuccess = () => {},
    onError = () => {},
  }) => {
    try {
      if (confirm) {
        const result = await Swal.fire({
          title: confirm.title || '¿Estás seguro?',
          text: confirm.text || '',
          icon: confirm.icon || 'question',
          showCancelButton: true,
          confirmButtonColor: '#28a745',
          cancelButtonColor: '#d33',
          confirmButtonText: confirm.confirmButtonText || 'Sí, continuar',
          cancelButtonText: confirm.cancelButtonText || 'Cancelar',
          reverseButtons: true,
        });

        if (!result.isConfirmed) return;
      }

      if (loading) {
        Swal.fire({
          title: loading.title || 'Procesando...',
          html: loading.html || '',
          allowOutsideClick: false,
          showConfirmButton: false,
          didOpen: () => Swal.showLoading(),
        });
      }

      setIsLoading(true);

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: data ? JSON.stringify(data) : null,
      });

      Swal.close();
      setIsLoading(false);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Error en la solicitud.');
      }

      const responseData = await response.json().catch(() => ({}));

      if (success) {
        await Swal.fire({
          icon: 'success',
          title: success.title || 'Éxito',
          text: success.text || '',
          confirmButtonColor: '#28a745',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }

      onSuccess(responseData);
      return responseData;

    } catch (err) {
      Swal.close();
      setIsLoading(false);

      await Swal.fire({
        icon: 'error',
        title: (error && error.title) || 'Error',
        text: err.message || (error && error.text) || 'Ocurrió un problema inesperado.',
        confirmButtonColor: '#d33',
        footer: (error && error.footer) || '',
      });

      onError(err);
    }
  };

  return { makeRequest, isLoading };
};

export default useApiRequest;
