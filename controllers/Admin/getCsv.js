const User = require("../../models/user");

const fs = require('fs');
const readline = require('readline');
const { id } = require("../../models/question");

let quesList=    {
  "Register_1_Question": "1. What is the main reason why you have come to the hospital?",
  "Register_2_Question": "2. How do you feel today? (you may select more than one icon that best describes how you feel)",
  "Register_3_Question": "3. How is your spirituality relevant to your mental health?",
  "Register_4_Question": "4. How does spirituality relate to your mental health? (select all that apply)",
  "Set1_Question_1": "How old are you?",
  "Set1_Question_2": "How do you describe yourself? (please pick one)",
  "Set1_Question_3": "What sex were you assigned at birth, such as on an original birth certificate?",
  "Set1_Question_4": "Do you consider yourself to be-",
  "Set1_Question_5": "Which category best describes you? (You may select more than one)",
  "Set2_Question_1": "Over the last two weeks, how often have you been bothered by... Feeling nervous, anxious, or on edge",
  "Set2_Question_2": "Over the last two weeks, how often have you been bothered by... Not being able to stop or control worrying",
  "Set2_Question_3": "Over the last two weeks, how often have you been bothered by... Worrying too much about different things",
  "Set2_Question_4": "Over the last two weeks, how often have you been bothered by... Trouble relaxing",
  "Set2_Question_5": "Over the last two weeks, how often have you been bothered by... Being so restless that it is hard to sit still",
  "Set2_Question_6": "Over the last two weeks, how often have you been bothered by... Becoming easily annoyed or irritable",
  "Set2_Question_7": "Over the last two weeks, how often have you been bothered by... Feeling afraid, as if something awful might happen",
  "Set2_Question_8": "If you checked any problems, how difficult have they made it for you to do your work, take care of things at home, or get along with other people?",
  "Set3_Question_1": "Over the last two weeks, how often have you been bothered by... Little interest or pleasure in doing things",
  "Set3_Question_2": "Over the last two weeks, how often have you been bothered by... Feeling down, depressed, or hopeless",
  "Set3_Question_3": "Over the last two weeks, how often have you been bothered by... Trouble falling or staying asleep, or sleeping too much",
  "Set3_Question_4": "Over the last two weeks, how often have you been bothered by... Feeling tired or having little energy",
  "Set3_Question_5": "Over the last two weeks, how often have you been bothered by... Poor appetite or overeating",
  "Set3_Question_6": "Over the last two weeks, how often have you been bothered by... Feeling bad about yourself or that you are a failure or have let yourself or your family down",
  "Set3_Question_7": "Over the last two weeks, how often have you been bothered by... Trouble concentrating on things, such as watching television or reading the newspaper",
  "Set3_Question_8": "Over the last two weeks, how often have you been bothered by... Moving or speaking so slowly that other people could have noticed. Or being so fidgety or restless that you have been moving around a lot more than usual",
  "Set3_Question_9": "Over the last two weeks, how often have you been bothered by... Thoughts that you would be better off dead, or of hurting yourself",
  "Set3_Question_10": "If you checked any problems, how difficult have they made it for you to do your work, take care of things at home, or get along with other people?",
  "Set4_Question_1": "During the last 12 months, how many days did you Drink more than a few sips of beer, wine, or any drink containing alcohol? Put “0” if none.",
  "Set4_Question_2": "During the last 12 months, how many days did you Use any marijuana (weed, oil, or hash, by smoking, vaping, or in food) or “synthetic marijuana” (like “K2,” “Spice”) or “vaping” THC oil? Put “0” if none.",
  "Set4_Question_3": "During the last 12 months, how many days did you Use anything else to get high (like other illegal drugs, prescription or over-the-counter medications, and things that you sniff, huff, or vape )? Put “0” if none.",
  "Set4_Question_4": "Have you ever ridden in a CAR driven by someone (including yourself) who was “high” or had been using alcohol or drugs?",
  "Set4_Question_5": "Do you ever use alcohol or drugs to RELAX, feel better about yourself,or fit in?",
  "Set4_Question_6": "Do you ever use alcohol or drugs while you are by yourself, or ALONE?",
  "Set4_Question_7": "Do you ever FORGET things you did while using alcohol or drugs?",
  "Set4_Question_8": "Do your FAMILY or FRIENDS ever tell you that you should cut down on your drinking or drug use?",
  "Set4_Question_9": "Have you ever gotten into any TROUBLE while you were using alcohol or drugs?",
  "Set5_Question_1": "How important is spirituality to you?",
  "Set5_Question_2": "How important is religion to you?",
  "Set5_Question_3": "Do you want to talk about spiritual/ religious issues in treatment?",
  "Set5_Question_4": "Do you believe in God/ Higher Power?",
  "Set5_Question_5": "Are you active in a faith community or congregation?",
  "Set5_Question_6": "Does your spirituality/ religion help you to cope?",
  "Set5_Question_7": "Do you feel punished by God/ Higher Power?",
  "Set5_Question_8": "Do you question God’s/ Higher Power’s love for you?",
  "Set5_Question_9": "Does your spirituality/religion make it harder to cope?",
  "Set5_Question_10": "What is your religious affiliation (if any)?",
  "Set5_Question_11": "How often do you attend church or other religious services?",
  "Set5_Question_12": "How often do you spend time in private religious activities, such as prayer, meditation or Bible study?",
  "Set6_Question_1": "How much or how frequently have you...Looked for a stronger connection with God.",
  "Set6_Question_2": "How much or how frequently have you...Sought God’s love and care.",
  "Set6_Question_3": "How much or how frequently have you...Sought help from God in letting go of my anger.",
  "Set6_Question_4": "How much or how frequently have you...Tried to put my plans into action together with God.",
  "Set6_Question_5": "How much or how frequently have you...Tried to see how God might be trying to strengthen me in this situation.",
  "Set6_Question_6": "How much or how frequently have you...Asked forgiveness for my sins.",
  "Set6_Question_7": "How much or how frequently have you...Focused on religion to stop worrying about my problems.",
  "Set6_Question_8": "How much or how frequently have you...Wondered whether God had abandoned me.",
  "Set6_Question_9": "How much or how frequently have you...Felt punished by God for my lack of devotion.",
  "Set6_Question_10": "How much or how frequently have you...Wondered what I did for God to punish me.",
  "Set6_Question_11": "How much or how frequently have you...Questioned God’s love for me.",
  "Set6_Question_12": "How much or how frequently have you...Wondered whether my church had abandoned me.",
  "Set6_Question_13": "How much or how frequently have you...Decided the devil made this happen",
  "Set6_Question_14": "How much or how frequently have you...Questioned the power of God.",
  "Lesson1_Question_1": "How would you rate your mood right now?",
  "Lesson1_Question_2": "Can you tell us why you picked this lesson?",
  "Lesson1_Question_3": "Please watch this lesson video. ",
  "Lesson1_Question_4": "Please select one belief that may be helpful to focus on in your treatment",
  "Lesson1_Question_5": "Could you please describe how believing that Nothing is permanent could be relevant to the symptoms you are experiencing?",
  "Lesson1_Question_6": "Please describe how you could  use the belief, Nothing is permanent, as a coping statement going forward?",
  "Lesson1_Question_7": "You did it! How do you feel after this lesson?",
  "Lesson2_Question_1": "How would you rate your mood right now?",
  "Lesson2_Question_2": "Can you tell us why you picked this lesson?",
  "Lesson2_Question_3": "Please watch this lesson video. ",
  "Lesson2_Question_4": "Please select one activity that may be helpful to focus on your treatment",
  "Lesson2_Question_5": "Could you please describe how believing that doing good deeds could be relevant to the symptoms you are experiencing?",
  "Lesson2_Question_6": "Is there anyway you could use doing good deeds, as a coping strategy each day going forward? Please describe below.",
  "Lesson2_Question_7": "You did it! How do you feel after this lesson?",
  "Lesson3_Question_1": "How would you rate your mood right now?",
  "Lesson3_Question_2": "Can you tell us why you picked this lesson?",
  "Lesson3_Question_3": "Please watch this lesson video. ",
  "Lesson3_Question_4": "Please select one Spiritual/ Religious struggle that you are currently experiencing",
  "Lesson3_Question_5": "How may your struggles with Moral injury – Feeling conflicted: Did I break my moral code? be relevant to your symptoms?",
  "Lesson3_Question_6": "[Please identify one individual you can approach to discuss these struggles within the next week, Could you talk a bit more about how you could contact the person and why you think talking with them could help?]",
  "Lesson3_Question_7": "You did it! How do you feel after this lesson?",
  "Lesson4_Question_1": "How would you rate your mood right now?",
  "Lesson4_Question_2": "Can you tell us why you picked this lesson?",
  "Lesson4_Question_3": "Please watch this lesson video. ",
  "Lesson4_Question_4": "There are many types of prayer. Which of these did you do last week?",
  "Lesson4_Question_5": "There are many ways to pray. Which of these did you do last week?",
  "Lesson4_Question_6": "Do you pray in times of Joy? Sadness? Anxiety? Pain? Select all that apply",
  "Lesson4_Question_7": "When you pray...What happens to your mental health?",
  "Lesson4_Question_8": "Does praying make you feel more...Anxious and obsessed",
  "Lesson4_Question_9": "Does praying make you feel more...Hopeless or depressed",
  "Lesson4_Question_10": "Does praying make you feel more...Ashamed or guilty?",
  "Lesson4_Question_11": "Does praying make you feel more...Disconnected from reality?",
  "Lesson4_Question_12": "Does praying make you feel more...Focused and alert?",
  "Lesson4_Question_13": "Does praying make you feel more...Meaningful and purposeful?",
  "Lesson4_Question_14": "Does praying make you feel more...Calm and peaceful?",
  "Lesson4_Question_15": "Does praying make you feel more...Happy and hopeful?",
  "Lesson4_Question_16": "Having gone through this module, are there better ways you can use prayer to cope with your mental health (e.g., what you pray for, and when/how you pray)?",
  "Lesson4_Question_17": "You did it! How do you feel after this lesson?",
  "Lesson5_Question_1": "How would you rate your mood right now?",
  "Lesson5_Question_2": "Can you tell us why you picked this lesson?",
  "Lesson5_Question_3": "Please watch this lesson video. ",
  "Lesson5_Question_4": "Who/what would you like to consider forgiving? Please select one.",
  "Lesson5_Question_5": "Please indicate where in the process of forgiving Myself  ?",
  "Lesson5_Question_6": "Right now you are establishing a new normal, what could you do start to move to the next stage of forgiveness of further establishing a new normal?",
  "Lesson5_Question_7": "You did it! How do you feel after this lesson?",
  
 
}



