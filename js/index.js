var stxtEmpID = "";
var stxtEmpName = "";
var stxtEmpPhone = "";
var stxtEmpGroup = "";
var scb1 = "";
var scb2 = "";
var scb3 = "";
var dbProfile = "";
var CheckFoundData = 0;
var EidCYCProfile = "";
var dateString = "";
var sDateRegister = "";
var i = 0;
const x = document.querySelectorAll(`div.com[min="${i}"]`);


$(document).ready(function () {
  
  /*
  var str = "";
  var sLineID = "Ua6b6bf745bd9bfd01a180de1a05c23b3";
  var sLineName = "Website";
  var sLinePicture = "https://profile.line-scdn.net/0hoLlg-mNNMGNRHiaTpMdPNG1bPg4mMDYrKX8qVnIYOgYpe3QwbCp2AXVKaVN_fnMzOC16V3NMagF8";
  sessionStorage.setItem("LineID", sLineID);
  sessionStorage.setItem("LineName", sLineName);
  sessionStorage.setItem("LinePicture", sLinePicture);
  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile" width="100px"></div>';
  str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
  $("#MyProfile").html(str);  
  */

  main()
  Connect_DB();
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
  console.log(profile.userId+" === "+profile.displayName);
  sessionStorage.setItem("LineID", profile.userId);
  sessionStorage.setItem("LineName", profile.displayName);
  sessionStorage.setItem("LinePicture", profile.pictureUrl);
  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile" width="100px"></div>';
  str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
  alert(sessionStorage.getItem("LineID"));
  $("#MyProfile").html(str);  
}


function openWindow() {
  liff.openWindow({
    url: "https://line.me",
    external: true     
  })
}


function Connect_DB() {
  if(sessionStorage.getItem("LineID")==null) { main(); }
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
  CheckData();
}



function CheckData() {
  console.log(sessionStorage.getItem("LineID"));
  dbProfile.where('lineID','==',sessionStorage.getItem("LineID"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EidCYCProfile = doc.id;
      sDateRegister = doc.data().DateRegister;
      CheckFoundData = 1;
      sessionStorage.setItem("EmpID", doc.data().empID);
      sessionStorage.setItem("EmpName", doc.data().empName);
      sessionStorage.setItem("EmpPhone", doc.data().empPhone);
      sessionStorage.setItem("EmpGroup", doc.data().empGroup);
      if(doc.data().StatusRegister==1) {
        sessionStorage.setItem("StatusRegister", doc.data().StatusRegister);
        window.location.href = 'mondee.html';
      }
      document.getElementById("txtEmpID").value = doc.data().empID;
      document.getElementById("txtEmpName").value = doc.data().empName;
      document.getElementById("txtEmpPhone").value = doc.data().empPhone;
      document.getElementById("txtEmpGroup").value = doc.data().empGroup;
      WaitingPage();
    });
    OpenForm();
  });
}


function OpenForm() {
  if(CheckFoundData==1) {
    document.getElementById('myRegister').style.display='none';
    document.getElementById('myTimer').style.display='block';
  } else {
    document.getElementById('myRegister').style.display='block';
    document.getElementById('myTimer').style.display='none';
  }
}



function EditData() {
    document.getElementById('myRegister').style.display='block';
    document.getElementById('myTimer').style.display='none';
}


function WaitingPage() {
  var str = "";
  str +='<center><div><img src="./img/timer.gif" width="250px;"></div>';
  str +='<div><div class="text-waiting">เรียน <font color="#f68b1f">คุณ'+sessionStorage.getItem("EmpName")+'</font><br>';
  str +='ลงทะเบียนไว้เมื่อ : <font color="#f68b1f">'+ sDateRegister +'</font><br><br><font color="#ff0000">ซึ่งในขั้นตอนนี้จะใช้เวลาในการดำเนินการ';
  str +='<br>ภายใน 24 ชั่วโมงในระหว่างนี้ขอให้ท่านตรวจสอบ<br>ข้อมูลของท่านให้ถูกต้อง</font></div>';
  str +='<div class="btn-t1" onclick="EditData()" style="margin-top:20px;font-size:11px;">คลิกเพื่อตรวจสอบข้อมูล</div>';
  str +='</div></center>';
  $("#MyWating").html(str);  
}



function ClickSaveProfile() {
  var sCheckBottom = 0;
  //alert($("input[type=checkbox][id=cb1]:checked").val());
  stxtEmpID = document.getElementById("txtEmpID").value;
  stxtEmpName = document.getElementById("txtEmpName").value;
  stxtEmpPhone = document.getElementById("txtEmpPhone").value;
  stxtEmpGroup = document.getElementById("txtEmpGroup").value;
  if(stxtEmpID !== null && stxtEmpID !== '') { sCheckBottom = sCheckBottom+1; }
  if(stxtEmpName !== null && stxtEmpName !== '') { sCheckBottom = sCheckBottom+1; }
  if(stxtEmpPhone !== null && stxtEmpPhone !== '') { sCheckBottom = sCheckBottom+1; }
  if(stxtEmpGroup !== null && stxtEmpGroup !== '') { sCheckBottom = sCheckBottom+1; }

  if(sCheckBottom==4) {
    SaveData();
  } else {
    alert("กรุณากรอกข้อมูลให้ครบถ้วน");
  }
}




function SaveData() {
  NewDate();
  if(EidCYCProfile=="") {
    dbProfile.add({
      lineID : sessionStorage.getItem("LineID"),
      lineName : sessionStorage.getItem("LineName"),
      linePicture : sessionStorage.getItem("LinePicture"),
      StatusRegister : 0,
      empID : document.getElementById("txtEmpID").value,
      empName : document.getElementById("txtEmpName").value,
      empPhone : document.getElementById("txtEmpPhone").value,
      empGroup : document.getElementById("txtEmpGroup").value,
      DateRegister : dateString
    });
  } else {
    dbProfile.doc(EidCYCProfile).update({
      lineID : sessionStorage.getItem("LineID"),
      lineName : sessionStorage.getItem("LineName"),
      linePicture : sessionStorage.getItem("LinePicture"),
      empID : document.getElementById("txtEmpID").value,
      empName : document.getElementById("txtEmpName").value,
      empPhone : document.getElementById("txtEmpPhone").value,
      empGroup : document.getElementById("txtEmpGroup").value,
      DateRegister : dateString
    });
  }
  CheckData();
  document.getElementById('myRegister').style.display='none';
  document.getElementById('myTimer').style.display='block';
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


