<template>
  <div class="wrapper">
    <h3 class="title">
      <div v-if="event.isComplete == false"  @click="completeTodo(event)">
        <div v-if="event.picked=='important'">
          <i class="checkBtn fas fa-check" style = "color:#FFBF00" aria-hidden="true"></i>
            <div class="event-title"> {{event.title }}</div>
        </div>
        <div v-else-if="event.picked == 'emergency'">
          <i class="event-checkBtn fas fa-check" style = "color:#FF0000" aria-hidden="true"></i><!--젤왼쪽 [checkbtn] -->
            <div class="title">
              {{ event.title }}
            </div>
        </div>
        <div v-else>
          <i class="event-checkBtn fas fa-check" style = "color:#62acde" aria-hidden="true"></i>
            <div class="event-title"> {{event.title }}</div>
        </div>
      </div>
      <div v-else>
        <i class="event-checkBtn fas fa-check" style = "color:#A4A4A4" 
            aria-hidden="true" @click="completeTodo(event)"></i>
          <del class="event-title">
            {{ event.title }}
          </del>
      </div>      
    </h3>
    <p class="time">{{dateTimeFormatter(Date.parse(new Date(event.date)),kor[locale].fullFormat)}}</p>
    <span class="remove" type="button" @click="removeTodo(event.id)"><!--editbnt , [휴지통] -->
        <i class="far fa-trash-alt" aria-hidden="true"></i>
    </span>
    <div v-if="event.context==''">
      <br>
    </div>
    <p class="desc">{{event.context}}
    </p>
  </div>
</template>
<script>
import kor from '../kor.js'
import { dateTimeFormatter } from '../tools.js'
import { mapGetters } from 'vuex';

export default {
  data () {
    return {
      kor
    }
  },
  props: {
    event: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    locale: {
      type: String,
      required: true
    }
  },
  methods: {
    dateTimeFormatter,         
    completeTodo(event){
      this.$store.dispatch('completeTodo', event);
    },
    removeTodo(id) {
      this.$store.dispatch('removeTodo',id);
    },
  }
}
</script>
<style>
    .desc{
      text-align: left;
    }
    .event-title{
      width: 150px;
      float: left;
      display: block;
      text-overflow:ellipsis;
      white-space:nowrap; 
      overflow:hidden;
    }
    .event-checkBtn{
      float: left;
      margin-top: 10px;
    }
   .remove {
      float: right;
      color: #de4343;
      margin-top: 6px;
   }
</style>
