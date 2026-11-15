(()=>{
"use strict";
const $=id=>document.getElementById(id),KEY="six_faced_world_save_v1";
const initial=()=>({name:"Аэлин Эмберглейд",race:"Эльф",gender:"Женщина",age:1,year:1445,season:0,life:1,place:"Центральный континент",left:4,gold:120,health:90,happiness:75,stress:5,social:20,stats:{strength:8,agility:10,intelligence:12,vitality:10,mana:120,battleAura:0,luck:35,charisma:10,magicPower:5,control:3,swordSkill:0,combat:5,fame:0},skills:{magic:0,sword:0,craft:0,stealth:0,herbalism:0,study:0},traits:["Свободная воля","Быстрое обучение"],goals:["Освоить магию","Стать сильнее","Найти друзей"],achievements:[],memories:["Ты появилась на свет в мире Шести Лиц."],log:["Ты появилась на свет в мире Шести Лиц."],npcs:[],relationships:{friends:0,family:50,romance:0},worldEvents:[]});
let s=load()||initial();
const statNames={strength:"Сила",agility:"Ловкость",intelligence:"Интеллект",vitality:"Живучесть",mana:"Запас маны",battleAura:"Боевая аура",luck:"Удача",charisma:"Харизма",magicPower:"Магическая сила",control:"Контроль магии",swordSkill:"Мастерство меча",combat:"Боевой потенциал",fame:"Известность"};
const skillNames={magic:"Магия",sword:"Меч",craft:"Ремесло",stealth:"Скрытность",herbalism:"Травничество",study:"Образование"};
const groups=[
["📚 Мастерство навыков",[["Изучать магию","magic"],["Контролировать ману","control"],["Изучать книги","study"],["Ремесло","craft"]]],
["💪 Тренировки",[["Тренировать тело","body"],["Развивать ловкость","agility"],["Медитировать","meditate"],["Практиковать скрытность","stealth"]]],
["⚔️ Сражения",[["Тренироваться с мечом","sword"],["Развивать боевую ауру","aura"],["Боевой опыт","combat"]]],
["👑 Королевский двор",[["Посетить двор","court"],["Завести связи","network"]]],
["🧠 Разум и тело",[["Отдыхать","rest"],["Дисциплина","discipline"]]],
["💞 Друзья и любовь",[["Общаться","friends"],["Знакомиться","meet"],["Свидание","romance"]]],
["🏡 Семья и дом",[["Время с семьёй","family"],["Заняться домом","home"]]],
["💼 Работа и деньги",[["Подработка","work"],["Тяжёлая работа","hardwork"],["Торговля","trade"]]],
["🧭 Природа и приключения",[["Исследовать","explore"],["Путешествовать","travel"],["Травничество","herbs"]]]
];
const names=["Лилия","Рудольф","Элиас","Мира","Сильви","Нора","Кай","Артур","Рина","Феликс","Эстель","Леон"];
const surnames=["Грейрат","Эмбер","Сильвер","Бореас","Нотос","Ривер","Фрост","Люмен"];
const races=["Человек","Эльф","Зверолюд","Демон","Дварф"];
const seasons=["Весна","Лето","Осень","Зима"];
function load(){try{let x=JSON.parse(localStorage.getItem(KEY));return x&&x.stats?x:null}catch(e){return null}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(s));toast("Игра сохранена на этом устройстве.")}catch(e){toast("Не удалось сохранить. Освободи место в хранилище браузера.")}}
function toast(t){let el=$("toast");el.textContent=t;el.classList.remove("hidden");clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.add("hidden"),3200)}
function clamp(n,max=100){return Math.max(0,Math.min(max,n))}
function add(k,n){s.stats[k]=Math.max(0,(s.stats[k]||0)+n)}
function stage(){return s.age<5?"Раннее детство":s.age<12?"Детство":s.age<16?"Подростковый возраст":s.age<20?"Юность":s.age<40?"Взрослая жизнь":s.age<60?"Зрелость":"Пожилой возраст"}
function fame(){let n=s.stats.fame;return n>=500?"Живая легенда":n>=250?"Знаменитость":n>=100?"Известная личность":n>=40?"На слуху":"Новичок"}
function note(t){let line=s.age+" лет · "+t;s.log.unshift(line);s.memories.unshift(line);s.log=s.log.slice(0,45);s.memories=s.memories.slice(0,80)}
function unlock(){if(s.age===5)s.achievements.push("Первые осознанные годы");if(s.age===12)s.achievements.push("Начало подросткового возраста");if(s.age===15)s.achievements.push("Самостоятельность");if(s.age===18)s.achievements.push("Совершеннолетие");if(s.stats.magicPower>=50&&!s.achievements.includes("Пробуждение магии"))s.achievements.push("Пробуждение магии");if(s.stats.fame>=100&&!s.achievements.includes("Известная личность"))s.achievements.push("Известная личность");}
function makeNpc(){let n={name:names[Math.floor(Math.random()*names.length)]+" "+surnames[Math.floor(Math.random()*surnames.length)],race:races[Math.floor(Math.random()*races.length)],age:Math.max(1,s.age+Math.floor(Math.random()*13)-6),personality:["спокойный","любознательный","вспыльчивый","добродушный","замкнутый","амбициозный"][Math.floor(Math.random()*6)],relation:5,role:["ученик","торговец","путешественник","ремесленник","маг","мечник"][Math.floor(Math.random()*6)]};s.npcs.unshift(n);s.npcs=s.npcs.slice(0,18);note("Ты познакомилась с "+n.name+", "+n.race+".");return n}
function doAct(type){
 if(s.left<=0){toast("На этот год действия закончились.");return}
 s.left--;let msg="";
 switch(type){
 case"magic":add("intelligence",3);add("mana",25,999999);add("magicPower",4);add("control",1);s.skills.magic+=2;msg="Ты изучала магию. Запас маны и магическая сила выросли.";break;
 case"control":add("control",4);add("intelligence",1);s.skills.magic++;msg="Ты тренировала контроль над маной.";break;
 case"study":add("intelligence",4);s.skills.study+=2;msg="Ты посвятила время образованию.";break;
 case"body":add("strength",3);add("vitality",3);s.health=clamp(s.health+3);msg="Физическая подготовка укрепила тело.";break;
 case"agility":add("agility",4);msg="Ты стала ловчее.";break;
 case"meditate":add("mana",15,999999);add("control",2);s.stress=clamp(s.stress-5);msg="Медитация укрепила концентрацию.";break;
 case"stealth":s.skills.stealth+=3;add("agility",1);msg="Ты тренировала скрытность.";break;
 case"sword":add("swordSkill",5);add("strength",1);add("combat",10);s.skills.sword+=2;msg="Ты тренировалась с мечом.";break;
 case"aura":add("battleAura",10);add("combat",8);msg="Ты практиковала боевую ауру.";break;
 case"combat":add("combat",20);s.health=clamp(s.health-7);s.stress=clamp(s.stress+8);msg="Опасная тренировка дала боевой опыт.";break;
 case"rest":s.health=clamp(s.health+12);s.stress=clamp(s.stress-15);s.happiness=clamp(s.happiness+5);msg="Ты хорошо отдохнула.";break;
 case"friends":s.social=clamp(s.social+9);s.relationships.friends+=8;add("charisma",2);s.happiness=clamp(s.happiness+5);msg="Ты укрепила дружеские связи.";break;
 case"meet":{let n=makeNpc();s.social=clamp(s.social+5);add("charisma",1);msg="Новое знакомство: "+n.name+".";break}
 case"romance":if(s.age<15){s.happiness=clamp(s.happiness+2);msg="Пока это лишь симпатия и робкое общение."; }else{s.relationships.romance=clamp(s.relationships.romance+10);s.social=clamp(s.social+5);msg="Ты уделила время романтическим отношениям.";}break;
 case"network":s.social=clamp(s.social+4);add("charisma",3);add("fame",2);msg="Ты расширила круг полезных знакомств.";break;
 case"family":s.happiness=clamp(s.happiness+8);s.stress=clamp(s.stress-4);s.social=clamp(s.social+3);s.relationships.family=clamp(s.relationships.family+5);msg="Время с семьёй принесло спокойствие.";break;
 case"home":s.happiness=clamp(s.happiness+5);s.stress=clamp(s.stress-3);msg="Ты занялась домом.";break;
 case"work":add("gold",35);s.stress=clamp(s.stress+7);msg="Работа принесла 35 золотых.";break;
 case"hardwork":add("gold",65);s.stress=clamp(s.stress+13);s.health=clamp(s.health-3);msg="Тяжёлая работа принесла 65 золотых, но утомила тебя.";break;
 case"trade":add("gold",25);add("charisma",1);s.skills.craft++;msg="Торговля оказалась выгодной.";break;
 case"craft":s.skills.craft+=3;add("intelligence",1);msg="Ты развивала ремесло.";break;
 case"explore":add("luck",2);add("combat",5);add("fame",3);s.health=clamp(s.health-4);msg="Исследование принесло опыт и впечатления.";break;
 case"travel":if(s.gold<20){s.left++;toast("Для путешествия нужно 20 золотых.");return}add("gold",-20);add("luck",3);add("fame",5);s.health=clamp(s.health-6);msg="Ты отправилась в путешествие. Новые места расширили твой кругозор.";if(s.age>=12&&s.place==="Центральный континент")s.place="Роа";else s.place="Центральный континент";break;
 case"herbs":s.skills.herbalism+=3;add("gold",8);msg="Ты собрала полезные травы и заработала 8 золотых.";break;
 case"discipline":add("vitality",2);add("intelligence",1);s.stress=clamp(s.stress-2);msg="Ты стала дисциплинированнее.";break;
 case"court":if(s.age<12){msg="Тебя пока не допускают ко двору.";s.left++;toast(msg);return}add("charisma",4);add("fame",5);s.social=clamp(s.social+3);msg="Посещение двора расширило круг знакомств.";break;
 }
 note(msg);unlock();render();save();toast(msg)
}
function ageUp(){if(s.left>0&&!confirm("Осталось "+s.left+" действий. Неиспользованные действия будут потеряны. Перейти к следующему году?"))return;s.age++;s.year++;s.left=4;s.season=(s.season+1)%4;s.health=clamp(s.health+4);s.stress=clamp(s.stress-3);s.happiness=clamp(s.happiness+1);if(s.age%5===0){let event=["Ты встретила интересного человека.","В регионе прошла ярмарка.","Ты услышала слухи о далёких землях.","Наставник заметил твои способности.","В городе обсуждают странное происшествие."][Math.floor(Math.random()*5)];s.worldEvents.unshift(s.year+" год: "+event);s.worldEvents=s.worldEvents.slice(0,12);note(event)}note("Начался "+s.year+" год. Тебе исполнилось "+s.age+" лет.");unlock();render();save();toast("Новый год. Доступно четыре действия.")}
function render(){
 $("heroName").textContent=s.name;$("gold").textContent="💰 "+s.gold.toLocaleString("ru");$("identity").textContent=s.race+" · "+s.gender+" · "+s.age+" лет · "+stage();$("place").textContent=s.place;$("fame").textContent=fame()+" · Жизнь #"+s.life;$("age").textContent=s.age;$("stage").textContent=stage();$("date").textContent=s.year+" год · "+seasons[s.season];$("actionCount").textContent=s.left+" / 4";$("actionBar").style.width=(s.left/4*100)+"%";
 $("vitals").innerHTML=[["❤️ Здоровье",s.health],["😊 Счастье",s.happiness],["😣 Стресс",s.stress],["👥 Социальная жизнь",s.social]].map(([n,v])=>`<div><div class="row small"><span>${n}</span><b>${v}</b></div><div class="bar"><i style="width:${v}%;${n.includes("Стресс")?"background:var(--red)":""}"></i></div></div>`).join("");
 $("activities").innerHTML=groups.map(([title,items])=>`<div class="activity-group"><h3>${title}</h3><div class="activity-grid">${items.map(([label,key])=>`<button data-act="${key}" ${s.left<=0?"disabled":""}>${label}</button>`).join("")}</div></div>`).join("");
 $("statsGrid").innerHTML=Object.entries(statNames).map(([k,n])=>`<div class="stat"><span>${n}</span><b>${(s.stats[k]||0).toLocaleString("ru")}</b></div>`).join("");
 $("skills").innerHTML=Object.entries(skillNames).map(([k,n])=>`<div style="margin:9px 0"><div class="row small"><span>${n}</span><b class="gold">${s.skills[k]}</b></div><div class="bar"><i style="width:${Math.min(100,s.skills[k])}%"></i></div></div>`).join("");
 $("traits").innerHTML=s.traits.map(x=>`<span class="pill">${x}</span>`).join("");
 const magicRank=s.skills.magic>=100?"Королевский":s.skills.magic>=60?"Продвинутый":s.skills.magic>=25?"Средний":s.skills.magic>=5?"Начальный":"Нет ранга";
 const swordRank=s.skills.sword>=100?"Бог меча":s.skills.sword>=60?"Королевский":s.skills.sword>=25?"Продвинутый":s.skills.sword>=5?"Начальный":"Нет ранга";
 $("ranks").innerHTML=`<div class="log">Магия: <b class="gold">${magicRank}</b></div><div class="log">Меч: <b class="gold">${swordRank}</b></div><div class="log">Боевая аура: <b class="gold">${s.stats.battleAura}</b></div>`;
 $("recentLog").innerHTML=s.log.slice(0,8).map(x=>`<div class="log">◆ ${x}</div>`).join("");
 $("npcList").innerHTML=s.npcs.length?s.npcs.map((n,i)=>`<div class="log"><div class="row"><b>${n.name}</b><span class="gold">${n.relation}%</span></div><span class="muted small">${n.race} · ${n.age} лет · ${n.role} · ${n.personality}</span><div style="margin-top:6px"><button data-npc="${i}">Провести время</button></div></div>`).join(""):"Пока нет знакомых. Используй знакомство или исследование.";
 $("relationshipInfo").innerHTML=`Дружба: <b class="gold">${s.relationships.friends}</b><br>Семья: <b class="gold">${s.relationships.family}</b><br>Романтические отношения: <b class="gold">${s.relationships.romance}</b>`;
 $("locations").innerHTML=["Центральный континент","Роа","Миллис","Демонический континент","Королевство Асура","Священная земля мечей"].map((x,i)=>`<div class="log">${i===0||x===s.place?"🟢":"🔒"} ${x} ${x===s.place?"— текущая локация":i===0?"— доступен":"— откроется в дальнейших обновлениях"}</div>`).join("");
 $("worldEvents").innerHTML=s.worldEvents.map(x=>`<div class="log">${x}</div>`).join("")||"Пока ничего примечательного.";
 $("goals").innerHTML=s.goals.map((x,i)=>`<div class="log row"><span>🎯 ${x}</span><button data-goal="${i}">×</button></div>`).join("")||"Целей пока нет.";
 $("achievements").innerHTML=s.achievements.map(x=>`<div class="log">🏆 ${x}</div>`).join("")||"Достижений пока нет.";
 $("memories").innerHTML=s.memories.slice(0,25).map(x=>`<div class="log">📖 ${x}</div>`).join("");
 $("legacy").textContent=`Ты прожила ${s.age} лет. Известность: ${s.stats.fame}. Золото: ${s.gold}. Твои решения формируют наследие этой жизни.`;
 $("nameInput").value=s.name;$("raceInput").value=s.race;$("genderInput").value=s.gender;
}
document.addEventListener("click",e=>{let b=e.target.closest("button");if(!b)return;if(b.dataset.act)doAct(b.dataset.act);if(b.dataset.tab){document.querySelectorAll("main>section").forEach(x=>x.classList.add("hidden"));$(b.dataset.tab).classList.remove("hidden");document.querySelectorAll("[data-tab]").forEach(x=>x.classList.toggle("active",x===b))}if(b.dataset.npc!==undefined){let n=s.npcs[+b.dataset.npc];n.relation=clamp(n.relation+12);s.social=clamp(s.social+4);s.happiness=clamp(s.happiness+3);note("Ты провела время с "+n.name+".");render();save()}if(b.dataset.goal!==undefined){s.goals.splice(+b.dataset.goal,1);render();save()}});
$("ageBtn").onclick=ageUp;$("saveBtn").onclick=save;
$("meetBtn").onclick=()=>{if(s.left<=0)return toast("На этот год действия закончились.");s.left--;makeNpc();render();save();toast("Новое знакомство состоялось.")};
$("addGoal").onclick=()=>{let v=$("goalInput").value.trim();if(v){s.goals.push(v);$("goalInput").value="";render();save()}};
$("applyChar").onclick=()=>{s.name=$("nameInput").value.trim()||s.name;s.race=$("raceInput").value;s.gender=$("genderInput").value;render();save();toast("Персонаж обновлён.")};
$("exportBtn").onclick=()=>{let blob=new Blob([JSON.stringify(s,null,2)],{type:"application/json"}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="six-faced-world-save.json";a.click();URL.revokeObjectURL(url);toast("Файл сохранения подготовлен.")};
$("importBtn").onclick=()=>$("importFile").click();
$("importFile").onchange=async e=>{let f=e.target.files[0];if(!f)return;try{let x=JSON.parse(await f.text());if(!x.stats||!x.age)throw Error();s=x;save();render();toast("Сохранение импортировано.")}catch(err){toast("Файл сохранения повреждён или имеет неверный формат.")}e.target.value=""};
$("resetBtn").onclick=()=>{if(confirm("Удалить текущую жизнь и начать заново? Сначала экспортируй сохранение, если оно нужно.")){s=initial();save();render();toast("Началась новая жизнь.")}};
if("serviceWorker" in navigator && location.protocol!=="file:"){window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}))}
render();
})();