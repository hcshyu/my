const startScreen = document.getElementById('start-screen');
const room = document.getElementById('room');
const mapScreen = document.getElementById('map-screen');
const dialogueBox = document.getElementById('dialogue-box');  // 房間場景中的對話框
const roomdialogueBox = document.getElementById('room-dialogue-box');  // 房間場景中的對話框
const bathhouseDialogueBox = document.getElementById('bathhouse-dialogue-box');  // 浴室場景中的對話框
const hospitalDialogBox = document.getElementById('hospital-dialogue-box'); 
const mapCharacter = document.getElementById('map-character');
const map = document.getElementById('map');
const bathhouse = document.getElementById('bathhouse');
const hospital = document.getElementById('hospital');
const choiceButtons = document.getElementById('choice-buttons');
const choice1 = document.getElementById('choice1');
const choice2 = document.getElementById('choice2');


let currentDialogue = 0;

let roomVisitCount = 0; // 记录访问房间的次数

function enterRoom() {
    roomVisitCount++; // 每次进入房间时增加计数

    if (roomVisitCount === 1) {
        triggerDialogue(dialogues); // 第一次进入显示 dialogues
    } else if (roomVisitCount === 2) {
        triggerDialogue(roomdialogues); // 第二次进入显示 roomDialogues
    }
}



// 房間內的對話內容
const dialogues = [
    "啊 (深了個懶腰)",
    "終於做完明天的簡報了...打了一整天的鍵盤真的快要累死我了!",
    "小寧看了看手機，已經晚上五點了",
    "時間過得好快已經傍晚了! (驚訝)",
    "外面看起來沒有下雨，今天勞累了一天，看來該去澡堂泡澡鬆一下了!",
    "小寧走到衣櫃前,拿出毛巾和換洗衣物，準備出門。"
];
const roomdialogues = [
    "兩個月以後",
    "某日你在手機訊息中收到hpv病毒公費篩檢的文宣",
    "某天你覺得身體十分不舒服",
    "上網搜尋後發現與子宮頸癌的症狀十分相似",
    "因此急急忙忙的掛了婦產科看診",
    "並在醫生的建議下進行篩檢"
];
// 浴室內的對話內容
const bathhouseDialogues = [
    "澡堂裡有兩種浴池",
    "一種是隱蔽性高，前個消費者使用完會馬上消毒但價格較為昂貴的單人包廂",
    "第二種是價格親民，有定期消毒但在尖峰時段打掃時間較不穩定的大眾浴場",
    "小寧是一名剛畢業的職場菜鳥",
    "由於每個月都要負擔學貸與房租，因此手頭不寬裕",
    "請以小寧的視角做出選擇",
    "",
    "你思考良久還是覺得比起金錢你更注重泡澡體驗",
    "因此你選擇了單人包廂，卻在結帳時後發現",
    "錢包的錢不夠了",
    "",
    "雖然單人包廂很吸引你",
    "但為了明天午餐可以多吃一隻雞腿",
    "你決定選擇價格實惠的大眾浴池。",
    "",
    "小寧走進公共浴池，此時正值澡堂的人潮高峰期",
    "小寧 : (走到角落，發現一張放有毛巾的椅子，雖然看起來並未打掃過，但工作一天已讓你十分疲倦，於是你決定坐在上面稍作休息)",
    "好累喔，我先坐在這裡休息一下好了，沖澡區看起來還要等好一陣子。",
    "等待許久，終於沖完澡，可以進池子了",
    "小寧 : 好舒服阿，感覺一天的疲憊都消失了",
    "小寧 : (看著牆上的風景壁畫)好久沒有出去玩了，真想放假，這次的工作結束後我也要來安排個度假好好放鬆",
    ""
];

// 醫院內的對話內容
const hospitalDialogues = [
    "這是醫院，感覺非常冷清。",
    "你聽到遠處傳來的腳步聲，似乎有人在跟蹤你。",
    "你需要快速找到出口，離開這裡。"
];

const hospitalTriggerPosition = { x: 502, y: 619 }; // 醫院的觸發位置
const triggerPosition = { x: 1117, y: 561.5 }; // 浴室觸發位置

let characterX = 1270;  // 地圖上的角色初始位置 X
let characterY = 1485.5;  // 地圖上的角色初始位置 Y

// 监听键盘事件，当按下空格键且开始屏幕显示时，切换到房间场景
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && startScreen.style.display !== 'none') {
        startScreen.style.display = 'none'; // 隐藏开始屏幕
        room.style.display = 'flex'; // 显示房间屏幕
        character.style.display = 'flex';
        showNextDialogue(); // 开始显示对话
    }
});

// 监听房间的点击事件，每次点击显示下一个对话
room.addEventListener('click', function() {
    showNextDialogue();
});

