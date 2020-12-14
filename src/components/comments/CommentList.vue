<template>
  <div class="comment-list">
    <h3>{{ comments.length }} Comments </h3>

    <post-comment
      :type="type"
      :id="id"
      v-if="isCurrentUserApproved"
      class="mb-4"
    />

    <div class="card card-default mb-3"
      v-for="comment in comments" :key="comment.id">
      <div class="card-header d-flex justify-content-between">
        <h6 class="comment-user mb-0">
          {{ comment.user.fullName }}
          <small class="text-muted pl-2"
            :title="comment.createdOn | utcToLocal | moment('YYYY-MM-DD h:mm A')">
            {{ comment.createdOn | utcToLocal | moment('from', 'now') }}
          </small>
        </h6>
      </div>
      <div class="card-body">
        {{ comment.commentText }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import { mapActions, mapGetters } from 'vuex';
import PostComment from './PostComment.vue';

export default {
  props: {
    type: {
      type: String,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },

  components: {
    PostComment
  },

  async created() {
    await this.loadComments({ entityType: this.type, entityId: this.id });
  },

  computed: {
    ...mapFields('comments', [
      'comments'
    ]),
    ...mapGetters([
      'isCurrentUserApproved'
    ])
  },

  methods: {
    ...mapActions('comments', [
      'loadComments'
    ])
  }
}
</script>
