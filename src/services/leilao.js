import { http } from "./config"

export default {
    listar:()=>{
        return http.get('leiloes')
    },

    salvar:(leilao) =>{
        return http.post('leilao', leilao);
    },

    editar:(leilao) => {
        return http.put('leilao', leilao)
    },

    remover:(leilao) => {
        return http.delete('leilao',{data:leilao})
    }

}