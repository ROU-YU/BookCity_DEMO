<template>
  <Card dis-hover class="card">
    <h1 class="to-do-list">{{ $t('to_do_list') }}</h1>
    <span class="center">
      <Button
        size="large"
        class="center-btn"
        :type="type === 'all' ? 'primary' : 'default'"
        @click="changeType('all')"
      >
        {{ $t('all') }}
        <Badge
          type="normal"
          :count="allCount"
        />
      </Button>
      <Button
        size="large"
        class="center-btn"
        :type="type === 'process' ? 'primary' : 'default'"
        @click="changeType('process')"
      >
        {{ $t('process') }}
        <Badge
          :type="type === 'process' ? 'normal' : 'error'"
          :count="processCount"
        />
      </Button>
      <Button
        size="large"
        :type="type === 'completed' ? 'primary' : 'default'"
        @click="changeType('completed')"
      >
        {{ $t('completed') }}
        <Badge
          type="normal"
          :count="completedCount"
        />
      </Button>
    </span>
    <Input
      v-model="newList"
      class="input"
      :placeholder="$t('plz_type_to_do_list')"
      @keydown.enter="addToDo(newList)"
    />
    <Row
      v-for="(obj, index) in toDoListData"
      :key="`list-${index}`"
      flex
      justify="space-around"
      align="middle"
      class="row"
    >
      <Col span="1">
        <Checkbox
          v-model="obj.completed"
          @on-change="changeListState(obj.id , index, $event)"
        />
      </Col>
      <Col span="17">
        <span
          v-if="!obj.isEdit"
          :class="[obj.completed ? 'isComplete' : '']"
        >
          {{ obj.title }}
        </span>
        <span>
          <Input
            v-if="obj.isEdit"
            :placeholder="obj.title"
            v-model="obj.title"
            @keydown.enter="handleEditList(obj.id, index, $event.target._value)"
          />
        </span>
      </Col>
      <Col span="5">
        <Button
          v-if="!(obj.isEdit || obj.completed)"
          type="warning"
          class="edit-btn"
          @click="handleEdit(index)"
        >
          <Icon
            type="md-create"
            size="20"
          />
        </Button>
        <Button
          type="error"
          @click="handleDelete(obj.id)"
        >
          <Icon
            type="ios-trash"
            size="20"
          />
        </Button>
      </Col>
    </Row>
  </Card>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'toDoList',
  components: {},
  data () {
    return {
      newList: '',
      type: 'all'
    }
  },
  computed: {
    ...mapState({
      'toDoList': state => state.toDoList.toDoList
    }),
    ...mapGetters([
      'allCount',
      'processCount',
      'completedCount',
      'processList',
      'completeList'
    ]),
    toDoListData () {
      if (this.type === 'all') {
        return this.toDoList
      } else if (this.type === 'process') {
        return this.processList
      } else if (this.type === 'completed') {
        return this.completeList
      }
    }
  },
  methods: {
    ...mapActions([
      'getToDoList',
      'addToDoList',
      'editToDoList',
      'deleteToDoList'
    ]),
    addToDo (value) {
      this.$store.dispatch("addToDoList", value)
    },
    handleEditList (id, index, _value) {
      this.$store.dispatch("editToDoList", { id, index, _value })
    },
    changeListState (id, index, status) {
      this.$store.dispatch("changeToDoListState", { id, index, status})
    },
    handleEdit (index) {
      //觸發編輯畫面
      this.toDoList[index].isEdit = true
    },
    handleDelete (id) {
      this.$store.dispatch("deleteToDoList", id)
    },
    changeType (name) {
      this.type = name
    }
  },
  mounted() {
    this.getToDoList()
  }
}
</script>

<style scoped>
.card {
  width: 700px;
  margin: 15px auto 20px auto;
}

.to-do-list {
  font-size: 40px;
  margin: 0 0 10px 0;
  text-align: center;
  height: 50px;
}

.input {
  margin-bottom: 15px; 
}

.row {
  margin-bottom: 5px;
  height: 60px;
}

.edit-btn {
  margin-right: 10px;
}

.isComplete {
  text-decoration: line-through;
}

.center {
  text-align: center;
  display:block;
  height: 90px;
}

.center-btn {
  margin-right: 15px;
}
</style>
