import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    toggleUpdate(question) {
      this.sendAction('toggleUpdate', question);
    },
    toggleAnswer(question) {
      this.sendAction('toggleAnswer', question);
    },
    deleteAnswer(answer) {
      this.sendAction('deleteAnswer', answer);
    },
    deleteQuestion(question) {
      this.sendAction('deleteQuestion', question);
    },
    showDetails(question) {
      this.toggleProperty('showDetails', question);
    },
    saveRating(rating, answer) {
      this.sendAction('saveRating',rating, answer);
    },
  }
});
