import { http } from "./config"

export default {
    listar:(id)=>{
        return http.get('lances/' + id)
    },

    salvar:async (lance) =>{
        try {
            return http.post('lance', lance);
        } catch (e) {
            this.errors.push(e);
        }
    },

    editar:(lance) => {
        return http.put('lance', lance)
    },

    remover:(lance) => {
        return http.delete('lance',{data:lance})
    }
    
}