/**
 * This method check wheter a element from valuesToSplit is in listOfreqValue.
 * 
 * If Element is container_> prefix+element=YES
 * Finally if any element is left then it is added at the end
 * 
 * prefix_> string
 * listOfReqValues=List
 * values to split_> Array converted to string by .toStringMethod
 * listOfNames->(Optional) Incase you need to substitutes values visible in listOfReqValues
 * 
 *  */
const getSubdivisionsOfChoice=(prefix,listOfreqValues,valueToSplit,listOfNames=undefined)=>{
  if(listOfNames==undefined){
    listOfNames=listOfreqValues
  }

  val=valueToSplit.split(", ")
  obj={}
  console.log(listOfreqValues,val)
  listOfreqValues.forEach((e,i)=>{
    if(val.includes(e)){
      obj[`${prefix}_${listOfNames[i]}`]="YES"
    }else{
      
      obj[`${prefix}_${listOfNames[i]}`]="NO"

    }
  })

  if(valueToSplit.includes("Comtemplatively")){

    obj["Les4_Comtemplatively"]="YES"
    val=[]
  }
  

  val = val.filter(item => !listOfreqValues.includes(item))
  if(val.length>0){
    if(prefix==="Register_2"){
      return obj;
    }
    obj[`${prefix}_Others`]=val.toString();
  }
  return obj
}
/**
 * This method check wheter a element from values is in listOfreqValue.
 * But only change is that this methodd donot split values. Instead it checks it as whole
 * If Element is container_> prefix+element=YES
 * Finally if any element is left then it is added at the end
 * 
 * prefix_> string
 * listOfReqValues=List
 * values to split_> String
 * listOfNames-> what names do you wish to substitute
 * 
 *  */
