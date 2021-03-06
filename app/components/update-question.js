import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    updateQuestion(params) {
       params = {
        question: this.get('question'),
        author: this.get('author'),
      };
      this.sendAction('updateQuestion', params);
    },
    newQuestion(){
      this.sendAction('newQuestion');
    }
  }
});
