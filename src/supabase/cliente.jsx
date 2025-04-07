import { createClient } from "@supabase/supabase-js";


export const supabase = createClient(import.meta.env.VITE_SUPABASE_URL,
                                    import.meta.env.VITE_SUPABASE_ANON_KEY)


// Las dos variables de arriba es donde he guardado la URL y la API Key de supabase
// Se guarda en variables de entorno en un archivo .env que en git de donde me he traido el proyecto estan invisibles

