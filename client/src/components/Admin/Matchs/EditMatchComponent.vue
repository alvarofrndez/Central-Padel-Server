<script setup>
import { adminStore } from "../../../stores/Admin/admin";
import { adminMatchStore } from "../../../stores/Admin/adminMatch";
import { authentificationStore } from "../../../stores/authentification";
import { ref } from "vue";

// stores
var admin = adminStore();
var adminMatch = adminMatchStore();
var authentification = authentificationStore();

// variables
var search_text = ref("");
var filter_users = ref([]);


// functions
adminMatch.getMatchById(admin.actual_component.props);
authentification.getAllUsers();

// edit the match in the database
function editMatch() {
  // call the function editMatch from the store adminMatch
  adminMatch.editMatch();
}

// filter the users by the search text of the variable search_text
function filterUsers() {
  filter_users.value = authentification.users.filter((user) => {
    return user.email.toLowerCase().includes(search_text.value.toLowerCase());
  });
}

// add a player to the variable current_match of the store adminMatch. Only add to the client until edit button is pressed
function addUserToMatch(email) {
  // call the function addUserToMatch from the store adminMatch
  //
  // email: email of the player to add
  adminMatch.addUserToMatch(email);
}

// delete a player from the variable current_match of the store adminMatch. Only delete from the client until edit button is pressed
function deletePlayer(index) {
  // call the function deletePlayer from the store adminMatch
  //
  // index: index of the player to delete

  adminMatch.deletePlayer(index);
}
</script>


<template>
  <div class="global-container">
    <button class="go-back" v-on:click="admin.changeSubcomponent('home')">
      <v-icon name="bi-arrow-return-left" class="icon" scale="2" />
    </button>
    <div class="container-data" v-if="adminMatch.current_match">
      <div>
        <label>Dia</label>
        <input type="text" v-model="adminMatch.current_match.date" placeholder="22/04/23">
      </div>
      <div>
        <label>Hora</label>
        <input type="text" v-model="adminMatch.current_match.hour" placeholder="16:45">
      </div>
      <div>
        <label>Pista</label>
        <input type="text" v-model="adminMatch.current_match.court" placeholder="3">
      </div>
      <div class="container-players">
        <div v-for="player of adminMatch.current_match.players">
          <label>Jugador {{ adminMatch.current_match.players.indexOf(player) + 1 }}</label>
          <input type="text" v-model="player.email" placeholder="seleccione un jugador...">
          <v-icon class="delete" v-on:click="deletePlayer(adminMatch.current_match.players.indexOf(player))"
            name="bi-trash-fill" scale="2"></v-icon>
        </div>
      </div>
      <input type="text" v-model="search_text" @input="filterUsers()" placeholder="Buscar jugador...">
      <ul>
        <li v-if="search_text != ''" v-for="user of filter_users" v-on:click="addUserToMatch(user.email)"
          :key="user.email">
          {{ user.email }}
        </li>
      </ul>
      <button v-on:click="editMatch()">Guardar</button>
    </div>
  </div>
</template>


<style lang="scss" scoped>
@import "@/assets/styles.scss";

.global-container {
  // display
  @include flexbox(column, center, center, 3.5rem);

  .go-back {
    @include goBackButton();
  }

  .container-data{
    // size
    width: 40%;

    // display
    @include flexbox(column, center, center, 1.5rem);

    div{
      // display
      @include flexbox(row);
      justify-content: space-between;

      label{
        // decoration
        font-weight: bold;
      }

      label, input{
        // size
        width: 50%;
      }
    }

    .container-players{
      // display
      @include flexbox(column);
      justify-content: space-between;

      div{
        // display
        @include flexbox(row);
        justify-content: space-between;

        label, input{
          // size
          width: 50%;
        }

        .delete{
          cursor: pointer;
        }
      }
    }

    ul{
      // display
      @include flexbox(column, flex-start, center, .5rem);

      // decoration
      list-style: none;

      li{
        // size
        width: 100%;

        // margin
        padding: 10px;

        // decoration
        background-color: $h-c-gray;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
           // decoration
          background-color: $h-c-gray-shade;
        }

        &:active {
           // decoration
          background-color: $h-c-white-shade;
        }
      }
    }

    button{
      @include button();
      // size
      width: 20%;
    }

    @media screen and (max-width: 800px) {
      // size
      width: 60%;
    }

    @media screen and (max-width: 500px) {
      // size
      width: 80%;
    }
  }
}
</style>