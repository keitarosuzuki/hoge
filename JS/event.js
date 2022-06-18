/**
 * アコーディオン開閉フラグ（0:閉じる 1:開く）
 * ※アコーディオンメニュー増減の度、修正する
 */
var CardFlag = {
    "card1":0,
    "card2":0,
    "card3":0,
    "card4":0,
    "card5":0,
}

/**
 * 保存されている開閉の状態を初期表示に反映させる
 */
window.onload = () =>{
    var objFlag = JSON.parse(localStorage.getItem("acCardFlag"));
    var cards = document.querySelector(".accordion").children;
    
    for(key in objFlag){
        if(objFlag[key] == 0){

            for(let i = 0; i < cards.length; i++){
                if(key == cards[i].children[0].getAttribute("id")){
            
                    // 各カードの変更したい属性値を持つ要素を取得する
                    cardBtnAtr = cards[i].children[0].children[0];
                    cardAtr = cards[i].children[1];

                    // 取得した属性値を変更して各カードを閉じる
                    cardBtnAtr.classList.add("collapsed");
                    cardBtnAtr.setAttribute("aria-expanded", "false");
                    cardAtr.classList.remove("show");
                }
            }

        }else if(objFlag[key] == 1){

            for(let i = 0; i < cards.length; i++){
                if(key == cards[i].children[0].getAttribute("id")){
            
                    // 各カードの変更したい属性値を持つ要素を取得する
                    cardBtnAtr = cards[i].children[0].children[0];
                    cardAtr = cards[i].children[1];

                    // 取得した属性値を変更して各カードを開く
                    cardBtnAtr.classList.remove("collapsed");
                    cardBtnAtr.setAttribute("aria-expanded", "true");
                    cardAtr.classList.add("show");
                }
            }
        }
    }
}

/**
 * OPEN・CLOSE・RESETボタン
 */
function btnEvent(btnVal){

    // カード要素を取得、他定義
    var cards = document.querySelector(".accordion").children;
    var cardBtnAtr, cardAtr;

    if(btnVal == "acOpne"){

        // すべて開く
        for(let i = 0; i < cards.length; i++){
            
            // 各カードの変更したい属性値を持つ要素を取得する
            cardBtnAtr = cards[i].children[0].children[0];
            cardAtr = cards[i].children[1];

            // 取得した属性値を変更して各カードを開く
            cardBtnAtr.classList.remove("collapsed");
            cardBtnAtr.setAttribute("aria-expanded", "true");
            cardAtr.classList.add("show");
        }

        // オブジェクトをすべて変更する
        for(const key in this.CardFlag){
            this.CardFlag[key] = 1;
        }

        //ローカルストレージに保存
        localStorage.setItem("acCardFlag", JSON.stringify(this.CardFlag));
    
    }else if(btnVal == "acClose" || "acReset"){
        
        // すべて閉じる
        for(let i = 0; i < cards.length; i++){
            
            // 各カードの変更したい属性値を持つ要素を取得する
            cardBtnAtr = cards[i].children[0].children[0];
            cardAtr = cards[i].children[1];

            // 取得した属性値を変更して各カードを閉じる
            cardBtnAtr.classList.add("collapsed");
            cardBtnAtr.setAttribute("aria-expanded", "false");
            cardAtr.classList.remove("show");
        }

        if(btnVal == "acReset"){
            
            // リセットする
            if(confirm("開閉状態をストレージからリセットしますか？")){
                //ローカルストレージ初期化
                localStorage.removeItem("acCardFlag");
                alert("開閉状態がストレージからリセットされました")
            }
        
        }else if(btnVal == "acClose"){
        
            // オブジェクトをすべて変更する
            for(const key in this.CardFlag){
                this.CardFlag[key] = 0;
            }

            //ローカルストレージに保存
            localStorage.setItem("acCardFlag", JSON.stringify(this.CardFlag));

        }

    }
}

/**
 * Infoボタン
 */
function AlertMes(){
    alert("１．開閉状態をストレージに保存します\n"
        + "※ブラウザを更新して動作確認してみてください\n\n"
        + "２．OPEN・CLOSEボタンで全カードの開閉ができます\n\n"
        + "３．RESETボタンで全ての情報を端末ストレージからリセットできます");
}


/**
 * カード毎の開閉操作、その保存
 */
function acToggle(cardHead){
    var objFlag = JSON.parse(localStorage.getItem("acCardFlag"));
    var cardHeadBtn = cardHead.children[0];
    var acCardAttr = cardHeadBtn.getAttribute("id");
    var flag = cardHeadBtn.children[0].getAttribute("aria-expanded");
    
    if(objFlag != null){
        // 既にストレージに値がある場合
        for(const key in objFlag){
            if([key] == acCardAttr){
                if(flag == "true"){
                    objFlag[key] = 1;
                    localStorage.setItem("acCardFlag", JSON.stringify(objFlag));
                }else if(flag == "false"){
                    objFlag[key] = 0;
                    localStorage.setItem("acCardFlag", JSON.stringify(objFlag));
                }
            }
        }
    }else if(objFlag == null){
        // ストレージが空または初期化されていて空の場合
        for(const key in this.CardFlag){
            if([key] == acCardAttr){
                if(flag == "true"){
                    this.CardFlag[key] = 1;
                    localStorage.setItem("acCardFlag", JSON.stringify(this.CardFlag));
                }else if(flag == "false"){
                    this.CardFlag[key] = 0;
                    localStorage.setItem("acCardFlag", JSON.stringify(this.CardFlag));
                }
            }
        }
    }
}