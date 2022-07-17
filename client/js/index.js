const sock = io();

var nickname = "";
var player1 = new Image();

//player1.src = "https://lh3.googleusercontent.com/10PkSlNxU3SMcIQPGEH0Ius_wV1hiRoTtfEQFvaW_YpzdA7aZrd3LxirFvvLc93ulP_-LgVCSV4yjXpNRVNibx9iQtnebU-Vrg62xhHSQhPDAn_nhE6uBYNyoJ1unD9lVp-3ncMlEw=w2400"

//studentsArr = ["TCR", "LXR", "LK", "JHA", "JV", "JL", "SZF", "H"];
studentsArr = ["TCR", "LOK", "KSY", "KN", "JT", "CJH", "LSH", "KX"];
elementsArr = [];

studentsArr.forEach((student) => {
    const element = document.getElementById(student+"Steps");
    element.innerHTML = student
    elementsArr.push(element);
});
//LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL

const promptMsg = () => {

    const LK = {pinNumber:'9852', nickname: 'LK'};
    const LXR = {pinNumber:'9035', nickname: 'LXR'};
    const SZF = {pinNumber:'3839', nickname: 'SZF'};
    const JHA = {pinNumber:'3583', nickname: 'JHA'};
    const JL = {pinNumber:'1072', nickname: 'JL'};
    const JV = {pinNumber:'5691', nickname: 'JV'};
    const H = {pinNumber:'4048', nickname: 'H'};
    const TCR = {pinNumber:'8', nickname: 'TCR'};

    const loginNames = ["LOK", "KSY", "KN", "JT", "CJH", "LSH", "KX", "TJY"];

    const s1 = {pinNumber:'1198', nickname: loginNames[0]};
    const s2 = {pinNumber:'6139', nickname: loginNames[1]};
    const s3 = {pinNumber:'7051', nickname: loginNames[2]};
    const s4 = {pinNumber:'4162', nickname: loginNames[3]};
    const s5 = {pinNumber:'2105', nickname: loginNames[4]};
    const s6 = {pinNumber:'1529', nickname: loginNames[5]};
    const s7 = {pinNumber:'2167', nickname: loginNames[6]};
    const s8 = {pinNumber:'6588', nickname: loginNames[7]};


    var nick = prompt("Please enter your pin number:");
    while (nick.length == 0) {
        alert("Please enter your pin number!");
        nick = prompt("Please enter your pin number:");
    }
    
    sat2PM = [LK, LXR, SZF, JHA, JL, JV, H, TCR];
    sun230PM = [s1, s2, s3, s4, s5, s6, s7, s8];

    sat2PM.forEach((login) => {
        if (nick === login.pinNumber) {
            nickname = login.nickname 
        } 
    });
    sun230PM.forEach((login) => {
        if (nick === login.pinNumber) {
            nickname = login.nickname 
        } 
    });
    
    if (nickname === "") {
        alert("Wrong pin number!");
        promptMsg();
    }
};

promptMsg();
sock.emit('newuser', nickname);
//LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL


