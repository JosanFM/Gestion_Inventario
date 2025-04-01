import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(process.meta.REACT_APP_SUPABASE_URL, 
                                     process.meta.REACT_APP_SUPABASE_ANON_KEY
        )
