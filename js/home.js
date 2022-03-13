var dbProfile = "";
var dbVDOTrainingGroup = "";


$(document).ready(function () {
/*
  var str = "";
  var sLineID = "Ua6b6bf745bd9bfd01a180de1a05c23b3";
  var sLineName = "Website";
  var sLinePicture = "https://profile.line-scdn.net/0hoLlg-mNNMGNRHiaTpMdPNG1bPg4mMDYrKX8qVnIYOgYpe3QwbCp2AXVKaVN_fnMzOC16V3NMagF8";
  sessionStorage.setItem("LineID", sLineID);
  sessionStorage.setItem("LineName", sLineName);
  sessionStorage.setItem("LinePicture", sLinePicture);
  //str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile" width="100px"></div>';
  //str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
  //$("#MyProfile").html(str); 
  Connect_DB();
*/  
  main();
});



async function main() {
  await liff.init({ liffId: "1655966947-OJVqw25X" });
  document.getElementById("isLoggedIn").append(liff.isLoggedIn());
  if(liff.isLoggedIn()) {
    getUserProfile();
  } else {
    liff.login();
  }
}


async function getUserProfile() {
  var str = "";
  const profile = await liff.getProfile();
  sessionStorage.setItem("LineID", profile.userId);
  sessionStorage.setItem("LineName", profile.displayName);
  sessionStorage.setItem("LinePicture", profile.pictureUrl);
  //str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile"></div>';
  //str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
  //$("#MyProfile").html(str);  
  Connect_DB();
}


function openWindow() {
  liff.openWindow({
    url: "https://line.me",
    external: true     
  })
}


function Connect_DB() {
  var firebaseConfig = {
    apiKey: "AIzaSyDfTJJ425U4OY0xac6jdhtSxDeuJ-OF-lE",
    authDomain: "retailproject-6f4fc.firebaseapp.com",
    projectId: "retailproject-6f4fc",
    databaseURL: "https://file-upload-6f4fc.firebaseio.com",
    storageBucket: "retailproject-6f4fc.appspot.com",
    messagingSenderId: "653667385625",
    appId: "1:653667385625:web:a5aed08500de80839f0588",
    measurementId: "G-9SKTRHHSW9"
  };
  firebase.initializeApp(firebaseConfig);
  dbProfile = firebase.firestore().collection("CheckProfile");
  dbVDOTrainingGroup = firebase.firestore().collection("VDOTrainingGroup");
  CheckData();
  LoadVDOTrainingGroup();
}



function CheckData() {
  dbProfile.where('lineID','==',sessionStorage.getItem("LineID"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EidProfile = doc.id;
      sDateRegister = doc.data().DateRegister;
      sessionStorage.setItem("EmpID", doc.data().empID);
      sessionStorage.setItem("EmpName", doc.data().empName);
      //document.getElementById("txtEmpID").value = doc.data().empID;
      //document.getElementById("txtEmpName").value = doc.data().empName;
      //document.getElementById("txtEmpPhone").value = doc.data().empPhone;
      //document.getElementById("txtEmpGroup").value = doc.data().empGroup;
    });
  });
}



function VDOGroup(x) {
  location.href = 'listgroup.html?gvdo='+x;

}



function LoadVDOTrainingGroup() {
  var i = 0;
  var str = "";
  dbVDOTrainingGroup.where('VDOdisplay','==',1)
  .orderBy('VDOGroup','desc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
    i = i+1;
    str += '<div class="col-lg-6 col-md-2 slide text-center" data-aos="fade-left">';
    str += '<div style="position: relative;"><img src="'+doc.data().VDOimg+'" class="img-fluid" style="border-radius: 10px;width:90%;margin:10px;"></div>';
    str += '<div class="btn-t2" style="position: absolute; margin-top:-50px;font-size: 12px;right: 130px;" onclick="VDOGroup('+doc.data().VDOGroup+')">คลิกดูรายละเอียด</div></div>';
    str += '';
    });
  $("#DisplayVDOGroup").html(str);
  });
}