function createChatDivs() {
    const chatSec = document.getElementById("chat");
    var chatDiv = document.createElement("div");
    //var chatDiv = document.getElementById("chatdiv");
    //chatDiv.setAttribute("id", "chatdiv");
    chatDiv.style.width = "272px";
    chatDiv.style.height = "320px";
    //chatDiv.style = "background:rgba(255, 255, 255, 0.5); color:black; overflow: auto;"
    chatDiv.style.background = "rgba(255, 255, 255, 0.5)";
    chatDiv.style.color = "black";
    chatDiv.style.overflow = "auto";
    chatDiv.style.overflowX = "hidden";
    //chatDiv.style.float = "right";
    //chatDiv.style.marginLeft = "2%";
    //chatDiv.style.position = "fixed";
    chatDiv.style.top = "30px";
    //chatDiv.style.right = "30px";


    chatSec.appendChild(chatDiv);

    var chatInput = document.createElement('input');
    //chatInput.className = "form-control";
    chatInput.style.width = "205px";
    chatInput.style.height = "45px";
    chatInput.setAttribute("id", "chatinput");
    chatInput.setAttribute("type", "text");
    chatInput.style.display = "inline";
    chatInput.style.fontSize = "1.2em";
    chatDiv.appendChild(chatInput);

    var chatBtn = document.createElement('button');

    chatBtn.className = "btn";
    chatBtn.setAttribute("id", "chatBtn");
    chatBtn.innerHTML = "Send";
    chatBtn.style.height = "50px";
    chatBtn.style.width = "55px";


    chatDiv.appendChild(chatBtn);

    var div3 = document.createElement('div');
    div3.setAttribute("id", "div3");
    div3.style.width = '350px';
    div3.style.height = '260px'
    div3.style.color = 'black';
    div3.style.background = 'rgba(236, 236, 236, 0.5)';
    div3.style.overflowY = "auto";
    chatDiv.appendChild(div3);

    chatBtn.addEventListener('click', function () {
        var message = nickname + ': ';
        message += chatInput.value;
        sock.emit('chat-to-server', message);
        chatInput.value = '';
    });

    chatInput.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("chatBtn").click();
        }

    });

    return chatSec;
}

function appendMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.innerText = message;
    var div3 = document.getElementById("div3");
    div3.append(messageDiv);
    div3.scrollTop = div3.scrollHeight;
    if (message === "TCR: RESET SERVER") {
        if (nickname != "TCR") {
            window.location.reload();
        } else {
            sock.emit('resetserverval');
        }
    }

    if (message === "TCR: teleport me out" && nickname === "TCR") {
        sock.emit('teleportMeOut');
    }
    if (message === "TCR: teleport me in" && nickname === "TCR") {
        sock.emit('teleportMeIn');
    }
    studentsArr.forEach((student) => {
        if (message === "TCR: winner " + student && nickname === "TCR") {
            var winner = student;
            sock.emit('winner', winner);
        }
    });
    

    studentsArr.forEach((student) => {
        var getNum = message.replace(/\D/g,'');
        var studentId = student;
        //var getNickname = message.replace(/[^A-Z]+/g, "");
        if (message === "TCR: +" + getNum + " to " + student && nickname === "TCR") {
            sock.emit('addSteps', { getNum, studentId });
        }

        if (message === "TCR: mind control " + studentId) {
            sock.emit('mindControl', studentId);
            sock.emit('chat-to-server', "Mind control mode active = " + studentId);
        }
    });

    if (message === "TCR: mind control off") {
        sock.emit('mindControlOff');
        sock.emit('chat-to-server', "Mind control mode deactivated");
    }


    if (message === "TCR: NUMBER OF PLAYERS" && nickname === "TCR") {
        //let text = "[" + connectedArr.toString() + "]";
        sock.emit('chat-to-server', numberOfPlayers);
    }


}



class GridSystemClient {
    constructor(matrix) {
        this.matrix = matrix;
        //this.uiContext = this.#getContext(420, 580, "#111");
        this.outlineContext = this.#getContext(0, 0, "#444");
        //this.topContext = this.#getContext(0, 0, "#111", true);
        this.cellSize = 27;
        this.padding = 2;
        this.students = ["TCR", "LOK", "KSY", "KN", "JT", "CJH", "LSH", "KX", "TJY"];

        this.p1 = { color: "grey", lable: 2, id: this.students[0] };

        this.p2 = { color: "cyan", lable: 3, id: this.students[1] };
        this.p3 = { color: "orange", lable: 4, id: this.students[2] };
        this.p4 = { color: "pink", lable: 5, id: this.students[3] };
        this.p5 = { color: "lightyellow", lable: 6, id: this.students[4] };

        this.p6 = { color: "royalblue", lable: 7, id: this.students[5] };
        this.p7 = { color: "yellow", lable: 8, id: this.students[6] };
        this.p8 = { color: "fuchsia", lable: 9, id: this.students[7] };

        this.p9 = { color: "white", lable: 10, id: this.students[8] };
    
        this.playersArr = [this.p1, this.p2, this.p3, this.p4, this.p5, this.p6, this.p7, this.p8, this.p9];
        this.moveSwitch = 0;
    }