const getSubdivisionsOfChoiceBySingleString=(prefix,listOfreqValues,stringToCheck,listOfNames=undefined)=>{
  if(listOfNames===undefined){
    listOfNames=listOfreqValues
  }

  obj={}
  console.log(listOfreqValues,val)
  listOfreqValues.forEach((e,i)=>{
    if(stringToCheck.includes(e)){
      obj[`${prefix}_${listOfNames[i]}`]="YES"
    }else{
      
      obj[`${prefix}_${listOfNames[i]}`]="NO"

    }
  })

 
  


  return obj
}



/**
 * 
 * @param {String AnsToProcess} 
 * @returns String
 */
function preprocessEntryAns(ans){
  
  return ans === undefined ? "" : ans.toString().split("\n").join(" ");
}

function computeSetEntries(ans){
  let decrementByone=(x)=>{
    if(x==undefined || x===""){
      return x;
    }
    return eval(x)-1;
  }
  let GAD7_Severity=(score)=>{
    if(score<=4){
      return "Minimal Anxiety"
    }
    if(score<=9){
      return "Mild Anxiety"
    }
    if(score<=14){
      return "Moderate Anxiety"
    }
    return "Severe Anxiety";
  }
  let GAD7_score=0;
  let GAD7_ScoreExist=false;
  for(let i=1;i<=7;i++){
    ans[`Set2_Answer_${i}`]=decrementByone(ans[`Set2_Answer_${i}`]);
    if(ans[`Set2_Answer_${i}`]!==undefined && ans[`Set2_Answer_${i}`].toString()!=="" ){
      GAD7_score+=eval(ans[`Set2_Answer_${i}`]);
      GAD7_ScoreExist=true;
    }
  }
  if(GAD7_ScoreExist){
  ans["GAD7_TotalScore"]=GAD7_score;
  ans["GAD7_Severity"]=GAD7_Severity(GAD7_score);
  }
  let PHQ9_Severity=(score)=>{
    if(score<=4){
      return "None"
    }
    if(score<=9){
      return "Mild Depression"
    }
    if(score<=14){
      return "Moderate Depression"
    }
    if(score<=19){
      return "Moderately Severe Depression"
    }
    return "Severe Depression";
  }
  let PHQ9_TotalScore=0;
  let PHQ9_Score_Exist=false;
  for(let i=1;i<=9;i++){
    ans[`Set3_Answer_${i}`]=decrementByone(ans[`Set3_Answer_${i}`]);
    if(ans[`Set3_Answer_${i}`]!==undefined && ans[`Set3_Answer_${i}`].toString()!=="" ){
      PHQ9_TotalScore+=eval(ans[`Set3_Answer_${i}`]);
      PHQ9_Score_Exist=true;
    }
  }
  if(PHQ9_Score_Exist){
  ans["PHQ9_TotalScore"]=PHQ9_TotalScore;
  ans["PHQ9_Severity"]=PHQ9_Severity(PHQ9_TotalScore);
  }

  let Parity_determiner=(x)=>{
    if(x===undefined || x===""){
      return x;
    }
    if(x.toUpperCase()=="YES"){
      return 1;
    }else{
      return 0;
    }
  }
  let CRAFFT_Score=0;
  let CRAFFT_Score_Exist=false;
  for(let i=4;i<=9;i++){
    ans[`Set4_Answer_${i}_Num`]=Parity_determiner(ans[`Set4_Answer_${i}`]);
    if(ans[`Set4_Answer_${i}_Num`]!==undefined && ans[`Set4_Answer_${i}`].toString()!=="" ){
      CRAFFT_Score+=eval(ans[`Set4_Answer_${i}_Num`]);
      CRAFFT_Score_Exist=true;
    }


  }
  if(CRAFFT_Score_Exist){
  ans["CRAFFT_Score"]=CRAFFT_Score;
}

let HINSPIRE_POS=0;
let HINSPIRE_NEG=0;
let HINSPIRE_Exist=false;
for(let i=4;i<=6;i++){
  if(ans[`Set5_Answer_${i}`] !==undefined && ans[`Set5_Answer_${i}`].toString()!=="" ){
    HINSPIRE_Exist=true;
    HINSPIRE_POS+=eval(ans[`Set5_Answer_${i}`]);
  }
}

for(let i=7;i<=9;i++){
  if(ans[`Set5_Answer_${i}`]!==undefined && ans[`Set5_Answer_${i}`].toString()!=="" ){
    HINSPIRE_Exist=true;
    HINSPIRE_NEG+=eval(ans[`Set5_Answer_${i}`]);
  }
}

if(HINSPIRE_Exist){
ans["HINSPIRE_POS"]=HINSPIRE_POS;
ans["HINSPIRE_NEG"]=HINSPIRE_NEG;
}



  let Rcope_Pos=0;
  let Rcope_Neg=0;
  let RcopeEntryExist=false;
  for(let i=1;i<=7;i++){
    if(ans[`Set6_Answer_${i}`]!==undefined && ans[`Set6_Answer_${i}`].toString()!=="" ){
      RcopeEntryExist=true;
      Rcope_Pos+=eval(ans[`Set6_Answer_${i}`]);
    }
  }
  for(let i=8;i<=14;i++){
    if(ans[`Set6_Answer_${i}`]!==undefined && ans[`Set6_Answer_${i}`].toString()!=="" ){
      RcopeEntryExist=true;
      Rcope_Neg+=eval(ans[`Set6_Answer_${i}`]);
    }
  }
  if(RcopeEntryExist){
  ans["Rcope_Pos"]=Rcope_Pos;
  ans["Rcope_Neg"]=Rcope_Neg;
  }
  return ans;

}
let moodNewValMap={
  'Very Happy':"Happy", 'Extremely Happy':"Very Happy", 'Somewhat Happy':"Somewhat Happy", 'Somewhat Sad':"Somewhat Sad", 'Sad':"Sad", 'Very Sad':"Very Sad"

}
let stressNewValMap={
  'Very Calm':"Calm",
  'Extremely Calm':"Very Calm",
  'Somewhat Calm':"Somewhat Calm",
  'Somewhat Stressed':"Somewhat Stressed",
  'Stressed':"Stressed",
  'Very Stressed':"Very Stressed"

}