function getParameterByName(name, url) {
  str = '';
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

/*




function Connect_DB() {
  var firebaseConfig = {
    apiKey: "AIzaSyDfTJJ425U4OY0xac6jdhtSxDeuJ-OF-lE",
    authDomain: "retailproject-6f4fc.firebaseapp.com",
    projectId: "retailproject-6f4fc",
    databaseURL: "https://file-upload-6f4fc.firebaseio.com",
    storageBucket: "retailproject-6f4fc.appspot.com",
    messagingSenderId: "653667385625",
    appId: "1:653667385625:web:a5aed08500de80839f0588",
    measurementId: "G-9SKTRHHSW9"
  };
  firebase.initializeApp(firebaseConfig);
  dbVDOTraining = firebase.firestore().collection("VDOTraining");
  dbVDOQuestion = firebase.firestore().collection("VDOQuestion");
  dbVDOAnswer = firebase.firestore().collection("VDOAnswer");
  LoadVDOid();
}





var sShowQuestion = 0;
function LoadVDOid() {
  var str = "";
  var str1 = "";
  dbVDOTraining.where(firebase.firestore.FieldPath.documentId(),"==", VDOid)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
    	var sRead = parseInt(doc.data().VDOread)+1;
    	sShowQuestion = doc.data().ShowQuestion;
    	sQuestionSend = doc.data().QuestionSend;
    	sQuestionAnswer = doc.data().QuestionAnswer;
		dbVDOTraining.doc(VDOid).update({
			VDOread : parseInt(sRead) 
		});
		str +='<div style="max-height:300px;"><center>';
		//str +='<iframe width="100%" height="280" src="'+doc.data().VDOurl+'" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
		str +='<iframe width="100%" height="280" src="'+doc.data().VDOurl+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
		str +='</center></div>';
		$("#NameVDO").html('<div class="boxvdo-header">'+doc.data().VDOname+'</div>');
		$("#DetailVDO").html('<div class="boxvdo-line1" style="padding-top:10px;height:auto;">'+doc.data().VDOdetail+'</div>');
		$("#PlayVDO").html(str);
		str1 += '<div class="boxvdo-line2"><div class="boxvdo-icon1">';
		str1 += '<img src="./img/calendar.png" class="boxvdoimg"> <span>'+doc.data().VDOdate+'</span></div>';
		str1 += '<div class="boxvdo-icon"><img src="./img/reading.png" class="boxvdoimg"> <span>'+ sRead +' อ่าน</span></div>';
		if(doc.data().ShowQuestion==1) {
			str1 += '<div class="boxvdo-icon"><img src="./img/ask.png" class="boxvdoimg"> <span id="FriendAsk">'+ doc.data().QuestionSend +' คำถาม</span></div>';
			str1 += '<div class="boxvdo-icon"><img src="./img/ans.png" class="boxvdoimg"> <span id="FriendANS">'+ doc.data().QuestionAnswer +' คำตอบ</span></div>';
			//str += '<div class="boxvdo-icon"><img src="./img/ask.png" class="boxvdoimg"> <span>'+doc.data().QuestionSend+' คำถาม</span></div>';
			//str += '<div class="boxvdo-icon"><img src="./img/ans.png" class="boxvdoimg"> <span>'+doc.data().QuestionAnswer+' คำตอบ</span></div>';
		}
		if(doc.data().VDOquiz==1) {
			str1 += '<div class="boxvdo-icon"><img src="./img/quizgame.png" class="boxvdoimg"> <span>เก็บคะแนน</span></div>';
		}
		str1 += '</div></div>';
		$("#SocialICON").html(str1);
    });
    if(sShowQuestion!=0) {
    	document.getElementById("CheckQuestion").style.display = "block";
		LoadQuestion();
    }
  });
}



function GetAnswer(x,n) {
	var xAnswer = "";
	dbVDOAnswer.where('QuestionID','==', x)
	.orderBy('AnswerTimeStamp','desc')
	.get().then((snapshot)=> {
	snapshot.forEach(doc=> {
			textshow += '<div>'+doc.data().AnswerDetail+'</div>';
			textshow += '<div style="font-size:11px; color:#888;margin-top:4px;margin-bottom: 25px;">ตอบโดย : '+doc.data().LineName+' | เมื่อวันที่ '+doc.data().AnswerDate+'</div>';
		});
		$("#QuestionAnswer-"+n).html(textshow);
        CountAnswer(x,n);
	});
	textshow = "";
}



function LoadQuestion() {
  var i = 0;
  var str = "";
  var str1 = "";
  dbVDOQuestion.where('VDOid','==', VDOid)
  .orderBy('QuestionTimeStamp','desc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
    	i = i+1;
		GetAnswer(doc.id,i);
    	str +='<div>';
		str +='<div class="panel panel-default"><div class="panel-heading" role="tab" id="heading'+i+'"><div class="panel-title">';
		str +='<a onclick="CountView(\''+ doc.id +'\','+i+')" class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse'+i+'" aria-expanded="false" aria-controls="collapse'+i+'">';
		str +='<span>'+ doc.data().QuestionTopic +'</span> <span id="ReadView-'+i+'" style="font-weight:400; font-size:11px;"> ('+ doc.data().QuestionView +' อ่าน | '+ doc.data().QuestionAnswer +' คำตอบ)</span></a></div></div>';
		str +='<div id="collapse'+i+'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading'+i+'">';
		str +='<div class="panel-body"><p>'+ doc.data().QuestionDetail +'<br><span style="color:#888;font-size:11px;padding-top:12px;">ถามโดย : '+ doc.data().LineName +' | เมื่อวันที่ : '+ doc.data().QuestionDate +'</span></p></div>';
		//str +='<div class="btn-t1" onclick="AddNewAnswer(\''+ doc.id +'\','+ doc.data().QuestionAns +',\''+ doc.data().QuestionTopic +'\',\''+ doc.data().QuestionDetail +'\')" style="font-size:11px;">คลิกเพื่อตอบคำถาม</div>';
		str +='<div class="btn-t1" onclick="AddNewAnswer(\''+ doc.id +'\','+i+')" style="font-size:11px;">คลิกเพื่อตอบคำถาม</div>';
		//str +='<div class="panel-body"><p style="margin-top:10px;color:#0056ff;">'+textshow+'</p></div>';
		str +='<div class="panel-body"><p style="margin-top:10px;color:#0056ff;" id="QuestionAnswer-'+i+'">'+textshow+'</p></div>';
    	str +='</div></div></div>';
    });
    //if(sQuestionSend==0) {
	//	$("#DisplayQuestion").html("<center><div style='color:#999;'>< ---------------- ขณะนี้ยังไม่มีคำถามจากเพื่อน ๆ ---------------- ></div></center>");
    //} else {
		$("#DisplayQuestion").html(str);
    //}
  });
}



var stxtAnswer = "";
function SaveAnswer() {
  //alert(SelectQuestionID+"-----"+SelectPosition);
  var sAns = parseInt(NumberAnswer)+1;
  sQuestionSend = sQuestionSend+1;
  stxtAnswer = document.getElementById("txtAnswer").value;
  if(stxtAnswer!="") { 
	NewDate();
	var TimeStampDate = Math.round(Date.now() / 1000);
	sQuestionAnswer = parseInt(sQuestionAnswer)+1
    dbVDOAnswer.add({
      LineID : sessionStorage.getItem("LineID"),
      LineName : sessionStorage.getItem("LineName"),
      LinePicture : sessionStorage.getItem("LinePicture"),
      AnswerDetail : stxtAnswer,
      AnswerDate : dateString,
      AnswerTimeStamp : TimeStampDate,
      QuestionID : SelectQuestionID
    });
	dbVDOQuestion.doc(SelectQuestionID).update({
		QuestionAnswer : parseInt(sAns) 
	});
	dbVDOTraining.doc(VDOid).update({
		QuestionAnswer : parseInt(sQuestionAnswer) 
	});
    $("#FriendANS").html(parseInt(sQuestionAnswer)+" คำตอบ");
	document.getElementById("txtAnswer").value = "";
    GetAnswer(SelectQuestionID,SelectPosition);
   	document.getElementById("id03").style.display = "none";
   	document.getElementById("id04").style.display = "block";
  } else {
  	alert("กรุณาตอบคำถามก่อนบันทึกรายการ")
  }
}



function CountView(x,n) {
  QuestionID = x;
  dbVDOQuestion.where(firebase.firestore.FieldPath.documentId(), "==", x)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
    	var sRead = parseInt(doc.data().QuestionView)+1;
    	var sAns = doc.data().QuestionAnswer;
		dbVDOQuestion.doc(x).update({
			QuestionView : parseInt(sRead) 
		});
		$("#ReadView-"+n+"").html("("+sRead+" อ่าน | "+sAns+" คำตอบ)");
		//$("#ReadView-"+n+"").html("( "+sRead+" View )");
    });
  });
}


function CountAnswer(x,n) {
  QuestionID = x;
  dbVDOQuestion.where(firebase.firestore.FieldPath.documentId(), "==", x)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
    	//var sAns = parseInt(doc.data().QuestionAnswer)+1;
		//dbVDOQuestion.doc(x).update({
		//	QuestionAnswer : parseInt(sAns) 
		//});
		$("#ReadView-"+n+"").html("("+doc.data().QuestionView+" อ่าน | "+doc.data().QuestionAnswer+" คำตอบ)");
		//$("#ReadView-"+n+"").html("( "+sRead+" View )");
    });
  });
}

function AddNewAnswer(x,n) {
	SelectQuestionID = x;
	SelectPosition = n;
	dbVDOQuestion.where(firebase.firestore.FieldPath.documentId(), "==", x)
	.get().then((snapshot)=> {
	snapshot.forEach(doc=> {
			NumberAnswer = doc.data().QuestionAnswer;
			$("#HeadQuestion").html(doc.data().QuestionTopic);
			$("#DetailQuestion").html(doc.data().QuestionDetail);
		});
	});
  	document.getElementById("id03").style.display = "block";
}


function ClickSaveProfile() {
  sCheckBottom = 0;
  stxtQuestion = document.getElementById("txtQuestion").value;
  stxtDetail = document.getElementById("txtDetail").value;
  if(stxtQuestion!="") { sCheckBottom = sCheckBottom+1; }
  if(stxtDetail!="") { sCheckBottom = sCheckBottom+1; }
  if(sCheckBottom<2) {
  	document.getElementById("id01").style.display = "block";
  } else {
  	AddNewQuestion();
  }
}



function AddNewQuestion() {
	if(sCheckBottom>=2) {
		NewDate();
		var TimeStampDate = Math.round(Date.now() / 1000);
	    dbVDOQuestion.add({
	      LineID : sessionStorage.getItem("LineID"),
	      LineName : sessionStorage.getItem("LineName"),
	      LinePicture : sessionStorage.getItem("LinePicture"),
	      QuestionAns : 0,
	      QuestionDate : dateString,
	      QuestionTopic : stxtQuestion,
	      QuestionDetail : stxtDetail,
	      QuestionStatus : 0,
	      QuestionTimeStamp : TimeStampDate,
	      QuestionView : 0,
	      QuestionAnswer : 0,
	      VDOid : VDOid
	    });
		dbVDOTraining.doc(VDOid).update({
			QuestionSend : parseInt(sQuestionSend)+1 
		});
	    $("#FriendAsk").html(parseInt(sQuestionSend)+1+" คำถาม");
		document.getElementById("txtQuestion").value = "";
		document.getElementById("txtDetail").value = "";
	    LoadQuestion();
	  	document.getElementById("id02").style.display = "block";
	}
}



function CloseAll() {
	document.getElementById('id01').style.display='none';
	document.getElementById('id02').style.display='none';
	document.getElementById('id03').style.display='none';
	document.getElementById('id04').style.display='none';
}


function NewDate() {
  var today = new Date();
  var day = today.getDate() + "";
  var month = (today.getMonth() + 1) + "";
  var year = today.getFullYear() + "";
  var hour = today.getHours() + "";
  var minutes = today.getMinutes() + "";
  var seconds = today.getSeconds() + "";
  var ampm = hour >= 12 ? 'PM' : 'AM';
  day = checkZero(day);
  month = checkZero(month);
  year = checkZero(year);
  hour = checkZero(hour);
  minutes = checkZero(minutes);
  seconds = checkZero(seconds);
  dateString = day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds +" "+ ampm;
}


function checkZero(data){
  if(data.length == 1){
    data = "0" + data;
  }
  return data;
}

*/