// 显示下一个对话的函数
function showNextDialogue() {
    if (currentDialogue < dialogues.length) {
        // 如果还有剩余对话，继续显示
        dialogueBox.textContent = dialogues[currentDialogue];
        currentDialogue++;
    } else {
        // 对话结束，切换到地图屏幕
        room.style.display = 'none'; // 隐藏房间屏幕
        dialogueBox.style.display = 'none'
        mapScreen.style.display = 'block'; // 显示地图屏幕
        centerMap();  // 初始化地图位置，使角色居中
    }
}


// 更新角色位置並檢查是否到達觸發位置
function updateCharacterPosition() {
    // 更新角色在地圖中的位置
    mapCharacter.style.left = `${characterX}px`;
    mapCharacter.style.top = `${characterY}px`;

    // 檢查角色是否接近觸發「浴室」的支線任務位置
    if (Math.abs(characterX - triggerPosition.x) < 20 && Math.abs(characterY - triggerPosition.y) < 20) {
        triggerSideQuest(); // 觸發浴室支線任務
    }

   
    // 檢查角色是否接近觸發「醫院」的支線任務位置
    if (Math.abs(characterX - hospitalTriggerPosition.x) < 20 && Math.abs(characterY - hospitalTriggerPosition.y) < 20) {
        triggerHospitalQuest(); // 觸發醫院支線任務
    }
}




// 初始化对话索引
let bathhouseDialogueIndex = 0;

// 触发支线任务(浴室)的函数
function triggerSideQuest() {
    if (map) map.style.display = 'none'; // 隐藏地图
    if (bathhouse) {
        bathhouse.style.display = 'flex'; // 显示浴室画面
        bathhouse.addEventListener('click', handleBathhouseDialogue); // 添加对话事件监听
    }
    if (bathhouseDialogueBox) {
        bathhouseDialogueBox.textContent = bathhouseDialogues[0]; // 显示浴室的第一个对话
        bathhouseDialogueBox.style.display = 'block'; // 显示对话框
    }
    if (choiceButtons) {
        choiceButtons.style.display = 'none'; // 确保选择按钮初始时是隐藏的
    }
    bathhouseDialogueIndex = 1; // 设置下一个对话的索引
}

// 处理浴室对话的点击事件
function handleBathhouseDialogue() {
    if (bathhouseDialogueIndex < 6) {  // 第一部分的对话
        bathhouseDialogueBox.textContent = bathhouseDialogues[bathhouseDialogueIndex];
        bathhouseDialogueIndex++;
    } else if (bathhouseDialogueIndex === 6) {
        // 显示选择按钮
        bathhouseDialogueBox.textContent = bathhouseDialogues[bathhouseDialogueIndex];
        const choiceButtons = document.getElementById('choice-buttons');
        if (choiceButtons) {
            choiceButtons.style.display = 'flex';  // 显示选择按钮
        } 
        bathhouseDialogueIndex++;  // 增加索引值，以备后续对话
        bathhouse.removeEventListener('click', handleBathhouseDialogue);  // 暂时移除点击事件，等待选择
    }
}

// 处理选择按钮的点击事件
document.addEventListener('DOMContentLoaded', function() {
    

    if (choice1) {
        choice1.addEventListener('click', function() {
            const choiceButtons = document.getElementById('choice-buttons');
            if (choiceButtons) choiceButtons.style.display = 'none';  // 隐藏选择按钮
            bathhouseDialogueIndex = 7;  // 设置为单人包厢后续对话
            bathhouseDialogueBox.textContent = bathhouseDialogues[bathhouseDialogueIndex];
            bathhouseDialogueIndex++;
            bathhouse.addEventListener('click', continueDialogue);  // 重新添加对话监听
        });
    }

    if (choice2) {
        choice2.addEventListener('click', function() {
            const choiceButtons = document.getElementById('choice-buttons');
            if (choiceButtons) choiceButtons.style.display = 'none';  // 隐藏选择按钮
            bathhouseDialogueIndex = 11;  // 设置为大众浴池后续对话
            bathhouseDialogueBox.textContent = bathhouseDialogues[bathhouseDialogueIndex];
            bathhouseDialogueIndex++;
            bathhouse.addEventListener('click', continueDialogue);  // 重新添加对话监听
        });
    }
});
function continueDialogue() {
    bathhouse.removeEventListener('click', continueDialogue); // 移除事件监听器，避免重复绑定

    bathhouse.addEventListener('click', function nextDialogue() {
        if (bathhouseDialogueIndex >= 7 && bathhouseDialogueIndex <= 10) {
            // 单人包厢分支对话
            bathhouseDialogueBox.textContent = bathhouseDialogues[bathhouseDialogueIndex];
            bathhouseDialogueIndex++;
        } else if (bathhouseDialogueIndex >= 11 && bathhouseDialogueIndex <= 22) {
            // 大众浴池分支对话
            bathhouseDialogueBox.textContent = bathhouseDialogues[bathhouseDialogueIndex];
            bathhouseDialogueIndex++;
        }

        // 检查是否已达到最后一个对话，并根据索引隐藏浴室并返回房间
        if (bathhouseDialogueIndex === 22) {
            // 隐藏浴室和地图相关元素
            bathhouse.style.display = 'none';  // 隐藏浴室画面
            mapScreen.style.display = 'none';  // 隐藏地图画面
            mapCharacter.style.display = 'none';  // 隐藏地图中的角色

            // 显示房间场景
            room.style.display = 'flex';  // 显示房间画面
            roomdialogueBox.style.display = 'block';  // 显示房间内的对话框
            triggerroomDialogue();  // 触发房间中的新对话
            bathhouseDialogueIndex++;  // 增加索引值，防止重复切换
        }
    });
}