function computePrePostMoodStress(data){
  let stressMap={
    'Extremely Calm':6,
    'Very Calm':5,
    'Somewhat Calm':4,
    'Somewhat Stressed':3,
    'Stressed':2,
    'Very Stressed':1

  }

  let moodMap={
    'Extremely Happy':6, 'Very Happy':5, 'Somewhat Happy':4, 'Somewhat Sad':3, 'Sad':2, 'Very Sad':1

  }

  let moodCount=0;
  let stressCount=0;
  let moodSum=0;
  let stressSum=0;
  let stressImproved=false;
  let moodImproved=false;
  for(let i=1;i<=5;i++){
    data[`Lesson${i}_PreMood_num`]=moodMap[data[`Lesson${i}_PreMood`]]??"";
    data[`Lesson${i}_PostMood_num`]=moodMap[data[`Lesson${i}_PostMood`]]??"";
    data[`Lesson${i}_PreStress_num`]=stressMap[data[`Lesson${i}_PreStress`]]??"";
    data[`Lesson${i}_PostStress_num`]=stressMap[data[`Lesson${i}_PostStress`]]??"";
    if(data[`Lesson${i}_PostMood`]!=undefined && data[`Lesson${i}_PostMood`].toString()!=="" && data[`Lesson${i}_PreMood`]!==undefined && data[`Lesson${i}_PreMood`].toString()!==""){
      data[`Lesson${i}_Complete`]="YES";
      data[`Lesson${i}_MoodChange_Value`]=data[`Lesson${i}_PostMood_num`]-data[`Lesson${i}_PreMood_num`];
      if(data[`Lesson${i}_MoodChange_Value`]>0){
        data[`Lesson${i}_MoodChange_Direction`]="Increase"
        moodImproved=true;
      }else if(data[`Lesson${i}_MoodChange_Value`]<0){
        data[`Lesson${i}_MoodChange_Direction`]="Decrease"
      }else{
        data[`Lesson${i}_MoodChange_Direction`]="Same"
      }
      moodCount+=1;
      moodSum+=data[`Lesson${i}_PostMood_num`];
      data[`Lesson${i}_MoodChange_Percent`]=(Math.abs(data[`Lesson${i}_MoodChange_Value`]/data[`Lesson${i}_PreMood_num`])*100);
      data[`Lesson${i}_MoodChange_Value`]=Math.abs(data[`Lesson${i}_MoodChange_Value`]);

    }else{
      data[`Lesson${i}_Complete`]="NO";
    }

    if(data[`Lesson${i}_PostStress`]!=undefined && data[`Lesson${i}_PostStress`].toString()!=="" && data[`Lesson${i}_PreStress`]!==undefined && data[`Lesson${i}_PreStress`].toString()!==""){
      
      data[`Lesson${i}_StressChange_Value`]=data[`Lesson${i}_PostStress_num`]-data[`Lesson${i}_PreStress_num`];
      if(data[`Lesson${i}_StressChange_Value`]>0){
        data[`Lesson${i}_StressChange_Direction`]="Increase"
        stressImproved=true;
      }else if(data[`Lesson${i}_StressChange_Value`]<0){
        data[`Lesson${i}_StressChange_Direction`]="Decrease"
      }else{
        data[`Lesson${i}_StressChange_Direction`]="Same"
      }
      stressCount+=1;
      stressSum+=data[`Lesson${i}_PostStress_num`];
      data[`Lesson${i}_StressChange_Percent`]=(Math.abs(data[`Lesson${i}_StressChange_Value`]/data[`Lesson${i}_PreStress_num`])*100);
      data[`Lesson${i}_StressChange_Value`]=Math.abs(data[`Lesson${i}_StressChange_Value`]);

      //New Way to display manipulation
      //Extremely Happy -> Very Happy
      //Very Happy ->  Happy
    data[`Lesson${i}_PreMood`]=moodNewValMap[data[`Lesson${i}_PreMood`]]??"";
    data[`Lesson${i}_PostMood`]=moodNewValMap[data[`Lesson${i}_PostMood`]]??"";
    data[`Lesson${i}_PreStress`]=stressNewValMap[data[`Lesson${i}_PreStress`]]??"";
    data[`Lesson${i}_PostStress`]=stressNewValMap[data[`Lesson${i}_PostStress`]]??"";


  }
}
if(stressCount!==0){
  data['AvgPostLessonScore_Stress_Value']=(stressSum/moodCount).toString();
  
}
if(moodCount!==0){
  data['AvgPostLessonScore_Mood_Value']=(moodSum/moodCount).toString();
}
if(stressImproved){
  data['AnyStressImproved']="YES";
}else{
  data['AnyStressImproved']="NO";
}

if(moodImproved){
  data['AnyMoodImproved']="YES";
}else{
  data['AnyMoodImproved']="NO";
}
return data;

}

function computeDiaryEntries(data){
  if(data[`DiaryEntry_1_Date`]===undefined || data[`DiaryEntry_1_Date`].toString()===""){
    data["PrayDiaryUsed?"]="NO";
    return data;
  }
  
  data["PrayDiaryUsed?"]="YES";
  data["PrayDiary1_FeelingImprove"]="NO";
  if(data[`DiaryEntry_1_FeelingBefore`]!==undefined && data[`DiaryEntry_1_FeelingBefore`].toString()!=="" && data[`DiaryEntry_1_FeelingAfter`]!==undefined && data[`DiaryEntry_1_FeelingAfter`].toString()!==""){
    data[`PrayDiary1_FeelingChange_Value`]=eval(data[`DiaryEntry_1_FeelingAfter`])-eval(data[`DiaryEntry_1_FeelingBefore`]);
    if(data[`PrayDiary1_FeelingChange_Value`]>0){
      data[`PrayDiary1_FeelingChange_Direction`]="Increase"
      data["PrayDiary1_FeelingImprove"]="YES";
    }else if(data[`PrayDiary1_FeelingChange_Value`]<0){
      data[`PrayDiary1_FeelingChange_Direction`]="Decrease"
    }else{
      data[`PrayDiary1_FeelingChange_Direction`]="Same"
      
    }
    data[`PrayDiary1_FeelingChange_Percent`]=(Math.abs(data[`PrayDiary1_FeelingChange_Value`]/data[`DiaryEntry_1_FeelingBefore`])*100);
    data[`PrayDiary1_FeelingChange_Value`]=Math.abs(data[`PrayDiary1_FeelingChange_Value`]);
  }
  data["PrayDiary1_StressImprove"]="NO";
  if(data[`DiaryEntry_1_StressBefore`]!==undefined && data[`DiaryEntry_1_StressBefore`].toString()!=="" && data[`DiaryEntry_1_StressAfter`]!==undefined && data[`DiaryEntry_1_StressAfter`].toString()!==""){
    data[`PrayDiary1_StressChange_Value`]=eval(data[`DiaryEntry_1_StressAfter`])-eval(data[`DiaryEntry_1_StressBefore`]);
    if(data[`PrayDiary1_StressChange_Value`]>0){
      data[`PrayDiary1_StressChange_Direction`]="Increase"
      data["PrayDiary1_StressImprove"]="YES";
    }else if(data[`PrayDiary1_StressChange_Value`]<0){
      data[`PrayDiary1_StressChange_Direction`]="Decrease"
    }else{
      data[`PrayDiary1_StressChange_Direction`]="Same"
    }
    data[`PrayDiary1_StressChange_Percent`]=(Math.abs(data[`PrayDiary1_StressChange_Value`]/data[`DiaryEntry_1_StressBefore`])*100);
    data[`PrayDiary1_StressChange_Value`]=Math.abs(data[`PrayDiary1_StressChange_Value`]);
  }

 return data; 
}





