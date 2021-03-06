import Ember from 'ember';

export default Ember.Component.extend({
  favoriteQuestions: Ember.inject.service(),
  currentQuestion: null,
  toggleUpdate: false,
  toggleAnswer: false,
  toggleQuestion: false,
  toggleFavorites: false,
  modalShowing: false,
  actions: {
    //manage questions
    newQuestion(){
      this.set('toggleAnswer', false);
      this.set('toggleUpdate', false);
      this.set('toggleQuestion', true);
      this.set('modalShowing', true);
    },
    saveQuestion(params) {
      this.sendAction('saveQuestion', params);
      this.set('modalShowing', false);
    },
    //manage updates
    toggleUpdate(question) {
      this.set('toggleUpdate', true);
      this.set('currentQuestion', question);
      this.set('toggleQuestion', false);
      this.set('toggleAnswer', false);
      this.set('modalShowing', true);
    },
    updateQuestion(params) {
      if (!this.currentQuestion.get('question') || !this.currentQuestion.get('author')) {
        alert('please fill all fields');
      } else {
        this.sendAction('updateQuestion', this.currentQuestion, params);
        this.set('toggleUpdate', false);
      }
    },
    //manage answers
    toggleAnswer(question) {
      this.set('toggleAnswer', true);
      this.set('currentQuestion', question);
      this.set('toggleQuestion', false);
      this.set('toggleUpdate', false);
      this.set('modalShowing', true);
    },
    addAnswer(params) {
      this.sendAction('addAnswer', this.currentQuestion, params);
      this.set('toggleAnswer', false);
    },
    //delete
    deleteAnswer(answer) {
      this.sendAction('deleteAnswer', answer);
    },
    deleteQuestion(question) {
      var answer_deletions = question.get('answers').map(function(question) {
        return question.destroyRecord();
      });
      Ember.RSVP.all(answer_deletions).then(function() {
        return question.destroyRecord();
      });
    },
    saveRating(rating, answer) {
      this.sendAction('saveRating',rating, answer);
    },
    closeModalDialog() {
      this.set('modalShowing', false);
    },
    toggleFavorites() {
      this.set('toggleAnswer', false);
      this.set('toggleUpdate', false);
      this.set('toggleQuestion', false);
      this.set('toggleFavorites', true)
      this.set('modalShowing', true);
    },
    showDetails(question) {
      this.set('currentQuestion', question)
    },
    backToWelcome() {
      this.set('currentQuestion', null);
    }
  }
});
