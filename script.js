let cards=JSON.parse(localStorage.getItem("flashcards"))||[
    {q:"HTML stands for?",a:"HyperText Markup Language"},
    {q:"CSS used for?",a:"Styling web pages"},
    {q:"JS is?",a:"Programming language for web"},
    {q:"1+1?",a:"2"},
    {q:"Capital of India?",a:"New Delhi"},
    {q:"2*5?",a:"10"},
    {q:"Sun rises in?",a:"East"},
    {q:"5-2?",a:"3"},
    {q:"Water formula?",a:"H2O"},
    {q:"Largest planet?",a:"Jupiter"}
];

let index=0;
let editMode=false;
function showCard(){
    if(cards.length===0){
        document.getElementById("question").innerText="No cards available";
        document.getElementById("answer").innerText="";
        return;
    }
    let card=cards[index];

    document.getElementById("question").innerText=card.q;
    document.getElementById("answer").innerText=card.a;
    document.getElementById("answer").style.display="none";
    document.getElementById("q").value="";
    document.getElementById("a").value="";
    editMode=false;
    updateProgress();
}

function showAnswer(){
    document.getElementById("answer").style.display="block";
}
function nextCard(){
    if(cards.length===0)return;
    index=(index+1)%cards.length;
    showCard();
}
function prevCard(){
    if(cards.length===0)return;
    index=(index-1+cards.length)%cards.length;
    showCard();
}
function addCard(){
    let q=document.getElementById("q").value.trim();
    let a=document.getElementById("a").value.trim();
    if(q===""||a==="")return;
    cards.push({q:q,a:a});
    localStorage.setItem("flashcards",JSON.stringify(cards));
    document.getElementById("q").value="";
    document.getElementById("a").value="";
    index=cards.length-1;
    showCard();
}
function editCard(){
    if(cards.length===0)return;
    if(!editMode){
        document.getElementById("q").value=cards[index].q;
        document.getElementById("a").value=cards[index].a;
        editMode=true;
        return;
    }
    let q=document.getElementById("q").value.trim();
    let a=document.getElementById("a").value.trim();
    if(q===""||a==="")return;
    cards[index].q=q;
    cards[index].a=a;
    localStorage.setItem("flashcards",JSON.stringify(cards));
    editMode=false;
    showCard();
}
function deleteCard(){
    if(cards.length===0)return;
    if(!confirm("Delete this card?"))return;
    cards.splice(index,1);
    if(index>=cards.length)index=cards.length-1;
    localStorage.setItem("flashcards",JSON.stringify(cards));
    showCard();
}
function updateProgress(){
    document.getElementById("progress").innerText=
    (cards.length===0)?"0/0":(index+1)+"/"+cards.length;
}
showCard();