<template>
    <div class="container">
        <form @submit.prevent="salvar(), listar()">
            <label>LEILÃO</label>
            <div class="select">
                <select v-model="lance.leilao.id">
                    <option selected="selected">Selecione o leilão</option>
                    <option v-for="leilao in leiloes" :key="leilao.id" :value="leilao.id">{{leilao.item}}</option>
                </select>
            </div>
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

            <button 
                style="margin-top: 10px" 
                class="button is-primary">
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
import Leilao from '@/services/leilao'
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
                    id: '',
                    item: ''
                }
            },
            lances:[],
            participantes:[],
            leiloes: []
        }
    },
    mounted(){
        this.listar();
        this.preencheSelectParticipante();
        this.preencheSelectLeilao();
    },
    methods:{
        listar(){
            Lance.listar().then(res => {
                this.lances = res.data;
            })
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
        },
        preencheSelectLeilao(){
            Leilao.listar().then(res => {
                this.leiloes = res.data;
            })
        }
    }
}
</script>

<style>

</style>
