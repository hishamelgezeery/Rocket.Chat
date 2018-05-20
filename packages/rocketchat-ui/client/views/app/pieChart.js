Template.chart.helpers({
  visible: function() {
    var smileCount = RocketChat.getUserPreference(user(), 'smileMoodCount') ? RocketChat.getUserPreference(user(), 'smileMoodCount') : 0;  
    var sadCount = RocketChat.getUserPreference(user(), 'sadMoodCount') ? RocketChat.getUserPreference(user(), 'sadMoodCount') : 0;                      
    var neutralCount = RocketChat.getUserPreference(user(), 'neutralMoodCount') ? RocketChat.getUserPreference(user(), 'neutralMoodCount') : 0;                      
    var confusedCount = RocketChat.getUserPreference(user(), 'confusedMoodCount') ? RocketChat.getUserPreference(user(), 'confusedMoodCount') : 0;                      
    
    if(smileCount == 0 &&
       sadCount == 0 &&
       neutralCount == 0 &&
       confusedCount == 0){
         return false;
       }
       return true;
    }
});

function user(){
  if (Meteor.user() == null && RocketChat.settings.get('Accounts_AllowAnonymousRead')) {
    return {
      username: 'anonymous',
      status: 'online'
    };
  }

  const user = Meteor.user() || {};
  
  return user;
}

Template.chart.rendered = function(){


  var moods = [];
  var values = [];
  var smileCount = RocketChat.getUserPreference(user(), 'smileMoodCount') ? RocketChat.getUserPreference(user(), 'smileMoodCount') : 0;  
  var sadCount = RocketChat.getUserPreference(user(), 'sadMoodCount') ? RocketChat.getUserPreference(user(), 'sadMoodCount') : 0;                      
  var neutralCount = RocketChat.getUserPreference(user(), 'neutralMoodCount') ? RocketChat.getUserPreference(user(), 'neutralMoodCount') : 0;                      
  var confusedCount = RocketChat.getUserPreference(user(), 'confusedMoodCount') ? RocketChat.getUserPreference(user(), 'confusedMoodCount') : 0;                      

  if(smileCount !== 0){
    moods.push('happy');
    values.push(smileCount);
  }
  if(sadCount !== 0){
    moods.push('sad');
    values.push(sadCount);
  }
  if(neutralCount !== 0){
    moods.push('neutral');
    values.push(neutralCount);
  }
  if(confusedCount !== 0){
    moods.push('confused');
    values.push(confusedCount);
  }

  var data = {
    series: values
  };
  new Chartist.Pie('.ct-chart', data, {
    chartPadding: 0,
    labelOffset: 0,
    width: 200,
    height: 200,
    labelDirection: 'neutral',
    labelInterpolationFnc: function(value, idx) {
      return moods[idx] + ':' + value;
    }
  });
  
}