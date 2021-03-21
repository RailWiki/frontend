<template>
  <div class="post-comment">
    <b-form @submit.prevent="postComment">
      <b-form-group label="Comment" label-for="commentInput" :label-sr-only="true">
        <b-form-textarea
          id="commentInput"
          v-model="comment"
          placeholder="Add your comment..."
          @focus="showSubmitButton"
          @blur="hideSubmitButton"
          @keyup.ctrl.enter="postComment"
        />
      </b-form-group>

      <b-button type="submit" variant="primary" v-if="showSubmit">Post</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
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
  data() {
    return {
      comment: null,
      showSubmit: false
    };
  },
  methods: {
    ...mapActions('comments', [
      'saveComment'
    ]),
    showSubmitButton() {
      this.showSubmit = true;
    },
    hideSubmitButton() {
      if (!this.comment) {
        this.showSubmit = false;
      }
    },
    async postComment() {
      await this.saveComment({
        entityType: this.type,
        entityId: this.id,
        comment: {
          text: this.comment
        }
      });

      this.reset();
    },
    reset() {
      this.comment = null;
      this.hideSubmitButton();
    }
  }
}
</script>
