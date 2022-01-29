import { http } from "./config"

export default {
    listar:()=>{
        return http.get('lances')
    },

    salvar:(lance) =>{
        return http.post('lance', lance);
    },

    editar:(lance) => {
        return http.put('lance', lance)
    },

    remover:(lance) => {
        return http.delete('lance',{data:lance})
    }
    
}