async function processLineByLine(file) {
  const fileStream = fs.createReadStream(`./controllers/Admin/formats/${file}`);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  x={}
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.\\
    x[line.toString()]=""
  }
  return x;
  
}





const getCSV = async (req, resp) => {
  let files=['generalInfo.txt','register.txt','set.txt','lesson_sus.txt','diary.txt']
  t={}
  
  for(i=0;i<files.length;i++){
    x=await processLineByLine(files[i])
    
    t={...t,...await processLineByLine(files[i])}
    // console.log(x)

  }

 
 
  // return;
  try {
    
    User.scan().all()
      .exec((err, res) => {
        console.log("Fetched Data")
        console.log("Now Processing");
        console.log(err)
      
        const jsonObject = res.toJSON();
        let finalTxs = [];
        jsonObject.forEach((user) => {
          let finalObject =  Object.assign({}, t); ;
          finalObject["userName"] = user.id;
          finalObject["uniqueIdentifier"] = user.uniqueIdentifier;
          user.initialQuestions.forEach((entry, index) => {
            
            finalObject["Register_" + (index + 1) + "_Question"] =
              entry.question === undefined ? "" : entry.question;
            finalObject["Register_" + (index + 1) + "_Answer"] =preprocessEntryAns(entry.answer);
              if(index+1==1){
                ans5t1=getSubdivisionsOfChoice("Register_1",['Depression',"Anxiety","Trauma","Addiction","Bipolar","Psychosis","OCD"],preprocessEntryAns(entry.answer))
                finalObject={...finalObject,...ans5t1}
              }
              if(index+1==2){
                ans5t1=getSubdivisionsOfChoice("Register_2",["Happy","Sad","Angry","Guilty","Stressed","Grateful"],preprocessEntryAns(entry.answer))
                finalObject={...finalObject,...ans5t1}
              }
              if(index+1==4){
                ans5t1=getSubdivisionsOfChoiceBySingleString("Register_4",["My symptoms sometimes take on religious themes","Spirituality/religion is a positive resource for me (e.g., provides hope)","Spirituality/religion is a source of strain and emotional pain for me (i.e., spiritual struggles)","Spirituality/religion is not be directly relevant to my mental health"],preprocessEntryAns(entry.answer),["SR_symptoms","SR_Pos","SR_Strain","SR_None"])
                finalObject={...finalObject,...ans5t1}
              }


          });
          let set1TotalTime = 0;
          user.setAnswers.set1.forEach((entry, index) => {
            finalObject["Set1_Question_" + (index + 1)] =
              entry.question === undefined ? "" : entry.question;
            finalObject["Set1_Answer_" + (index + 1)] =
              preprocessEntryAns(entry.answer);
            finalObject["Set1_TimeTaken_" + (index + 1)] =
              entry.timeTaken === undefined ? "" : entry.timeTaken;
            set1TotalTime += parseInt(entry.timeTaken);
          });
          finalObject["Set1_TotalTime"] = set1TotalTime;
          let set2TotalTime = 0;
          user.setAnswers.set2.forEach((entry, index) => {
            finalObject["Set2_Question_" + (index + 1)] =
              entry.question === undefined ? "" : entry.question;
            finalObject["Set2_Answer_" + (index + 1)] =
              preprocessEntryAns(entry.answer);
            finalObject["Set2_TimeTaken_" + (index + 1)] =
              entry.timeTaken === undefined ? "" : entry.timeTaken;
            set2TotalTime += parseInt(entry.timeTaken);
          });
          finalObject["Set2_TotalTime"] = set2TotalTime;
          let set3TotalTime = 0;
          user.setAnswers.set3.forEach((entry, index) => {
            finalObject["Set3_Question_" + (index + 1)] =
              entry.question === undefined ? "" : entry.question;
            finalObject["Set3_Answer_" + (index + 1)] =
              preprocessEntryAns(entry.answer);
            finalObject["Set3_TimeTaken_" + (index + 1)] =
              entry.timeTaken === undefined ? "" : entry.timeTaken;
            set3TotalTime += parseInt(entry.timeTaken);
          });
          finalObject["Set3_TotalTime"] = set3TotalTime;
          let set4TotalTime = 0;
          user.setAnswers.set4.forEach((entry, index) => {
            finalObject["Set4_Question_" + (index + 1)] =
              entry.question === undefined ? "" : entry.question;
            finalObject["Set4_Answer_" + (index + 1)] =
              preprocessEntryAns(entry.answer);
            finalObject["Set4_TimeTaken_" + (index + 1)] =
              entry.timeTaken === undefined ? "" : entry.timeTaken;
            set4TotalTime += parseInt(entry.timeTaken);
          });
          if(finalObject["Set4_Answer_1"]!=="" && !isNaN(finalObject["Set4_Answer_1"])){
            if(eval(finalObject["Set4_Answer_1"])>365){
              finalObject["Set4_Answer_1"]=`${eval(finalObject["Set4_Answer_1"])/48}`;
            }
          }
          finalObject["Set4_TotalTime"] = set4TotalTime;
          let set5TotalTime = 0;
          user.setAnswers.set5.forEach((entry, index) => {
            finalObject["Set5_Question_" + (index + 1)] =
              entry.question === undefined ? "" : entry.question;
            finalObject["Set5_Answer_" + (index + 1)] =
              preprocessEntryAns(entry.answer);
            finalObject["Set5_TimeTaken_" + (index + 1)] =
              entry.timeTaken === undefined ? "" : entry.timeTaken;
            set5TotalTime += parseInt(entry.timeTaken);
          });
          finalObject["Set5_TotalTime"] = set5TotalTime;
          let set6TotalTime = 0;
          user.setAnswers.set6.forEach((entry, index) => {
            if(index===4 && entry.question==="How much or how frequently have you...Sought help from God in letting go of my anger."){
              ///This was required as it would be very difficult to change question on Database for past version. Question was changed on the app.
              entry.question="How much or how frequently have you...Tried to see how God might be trying to strengthen me in this situation."
            }
            if(index===12 && entry.question==="How much or how frequently have you...How much or how frequently have you..."){
              ///This was required as it would be very difficult to change question on Database for past version. Question was changed on the app.
              entry.question="How much or how frequently have you...Decided the devil made this happen"
            }
            finalObject["Set6_Question_" + (index + 1)] =
            
              entry.question === undefined ? "" : entry.question;

            finalObject["Set6_Answer_" + (index + 1)] =
              preprocessEntryAns(entry.answer);
            finalObject["Set6_TimeTaken_" + (index + 1)] =
              entry.timeTaken === undefined ? "" : entry.timeTaken;
            set6TotalTime += parseInt(entry.timeTaken);
          });
          finalObject["Set6_TotalTime"] = set6TotalTime;
          let lesson1TotalTime = 0;
          user.lessonAnswers.lesson1.forEach((initialEntry, index) => {
            if (initialEntry.answerNumber === 1) {
              initialEntry.answers.forEach((entry, index) => {
                
                finalObject["Lesson1_Question_" + (index + 1)] =
                  entry.question === undefined ? "" : entry.question;
                finalObject["Lesson1_Answer_" + (index + 1)] =
                  preprocessEntryAns(entry.answer);
                finalObject["Lesson1_TimeTaken_" + (index + 1)] =
                  entry.timeTaken === undefined ? "" : entry.timeTaken;
                lesson1TotalTime += parseInt(entry.timeTaken);
                if(index+1==1){
                  val=(preprocessEntryAns(entry.answer)).split(", ")
                  finalObject["Lesson1_PreMood"]=(val.length>0)?val[0]:"";
                  finalObject["Lesson1_PreStress"]=(val.length>1)?val[1]:"";;
                  Object.keys(moodNewValMap).forEach((key)=>{
                    console.log("Log:",finalObject["Lesson1_Answer_" + (index + 1)]);
                    if(finalObject["Lesson1_Answer_" + (index + 1)].includes(key)){
                      finalObject["Lesson1_Answer_" + (index + 1)]=finalObject["Lesson1_Answer_" + (index + 1)].replace(key,moodNewValMap[key])
                    }
                  });
                  Object.keys(stressNewValMap).forEach((key)=>{
                    if(finalObject["Lesson1_Answer_" + (index + 1)].includes(key)){
                      finalObject["Lesson1_Answer_" + (index + 1)]=finalObject["Lesson1_Answer_" + (index + 1)].replace(key,stressNewValMap[key])
                    }
                  });
                }
                if(index+1==7){
                  
                  val=(preprocessEntryAns(entry.answer)).split(", ")
                  finalObject["Lesson1_PostMood"]=(val.length>0)?val[0]:"";
                  finalObject["Lesson1_PostStress"]=(val.length>1)?val[1]:"";
                  Object.keys(moodNewValMap).forEach((key)=>{
                    if(finalObject["Lesson1_Answer_" + (index + 1)].includes(key)){
                      finalObject["Lesson1_Answer_" + (index + 1)]=finalObject["Lesson1_Answer_" + (index + 1)].replace(key,moodNewValMap[key])
                    }
                  });
                  Object.keys(stressNewValMap).forEach((key)=>{
                    if(finalObject["Lesson1_Answer_" + (index + 1)].includes(key)){
                      finalObject["Lesson1_Answer_" + (index + 1)]=finalObject["Lesson1_Answer_" + (index + 1)].replace(key,stressNewValMap[key])
                    }
                  });
                }
                
              });
              
            }
          });
          finalObject["Lesson1_TotalTime"] = lesson1TotalTime;
          let lesson2TotalTime = 0;
          user.lessonAnswers.lesson2.forEach((initialEntry, index) => {
            if (initialEntry.answerNumber === 1) {
              initialEntry.answers.forEach((entry, index) => {
                finalObject["Lesson2_Question_" + (index + 1)] =
                  entry.question === undefined ? "" : entry.question;
                finalObject["Lesson2_Answer_" + (index + 1)] =
                  preprocessEntryAns(entry.answer);
                finalObject["Lesson2_TimeTaken_" + (index + 1)] =
                  entry.timeTaken === undefined ? "" : entry.timeTaken;
                lesson2TotalTime += parseInt(entry.timeTaken);
                if(index+1==1){
                  
                  val=(preprocessEntryAns(entry.answer)).split(", ")
                  finalObject["Lesson2_PreMood"]=(val.length>0)?val[0]:"";
                  finalObject["Lesson2_PreStress"]=(val.length>1)?val[1]:"";
                  Object.keys(moodNewValMap).forEach((key)=>{
                    if(finalObject["Lesson2_Answer_" + (index + 1)].includes(key)){
                      finalObject["Lesson2_Answer_" + (index + 1)]=finalObject["Lesson2_Answer_" + (index + 1)].replace(key,moodNewValMap[key])
                    }
                  });
                  Object.keys(stressNewValMap).forEach((key)=>{
                    if(finalObject["Lesson2_Answer_" + (index + 1)].includes(key)){
                      finalObject["Lesson2_Answer_" + (index + 1)]=finalObject["Lesson2_Answer_" + (index + 1)].replace(key,stressNewValMap[key])
                    }
                  });
                }
                if(index+1==7){
                  
                  val=(preprocessEntryAns(entry.answer)).split(", ")
                  finalObject["Lesson2_PostMood"]=(val.length>0)?val[0]:"";
                  finalObject["Lesson2_PostStress"]=(val.length>1)?val[1]:"";
                  Object.keys(moodNewValMap).forEach((key)=>{
                    if(finalObject["Lesson2_Answer_" + (index + 1)].includes(key)){
                      finalObject["Lesson2_Answer_" + (index + 1)]=finalObject["Lesson2_Answer_" + (index + 1)].replace(key,moodNewValMap[key])
                    }
                  });
                  Object.keys(stressNewValMap).forEach((key)=>{
                    if(finalObject["Lesson2_Answer_" + (index + 1)].includes(key)){
                      finalObject["Lesson2_Answer_" + (index + 1)]=finalObject["Lesson2_Answer_" + (index + 1)].replace(key,stressNewValMap[key])
                    }
                  });
                }
              });
            }
          });
          finalObject["Lesson2_TotalTime"] = lesson2TotalTime;
          let lesson3TotalTime = 0;
          user.lessonAnswers.lesson3.forEach((initialEntry, index) => {
            if (initialEntry.answerNumber === 1) {
              initialEntry.answers.forEach((entry, index) => {
                finalObject["Lesson3_Question_" + (index + 1)] =
                  entry.question === undefined ? "" : entry.question;
                finalObject["Lesson3_Answer_" + (index + 1)] =
                  preprocessEntryAns(entry.answer);
                finalObject["Lesson3_TimeTaken_" + (index + 1)] =
                  entry.timeTaken === undefined ? "" : entry.timeTaken;
                lesson3TotalTime += parseInt(entry.timeTaken);
                if(index+1==1){
                  
                  val=(preprocessEntryAns(entry.answer)).split(", ")
                  finalObject["Lesson3_PreMood"]=(val.length>0)?val[0]:"";
                  finalObject["Lesson3_PreStress"]=(val.length>1)?val[1]:"";
                  Object.keys(moodNewValMap).forEach((key)=>{
                    if(finalObject["Lesson3_Answer_" + (index + 1)].includes(key)){
                      finalObject["Lesson3_Answer_" + (index + 1)]=finalObject["Lesson3_Answer_" + (index + 1)].replace(key,moodNewValMap[key])
                    }
                  });
                  Object.keys(stressNewValMap).forEach((key)=>{
                    if(finalObject["Lesson3_Answer_" + (index + 1)].includes(key)){
                      finalObject["Lesson3_Answer_" + (index + 1)]=finalObject["Lesson3_Answer_" + (index + 1)].replace(key,stressNewValMap[key])
                    }
                  });
                }
                if(index+1==4){

                  ans=preprocessEntryAns(entry.answer);
                  l=ans.split("–");

                  finalObject["Lesson3_Struggle1"]=(l.length>0)? l[0]:"";
                  finalObject["Lesson3_Struggle2"]=(l.length>1) ? l[1]:"";
                }
                if(index+1==7){
                  
                  val=(preprocessEntryAns(entry.answer)).split(", ")
                  finalObject["Lesson3_PostMood"]=(val.length>0)?val[0]:"";
                  finalObject["Lesson3_PostStress"]=(val.length>1)?val[1]:"";
                  Object.keys(moodNewValMap).forEach((key)=>{
                    if(finalObject["Lesson3_Answer_" + (index + 1)].includes(key)){
                      finalObject["Lesson3_Answer_" + (index + 1)]=finalObject["Lesson3_Answer_" + (index + 1)].replace(key,moodNewValMap[key])
                    }
                  });
                  Object.keys(stressNewValMap).forEach((key)=>{
                    if(finalObject["Lesson3_Answer_" + (index + 1)].includes(key)){
                      finalObject["Lesson3_Answer_" + (index + 1)]=finalObject["Lesson3_Answer_" + (index + 1)].replace(key,stressNewValMap[key])
                    }
                  });
                }
              });
            }
          });
          finalObject["Lesson3_TotalTime"] = lesson3TotalTime;
          let lesson4TotalTime = 0;
          user.lessonAnswers.lesson4.forEach((initialEntry, index) => {
            if (initialEntry.answerNumber === 1) {
              initialEntry.answers.forEach((entry, index) => {
                finalObject["Lesson4_Question_" + (index + 1)] =
                  entry.question === undefined ? "" : entry.question;
                finalObject["Lesson4_Answer_" + (index + 1)] =
                  preprocessEntryAns(entry.answer);
                finalObject["Lesson4_TimeTaken_" + (index + 1)] =
                  entry.timeTaken === undefined ? "" : entry.timeTaken;
                lesson4TotalTime += parseInt(entry.timeTaken);
                if(index+1==1){
                  
                  val=(preprocessEntryAns(entry.answer)).split(", ")
                  finalObject["Lesson4_PreMood"]=(val.length>0)?val[0]:"";
                  finalObject["Lesson4_PreStress"]=(val.length>1)?val[1]:"";
                  Object.keys(moodNewValMap).forEach((key)=>{
                    if(finalObject["Lesson4_Answer_" + (index + 1)].includes(key)){
                      finalObject["Lesson4_Answer_" + (index + 1)]=finalObject["Lesson4_Answer_" + (index + 1)].replace(key,moodNewValMap[key])
                    }
                  });
                  Object.keys(stressNewValMap).forEach((key)=>{
                    if(finalObject["Lesson4_Answer_" + (index + 1)].includes(key)){
                      finalObject["Lesson4_Answer_" + (index + 1)]=finalObject["Lesson4_Answer_" + (index + 1)].replace(key,stressNewValMap[key])
                    }
                  });
                }
                if(index+1==4){
                  ans4t1=getSubdivisionsOfChoice("Les4_Prayer",
                  ["Gratitude or praise","Help for yourself or others","Connect with a Higher power","Forgiveness",'To ask for strength','To cope with distress','None of these'],
                  preprocessEntryAns(entry.answer),
                  ["Gratitude","Help","Connect","Forgiveness","Strength","Cope","None"])
                  finalObject={...finalObject,...ans4t1}
                }
                if(index+1==5){
                  ans5t1=getSubdivisionsOfChoice("Les4",
                  ["Scripted from a text","Scheduled","Spontaneous","Community",'Comtemplatively(e.g.,meditation)','None of these'],
                  preprocessEntryAns(entry.answer),
                  ["Scripted","Scheduled","Spontaneous","Community","Comtemplatively","None"])
                  finalObject={...finalObject,...ans5t1}
                }
                if(index+1==6){
                  ans6t1=getSubdivisionsOfChoice("Les4",["Joy","Sadness","Anxiety","Pain"],preprocessEntryAns(entry.answer))
                  finalObject={...finalObject,...ans6t1}
                }
                if(index+1==17){
                  
                  val=(preprocessEntryAns(entry.answer)).split(", ")
                  finalObject["Lesson4_PostMood"]=(val.length>0)?val[0]:"";
                  finalObject["Lesson4_PostStress"]=(val.length>1)?val[1]:"";
                  Object.keys(moodNewValMap).forEach((key)=>{
                    if(finalObject["Lesson4_Answer_" + (index + 1)].includes(key)){
                      finalObject["Lesson4_Answer_" + (index + 1)]=finalObject["Lesson4_Answer_" + (index + 1)].replace(key,moodNewValMap[key])
                    }
                  });
                  Object.keys(stressNewValMap).forEach((key)=>{
                    if(finalObject["Lesson4_Answer_" + (index + 1)].includes(key)){
                      finalObject["Lesson4_Answer_" + (index + 1)]=finalObject["Lesson4_Answer_" + (index + 1)].replace(key,stressNewValMap[key])
                    }
                  });
                }
              });
            }
          });
          finalObject["Lesson4_TotalTime"] = lesson4TotalTime;
          let lesson5TotalTime = 0;
          user.lessonAnswers.lesson5.forEach((initialEntry, index) => {
            if (initialEntry.answerNumber === 1) {
              initialEntry.answers.forEach((entry, index) => {
                finalObject["Lesson5_Question_" + (index + 1)] =
                  entry.question === undefined ? "" : entry.question;
                finalObject["Lesson5_Answer_" + (index + 1)] =
                  preprocessEntryAns(entry.answer);
                finalObject["Lesson5_TimeTaken_" + (index + 1)] =
                  entry.timeTaken === undefined ? "" : entry.timeTaken;
                lesson5TotalTime += parseInt(entry.timeTaken);
                if(index+1==1){
                  
                  val=(preprocessEntryAns(entry.answer)).split(", ")
                  finalObject["Lesson5_PreMood"]=(val.length>0)?val[0]:"";
                  finalObject["Lesson5_PreStress"]=(val.length>1)?val[1]:"";
                  Object.keys(moodNewValMap).forEach((key)=>{
                    if(finalObject["Lesson5_Answer_" + (index + 1)].includes(key)){
                      finalObject["Lesson5_Answer_" + (index + 1)]=finalObject["Lesson5_Answer_" + (index + 1)].replace(key,moodNewValMap[key])
                    }
                  });
                  Object.keys(stressNewValMap).forEach((key)=>{
                    if(finalObject["Lesson5_Answer_" + (index + 1)].includes(key)){
                      finalObject["Lesson5_Answer_" + (index + 1)]=finalObject["Lesson5_Answer_" + (index + 1)].replace(key,stressNewValMap[key])
                    }
                  });
                }
                if(index+1==7){
                  
                  val=(preprocessEntryAns(entry.answer)).split(", ")
                  finalObject["Lesson5_PostMood"]=(val.length>0)?val[0]:"";
                  finalObject["Lesson5_PostStress"]=(val.length>1)?val[1]:"";
                  Object.keys(moodNewValMap).forEach((key)=>{
                    if(finalObject["Lesson5_Answer_" + (index + 1)].includes(key)){
                      finalObject["Lesson5_Answer_" + (index + 1)]=finalObject["Lesson5_Answer_" + (index + 1)].replace(key,moodNewValMap[key])
                    }
                  });
                  Object.keys(stressNewValMap).forEach((key)=>{
                    if(finalObject["Lesson5_Answer_" + (index + 1)].includes(key)){
                      finalObject["Lesson5_Answer_" + (index + 1)]=finalObject["Lesson5_Answer_" + (index + 1)].replace(key,stressNewValMap[key])
                    }
                  });

                }
              });
            }
          });
          
          finalObject["Lesson5_TotalTime"] = lesson5TotalTime;

          
          finalObject["SuicidalWordsUsed"] = user.suicidalWordsUsed.toString();
          user.diaryEntries.forEach((entry, index) => {
            finalObject["DiaryEntry_" + (index + 1) + "_Date"] =
              entry.date === undefined ? "" : entry.date;
            finalObject["DiaryEntry_" + (index + 1) + "_Time"] =
              entry.time === undefined ? "" : entry.time;
              finalObject["DiaryEntry_" + (index + 1) + "_PrayerType"] =
              entry.prayerType === undefined ? "" : entry.prayerType;

              anstyp=getSubdivisionsOfChoice("DiaryEntry_" + (index + 1),["Gratitude","Help","Converse","Forgiveness","Coping","Strength"],entry.prayerType === undefined ? "" : entry.prayerType.toString())
              finalObject={...finalObject,...anstyp}
              
              finalObject["DiaryEntry_" + (index + 1) + "_Prayer"] =preprocessEntryAns( entry.prayer );
            
              finalObject["DiaryEntry_" + (index + 1) + "_FeelingBefore"] =
              entry.feelingBefore === undefined ? "" : entry.feelingBefore;
              
            finalObject["DiaryEntry_" + (index + 1) + "_StressBefore"] =
            entry.stressBefore === undefined ? "" : entry.stressBefore;
            
            finalObject["DiaryEntry_" + (index + 1) + "_FeelingAfter"] =
              entry.feelingAfter === undefined ? "" : entry.feelingAfter;
              
            finalObject["DiaryEntry_" + (index + 1) + "_StressAfter"] =
            entry.stressAfter === undefined ? "" : entry.stressAfter;

            finalObject[
              "DiaryEntry_" + (index + 1) + "_TimeTakenForPrayerEntry"
            ] =
              entry.timeTakenForThirdField === undefined
                ? ""
                : entry.timeTakenForThirdField;

                
            finalObject["DiaryEntry_" + (index + 1) + "_NoteID"] =
            entry.noteId === undefined ? "" : entry.noteId;
            finalObject["DiaryEntry_" + (index + 1) + "_Notes"] =preprocessEntryAns(entry.notes);
            
            
            
          });

          finalObject=computePrePostMoodStress(finalObject);
          finalObject=computeDiaryEntries(finalObject);
          finalObject=computeSetEntries(finalObject)

          //Updating all questions so that the values are not different(mostly due to change in question)
          Object.keys(finalObject).forEach((key)=>{
            if(key.includes("Question")){
              finalObject[key]=quesList[key]
            }
          });


          finalTxs.push(finalObject);
        });
        resp.status(200).json({
          code: 1,
          jsonData: finalTxs,
        });
      });
  } catch (error) {
    resp.status(400).json({
      code: 0,
      error: error,
    });
  }
};

module.exports = getCSV;
