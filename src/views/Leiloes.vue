<template>
    <div class="container">

        <form @submit.prevent="salvar(), listar()">
          
          <label>ITEM</label>
          <input v-validate="'required'" id="fieldItem" name="fieldItem" class="input" type="text" placeholder="Digite o nome do item" required v-model="leilao.item" >
          <span v-show="errors.has('fieldItem')">ERRO</span>
          <label>DATA ABERTURA</label>
          <input v-validate="'before:beforeTarget'" name="before_field" class="input" type="date" required v-model="leilao.dataAbertura" >
          <label>DATA ENCERRAMENTO</label>
          <input name="before_field_target" ref="beforeTarget" class="input" type="date" required v-model="leilao.dataFechamento" >
          
          <label>LANCE MINIMO</label>
          <input class="input" type="text" placeholder="Valor minimo dos lances" required v-model="leilao.lanceMinimo">
          
          <label>SITUAÇÃO</label>
          <br>
          <div class="select">
                <select v-model="leilao.situacao">
                    <option v-for="situacao in situacoes" v-bind:key="situacao">{{situacao}}</option>
                </select>
            </div>
          <br>
          <button style="margin-top: 10px" class="button is-primary">Salvar<i class="material-icons left"></i></button>
        </form>


        <table class="table">
            <thead>
                <tr>
                    <th>ITEM</th>
                    <th>DATA ABERTURA</th>
                    <th>DATA FECHAMENTO</th>
                    <th>LANCE MINIMO</th>
                    <th>SITUAÇÃO</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="leilao of leiloes" :key="leilao.id">
                    <td>{{ leilao.item }}</td>
                    <td>{{ leilao.dataAbertura }}</td>
                    <td>{{ leilao.dataFechamento }}</td>
                    <td>{{ leilao.lanceMinimo }}</td>
                    <td>{{ leilao.situacao }}</td>
                    <td>
                        <router-link
                            class="mr-3"
                            :to="{ name: 'lances', params: { id: leilao.id } }"
                            >
                            <button class="button is-link">Dar Lances</button>
                            </router-link>
                        <button @click="editar(leilao), this.listar()" class="button is-success"><i class="material-icons">Editar</i></button>
                        <button @click="remover(leilao), this.listar()" class="button is-danger"><i class="material-icons">Excluir</i></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import Leilao from '@/services/leilao'

export default {
    data(){
        return {
            leilao:{
                id: '',
                item: '',
                dataAbertura: '',
                lanceMinimo: '',
                lanceMaximo: '',
                dataFechamento: '',
                situacao: '',
            },
            leiloes:[],
            situacoes: ['INATIVO', 'EXPIRADO', 'ABERTO', 'FECHADO']
        }
    },
    mounted(){
        this.listar();
    },
    methods:{
        listar(){
            Leilao.listar().then(res => {
                this.leiloes = res.data;
            })
        },
        salvar(){
            if(!this.leilao.id){
                Leilao.salvar(this.leilao);
                alert('Salvo com sucesso!');
                this.leilao = {};
            } else {
                Leilao.editar(this.leilao);
                alert('Editado com sucesso!');
                this.leilao = {}
                this.leilao.id();
            }
        },
        editar(leilao){
            this.leilao = leilao;
        },
        remover(leilao){
            Leilao.remover(leilao);
            alert('Removido com sucesso');
            this.listar();
        },
        validaData(){

        }
        // function compararDataInicioLeilao(data){
            //var data = new Date();
            //var dia = String(data.getDate()).padStart(2, '0');
            //var mes = String(data.getMonth() + 1).padStart(2, '0');
            //var ano = data.getFullYear();
            //dataAtual = ano + '-' + mes + '-' + dia;
            //if(data.value<dataAtual){
            // 		alert("A data que vc inseriu e antiga, atualize");
            //}
        // }

        // function compararDataFimLeilao(dataInicio,dataFechamento){
            // 	if(dataInicio.value>dataFechamento.value){
            // 	console.log(dataInicio,dataFechamento);
            // 		alert("A data que vc inseriu antecede a data de incio, por favor Corrija!");
        // 	}
        // }
    }
}
</script>

<style>
.button{
    margin-left: 5px;
    margin-right: 5px;
}
</style>
