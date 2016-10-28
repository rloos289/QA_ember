import Ember from 'ember';

export default Ember.Component.extend({
  currentQuestion: null,
  switchToUpdate: false,
  currentAnswer: null,
  toggleAnswer: false,
  actions: {
    saveQuestion(params) {
      this.sendAction('saveQuestion', params);
    },
    //manage updates
    switchToUpdate(question) {
      console.log('3');
      this.set('switchToUpdate', true);
      this.set('currentQuestion', question);
    },
    updateQuestion(params) {
      this.sendAction('updateQuestion', this.currentQuestion, params);
      this.set('showUpdateComment', false);
    },
    //manage answers
    toggleAnswer(answer) {
      this.set('toggleAnswer', true);
      this.set('currentAnswer', answer);
    }
  }
});