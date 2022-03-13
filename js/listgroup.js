var cleararray = "";
var dbVDOTraining = "";
var sVDOgroup = 0;
var sNameGroup = "";

$(document).ready(function () {
    //alert(sessionStorage.getItem("EmpID"));
    sVDOgroup = parseFloat(getParameterByName('gvdo'));
    //sVDOgroup = 2;
    //alert(sVDOgroup);
  	Connect_DB();
});


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
  dbVDOTrainingGroup = firebase.firestore().collection("VDOTrainingGroup");
  dbVDOTraining = firebase.firestore().collection("VDOTraining");
  LoadVDOTrainingGroup();
  LoadVDOTraining();
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


function LoadVDOTrainingGroup() {
  var i = 0;
  var str = "";
  dbVDOTrainingGroup.where('VDOGroup','==',sVDOgroup)
  .limit(1).get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      sNameGroup = doc.data().VDOname;
    });
  $("#DisplayNameGroup").html(sNameGroup);
  });
}




function LoadVDOTraining() {
  var i = 0;
  var str = "";
  dbVDOTraining.where('VDOgroup','==',sVDOgroup)
  .where('VDOstatus','==',0)
  .orderBy('VDOrank','desc')
  .limit(10).get().then((snapshot)=> {
    snapshot.forEach(doc=> {
    i = i+1;
		str += '<div class="col-lg-6 col-md-2 slide text-center boxvdo" data-aos="fade-left" onclick="OpenVdo(\''+ doc.id +'\','+i+')">';
		str += '<div class="boxvdo-border member"><div class="boxvdo-img">';
		str += '<img src="'+doc.data().VDOimg+'" class="img-fluid" style="border-radius: 10px;"></div>';
		str += '<div class="boxvdo-title"><div class="boxvdo-header">'+doc.data().VDOname+'</div>';
		str += '<div class="boxvdo-line1">'+doc.data().VDOdetail+'</div>';
		str += '<div class="boxvdo-line2"><div class="boxvdo-icon1">';
		str += '<img src="./img/calendar.png" class="boxvdoimg"> <span>'+doc.data().VDOdate+'</span></div>';
		//str += '<div class="boxvdo-icon"><img src="./img/reading.png" class="boxvdoimg"> <span id="text">'+doc.data().VDOread+' View</span></div>';
		str += '<div class="boxvdo-icon"><img src="./img/reading.png" class="boxvdoimg"> <span id="ReadView-'+i+'">'+doc.data().VDOread+' อ่าน</span></div>';
		if(doc.data().VDOquiz==1) {
			str += '<div class="boxvdo-icon"><img src="./img/quizgame.png" class="boxvdoimg"> <span>เก็บคะแนน</span></div>';
		}
		if(doc.data().ShowQuestion==1) {
			str += '<div class="boxvdo-icon"><img src="./img/ask.png" class="boxvdoimg"> <span>'+doc.data().QuestionSend+' คำถาม</span></div>';
		}
		str += '</div></div></div></div>';
    });
	$("#DisplayVDO").html(str);
  });
}



function OpenVdo(x,r) {
  location.href = "playvdo.html?gvdo="+sVDOgroup+"&gid="+x;
}


function CloseAll() {
	document.getElementById('id01').style.display='none';
}



