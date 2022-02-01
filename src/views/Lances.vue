<template>
    <div class="container">
        <form @submit.prevent="salvar(), listar(this.idLeilao)">
            <label>LEILÃO </label>
            <label v-if="idLeilao != null">{{this.lance.leilao.id}}</label>  
            <br>
            <label>VALOR</label>
            <input 
                type="text"
                class="input"
                placeholder="Digite o valor"
                v-model="lance.valor">
            <label>PARCIPANTE</label>

            <div class="select">
                <select v-model="lance.participante.id">
                    <option selected="selected">Selecione o participante</option>
                    <option v-for="participante in participantes" :key="participante.id" :value="participante.id">{{participante.nome}}</option>
                </select>
            </div>

            <button style="margin-top: 10px" class="button is-primary">
                    Salvar  
                <i class="material-icons left"></i>
            </button>
        </form>

        <table class="table">
            <thead>
                <tr>
                    <th>PARTICIPANTE</th>
                    <th>VALOR</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="lance of lances" :key="lance.id">
                    <td>{{ lance.participante.nome }}</td>
                    <td>{{ lance.valor }}</td>
                    <td>
                        <button @click="editar(lance), this.listar()" class="button is-success"><i class="material-icons">Editar </i></button>
                        <button @click="remover(lance), this.listar()" class="button is-danger"><i class="material-icons">Excluir </i></button>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
import Lance from '@/services/lance'
import Participante from '@/services/participante'

export default {
    data(){
        return{
            lance:{
                id: '',
                valor: '',
                participante: {
                    id: '',
                    nome: ''
                },
                leilao: {
                    id: this.$route.params.id,
                    item: ''
                }
            },
            //this.$route.params.id
            idLeilao: this.$route.params.id,
            lances:[],
            participantes:[],
            leiloes: []
        }
    },
    mounted(){
        this.listar(this.idLeilao);
        this.preencheSelectParticipante();
    },
    methods:{
        listar(idLeilao){
            Lance.listar(idLeilao).then(res => {
                this.lances = res.data;
            });
        },
        salvar(){
            if(!this.lance.id){
                Lance.salvar(this.lance);
                alert('Lance salvo com sucesso!');
                this.lance = {};
            } else {
                Lance.editar(this.lance);
                alert('Editado com sucesso!');
                this.lance = {};
            }
        },
        remover(lance){
            Lance.remover(lance);
            alert('Removido com sucesso!');
            this.listar();
        },
        editar(lance){
            this.lance = lance;
        },
        preencheSelectParticipante(){
            Participante.listar().then(res => {
                this.participantes = res.data;
            })
        }
    }
}
</script>

<style>

</style>