// 显示房间对话内容的函数
function triggerroomDialogue() {
    // 这里设置房间的对话内容，假设 roomdialogues 是一个数组
    if (currentRoomDialogue < roomdialogues.length) {
        roomdialogueBox.textContent = roomdialogues[currentRoomDialogue];
        currentRoomDialogue++;
    }
}





let hospitalDialogueIndex = 0;  // 初始化醫院對話索引
function triggerHospitalQuest() {
    map.style.display = 'none';  // 隱藏地圖
    hospital.style.display = 'flex';  // 顯示醫院畫面
    hospitalDialogBox.textContent = hospitalDialogues[0]; // 顯示醫院的第一個對話
    hospitalDialogueIndex = 1;  // 設定下一個對話的索引
    hospitalDialogBox.style.display = 'block';  // 顯示醫院對話框
}

// 監聽醫院的點擊事件，顯示醫院對話
hospital.addEventListener('click', function() {
    if (hospitalDialogueIndex < hospitalDialogues.length) {
        hospitalDialogBox.textContent = hospitalDialogues[hospitalDialogueIndex];
        hospitalDialogueIndex++;
    } else {
        // 對話結束後，返回地圖
        hospital.style.display = 'none';
        hospitalDialogBox.style.display = 'none';  // 隱藏醫院對話框
        map.style.display = 'block';  // 顯示地圖
    }
});




// 地图居中的效果，使角色始终在屏幕中央
function centerMap() {
    map.style.transform = `translate(${-characterX + window.innerWidth / 2}px, ${-characterY + window.innerHeight / 2}px)`;
}

// 监听键盘事件，控制角色移动
document.addEventListener('keydown', function(event) {
    const speed = 5;  // 角色移动速度

    // 根据按下的键来移动角色
    switch (event.key) {
        case 'w':
            characterY = Math.max(0, characterY - speed); // 向上移动
            break;
        case 'a':
            characterX = Math.max(0, characterX - speed); // 向左移动
            break;
        case 's':
            characterY = Math.min(2000, characterY + speed); // 向下移动
            break;
        case 'd':
            characterX = Math.min(2000, characterX + speed); // 向右移动
            break;
    }

    // 更新角色位置并检查是否触发支线任务
    updateCharacterPosition();
    
    // 保持角色在屏幕中央，并让地图跟随角色移动
    mapCharacter.style.top = '50%';
    mapCharacter.style.left = '50%';
    centerMap();  // 更新地图位置
});



// 地圖跟隨效果
function centerMap() {
    map.style.transform = `translate(${-characterX + window.innerWidth / 2}px, ${-characterY + window.innerHeight / 2}px)`;
}

// 角色移動
document.addEventListener('keydown', function(event) {
    const speed = 10;  // 角色移動速度

    switch (event.key) {
        case 'w':
            characterY = Math.max(0, characterY - speed);
            break;
        case 'a':
            characterX = Math.max(0, characterX - speed);
            break;
        case 's':
            characterY = Math.min(2000, characterY + speed);
            break;
        case 'd':
            characterX = Math.min(2000, characterX + speed);
            break;
    }

    // 更新角色位置並檢查觸發條件
    updateCharacterPosition();
    
    // 保持角色在螢幕中央，並讓地圖跟隨
    mapCharacter.style.top = '50%';
    mapCharacter.style.left = '50%';
    centerMap();  // 更新地圖位置
});




document.getElementById("map").addEventListener('click', function(event) {
    const rect = this.getBoundingClientRect(); // 获取地图的位置和尺寸
    const x = event.clientX - rect.left; // 计算点击位置相对于地图左上角的X坐标
    const y = event.clientY - rect.top;  // 计算点击位置相对于地图左上角的Y坐标
    console.log(`X: ${x}, Y: ${y}`); // 输出坐标到控制台

    // 如果需要，可以将点击的坐标点添加到 allowedPaths 中
    // allowedPaths.push({ xStart: x, xEnd: x, y: y });
});