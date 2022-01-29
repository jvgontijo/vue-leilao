<template>
    <div class="container">
        <form @submit.prevent="salvar(), listar()">
            <label>NOME</label>
            <input 
                type="text" 
                class="input"
                placeholder="Digite o nome"
                v-model="participante.nome">
            <label>CPF</label>
            <input 
                type="text" 
                class="input"
                placeholder="xxx.xxx.xxx-xx"
                v-model="participante.cpf">
            <label>EMAIL</label>
            <input 
                type="email"
                class="input"
                placeholder="Digite o email"
                v-model="participante.email">
            <label>TELEFONE</label>
            <input 
                type="text" 
                class="input"
                placeholder="Digite o telefone"
                v-model="participante.telefone">
            <label>DATA NASCIMENTO</label>
            <input 
                type="date"
                v-model="participante.dataNascimento">
            
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
                    <th>NOME</th>
                    <th>CPF</th>
                    <th>EMAIL</th>
                    <th>TELEFONE</th>
                    <th>DATA NASCIMENTO</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="participante of participantes" :key="participante.id">
                    <td>{{ participante.nome }}</td>
                    <td>{{ participante.cpf }}</td>
                    <td>{{ participante.email }}</td>
                    <td>{{ participante.telefone }}</td>
                    <td>{{ participante.dataNascimento }}</td>
                    <td>
                        <button @click="editar(participante), this.listar()" class="button is-success"><i class="material-icons">Editar </i></button>
                        <button @click="remover(participante), this.listar()" class="button is-danger"><i class="material-icons">Excluir </i></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

import Participante from '@/services/participante';

export default {
    data(){
        return{
            participante:{
                id: '',
                nome: '',
                cpf: '',
                email: '',
                telefone: '',
                dataNascimento: ''
            },
            participantes:[]
        }
    },
    mounted(){
        this.listar();
    },
    methods:{
        listar(){
            Participante.listar().then(res => {
                this.participantes = res.data;
            })
        },
        salvar(){
            if(!this.participante.id){
                Participante.salvar(this.participante);
                alert('Participante salvo com sucesso!');
                this.participante = {};
            } else {
                Participante.editar(this.participante);
                alert('Editado com sucesso!');
                this.participante = {};
                this.participante.id();
            }
        },
        remover(participante){
            Participante.remover(participante);
            alert('Removido com sucesso!');
            this.listar();
        },
        editar(participante){
            this.participante = participante;
        },
    }
};
</script>

<style>
</style>
