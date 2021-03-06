import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return Ember.RSVP.hash({
    question: this.store.findAll('question'),
    answers: this.store.findAll('answer'),
  });
},
  actions: {
    saveQuestion(params) {
      var newQuestion = this.store.createRecord('question', params);
      newQuestion.save();
      this.transitionTo('index');
    },
    updateQuestion(question, params) {
      Object.keys(params).forEach(function(key) {
        if(params[key]!==undefined) {
          question.set(key,params[key]);
        }
      });
      question.save();
      this.transitionTo('index');
    },
    addAnswer(question, params) {
      var newAnswer = this.store.createRecord('answer', params);
      question.get('answers').addObject(newAnswer);
      newAnswer.save().then(function() {
        return question.save();
      });
      this.transitionTo('index');
    },
    deleteAnswer(answer){
      answer.destroyRecord();
      this.transitionTo('index');
    },
    saveRating(rating, answer) {
      answer.get('ratings').pushObject(rating);
      var newAverage = (answer.get('ratings').reduce(function(a, b) { return a + b; }, 0))/(answer.get('ratings').length - 1); //-1 because ratings array is pre-seeded with a 0
      answer.set('rating', newAverage);
      answer.save()
      this.transitionTo('index');
    },
  }
});
