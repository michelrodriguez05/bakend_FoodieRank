export const respuestaExitosa = (res, data, mensaje = "Operación exitosa") => {
    res.status(200).json({ ok: true, mensaje, data });
  };
  
  export const respuestaError = (res, error, codigo = 500) => {
    res.status(codigo).json({ ok: false, mensaje: error.message || "Error interno" });
  };
  