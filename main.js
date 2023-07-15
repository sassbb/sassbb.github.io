let input_key = new Array();

window.addEventListener("keydown",handlekeydown);
 function handlekeydown(e){
    input_key[e.keyCode] = true;
 }

 window.addEventListener("keyup",handlekeyup);
 function handlekeyup(e){;
    input_key[e.keyCode] = false;
 }


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvas_width = 1080;
const canvas_height =720;
canvas.width = canvas_width;
canvas.height = canvas_height;
//スティーブ設定
const CHARA_SPEED =10;

let x = 0;
let y = 450;
//上下方向
let vy =0 ;
let isJump =false;


//地面
const groundLevel = 450;

//スピード
const minSpeed =10;
const maxSpeed =30;

function generateRandomSpeed(){
  return Math.random()*(maxSpeed - minSpeed )+minSpeed;

}

// 敵キャラクターの初期速度をランダムに生成
let tekiSpeed = generateRandomSpeed();

// ゲームオブジェクトの初期速度をランダムに生成
let gemuSpeed = generateRandomSpeed();



//カズヤ
let tekiX =canvas_width;
let tekiY =450;
const tekiwidth = 200;
const tekiHeight = 125;

//ゲムヲ
let gemuX =canvas_width;
let gemuY =200;
const gemuwidth = 200;
const gemuHeight = 100;
window.addEventListener("load",update);



    //スティーブの画像
    let img = new Image();
    img.src = "images/torokko.png";

    //カズヤの画像
    const tekiImage = new Image();
    tekiImage.src = "images/kazuya.png";

    //ゲムヲの画像
    const gemuImage = new Image();
    gemuImage.src = "images/gemuwo.png";



    //ホームラン音
    const audio = new Audio();
    audio.src = "images/homerun.mp3";
      
    //bgm
    const bgm = new Audio();
    bgm.src = "images/maikuramusic.mp3";
//スコア
let score =0;




function update(){


  ctx.clearRect(0,0,canvas_width,canvas_height);

bgm.play();
  
  //ジャンプ
const jumpHeight =25;
const gravity =1.5;



tekiX -=tekiSpeed; 
ctx.drawImage (tekiImage, tekiX,tekiY,tekiwidth,tekiHeight);

gemuX -=gemuSpeed; 
ctx.drawImage (gemuImage, gemuX,gemuY,gemuwidth,gemuHeight);

    let updatedX = x;
    let updatedY = y;
    if(gemuX + gemuwidth<0){
      gemuX = canvas_width;
      gemuSpeed = generateRandomSpeed(); 
    }

    if(tekiX + tekiwidth<0){
          tekiX = canvas_width;
          tekiSpeed = generateRandomSpeed();
        }

  
        
        if (input_key[37]) {
          updatedX = x - CHARA_SPEED;
        }
        if (input_key[32] && !isJump) {
          vy = -jumpHeight;
          isJump = true;
        }
        if (input_key[39]) {
          updatedX = x + CHARA_SPEED;
        }
       
        if(isJump){
            updatedY =y +vy;
            vy = vy + gravity;
        }

        if(updatedY>=groundLevel){
          updatedY=groundLevel;
          vy = 0;
          isJump = false;
        }
 
        if(updatedX + 180>= tekiX &&updatedX < tekiX + tekiwidth ){
          if( tekiY-124 <= updatedY ){
            //当たった処理 
            handleCollision();
          }
        }
        if(updatedX + 160>= gemuX &&updatedX < gemuX + 
          gemuwidth &&gemuY >= updatedY-124){
          {
            //当たった処理 
            handleCollision2();
          }
        }
   
    x = updatedX;
    y = updatedY;


   
    
    ctx.drawImage (img, x,y,200,124);

    window.requestAnimationFrame(update);


}
function handleCollision() {
  tekiX = canvas_width; // 敵を画面外に移動させる
  audio.currentTime = 0; 　
  audio.play();  
  score += 100; // スコアを増やす（適宜増える数値を変更してください）
  updateScore(); 
  tekiSpeed = generateRandomSpeed(); // 新しいランダムな速度を生成する

}
function handleCollision2() {
  gemuX = canvas_width; // 敵を画面外に移動させる
  audio.currentTime = 0; 　
  audio.play(); 
  score += 200; // スコアを増やす（適宜増える数値を変更してください）
  updateScore();  
  gemuSpeed = generateRandomSpeed(); // 新しいランダムな速度を生成する

}
function updateScore() {
  const scoreElement = document.getElementById("score");
  scoreElement.textContent = "Score: " + score; // スコア表示を更新
}
window.addEventListener("load", update);