    #renderPlayer(cellVal) {
        let color = "#111";
        let playerId = null;

        if (cellVal === 1) {
            color = "#4488FF";
        }

        this.playersArr.forEach((player) => {
            if (cellVal === player.lable) {
                color = player.color;
                playerId = player.id;
            }
        });

        return {color, playerId};
    }


    #getCenter(w, h) {
        return {
            x: window.innerWidth / 2 - w / 2 + "px",
            y: window.innerHeight / 2 - h / 2 + "px"
        }
    }

    #getContext(w, h, color = "#111", isTransparent = false) {
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        this.width = this.canvas.width = w;
        this.height = this.canvas.height = h;
        this.canvas.style.position = "absolute";
        this.canvas.style.background = color;
        if (isTransparent) {
            this.canvas.style.backgroundColor = "transparent";
        }
        const center = this.#getCenter(w, h);
        this.canvas.style.marginLeft = center.x;
        this.canvas.style.marginTop = center.y;
        document.body.appendChild(this.canvas);

        return this.context;

    }


    render() {
        const w = (this.cellSize + this.padding) * this.matrix[0].length - (this.padding);
        const h = (this.cellSize + this.padding) * this.matrix.length - (this.padding);

        this.outlineContext.canvas.width = w;
        this.outlineContext.canvas.height = h;

        const center = this.#getCenter(w, h);
        //this.outlineContext.canvas.style.marginLeft = center.x;
        //console.log(center.y);
        this.outlineContext.canvas.style.marginLeft = "10px";
        this.outlineContext.canvas.style.marginTop = "2px";

        /* this.topContext.canvas.style.marginLeft = center.x;
        this.topContext.canvas.style.marginTop = center.y; */

        for (let row = 0; row < this.matrix.length; row++) {
            for (let col = 0; col < this.matrix[row].length; col++) {
                const cellVal = this.matrix[row][col];

                var plyrDet = this.#renderPlayer(cellVal);
                
                this.outlineContext.fillStyle = plyrDet.color;
                this.outlineContext.fillRect(col * (this.cellSize + this.padding),
                    row * (this.cellSize + this.padding),
                    this.cellSize, this.cellSize);

                if (plyrDet.playerId != null) {
                    this.outlineContext.font = "bold 13px Courier";
                    this.outlineContext.fillStyle = "black";
                    this.outlineContext.fillText(plyrDet.playerId, col * (this.cellSize + this.padding) + 2,
                        row * (this.cellSize + this.padding) + 18);
                }


            }
        }

        this.outlineContext.fillStyle = "red";
        this.outlineContext.fillRect(36 * (this.cellSize + this.padding),
                    11 * (this.cellSize + this.padding),
                    this.cellSize, this.cellSize);
    }
}


createChatDivs();

document.addEventListener("keydown", (e) => {
    if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.view.event.preventDefault();
    }
    //e.view.event.preventDefault();
    sock.emit('keyPress', e.keyCode);
});


//============================================================================================================
sock.on('chat-to-clients', data => {
    appendMessage(data);
});

sock.on('sendMatrix', (data) => {
    const clientRender = new GridSystemClient(data.gridMatrix);
    //document.getElementById("p1Steps").innerHTML = "P1 steps: " + data.updSteps;
    var i = 0;
    elementsArr.forEach((element) => {
        element.innerHTML = data.playersArr[i].id + " Steps: " + data.playersArr[i].steps + "/30";
        i++;
    });
    clientRender.render();
});
